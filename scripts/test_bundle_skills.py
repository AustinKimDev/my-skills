import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


SCRIPT = Path(__file__).with_name('bundle_skills.py')
spec = importlib.util.spec_from_file_location('bundle_skills', SCRIPT)
bundle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bundle)


class BundleTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='skill-bundle-test-')
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name) / 'repository'
        self.repo.mkdir()
        self.manifest = {'version': 1, 'modules': {
            'root': {'source': 'skills/root', 'kind': 'owned', 'dependencies': [
                {'name': 'a', 'when': 'Use its reference.'}]},
            'a': {'source': 'resources/a', 'kind': 'runtime-guide', 'entry': 'GUIDE.md', 'dependencies': [
                {'name': 'b', 'when': 'Use its helper.'}, {'name': 'root', 'when': 'Return to the caller.'}]},
            'b': {'source': 'resources/b', 'kind': 'runtime-guide', 'entry': 'GUIDE.md', 'dependencies': []},
        }}
        self.write('skills/root/SKILL.md', '---\nname: root\ndescription: Fixture skill.\n---\n# Root\n\n[Support](embedded/a/GUIDE.md)\n')
        self.write('resources/a/GUIDE.md', '# A\n\n[B](../b/GUIDE.md)\n[Caller](../../skills/root/SKILL.md)\n')
        self.write('resources/b/GUIDE.md', '# B\n\n[Helper](scripts/run.py)\n')
        self.write('resources/b/assets/data.txt', 'relocatable payload\n')
        self.write('resources/b/scripts/run.py', 'from pathlib import Path\nprint((Path(__file__).resolve().parents[1] / "assets/data.txt").read_text().strip())\n')
        self.save_manifest()

    def write(self, path, text):
        target = self.repo / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text)

    def save_manifest(self):
        self.write('skill-dependencies.json', json.dumps(self.manifest))

    def run_bundle(self, command='build'):
        return subprocess.run([sys.executable, str(SCRIPT), command, '--root', str(self.repo)], capture_output=True, text=True)

    def test_transitive_cycle_is_flat_and_single_folder_can_move(self):
        result = self.run_bundle()
        self.assertEqual(result.returncode, 0, result.stderr)
        root = self.repo / 'skills/root'
        self.assertEqual(sorted(p.name for p in (root / 'embedded').iterdir() if p.is_dir()), ['a', 'b'])
        self.assertEqual(list(root.rglob('SKILL.md')), [root / 'SKILL.md'])
        self.assertIn('../../SKILL.md', (root / 'embedded/a/GUIDE.md').read_text())
        isolated = Path(self.temp.name) / 'isolated'
        shutil.copytree(root, isolated)
        shutil.rmtree(self.repo)
        bundle.check_links(isolated)
        result = subprocess.run([sys.executable, str(isolated / 'embedded/b/scripts/run.py')], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.strip(), 'relocatable payload')

    def test_source_change_invalidates_check_and_build_refreshes_it(self):
        self.assertEqual(self.run_bundle().returncode, 0)
        self.write('resources/b/assets/data.txt', 'updated payload\n')
        self.assertNotEqual(self.run_bundle('check').returncode, 0)
        self.assertEqual(self.run_bundle().returncode, 0)
        self.assertEqual(self.run_bundle('check').returncode, 0)
        generated = self.repo / 'skills/root/embedded/b/assets/data.txt'
        self.assertEqual(generated.read_text(), 'updated payload\n')

    def test_manual_generated_changes_are_preserved(self):
        self.assertEqual(self.run_bundle().returncode, 0)
        generated = self.repo / 'skills/root/embedded/b/assets/data.txt'
        generated.write_text('user change\n')
        result = self.run_bundle()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Generated file was edited', result.stderr)
        self.assertEqual(generated.read_text(), 'user change\n')

    def test_removing_dependency_removes_only_managed_files(self):
        self.assertEqual(self.run_bundle().returncode, 0)
        self.manifest['modules']['a']['dependencies'] = [{'name': 'root', 'when': 'Return.'}]
        self.write('resources/a/GUIDE.md', '# A\n\n[Caller](../../skills/root/SKILL.md)\n')
        self.save_manifest()
        self.assertEqual(self.run_bundle().returncode, 0)
        self.assertFalse((self.repo / 'skills/root/embedded/b').exists())
        self.assertTrue((self.repo / 'resources/b/assets/data.txt').exists())

    def test_undeclared_cross_skill_link_fails(self):
        self.manifest['modules']['a']['dependencies'] = []
        self.save_manifest()
        result = self.run_bundle()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Undeclared dependency b', result.stderr)

    def test_source_path_escape_is_rejected(self):
        self.manifest['modules']['b']['source'] = '../outside'
        self.save_manifest()
        result = self.run_bundle()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('source escapes', result.stderr)

    def test_unmanaged_file_is_never_removed(self):
        self.assertEqual(self.run_bundle().returncode, 0)
        extra = self.repo / 'skills/root/embedded/notes.txt'
        extra.write_text('local notes')
        result = self.run_bundle()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(extra.read_text(), 'local notes')


if __name__ == '__main__':
    unittest.main()

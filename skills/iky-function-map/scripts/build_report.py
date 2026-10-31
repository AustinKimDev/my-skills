#!/usr/bin/env python3
"""Build the review page from a checked map. Usage: build_report.py <planning-dir> [output.html]

Reads function-map.tsv, process-map.tsv and report.json, runs check_map first,
and writes review.html. Pictures in report.json must be files inside the
planning directory. Standard library only.
"""
import collections
import json
import pathlib
import sys

import check_map

HERE = pathlib.Path(__file__).resolve().parent
TEMPLATE = HERE.parent / "assets" / "report-template.html"
RISK_WORDS = ("돈", "민감", "되돌림 없음")
DISPOSITION_ORDER = ("유지", "합침", "연결", "공통", "구현 필요", "조건부 제거", "제거")


def require(report, errors):
    for key in ("title", "answer", "reasons", "next", "surfaces", "units", "limits"):
        if not report.get(key):
            errors.append(f"report.json: '{key}' is empty. See references/report-standard.md.")
    if report.get("answer") and len(report["answer"]) > 90:
        errors.append(f"report.json: answer is {len(report['answer'])} characters. Keep one sentence of 90 or fewer.")
    reasons = report.get("reasons") or []
    if reasons and not 2 <= len(reasons) <= 4:
        errors.append(f"report.json: {len(reasons)} reasons. Give 2 to 4.")


def bucket(answer, is_open):
    if is_open or not answer:
        return "답 없음"
    if answer.startswith("안 고침"):
        return "안 고침"
    if answer.startswith("X"):
        return "공통 능력"
    if answer.startswith(("N", "구현")):
        return "새 기능"
    return "결정"


def check_shot(base, shot, where, errors):
    src = shot.get("src", "")
    if not src or src.startswith(("/", "file:", "http:", "https:", "data:")) or ".." in src:
        errors.append(f"report.json: {where} needs a relative path inside the planning folder, got '{src}'")
    elif not (base / src).is_file():
        errors.append(f"report.json: {where} points to a missing file: {src}")
    for key in ("alt", "caption"):
        if not shot.get(key):
            errors.append(f"report.json: {where} ({src}) has no {key}. Say what the picture proves.")


def resolve_pictures(base, report, processes, errors):
    places = {f"{p['id']}-{s['order']}": (p, s) for p in processes for s in p["steps"]}
    for number, item in enumerate(report.get("evidence") or [], 1):
        where = f"evidence {number}"
        if not item.get("claim"):
            errors.append(f"report.json: {where} has no claim. State what the screen proves.")
        if not item.get("at"):
            errors.append(f"report.json: {where} names no step in 'at'. Use process-order, like E09-2.")
        item["steps"] = []
        for key in item.get("at") or []:
            if key not in places:
                errors.append(f"report.json: {where} names unknown step '{key}'")
                continue
            proc, step = places[key]
            item["steps"].append({"key": key, "process": proc["name"], "name": step["name"],
                                  "state": step["state"], "answer": step["answer"]})
        if not item.get("shots"):
            errors.append(f"report.json: {where} has no shots")
        for shot in item.get("shots") or []:
            check_shot(base, shot, where, errors)
    for decision in (report.get("decisions") or {}).get("open") or []:
        for shot in decision.get("shots") or []:
            check_shot(base, shot, f"decision {decision.get('id')}", errors)


def recombine(functions, meta, legacy, errors):
    """Rows per old section and new area. Empty without a legacy map."""
    if not legacy:
        return None
    links = collections.Counter()
    for row in functions:
        prefix = row["ID"].split("-")[0]
        if prefix not in legacy:
            errors.append(f"report.json: legacy has no name for ID prefix '{prefix}'")
            continue
        info = meta.get(check_map.unit_code(row["업무 단위"])) or {}
        links[(legacy[prefix], info.get("area", ""), info.get("surface", ""))] += 1
    left, right = collections.Counter(), collections.Counter()
    for (old, area, surface), count in links.items():
        left[old] += count
        right[(area, surface)] += count
    order = list(dict.fromkeys((info.get("area", ""), info.get("surface", "")) for info in meta.values()))
    surfaces = list(dict.fromkeys(surface for _, surface in order))
    order.sort(key=lambda key: surfaces.index(key[1]))
    return {
        "left": [{"name": name, "count": count} for name, count in left.most_common()],
        "right": [{"name": area, "surface": surface, "count": right[(area, surface)]}
                  for area, surface in order if right[(area, surface)]],
        "links": [{"from": old, "to": area, "surface": surface, "count": count}
                  for (old, area, surface), count in links.items()]}


def build(base):
    errors, warnings = [], []
    functions = check_map.read_tsv(base / "function-map.tsv", check_map.FUNCTION_COLUMNS, errors)
    steps = check_map.read_tsv(base / "process-map.tsv", check_map.PROCESS_COLUMNS, errors)
    check_map.check_functions(functions, errors, warnings)
    units_seen = {check_map.unit_code(r["업무 단위"]) for r in functions} - {""}
    check_map.check_processes(steps, units_seen, errors, warnings)
    path = base / "report.json"
    if not path.exists():
        errors.append(f"missing file: {path}. Copy assets/example/report.json as a start.")
        return errors, warnings, None
    report = json.loads(path.read_text(encoding="utf8"))
    require(report, errors)
    surface_names = {s.get("name") for s in report.get("surfaces") or []}
    meta = report.get("units") or {}
    for code in sorted(units_seen):
        info = meta.get(code)
        if not info:
            errors.append(f"report.json: unit {code} has no entry in units")
        elif info.get("surface") not in surface_names:
            errors.append(f"report.json: unit {code} names unknown surface '{info.get('surface')}'")
    if errors:
        return errors, warnings, None

    processes, by_id = [], {}
    for row in steps:
        pid = row["프로세스"]
        if pid not in by_id:
            by_id[pid] = {"id": pid, "name": row["이름"], "steps": []}
            processes.append(by_id[pid])
        unit = row["업무 단위"]
        broken = row["상태"] in check_map.BROKEN
        is_open = broken and row.get("해결", "").startswith("답 없음")
        kind = bucket(row.get("해결", ""), is_open)
        by_id[pid]["steps"].append({
            "order": row["순서"], "name": row["단계"], "unit": "밖" if unit in check_map.OUTSIDE else unit,
            "actor": row["행위자"],
            "state": row["상태"], "memo": row["메모"], "answer": row.get("해결", ""),
            "broken": broken, "open": is_open, "bucket": kind if broken else "",
            "fixed": broken and kind not in ("답 없음", "안 고침")})
    for proc in processes:
        counted = [s for s in proc["steps"] if s["state"] in ("있음", "끊김", "없음")]
        lanes = [s["unit"] for s in proc["steps"]]
        proc["counted"] = len(counted)
        proc["broken"] = sum(s["broken"] for s in proc["steps"])
        proc["handoffs"] = sum(a != b for a, b in zip(lanes, lanes[1:]))
    processes.sort(key=lambda p: -p["broken"])
    focus = report.get("focus") or [p["id"] for p in processes if p["broken"]][:4]
    for proc in processes:
        proc["focus"] = proc["id"] in focus

    units = []
    for code in meta:
        if code not in units_seen:
            continue
        rows = [r for r in functions if check_map.unit_code(r["업무 단위"]) == code]
        here = [s for p in processes for s in p["steps"] if s["unit"] == code]
        name = rows[0]["업무 단위"].split(None, 1)
        units.append({
            "code": code, "name": name[1] if len(name) > 1 else code, "area": meta[code].get("area", ""),
            "surface": meta[code]["surface"], "done": meta[code].get("done", ""), "functions": len(rows),
            "steps": len([s for s in here if s["state"] != "안 함"]), "broken": sum(s["broken"] for s in here),
            "risk": sum(any(w in r.get("위험 표지", "") for w in RISK_WORDS) for r in rows),
            "usage": next((r.get("사용 빈도") for r in rows if r.get("사용 빈도")), ""),
            "processes": [p["id"] for p in processes if any(s["unit"] == code for s in p["steps"])],
            "items": [{"id": r["ID"], "name": r["기능"][:70]} for r in rows]})
    routed = {s["name"] for s in report["surfaces"] if s.get("path")}
    crossing = sum(len({meta[s["unit"]]["surface"] for s in p["steps"] if s["unit"] in meta} & routed) > 1 for p in processes)
    counts = {
        "crossing": crossing, "unanswered": sum(s["open"] for p in processes for s in p["steps"]), "broken": sum(p["broken"] for p in processes), "counted": sum(p["counted"] for p in processes),
        "processes": len(processes), "broken_processes": sum(1 for p in processes if p["broken"]),
        "handoffs": sum(p["handoffs"] for p in processes), "units": len(units), "functions": len(functions)}
    for reason in report["reasons"]:
        try:
            reason["value"] = reason["value"].format(**counts)
        except (KeyError, IndexError):
            errors.append(f"report.json: unknown count in reason '{reason['value']}'. Use {sorted(counts)}.")
    resolve_pictures(base, report, processes, errors)
    moved = recombine(functions, meta, report.get("legacy"), errors)
    if errors:
        return errors, warnings, None
    tally = collections.Counter(r["처리"] for r in functions)
    data = {key: report.get(key) for key in (
        "title", "answer", "reasons", "next", "surfaces", "joins", "first_slice", "decisions", "limits", "links",
        "method", "boundary", "extras", "evidence", "evidence_note")}
    data.update(units=units, processes=processes, hasUsage=any(u["usage"] for u in units), counts=counts,
                flow=focus[0] if focus else None, recombine=moved,
                dispositions=[{"name": name, "count": tally[name]} for name in DISPOSITION_ORDER if tally[name]])
    return errors, warnings, data


def main():
    if len(sys.argv) not in (2, 3):
        print(__doc__)
        return 2
    base = pathlib.Path(sys.argv[1])
    output = pathlib.Path(sys.argv[2]) if len(sys.argv) == 3 else base / "review.html"
    errors, warnings, data = build(base)
    for line in warnings:
        print("WARNING", line)
    for line in errors:
        print("ERROR", line)
    if errors:
        print("FAIL")
        return 1
    payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    html = TEMPLATE.read_text(encoding="utf8").replace("__TITLE__", data["title"]).replace("__DATA__", payload)
    output.write_text(html, encoding="utf8")
    print("wrote", output, len(html))
    print("units", len(data["units"]), "processes", len(data["processes"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())

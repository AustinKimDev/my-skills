#!/usr/bin/env python3
"""Build the review page and slide deck from a checked map. Usage: build_report.py <planning-dir> [output.html]

Reads function-map.tsv, process-map.tsv and report.json, runs check_map first,
and writes review.html and deck.html next to the output. Standard library only.
"""
import json
import pathlib
import sys

import check_map

HERE = pathlib.Path(__file__).resolve().parent
TEMPLATE = HERE.parent / "assets" / "report-template.html"
DECK = HERE.parent / "assets" / "deck-template.html"
RISK_WORDS = ("돈", "민감", "되돌림 없음")


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
            "name": row["단계"], "unit": "밖" if unit in check_map.OUTSIDE else unit, "actor": row["행위자"],
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
    if errors:
        return errors, warnings, None
    data = {key: report.get(key) for key in (
        "title", "answer", "reasons", "next", "surfaces", "joins", "first_slice", "decisions", "limits", "links",
        "method", "boundary", "extras")}
    data.update(units=units, processes=processes, hasUsage=any(u["usage"] for u in units), counts=counts,
                flow=focus[0] if focus else None)
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
    for template, path in ((TEMPLATE, output), (DECK, output.with_name("deck.html"))):
        html = template.read_text(encoding="utf8").replace("__TITLE__", data["title"]).replace("__DATA__", payload)
        path.write_text(html, encoding="utf8")
        print("wrote", path, len(html))
    print("units", len(data["units"]), "processes", len(data["processes"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())

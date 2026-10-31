#!/usr/bin/env python3
"""Validate a function map and process map. Usage: check_map.py <planning-dir>

Prints errors, warnings and a summary. Exits 1 when any error is found.
Standard library only.
"""
import collections
import pathlib
import sys

DISPOSITIONS = {"유지", "합침", "연결", "공통", "구현 필요", "조건부 제거", "제거"}
STATES = {"있음", "끊김", "없음", "밖", "콘솔 밖", "안 함"}
OUTSIDE = {"밖", "콘솔 밖"}
BROKEN = {"끊김", "없음"}
FUNCTION_COLUMNS = ["ID", "기능", "업무 단위", "처리", "합치는 곳", "처리 사유"]
PROCESS_COLUMNS = ["프로세스", "이름", "순서", "단계", "업무 단위", "행위자", "상태", "메모"]


def read_tsv(path, required, errors):
    if not path.exists():
        errors.append(f"missing file: {path}")
        return []
    lines = [line for line in path.read_text(encoding="utf8").splitlines() if line.strip()]
    if not lines:
        errors.append(f"empty file: {path}")
        return []
    header = lines[0].split("\t")
    for column in required:
        if column not in header:
            errors.append(f"{path.name}: missing column {column}. Found: {', '.join(header)}")
    if any(column not in header for column in required):
        return []
    rows = []
    for number, line in enumerate(lines[1:], 2):
        cells = line.split("\t")
        cells += [""] * (len(header) - len(cells))
        row = dict(zip(header, cells))
        row["_line"] = number
        rows.append(row)
    return rows


def unit_code(cell):
    parts = cell.split()
    return parts[0] if parts else ""


def check_functions(rows, errors, warnings):
    by_id = {}
    for row in rows:
        fid, where = row["ID"], f"function-map.tsv:{row['_line']}"
        if not fid:
            errors.append(f"{where}: empty ID")
        elif fid in by_id:
            errors.append(f"{where}: duplicate ID {fid}")
        by_id[fid] = row
        if not unit_code(row["업무 단위"]):
            errors.append(f"{where}: {fid} has no work unit")
        if row["처리"] not in DISPOSITIONS:
            errors.append(f"{where}: {fid} has unknown 처리 '{row['처리']}'. Use: {', '.join(sorted(DISPOSITIONS))}")
        if row["처리"] not in ("유지", "") and not row["처리 사유"]:
            errors.append(f"{where}: {fid} ({row['처리']}) has no 처리 사유")
    for row in rows:
        fid, target, where = row["ID"], row["합치는 곳"], f"function-map.tsv:{row['_line']}"
        if row["처리"] == "합침":
            if target not in by_id:
                errors.append(f"{where}: {fid} merges into unknown ID '{target}'")
            elif by_id[target]["처리"] not in ("유지", "구현 필요"):
                errors.append(f"{where}: {fid} merges into {target}, which is {by_id[target]['처리']}")
        elif target:
            errors.append(f"{where}: {fid} has 합치는 곳 but is {row['처리']}")
    if rows and "사용 빈도" not in rows[0]:
        warnings.append("function-map.tsv: no 사용 빈도 column. Dispositions have no usage evidence.")
    return by_id


def check_processes(rows, units, errors, warnings):
    last_order = {}
    for row in rows:
        pid, where, unit, state = row["프로세스"], f"process-map.tsv:{row['_line']}", row["업무 단위"], row["상태"]
        if state not in STATES:
            errors.append(f"{where}: {pid} has unknown 상태 '{state}'. Use: {', '.join(sorted(STATES))}")
        if (unit in OUTSIDE) != (state in OUTSIDE):
            errors.append(f"{where}: {pid} unit '{unit}' does not match state '{state}'")
        if unit not in OUTSIDE and unit not in units:
            errors.append(f"{where}: {pid} uses unit '{unit}', which has no function row")
        if not row["순서"].isdigit():
            errors.append(f"{where}: {pid} has a non-numeric 순서 '{row['순서']}'")
        else:
            order = int(row["순서"])
            if order <= last_order.get(pid, 0):
                errors.append(f"{where}: {pid} step {order} is out of order")
            last_order[pid] = order
    has_answers = bool(rows) and "해결" in rows[0]
    unanswered = [r for r in rows if r["상태"] in BROKEN and not r.get("해결")]
    if rows and not has_answers:
        warnings.append(f"process-map.tsv: no 해결 column. {len(unanswered)} broken steps have no stated answer.")
    elif unanswered:
        for row in unanswered:
            errors.append(f"process-map.tsv:{row['_line']}: {row['프로세스']} '{row['단계']}' is {row['상태']} with no 해결. Write 답 없음 if none exists yet.")
    open_steps = [r for r in rows if r["상태"] in BROKEN and r.get("해결", "").startswith("답 없음")]
    if open_steps:
        warnings.append(f"process-map.tsv: {len(open_steps)} broken steps are marked 답 없음. The plan is not closed.")


def summarize(functions, steps, units):
    print("functions", len(functions), dict(collections.Counter(r["처리"] for r in functions).most_common()))
    print("units", len(units))
    by_process = collections.OrderedDict()
    for row in steps:
        by_process.setdefault(row["프로세스"], []).append(row)
    counted = [r for r in steps if r["상태"] not in OUTSIDE and r["상태"] != "안 함"]
    broken = [r for r in counted if r["상태"] in BROKEN]
    print("processes", len(by_process), "steps", len(steps), dict(collections.Counter(r["상태"] for r in steps)))
    if counted:
        print(f"broken {len(broken)} / {len(counted)} ({round(100 * len(broken) / len(counted))}%)")
    touched = {r["업무 단위"] for r in steps if r["업무 단위"] not in OUTSIDE}
    print("units no process touches:", ", ".join(sorted(units - touched)) or "none")
    single = [pid for pid, rows in by_process.items()
              if len({r["업무 단위"] for r in rows if r["업무 단위"] not in OUTSIDE}) == 1]
    print("single-unit processes:", ", ".join(single) or "none")
    if functions and "현재 위치" in functions[0]:
        origins = collections.defaultdict(set)
        for row in functions:
            origins[unit_code(row["업무 단위"])].add(row["현재 위치"])
        print("units from one old screen:", ", ".join(sorted(u for u, o in origins.items() if len(o) == 1)) or "none")


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    base = pathlib.Path(sys.argv[1])
    errors, warnings = [], []
    functions = read_tsv(base / "function-map.tsv", FUNCTION_COLUMNS, errors)
    steps = read_tsv(base / "process-map.tsv", PROCESS_COLUMNS, errors)
    check_functions(functions, errors, warnings)
    units = {unit_code(r["업무 단위"]) for r in functions} - {""}
    check_processes(steps, units, errors, warnings)
    summarize(functions, steps, units)
    for line in warnings:
        print("WARNING", line)
    for line in errors:
        print("ERROR", line)
    print("FAIL" if errors else "OK")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

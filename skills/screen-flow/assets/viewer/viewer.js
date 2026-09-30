const SVG_NS = "http://www.w3.org/2000/svg"

const LAYOUT = {
  nodeWidth: 150,
  nodeHeight: 390,
  colGap: 140,
  rowGap: 120,
  padX: 110,
  padY: 140,
}

const MODE_IDS = new Set(["graph", "all"])
const EDGE_TYPES = new Set(["primary", "optional", "return"])

const elements = {
  pageTitle: document.querySelector("#pageTitle"),
  pageDescription: document.querySelector("#pageDescription"),
  scopeSummary: document.querySelector("#scopeSummary"),
  reviewNotice: document.querySelector("#reviewNotice"),
  graphTitle: document.querySelector("#graphTitle"),
  flowDescription: document.querySelector("#flowDescription"),
  modeSwitch: document.querySelector("#modeSwitch"),
  searchInput: document.querySelector("#screenSearch"),
  searchResults: document.querySelector("#searchResults"),
  zoomTools: document.querySelector("#zoomTools"),
  zoomOut: document.querySelector("#zoomOut"),
  zoomReset: document.querySelector("#zoomReset"),
  zoomIn: document.querySelector("#zoomIn"),
  zoomFit: document.querySelector("#zoomFit"),
  loadingPanel: document.querySelector("#loadingPanel"),
  errorPanel: document.querySelector("#errorPanel"),
  errorMessage: document.querySelector("#errorMessage"),
  retryLoad: document.querySelector("#retryLoad"),
  graphView: document.querySelector("#graphView"),
  graphViewport: document.querySelector("#graphViewport"),
  graphPlane: document.querySelector("#graphPlane"),
  groupLayer: document.querySelector("#groupLayer"),
  connectorLayer: document.querySelector("#connectorLayer"),
  nodeLayer: document.querySelector("#nodeLayer"),
  graphEmpty: document.querySelector("#graphEmpty"),
  panHint: document.querySelector("#panHint"),
  allView: document.querySelector("#allView"),
  allSummary: document.querySelector("#allSummary"),
  sectionGroups: document.querySelector("#sectionGroups"),
  allEmpty: document.querySelector("#allEmpty"),
  screenDialog: document.querySelector("#screenDialog"),
  dialogKicker: document.querySelector("#dialogKicker"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogOriginal: document.querySelector("#dialogOriginal"),
  dialogClose: document.querySelector("#dialogClose"),
  dialogImage: document.querySelector("#dialogImage"),
  dialogImageState: document.querySelector("#dialogImageState"),
  incomingConnections: document.querySelector("#incomingConnections"),
  outgoingConnections: document.querySelector("#outgoingConnections"),
}

const state = {
  data: null,
  screenById: new Map(),
  sectionById: new Map(),
  mode: "graph",
  transform: { x: 34, y: 34, scale: 1 },
  plane: { width: 0, height: 0 },
  modalScreenId: "",
  returnFocus: null,
  searchIndex: -1,
  searchMatches: [],
  focusedScreenId: "",
  pan: null,
  graphInitialized: false,
  fitOnResize: false,
  suppressDialogHistory: false,
}

function createElement(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined && text !== null) node.textContent = text
  return node
}

function createSvgElement(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag)
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)))
  return node
}

function getSelectedFlow() {
  return state.data?.flows[0] ?? null
}

function sectionTitle(sectionId) {
  return state.sectionById.get(sectionId)?.title ?? "기타 화면"
}

function kindLabel(screen) {
  return screen.kind === "new" ? "새 제안" : screen.kind === "edit" ? "수정 시안" : "기존 시안"
}

function statusLabel(screen) {
  return screen.status === "ready" ? "시안 등록" : "이미지 준비 중"
}

function edgeTypeLabel(type) {
  if (type === "optional") return "선택 흐름"
  if (type === "return") return "돌아오기"
  return "주요 흐름"
}

function validateData(data) {
  if (!data || typeof data !== "object") throw new Error("flow.json 형식이 올바르지 않습니다.")
  if (!Array.isArray(data.sections)) throw new Error("sections 목록이 없습니다.")
  if (!Array.isArray(data.screens)) throw new Error("screens 목록이 없습니다.")
  if (!Array.isArray(data.flows)) throw new Error("flows 목록이 없습니다.")

  const screenIds = new Set()
  data.screens.forEach((screen) => {
    if (!screen?.id || !screen?.title) throw new Error("화면 ID 또는 제목이 비어 있습니다.")
    if (screenIds.has(screen.id)) throw new Error(`중복 화면 ID: ${screen.id}`)
    screenIds.add(screen.id)
  })

  const flowIds = new Set()
  data.flows.forEach((flow) => {
    if (!flow?.id || !flow?.title) throw new Error("흐름 ID 또는 제목이 비어 있습니다.")
    if (flowIds.has(flow.id)) throw new Error(`중복 흐름 ID: ${flow.id}`)
    flowIds.add(flow.id)
    if (!Array.isArray(flow.nodes) || !Array.isArray(flow.edges)) {
      throw new Error(`흐름 데이터가 비어 있습니다: ${flow.id}`)
    }
  })
}

async function loadData() {
  elements.loadingPanel.hidden = false
  elements.errorPanel.hidden = true
  hideViews()

  try {
    const response = await fetch("./flow.json", { cache: "no-store" })
    if (!response.ok) throw new Error(`flow.json 응답 오류 (${response.status})`)
    const data = await response.json()
    validateData(data)
    initializeData(data)
  } catch (error) {
    elements.loadingPanel.hidden = true
    elements.errorPanel.hidden = false
    hideViews()
    elements.errorMessage.textContent = error instanceof Error ? error.message : "flow.json 파일을 확인해 주세요."
  }
}

function initializeData(data) {
  state.data = data
  state.graphInitialized = false
  state.screenById = new Map(data.screens.map((screen) => [screen.id, screen]))
  state.sectionById = new Map(data.sections.map((section) => [section.id, section]))

  const params = new URLSearchParams(window.location.search)
  const requestedMode = params.get("mode")
  const requestedScreen = params.get("screen")
  state.mode = MODE_IDS.has(requestedMode) ? requestedMode : MODE_IDS.has(data.meta?.defaultMode) ? data.meta.defaultMode : "all"

  if (requestedScreen && state.screenById.has(requestedScreen)) {
    state.modalScreenId = requestedScreen
  }

  elements.pageTitle.textContent = data.meta?.title || "전체 모바일 앱 흐름"
  document.title = elements.pageTitle.textContent
  elements.pageDescription.textContent = data.meta?.description || "화면과 화면 사이의 연결을 살펴봅니다."
  elements.scopeSummary.textContent = `${data.screens.length}개 화면 · 하나의 전체 흐름`
  elements.reviewNotice.textContent =
    data.meta?.notice || "검토용 이미지와 제안 흐름입니다. 실제 앱 구현·동작 검증을 뜻하지 않습니다."

  elements.loadingPanel.hidden = true
  renderMode({ initialFit: state.mode === "graph" })

  if (state.modalScreenId) {
    window.requestAnimationFrame(() => {
      if (state.mode === "graph") centerGraphNode(state.modalScreenId)
      openScreenDetail(state.modalScreenId, null, false)
    })
  } else {
    updateUrl()
  }
}

function hideViews() {
  elements.graphView.hidden = true
  elements.allView.hidden = true
}

function renderMode({ resetGraph = false, initialFit = false } = {}) {
  if (!state.data) return

  hideViews()
  elements.modeSwitch.querySelectorAll("[data-mode]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode))
  })
  elements.zoomTools.hidden = state.mode !== "graph"

  if (state.mode === "graph") {
    elements.graphView.hidden = false
    renderGraph({ resetTransform: resetGraph })
    if (initialFit || !state.graphInitialized) window.requestAnimationFrame(fitGraph)
    state.graphInitialized = true
  } else {
    elements.allView.hidden = false
    renderAllScreens()
  }

  updateUrl()
}

function updateUrl() {
  if (!state.data) return
  const url = new URL(window.location.href)
  url.searchParams.set("mode", state.mode)
  url.searchParams.delete("flow")
  if (state.modalScreenId) url.searchParams.set("screen", state.modalScreenId)
  else url.searchParams.delete("screen")
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`)
}

function flowContainsScreen(flow, screenId) {
  return Boolean(flow?.nodes.some((node) => node.id === screenId))
}

function normalizedNode(node, index) {
  const col = Number.isFinite(Number(node.col)) ? Math.max(0, Number(node.col)) : index
  const row = Number.isFinite(Number(node.row)) ? Math.max(0, Number(node.row)) : 0
  return { ...node, col, row, index }
}

function nodeRect(node) {
  const colPitch = LAYOUT.nodeWidth + LAYOUT.colGap
  const rowPitch = LAYOUT.nodeHeight + LAYOUT.rowGap
  return {
    x: LAYOUT.padX + node.col * colPitch,
    y: (state.plane.topPadding ?? LAYOUT.padY) + node.row * rowPitch,
    width: LAYOUT.nodeWidth,
    height: LAYOUT.nodeHeight,
  }
}

function renderGraph({ resetTransform = false } = {}) {
  const flow = getSelectedFlow()
  elements.groupLayer.replaceChildren()
  elements.nodeLayer.replaceChildren()
  elements.connectorLayer.replaceChildren()
  state.focusedScreenId = ""

  if (!flow) {
    elements.graphTitle.textContent = "전체 앱 흐름"
    elements.flowDescription.textContent = "표시할 흐름이 없습니다."
    elements.graphEmpty.hidden = false
    state.plane = { width: 0, height: 0 }
    return
  }

  const nodes = flow.nodes
    .map(normalizedNode)
    .filter((node) => state.screenById.has(node.id))
  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const maxCol = Math.max(0, ...nodes.map((node) => node.col))
  const maxRow = Math.max(0, ...nodes.map((node) => node.row))
  const topPadding = LAYOUT.padY
  const bottomPadding = LAYOUT.padY
  const planeWidth = LAYOUT.padX * 2 + maxCol * (LAYOUT.nodeWidth + LAYOUT.colGap) + LAYOUT.nodeWidth
  const gridBottom = topPadding + maxRow * (LAYOUT.nodeHeight + LAYOUT.rowGap) + LAYOUT.nodeHeight
  const planeHeight =
    topPadding + maxRow * (LAYOUT.nodeHeight + LAYOUT.rowGap) + LAYOUT.nodeHeight + bottomPadding
  state.plane = { width: planeWidth, height: planeHeight, topPadding, bottomPadding, gridBottom, maxCol, maxRow }
  elements.graphPlane.style.width = `${planeWidth}px`
  elements.graphPlane.style.height = `${planeHeight}px`
  elements.groupLayer.style.width = `${planeWidth}px`
  elements.groupLayer.style.height = `${planeHeight}px`
  elements.nodeLayer.style.width = `${planeWidth}px`
  elements.nodeLayer.style.height = `${planeHeight}px`
  elements.connectorLayer.setAttribute("width", String(planeWidth))
  elements.connectorLayer.setAttribute("height", String(planeHeight))
  elements.connectorLayer.setAttribute("viewBox", `0 0 ${planeWidth} ${planeHeight}`)
  elements.graphTitle.textContent = flow.title
  elements.flowDescription.textContent = `${flow.description || "전체 화면 연결"} · 화면 ${nodes.length}개 · 연결 ${flow.edges.length}개`
  elements.graphEmpty.hidden = nodes.length > 0

  if (!nodes.length) return

  renderGroups(flow.groups || [])
  elements.connectorLayer.append(createMarkerDefinitions())
  renderEdges(flow, nodeById)
  nodes.forEach((node) => renderGraphNode(node))

  if (resetTransform) resetGraphTransform()
  else applyGraphTransform()
}

function renderGroups(groups) {
  elements.groupLayer.replaceChildren()
  const colPitch = LAYOUT.nodeWidth + LAYOUT.colGap
  const rowPitch = LAYOUT.nodeHeight + LAYOUT.rowGap
  groups.forEach((group) => {
    const cols = Math.max(1, Number(group.cols) || 1)
    const rows = Math.max(1, Number(group.rows) || 1)
    const box = createElement("section", "graph-group")
    box.style.left = `${LAYOUT.padX + Number(group.col || 0) * colPitch - 42}px`
    box.style.top = `${state.plane.topPadding + Number(group.row || 0) * rowPitch - 54}px`
    box.style.width = `${(cols - 1) * colPitch + LAYOUT.nodeWidth + 84}px`
    box.style.height = `${(rows - 1) * rowPitch + LAYOUT.nodeHeight + 96}px`
    box.append(createElement("h3", "", group.title || group.id || "화면 구역"))
    elements.groupLayer.append(box)
  })
}

function isDirectEdge(source, target, type) {
  if (type === "return") return false
  const isNextInRow = source.row === target.row && target.col === source.col + 1
  const isNextInColumn = source.col === target.col && Math.abs(target.row - source.row) === 1
  return isNextInRow || isNextInColumn
}

function createMarkerDefinitions() {
  const defs = createSvgElement("defs")
  const markerColors = {
    primary: "#6f5ac7",
    optional: "#92939d",
    return: "#8a607f",
  }

  Object.entries(markerColors).forEach(([type, color]) => {
    const marker = createSvgElement("marker", {
      id: `arrow-${type}`,
      viewBox: "0 0 8 8",
      refX: 7,
      refY: 4,
      markerWidth: 8,
      markerHeight: 8,
      orient: "auto-start-reverse",
      markerUnits: "userSpaceOnUse",
    })
    marker.append(createSvgElement("path", { d: "M 0 0 L 8 4 L 0 8 z", fill: color }))
    defs.append(marker)
  })
  return defs
}

function renderEdges(flow, nodeById) {
  const gutterUsage = new Map()

  flow.edges.forEach((edge, edgeIndex) => {
    const sourceNode = nodeById.get(edge.from)
    const targetNode = nodeById.get(edge.to)
    if (!sourceNode || !targetNode) return

    const type = EDGE_TYPES.has(edge.type) ? edge.type : "primary"
    let route
    if (isDirectEdge(sourceNode, targetNode, type)) {
      route = createDirectRoute(sourceNode, targetNode)
    } else {
      route = createGutterRoute(sourceNode, targetNode, type, edgeIndex, gutterUsage)
    }

    const path = createSvgElement("path", {
      class: `flow-edge ${type}`,
      d: pointsToPath(route.points),
      "marker-end": `url(#arrow-${type})`,
    })
    elements.connectorLayer.append(path)

    if (edge.label) {
      const label = createSvgElement("text", {
        class: "edge-label",
        x: route.labelX,
        y: route.labelY,
      })
      label.textContent = edge.label
      elements.connectorLayer.append(label)
    }
  })
}

function createDirectRoute(sourceNode, targetNode) {
  const source = nodeRect(sourceNode)
  const target = nodeRect(targetNode)
  if (sourceNode.row === targetNode.row) {
    const start = [source.x + source.width, source.y + source.height / 2]
    const end = [target.x, target.y + target.height / 2]
    return {
      points: [start, end],
      labelX: (start[0] + end[0]) / 2,
      labelY: start[1] - 11,
    }
  }

  const goingDown = targetNode.row > sourceNode.row
  const start = [source.x + source.width / 2, goingDown ? source.y + source.height : source.y]
  const end = [target.x + target.width / 2, goingDown ? target.y : target.y + target.height]
  return {
    points: [start, end],
    labelX: start[0] + 12,
    labelY: (start[1] + end[1]) / 2,
  }
}

function createGutterRoute(sourceNode, targetNode, type, edgeIndex, gutterUsage) {
  const source = nodeRect(sourceNode)
  const target = nodeRect(targetNode)
  const colPitch = LAYOUT.nodeWidth + LAYOUT.colGap
  const rowPitch = LAYOUT.nodeHeight + LAYOUT.rowGap
  const verticalGutter = (boundary) => LAYOUT.padX + boundary * colPitch - LAYOUT.colGap / 2
  const horizontalGutter = (boundary) =>
    state.plane.topPadding + boundary * rowPitch - LAYOUT.rowGap / 2
  let boundaryRow
  if (targetNode.row > sourceNode.row) boundaryRow = targetNode.row
  else if (targetNode.row < sourceNode.row) boundaryRow = targetNode.row + 1
  else if (type === "return") boundaryRow = sourceNode.row + 1
  else boundaryRow = edgeIndex % 2 === 0 ? sourceNode.row : sourceNode.row + 1

  boundaryRow = Math.max(0, Math.min(state.plane.maxRow + 1, boundaryRow))
  const laneOffsets = [0, -12, 12, -24, 24, -36, 36]
  const usage = gutterUsage.get(boundaryRow) || 0
  gutterUsage.set(boundaryRow, usage + 1)
  const laneY = horizontalGutter(boundaryRow) + laneOffsets[usage % laneOffsets.length]
  let start
  let end
  let sourceGutterX
  let targetGutterX

  if (targetNode.col > sourceNode.col) {
    start = [source.x + source.width, source.y + source.height / 2]
    end = [target.x, target.y + target.height / 2]
    sourceGutterX = verticalGutter(sourceNode.col + 1)
    targetGutterX = verticalGutter(targetNode.col)
  } else if (targetNode.col < sourceNode.col) {
    start = [source.x, source.y + source.height / 2]
    end = [target.x + target.width, target.y + target.height / 2]
    sourceGutterX = verticalGutter(sourceNode.col)
    targetGutterX = verticalGutter(targetNode.col + 1)
  } else if (type === "return" || targetNode.row < sourceNode.row) {
    start = [source.x, source.y + source.height / 2]
    end = [target.x + target.width, target.y + target.height / 2]
    sourceGutterX = verticalGutter(sourceNode.col)
    targetGutterX = verticalGutter(targetNode.col + 1)
  } else {
    start = [source.x + source.width, source.y + source.height / 2]
    end = [target.x, target.y + target.height / 2]
    sourceGutterX = verticalGutter(sourceNode.col + 1)
    targetGutterX = verticalGutter(targetNode.col)
  }

  return {
    points: simplifyRoutePoints([
      start,
      [sourceGutterX, start[1]],
      [sourceGutterX, laneY],
      [targetGutterX, laneY],
      [targetGutterX, end[1]],
      end,
    ]),
    labelX: (sourceGutterX + targetGutterX) / 2,
    labelY: laneY - 11,
  }
}

function simplifyRoutePoints(points) {
  const result = []
  points.forEach((point) => {
    const previous = result.at(-1)
    if (previous && previous[0] === point[0] && previous[1] === point[1]) return
    result.push(point)
    while (result.length >= 3) {
      const [a, b, c] = result.slice(-3)
      const isCollinear = (a[0] === b[0] && b[0] === c[0]) || (a[1] === b[1] && b[1] === c[1])
      if (!isCollinear) break
      result.splice(result.length - 2, 1)
    }
  })
  return result
}

function pointsToPath(points) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")
}

function renderGraphNode(node) {
  const screen = state.screenById.get(node.id)
  const rect = nodeRect(node)
  const button = createElement("button", "graph-node")
  button.type = "button"
  button.dataset.screenId = screen.id
  button.style.left = `${rect.x}px`
  button.style.top = `${rect.y}px`
  button.setAttribute("aria-label", `${screen.title} 화면 자세히 보기`)

  const imageFrame = createImageFrame(screen, "node-image")
  const caption = createElement("span", "node-caption")
  caption.append(createElement("strong", "", screen.title))
  const meta = createElement("span", "node-meta")
  meta.append(createKindBadge(screen), createElement("span", "", sectionTitle(screen.section)))
  caption.append(meta)
  button.append(imageFrame, caption)
  button.addEventListener("click", () => openScreenDetail(screen.id, button))
  elements.nodeLayer.append(button)
}

function createKindBadge(screen) {
  return createElement("span", `kind-badge${screen.kind === "new" ? " new" : ""}`, kindLabel(screen))
}

function createImageFrame(screen, className) {
  const frame = createElement("div", className)
  const imageState = createElement("span", "image-state")
  frame.dataset.imageState = screen.status === "ready" ? "loading" : "pending"

  if (screen.status !== "ready") {
    imageState.textContent = "이미지 준비 중"
    frame.append(imageState)
    return frame
  }

  if (!screen.image) {
    frame.dataset.imageState = "missing"
    imageState.textContent = "이미지 경로 없음"
    frame.append(imageState)
    return frame
  }

  imageState.textContent = "이미지 확인 중"
  const image = createElement("img")
  image.alt = `${screen.title} 화면 시안`
  image.loading = "lazy"
  image.decoding = "async"
  image.addEventListener(
    "load",
    () => {
      frame.dataset.imageState = image.naturalWidth > 0 ? "ready" : "missing"
      if (image.naturalWidth === 0) imageState.textContent = "이미지를 찾지 못했습니다"
    },
    { once: true },
  )
  image.addEventListener(
    "error",
    () => {
      frame.dataset.imageState = "missing"
      imageState.textContent = "이미지를 찾지 못했습니다"
      image.hidden = true
    },
    { once: true },
  )
  image.src = screen.image
  frame.append(image, imageState)

  if (image.complete) {
    frame.dataset.imageState = image.naturalWidth > 0 ? "ready" : "missing"
    if (image.naturalWidth === 0) {
      image.hidden = true
      imageState.textContent = "이미지를 찾지 못했습니다"
    }
  }
  return frame
}

function resetGraphTransform() {
  state.fitOnResize = false
  state.transform = { x: 34, y: 34, scale: 1 }
  applyGraphTransform()
}

function applyGraphTransform() {
  const { x, y, scale } = state.transform
  elements.graphPlane.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  elements.zoomReset.textContent = `${Math.round(scale * 100)}%`
}

function zoomGraph(factor, anchorX, anchorY) {
  if (!state.plane.width) return
  state.fitOnResize = false
  const viewportRect = elements.graphViewport.getBoundingClientRect()
  const pointX = anchorX ?? viewportRect.width / 2
  const pointY = anchorY ?? viewportRect.height / 2
  const previous = state.transform.scale
  const next = Math.min(1.8, Math.max(0.02, previous * factor))
  const worldX = (pointX - state.transform.x) / previous
  const worldY = (pointY - state.transform.y) / previous
  state.transform.scale = next
  state.transform.x = pointX - worldX * next
  state.transform.y = pointY - worldY * next
  applyGraphTransform()
}

function fitGraph() {
  if (!state.plane.width || !state.plane.height) return
  const width = elements.graphViewport.clientWidth
  const height = elements.graphViewport.clientHeight
  const padding = 34
  const scale = Math.min(1, (width - padding * 2) / state.plane.width, (height - padding * 2) / state.plane.height)
  state.transform.scale = Math.max(0.02, scale)
  state.transform.x = Math.max(padding, (width - state.plane.width * state.transform.scale) / 2)
  state.transform.y = Math.max(padding, (height - state.plane.height * state.transform.scale) / 2)
  state.fitOnResize = true
  applyGraphTransform()
}

function centerGraphNode(screenId) {
  const flow = getSelectedFlow()
  if (!flow) return
  const rawNode = flow.nodes.find((node) => node.id === screenId)
  if (!rawNode) return
  state.fitOnResize = false
  const node = normalizedNode(rawNode, flow.nodes.indexOf(rawNode))
  const rect = nodeRect(node)
  const width = elements.graphViewport.clientWidth
  const height = elements.graphViewport.clientHeight
  if (state.transform.scale < 0.72) state.transform.scale = 0.9
  state.transform.x = width / 2 - (rect.x + rect.width / 2) * state.transform.scale
  state.transform.y = height / 2 - (rect.y + rect.height / 2) * state.transform.scale
  applyGraphTransform()
  focusGraphNode(screenId)
}

function focusGraphNode(screenId) {
  elements.nodeLayer.querySelectorAll(".graph-node").forEach((node) => {
    node.classList.toggle("is-focused", node.dataset.screenId === screenId)
  })
  state.focusedScreenId = screenId
  window.setTimeout(() => {
    if (state.focusedScreenId !== screenId) return
    const node = elements.nodeLayer.querySelector(`[data-screen-id="${CSS.escape(screenId)}"]`)
    node?.classList.remove("is-focused")
    state.focusedScreenId = ""
  }, 1800)
}

function orderedFlowNodes(flow) {
  return flow.nodes
    .map(normalizedNode)
    .filter((node) => state.screenById.has(node.id))
    .sort((a, b) => a.row - b.row || a.col - b.col || a.index - b.index)
}

function renderSequence() {
  const flow = getSelectedFlow()
  elements.sequenceList.replaceChildren()
  if (!flow) {
    elements.sequenceEmpty.hidden = false
    return
  }

  const nodes = orderedFlowNodes(flow)
  elements.sequenceEmpty.hidden = nodes.length > 0
  const rows = new Map()
  nodes.forEach((node) => {
    if (!rows.has(node.row)) rows.set(node.row, [])
    rows.get(node.row).push(node)
  })

  const fragment = document.createDocumentFragment()
  ;[...rows.entries()].forEach(([row, rowNodes]) => {
    const group = createElement("section", "sequence-group")
    const groupHeading = createElement("div", "sequence-group-heading")
    groupHeading.append(
      createElement("h3", "", row === 0 ? "주 흐름" : `분기 흐름 ${row}`),
      createElement(
        "p",
        "",
        row === 0 ? "주요 연결을 중심으로 읽습니다." : "선택·오류·복귀 상태를 따로 모았습니다.",
      ),
    )
    group.append(groupHeading)
    const groupItems = createElement("div", "sequence-group-items")

    rowNodes.forEach((node, index) => {
      const screen = state.screenById.get(node.id)
      const item = createElement("article", "sequence-item")
      item.dataset.sequenceScreen = screen.id
      item.append(
        createElement(
          "span",
          `sequence-number${row === 0 ? "" : " branch"}`,
          `${row === 0 ? "주요" : "분기"}\n${String(index + 1).padStart(2, "0")}`,
        ),
      )
      item.append(createImageFrame(screen, "sequence-image"))

      const copy = createElement("div", "sequence-copy")
      copy.append(createElement("h3", "", screen.title))
      copy.append(createElement("p", "", screen.description || "설명 준비 중"))
      copy.append(createElement("span", "route-label", sectionTitle(screen.section)))
      const openButton = createElement("button", "sequence-open", "화면 자세히")
      openButton.type = "button"
      openButton.addEventListener("click", () => openScreenDetail(screen.id, openButton))
      copy.append(openButton)
      item.append(copy)

      const choices = createElement("div", "sequence-choices")
      choices.append(createElement("h4", "", "이 화면에서 이어지는 연결"))
      const outgoing = flow.edges.filter((edge) => edge.from === screen.id && state.screenById.has(edge.to))
      if (!outgoing.length) {
        choices.append(createElement("p", "no-choice", "이 흐름에서 이어지는 화면이 없습니다."))
      } else {
        outgoing.forEach((edge) => {
          const target = state.screenById.get(edge.to)
          const button = createElement("button", "choice-button")
          button.type = "button"
          button.append(
            createElement("strong", "", `${edge.label || "이동"} → ${target.title}`),
            createElement("span", "", edgeTypeLabel(edge.type)),
          )
          button.addEventListener("click", () => focusSequenceItem(target.id))
          choices.append(button)
        })
      }
      item.append(choices)
      groupItems.append(item)
    })
    group.append(groupItems)
    fragment.append(group)
  })
  elements.sequenceList.append(fragment)
}

function focusSequenceItem(screenId) {
  const target = elements.sequenceList.querySelector(`[data-sequence-screen="${CSS.escape(screenId)}"]`)
  if (!target) return
  elements.sequenceList.querySelectorAll(".sequence-item").forEach((item) => item.classList.remove("is-focused"))
  target.classList.add("is-focused")
  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" })
  target.querySelector(".sequence-open")?.focus({ preventScroll: true })
  window.setTimeout(() => target.classList.remove("is-focused"), 1800)
}

function renderAllScreens() {
  elements.sectionGroups.replaceChildren()
  const readyCount = state.data.screens.filter((screen) => screen.status === "ready").length
  const pendingCount = state.data.screens.length - readyCount
  elements.allSummary.textContent = `전체 ${state.data.screens.length}개 · 시안 등록 ${readyCount}개 · 생성 대기 ${pendingCount}개`
  elements.allEmpty.hidden = state.data.screens.length > 0
  if (!state.data.screens.length) return

  const knownSectionIds = new Set(state.data.sections.map((section) => section.id))
  const sections = [...state.data.sections]
  if (state.data.screens.some((screen) => !knownSectionIds.has(screen.section))) {
    sections.push({ id: "__other", title: "기타 화면" })
  }

  const fragment = document.createDocumentFragment()
  sections.forEach((section) => {
    const screens = state.data.screens.filter((screen) =>
      section.id === "__other" ? !knownSectionIds.has(screen.section) : screen.section === section.id,
    )
    if (!screens.length) return

    const group = createElement("section", "screen-group")
    group.dataset.sectionId = section.id
    const heading = createElement("div", "screen-group-heading")
    heading.append(createElement("h3", "", section.title), createElement("span", "", `${screens.length}개 화면`))
    group.append(heading)
    const grid = createElement("div", "screen-grid")

    screens.forEach((screen) => {
      const card = createElement("article", "screen-card")
      card.dataset.allScreen = screen.id
      const button = createElement("button", "screen-card-button")
      button.type = "button"
      button.setAttribute("aria-label", `${screen.title} 화면 자세히 보기`)
      button.append(createImageFrame(screen, "card-image"))
      const copy = createElement("span", "screen-card-copy")
      copy.append(createElement("strong", "", screen.title))
      copy.append(createElement("span", "", `${kindLabel(screen)} · ${statusLabel(screen)}`))
      button.append(copy)
      button.addEventListener("click", () => openScreenDetail(screen.id, button))
      card.append(button)
      grid.append(card)
    })
    group.append(grid)
    fragment.append(group)
  })
  elements.sectionGroups.append(fragment)
}

function collectConnections(screenId, direction) {
  const connections = []
  state.data.flows.forEach((flow) => {
    flow.edges.forEach((edge, edgeIndex) => {
      const matches = direction === "incoming" ? edge.to === screenId : edge.from === screenId
      if (!matches) return
      const otherId = direction === "incoming" ? edge.from : edge.to
      const otherScreen = state.screenById.get(otherId)
      if (!otherScreen) return
      connections.push({
        flow,
        edge,
        edgeIndex,
        otherScreen,
      })
    })
  })
  return connections
}

function openScreenDetail(screenId, trigger = null, updateHistory = true) {
  const screen = state.screenById.get(screenId)
  if (!screen) return

  state.modalScreenId = screenId
  state.returnFocus = trigger instanceof HTMLElement ? trigger : null
  elements.dialogKicker.textContent = `${sectionTitle(screen.section)} · ${kindLabel(screen)} · ${statusLabel(screen)}`
  elements.dialogTitle.textContent = screen.title
  elements.dialogDescription.textContent = screen.description || "화면 설명 준비 중"
  renderDialogImage(screen)
  renderConnectionList(elements.incomingConnections, collectConnections(screenId, "incoming"), "incoming")
  renderConnectionList(elements.outgoingConnections, collectConnections(screenId, "outgoing"), "outgoing")

  if (!elements.screenDialog.open) elements.screenDialog.showModal()
  document.body.style.overflow = "hidden"
  elements.dialogClose.focus({ preventScroll: true })
  if (updateHistory) updateUrl()
}

function renderDialogImage(screen) {
  elements.dialogImage.removeAttribute("src")
  elements.dialogImage.hidden = true
  elements.dialogImage.alt = ""
  elements.dialogImageState.hidden = false
  elements.dialogOriginal.hidden = true
  elements.dialogOriginal.removeAttribute("href")

  if (screen.status !== "ready") {
    elements.dialogImageState.textContent = "이 화면 이미지는 준비 중입니다."
    return
  }
  if (!screen.image) {
    elements.dialogImageState.textContent = "이미지 경로가 없습니다."
    return
  }

  elements.dialogImageState.textContent = "원본 이미지를 확인하고 있습니다."
  elements.dialogOriginal.href = screen.image
  elements.dialogOriginal.hidden = false
  elements.dialogImage.alt = `${screen.title} 화면 시안 원본`
  elements.dialogImage.onload = () => {
    if (elements.dialogImage.naturalWidth <= 0) return
    elements.dialogImage.hidden = false
    elements.dialogImageState.hidden = true
  }
  elements.dialogImage.onerror = () => {
    elements.dialogImage.hidden = true
    elements.dialogImageState.textContent = "이미지를 찾지 못했습니다."
    elements.dialogImageState.hidden = false
    elements.dialogOriginal.hidden = true
    elements.dialogOriginal.removeAttribute("href")
  }
  elements.dialogImage.src = screen.image
  if (elements.dialogImage.complete) {
    if (elements.dialogImage.naturalWidth > 0) elements.dialogImage.onload()
    else elements.dialogImage.onerror()
  }
}

function renderConnectionList(container, connections, direction) {
  container.replaceChildren()
  if (!connections.length) {
    container.append(
      createElement("p", "no-choice", direction === "incoming" ? "들어오는 연결이 없습니다." : "나가는 연결이 없습니다."),
    )
    return
  }

  connections.forEach(({ edge, otherScreen }) => {
    const button = createElement("button", "connection-button")
    button.type = "button"
    const title =
      direction === "incoming"
        ? `${otherScreen.title} → ${edge.label || "이 화면"}`
        : `${edge.label || "이동"} → ${otherScreen.title}`
    button.append(
      createElement("strong", "", title),
      createElement("span", "", edgeTypeLabel(edge.type)),
    )
    button.addEventListener("click", () => navigateFromDialog(otherScreen.id))
    container.append(button)
  })
}

function navigateFromDialog(screenId) {
  state.suppressDialogHistory = true
  elements.screenDialog.close()
  state.mode = "graph"
  state.modalScreenId = ""
  renderMode({ resetGraph: true })
  window.requestAnimationFrame(() => centerGraphNode(screenId))
}

function closeScreenDialog() {
  if (elements.screenDialog.open) elements.screenDialog.close()
}

function handleDialogClosed() {
  document.body.style.overflow = ""
  elements.dialogImage.removeAttribute("src")
  elements.dialogImage.onload = null
  elements.dialogImage.onerror = null
  state.modalScreenId = ""
  if (!state.suppressDialogHistory) updateUrl()
  state.suppressDialogHistory = false
  state.returnFocus?.focus({ preventScroll: true })
  state.returnFocus = null
}

function renderSearchResults() {
  const query = elements.searchInput.value.trim().toLocaleLowerCase("ko-KR")
  elements.searchResults.replaceChildren()
  state.searchIndex = -1
  state.searchMatches = []

  if (!query) {
    closeSearchResults()
    return
  }

  state.searchMatches = state.data.screens
    .filter((screen) => {
      const haystack = [
        screen.id,
        screen.title,
        screen.description,
        screen.route,
        sectionTitle(screen.section),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("ko-KR")
      return haystack.includes(query)
    })
    .slice(0, 14)

  if (!state.searchMatches.length) {
    elements.searchResults.append(createElement("p", "search-result-empty", "일치하는 화면이 없습니다."))
  } else {
    state.searchMatches.forEach((screen, index) => {
      const button = createElement("button", "search-result")
      button.type = "button"
      button.setAttribute("role", "option")
      button.dataset.searchIndex = String(index)
      button.setAttribute("aria-selected", "false")
      button.append(
        createElement("strong", "", screen.title),
        createElement("span", "", `${sectionTitle(screen.section)} · ${kindLabel(screen)}`),
      )
      button.addEventListener("click", () => activateSearchResult(screen.id))
      elements.searchResults.append(button)
    })
  }

  elements.searchResults.hidden = false
  elements.searchInput.setAttribute("aria-expanded", "true")
}

function closeSearchResults() {
  elements.searchResults.hidden = true
  elements.searchInput.setAttribute("aria-expanded", "false")
  state.searchIndex = -1
}

function updateSearchSelection(nextIndex) {
  if (!state.searchMatches.length) return
  state.searchIndex = Math.max(0, Math.min(state.searchMatches.length - 1, nextIndex))
  elements.searchResults.querySelectorAll(".search-result").forEach((button, index) => {
    const selected = index === state.searchIndex
    button.setAttribute("aria-selected", String(selected))
    if (selected) button.scrollIntoView({ block: "nearest" })
  })
}

function activateSearchResult(screenId) {
  closeSearchResults()
  elements.searchInput.value = ""

  if (flowContainsScreen(getSelectedFlow(), screenId)) {
    state.mode = "graph"
    renderMode({ resetGraph: true })
    window.requestAnimationFrame(() => {
      centerGraphNode(screenId)
      const node = elements.nodeLayer.querySelector(`[data-screen-id="${CSS.escape(screenId)}"]`)
      openScreenDetail(screenId, node)
    })
  } else {
    state.mode = "all"
    renderMode()
    window.requestAnimationFrame(() => {
      const card = elements.sectionGroups.querySelector(`[data-all-screen="${CSS.escape(screenId)}"]`)
      card?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" })
      openScreenDetail(screenId, card?.querySelector("button") ?? null)
    })
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function handlePointerDown(event) {
  if (event.button !== 0 || event.target.closest("button, a")) return
  state.pan = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: state.transform.x,
    originY: state.transform.y,
  }
  elements.graphViewport.setPointerCapture(event.pointerId)
  elements.graphViewport.classList.add("is-panning")
}

function handlePointerMove(event) {
  if (!state.pan || state.pan.pointerId !== event.pointerId) return
  state.fitOnResize = false
  state.transform.x = state.pan.originX + event.clientX - state.pan.startX
  state.transform.y = state.pan.originY + event.clientY - state.pan.startY
  applyGraphTransform()
}

function endPointerPan(event) {
  if (!state.pan || state.pan.pointerId !== event.pointerId) return
  state.pan = null
  elements.graphViewport.classList.remove("is-panning")
  if (elements.graphViewport.hasPointerCapture(event.pointerId)) {
    elements.graphViewport.releasePointerCapture(event.pointerId)
  }
}

function handleGraphWheel(event) {
  if (state.mode !== "graph") return
  event.preventDefault()
  state.fitOnResize = false
  const rect = elements.graphViewport.getBoundingClientRect()
  if (event.ctrlKey || event.metaKey) {
    zoomGraph(event.deltaY < 0 ? 1.1 : 0.9, event.clientX - rect.left, event.clientY - rect.top)
  } else {
    state.transform.x -= event.deltaX
    state.transform.y -= event.deltaY
    applyGraphTransform()
  }
}

function handleGraphKeydown(event) {
  if (event.target !== elements.graphViewport) return
  const step = event.shiftKey ? 80 : 34
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-", "0", "f", "F"].includes(event.key)) {
    event.preventDefault()
  }
  if (event.key !== "f" && event.key !== "F") state.fitOnResize = false
  if (event.key === "ArrowLeft") state.transform.x += step
  else if (event.key === "ArrowRight") state.transform.x -= step
  else if (event.key === "ArrowUp") state.transform.y += step
  else if (event.key === "ArrowDown") state.transform.y -= step
  else if (event.key === "+" || event.key === "=") zoomGraph(1.12)
  else if (event.key === "-") zoomGraph(0.88)
  else if (event.key === "0") resetGraphTransform()
  else if (event.key === "f" || event.key === "F") fitGraph()
  applyGraphTransform()
}

elements.modeSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]")
  if (!button || !MODE_IDS.has(button.dataset.mode)) return
  state.mode = button.dataset.mode
  renderMode()
})

elements.searchInput.addEventListener("input", renderSearchResults)
elements.searchInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault()
    updateSearchSelection(state.searchIndex + 1)
  } else if (event.key === "ArrowUp") {
    event.preventDefault()
    updateSearchSelection(state.searchIndex <= 0 ? 0 : state.searchIndex - 1)
  } else if (event.key === "Enter" && state.searchMatches.length) {
    event.preventDefault()
    const target = state.searchMatches[Math.max(0, state.searchIndex)]
    activateSearchResult(target.id)
  } else if (event.key === "Escape") {
    closeSearchResults()
  }
})

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".search-control")) closeSearchResults()
})

elements.zoomOut.addEventListener("click", () => zoomGraph(0.85))
elements.zoomReset.addEventListener("click", resetGraphTransform)
elements.zoomIn.addEventListener("click", () => zoomGraph(1.18))
elements.zoomFit.addEventListener("click", fitGraph)
elements.graphViewport.addEventListener("pointerdown", handlePointerDown)
elements.graphViewport.addEventListener("pointermove", handlePointerMove)
elements.graphViewport.addEventListener("pointerup", endPointerPan)
elements.graphViewport.addEventListener("pointercancel", endPointerPan)
elements.graphViewport.addEventListener("wheel", handleGraphWheel, { passive: false })
elements.graphViewport.addEventListener("keydown", handleGraphKeydown)

elements.dialogClose.addEventListener("click", closeScreenDialog)
elements.screenDialog.addEventListener("close", handleDialogClosed)
elements.screenDialog.addEventListener("click", (event) => {
  if (event.target === elements.screenDialog) closeScreenDialog()
})

elements.retryLoad.addEventListener("click", loadData)

window.addEventListener("resize", () => {
  if (state.mode !== "graph") return
  if (state.fitOnResize) fitGraph()
  else applyGraphTransform()
})

loadData()

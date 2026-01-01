/* =====================================================
   Wiskunde Quest – charts.js (OPTIMAAL)
   Didactisch correcte, rustige SVG-grafieken
   (Staaf – Lijn – Cirkel)
   - Automatische ijking: altijd voldoende labels, nooit "tapijt"
   - Backwards-compatible met svgLineChart(points, max, title) enz.
===================================================== */

/* =========================
   THEME
========================= */
const ChartTheme = {
  primary: "#3b82f6",
  primaryDark: "#1d4ed8",
  bg: "#ffffff",
  textMain: "#0f172a",
  textMuted: "#64748b",
  gridMajor: "#cbd5e1",
  gridMinor: "#d8e0ea",
  axis: "#94a3b8",
  pieColors: [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ]
};

/* =========================
   HELPERS
========================= */
function _fmtNL(n, dec = 0) {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: dec,
  }).format(n);
}
const _crisp = v => Math.round(v) + 0.5;

function _decFromStep(step) {
  if (!isFinite(step) || step <= 0) return 0;
  const s = String(step);
  const em = s.match(/e-(\d+)$/i);
  if (em) return Math.min(6, parseInt(em[1], 10));
  const i = s.indexOf(".");
  if (i === -1) return 0;
  return Math.min(6, s.length - i - 1);
}

function _niceNumber(x) {
  // classic "nice" rounding: 1,2,5,10 * 10^k
  if (!isFinite(x) || x <= 0) return 1;
  const exp = Math.floor(Math.log10(x));
  const f = x / Math.pow(10, exp);
  let nf;
  if (f <= 1) nf = 1;
  else if (f <= 2) nf = 2;
  else if (f <= 5) nf = 5;
  else nf = 10;
  return nf * Math.pow(10, exp);
}

function _autoMajorStep(maxV, desiredMajors = 7) {
  if (!isFinite(maxV) || maxV <= 0) return 1;
  let step = _niceNumber(maxV / Math.max(3, desiredMajors));
  // Vermijd te kleine major-stappen bij grotere assen (te veel labels).
  if (maxV >= 20 && step < 5) step = 5;
    if (maxV >= 8 && step < 2) step = 2;
if (maxV >= 60 && step < 10) step = 10;
  return step;
}

function _autoMinorStep(majorStep, maxMinorLines = 28) {
  // Doel:
  // - bij major 10 => minor 2
  // - bij major 0.5 => minor 0.1
  // - bij major 5 => minor 1
  // - bij major 2 => minor 0.5
  // - vermijd extreem veel lijntjes (tapijt)

  if (!isFinite(majorStep) || majorStep <= 0) return 1;

  const isNice = (step) => {
    if (!isFinite(step) || step <= 0) return false;
    const dec = _decFromStep(step);
    if (dec > 2) return false;
    const exp = Math.floor(Math.log10(step));
    const scaled = step / Math.pow(10, exp);
    return [1, 2, 2.5, 5, 10].some(v => Math.abs(scaled - v) < 1e-9);
  };

  // Eerste keuze: major/5 (didactisch heel herkenbaar)
  // vb: 10->2, 5->1, 0.5->0.1, 2->0.4 (dan wordt het 0.5 via nice)
  let cand = _niceNumber(majorStep / 5);
  if (cand <= majorStep && isNice(cand)) return cand;

  // Tweede keuze: major/4 (bv 2->0.5)
  cand = _niceNumber(majorStep / 4);
  if (cand <= majorStep && isNice(cand)) return cand;

  // Derde keuze: major/2
  cand = _niceNumber(majorStep / 2);
  if (cand <= majorStep && isNice(cand)) return cand;

  // Laatste: major (geen minor)
  return majorStep;
}

function _desiredMajors(maxV) {
  if (!isFinite(maxV) || maxV <= 0) return 7;
  if (maxV <= 5) return 6;
  if (maxV <= 200) return 10;
  return 7;
}


function _buildTicksSmart(maxV, minorStep = null, opts = {}) {
  const desiredMajors = opts.desiredMajors ?? 7;

  // 1) major step kiezen (altijd mooi)
  let majorStep = _autoMajorStep(maxV, desiredMajors);
  let axisMax = Math.ceil(maxV / majorStep) * majorStep || majorStep;

  // 2) minor step: expliciet of auto
  let step = (isFinite(minorStep) && minorStep > 0) ? minorStep : _autoMinorStep(majorStep);

  // als step groter is dan majorStep: maak step = majorStep
  if (step > majorStep) step = majorStep;

  // 3) herbereken axisMax zodat het netjes op majorStep eindigt
  axisMax = Math.ceil(maxV / majorStep) * majorStep || majorStep;

  // 4) bouw ticks
  const minorTicks = [];
  const majorTicks = [];

  // minor ticks op basis van step (maar tot axisMax)
  const minorCount = Math.round(axisMax / step);
  for (let i = 0; i <= minorCount; i++) {
    const v = +(i * step).toFixed(10);
    minorTicks.push(v);
  }

  // major ticks op basis van majorStep
  const majorCount = Math.round(axisMax / majorStep);
  for (let i = 0; i <= majorCount; i++) {
    const v = +(i * majorStep).toFixed(10);
    majorTicks.push(v);
  }

  // safety: als we te weinig majors hebben, halveer majorStep (max 2 keer)
  for (let tries = 0; tries < 2; tries++) {
    if (majorTicks.length >= 5) break;
    majorStep = majorStep / 2;
    majorStep = _niceNumber(majorStep);
    axisMax = Math.ceil(maxV / majorStep) * majorStep || majorStep;
    majorTicks.length = 0;
    const majorCount2 = Math.round(axisMax / majorStep);
    for (let i = 0; i <= majorCount2; i++) {
      majorTicks.push(+(i * majorStep).toFixed(10));
    }
  }

  return { axisMax, step, majorStep, minorTicks, majorTicks };
}

/* =====================================================
   BAR CHART
   svgBarChart([{label,value}], max, title, {step})
===================================================== */
function svgBarChart(data = [], max = 0, title = "", opts = {}) {
  const w = 420, h = 260;
  const padL = 56, padR = 18, padT = 46, padB = 44;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  if (!data.length) return "";

  const maxData = Math.max(...data.map(d => +d.value || 0), 0);
  const maxV = Math.max(+max || 0, maxData);

  const { axisMax, step, majorStep, minorTicks, majorTicks } =
    _buildTicksSmart(maxV, opts.step ?? null, { desiredMajors: _desiredMajors(maxV) });

  const dec = Math.max(_decFromStep(step), _decFromStep(majorStep));

  const slot = chartW / data.length;
  const barW = Math.min(38, slot * 0.6);

  /* --- GRID (rustig) --- */
  // Teken alle minor-lijnen zolang het niet overdreven wordt.
  // Daardoor kan je bv. bij step=0.1 netjes elke 0.1 zien.
  const MAX_MINOR_LINES = 60;
  const minorEvery = (minorTicks.length <= MAX_MINOR_LINES)
    ? 1
    : Math.ceil(minorTicks.length / MAX_MINOR_LINES);

  const hGrid = minorTicks.map((v, idx) => {
    const y = _crisp(padT + chartH - (v / axisMax) * chartH);
    const isMajor = (Math.abs((v / majorStep) - Math.round(v / majorStep)) < 1e-9) || majorTicks.includes(v);

    // teken alle majors + 1 op zoveel minors
    if (!isMajor && (idx % minorEvery !== 0)) return "";

    return `
      <line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}"
            stroke="${isMajor ? ChartTheme.gridMajor : ChartTheme.gridMinor}"
            stroke-width="${isMajor ? 1.4 : 1}"
            stroke-opacity="${isMajor ? 1 : 0.25}"/>
      ${isMajor ? `
        <text x="${padL - 10}" y="${y + 4}" text-anchor="end"
              font-size="11" font-weight="700"
              fill="${ChartTheme.textMuted}">
          ${_fmtNL(v, dec)}
        </text>` : ""}
    `;
  }).join("");

  const vGrid = data.map((_, i) => {
    const x = _crisp(padL + i * slot);
    return `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + chartH}"
                  stroke="${ChartTheme.gridMinor}" stroke-width="1" stroke-opacity="0.35"/>`;
  }).join("");

  /* --- BARS --- */
  const bars = data.map((d, i) => {
    const val = +d.value || 0;
    const bh = (val / axisMax) * chartH;
    const x = padL + i * slot + (slot - barW) / 2;
    const y = padT + chartH - bh;

    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${bh}"
            rx="7"
            fill="rgba(59,130,246,.65)"
            stroke="${ChartTheme.primaryDark}" stroke-width="1.6"/>
      <text x="${x + barW / 2}" y="${h - 14}"
            text-anchor="middle"
            font-size="11" font-weight="800"
            fill="${ChartTheme.textMain}">
        ${d.label}
      </text>
    `;
  }).join("");

  return `
  <svg viewBox="0 0 ${w} ${h}" width="100%"
       xmlns="http://www.w3.org/2000/svg"
       style="font-family: Inter, system-ui, sans-serif;">
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}"
          rx="14" fill="${ChartTheme.bg}"
          stroke="#e5e7eb" stroke-width="2.5"/>

    <text x="${w / 2}" y="28" text-anchor="middle"
          font-size="16" font-weight="900"
          fill="${ChartTheme.textMain}">
      ${title}
    </text>

    <rect x="${padL}" y="${padT}" width="${chartW}" height="${chartH}"
          rx="10" fill="#f8fafc"/>

    ${vGrid}
    ${hGrid}

    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}"
          stroke="${ChartTheme.axis}" stroke-width="2"/>
    <line x1="${padL}" y1="${padT + chartH}" x2="${w - padR}" y2="${padT + chartH}"
          stroke="${ChartTheme.axis}" stroke-width="2"/>

    ${bars}
  </svg>`;
}
window.svgBarChart = svgBarChart;

/* =====================================================
   BAR CHART (FINE)
   svgBarChartFine(labels[], values[], max, step, title)
===================================================== */
function svgBarChartFine(labels = [], values = [], max = 0, step = 1, title = "", opts = {}) {
  const data = (labels || []).map((l, i) => ({
    label: l,
    value: (values && values[i] != null) ? values[i] : 0
  }));
  return svgBarChart(data, max, title, { ...opts, step });
}
window.svgBarChartFine = svgBarChartFine;

/* =====================================================
   LINE CHART
   svgLineChart(labels[], values[], max, step, title)
   + compat:
     - svgLineChart(points, max, title)
     - svgLineChart(points, max, step, title)
===================================================== */
function svgLineChart(labels = [], values = [], max = 0, step = 1, title = "") {
  let stepExplicit = false;

  // Compat: svgLineChart(points, max, title) of svgLineChart(points, max, step, title)
  if (
    Array.isArray(labels) &&
    labels.length &&
    labels[0] &&
    typeof labels[0] === "object" &&
    ("x" in labels[0]) &&
    ("y" in labels[0])
  ) {
    const pts = labels;

    // Binnenkomende args:
    // (points, max, title)       -> values=max, max=title, step=1
    // (points, max, step, title) -> values=max, max=step, step=title (string) in oudere code, dus we fixen dit hieronder
    const arg2 = values; // meestal max
    const arg3 = max;    // title OF step
    const arg4 = step;   // title (als arg3 step was)
    const arg5 = title;  // (meestal leeg)

    labels = pts.map(p => p.x);
    values = pts.map(p => p.y);

    if (typeof arg2 === "number") max = arg2;

    if (typeof arg3 === "number") {
      step = arg3;
      stepExplicit = true;
    } else if (typeof arg3 === "string") {
      title = arg3;
    }

    if (typeof arg4 === "string") title = arg4;
    if (typeof arg5 === "string" && arg5) title = arg5;
  } else {
    // "normale" call: als de caller effectief een step meegaf (arg length >= 4), beschouw als expliciet
    if (arguments.length >= 4 && typeof step === "number" && isFinite(step) && step > 0) {
      stepExplicit = true;
    }
  }

  const w = 420, h = 260;
  const padL = 56, padR = 18, padT = 46, padB = 44;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  if (!labels.length || !values.length) return "";

  const maxData = Math.max(...values.map(v => +v || 0), 0);
  const maxV = Math.max(+max || 0, maxData);

  const { axisMax, step: usedStep, majorStep, minorTicks, majorTicks } =
    _buildTicksSmart(maxV, stepExplicit ? step : null, { desiredMajors: _desiredMajors(maxV) });

  const dec = Math.max(_decFromStep(usedStep), _decFromStep(majorStep));

  const xStep = (labels.length > 1) ? (chartW / (labels.length - 1)) : chartW;
  const yVal = v => padT + chartH - (v / axisMax) * chartH;

  /* --- GRID (rustig én duidelijk) --- */
  // Teken alle minor-lijnen zolang het niet overdreven wordt.
  // Daardoor kan je bv. bij step=2 netjes elke 2 zien.
  const MAX_MINOR_LINES = 60;
  const minorEvery = (minorTicks.length <= MAX_MINOR_LINES)
    ? 1
    : Math.ceil(minorTicks.length / MAX_MINOR_LINES);

  const hGrid = minorTicks.map((v, idx) => {
    const y = _crisp(yVal(v));
    const isMajor = (Math.abs((v / majorStep) - Math.round(v / majorStep)) < 1e-9) || majorTicks.includes(v);

    if (!isMajor && (idx % minorEvery !== 0)) return "";

    return `
      <line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}"
            stroke="${isMajor ? ChartTheme.gridMajor : ChartTheme.gridMinor}"
            stroke-width="${isMajor ? 1.3 : 1}"
            stroke-opacity="${isMajor ? 1 : 0.25}"/>
      ${isMajor ? `
        <text x="${padL - 10}" y="${y + 4}"
              text-anchor="end"
              font-size="11" font-weight="700"
              fill="${ChartTheme.textMuted}">
          ${_fmtNL(v, dec)}
        </text>` : ""}
    `;
  }).join("");

  /* --- LINE PATH --- */
  const path = values.map((v, i) => {
    const x = padL + i * xStep;
    const y = yVal(+v || 0);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  const ptsSvg = values.map((v, i) => {
    const x = padL + i * xStep;
    const y = yVal(+v || 0);
    return `<circle cx="${x}" cy="${y}" r="4.2"
                    fill="${ChartTheme.primary}"
                    stroke="${ChartTheme.primaryDark}"
                    stroke-width="2"/>`;
  }).join("");

  const xLabels = labels.map((l, i) => `
    <text x="${padL + i * xStep}" y="${h - 14}"
          text-anchor="middle"
          font-size="11" font-weight="800"
          fill="${ChartTheme.textMain}">
      ${l}
    </text>
  `).join("");

  return `
  <svg viewBox="0 0 ${w} ${h}" width="100%"
       xmlns="http://www.w3.org/2000/svg"
       style="font-family: Inter, system-ui, sans-serif;">
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}"
          rx="14" fill="${ChartTheme.bg}"
          stroke="#e5e7eb" stroke-width="2.5"/>

    <text x="${w / 2}" y="28" text-anchor="middle"
          font-size="16" font-weight="900"
          fill="${ChartTheme.textMain}">
      ${title}
    </text>

    <rect x="${padL}" y="${padT}" width="${chartW}" height="${chartH}"
          rx="10" fill="#f8fafc"/>

    ${hGrid}

    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}"
          stroke="${ChartTheme.axis}" stroke-width="2"/>
    <line x1="${padL}" y1="${padT + chartH}" x2="${w - padR}" y2="${padT + chartH}"
          stroke="${ChartTheme.axis}" stroke-width="2"/>

    <path d="${path}" fill="none"
          stroke="${ChartTheme.primaryDark}"
          stroke-width="2.6"/>

    ${ptsSvg}
    ${xLabels}
  </svg>`;
}
window.svgLineChart = svgLineChart;

/* =====================================================
   PIE CHART (optioneel met waarden)
   svgPieChart(labels[], values[], title, showValues=true)
===================================================== */
function svgPieChart(labels = [], values = [], title = "", showValues = true) {
  const total = (values || []).reduce((a, b) => a + (+b || 0), 0);
  if (total <= 0) return "";

  const w = 420, h = 260;
  const cx = 140, cy = 140, r = 70;
  let angle = -90;

  const slices = (values || []).map((vv, i) => {
    const v = +vv || 0;
    const a = (v / total) * 360;
    const mid = angle + a / 2;

    const x1 = cx + r * Math.cos(angle * Math.PI / 180);
    const y1 = cy + r * Math.sin(angle * Math.PI / 180);
    angle += a;
    const x2 = cx + r * Math.cos(angle * Math.PI / 180);
    const y2 = cy + r * Math.sin(angle * Math.PI / 180);

    const large = a > 180 ? 1 : 0;
    const color = ChartTheme.pieColors[i % ChartTheme.pieColors.length];

    const lx = cx + (r + 18) * Math.cos(mid * Math.PI / 180);
    const ly = cy + (r + 18) * Math.sin(mid * Math.PI / 180);

    return `
      <path d="M${cx},${cy} L${x1},${y1}
               A${r},${r} 0 ${large} 1 ${x2},${y2} Z"
            fill="${color}" stroke="#ffffff" stroke-width="2"/>
      ${showValues ? `
        <text x="${lx}" y="${ly}"
              text-anchor="middle"
              font-size="12"
              font-weight="800"
              fill="${ChartTheme.textMain}">
          ${_fmtNL(v)}
        </text>` : ""}
    `;
  }).join("");

  const legend = (labels || []).map((l, i) => {
    const color = ChartTheme.pieColors[i % ChartTheme.pieColors.length];
    return `
      <g transform="translate(260, ${78 + i * 22})">
        <rect width="12" height="12" rx="3" fill="${color}"/>
        <text x="18" y="11"
              font-size="12"
              font-weight="700"
              fill="${ChartTheme.textMain}">
          ${l}
        </text>
      </g>`;
  }).join("");

  return `
  <svg viewBox="0 0 ${w} ${h}" width="100%"
       xmlns="http://www.w3.org/2000/svg"
       style="font-family: Inter, system-ui, sans-serif;">
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}"
          rx="14"
          fill="${ChartTheme.bg}"
          stroke="#e5e7eb"
          stroke-width="2.5"/>

    <text x="${w / 2}" y="28"
          text-anchor="middle"
          font-size="16"
          font-weight="900"
          fill="${ChartTheme.textMain}">
      ${title}
    </text>

    ${slices}

    <circle cx="${cx}" cy="${cy}" r="${r}"
            fill="none"
            stroke="#e5e7eb"/>

    ${legend}
  </svg>`;
}
window.svgPieChart = svgPieChart;

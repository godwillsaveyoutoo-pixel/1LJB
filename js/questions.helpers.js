/* =========================
   Wiskunde Quest – question helpers
   Bouwt uniforme vraagobjecten
========================= */
function checkClickedCount(expected) {
  const on = document.querySelectorAll(".fraction-cell.on").length;
  return on === expected;
}

function svgImg(filename, size = 120) {
  return `
    <img 
      src="assets/svg/${filename}" 
      alt=""
      style="
        width:${size}px;
        max-width:100%;
        height:auto;
        display:block;
        margin:auto;
      "
    />
  `;
}


function svgImgSafe(filename, alt = "", size = 120) {
  // Toont een SVG uit assets/svg. Als het bestand ontbreekt, verschijnt een nette fallback.
  const safeAlt = String(alt || "").replace(/"/g, "&quot;");
  return `
    <div class="svgSafeWrap" style="width:${size}px; max-width:100%; margin:auto;">
      <img
        src="assets/svg/${filename}"
        alt="${safeAlt}"
        style="width:100%; height:auto; display:block; margin:auto;"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
      />
      <div class="svgSafeFallback" style="display:none; place-items:center; text-align:center; padding:10px; border:1px dashed rgba(255,255,255,.35); border-radius:12px; font-size:12px; opacity:.85;">
        <div style="font-size:18px; line-height:1;">🧩</div>
        <div style="margin-top:6px;">${filename}</div>
      </div>
    </div>
  `;
}


function qInput(
  topic,
  skill,
  prompt,
  answer,
  inputKind = "number",
  unit = null,
  visualHtml = null,
  tol = 0.01,
  sub = null,
  check = null,
  hasInlineInput = false   // 👈 NIEUW
) {
  return {
    kind: "input",
    topic,
    skill,
    prompt,
    answer,
    inputKind,
    unit,
    visualHtml,
    tol,
    sub,
    check,
    hasInlineInput
  };
}

function qRatio(
  topic,
  id,
  prompt,
  table,
  answer,
  unit = null,
  visual = null,
  tol = 0.01
) {
  const cellHtml = (v) => {
    if (v === null) {
      return `<input
        class="ratioInput"
        data-ratio-input
        inputmode="decimal"
        autocomplete="off"
      />`;
    }
    return `<span>${v}</span>`;
  };

  const rowsHtml = table.rows.map(([left, right]) => `
    <tr>
      <td class="ratioCell">${cellHtml(left)}</td>
      <td class="ratioCell">${cellHtml(right)}</td>
    </tr>
  `).join("");

  const ratioTableHtml = `
    <div class="ratioWrap">
      <table class="ratioTable">
        <thead>
          <tr>
            <th>${table.leftLabel}</th>
            <th>${table.rightLabel}</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;

  return {
    topic,
    id,
    skill: id,
    kind: "input",
    inputKind: "number",
    prompt,
    answer,
    tol,
    unit,
    visual: `${visual ?? ""}${ratioTableHtml}`
  };
}



function qRatioFill(
  topic,
  id,
  prompt,
  table,
  expectedList,
  unit = null,
  visual = null,
  options = {}
) {
  const tol = options.tol ?? 0.01;
  const askFactor = options.factor ?? null; // { op:"×"|"÷", expected:number } of null

  let exp = Array.isArray(expectedList) ? expectedList.slice() : [];
  let factorExpected = askFactor?.expected;

  const rowsHtml = table.rows.map(([left, right]) => {
    const cell = (v) => {
      if (v === null) {
        const idx = exp.length ? (expectedList.length - exp.length) : 0;
        // we don't pop here; we just render and check later in DOM order
        return `<input class="ratioInput" data-ratio-input inputmode="decimal" placeholder="" />`;
      }
      return `<span>${v}</span>`;
    };
    return `
      <tr>
        <td class="ratioCell">${cell(left)}</td>
        <td class="ratioCell">${cell(right)}</td>
      </tr>
    `;
  }).join("");

  const factorHtml = askFactor ? `
    <div class="ratioFactorLine">
      <span class="ratioFactorOp">${askFactor.op}</span>
      <input class="ratioInput ratioFactorIn" data-ratio-input inputmode="decimal" placeholder="..." />
    </div>
  ` : "";

  const ratioTableHtml = `
    <div class="ratioWrap">
      ${factorHtml}
      <table class="ratioTable">
        <thead>
          <tr>
            <th>${table.leftLabel}</th>
            <th>${table.rightLabel}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;

  function parseNL(x) {
    const s = String(x ?? "").trim();
    if (!s) return NaN;
    const n = Number(String(s).replace(",", "."));
    return n;
  }

  const check = () => {
    const inputs = Array.from(document.querySelectorAll(".ratioWrap input[data-ratio-input]"));
    // factor input staat (als aanwezig) altijd eerst
    let offset = 0;
    if (askFactor) {
      const f = parseNL(inputs[0]?.value);
      if (Number.isNaN(f) || Math.abs(f - factorExpected) > tol) return false;
      offset = 1;
    }
    const blanks = inputs.slice(offset);
    if (blanks.length !== expectedList.length) return false;
    for (let i = 0; i < blanks.length; i++) {
      const v = parseNL(blanks[i].value);
      const e = expectedList[i];
      if (Number.isNaN(v) || Math.abs(v - e) > tol) return false;
    }
    return true;
  };

  return {
    topic,
    id,
    skill: id,
    kind: "input",
    inputKind: "number",
    prompt,
    answer: 0, // niet gebruikt, check() bepaalt alles
    unit,
    tol,
    check,
    sub: options.sub ?? null,
    visual: `
      ${visual ?? ""}
      ${ratioTableHtml}
    `
  };
}

function checkPercentGrid(expectedCount) {
  const cells = document.querySelectorAll(".percent-cell.active");
  return cells.length === expectedCount;
}



function qAngleMeasure(
  topic,
  skill,
  prompt,
  answerDeg,
  visualHtml,
  tol = 2,
  sub = "Tip: Shift + slepen om te draaien"
) {
  return qInput(topic, skill, prompt, answerDeg, "number", "°", visualHtml, tol, sub);
}


function qMc(
  topic,
  skill,
  prompt,
  options,
  answer,
  visualHtml = null,
  sub = null
) {
  return {
    kind: "mc",
    topic,
    skill,
    prompt,
    options,
    answer,
    answerKey: (typeof mcKey === "function" ? mcKey(answer) : String(answer ?? "")),
    visualHtml,
    sub,
  };
}
function checkIrreducibleFraction(expectedStr) {
  const expected = parseFractionNL(expectedStr); // is al vereenvoudigd

  return (raw) => {
    const s = String(raw ?? "").trim().replace(/\s+/g, "");
    const m = s.match(/^([-+]?\d+)\/([-+]?\d+)$/);
    if (!m) return false;

    let n = Number(m[1]);
    let d = Number(m[2]);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return false;
    if (d < 0) { d = -d; n = -n; }

    // onvereenvoudigbaar?
    if (gcd(n, d) !== 1) return false;

    return !!expected && n === expected.n && d === expected.d;
  };
}
/* ---------- Exports ---------- */
window.qInput = qInput;
window.qMc = qMc;
window.qAngleMeasure = qAngleMeasure;
window.checkPercentGrid = checkPercentGrid;
window.checkClickedCount = checkClickedCount;
window.qRatio = qRatio;
window.qRatioFill = qRatioFill;
window.svgImg = svgImg;
window.svgImgSafe = svgImgSafe;

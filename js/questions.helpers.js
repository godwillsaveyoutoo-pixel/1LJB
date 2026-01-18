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
  if (topic && typeof topic === "object" && skill == null) {
    const cfg = topic;
    return qInput(
      cfg.topic,
      cfg.skill,
      cfg.prompt,
      cfg.answer,
      cfg.inputKind || "number",
      cfg.unit ?? null,
      cfg.visual ?? cfg.visualHtml ?? null,
      cfg.tol ?? 0.01,
      cfg.sub ?? null,
      cfg.check ?? null,
      cfg.hasInlineInput ?? false
    );
  }
  const visualAuto = inhoudAutoVisual({ topic, skill, prompt, unit, visualHtml });
  return {
    kind: "input",
    topic,
    skill,
    prompt,
    answer,
    inputKind,
    unit,
    visualHtml: visualHtml || visualAuto,
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

  const rowsHtml = table.rows.map(([left, right], i) => {
    return `
      <tr>
        <td class="ratioCell">${left}</td>
        <td class="ratioCell">
          ${
            right === null
              ? `<input
                   class="ratioInput"
                   data-ratio-input
                   inputmode="decimal"
                   autocomplete="off"
                 />`
              : `<span>${right}</span>`
          }
        </td>
      </tr>
    `;
  }).join("");

  const ratioTableHtml = `
    <div class="ratioWrap">
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

  return {
    topic,
    id,
    skill: id,
    kind: "input",          // blijft input → werkt met jouw game.js
    inputKind: "number",    // ✔ zorgt dat keypad correct verschijnt
    prompt,
    answer,
    tol,
    unit,

    visual: `
      ${visual ?? ""}
      ${ratioTableHtml}
    `
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

  const rows = Array.isArray(table?.rows) ? table.rows : [];
  const is3Col = rows.some(r => Array.isArray(r) && r.length === 3); // recipe-mode

  function cell(v, wantsInput) {
    if (wantsInput) {
      return `<input class="ratioInput" data-ratio-input inputmode="decimal" autocomplete="off" />`;
    }
    return `<span>${v ?? ""}</span>`;
  }

  // Render rows
  const rowsHtml = rows.map((row) => {
    // 3-koloms: [label, left, right]
    if (Array.isArray(row) && row.length === 3) {
      const [label, left, right] = row;
      return `
        <tr>
          <td class="ratioCell ratioLabel">${label ?? ""}</td>
          <td class="ratioCell">${cell(left, left === null)}</td>
          <td class="ratioCell">${cell(right, right === null)}</td>
        </tr>
      `;
    }

    // 2-koloms legacy: [left, right]
    const [left, right] = row;
    return `
      <tr>
        <td class="ratioCell">${cell(left, left === null)}</td>
        <td class="ratioCell">${cell(right, right === null)}</td>
      </tr>
    `;
  }).join("");

  const factorHtml = askFactor ? `
    <div class="ratioFactorLine">
      <span class="ratioFactorOp">${askFactor.op}</span>
      <input class="ratioInput ratioFactorIn" data-ratio-input inputmode="decimal" placeholder="..." autocomplete="off" />
    </div>
  ` : "";

  const ratioTableHtml = `
    <div class="ratioWrap">
      ${factorHtml}
      <table class="ratioTable">
        <thead>
          <tr>
            ${is3Col ? `<th></th>` : ``}
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
    return Number(s.replace(",", "."));
  }

  const check = () => {
    const inputs = Array.from(document.querySelectorAll(".ratioWrap input[data-ratio-input]"));

    // factor input staat (als aanwezig) altijd eerst
    let offset = 0;
    if (askFactor) {
      const f = parseNL(inputs[0]?.value);
      if (Number.isNaN(f) || Math.abs(f - askFactor.expected) > tol) return false;
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
  const visualAuto = inhoudAutoVisual({ topic, skill, prompt, unit: null, visualHtml });
  return {
    kind: "mc",
    topic,
    skill,
    prompt,
    options,
    answer,
    answerKey: (typeof mcKey === "function" ? mcKey(answer) : String(answer ?? "")),
    visualHtml: visualHtml || visualAuto,
    sub,
  };
}

function inhoudAutoVisual({ topic, skill, prompt, unit, visualHtml }) {
  if (topic !== "inhoud") return null;
  if (visualHtml) return null;

  const text = String(prompt || "").toLowerCase();
  const sk = String(skill || "").toLowerCase();

  if (sk.includes("convert") && typeof window.svgConvertUnits === "function") {
    const m = text.match(/([0-9]+(?:[.,][0-9]+)?)\s*(ml|cl|dl|l)/i);
    const m2 = text.match(/____\s*(ml|cl|dl|l)/i);
    if (m && m2) {
      const val = String(m[1]).replace(".", ",");
      const fromU = m[2];
      const toU = m2[1];
      return window.svgConvertUnits(val, fromU, toU, "Herleid");
    }
  }

  const picks = [
    { re: /drinkbus|bidon|sportfles|flesje/, file: "sportfles.svg" },
    { re: /brik|melk|choco|sap/, file: "brik_melk_1l.svg" },
    { re: /glas|mokken|mok|kop/, file: "mok.svg" },
    { re: /blikje|frisdrank|cola/, file: "blikje_33cl.svg" },
    { re: /waterkoker|koker/, file: "waterkoker.svg" },
    { re: /emmer|bucket/, file: "emmer.svg" },
    { re: /jerrycan/, file: "jerrycan_5l.svg" },
    { re: /badkuip|bad/, file: "badkuip.svg" },
    { re: /aquarium|vis/, file: "aquarium.svg" },
    { re: /spuit|spuitje/, file: "spuit_20ml.svg" },
    { re: /theelepel/, file: "theelepel_5ml.svg" },
    { re: /eetlepel/, file: "eetlepel_15ml.svg" },
    { re: /kookpot|pot|pan/, file: "kookpot.svg" }
  ];

  const found = picks.find(p => p.re.test(text));
  if (found) return svgImgSafe(found.file, "");

  if (/(ml|cl|dl|l)\b/.test(text) || /inhoud/.test(text)) {
    const fallback = unit === "dl" ? "maatbeker_dl.svg" : "maatbeker_1000ml.svg";
    return svgImgSafe(fallback, "");
  }

  return null;
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
window.checkIrreducibleFraction = checkIrreducibleFraction;
window.qRatio = qRatio;
window.qRatioFill = qRatioFill;
window.svgImg = svgImg;
window.svgImgSafe = svgImgSafe;

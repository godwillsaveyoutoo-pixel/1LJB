/* =========================
   Wiskunde Quest – core.js
   Core helpers, utilities & app lifecycle
   (GEEN game-logica)
========================= */

/* ---------- DOM helpers ---------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ---------- Math & string utils ---------- */
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const norm = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace("ℓ", "l");

/* ---------- Arrays ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Dates & time ---------- */
function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function msToClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = Math.floor(s / 60);
  const ss = String(s % 60).padStart(2, "0");
  return `${String(mm).padStart(2, "0")}:${ss}`;
}

/* ---------- Numbers (NL-friendly) ---------- */
function parseNumNL(s) {
  s = String(s ?? "").trim();
  if (!s) return NaN;

  // remove spaces
  s = s.replace(/\s+/g, "");

  // Belgian/Dutch habits:
  // - decimal comma: 12,5
  // - thousands dot: 1.800 or 12.500
  if (s.includes(",")) {
    // treat comma as decimal separator, dots as thousands separators
    s = s.replace(/\./g, "").replace(",", ".");
  } else {
    // if it looks like thousands grouping (1.234 or 12.345.678), remove dots
    if (/^[-+]?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  }

  if (!/^[-+]?\d+(\.\d+)?$/.test(s)) return NaN;
  return Number(s);
}


function formatNL(n) {
  if (Number.isInteger(n)) return String(n);
  return String(n).replace(".", ",");
}

/* ---------- Fractions ---------- */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/* ---------- Accuracy → level ---------- */
function levelFromAccuracy(acc) {
  if (acc < 55) return "easy";
  if (acc < 80) return "normal";
  return "hard";
}

/* ---------- Units & time helpers ---------- */
function convert(value, from, to) {
  const table = {
    ml: 1,
    cl: 10,
    dl: 100,
    l: 1000,
    dm3: 1000,
    m3: 1_000_000,
  };
  return (value * table[from]) / table[to];
}

function addTime(h, m, dh, dm) {
  let total = h * 60 + m + dh * 60 + dm;
  total = ((total % 1440) + 1440) % 1440;
  return {
    h: Math.floor(total / 60),
    m: total % 60,
  };
}


/* ---------- Time (HH:MM) ---------- */
function parseTimeNL(s) {
  s = String(s ?? "").trim();
  if (!s) return null;

  s = s.replace(/\s+/g, "");
  // allow "7u20" style
  s = s.replace(/u/gi, ":");

  // HH:MM
  let m = s.match(/^(\d{1,2}):(\d{1,2})$/);
  if (m) {
    const h = Number(m[1]);
    const mm = Number(m[2]);
    if (Number.isFinite(h) && Number.isFinite(mm) && h >= 0 && h < 24 && mm >= 0 && mm < 60) {
      return { h, m: mm };
    }
    return null;
  }

  // 3-4 digits like 720 -> 7:20
  if (/^\d{3,4}$/.test(s)) {
    const mm = Number(s.slice(-2));
    const h = Number(s.slice(0, -2));
    if (h >= 0 && h < 24 && mm >= 0 && mm < 60) return { h, m: mm };
  }

  return null;
}

function formatTime(h, m) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* ---------- Fractions (a/b) ---------- */
function parseFractionNL(s) {
  s = String(s ?? "").trim();
  if (!s) return null;

  // allow spaces around '/'
  s = s.replace(/\s+/g, "");

  // integer
  if (/^[-+]?\d+$/.test(s)) {
    return { n: Number(s), d: 1 };
  }

  const m = s.match(/^([-+]?\d+)\/([-+]?\d+)$/);
  if (!m) return null;

  let n = Number(m[1]);
  let d = Number(m[2]);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;

  // normalize sign
  if (d < 0) {
    d = -d;
    n = -n;
  }

  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

function fractionEqual(a, b) {
  if (!a || !b) return false;
  return a.n * b.d === b.n * a.d;
}

// ─────────────────────────────────────────────────────
// FRACTION HELPERS (raw parse + simplified check)
//  - parseFractionNL() blijft "equivalent-vriendelijk" (reduceert).
//  - parseFractionRawNL() bewaart wat de leerling typte (geen reductie).
// ─────────────────────────────────────────────────────

function parseFractionRawNL(s) {
  if (s == null) return null;
  const str = String(s).trim().replace(/,/g, ".");
  if (!str) return null;

  // geheel getal
  if (!str.includes("/")) {
    const n = parseInt(str, 10);
    if (!Number.isFinite(n)) return null;
    return { n, d: 1 };
  }

  const parts = str.split("/");
  if (parts.length !== 2) return null;

  let n = parseInt(parts[0], 10);
  let d = parseInt(parts[1], 10);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;

  // normaliseer teken zodat noemer positief is
  if (d < 0) {
    n = -n;
    d = -d;
  }

  return { n, d };
}

function fractionEqualRaw(a, b) {
  if (!a || !b) return false;
  return a.n * b.d === b.n * a.d;
}

function fractionIsSimplified(a) {
  if (!a) return false;
  const n = Math.abs(a.n);
  const d = Math.abs(a.d);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return false;
  return gcd(n, d) === 1;
}

/* ======================================================
   APP LIFECYCLE & SCREEN MANAGEMENT
====================================================== */

const APP = {
  ready: false,
  screen: null,
};

function hideAllScreens() {
  $$(".screen").forEach((s) => (s.style.display = "none"));
}

function showScreen(id) {
  const el = document.getElementById(id);
  if (!el) return;
  hideAllScreens();
  el.style.display = "block";
  APP.screen = id;
}

/* ---------- Init (defensief) ---------- */
function initApp() {
  if (APP.ready) return;
  APP.ready = true;

  hideAllScreens();
  showScreen("scrStart"); // auth.js beslist later anders

  try {
    window.updateUserPill?.();
    window.renderSettings?.();
  } catch (_) {}
}

/* ---------- Rate limiting ---------- */
const _rate = {};
function rateLimit(key, ms = 400) {
  const now = Date.now();
  if (_rate[key] && now - _rate[key] < ms) return false;
  _rate[key] = now;
  return true;
}

/* ---------- Exports ---------- */
Object.assign(window, {
  $,
  $$,
  showScreen,
  shuffle,
  clamp,
  norm,
  todayKey,
  msToClock,
  parseNumNL,
  formatNL,
  gcd,
  levelFromAccuracy,
  convert,
  addTime,
  parseTimeNL,
  formatTime,
  parseFractionNL,
  fractionEqual,
  parseFractionRawNL,
  fractionEqualRaw,
  fractionIsSimplified,
  rateLimit,
});

/* ---------- Auto init ---------- */
document.addEventListener("DOMContentLoaded", initApp);

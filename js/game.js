/* =========================
   Wiskunde Quest – game.js
   (gameflow + checkers + timer)
========================= */

let activeInput = null;

/* ---------- Game state ---------- */
let state = {
  maxQuestions: 0,
review: [],          // rows voor bewijsje
wrongBySkill: {},
  triesThisQ: 0,
    // anti-herhaling (laatste vragen)
  recentQKeys: [],
usedQKeys: null,
  mode: "practice",        // practice | run | test
  topic: null,             // { id, title }
  currentQ: null,

  score: 0,
  attempts: 0,
  correct: 0,

  // test instellingen (worden bij startGame uit UI gelezen)
  testTotal: 0,

  timeLimitMs: 0,
  timeLeftMs: 0,
  timer: null,

  submitLocked: false,
  startedAt: 0,

  // anti-herhaling (laatste vragen)
  recentQKeys: [],

  // fouten (compact overzicht)
  wrongs: {},

  // opnieuw spelen
  lastStart: null,
};
  // anti-herhaling (run/test: hele sessie)
  

/* =========================
   START / STOP
========================= */

function startGame({ topic, mode, limit = 0, count = 0, identity = null }) {
  // ---------- Topic normaliseren ----------
  // (soms komt topic als string binnen)
  if (typeof topic === "string") topic = { id: topic, title: topic };
  topic = topic || { id: "", title: "" };

  // ---------- Basis state ----------
  state.mode = mode;
  state.topic = topic;

  // identity bewaren voor toets-bewijsje (fallback naar profile)
  const fallbackIdentity =
    typeof profile !== "undefined" && profile
      ? { name: profile.name || "", class: profile.class || "", flags: {} }
      : { name: "", class: "", flags: {} };

  state.identity = identity || fallbackIdentity;

  // 🔁 belangrijk: automatisch gekozen logica resetten
  state.subtopic = null;
  state.level = null;

  state.recentQKeys = [];
  state.usedQKeys = new Set(); // run/toets: zo weinig mogelijk herhaling (als je pickQuestion dit gebruikt)

  state.currentQ = null;
  state.score = 0;
  state.attempts = 0;
  state.correct = 0;

  state.submitLocked = false;
  state.triesThisQ = 0;

  // fouten + logging (bewijsje)
  state.wrongs = {};
  state.wrongBySkill = {}; // compat met oudere code
  state.review = [];

  // ---------- Testconfig ----------
  // map.js geeft count mee → gebruik dat als primair
  state.testTotal = 0;
  if (mode === "test") {
    const nFromArg = Number(count) || 0;

    // fallback naar UI (als map.js niets gaf)
    const nFromUI =
      Number(document.querySelector("#testCountSeg .on")?.dataset?.n) || 0;

    state.testTotal = nFromArg || nFromUI || 20;
  }

  // (compat met bestaande code die maxQuestions gebruikt)
  state.maxQuestions = state.testTotal || 0;

  // ---------- Timer ----------
  state.timeLimitMs = limit;
  state.timeLeftMs = limit;
  state.startedAt = Date.now();

  // ---------- Onthoud voor "Nog eens" ----------
  state.lastStart = {
    topic,
    mode,
    limit,
    count: state.testTotal || Number(count) || 0,
    identity: state.identity,
  };

  // ---------- UI ----------
  $("#crumbTop").textContent = topic.title || "";

  $("#headTitle").textContent =
    mode === "practice" ? "Oefenen" : mode === "run" ? "Run" : "Toets";

  $("#pillMode").style.display = "inline-flex";
  $("#pillMode").textContent = $("#headTitle").textContent;

  $("#pillTimer").style.display = limit ? "inline-flex" : "none";
  if (limit) $("#pillTimer").textContent = "⏱ " + msToClock(limit);

  // ---------- Start ----------
  showScreen("scrGame");

  if (limit) startTimer();
  nextQuestion();
}


function stopGame() {
  clearInterval(state.timer);
  state.timer = null;
  state.submitLocked = true;
  showScreen("scrMap");
}

document.addEventListener("DOMContentLoaded", () => {
  $("#btnStop")?.addEventListener("click", stopGame);
});

/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {
  state.submitLocked = false;

  // reset UI
  $("#status").textContent = "";
  $("#choices").innerHTML = "";
  $("#inputRow").style.display = "none";
  $("#mcRow").style.display = "none";
  $("#visualWrap").style.display = "none";
  $("#visualWrap").innerHTML = "";

  // reset actieve input (voor keypad)
  activeInput = null;

  const q = pickQuestion();
  if (!q) {
    console.warn("Geen vraag gevonden voor topic:", state.topic?.id);
    return;
  }

  state.currentQ = q;

  // prompt
  $("#qPrompt").textContent = q.prompt;
  $("#qSub").style.display = q.sub ? "block" : "none";
  $("#qSub").textContent = q.sub || "";

  // visual: ondersteunt zowel oud (visualHtml) als nieuw (visual)
  const visual = q.visual ?? q.visualHtml ?? null;

  if (visual) {
    $("#visualWrap").innerHTML = visual;
    $("#visualWrap").style.display = "grid";
  } else {
    $("#visualWrap").innerHTML = "";
    $("#visualWrap").style.display = "none";
  }

  // render vraagtype
  if (q.kind === "mc") renderMC(q);
  else renderInput(q);

  // inline inputs (ratio / fraction overlay / andere visuals)
  const inlineInputs = Array.from(
    document.querySelectorAll("#visualWrap input:not([type=hidden])")
  );

  if (inlineInputs.length) {
    inlineInputs.forEach((inp) => {
      inp.addEventListener("focus", () => (activeInput = inp));
    });

    // focus eerste input zodat keypad meteen werkt
    activeInput = inlineInputs[0];
    inlineInputs[0].focus();
  }
}

document.addEventListener("click", (e) => {
  const cell = e.target.closest(".percent-cell");
  if (!cell) return;
  cell.classList.toggle("active");
});

/* =========================
   PICK QUESTION (MAGIE)
========================= */

function pickQuestion() {
  // 1) GLOBAL / QUEST RUN: kies uit alle level-arrays van alle topics
  if (state.topic?.id === "global") {
    const all = [];
    Object.values(BANK || {}).forEach((topic) =>
      Object.values(topic || {}).forEach((sub) =>
        Object.values(sub || {}).forEach((levelArr) => {
          if (Array.isArray(levelArr)) all.push(...levelArr);
        })
      )
    );

    if (!all.length) {
      console.warn("Geen globale vragen beschikbaar");
      return null;
    }
    return pickNonRepeated(all);
  }

  // 2) normaal topic: mix subtopics + level fallback
  const topicBank = BANK?.[state.topic?.id];
  if (!topicBank) {
    console.warn("Geen topic:", state.topic?.id);
    return null;
  }

  const acc = state.attempts
    ? Math.round((state.correct / state.attempts) * 100)
    : 60;

  const wanted = levelFromAccuracy(acc);
  const chain =
    wanted === "hard" ? ["hard", "normal", "easy"]
    : wanted === "normal" ? ["normal", "easy"]
    : ["easy"];

  const subtopicKeys = state.subtopic ? [state.subtopic] : Object.keys(topicBank);
  const candidates = [];

  for (const subKey of subtopicKeys) {
    const sub = topicBank[subKey];
    if (!sub || typeof sub !== "object") continue;

    let picked = null;
    for (const lv of chain) {
      if (Array.isArray(sub[lv]) && sub[lv].length) {
        picked = lv;
        break;
      }
    }
    // laatste redmiddel: eender welk level dat wél gevuld is
    if (!picked) {
      for (const lv of ["easy", "normal", "hard"]) {
        if (Array.isArray(sub[lv]) && sub[lv].length) {
          picked = lv;
          break;
        }
      }
    }

    if (picked) candidates.push(...sub[picked]);
  }

  if (!candidates.length) {
    console.warn("Geen vragen:", state.topic?.id);
    return null;
  }

  return pickNonRepeated(candidates);
}

function pickNonRepeated(fns) {
  if (!Array.isArray(fns) || !fns.length) return null;

  state.recentQKeys = state.recentQKeys || [];
  if (!state.usedQKeys) state.usedQKeys = new Set();

  const isStrict = (state.mode === "run" || state.mode === "test"); // ✅ streng in run/toets
  const recentLimit = isStrict ? 0 : 10;

  const maxTries = Math.min(80, Math.max(30, fns.length * 6));

  const keyFor = (q) => {
    const topic  = String(q?.topic ?? "");
    const skill  = String(q?.skill ?? q?.id ?? "");
    const kind   = String(q?.kind ?? "");
    const prompt = String(q?.prompt ?? "").trim();
    const sub    = String(q?.sub ?? "").trim();

    // Answer + options meenemen = veel minder "zelfde prompt" collisions
    const ans = q?.answer != null ? String(q.answer) : "";
    const opts = Array.isArray(q?.options) ? q.options.map(String).join("§") : "";

    // Sommige factories hergebruiken ids; daarom niet enkel id gebruiken
    return `${topic}|${skill}|${kind}|${prompt}|${sub}|${ans}|${opts}`;
  };

  // Probeer een "nieuwe" vraag te vinden
  for (let i = 0; i < maxTries; i++) {
    const r = state._rng ? state._rng() : Math.random();
    const fn = fns[Math.floor(r * fns.length)];

    let q;
    try {
      q = fn();
    } catch (e) {
      console.warn("Question factory crashed:", e);
      continue;
    }
    if (!q) continue;

    const key = keyFor(q);

    // ✅ RUN/TEST: nooit herhalen binnen dezelfde sessie (tot het echt niet anders kan)
    if (isStrict) {
      if (state.usedQKeys.has(key)) continue;
      state.usedQKeys.add(key);
      return q;
    }

    // 🙂 PRACTICE: enkel de laatste recentLimit vermijden
    if (!state.recentQKeys.includes(key)) {
      state.recentQKeys.push(key);
      if (state.recentQKeys.length > recentLimit) state.recentQKeys.shift();
      return q;
    }
  }

  // Fallback: alles lijkt opgebruikt → dan toch iets teruggeven
  const r = state._rng ? state._rng() : Math.random();
  let q = null;
  try {
    q = fns[Math.floor(r * fns.length)]();
  } catch (e) {
    console.warn("Fallback factory crashed:", e);
    return null;
  }
  if (!q) return null;

  const key = keyFor(q);

  // ook bij fallback: run/test blijven we “gebruikt” bijhouden
  if (isStrict) state.usedQKeys.add(key);
  else {
    state.recentQKeys.push(key);
    if (state.recentQKeys.length > recentLimit) state.recentQKeys.shift();
  }

  return q;
}


/* =========================
   RENDERING
========================= */

/* ---------- Vertical fractions (UI helper) ---------- */
function isSimpleFractionText(s) {
  if (s == null) return false;
  const str = String(s).trim();
  if (!str) return false;
  if (str.includes("<")) return false; // HTML/SVG: niet aanraken
  return /^-?\d+\s*\/\s*-?\d+$/.test(str);
}

function verticalFractionMiniHTML(input) {
  const fr = parseFractionRawNL(input);
  if (!fr) return String(input ?? "");
  const n = fr.n;
  const d = fr.d;
  if (d === 1) return `<span style="font-weight:800">${n}</span>`;
  return `
    <span style="display:inline-grid;grid-template-rows:auto 2px auto;min-width:34px;vertical-align:middle;">
      <span style="text-align:center;font-weight:800;line-height:1">${n}</span>
      <span style="height:2px;background:rgba(0,0,0,0.55);border-radius:2px;margin:2px 0;"></span>
      <span style="text-align:center;font-weight:800;line-height:1">${d}</span>
    </span>
  `;
}

/* ---------- Render MC ---------- */
function renderMC(q) {
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "choice";

    // fraction → vertical, maar bewaar echte value in dataset voor checking
    const isFrac = isSimpleFractionText(opt);
    if (isFrac) {
      btn.dataset.val = String(opt).trim().replace(/\s+/g, "");
      btn.innerHTML = verticalFractionMiniHTML(btn.dataset.val);
    } else {
      btn.innerHTML = opt;
    }

    btn.onclick = () => {
      $$(".choice").forEach((b) => b.classList.remove("sel"));
      btn.classList.add("sel");
    };
    $("#choices").appendChild(btn);
  });
  $("#mcRow").style.display = "flex";
}

/* ---------- Render input ---------- */
function renderInput(q) {
  const inp = activeInput || document.getElementById("mainInput");
  if (!inp) return;

  inp.value = "";

  // preview container (vertical fraction) naast mainInput
  let fracPrev = document.getElementById("fracPreview");
  if (!fracPrev) {
    fracPrev = document.createElement("div");
    fracPrev.id = "fracPreview";
    fracPrev.style.display = "none";
    fracPrev.style.alignSelf = "center";
    fracPrev.style.marginLeft = "10px";
    document.getElementById("inputRow")?.appendChild(fracPrev);
  }

  // detecteer inline inputs (ratio / overlays)
  const hasInlineInput =
    !!document.querySelector("#visualWrap [data-ratio-input]") ||
    !!document.querySelector("#visualWrap input");

  // bij inline inputs: verberg main input-rij
  $("#inputRow").style.display = hasInlineInput ? "none" : "flex";

  // preview alleen als er GEEN inline-inputs zijn
  if (q.inputKind === "fraction" && !hasInlineInput) {
    fracPrev.style.display = "block";
    fracPrev.innerHTML = verticalFractionHTML(inp.value);
    inp.oninput = () => {
      fracPrev.innerHTML = verticalFractionHTML(inp.value);
    };
  } else {
    fracPrev.style.display = "none";
    inp.oninput = null;
  }

  $("#rightPanel").style.display =
    q.inputKind === "number" || q.inputKind === "time" || q.inputKind === "fraction"
      ? "grid"
      : "none";

  $("#unitChip").style.display = q.unit ? "inline-flex" : "none";
  $("#unitChip").textContent = q.unit || "";

  inp.onkeydown = (e) => {
    if (q.inputKind === "time") e.preventDefault();
    if (e.key === "Enter") submitAnswer();
  };
}

/* =========================
   SUBMIT / CHECK
========================= */

function inferFractionMode(q) {
  if (q?.fractionMode) return q.fractionMode;

  const txt = `${q?.prompt ?? ""}\n${q?.sub ?? ""}`.toLowerCase();
  // als vraag expliciet vereenvoudigen afdwingt:
  if (txt.includes("onvereenvoudig") || txt.includes("vereenvoudigd") || txt.includes("zo eenvoudig mogelijk")) {
    return "simplified";
  }
  // standaard: equivalent ok
  return "equiv";
}

function getRawAnswerForQuestion(q) {
  // 0) fraction grid (klikvakjes) -> log als "aan / totaal"
  const fracGrid = document.querySelector(".fraction-grid");
  if (fracGrid) {
    const total = Number(fracGrid.dataset.total || fracGrid.querySelectorAll(".fraction-cell").length || 0);
    const on = fracGrid.querySelectorAll(".fraction-cell.on").length;
    return total ? `${on}/${total}` : String(on);
  }

  // 0b) percent grid
  const pctWrap = document.querySelector(".percent-grid-wrap");
  if (pctWrap) {
    const total = Number(pctWrap.dataset.total || pctWrap.querySelectorAll(".percent-cell").length || 0);
    const on = pctWrap.querySelectorAll(".percent-cell.active").length;
    return total ? `${on}/${total}` : String(on);
  }

  // 1) fraction-wrap (vereenvoudigen) -> pak num/den netjes
  const rightFrac = document.querySelector(".fraction-wrap .fraction:last-child");
  if (rightFrac) {
    const inps = Array.from(rightFrac.querySelectorAll("[data-ratio-input]"));
    if (inps.length === 2 && q?.inputKind === "fraction") {
      const top = (inps[0].value ?? "").trim();
      const bot = (inps[1].value ?? "").trim();
      return `${top}/${bot}`;
    }
    if (inps.length === 1) return (inps[0].value ?? "").trim();
  }

  // 2) ratio inputs (1 of meerdere) -> alles loggen
  const ratioInps = Array.from(document.querySelectorAll("#visualWrap [data-ratio-input]"));
  if (ratioInps.length) {
    return ratioInps.map(i => (i.value ?? "").trim()).join(" ; ").trim();
  }

  // 3) actieve input (inline overlay)
  if (activeInput && typeof activeInput.value === "string") return activeInput.value;

  // 4) main input
  return $("#mainInput")?.value ?? "";
}


function submitAnswer() {
  if (state.submitLocked || !state.currentQ) return;
  state.submitLocked = true;

  const q = state.currentQ;
  const isPractice = state.mode === "practice";

  // ✅ in practice tel je “attempts” per vraag, niet per retry
  if (!isPractice || state.triesThisQ === 0) state.attempts++;

  let ok = false;

  // -------- raw answer ophalen --------
  // ratio: meerdere inputs -> samenvoegen
let raw = String(getRawAnswerForQuestion(q) ?? "").trim();


  // dit is wat we gaan loggen als "gegeven"
  let givenForLog = raw;

  // -------- check --------
  if (typeof q.check === "function") {
    ok = !!q.check(raw);

  } else if (q.kind === "mc") {
    const sel = document.querySelector(".choice.sel");
    if (!sel) {
      state.submitLocked = false;
      return;
    }

    const picked = sel.dataset.val ?? sel.textContent ?? "";
    givenForLog = picked; // ✅ BELANGRIJK: anders blijft "gegeven" leeg bij MC

    ok = norm(picked) === norm(q.answer);

  } else if (q.inputKind === "time") {
    const a = parseTimeNL(raw);
    const b = parseTimeNL(q.answer);
    ok = !!a && !!b && formatTime(a.h, a.m) === formatTime(b.h, b.m);

  } else if (q.inputKind === "fraction") {
    const mode = inferFractionMode(q);

    if (mode === "exact") {
      const a = parseFractionRawNL(raw);
      const b = parseFractionRawNL(q.answer);
      ok = !!a && !!b && a.n === b.n && a.d === b.d;

    } else if (mode === "simplified") {
      const aRaw = parseFractionRawNL(raw);
      const bRed = parseFractionNL(q.answer);
      ok = !!aRaw && !!bRed && fractionEqualRaw(aRaw, bRed) && fractionIsSimplified(aRaw);

    } else {
      const a = parseFractionNL(raw);
      const b = parseFractionNL(q.answer);
      ok = fractionEqual(a, b);
    }

  } else {
    const val = parseNumNL(raw);
    ok = !Number.isNaN(val) && Math.abs(val - q.answer) <= (q.tol ?? 0.01);
  }

  // -------- skills/analytics --------
  try {
    const topicKeyForSkills = q.topic || state.topic?.id || "";
    const skillKeyForSkills = String(q.skill ?? q.id ?? "onbekend");
    if (typeof updateSkills === "function") updateSkills(topicKeyForSkills, [skillKeyForSkills], ok);
  } catch (_) {}

  // -------- UI feedback + wrong counters --------
  const skillKey = String(q.skill ?? q.id ?? "onbekend");

  if (ok) {
    state.correct++;
    state.score++;
    $("#status").textContent = "✓ Juist";
    $("#status").className = "status ok";
  } else {
    state.wrongs[skillKey] = (state.wrongs[skillKey] || 0) + 1;

    $("#status").textContent = q.sub || "✗ Fout";
    $("#status").className = "status err";
  }

  // -------- bewijsje logging (MR_SHARED verwacht: { q, correct, given, ok }) --------
// -------- bewijsje logging (MR_SHARED verwacht: { q, correct, given, ok }) --------
const shouldLog = state.mode !== "practice" || ok || state.triesThisQ === 1;

if (shouldLog) {
  let qText = String(q.prompt ?? q.q ?? q.question ?? q.vraag ?? "").trim();
if (!qText) {
  const hint =
    document.querySelector(".fraction-grid-label")?.innerText?.trim() ||
    document.querySelector(".percent-hint")?.innerText?.trim() ||
    "";
  if (hint) qText = hint;
}


  // correct tekst
  const correctStr =
    typeof correctToStr === "function"
      ? correctToStr(q)
      : String(q.answer ?? "");

  // gegeven tekst: MC = gekozen optie, anders raw (ratio inputs al samengevoegd)
  let givenStr = "";

  if (q.kind === "mc") {
    const sel = document.querySelector(".choice.sel");
    const picked = sel ? (sel.dataset.val ?? sel.textContent ?? "") : "";
    givenStr = String(picked).trim();
  } else {
    givenStr = String(raw ?? "").trim();
    // als je toch givenToStr wil gebruiken, alleen als het iets oplevert
    if (!givenStr && typeof givenToStr === "function") {
      const t = givenToStr(q, raw);
      if (t != null) givenStr = String(t).trim();
    }
  }

  if (!givenStr) givenStr = "—"; // ✅ zichtbaar i.p.v. leeg

  state.review.push({
    q: qText,
    correct: String(correctStr ?? "").trim() || "—",
    given: givenStr,
    ok: !!ok,

    // optioneel extra info
    skill: String(q.skill ?? q.id ?? "onbekend"),
    topic: q.topic || state.topic?.id || ""
  });
}


  // -------- einde test op basis van aantal vragen --------
  if (state.mode === "test" && state.testTotal && state.attempts >= state.testTotal) {
    setTimeout(endGame, 650);
    return;
  }

  // -------- PRACTICE: 2 pogingen --------
  if (!ok && state.mode === "practice") {
    if (state.triesThisQ === 0) {
      state.triesThisQ = 1;

      $("#status").textContent = "✗ Fout. Probeer nog eens.";
      $("#status").className = "status err";

      setTimeout(() => {
        state.submitLocked = false;

        const firstInline = document.querySelector("#visualWrap input:not([type=hidden])");
        if (firstInline) {
          activeInput = firstInline;
          firstInline.focus();
        } else if (mainInp) {
          activeInput = mainInp;
          mainInp.focus();
        }
      }, 350);

      return;
    }

    setTimeout(() => {
      state.triesThisQ = 0;
      nextQuestion();
    }, 900);
    return;
  }

  setTimeout(() => {
    state.triesThisQ = 0;
    nextQuestion();
  }, 650);
}



/* =========================
   TIMER + END GAME
========================= */

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeftMs -= 1000;
    $("#pillTimer").textContent = "⏱ " + msToClock(state.timeLeftMs);
    if (state.timeLeftMs <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(state.timer);

  const acc = state.attempts
    ? Math.round((state.correct / state.attempts) * 100)
    : 0;

  const duration_ms = Math.max(0, Date.now() - (state.startedAt || Date.now()));

  // result header
  $("#resTitle").textContent = state.mode === "test" ? "Toetsresultaat" : "Resultaat";

  // medaille / leaderboard (alleen bij run)
  let medal = "";
  if (state.mode === "run") {
    try {
      const topicId = state.topic?.id || "";

      medal = typeof medalForScore === "function"
        ? (medalForScore(state.score) || "")
        : "";

      const medalRank = (m) => (m === "gold" ? 3 : m === "silver" ? 2 : m === "bronze" ? 1 : 0);

      if (typeof prog === "object") {
        prog.medals = prog.medals || {};
        const prev = prog.medals[topicId] || "";
        if (medalRank(medal) > medalRank(prev)) prog.medals[topicId] = medal;

        // bestRun
        prog.bestRun = prog.bestRun || {};
        const prevRun = prog.bestRun[topicId];

        const isBetter =
          !prevRun ||
          state.score > (prevRun.score ?? -1) ||
          (state.score === (prevRun.score ?? -1) && acc > (prevRun.acc ?? -1)) ||
          (state.score === (prevRun.score ?? -1) && acc === (prevRun.acc ?? -1) && duration_ms < (prevRun.duration_ms ?? Infinity));

        if (isBetter) {
          prog.bestRun[topicId] = { score: state.score, acc, duration_ms, at: Date.now() };
        }

        if (typeof saveProg === "function") saveProg();
      }

      // leaderboard post (Supabase)
      if (typeof postScore === "function" && typeof authUser !== "undefined") {
        const boardMode = topicId === "global" ? "global" : "topic";
        postScore({
          mode: boardMode,
          topic: topicId,
          score: state.score,
          acc,
          duration_ms,
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("Run endGame error:", e);
    }
  }

  // 🧾 Bewijsje (toetsmodus) — NU MET VRAGENLIJST
  if (state.mode === "test") {
    // altijd ook lokaal bewaren (handig als fallback)
    try {
      const payload = {
        gameId: document.querySelector('meta[name="x-game-id"]')?.content || "Wiskunde Quest",
        mode: "toets",
        name: state.identity?.name || "",
        class: state.identity?.class || "",
        flags: state.identity?.flags || {},
        score: state.score,
        total: state.testTotal || state.maxQuestions || state.attempts,
        seconds: Math.max(0, Math.round(duration_ms / 1000)),
        topic: state.topic?.title || "",
        topicId: state.topic?.id || "",
        rows: (state.review || []).slice(),
      };
      localStorage.setItem("wq_last_result", JSON.stringify(payload));
      window.LAST_RESULT = payload;
    } catch (_) {}

    // als MR_SHARED bestaat: geef ALLES door (incl. rows + topic)
    if (window.MR_SHARED?.trySharedProof) {
      try {
        const seconds = Math.max(0, Math.round(duration_ms / 1000));
        const total = state.testTotal || state.maxQuestions || state.attempts;

        window.MR_SHARED.trySharedProof({
          mode: "toets",
          name: state.identity?.name || "",
          class: state.identity?.class || "",
          flags: state.identity?.flags || {},
          score: state.score,
          total,
          seconds,

          // redundantie: sommige proof-scripts verwachten andere keys
          topic: state.topic?.title || "",
          topicTitle: state.topic?.title || "",
          topicId: state.topic?.id || "",

          rows: (state.review || []).slice(),
          questions: (state.review || []).slice(), // alias
        });
      } catch (e) {
        console.warn("Proof error:", e);
      }
    }
  }

  const medalTxt = medal ? ` • ${typeof medalEmoji === "function" ? medalEmoji(medal) : medal}` : "";
  $("#resLine").textContent = `Score: ${state.score} • ${acc}% juist${medalTxt}`;

  // fouttypes (compact)
  const wrongEl = $("#resWrong");
  if (wrongEl) {
    const entries = Object.entries(state.wrongs || {}).sort((a, b) => b[1] - a[1]);
    wrongEl.innerHTML = entries.length
      ? entries.slice(0, 8).map(([k, v]) => `<div>• ${k}: ${v}</div>`).join("")
      : "<div>Geen fouten 🎉</div>";
  }

  showScreen("scrResult");
}



/* =========================
   FRACTION HELPERS
========================= */

// parseert breuk ZONDER automatisch te vereenvoudigen (dus "2/4" blijft 2/4)
function parseFractionRawNL(s) {
  if (s == null) return null;
  s = String(s).trim();
  if (!s) return null;

  s = s.replace(/\s+/g, "");

  // geheel getal
  if (!s.includes("/")) {
    const n = parseInt(s, 10);
    if (!Number.isFinite(n)) return null;
    return { n, d: 1 };
  }

  const parts = s.split("/");
  if (parts.length !== 2) return null;

  let n = parseInt(parts[0], 10);
  let d = parseInt(parts[1], 10);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;

  if (d < 0) { n = -n; d = -d; } // noemer positief
  return { n, d };
}

function gcdInt(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { const t = a % b; a = b; b = t; }
  return a || 1;
}

function fractionEqualRaw(a, b) {
  if (!a || !b) return false;
  return a.n * b.d === b.n * a.d;
}

function fractionIsSimplified(fr) {
  if (!fr) return false;
  const g = (typeof gcd === "function") ? gcd(fr.n, fr.d) : gcdInt(fr.n, fr.d);
  return g === 1;
}

// verticale preview naast de input, puur met inline CSS
function verticalFractionHTML(input) {
  const fr = parseFractionRawNL(input);
  if (!fr) return "";
  const n = fr.n;
  const d = fr.d;

  if (d === 1) return `<div style="display:inline-block;padding:2px 8px;border-radius:10px;background:rgba(0,0,0,0.04);font-weight:800">${n}</div>`;

  return `
    <div style="display:inline-grid;grid-template-rows:auto 2px auto;min-width:38px;padding:2px 6px;border-radius:10px;background:rgba(0,0,0,0.04)">
      <div style="text-align:center;font-weight:800;line-height:1">${n}</div>
      <div style="height:2px;background:rgba(0,0,0,0.55);border-radius:2px;margin:2px 0;"></div>
      <div style="text-align:center;font-weight:800;line-height:1">${d}</div>
    </div>
  `;
}

/* =========================
   UI WIRING (keypad + knoppen)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Keypad ----------
  document.querySelectorAll("#keypad .key").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.k;

      // actieve input (inline) heeft voorrang, anders mainInput
      const inp = activeInput || document.getElementById("mainInput");
      if (!inp) return;

      if (!k) {
        inp.value += btn.textContent;
      } else if (k === "back") {
        inp.value = inp.value.slice(0, -1);
      } else if (k === "clear") {
        inp.value = "";
      } else if (k === "comma") {
        if (!inp.value.includes(",")) inp.value += ",";
      } else if (k === "slash") {
        inp.value += "/";
      } else if (k === "colon") {
        if (!inp.value.includes(":")) {
          if (inp.value.length === 0) inp.value = "00";
          if (inp.value.length === 1) inp.value = "0" + inp.value;
          inp.value += ":";
        }
      } else if (k === "minus") {
        if (!inp.value.startsWith("-")) inp.value = "-" + inp.value;
      } else if (k === "ok") {
        submitAnswer();
      }

      // trigger input event voor preview (als actief)
      if (inp === document.getElementById("mainInput")) {
        inp.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  $("#btnOkInline")?.addEventListener("click", submitAnswer);
  $("#btnOkMc")?.addEventListener("click", submitAnswer);

  $("#btnResBack")?.addEventListener("click", () => showScreen("scrMap"));
  $("#btnResAgain")?.addEventListener("click", () => {
    if (state.lastStart) startGame(state.lastStart);
    else showScreen("scrMap");
  });
});

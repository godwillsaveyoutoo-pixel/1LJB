/* =========================
   Wiskunde Quest – game.js
========================= */
let activeInput = null;
let panelBodyFitRaf = 0;
window.setActiveInput = (el) => {
  activeInput = el || null;
};
function isPhoneLayout(){
  if (window.matchMedia) {
    return window.matchMedia("(max-width: 720px)").matches;
  }
  return window.innerWidth <= 720;
}
/* ---------- Game state ---------- */
let state = {
  mode: "practice",        // practice | run | test
  topic: null,             // { id, title }
  currentQ: null,

  score: 0,
  attempts: 0,
  correct: 0,

  timeLimitMs: 0,
  timeLeftMs: 0,
  timer: null,

  submitLocked: false,
  startedAt: 0,

  // toetsmodus
  testCount: 0,
  testLog: [],
  identity: null,
  proofDone: false,
  seed: 0,
  testId: "",
  _rng: null,

  // anti-herhaling (laatste vragen)
  recentQKeys: [],

  // Sprint 2: badges/hulp tracking
  helpUsedThisQ: false,
  streakQ: 0,

  // oefenmodus progressie (5 niveaus met terugval)
  practiceTier: 1,
  practiceProg: 0,
};

/* ---------- Start game ---------- */
function startGame({ topic, mode, limit = 0, count = 0, identity = null }) {
  // ---------- Basis state ----------
  state.mode = mode;
  state.topic = topic;

  // 🔁 belangrijk: automatisch gekozen logica resetten
  state.subtopic = null;
  state.level = null;
  state.recentQKeys = [];

  state.currentQ = null;
  state.score = 0;
  state.attempts = 0;
  state.correct = 0;
  state.submitLocked = false;
  state.triesThisQ = 0;
  state.helpUsedThisQ = false;
  state.tier = 1;
  state.usedQScopes = {};

  // oefenmodus: niveaus met terugval (alleen practice)
  state.practiceTier = 1;
  state.practiceProg = 0;

  // badges/session trackers
  state.helpUsedThisQ = false;
  state.streakQ = 0;

  // ---------- Timer ----------
  // ---------- Timer ----------
  state.timeLimitMs = limit;
  state.timeLeftMs = limit;
  state.startedAt = Date.now();

  // ---------- Toetsmodus ----------
  state.testCount = Number(count) || 0;
  state.testLog = [];
  state.identity = identity;
  state.proofDone = false;

  // Seeded RNG + toets-ID (alleen toetsmodus)
  if (mode === "test") {
    state.seed = (Date.now() ^ ((Math.random() * 1e9) | 0)) >>> 0;
    state.testId = makeTestId(state.seed);
    state._rng = makeRng(state.seed);
  } else {
    state.seed = 0;
    state.testId = "";
    state._rng = null;
  }

  // onthoud voor "Nog eens"
  state.lastStart = {
    topic: { id: topic.id, title: topic.title },
    mode,
    limit: limit || 0,
    count: Number(count) || 0,
    identity,
    seed: state.seed,
    testId: state.testId,
  };

  // ---------- UI ----------

  const modeLabel =
    mode === "practice" ? "Oefenen"
    : mode === "run"    ? "Run"
    :                     "Toets";

  const pillMode = document.getElementById('pillMode');
  if (pillMode){
    pillMode.style.display = 'inline-flex';
    pillMode.textContent = modeLabel;
  }

  // ---------- Start ----------
  showScreen("scrGame");

  // Topbar titel: toon topic tijdens spelen
  try{ window.setBrandTitle?.(topic?.title || "Wiskunde Quest"); }catch(_){}

  if (limit) startTimer();
  updateHud();
  nextQuestion();
}


/* ---------- Next question ---------- */
function nextQuestion() {
  state.submitLocked = false;
  state.triesThisQ = 0;
  state.helpUsedThisQ = false;

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
    console.warn("Geen vraag gevonden voor topic:", state.topic.id);
    return;
  }

  state.currentQ = q;
  // toetslog: maak alvast een rij (zodat ook 'niet beantwoord' kan bestaan indien tijd op is)
  if (state.mode === "test") {
    const correctStr =
      q.kind === "mc" ? String(q.answer ?? "") :
      q.answer != null ? String(q.answer) : "";

    const idx = state.testLog.length;
    state.testLog.push({
      q: String(q.prompt || ""),
      correct: correctStr,
      given: "",
      ok: null,
      points: 1,
      secs: Math.round((Date.now() - state.startedAt) / 1000),
    });
    q.__logIndex = idx;
  }

  updateHud();

  // prompt (wordt soms naar panelhead verplaatst)
  $("#qPrompt").textContent = q.prompt;
  $("#qSub").style.display = q.sub ? "block" : "none";
  $("#qSub").textContent = q.sub || "";

  // visual: ondersteunt zowel oud (visualHtml) als nieuw (visual)
  const visual =
    q.visual ??
    q.visualHtml ??
    null;

  if (visual) {
    $("#visualWrap").innerHTML = visual;
    $("#visualWrap").style.display = "grid";
  } else {
    $("#visualWrap").innerHTML = "";
    $("#visualWrap").style.display = "none";
  }
  if (visual) {
    const wraps = $("#visualWrap").querySelectorAll(".svgSafeWrap");
    if (wraps.length > 1) {
      wraps.forEach((w, idx) => {
        if (idx > 0) w.style.display = "none";
      });
    }
  }
  const bodyInner = document.getElementById("panelBodyInner");
  if (bodyInner) bodyInner.classList.toggle("noVisual", !visual);

  // layout hint: als er een visual is, geef die meer ruimte (compact laptop-friendly)
  const panelEl = document.querySelector('#scrGame .panel');
  if (panelEl) {
    panelEl.classList.toggle('withVisual', !!visual);
    // panelhead is verwijderd: vraag blijft altijd in body
    panelEl.classList.remove('promptInHead');
  }


  // render vraagtype
  if (q.kind === "mc") {
    renderMC(q);
  } else {
    renderInput(q);
  }

  // 🔧 activeer interactieve tijd-widgets (sleepklok)
  try {
    window.initInteractiveTimeWidgets?.(document.getElementById("visualWrap"));
  } catch (e) {
    console.warn("initInteractiveTimeWidgets failed", e);
  }


  // 🔑 ratio-inputs registreren voor keypad
  const ratioInputs = document.querySelectorAll("[data-ratio-input]");
  if (ratioInputs.length) {
    ratioInputs.forEach(inp => {
      inp.addEventListener("focus", () => {
        activeInput = inp;
      });
    });

    // automatisch eerste ratio-input focussen
    activeInput = ratioInputs[0];
    ratioInputs[0].focus();
  }

  schedulePanelBodyFit();
  const inner = document.getElementById("panelBodyInner");
  if (inner) {
    inner.querySelectorAll("img").forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", schedulePanelBodyFit, { once: true });
    });
  }
}
document.addEventListener("click", e => {
  const cell = e.target.closest(".percent-cell");
  if (!cell) return;

  cell.classList.toggle("active");
});


/* ---------- Pick question (MAGIE ZIT HIER) ---------- */
function tierFromCorrect(correct) {
  const c = Math.max(0, Number(correct) || 0);
  return Math.min(5, Math.floor(c / 10) + 1);
}

function pickQuestion() {
  const topicBank = BANK[state.topic.id];
  if (!topicBank) {
    console.warn("Geen topic:", state.topic.id);
    return null;
  }

  const subtopicKeys = state.subtopic ? [state.subtopic] : Object.keys(topicBank);
  const candidates = [];

  // ---------- Oefenen + Run: vaste progressie (5 niveaus) ----------
  if (state.mode === "practice" || state.mode === "run") {
    const tier = (state.mode === "practice")
      ? Math.max(1, Math.min(5, Number(state.practiceTier || 1)))
      : tierFromCorrect(state.correct);
    state.tier = tier;

    const chain =
      tier <= 2 ? ["easy"] :
      tier === 3 ? ["normal", "easy"] :
      ["hard", "normal", "easy"]; // tier 4-5

    const wrap = (fn, lv) => {
      const base = (lv === "easy") ? 2 : (lv === "normal") ? 3 : 4;
      const hint = fn?._tier ?? base; // custom factories kunnen _tier zetten (1..5)
      const w = () => {
        const q = fn();
        if (q && q.tier == null) q.tier = hint;
        return q;
      };
      w._tierHint = hint;
      return w;
    };

    for (const subKey of subtopicKeys) {
      const sub = topicBank[subKey];
      if (!sub || typeof sub !== "object") continue;
      for (const lv of chain) {
        if (Array.isArray(sub[lv]) && sub[lv].length) {
          candidates.push(...sub[lv].map((fn) => wrap(fn, lv)));
        }
      }
    }

    if (!candidates.length) {
      console.warn("Geen vragen:", state.topic.id);
      return null;
    }

    // Tier-filter (zodat niveau 1 echt makkelijk blijft)
    const by = (pred) => candidates.filter((f) => pred(f._tierHint ?? 3));
    let filtered = candidates;
    if (tier === 1) {
      filtered = by((t) => t === 1);
      if (!filtered.length) filtered = by((t) => t === 2);
    } else if (tier === 2) {
      filtered = by((t) => t <= 2);
    } else if (tier === 3) {
      filtered = by((t) => t === 3);
      if (!filtered.length) filtered = by((t) => t <= 2);
    } else if (tier === 4) {
      filtered = by((t) => t === 4);
      if (!filtered.length) filtered = by((t) => t === 3);
    } else {
      // tier 5
      filtered = by((t) => t >= 5);
      if (!filtered.length) filtered = by((t) => t === 4);
      if (!filtered.length) filtered = candidates;
    }

    return pickNonRepeated(filtered, { scopeKey: `${state.topic.id}|${state.subtopic || "all"}` });
  }

  // ---------- Toets: accuracy-gestuurd (bestaand gedrag) ----------
  const acc = state.attempts
    ? Math.round((state.correct / state.attempts) * 100)
    : 60;

  const wanted = levelFromAccuracy(acc);
  const chain =
    wanted === "hard" ? ["hard", "normal", "easy"] :
    wanted === "normal" ? ["normal", "easy"] :
    ["easy"];

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
    console.warn("Geen vragen:", state.topic.id);
    return null;
  }

  return pickNonRepeated(candidates, { scopeKey: `${state.topic.id}|${state.subtopic || "all"}` });
}

function pickNonRepeated(fns, opts = {}) {
  if (!Array.isArray(fns) || !fns.length) return null;

  const scopeKey = opts.scopeKey ?? "global";
  state.usedQScopes = state.usedQScopes || {};
  const scope = state.usedQScopes[scopeKey] || (state.usedQScopes[scopeKey] = { used: new Set(), recent: [] });

  const keyOf = (q) => {
    const topic = q?.topic ?? "";
    const skill = q?.skill ?? q?.id ?? "";
    const prompt = (q?.prompt ?? "").trim();
    const answer = q?.answer != null ? String(q.answer) : "";
    return `${topic}|${skill}|${prompt}|${answer}`;
  };

  const maxTries = Math.min(80, fns.length * 6);

  for (let i = 0; i < maxTries; i++) {
    const r = (state._rng ? state._rng() : Math.random());
    const fn = fns[Math.floor(r * fns.length)];
    let q;
    try {
      q = fn();
    } catch (e) {
      console.warn("Question factory crashed:", e);
      continue;
    }
    if (!q) continue;

    const k = keyOf(q);

    if (fns.length === 1) {
      scope.used.add(k);
      scope.recent.push(k);
      if (scope.recent.length > 10) scope.recent.shift();
      return q;
    }

    if (!scope.used.has(k)) {
      scope.used.add(k);
      scope.recent.push(k);
      if (scope.recent.length > 10) scope.recent.shift();
      return q;
    }

    // zachte fallback: niet in de laatste 10
    if (!scope.recent.includes(k)) {
      scope.used.add(k);
      scope.recent.push(k);
      if (scope.recent.length > 10) scope.recent.shift();
      return q;
    }
  }

  // Alles lijkt opgebruikt of heel gelijkaardig: reset alleen deze scope
  scope.used.clear();
  scope.recent.length = 0;

  const fallbackFn = fns[Math.floor(Math.random() * fns.length)];
  const q = fallbackFn ? fallbackFn() : null;
  if (q) {
    const k = keyOf(q);
    scope.used.add(k);
    scope.recent.push(k);
    if (scope.recent.length > 10) scope.recent.shift();
  }
  return q;
}

/* ---------- Render MC ---------- */
function renderMC(q) {
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.dataset.key = (typeof mcKey === "function" ? mcKey(opt) : String(opt ?? ""));
    btn.innerHTML = opt;

    btn.onclick = () => {
      $$(".choice").forEach(b => b.classList.remove("sel"));
      btn.classList.add("sel");
    };
    $("#choices").appendChild(btn);
  });
  $("#mcRow").style.display = "flex";

  // MC: geen keypad, controls rechts
  const phone = isPhoneLayout();
  try {
    const rp = $("#rightPanel");
    if (rp) {
      rp.classList.add("noKeypad");
      rp.style.display = phone ? "none" : "grid";
    }
  } catch (_) {}
  try { placeGameControls(!phone); } catch (_) {}
}

/* ---------- Render input ---------- */
function renderInput(q) {
  const inp = activeInput || document.getElementById("mainInput");
  if (!inp) return;

  // reset
  inp.value = "";
  inp.disabled = false;
  inp.style.display = "";
  inp.placeholder = "antwoord";

  // detecteer inline widgets (ratio, fraction overlay, sleepklok, ...)
  const hasRatioInputs = !!document.querySelector("[data-ratio-input]");
  const hasFracInputs = !!document.querySelector(".fraction-overlay input");
  const hasClockSettable = !!document.querySelector("[data-clock-settable]");

  const domInline = hasRatioInputs || hasFracInputs || hasClockSettable;
  const inline = !!q.hasInlineInput || domInline;

  // click-only: de leerling klikt in de visual en drukt enkel op OK
  const clickOnly =
    typeof q.check === "function" &&
    (q.answer == null) &&
    !hasRatioInputs &&
    !hasFracInputs &&
    !hasClockSettable &&
    (q.inputKind == null);

  // inputRow: altijd tonen (zodat OK altijd beschikbaar is)
  $("#inputRow").style.display = "flex";
  $("#inputRow").classList.toggle("clickOnly", !!clickOnly);

  // unit (ook bij inline ratio/fraction mag de unit zichtbaar blijven)
  $("#unitChip").style.display = (q.unit && !clickOnly) ? "inline-flex" : "none";
  $("#unitChip").textContent = q.unit || "";

  // input zichtbaar?
  if (inline || clickOnly) {
    inp.style.display = "none";
  } else {
    inp.style.display = "";

    if (q.inputKind === "time") {
      inp.inputMode = "numeric";
      inp.placeholder = "HH:MM";
      inp.autocomplete = "off";
      inp.spellcheck = false;
    } else if (q.inputKind === "fraction") {
      inp.inputMode = "text";
      inp.placeholder = "bv. 3/4";
    } else {
      inp.inputMode = "decimal";
      inp.placeholder = "antwoord";
    }
  }

  // keypad: ook tonen bij inline ratio/fraction inputs (dan gaat de keypad naar activeInput)
  let wantsKeypad =
    !clickOnly && (
      q.inputKind === "number" ||
      q.inputKind === "time" ||
      q.inputKind === "fraction" ||
      hasRatioInputs ||
      hasFracInputs
    );
  if (isPhoneLayout()) wantsKeypad = false;

  const rp = $("#rightPanel");
  if (rp) rp.classList.remove("noKeypad");
  $("#rightPanel").style.display = wantsKeypad ? "grid" : "none";

  // verplaats Stop/Hulp naar onder keypad als die zichtbaar is
  try{ placeGameControls(!!wantsKeypad); }catch(_){}

  const hint = document.getElementById("rpHint");
  if (hint) {
    hint.textContent =
      q.inputKind === "time" ? "HH:MM (24u)" :
      q.inputKind === "fraction" ? "bv. 3/4" :
      "";
  }
}



/* ---------- Stop game ---------- */
function stopGame() {
  clearInterval(state.timer);
  state.timer = null;
  state.submitLocked = true;

  // In toets/run wil "Stop" afronden i.p.v. stil terugkeren
  if (state.mode === "test" || state.mode === "run") {
    endGame();
    return;
  }
  showScreen("scrMap");
}

function formatCorrectAnswer(q) {
  if (!q) return "";
  if (q.kind === "mc") return String(q.answer ?? "");
  const unit = q.unit ? ` ${q.unit}` : "";
  if (q.inputKind === "time") return String(q.answer ?? "");
  if (q.inputKind === "fraction") return String(q.answer ?? "");
  if (typeof q.answer === "number") return formatNL(q.answer) + unit;
  return String(q.answer ?? "") + unit;
}


document.addEventListener("DOMContentLoaded", () => {

  // Waarschuwing: toetsmodus sluiten = risico
  window.addEventListener("beforeunload", (e) => {
    if (state.mode === "test" && !state.proofDone && (state.attempts < (state.testCount || Infinity))) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });

  // Keypad collapse (handig op kleine laptops)
  const rp = document.getElementById("rightPanel");
  const padT = document.getElementById("btnPadToggle");
  const setCollapsed = (on) => {
    if (!rp) return;
    rp.classList.toggle("collapsed", !!on);
    if (padT) padT.textContent = on ? "▸" : "▾";
    try{ localStorage.setItem("mr_pad_collapsed", on ? "1" : "0"); }catch(_){}
  };
  const autoCollapseIfNeeded = () => {
    try{
      const pref = localStorage.getItem("mr_pad_collapsed");
      if (pref === "1") return setCollapsed(true);
      if (pref === "0") return setCollapsed(false);
    }catch(_){}
    if (window.innerHeight < 760) setCollapsed(true);
  };
  padT?.addEventListener("click", () => setCollapsed(!rp.classList.contains("collapsed")));
  window.addEventListener("resize", () => {
    if (rp && rp.style.display !== "none") autoCollapseIfNeeded();
  });
  autoCollapseIfNeeded();


  $("#btnStop")?.addEventListener("click", stopGame);
});

function submitAnswer() {
  if (state.submitLocked || !state.currentQ) return;
  state.submitLocked = true;

  const q = state.currentQ;

  let ok = false;

  // 👉 PRIORITEIT: ratio-input indien aanwezig
  const ratioInp = document.querySelector("[data-ratio-input]");
  const raw =
    ratioInp?.value ??
    $("#mainInput")?.value ??
    "";

  if (typeof q.check === "function") {
    ok = !!q.check(raw);

  } else if (q.kind === "mc") {
    const sel = $(".choice.sel");
    if (!sel) {
      state.submitLocked = false;
      return;
    }
    const aKey = q.answerKey ?? (typeof mcKey === "function" ? mcKey(q.answer) : String(q.answer ?? ""));
    ok = (sel.dataset.key ?? "") === aKey;

  } else if (q.inputKind === "time") {
    const a = parseTimeNL(raw);
    const b = parseTimeNL(q.answer);
    ok = !!a && !!b && formatTime(a.h, a.m) === formatTime(b.h, b.m);

  } else if (q.inputKind === "fraction") {
    const a = parseFractionNL(raw);
    const b = parseFractionNL(q.answer);
    ok = fractionEqual(a, b);

  } else {
    const val = parseNumNL(raw);
    ok =
      !Number.isNaN(val) &&
      Math.abs(val - q.answer) <= (q.tol ?? 0.01);
  }

  // ✅ Tel poging pas wanneer er effectief gecontroleerd is
  state.attempts++;

  // toetslog update
  if (state.mode === "test") {
    let givenStr = "";
    if (q.kind === "mc") {
      const sel = $(".choice.sel");
      givenStr = sel ? sel.textContent : "";
    } else {
      givenStr = raw;
    }

    const li = q.__logIndex;
    if (li != null && state.testLog[li]) {
      state.testLog[li].given = String(givenStr ?? "");
      state.testLog[li].ok = !!ok;
      state.testLog[li].secs = Math.round((Date.now() - state.startedAt) / 1000);
    }
  }

  if (ok) {
    state.correct++;
    state.score++;
    $("#status").textContent = "✓ Juist";
    $("#status").className = "status ok";

    // oefenmodus: vooruitgang binnen 5 niveaus
    if (state.mode === 'practice') {
      try { practiceAdvanceOnOk(); } catch (_) {}
    }
  } else {
    $("#status").textContent = q.sub || "✗ Fout";
    $("#status").className = "status err";
  }

  // ✅ persistente skill/progress (geen toetsmodus)
  try {
    if (state.mode !== "test") {
      updateSkill?.(q.topic, q.skill, ok);
    }
    if (state.mode === "practice") {
      const t = q.topic;
      if (t && t !== "global") {
        prog.practice = prog.practice || {};
        const p = prog.practice[t] || { a: 0, c: 0 };
        p.a++;
        if (ok) p.c++;
        prog.practice[t] = p;
        saveProg?.();
      }
    }
  } catch (e) {
    console.warn("Progress update failed", e);
  }

  // 🎖️ Badges (Sprint 2)
  try {
    if (state.mode !== "test") {
      const topicId = state.topic?.id || "global";
      window.ensureBadgeStores?.(topicId);
      const bstats = window.badgeStatsFor?.(topicId) || {};

      if (ok) {
        const prevTotal = Number(bstats.totalOk || 0);
        if (prevTotal === 0) window.awardBadge?.("first_ok", topicId);
        bstats.totalOk = prevTotal + 1;

        state.streakQ = Number(state.streakQ || 0) + 1;
        bstats.streakBest = Math.max(Number(bstats.streakBest || 0), state.streakQ);

        if (state.streakQ === 5) window.awardBadge?.("streak_5", topicId);
        if (state.streakQ === 10) window.awardBadge?.("streak_10", topicId);

        // oefenmodus: juist op 2e poging
        if (state.mode === "practice" && state.triesThisQ === 1) {
          bstats.comeback = Number(bstats.comeback || 0) + 1;
          if (bstats.comeback >= 3) window.awardBadge?.("comeback_3", topicId);
        }

        // hulp gebruikt + toch juist
        if (state.helpUsedThisQ) {
          bstats.helpOk = Number(bstats.helpOk || 0) + 1;
          if (bstats.helpOk >= 5) window.awardBadge?.("help_5", topicId);
        }

        // niveau-badges (op basis van # correcte oplossingen in sessie)
        if (state.correct === 10) window.awardBadge?.("lvl_2", topicId);
        if (state.correct === 20) window.awardBadge?.("lvl_3", topicId);
        if (state.correct === 30) window.awardBadge?.("lvl_4", topicId);
        if (state.correct === 40) window.awardBadge?.("lvl_5", topicId);

        saveProg?.();
        window.updateBadgePill?.();
      }
    }
  } catch (_) {}


  // toetsmodus stop: na N vragen meteen naar resultaat
  if (state.mode === "test" && state.testCount && state.attempts >= state.testCount) {
    setTimeout(endGame, 350);
    return;
  }

  // Oefenmodus: 2 pogingen, en toon daarna de oplossing
  if (!ok && state.mode === "practice") {
    state.triesThisQ++;

    if (state.triesThisQ < 2) {
      // nog een poging
      $("#status").textContent = "✗ Fout. Probeer opnieuw (poging " + (state.triesThisQ + 1) + "/2)";
      $("#status").className = "status err";
      state.submitLocked = false;
      try {
        $("#mainInput")?.focus();
        $("#mainInput")?.select();
      } catch (_) {}
      return;
    }

    // 2de fout: toon juiste oplossing
    state.streakQ = 0;

    // oefenmodus: progressie omlaag + eventueel terugval
    try { practicePenaltyOnFail(); } catch (_) {}
    updateHud();
    const sol = formatCorrectAnswer(q);
    $("#status").textContent = sol ? `✗ Fout. Juiste antwoord: ${sol}` : "✗ Fout.";
    $("#status").className = "status err";
    setTimeout(() => {
      nextQuestion();
      updateHud();
    }, 1600);
    return;
  }

  // run: fout verbreekt streak
  if (!ok && state.mode === "run") {
    state.streakQ = 0;
  }

  updateHud();

  setTimeout(nextQuestion, 650);
}


/* ---------- Timer ---------- *//* ---------- Timer ---------- */
function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeftMs -= 1000;
        updateHud();
    if (state.timeLeftMs <= 0) endGame();
  }, 1000);
}

/* ---------- End game ---------- */
function endGame() {
  clearInterval(state.timer);

  const acc = state.attempts
    ? Math.round((state.correct / state.attempts) * 100)
    : 0;

  const duration_ms = Math.max(0, Date.now() - (state.startedAt || Date.now()));

  // 🏆 Run: medaille + best run + leaderboard post
  if (state.mode === "run") {
    try {
      const topicId = state.topic?.id || "";
      const medal = typeof medalForScore === "function"
        ? medalForScore(state.score)
        : "";

      const medalRank = (m) =>
        m === "gold" ? 3 : m === "silver" ? 2 : m === "bronze" ? 1 : 0;

      // 🎖️ badges: run + medaille
      try {
        window.ensureBadgeStores?.(topicId);
        const bstats = window.badgeStatsFor?.(topicId) || {};
        bstats.runs = Number(bstats.runs || 0) + 1;
        if (bstats.runs === 1) window.awardBadge?.("runner_1", topicId);
        if (medal === "bronze" || medal === "silver" || medal === "gold") {
          bstats.medals = bstats.medals || { bronze: 0, silver: 0, gold: 0 };
          bstats.medals[medal] = Number(bstats.medals[medal] || 0) + 1;
          window.awardBadge?.("medal_" + medal, topicId);
        }
      } catch (_) {}

      // bestRun update
      prog.bestRun = prog.bestRun || {};
      const prev = prog.bestRun[topicId];
      const isBetter = !prev
        || state.score > (prev.score ?? -1)
        || (state.score === (prev.score ?? -1) && acc > (prev.acc ?? -1))
        || (state.score === (prev.score ?? -1) && acc === (prev.acc ?? -1) && duration_ms < (prev.duration_ms ?? 9e15));

      if (isBetter) {
        prog.bestRun[topicId] = {
          score: state.score,
          acc,
          duration_ms,
          at: Date.now(),
          medal,
        };
      }

      // medaille only upgrade
      if (topicId && topicId !== "global") {
        prog.medals = prog.medals || {};
        const prevMedal = prog.medals[topicId] || "";
        if (medalRank(medal) > medalRank(prevMedal)) {
          prog.medals[topicId] = medal;
        }
      }

      saveProg?.();

      // leaderboard
      const mode = topicId === "global" ? "global" : "topic";
      const topic = topicId === "global" ? "global" : topicId;
      const nm = state.identity?.name || window.profile?.name || window.profile?.username || "";
      const cls = state.identity?.class || window.profile?.class || "1B";
      window.postScore?.({ mode, topic, score: state.score, acc, duration_ms, name: nm, className: cls });
      window.refreshBoards?.();

      // toon status op resultaatregel (eenmalig, met vertraging)
      setTimeout(() => {
        const line = document.getElementById("resLine");
        if (!line || line.dataset.scoreStatus) return;
        if (!window.lastScoreAttempted) return;
        const st = window.lastScoreStatus || "";
        const err = window.lastScoreError || "";
        let tail = "";
        if (st === "ok") tail = " | scoreboard: ok";
        else if (st === "blocked" || st === "fout") {
          const msg = err ? String(err).slice(0, 80) : "onbekend";
          tail = ` | scoreboard: fout (${msg})`;
        } else if (st) {
          tail = ` | scoreboard: ${st}`;
        }
        if (tail) {
          line.textContent += tail;
          line.dataset.scoreStatus = "1";
        }
      }, 800);
    } catch (e) {
      console.warn("Run finalize failed", e);
    }
  }

  $("#resTitle").textContent =
    state.mode === "test" ? "Toetsresultaat" : "Resultaat";

  // resultaatregel (met medaille waar relevant)
  let extra = "";
  if (state.mode === "run") {
    try {
      const topicId = state.topic?.id || "";
      const medal = prog?.medals?.[topicId] || (typeof medalForScore === "function" ? medalForScore(state.score) : "");
      const em = medalEmoji?.(medal) || "";
      if (em) extra = ` • Medaille: ${em}`;
    } catch (_) {}
  }
  $("#resLine").textContent = `Score: ${state.score} • ${acc}% juist${extra}`;

  // Supabase: log run-sessie (samenvatting)
  if (state.mode === "run") {
    try {
      const elapsedSec = Math.round((Date.now() - state.startedAt) / 1000);
      const nm = state.identity?.name || window.profile?.name || window.profile?.username || "";
      const cls = state.identity?.class || window.profile?.class || "1B";
      const summaryRun = {
        name: nm,
        class: cls,
        mode: "run",
        topicId: state.topic?.id || "",
        seconds: elapsedSec,
        timeLimitSec: Math.round((state.timeLimitMs || 0) / 1000),
        score: state.score,
        total: state.attempts,
        correct: state.correct,
        pct: state.attempts ? Math.round((state.correct / state.attempts) * 100) : 0,
      };
      if (typeof window.logTestRun === "function") {
        window.logTestRun(summaryRun);
      }
    } catch (_) {}
  }


  // Bewijsje (toetsmodus): automatisch downloaden na afloop
  if (state.mode === "test" && !state.proofDone) {
    state.proofDone = true;

    try {
      // vul onbeantwoorde rijen aan
      state.testLog.forEach(r => {
        if (r && r.ok == null) { r.ok = false; r.given = r.given || "—"; }
      });

      const metaId = document.querySelector('meta[name="x-game-id"]')?.content || document.title || "Wiskunde Quest";
      const elapsedSec = Math.round((Date.now() - state.startedAt) / 1000);

      const nm =
        state.identity?.name ||
        window.profile?.name ||
        window.profile?.username ||
        "";

      const cls =
        state.identity?.class ||
        window.profile?.class ||
        "1B";

      const flags = (state.identity && typeof state.identity === "object" && state.identity.flags) ? state.identity.flags : {};

      const goals = [
        `Topic: ${state.topic?.title || "—"}`,
        `Aantal vragen: ${state.testCount || state.testLog.length}`,
        `Tijdslimiet: ${state.timeLimitMs ? msToClock(state.timeLimitMs) : "geen"}`
      ];

      const summary = {
        name: nm,
        class: cls,
        gameId: metaId,
        mode: "toets",
        topicId: state.topic?.id || "",
        topicTitle: state.topic?.title || "",
        seconds: elapsedSec,
        timeLimitSec: Math.round((state.timeLimitMs || 0) / 1000),
        score: state.score,
        total: state.testCount || state.testLog.length,
        testId: state.testId || "",
        seed: state.seed || 0,
        goals,
        flags,
        accommodations: flags?.dyscalculie ? ["dyscalculie"] : [],
        questions: state.testLog.map(r => ({
          q: r.q,
          correct: r.correct,
          given: r.given,
          ok: r.ok,
          points: r.points,
          secs: r.secs
        }))
      };

      // Hash + JSON export (anti-discussie + voor jouw administratie)
      (async () => {
        try{
          summary.hash = await computeProofHash(summary);
        }catch(_){}
        try{
          window.MR_SHARED?.trySharedProof?.(summary);
        }catch(_){}
        // Supabase: log toetsresultaat (handig voor dashboards)
        try{
          if (typeof window.logTestRun === 'function') {
            await window.logTestRun(summary);
            const line = document.getElementById("resLine");
            if (line && !line.dataset.logStatus && window.lastTestRunStatus) {
              line.textContent += ` | log: ${window.lastTestRunStatus}`;
              line.dataset.logStatus = "1";
            }
          }
        }catch(_){}
        try{
          const base = String(nm||"leerling").trim().replace(/[^\w\s-]+/g,"").replace(/\s+/g,"_").slice(0,80) || "leerling";
          const fn = `bewijs_${base}_${(cls||"").toString().replace(/\s+/g,"_")}_${(summary.testId||"toets")}.json`;
          const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = fn.replace(/_+/g,"_");
          document.body.appendChild(a);
          a.click();
          setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        }catch(_){}
      })();
;
    } catch (e) {
      console.warn("Proof generation failed", e);
    }
  }

  showScreen("scrResult");
}

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Keypad ----------
document.querySelectorAll("#keypad .key").forEach(btn => {
  btn.addEventListener("click", () => {
    const k = btn.dataset.k;
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
    }

 else if (k === "minus") {
      if (!inp.value.startsWith("-")) inp.value = "-" + inp.value;
    } else if (k === "ok") {
      const helpOpen = !document.getElementById("helpOverlay")?.classList.contains("hidden");
      if (helpOpen && inp.closest("#helpOverlay")) return;
      submitAnswer();
    }
  });
});

  $("#btnOkInline")?.addEventListener("click", submitAnswer);
  $("#btnOkMc")?.addEventListener("click", submitAnswer);
  $("#btnResBack")?.addEventListener("click", () => {
    window.renderTopicMap?.();
    showScreen("scrMap");
  });
  $("#btnResAgain")?.addEventListener("click", () => {
    if (state.lastStart) startGame(state.lastStart);
    else {
      window.renderTopicMap?.();
      showScreen("scrMap");
    }
  });
});

function makeRng(seed){
  let s = (Number(seed) >>> 0) || 1;
  return function(){
    // LCG (Numerical Recipes)
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pad2(n){ return String(n).padStart(2, "0"); }
function makeTestId(seed){
  const d = new Date();
  const stamp = `${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}-${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}`;
  const tail = (seed >>> 0).toString(16).toUpperCase().padStart(8,"0").slice(0,6);
  return `T-${stamp}-${tail}`;
}

function stableStringify(value){
  const seen = new WeakSet();
  const norm = (v) => {
    if (v && typeof v === "object"){
      if (seen.has(v)) return "[Circular]";
      seen.add(v);
      if (Array.isArray(v)) return v.map(norm);
      const out = {};
      Object.keys(v).sort().forEach(k => { out[k] = norm(v[k]); });
      return out;
    }
    return v;
  };
  return JSON.stringify(norm(value));
}

async function sha256Hex(str){
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2,"0")).join("");
}

async function computeProofHash(summary){
  try{
    const hex = await sha256Hex(stableStringify(summary));
    return hex.slice(0, 12).toUpperCase();
  }catch(_){
    return "";
  }
}


// ---------- Progressie helpers (5 niveaus) ----------
function practiceAdvanceOnOk(){
  if (state.mode !== 'practice') return;
  const tier = Math.max(1, Math.min(5, Number(state.practiceTier || 1)));
  let prog = Math.max(0, Number(state.practiceProg || 0));

  if (tier < 5) {
    prog += 1;
    if (prog >= 10) {
      state.practiceTier = tier + 1;
      state.practiceProg = 0;
    } else {
      state.practiceTier = tier;
      state.practiceProg = prog;
    }
  } else {
    state.practiceTier = 5;
    state.practiceProg = Math.min(10, prog + 1);
  }
}

function practicePenaltyOnFail(){
  if (state.mode !== 'practice') return;
  const tier = Math.max(1, Math.min(5, Number(state.practiceTier || 1)));
  const prev = Math.max(0, Number(state.practiceProg || 0));
  if (prev <= 0) return;

  const next = prev - 1;
  state.practiceProg = next;

  // terugval enkel wanneer je van 1 -> 0 gaat (dus na minstens 1 juiste binnen dit niveau)
  if (tier > 1 && prev === 1) {
    state.practiceTier = tier - 1;
    state.practiceProg = 0;
  }
}

function updateLvlTop(){
  const el = document.getElementById('lvlTop');
  if (!el) return;

  const show = (state.mode === 'practice' || state.mode === 'run');
  el.style.display = show ? '' : 'none';
  if (!show) return;

  let tier = 1;
  let within = 0;

  if (state.mode === 'run') {
    tier = tierFromCorrect(state.correct);
    within = Math.max(0, state.correct - (tier - 1) * 10);
    if (tier >= 5) within = Math.max(0, state.correct - 40);
    within = Math.min(10, within);
  } else {
    tier = Math.max(1, Math.min(5, Number(state.practiceTier || 1)));
    within = Math.min(10, Math.max(0, Number(state.practiceProg || 0)));
  }

  const pct = Math.round((within / 10) * 100);
  try { el.title = `Niveau ${tier}/5 • ${within}/10`; } catch (_) {}

  const badge = document.getElementById('lvlBadge');
  if (badge) badge.textContent = String(tier);

  const palette = [
    { accent: "#60a5fa", fill: "#3b82f6", fill2: "#60a5fa" },
    { accent: "#34d399", fill: "#10b981", fill2: "#34d399" },
    { accent: "#fbbf24", fill: "#f59e0b", fill2: "#fbbf24" },
    { accent: "#fb7185", fill: "#f43f5e", fill2: "#fb7185" },
    { accent: "#a78bfa", fill: "#8b5cf6", fill2: "#a78bfa" }
  ];
  const pal = palette[Math.max(0, Math.min(palette.length - 1, tier - 1))] || palette[0];
  el.style.setProperty('--lvl-accent', pal.accent);
  el.style.setProperty('--lvl-fill', pal.fill);
  el.style.setProperty('--lvl-fill-2', pal.fill2);

  const f = document.getElementById('lvlFill');
  if (f) f.style.width = pct + '%';
}

function schedulePanelBodyFit(){
  if (panelBodyFitRaf) cancelAnimationFrame(panelBodyFitRaf);
  panelBodyFitRaf = requestAnimationFrame(fitPanelBody);
}

function fitPanelBody(){
  const body = document.querySelector("#scrGame .panelBody");
  const inner = document.getElementById("panelBodyInner");
  if (!body || !inner) return;

  inner.style.transform = "scale(1)";
  if (isPhoneLayout()) return;

  const availableH = body.clientHeight;
  const availableW = body.clientWidth;
  const contentH = inner.scrollHeight;
  const contentW = inner.scrollWidth;
  if (!availableH || !contentH) return;

  const scaleH = availableH / contentH;
  const scaleW = contentW ? (availableW / contentW) : 1;
  const scale = Math.min(1, scaleH, scaleW);
  inner.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", schedulePanelBodyFit);

function placeGameControls(wantsKeypad){
  const gc = document.getElementById('gameControls');
  const slotBottom = document.getElementById('gcSlotBottom');
  const slotRight = document.getElementById('gcSlotRight');
  if (!gc || !slotBottom) return;

  if (wantsKeypad && slotRight){
    if (gc.parentElement !== slotRight) slotRight.appendChild(gc);
    slotRight.classList.remove('hidden');
    slotBottom.classList.add('hidden');
  } else {
    if (gc.parentElement !== slotBottom) slotBottom.appendChild(gc);
    slotBottom.classList.remove('hidden');
    if (slotRight) slotRight.classList.add('hidden');
  }
}
// HUD helpers
function setHudVisible(on){
  const el = $("#hudLine");
  if (!el) return;
  el.style.display = on ? "" : "none";
}

function updateHud(){
  // HUD compact houden: toon in topbar (pill), en verberg de oude HUD-lijn
  const line = $("#hudLine");
  if (line) line.style.display = "none";

  const pill = $("#pillHud");
  if (!pill) {
    updateLvlTop();
    return;
  }

  if (state.mode !== "test" && state.mode !== "run"){
    pill.style.display = "none";
    pill.textContent = "";
    updateLvlTop();
    return;
  }

  pill.style.display = "inline-flex";
  const total = state.mode === "test" ? (state.testCount || state.testLog.length || 0) : 0;
  const cur = state.mode === "test" ? (state.testLog.length || 0) : 0;

  const left = state.mode === "test"
    ? `Vraag ${Math.max(1, cur)}/${total || "?"}`
    : `Run: ${state.score} p`;

  const right = (state.timeLimitMs > 0)
    ? "⏱ " + msToClock(state.timeLeftMs)
    : "⏱ ∞";

  pill.textContent = `${left} • ${right}`;
  updateLvlTop();
}

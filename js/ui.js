/* =========================
   Wiskunde Quest – ui.js
   UI wiring, modals, drawer,
   settings (GEEN screen-logica)
========================= */

/* ---------- Subtopics config ---------- */
/* (tijdelijk hier, later evt. naar topics.js) */
const SUBTOPICS = {
  massa: [
    { id: "convert", label: "Omrekenen" },
    { id: "context", label: "Context" },
    { id: "unit_choice", label: "Eenheid kiezen" },
    { id: "error", label: "Fouten herkennen" }
  ],
  gemmid: [
    { id: "median", label: "Mediaan" },
    { id: "mean", label: "Gemiddelde" }
  ],
  tijd: [
    { id: "clock_read", label: "Klok lezen" },
    { id: "convert", label: "Omrekenen" },
    { id: "time_add", label: "Tijd optellen" },
    { id: "time_sub", label: "Tijd aftrekken" }
  ],
  lijnen: [
    { id: "relations", label: "Relaties tussen lijnen" }
  ],
  hoeken: [
    { id: "angle_type", label: "Soorten hoeken" },
    { id: "measure", label: "Hoeken meten" }
  ],
  breuken: [
    { id: "simplify", label: "Vereenvoudigen" },
    { id: "fraction_of", label: "Breuk van een getal" },
    { id: "read_fraction", label: "Aflezen" },
    { id: "complement", label: "Aanvullen" },
    { id: "compare", label: "Vergelijken" }
  ],
  procent: [
    { id: "percent_of", label: "Percentage van" },
    { id: "discount", label: "Korting" },
    { id: "increase", label: "Verhoging" },
    { id: "complement", label: "Aanvullen tot 100%" },
    { id: "compare", label: "Vergelijken" },
    { id: "error", label: "Fouten" }
  ]
};

/* ---------- User pill ---------- */
function updateUserPill() {
  const pill = document.getElementById("pillUser");
  if (!pill) return;

  if (!authUser) {
    pill.textContent = "Niet ingelogd";
    updateNavVisibility();
    return;
  }

  if (profile.name) {
    const tag = profile.class ? ` • ${profile.class}` : "";
    const t = profile.role === "teacher" ? "👨‍🏫" : "";
    pill.textContent = `${profile.name}${tag}${t}`;
  } else {
    pill.textContent = "Ingelogd";
  }
  updateNavVisibility();
}


function updateNavVisibility(){
  const teach = document.getElementById('navTeacher');
  if (!teach) return;
  const isTeach = !!(profile && profile.role === 'teacher');
  teach.style.display = isTeach ? '' : 'none';
}
/* ---------- Drawer ---------- */
async function openDrawer() {
  // na een role-wijziging in Supabase (student → teacher)
  // kan de UI nog 'oud' zijn tot je herlaadt.
  // Daarom: bij openen even het profiel verversen.
  try {
    await window.refreshRemoteProfile?.();
  } catch (_) {}
  $("#drawer")?.classList.add("open");
}
function closeDrawer() {
  $("#drawer")?.classList.remove("open");
}

/* ---------- Topic modal ---------- */
function openTopicModal(topic) {
  $("#topicModalTitle").textContent = topic.title;

  const badge = $("#topicModalBadges");
  const runBtn = document.getElementById("btnTopicRun");

  // Run lock: eerst oefenen?
  let lockInfo = "";
  if (runBtn) {
    const gate = !!profile?.settings?.gateRun;
    const isGlobal = topic?.id === "global";
    const a = prog?.practice?.[topic?.id]?.a ?? 0;
    const need = 8;
    const left = Math.max(0, need - a);
    const locked = gate && !isGlobal && left > 0;
    runBtn.disabled = locked;
    runBtn.classList.toggle("disabled", locked);
    if (locked) lockInfo = `Eerst oefenen: nog ${left} oefenvragen`;
  }

  if (badge) {
    const medal = prog?.medals?.[topic.id]
      ? `Behaald: ${medalEmoji(prog.medals[topic.id])}`
      : "Nog geen medaille";
    badge.textContent = lockInfo ? `${medal} • ${lockInfo}` : medal;
  }

  $("#topicModalBack")?.classList.add("open");
}


function closeTopicModal() {
  $("#topicModalBack")?.classList.remove("open");
}

/* ---------- Settings ---------- */
function renderSettings() {
  $("#settingsUser").textContent = authUser
    ? `${profile.name || "—"} • ${(profile.class || "1B")} ${profile.role === "teacher" ? "(teacher)" : ""}`
    : "Niet ingelogd";

  $("#autoOkState").textContent = profile.settings.autoOk ? "on" : "off";
  $("#soundState").textContent = profile.settings.sound ? "on" : "off";
  const g = document.getElementById("gateRunState");
  if (g) g.textContent = profile.settings.gateRun ? "on" : "off";
}

/* ---------- Event bindings ---------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Drawer */
  $("#btnMenu")?.addEventListener("click", () => { openDrawer(); });
  $("#btnCloseDrawer")?.addEventListener("click", closeDrawer);

  $$(".drawer .item").forEach((item) => {
    item.addEventListener("click", () => {
      closeDrawer();
      const nav = item.dataset.nav;
      if (nav === "map") showScreen("scrMap");
      if (nav === "board") showScreen("scrBoard");
      if (nav === "settings") {
        renderSettings();
        showScreen("scrSettings");
      }
      if (nav === "stats") {
        window.renderMyStats?.();
        showScreen("scrStats");
      }
      if (nav === "teacher") {
        // zorg dat role up-to-date is vóór we beslissen
        Promise.resolve(window.refreshRemoteProfile?.())
          .finally(() => {
            window.renderTeacherDashboard?.();
            showScreen("scrTeacher");
          });
      }
    });
  });

  /* Settings toggles */
  $("#togAutoOk")?.addEventListener("click", () => {
    profile.settings.autoOk = !profile.settings.autoOk;
    saveProfile();
    renderSettings();
  });

  $("#togSound")?.addEventListener("click", () => {
    profile.settings.sound = !profile.settings.sound;
    saveProfile();
    renderSettings();
  });

  $("#togGateRun")?.addEventListener("click", () => {
    profile.settings.gateRun = !profile.settings.gateRun;
    saveProfile();
    renderSettings();
  });

  $("#btnCloseSettings")?.addEventListener("click", () => {
    showScreen(authUser ? "scrMap" : "scrStart");
  });

  $("#btnLogout")?.addEventListener("click", async () => {
    await logout();
    showScreen("scrStart");
  });

  /* Topic modal */
  $("#btnCloseTopic")?.addEventListener("click", closeTopicModal);

  $("#topicModalBack")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeTopicModal();
  });

  /* Start screen buttons */
  $("#btnStartLeader")?.addEventListener("click", () => {
    showScreen("scrBoard");
  });

  $("#btnStartSettings")?.addEventListener("click", () => {
    renderSettings();
    showScreen("scrSettings");
  });

  /* Auth tabs */
  $("#tabLogin")?.addEventListener("click", () => {
    $("#tabLogin").classList.add("on");
    $("#tabSignup").classList.remove("on");
    $("#paneLogin").hidden = false;
    $("#paneSignup").hidden = true;
  });

  $("#tabSignup")?.addEventListener("click", () => {
    $("#tabSignup").classList.add("on");
    $("#tabLogin").classList.remove("on");
    $("#paneSignup").hidden = false;
    $("#paneLogin").hidden = true;
  });

  /* Login */
  $("#btnLogin")?.addEventListener("click", async () => {
    try {
      $("#authMsg").textContent = "";
      await login(
        $("#loginUser").value,
        $("#loginPass").value
      );
    } catch (e) {
      $("#authMsg").textContent = e.message || "Login mislukt";
    }
  });

  /* Signup */
  $("#btnSignup")?.addEventListener("click", async () => {
    try {
      $("#authMsg").textContent = "";
      await signup({
        username: $("#signupUser").value,
        password: $("#signupPass").value,
        name: $("#signupName").value,
        className: $("#signupClass")?.value || "1B",
      });
    } catch (e) {
      $("#authMsg").textContent = e.message || "Account maken mislukt";
    }
  });


  // Fullscreen
  const fsBtn = $("#btnFullscreen");
  const syncFS = () => {
    if (!fsBtn) return;
    const on = !!document.fullscreenElement;
    fsBtn.textContent = on ? "⤢" : "⛶";
    fsBtn.title = on ? "Verlaat volledig scherm" : "Volledig scherm";
  };
  fsBtn?.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (e) {
      console.warn("Fullscreen failed", e);
    }
    syncFS();
  });
  document.addEventListener("fullscreenchange", syncFS);
  syncFS();

  // Calculator overlay
  const calcOverlay = $("#calcOverlay");
  const calcLCD = $("#calcLCD");
  let calcExpr = "";

  function calcRender() {
    if (!calcLCD) return;
    const s = (calcExpr || "0").toString();
    calcLCD.textContent = s.length > 22 ? "…" + s.slice(-22) : s;
  }

  function calcSafeEval(expr) {
    // allow digits, operators and parentheses only
    const cleaned = String(expr || "")
      .replace(/,/g, ".")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/[^0-9+\-*/().]/g, "");

    if (!cleaned) return 0;
    // prevent weird operator tails
    if (/[+\-*/.]$/.test(cleaned)) throw new Error("tail");
    // eslint-disable-next-line no-new-func
    return Function("return (" + cleaned + ")")();
  }

  function calcKey(k) {
    if (k === "C") {
      calcExpr = "";
      calcRender();
      return;
    }
    if (k === "⌫") {
      calcExpr = calcExpr.slice(0, -1);
      calcRender();
      return;
    }
    if (k === "=") {
      try {
        const v = calcSafeEval(calcExpr);
        // round tiny float errors
        const out = (Math.abs(v) < 1e-12) ? 0 : v;
        calcExpr = String(out);
      } catch (e) {
        calcExpr = "Err";
      }
      calcRender();
      return;
    }

    if (calcExpr === "Err") calcExpr = "";

    // prevent double operators
    if (/[+\-*/]/.test(k)) {
      if (!calcExpr) return;
      if (/[+\-*/]$/.test(calcExpr)) {
        calcExpr = calcExpr.slice(0, -1) + k;
      } else {
        calcExpr += k;
      }
    } else {
      calcExpr += k;
    }
    calcRender();
  }

  $("#btnCalc")?.addEventListener("click", () => {
    if (!calcOverlay) return;
    calcOverlay.classList.remove("hidden");
    calcExpr = "";
    calcRender();
  });
  $("#btnCloseCalc")?.addEventListener("click", () => {
    calcOverlay?.classList.add("hidden");
  });
  calcOverlay?.addEventListener("click", (e) => {
    if (e.target === calcOverlay) calcOverlay.classList.add("hidden");
  });
  $("#calcKeys")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-k]");
    if (!b) return;
    calcKey(b.dataset.k);
  });
  document.addEventListener("keydown", (e) => {
    if (!calcOverlay || calcOverlay.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      calcOverlay.classList.add("hidden");
      return;
    }
    const map = { Enter: "=", Backspace: "⌫", Delete: "C" };
    const k = map[e.key] || e.key;
    if (/^[0-9]$/.test(k) || ["+", "-", "*", "/", "(", ")", ".", "=", "⌫", "C"].includes(k)) {
      e.preventDefault();
      calcKey(k);
    }
  });

  // Help overlay
  $("#btnHelp")?.addEventListener("click", () => {
    const topicId = state.topic?.id;
    const help = HELP_CARDS?.[topicId];

    $("#helpTitle").textContent = topicId ? "Hulpkaart – " + state.topic.title : "Hulpkaart";

    $("#helpContent").innerHTML = help
      ? help()
      : "<p>Geen hulpkaart beschikbaar.</p>";

    $("#helpOverlay").classList.remove("hidden");
  });

  $("#btnCloseHelp")?.addEventListener("click", () => {
    $("#helpOverlay").classList.add("hidden");
  });
});
function makeDraggable(panelEl, handleEl) {
  let startX = 0, startY = 0;
  let startLeft = 0, startTop = 0;
  let dragging = false;

  function ensureLeftTop() {
    const r = panelEl.getBoundingClientRect();
    panelEl.style.left = r.left + "px";
    panelEl.style.top  = r.top  + "px";
    panelEl.style.right = "auto";
    panelEl.style.bottom = "auto";
    panelEl.style.transform = "none"; // we gaan nu puur met left/top werken
  }

  handleEl.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    ensureLeftTop();

    dragging = true;
    handleEl.setPointerCapture(e.pointerId);

    const r = panelEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = r.left;
    startTop  = r.top;

    e.preventDefault();
  });

  handleEl.addEventListener("pointermove", (e) => {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = startLeft + dx;
    let newTop  = startTop  + dy;

    // binnen scherm houden
    const w = panelEl.offsetWidth;
    const h = panelEl.offsetHeight;
    newLeft = Math.max(0, Math.min(window.innerWidth  - w, newLeft));
    newTop  = Math.max(0, Math.min(window.innerHeight - h, newTop));

    panelEl.style.left = newLeft + "px";
    panelEl.style.top  = newTop  + "px";
  });

  const stop = () => { dragging = false; };
  handleEl.addEventListener("pointerup", stop);
  handleEl.addEventListener("pointercancel", stop);
}

// Init (roep dit na DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("calcCard");
  const handle = card?.querySelector("[data-drag-handle]");
  if (card && handle) makeDraggable(card, handle);
});

/* ---------- Exports ---------- */
window.updateUserPill = updateUserPill;
window.renderSettings = renderSettings;
window.openTopicModal = openTopicModal;
window.closeTopicModal = closeTopicModal;

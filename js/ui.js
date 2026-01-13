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
    const t = profile.role === "teacher" ? " 👩‍🏫" : "";
    pill.textContent = `${profile.name}${tag}${t}`;
  } else {
    pill.textContent = "Ingelogd";
  }
  updateNavVisibility();
}


function updateNavVisibility(){
  const teach = document.getElementById('navTeacher');
  const badges = document.getElementById('navBadges');
  const isTeach = !!(profile && profile.role === 'teacher');
  if (teach) teach.style.display = isTeach ? '' : 'none';
  if (badges) badges.style.display = authUser ? '' : 'none';
  try { window.updateBadgePill?.(); } catch (_) {}
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

  // Run is altijd beschikbaar (geen blokkering)
  let lockInfo = "";
  if (runBtn) {
    runBtn.disabled = false;
    runBtn.classList.remove("disabled");
  }

  if (badge) {
    const medal = prog?.medals?.[topic.id]
      ? `Behaald: ${medalEmoji(prog.medals[topic.id])}`
      : "Nog geen medaille";

    const bc = (typeof window.badgeCount === "function") ? window.badgeCount(topic.id) : 0;
    const badgesTxt = `Badges: ${bc}`;
    const extra = lockInfo ? `${lockInfo} • ${badgesTxt}` : badgesTxt;
    badge.textContent = `${medal} • ${extra}`;
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
  const gateBtn = document.getElementById("togGateRun");
  if (gateBtn) gateBtn.style.display = "none";
  const g = document.getElementById("gateRunState");
  if (g) g.textContent = "off";
}

/* ---------- Event bindings ---------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Drawer */
  $("#btnMenu")?.addEventListener("click", () => { openDrawer(); });
  $("#btnCloseDrawer")?.addEventListener("click", closeDrawer);
  // Badges (top pill)
  $("#pillBadges")?.addEventListener("click", () => {
    window.renderBadges?.();
    showScreen("scrBadges");
  });

  $("#btnBackFromBadges")?.addEventListener("click", () => {
    showScreen(authUser ? "scrMap" : "scrStart");
  });


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
      if (nav === "badges") {
        window.renderBadges?.();
        showScreen("scrBadges");
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
  // gateRun is afgeschaft: Run blijft altijd toegankelijk

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
  let helpPrevRightPanel = null;
  const helpCard = document.querySelector("#helpOverlay .helpCard");
  const helpHeader = document.querySelector("#helpOverlay .helpHeader");

  if (helpCard && helpHeader) {
    let drag = null;
    const startDrag = (e) => {
      if (e.target && e.target.closest && e.target.closest("#btnCloseHelp")) return;
      if (e.button != null && e.button !== 0) return;
      const rect = helpCard.getBoundingClientRect();
      const sx = Number(helpCard.dataset.dragX || 0);
      const sy = Number(helpCard.dataset.dragY || 0);
      drag = {
        startX: e.clientX,
        startY: e.clientY,
        baseX: sx,
        baseY: sy,
        maxX: window.innerWidth - rect.width - 12,
        maxY: window.innerHeight - rect.height - 12
      };
      helpHeader.setPointerCapture?.(e.pointerId);
    };

    const onMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      let nx = drag.baseX + dx;
      let ny = drag.baseY + dy;
      nx = Math.max(-drag.maxX, Math.min(drag.maxX, nx));
      ny = Math.max(-drag.maxY, Math.min(drag.maxY, ny));
      helpCard.style.transform = `translate(${nx}px, ${ny}px)`;
      helpCard.dataset.dragX = String(nx);
      helpCard.dataset.dragY = String(ny);
    };

    const endDrag = (e) => {
      drag = null;
      helpHeader.releasePointerCapture?.(e.pointerId);
    };

    helpHeader.addEventListener("pointerdown", startDrag);
    helpHeader.addEventListener("pointermove", onMove);
    helpHeader.addEventListener("pointerup", endDrag);
    helpHeader.addEventListener("pointercancel", endDrag);
  }

  $("#btnHelp")?.addEventListener("click", () => {
    const topicId = state.topic?.id;
    const help = HELP_CARDS?.[topicId];

    $("#helpTitle").textContent = topicId ? "Hulpkaart – " + state.topic.title : "Hulpkaart";

    $("#helpContent").innerHTML = help
      ? help()
      : "<p>Geen hulpkaart beschikbaar.</p>";

    try { state.helpUsedThisQ = true; } catch (_) {}

    $("#helpOverlay").classList.remove("hidden");

    // init interactieve hulp (bv. omzettabel inhoud)
    try {
      window.initHelpOverlay?.(topicId);
    } catch (_) {}

    if (topicId === "inhoud") {
      const rp = $("#rightPanel");
      if (rp) {
        helpPrevRightPanel = {
          display: rp.style.display,
          noKeypad: rp.classList.contains("noKeypad")
        };
        rp.style.display = "grid";
        rp.classList.remove("noKeypad");
      }
    }
  });

  $("#btnCloseHelp")?.addEventListener("click", () => {
    $("#helpOverlay").classList.add("hidden");
    if (helpPrevRightPanel) {
      const rp = $("#rightPanel");
      if (rp) {
        rp.style.display = helpPrevRightPanel.display;
        if (helpPrevRightPanel.noKeypad) rp.classList.add("noKeypad");
        else rp.classList.remove("noKeypad");
      }
      helpPrevRightPanel = null;
    }
    const mainInput = document.getElementById("mainInput");
    if (typeof window.setActiveInput === "function") {
      window.setActiveInput(mainInput);
    }
  });
});

/* ---------- Exports ---------- */
window.updateUserPill = updateUserPill;
window.renderSettings = renderSettings;
window.openTopicModal = openTopicModal;
window.closeTopicModal = closeTopicModal;

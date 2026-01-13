/* =========================
   Wiskunde Quest – profile.js
   Profiel, skills & progress
========================= */

/* =========================
   PROFILE (identiteit + settings)
========================= */
const PROFILE_KEY = "wq_profile_settings";

let profile = {
  username: "",
  name: "",
  class: "",
  role: "student",
  settings: {
    autoOk: false,
    sound: false,
    // als dit aan staat: eerst oefenen voor je een Run mag doen
    gateRun: false,
  },
};

/* ---------- Load local profile ---------- */
try {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (raw) {
    const p = JSON.parse(raw);
    if (p?.settings) profile.settings = { ...profile.settings, ...p.settings };
    if (p?.lastUser) profile.username = p.lastUser;
  }
} catch (_) {}

function saveProfile() {
  try {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        settings: profile.settings,
        lastUser: profile.username || "",
      })
    );
  } catch (_) {}
}


// One-time migratie: vanaf deze versie is Run altijd beschikbaar (geen blokkering).
try {
  const MIG_KEY = "wq_gateRun_mig_v3";
  if (!localStorage.getItem(MIG_KEY)) {
    profile.settings.gateRun = false;
    localStorage.setItem(MIG_KEY, "1");
    saveProfile();
  }
} catch (_) {}


/* =========================
   LEARNER KEY (auth of anon)
========================= */
function learnerKey() {
  if (authUser?.id) return authUser.id;

  let anon = localStorage.getItem("wq_anon");
  if (!anon) {
    anon = "anon_" + Math.random().toString(16).slice(2);
    try {
      localStorage.setItem("wq_anon", anon);
    } catch (_) {}
  }
  return anon;
}

/* =========================
   SKILLS (robust + lazy)
========================= */
let skills = {};

function skillsKey() {
  return "wq_skills__" + learnerKey();
}

/* veilige default zonder TOPICS */
function baseSkills() {
  return {};
}

/* pas aanvullen ALS TOPICS bestaat */
function ensureTopicSkeleton() {
  if (typeof TOPICS === "undefined") return;
  TOPICS.forEach((t) => {
    if (!skills[t.id]) skills[t.id] = {};
  });
}

function loadSkills() {
  skills = baseSkills();
  try {
    const raw = localStorage.getItem(skillsKey());
    if (raw) skills = { ...skills, ...JSON.parse(raw) };
  } catch (_) {}
  ensureTopicSkeleton();
}

function saveSkills() {
  try {
    localStorage.setItem(skillsKey(), JSON.stringify(skills));
  } catch (_) {}
  queueRemoteSave();
}

function ensureSkill(topic, sk) {
  if (!skills[topic]) skills[topic] = {};
  if (!skills[topic][sk]) {
    skills[topic][sk] = {
      score: 40,
      a: 0,
      c: 0,
      last: Date.now(),
    };
  }
}

function decaySkill(topic, sk) {
  ensureSkill(topic, sk);
  const m = skills[topic][sk];
  const days = (Date.now() - m.last) / 86_400_000;
  if (days > 0.5) {
    m.score = clamp(m.score - days * 1.4, 15, 98);
    m.last = Date.now();
  }
}

function skillScore(topic, sk) {
  decaySkill(topic, sk);
  return Math.round(skills[topic][sk].score);
}

function updateSkill(topic, sk, ok) {
  ensureSkill(topic, sk);
  decaySkill(topic, sk);
  const m = skills[topic][sk];
  m.a++;
  if (ok) m.c++;
  m.score = clamp(m.score + (ok ? 2.4 : -1.9), 10, 99);
  m.last = Date.now();
  saveSkills();
}

function updateSkills(topic, tags = [], ok) {
  tags.forEach((sk) => updateSkill(topic, sk, ok));
}

/* =========================
   PROGRESS (medals, runs)
========================= */
function defaultProg() {
  return {
    medals: {},
    bestRun: {},
    practice: {}, // per topic: {a,c}

    // Sprint 2: badges (motivatie)
    // badges: { [topicId]: { [badgeId]: timestamp } }
    badges: {},
    // badgeStats: { [topicId]: { totalOk, streakBest, comeback, helpOk, runs, medals } }
    badgeStats: {},
  };
}

let prog = defaultProg();

function progKey() {
  return "wq_prog_v1__" + learnerKey();
}

function loadProg() {
  prog = defaultProg();
  try {
    const raw = localStorage.getItem(progKey());
    if (raw) prog = { ...prog, ...JSON.parse(raw) };
  } catch (_) {}
}

function saveProg() {
  try {
    localStorage.setItem(progKey(), JSON.stringify(prog));
  } catch (_) {}
  queueRemoteSave();
}

/* =========================
   MEDALS
========================= */
function medalForScore(score) {
  if (score >= 26) return "gold";
  if (score >= 18) return "silver";
  if (score >= 10) return "bronze";
  return "";
}

function medalEmoji(m) {
  if (m === "gold") return "🥇";
  if (m === "silver") return "🥈";
  if (m === "bronze") return "🥉";
  return "";
}

/* =========================
   LOAD ALL STORES
========================= */
function loadLearnerStores() {
  loadSkills();
  loadProg();
}

/* =========================
   REMOTE SYNC (Supabase)
========================= */
let remoteSaveTimer = null;

function queueRemoteSave() {
  if (!authUser) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(() => {
    upsertProfileRemote().catch((e) =>
      console.warn("Remote save failed:", e?.message || e)
    );
  }, 600);
}

async function fetchProfileRow() {
  if (!authUser) return null;
  const { data, error } = await sb
    .from("profiles")
    .select("username,name,class,role,settings,skills,prog")
    .eq("user_id", authUser.id)
    .maybeSingle();
  if (error && !String(error.message).includes("0 rows")) throw error;
  return data || null;
}

async function ensureProfileRow(seed = {}) {
  let row = await fetchProfileRow();

  // ▶️ BESTAAT AL, maar is onvolledig → aanvullen
  if (row) {
    const needsUpdate =
      (seed.name && !row.name) ||
      (seed.class && !row.class) ||
      (seed.username && !row.username);

    if (!needsUpdate) return row;

    const updated = {
      ...row,
      username: seed.username ?? row.username,
      name: seed.name ?? row.name,
      class: seed.class ?? row.class,
      role: row.role ?? "student",
      settings: row.settings ?? profile.settings,
      skills: row.skills ?? skills,
      prog: row.prog ?? prog,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await sb
      .from("profiles")
      .update(updated)
      .eq("user_id", authUser.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ▶️ BESTAAT NOG NIET → insert
  const ins = {
    user_id: authUser.id,
    username:
      seed.username ||
      profile.username ||
      `user_${authUser.id.slice(0, 8)}`,
    name: seed.name || profile.name || "",
    class: (seed.class || profile.class || "1B"),
    role: (seed.role || profile.role || "student"),
    settings: profile.settings,
    skills,
    prog,
  };

  const { data, error } = await sb
    .from("profiles")
    .insert(ins)
    .select()
    .single();

  if (error) throw error;
  return data;
}


async function upsertProfileRemote() {
  if (!authUser) return;

  const payload = {
    user_id: authUser.id,
    username: profile.username,
    name: profile.name,
    class: profile.class,
    role: profile.role,
    settings: profile.settings,
    skills,
    prog,
    updated_at: new Date().toISOString(),
  };

  const { error } = await sb
    .from("profiles")
    .upsert(payload, { onConflict: "user_id" });

  if (error) throw error;
}

function applyRemoteProfile(row) {
  if (!row) return;

  profile.username = row.username || profile.username;
  profile.name = row.name || profile.name;
  profile.class = row.class || profile.class || "1B";
  profile.role = row.role || profile.role || "student";
  profile.settings = { ...profile.settings, ...row.settings };

  /* merge skills veilig */
  for (const t in row.skills || {}) {
    for (const sk in row.skills[t]) {
      ensureSkill(t, sk);
      const l = skills[t][sk];
      const r = row.skills[t][sk];
      if (r.last > l.last || r.score > l.score) {
        skills[t][sk] = r;
      }
    }
  }

  prog = { ...defaultProg(), ...(row.prog || {}) };

  saveProfile();
  saveSkills();
  saveProg();
}


/* =========================
   Sprint 2 – Badges (motivatie)
   - kleine extra doelen naast medailles
   - badges worden bewaard in prog (lokaal + Supabase)
========================= */

const BADGE_DEFS = [
  { id: "first_ok", icon: "🌱", name: "Eerste juist!", desc: "Je hebt je eerste oefening juist opgelost." },
  { id: "streak_5", icon: "🔥", name: "Vijf op rij", desc: "5 vragen na elkaar juist." },
  { id: "streak_10", icon: "🏅", name: "Tien op rij", desc: "10 vragen na elkaar juist." },
  { id: "comeback_3", icon: "🪃", name: "Comeback", desc: "3 keer juist op je 2e poging in oefenmodus." },
  { id: "help_5", icon: "🧭", name: "Met hulp lukt het", desc: "5 keer juist nadat je de hulpkaart gebruikte." },
  { id: "lvl_2", icon: "🥈", name: "Niveau 2", desc: "Je bereikte niveau 2 (10 juist) in oefenen of run." },
  { id: "lvl_3", icon: "🥉", name: "Niveau 3", desc: "Je bereikte niveau 3 (20 juist)." },
  { id: "lvl_4", icon: "⭐", name: "Niveau 4", desc: "Je bereikte niveau 4 (30 juist)." },
  { id: "lvl_5", icon: "👑", name: "Niveau 5", desc: "Je bereikte niveau 5 (40 juist)." },
  { id: "runner_1", icon: "🏃", name: "Eerste run", desc: "Je deed je eerste run." },
  { id: "medal_bronze", icon: "🥉", name: "Bronze run", desc: "Je behaalde een bronzen medaille in een run." },
  { id: "medal_silver", icon: "🥈", name: "Silver run", desc: "Je behaalde een zilveren medaille in een run." },
  { id: "medal_gold", icon: "🥇", name: "Gold run", desc: "Je behaalde een gouden medaille in een run." },
];

function _badgeTopicId(topicId) {
  const t = (topicId && String(topicId).trim()) ? String(topicId) : "global";
  return t;
}

function ensureBadgeStores(topicId) {
  prog = prog || defaultProg();
  if (!prog.badges) prog.badges = {};
  if (!prog.badgeStats) prog.badgeStats = {};

  // migratie: oude badgestructuur (flat map) -> topic map
  const badgeKeys = Object.keys(prog.badges || {});
  const isFlatBadges = badgeKeys.length && badgeKeys.every((k) => typeof prog.badges[k] === "number");
  if (isFlatBadges) {
    prog.badges = { global: { ...prog.badges } };
  }

  // migratie: oude badgeStats (object) -> topic map
  if (typeof prog.badgeStats.totalOk === "number") {
    prog.badgeStats = { global: { ...prog.badgeStats } };
  }

  const tid = _badgeTopicId(topicId);
  if (topicId !== "all") {
    if (!prog.badges[tid]) prog.badges[tid] = {};
    if (!prog.badgeStats[tid]) {
      prog.badgeStats[tid] = {
        totalOk: 0,
        streakBest: 0,
        comeback: 0,
        helpOk: 0,
        runs: 0,
        medals: { bronze: 0, silver: 0, gold: 0 },
      };
    }
    if (!prog.badgeStats[tid].medals) prog.badgeStats[tid].medals = { bronze: 0, silver: 0, gold: 0 };
  }
}

function _badgeTopicsFor(id) {
  ensureBadgeStores();
  const topics = [];
  const badgesByTopic = prog.badges || {};
  for (const tId of Object.keys(badgesByTopic)) {
    if (badgesByTopic[tId] && badgesByTopic[tId][id]) topics.push(tId);
  }
  return topics;
}

function badgeCount(topicId = "all") {
  try {
    ensureBadgeStores(topicId);
    if (topicId === "all") {
      const topics = Object.keys(prog.badges || {});
      let total = 0;
      topics.forEach((tId) => {
        total += Object.keys(prog.badges[tId] || {}).length;
      });
      return total;
    }
    const tid = _badgeTopicId(topicId);
    return Object.keys((prog.badges && prog.badges[tid]) || {}).length;
  } catch (_) {
    return 0;
  }
}

function badgeEarned(id, topicId = "all") {
  try {
    ensureBadgeStores(topicId);
    if (topicId === "all") return _badgeTopicsFor(id).length > 0;
    const tid = _badgeTopicId(topicId);
    return !!prog.badges?.[tid]?.[id];
  } catch (_) {
    return false;
  }
}

function badgeEarnedAt(id, topicId) {
  try {
    ensureBadgeStores(topicId);
    const tid = _badgeTopicId(topicId);
    return Number(prog.badges?.[tid]?.[id] || 0);
  } catch (_) {
    return 0;
  }
}

function badgeStatsFor(topicId) {
  ensureBadgeStores(topicId);
  const tid = _badgeTopicId(topicId);
  return prog.badgeStats?.[tid] || null;
}

function topicTitleById(topicId) {
  if (!Array.isArray(window.TOPICS)) return "";
  const t = window.TOPICS.find((x) => x.id === topicId);
  return t?.title || "";
}

function _badgeById(id) {
  return BADGE_DEFS.find(b => b.id === id) || { id, icon: "🎖️", name: id, desc: "" };
}

function updateBadgePill() {
  const el = document.getElementById("pillBadges");
  if (!el) return;
  const show = !!window.authUser;
  el.style.display = show ? "inline-flex" : "none";
  if (!show) return;
  el.textContent = `🎖️ ${badgeCount()}`;
}

function _showBadgeToast(b) {
  const toast = document.getElementById("badgeToast");
  if (!toast) return;
  toast.innerHTML = `
    <div class="badgeToastIcon">${b.icon}</div>
    <div class="badgeToastText">
      <div class="badgeToastTitle">Badge vrijgespeeld!</div>
      <div class="badgeToastName">${b.name}</div>
    </div>`;
  toast.classList.add("on");
  clearTimeout(_showBadgeToast._t);
  _showBadgeToast._t = setTimeout(() => toast.classList.remove("on"), 2400);
}

function awardBadge(id, topicId) {
  try {
    ensureBadgeStores(topicId);
    const tid = _badgeTopicId(topicId);
    if (prog.badges?.[tid]?.[id]) return false;
    if (!prog.badges[tid]) prog.badges[tid] = {};
    prog.badges[tid][id] = Date.now();
    saveProg?.();
    updateBadgePill();
    _showBadgeToast(_badgeById(id));
    return true;
  } catch (e) {
    console.warn("awardBadge failed:", e);
    return false;
  }
}

function renderBadges() {
  const grid = document.getElementById("badgesGrid");
  const sub = document.getElementById("badgesSub");
  const topicSel = document.getElementById("badgesTopic");
  if (!grid) return;

  if (topicSel && !topicSel.dataset.ready) {
    topicSel.innerHTML = `<option value="all">alle topics</option>`;
    if (Array.isArray(window.TOPICS)) {
      window.TOPICS.forEach((t) => {
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.textContent = t.title || t.id;
        topicSel.appendChild(opt);
      });
    }
    topicSel.dataset.ready = "1";
    topicSel.addEventListener("change", () => renderBadges());
  }

  const topicId = topicSel?.value || "all";
  ensureBadgeStores(topicId);
  const n = badgeCount(topicId);
  const label = topicId === "all" ? "alle topics" : (topicTitleById(topicId) || topicId);
  if (sub) {
    sub.textContent = topicId === "all"
      ? `Behaald: ${n} (${label})`
      : `Behaald: ${n}/${BADGE_DEFS.length} (${label})`;
  }

  grid.innerHTML = "";

  for (const b of BADGE_DEFS) {
    let got = false;
    let whenText = "Nog niet behaald";
    if (topicId === "all") {
      const hits = _badgeTopicsFor(b.id);
      if (hits.length) {
        got = true;
        if (hits.length === 1) {
          const when = badgeEarnedAt(b.id, hits[0]);
          const topicLabel = topicTitleById(hits[0]) || hits[0];
          const whenStr = when ? new Date(when).toLocaleDateString("nl-BE") : "";
          whenText = whenStr ? `Behaald in ${topicLabel} op ${whenStr}` : `Behaald in ${topicLabel}`;
        } else {
          whenText = `Behaald in ${hits.length} topics`;
        }
      }
    } else {
      const when = badgeEarnedAt(b.id, topicId);
      if (when) {
        got = true;
        whenText = `Behaald op ${new Date(when).toLocaleDateString("nl-BE")}`;
      }
    }
    const card = document.createElement("div");
    card.className = "badgeCard" + (got ? "" : " locked");
    card.innerHTML = `
      <div class="badgeIcon">${b.icon}</div>
      <div class="badgeMeta">
        <div class="badgeName">${b.name}</div>
        <div class="badgeDesc">${b.desc}</div>
        <div class="badgeWhen">${whenText}</div>
      </div>`;
    grid.appendChild(card);
  }
}


/* =========================
   EXPORTS
========================= */
window.profile = profile;
window.updateSkill = updateSkill;
window.updateSkills = updateSkills;
window.skillScore = skillScore;
window.loadLearnerStores = loadLearnerStores;
window.ensureProfileRow = ensureProfileRow;
window.applyRemoteProfile = applyRemoteProfile;
window.medalEmoji = medalEmoji;

window.BADGE_DEFS = BADGE_DEFS;
window.badgeCount = badgeCount;
window.badgeEarned = badgeEarned;
window.awardBadge = awardBadge;
window.updateBadgePill = updateBadgePill;
window.renderBadges = renderBadges;
window.ensureBadgeStores = ensureBadgeStores;
window.badgeStatsFor = badgeStatsFor;


/* =========================
   PROFILE REFRESH (handig na role-change)
   - haalt het profiel opnieuw op uit Supabase
   - werkt meteen UI bij (nav + pill)
========================= */
async function refreshRemoteProfile() {
  if (!authUser) return null;
  try {
    const row = await fetchProfileRow();
    if (row) applyRemoteProfile(row);
    // UI bijwerken indien aanwezig
    try {
      updateUserPill?.();
      renderSettings?.();
    } catch (_) {}
    window.lastProfileSyncError = null;
    return row;
  } catch (e) {
    window.lastProfileSyncError = e?.message || String(e);
    console.warn("refreshRemoteProfile failed:", window.lastProfileSyncError);
    return null;
  }
}

window.refreshRemoteProfile = refreshRemoteProfile;

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
    gateRun: true,
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


// One-time migratie: vanaf deze versie staat "eerst oefenen vóór Run" standaard aan.
// Leerlingen/leerkracht kunnen het altijd uitzetten in Settings.
try {
  const MIG_KEY = "wq_gateRun_mig_v2";
  if (!localStorage.getItem(MIG_KEY)) {
    profile.settings.gateRun = true;
    localStorage.setItem(MIG_KEY, "1");
    // bewaar meteen
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
// bv. in profile.js (waar je medalForScore nu staat)
const MEDAL_THRESHOLDS = {
  default:  { bronze: 15, silver: 30, gold: 45 },
  inhoud:  { bronze: 20, silver: 40, gold: 60 },
  grafieken:{ bronze: 10, silver: 15, gold: 20 },
  massa:    { bronze: 15, silver: 30, gold: 45 },
  gemmid:   { bronze: 15, silver: 20, gold: 25 },
  breuken:  { bronze: 20, silver: 40, gold: 60 },
  // voeg er gerust meer toe:
  // breuken:  { bronze: 11, silver: 19, gold: 28 },
  // tijd:     { bronze: 9,  silver: 16, gold: 24 },
};

function medalForScore(score, topicId) {
  const key = String(topicId ?? "default").trim().toLowerCase();
  const t = MEDAL_THRESHOLDS[key] ?? MEDAL_THRESHOLDS.default;

  if (!MEDAL_THRESHOLDS[key] && key !== "default") {
    console.warn("Onbekende topicId voor medals:", topicId, "→ default gebruikt");
  }

  if (score >= t.gold) return "gold";
  if (score >= t.silver) return "silver";
  if (score >= t.bronze) return "bronze";
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
window.renderTopicMap?.();
  saveProfile();
  saveSkills();
  saveProg();
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

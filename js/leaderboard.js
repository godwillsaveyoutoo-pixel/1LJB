/* =========================
   Wiskunde Quest – leaderboard.js
   Supabase leaderboards
========================= */

/* ---------- Guards ---------- */
function leaderboardReady() {
  return (typeof sb !== "undefined" && authUser);
}
/* ---------- Topic selector ---------- */
function populateBoardTopicSel() {
  const sel = $("#boardTopicSel");
  if (!sel || typeof TOPICS === "undefined") return;

  sel.innerHTML =
    `<option value="">– kies topic –</option>` +
    TOPICS.filter((t) => t.id !== "global")
      .map((t) => `<option value="${t.id}">${t.title}</option>`)
      .join("");
}

/* ---------- Fetch overall ---------- */
function pickBestRows(rows = []) {
  const best = new Map();
  const isBetter = (a, b) => {
    if (!b) return true;
    if ((a.score ?? -1) !== (b.score ?? -1)) return (a.score ?? -1) > (b.score ?? -1);
    if ((a.acc ?? -1) !== (b.acc ?? -1)) return (a.acc ?? -1) > (b.acc ?? -1);
    return (a.duration_ms ?? 9e15) < (b.duration_ms ?? 9e15);
  };

  rows.forEach((row) => {
    const key = row.user_id || row.name;
    const prev = best.get(key);
    if (isBetter(row, prev)) best.set(key, row);
  });

  return Array.from(best.values());
}

async function fetchOverallBoard() {
  if (!leaderboardReady()) return [];

  const { data, error } = await sb
    .from("scores_best")
    .select("user_id,name,class,score,acc,duration_ms")
    .eq("mode", "global")
    .eq("topic", "global")
    .order("score", { ascending: false })
    .order("acc", { ascending: false })
    .order("duration_ms", { ascending: true })
    .limit(20);

  if (error) throw error;
  return pickBestRows(data || []);
}

/* ---------- Fetch per topic ---------- */
async function fetchTopicBoard(topicId) {
  if (!leaderboardReady() || !topicId) return [];

  const { data, error } = await sb
    .from("scores_best")
    .select("user_id,name,class,topic,score,acc,duration_ms")
    .eq("mode", "topic")
    .eq("topic", topicId)
    .order("score", { ascending: false })
    .order("acc", { ascending: false })
    .order("duration_ms", { ascending: true })
    .limit(20);

  if (error) throw error;
  return pickBestRows(data || []);
}

/* ---------- Render ---------- */
function renderOverallBoard(rows = []) {
  const body = $("#boardOverall");
  if (!body) return;
  body.innerHTML = "";

  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.name}</td>
      <td>${r.class}</td>
      <td>${r.score}</td>
      <td>${r.acc}%</td>
    `;
    body.appendChild(tr);
  });
}

function renderTopicBoard(rows = []) {
  const body = $("#boardTopic");
  if (!body) return;
  body.innerHTML = "";

  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.name}</td>
      <td>${r.class}</td>
      <td>${r.topic}</td>
      <td>${r.score}</td>
      <td>${r.acc}%</td>
    `;
    body.appendChild(tr);
  });
}

/* ---------- Posting ---------- */
function canPostNow() {
  if (!authUser) return false;
  const key = "wq_last_post_" + authUser.id;
  const last = Number(localStorage.getItem(key) || 0);
  return Date.now() - last > 30_000;
}

function markPosted() {
  if (!authUser) return;
  const key = "wq_last_post_" + authUser.id;
  localStorage.setItem(key, String(Date.now()));
}

async function hasActiveSession() {
  if (!sb) return false;
  try {
    const { data, error } = await sb.auth.getSession();
    if (error) {
      console.warn("getSession failed", error?.message || error);
    }
    return !!data?.session;
  } catch (e) {
    console.warn("getSession crashed", e?.message || e);
    return false;
  }
}

async function postScore({ mode, topic, score, acc, duration_ms, name, className, class: klass } = {}) {
  if (!leaderboardReady()) return;
  if (!canPostNow()) return;

  window.lastScoreAttempted = true;
  window.lastScoreStatus = "bezig";
  window.lastScoreError = null;

  const nm = String((name || profile?.name || profile?.username || "leerling")).trim() || "leerling";
  const cls = String((className || klass || profile?.class || "1B")).trim() || "1B";

  const payload = {
    user_id: authUser.id,
    day: todayKey(),
    mode,
    topic,
    name: nm,
    class: cls,
    score,
    acc,
    duration_ms: duration_ms ?? null,
  };

  // Dedupe binnen de cooldown window (zodat offline niet alles dubbel queued)
  const dedupeKey = [payload.user_id, payload.day, payload.mode, payload.topic, payload.score, payload.acc, payload.duration_ms ?? ""].join("|");

  // 1) Eerst veilig in outbox bewaren
  const queued = window.WQ_OUTBOX?.enqueue?.("scores", payload, { dedupeKey });
  if (queued) {
    window.lastScoreStatus = "queued";
    window.lastScoreError = null;
    markPosted();
    window.WQ_OUTBOX?.flushSoon?.(250);
    return;
  }

  // 2) Fallback: direct insert (als localStorage faalt)
  let ok = false;
  try {
    const { error } = await sb.from("scores").insert(payload);
    if (error) throw error;
    ok = true;
    window.lastScoreStatus = "ok";
    window.lastScoreError = null;
  } catch (e) {
    window.lastScoreStatus = "fout";
    window.lastScoreError = e?.message || String(e);
    console.warn("scores insert failed", e?.message || e);
  }

  if (ok) markPosted();
}

/* ---------- Refresh ---------- */

async function refreshBoards() {
  try {
    populateBoardTopicSel();
    const overall = await fetchOverallBoard();
    renderOverallBoard(overall);
  } catch (e) {
    console.warn("Leaderboard refresh failed", e);
  }
}

/* alias voor auth.js */
const refreshAllLB = refreshBoards;

/* ---------- UI events ---------- */
document.addEventListener("DOMContentLoaded", () => {
  populateBoardTopicSel();

  $("#btnOpenBoard")?.addEventListener("click", async () => {
    showScreen("scrBoard");
    await refreshBoards();
  });

  $("#btnBackFromBoard")?.addEventListener("click", () => {
    showScreen("scrMap");
  });

  $("#btnRefreshBoard")?.addEventListener("click", refreshBoards);

  $("#boardTopicSel")?.addEventListener("change", async (e) => {
    const topic = e.target.value;
    if (!topic) {
      $("#boardTopic").innerHTML = "";
      return;
    }
    const rows = await fetchTopicBoard(topic);
    renderTopicBoard(rows);
  });
});

/* ---------- Exports ---------- */
window.postScore = postScore;
window.refreshBoards = refreshBoards;
window.refreshAllLB = refreshAllLB;

/* =========================
   TEST RUNS (Supabase log)
   Bewaart toetsresultaten + detail (JSONB) zodat je in Supabase dashboards
   progressie en analyses kan maken.
========================= */

async function logTestRun(summary) {
  if (!authUser) {
    window.lastTestRunError = "Niet ingelogd.";
    window.lastTestRunStatus = "geen sessie";
    window.lastTestRunAttempted = true;
    return;
  }

  try {
    window.lastTestRunAttempted = true;
    window.lastTestRunStatus = "bezig";
    window.lastTestRunError = null;

    const mode = (summary?.mode || "").toString().toLowerCase();
    const topic = summary?.topicId || summary?.topic || null;

    const qs = Array.isArray(summary?.questions) ? summary.questions : null;
    const total =
      Number.isFinite(Number(summary?.total)) ? Number(summary.total) :
      (qs ? qs.length : null);

    const correct =
      Number.isFinite(Number(summary?.correct)) ? Number(summary.correct) :
      (qs ? qs.filter(q => q && q.ok === true).length : null);

    const pct =
      Number.isFinite(Number(summary?.pct)) ? Number(summary.pct) :
      (total && correct != null ? Math.round((correct / total) * 100) : null);

    const row = {
      user_id: authUser.id,
      created_at: new Date().toISOString(),

      mode: mode || null,
      topic: topic || null,

      learner_name: String(summary?.name || profile?.name || profile?.username || "leerling").trim() || "leerling",
      learner_class: String(summary?.class || profile?.class || "1B").trim() || "1B",

      score: Number.isFinite(Number(summary?.score)) ? Number(summary.score) : null,
      total: total,
      correct: correct,
      pct: pct,

      duration_sec: Number.isFinite(Number(summary?.seconds || summary?.durationSec)) ? Number(summary.seconds || summary.durationSec) : null,
      time_limit_sec: Number.isFinite(Number(summary?.timeLimitSec)) ? Number(summary.timeLimitSec) : null,

      test_id: summary?.testId || null,
      seed: Number.isFinite(Number(summary?.seed)) ? (Number(summary.seed) | 0) : null,
      hash: summary?.hash || null,

      payload: summary || null,
    };

    const dedupeKey = [row.user_id, row.created_at, row.mode, row.topic].join("|");

    const queued = window.WQ_OUTBOX?.enqueue?.("test_runs", row, { dedupeKey });
    if (queued) {
      window.lastTestRunError = null;
      window.lastTestRunStatus = "queued";
      window.WQ_OUTBOX?.flushSoon?.(300);
      return;
    }

    // Fallback direct insert
    if (!sb) {
      window.lastTestRunError = "Geen Supabase client.";
      window.lastTestRunStatus = "fout";
      return;
    }

    const { error } = await sb.from("test_runs").insert(row);
    if (error) {
      window.lastTestRunError = error?.message || String(error);
      window.lastTestRunStatus = "fout";
      console.warn("logTestRun failed:", error?.message || error);
      return;
    }

    window.lastTestRunError = null;
    window.lastTestRunStatus = "ok";
  } catch (e) {
    window.lastTestRunError = e?.message || String(e);
    window.lastTestRunStatus = "fout";
    console.warn("logTestRun failed:", e?.message || e);
  }
}
window.logTestRun = logTestRun;

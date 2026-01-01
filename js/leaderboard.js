/* =========================
   Wiskunde Quest – leaderboard.js
   Supabase leaderboards (ALL-TIME)
========================= */

/* ---------- Guards ---------- */
function leaderboardReady() {
  return (
    typeof sb !== "undefined" &&
    authUser &&
    profile?.name &&
    profile?.class
  );
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

/* =========================
   FETCH (ALL-TIME)
   -> geen .eq("day", todayKey())
========================= */

/* ---------- Fetch overall (all days) ---------- */
async function fetchOverallBoard() {
  if (!leaderboardReady()) return [];

  const { data, error } = await sb
    .from("scores_best")
    .select("day,name,class,score,acc,duration_ms")
    .eq("mode", "global")
    .eq("topic", "global")
    .order("score", { ascending: false })
    .order("acc", { ascending: false })
    .order("duration_ms", { ascending: true })
    .order("day", { ascending: false }) // tie-break: recenter boven
    .limit(50);

  if (error) throw error;
  return data || [];
}

/* ---------- Fetch per topic (all days) ---------- */
async function fetchTopicBoard(topicId) {
  if (!leaderboardReady() || !topicId) return [];

  const { data, error } = await sb
    .from("scores_best")
    .select("day,name,class,topic,score,acc,duration_ms")
    .eq("mode", "topic")
    .eq("topic", topicId)
    .order("score", { ascending: false })
    .order("acc", { ascending: false })
    .order("duration_ms", { ascending: true })
    .order("day", { ascending: false }) // tie-break: recenter boven
    .limit(50);

  if (error) throw error;
  return data || [];
}

/* ---------- Render ---------- */
function renderOverallBoard(rows = []) {
  const body = $("#boardOverall");
  if (!body) return;
  body.innerHTML = "";

  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    // dag als tooltip (kolommen blijven identiek)
    tr.title = r.day ? `Dag: ${r.day}` : "";
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
    tr.title = r.day ? `Dag: ${r.day}` : "";
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

async function postScore({ mode, topic, score, acc, duration_ms }) {
  if (!leaderboardReady()) return;
  if (!canPostNow()) return;

  const payload = {
    user_id: authUser.id,
    day: todayKey(), // blijft nuttig voor historiek/analyses
    mode,
    topic,
    name: profile.name,
    class: profile.class,
    score,
    acc,
    duration_ms: duration_ms ?? null,
  };

  const { error } = await sb.from("scores").insert(payload);
  if (error) throw error;

  markPosted();
}

/* ---------- Refresh ---------- */
async function refreshBoards() {
  try {
    populateBoardTopicSel();

    // overall
    const overall = await fetchOverallBoard();
    renderOverallBoard(overall);

    // topic (als er iets gekozen staat)
    const topicSel = $("#boardTopicSel");
    const topicId = topicSel?.value || "";
    if (topicId) {
      const rows = await fetchTopicBoard(topicId);
      renderTopicBoard(rows);
    } else {
      $("#boardTopic").innerHTML = "";
    }
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
  if (!authUser || !sb) return;

  try {
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

      learner_name: summary?.name || profile?.name || profile?.username || null,
      learner_class: summary?.class || profile?.class || "1B",

      score: Number.isFinite(Number(summary?.score)) ? Number(summary.score) : null,
      total: total,
      correct: correct,
      pct: pct,

      duration_sec: Number.isFinite(Number(summary?.seconds || summary?.durationSec)) ? Number(summary.seconds || summary.durationSec) : null,
      time_limit_sec: Number.isFinite(Number(summary?.timeLimitSec)) ? Number(summary.timeLimitSec) : null,

      test_id: summary?.testId || null,
      seed: Number.isFinite(Number(summary?.seed)) ? Number(summary.seed) : null,
      hash: summary?.hash || null,

      payload: summary || null,
    };

    const { error } = await sb.from("test_runs").insert(row);
    if (error) console.warn("logTestRun failed:", error?.message || error);
  } catch (e) {
    console.warn("logTestRun failed:", e?.message || e);
  }
}
window.logTestRun = logTestRun;

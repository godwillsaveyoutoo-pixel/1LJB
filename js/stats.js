/* =========================
   Wiskunde Quest – stats.js
   Leerling stats + Teacher view (Supabase)
========================= */

function _fmtDateTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString('nl-BE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (_) {
    return String(ts || '');
  }
}

function _msToMMSS(sec) {
  const s = Math.max(0, Math.floor(Number(sec || 0)));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function _topicTitle(id) {
  const t = (window.TOPICS || []).find(x => x.id === id);
  return t ? t.title : (id || "—");
}

function _topicLabel(id) {
  // korte labels voor grafieken
  const t = (window.TOPICS || []).find(x => x.id === id);
  if (!t) return String(id || "—");
  return (t.title || id).slice(0, 10);
}

function _fillTopicSelect(selId) {
  const sel = document.getElementById(selId);
  if (!sel) return;
  const keep = sel.value || "all";
  // behoud 1e optie (alles)
  const first = sel.querySelector('option[value="all"]');
  sel.innerHTML = '';
  if (first) sel.appendChild(first);
  (window.TOPICS || []).forEach(t => {
    const o = document.createElement("option");
    o.value = t.id;
    o.textContent = t.title;
    sel.appendChild(o);
  });
  sel.value = keep;
}

function _rangeISO(rangeVal) {
  if (rangeVal === "all") return null;
  const days = Number(rangeVal || 30);
  if (!Number.isFinite(days) || days <= 0) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

async function _fetchRuns({ range, mode, topic, teacher, search }) {
  if (!window.sb || !window.authUser) return [];

  let q = sb
    .from("test_runs")
    .select("id,created_at,mode,topic,learner_name,learner_class,score,total,correct,pct,duration_sec,time_limit_sec,test_id,seed,hash,payload")
    .order("created_at", { ascending: false })
    .limit(500);

  const since = _rangeISO(range);
  if (since) q = q.gte("created_at", since);

  if (mode && mode !== "all") q = q.eq("mode", mode);
  if (topic && topic !== "all") q = q.eq("topic", topic);

  if (!teacher) {
    q = q.eq("user_id", authUser.id);
  } else {
    if (search && String(search).trim()) {
      q = q.ilike("learner_name", `%${String(search).trim()}%`);
    }
  }

  const { data, error } = await q;
  if (error) {
    console.warn("fetchRuns failed:", error.message || error);
    return [];
  }
  return data || [];
}

function _groupAvgByTopic(runs) {
  const m = new Map();
  for (const r of runs) {
    const t = r.topic || "—";
    const pct = Number(r.pct);
    if (!Number.isFinite(pct)) continue;
    const cur = m.get(t) || { sum: 0, n: 0 };
    cur.sum += pct;
    cur.n += 1;
    m.set(t, cur);
  }
  const out = Array.from(m.entries()).map(([topic, v]) => ({
    topic,
    avg: v.n ? v.sum / v.n : 0,
    n: v.n
  }));
  out.sort((a, b) => b.avg - a.avg);
  return out;
}

function _groupAvgByDay(runs) {
  const m = new Map();
  for (const r of runs) {
    const day = String(r.created_at || "").slice(0, 10);
    const pct = Number(r.pct);
    if (!day || !Number.isFinite(pct)) continue;
    const cur = m.get(day) || { sum: 0, n: 0 };
    cur.sum += pct;
    cur.n += 1;
    m.set(day, cur);
  }
  const days = Array.from(m.keys()).sort();
  const values = days.map(d => {
    const v = m.get(d);
    return v.n ? Math.round((v.sum / v.n) * 10) / 10 : 0;
  });
  return { days, values };
}

function _renderTable(tbody, rows, teacher) {
  if (!tbody) return;
  tbody.innerHTML = "";

  rows.forEach(r => {
    const tr = document.createElement("tr");
    const pct = Number(r.pct);
    const pctTxt = Number.isFinite(pct) ? `${Math.round(pct)}%` : "—";
    const scoreTxt = (Number.isFinite(Number(r.score)) && Number.isFinite(Number(r.total)))
      ? `${r.score}/${r.total}`
      : (Number.isFinite(Number(r.score)) ? String(r.score) : "—");

    tr.innerHTML = teacher
      ? `<td>${_fmtDateTime(r.created_at)}</td>
         <td>${(r.learner_name || "—")}${r.learner_class ? ` • ${r.learner_class}` : ""}</td>
         <td>${_topicTitle(r.topic)}</td>
         <td>${r.mode || "—"}</td>
         <td>${scoreTxt}</td>
         <td>${pctTxt}</td>
         <td>${_msToMMSS(r.duration_sec)}</td>`
      : `<td>${_fmtDateTime(r.created_at)}</td>
         <td>${_topicTitle(r.topic)}</td>
         <td>${r.mode || "—"}</td>
         <td>${scoreTxt}</td>
         <td>${pctTxt}</td>
         <td>${_msToMMSS(r.duration_sec)}</td>`;

    tbody.appendChild(tr);
  });
}

async function renderMyStats() {
  // Zorg dat profiel/role up-to-date is (handig na wijzigen in Supabase)
  try { await window.refreshRemoteProfile?.(); } catch (_) {}
  const sub = document.getElementById("statsSub");
  if (sub) sub.textContent = "Je ziet hier enkel jouw eigen resultaten.";

  _fillTopicSelect("statsTopic");

  const range = document.getElementById("statsRange")?.value || "30";
  const mode = document.getElementById("statsMode")?.value || "all";
  const topic = document.getElementById("statsTopic")?.value || "all";

  const runs = await _fetchRuns({ range, mode, topic, teacher: false });

  const kpi = document.getElementById("statsKpis");
  if (kpi) {
    const pcts = runs.map(r => Number(r.pct)).filter(n => Number.isFinite(n));
    const avg = pcts.length ? Math.round((pcts.reduce((a,b)=>a+b,0)/pcts.length)) : null;
    kpi.textContent = `aantal: ${runs.length}${avg!=null ? ` • gem.: ${avg}%` : ""}`;
  }

  // Line: average by day
  const lineWrap = document.getElementById("statsLine");
  if (lineWrap) {
    const { days, values } = _groupAvgByDay(runs.slice().reverse());
    if (days.length < 2) {
      lineWrap.innerHTML = `<div class="tiny" style="color:var(--mut)">Nog te weinig data voor een grafiek.</div>`;
    } else {
      lineWrap.innerHTML = svgLineChart(days, values, 100, 10, "Gemiddelde % per dag");
    }
  }

  // Bars: avg by topic
  const barsWrap = document.getElementById("statsBars");
  if (barsWrap) {
    const byTopic = _groupAvgByTopic(runs).slice(0, 8);
    if (!byTopic.length) {
      barsWrap.innerHTML = `<div class="tiny" style="color:var(--mut)">Nog geen resultaten.</div>`;
    } else {
      const data = byTopic.map(x => ({ label: _topicLabel(x.topic), value: Math.round(x.avg) }));
      barsWrap.innerHTML = svgBarChart(data, 100, "Gemiddelde % per topic", { step: 10 });
    }
  }

  // Table
  const tbody = document.querySelector("#statsTable tbody");
  _renderTable(tbody, runs.slice(0, 80), false);
}

async function renderTeacherDashboard() {
  // Zorg dat profiel/role up-to-date is (handig na wijzigen in Supabase)
  try { await window.refreshRemoteProfile?.(); } catch (_) {}
  if (!window.profile || profile.role !== "teacher") {
    const wrap = document.getElementById("teachBars");
    if (wrap) wrap.innerHTML = `<div class="tiny" style="color:var(--mut)">Geen toegang. Zet jouw profiel in Supabase op role = teacher.</div>`;
    const line = document.getElementById("teachLine");
    if (line) line.innerHTML = "";
    return;
  }

  _fillTopicSelect("teachTopic");

  const range = document.getElementById("teachRange")?.value || "30";
  const mode = document.getElementById("teachMode")?.value || "toets";
  const topic = document.getElementById("teachTopic")?.value || "all";
  const search = document.getElementById("teachSearch")?.value || "";

  const runs = await _fetchRuns({ range, mode, topic, teacher: true, search });

  const kpi = document.getElementById("teachKpis");
  if (kpi) {
    const pcts = runs.map(r => Number(r.pct)).filter(n => Number.isFinite(n));
    const avg = pcts.length ? Math.round((pcts.reduce((a,b)=>a+b,0)/pcts.length)) : null;
    const learners = new Set(runs.map(r => (r.learner_name || "").trim()).filter(Boolean));
    kpi.textContent = `aantal: ${runs.length}${learners.size ? ` • leerlingen: ${learners.size}` : ""}${avg!=null ? ` • gem.: ${avg}%` : ""}`;
  }

  const barsWrap = document.getElementById("teachBars");
  if (barsWrap) {
    const byTopic = _groupAvgByTopic(runs).slice(0, 10);
    if (!byTopic.length) {
      barsWrap.innerHTML = `<div class="tiny" style="color:var(--mut)">Geen data.</div>`;
    } else {
      const data = byTopic.map(x => ({ label: _topicLabel(x.topic), value: Math.round(x.avg) }));
      barsWrap.innerHTML = svgBarChart(data, 100, "Gemiddelde % per topic", { step: 10 });
    }
  }

  const lineWrap = document.getElementById("teachLine");
  if (lineWrap) {
    const { days, values } = _groupAvgByDay(runs.slice().reverse());
    if (days.length < 2) {
      lineWrap.innerHTML = `<div class="tiny" style="color:var(--mut)">Nog te weinig data voor een grafiek.</div>`;
    } else {
      lineWrap.innerHTML = svgLineChart(days, values, 100, 10, "Gemiddelde % per dag");
    }
  }

  const tbody = document.querySelector("#teachTable tbody");
  _renderTable(tbody, runs.slice(0, 120), true);
}

window.renderMyStats = renderMyStats;
window.renderTeacherDashboard = renderTeacherDashboard;

document.addEventListener("DOMContentLoaded", () => {
  // Back buttons
  document.getElementById("btnBackFromStats")?.addEventListener("click", () => showScreen("scrMap"));
  document.getElementById("btnBackFromTeacher")?.addEventListener("click", () => showScreen("scrMap"));

  // Refresh buttons
  document.getElementById("btnRefreshStats")?.addEventListener("click", renderMyStats);
  document.getElementById("btnRefreshTeacher")?.addEventListener("click", renderTeacherDashboard);

  // Auto refresh on filter change
  ["statsRange","statsMode","statsTopic"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", renderMyStats);
  });
  ["teachRange","teachMode","teachTopic"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", renderTeacherDashboard);
  });
  document.getElementById("teachSearch")?.addEventListener("input", () => {
    // kleine debounce
    clearTimeout(window.__teachSearchTimer);
    window.__teachSearchTimer = setTimeout(renderTeacherDashboard, 300);
  });
});

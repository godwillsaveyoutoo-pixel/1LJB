/* =========================
   Wiskunde Quest – outbox.js
   Betrouwbare 'outbox' voor Supabase inserts.
   Doel: als wifi / sessie even faalt, toch niets verliezen.

   Gebruikt localStorage per gebruiker.
   Items worden automatisch opnieuw geprobeerd.
========================= */

(function () {
  const PREFIX = "wq_outbox_v1_";
  const MAX_ITEMS = 200;              // beschermt localStorage
  const MAX_AGE_MS = 14 * 24 * 3600 * 1000; // 14 dagen
  const BATCH_PER_FLUSH = 10;

  let flushing = false;
  let started = false;
  let flushTimer = null;

  function now() { return Date.now(); }

  function getUserId() {
    return window.authUser && window.authUser.id ? window.authUser.id : null;
  }

  function keyFor(uid) {
    return PREFIX + uid;
  }

  function safeJsonParse(s) {
    try { return JSON.parse(s); } catch (_) { return null; }
  }

  function loadItems(uid) {
    if (!uid) return [];
    const raw = localStorage.getItem(keyFor(uid));
    if (!raw) return [];
    const obj = safeJsonParse(raw);
    const items = Array.isArray(obj?.items) ? obj.items : (Array.isArray(obj) ? obj : []);
    return Array.isArray(items) ? items : [];
  }

  function saveItems(uid, items) {
    if (!uid) return;
    const clean = Array.isArray(items) ? items : [];
    localStorage.setItem(keyFor(uid), JSON.stringify({ v: 1, items: clean }));
  }

  function prune(items) {
    const cutoff = now() - MAX_AGE_MS;
    let out = (items || []).filter(it => (it && (it.ts || 0) >= cutoff));
    if (out.length > MAX_ITEMS) out = out.slice(out.length - MAX_ITEMS);
    return out;
  }

  function genId() {
    return (
      Math.random().toString(16).slice(2) +
      Math.random().toString(16).slice(2) +
      now().toString(16)
    );
  }

  function enqueue(kind, payload, opts) {
    const uid = (opts && opts.userId) ? opts.userId : getUserId();
    if (!uid) return false;

    const dedupeKey = opts && opts.dedupeKey ? String(opts.dedupeKey) : null;

    try {
      let items = prune(loadItems(uid));

      if (dedupeKey) {
        const exists = items.some(it => it && it.kind === kind && it.dedupeKey === dedupeKey);
        if (exists) return true;
      }

      items.push({
        id: genId(),
        kind: String(kind || ""),
        payload: payload || null,
        dedupeKey: dedupeKey,
        ts: now(),
        tries: 0,
        lastError: null
      });

      items = prune(items);
      saveItems(uid, items);
      return true;
    } catch (e) {
      console.warn("Outbox enqueue failed", e?.message || e);
      return false;
    }
  }

  async function hasActiveSession() {
    const sb = window.sb;
    if (!sb) return false;
    try {
      const { data, error } = await sb.auth.getSession();
      if (error) return false;
      return !!data?.session;
    } catch (_) {
      return false;
    }
  }

  async function flush() {
    const uid = getUserId();
    const sb = window.sb;
    if (!uid || !sb) {
      return { sent: 0, left: uid ? loadItems(uid).length : 0 };
    }

    if (flushing) {
      return { sent: 0, left: loadItems(uid).length };
    }

    flushing = true;
    let sent = 0;

    try {
      let items = prune(loadItems(uid));
      if (!items.length) {
        return { sent: 0, left: 0 };
      }

      // Als er geen actieve sessie is, probeer niet agressief.
      // Items blijven staan en flush wordt later opnieuw geprobeerd.
      const sessionOk = await hasActiveSession();
      if (!sessionOk) {
        return { sent: 0, left: items.length };
      }

      const remaining = [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (!it || !it.kind) continue;

        if (sent >= BATCH_PER_FLUSH) {
          remaining.push(it);
          continue;
        }

        const table = (it.kind === "scores") ? "scores" : (it.kind === "test_runs" ? "test_runs" : null);
        if (!table) {
          // onbekend itemtype: laat staan
          remaining.push(it);
          continue;
        }

        try {
          const { error } = await sb.from(table).insert(it.payload);
          if (error) throw error;
          sent++;
        } catch (e) {
          it.tries = Number(it.tries || 0) + 1;
          it.lastError = e?.message || String(e);
          remaining.push(it);

          // Bij auth/permission issues: niet verder spammen.
          const msg = String(it.lastError || "").toLowerCase();
          if (msg.includes("jwt") || msg.includes("permission") || msg.includes("rls") || msg.includes("not authorized") || msg.includes("auth")) {
            // stop deze flush, later opnieuw proberen na re-login
            for (let j = i + 1; j < items.length; j++) remaining.push(items[j]);
            break;
          }
        }
      }

      saveItems(uid, prune(remaining));
      return { sent, left: remaining.length };
    } finally {
      flushing = false;
    }
  }

  function flushSoon(delayMs) {
    const d = Number.isFinite(Number(delayMs)) ? Number(delayMs) : 250;
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
      flushTimer = null;
      // fire-and-forget
      flush().catch(() => {});
    }, Math.max(0, d));
  }

  function start() {
    if (started) return;
    started = true;

    // flush wanneer netwerk terug is
    window.addEventListener("online", () => flushSoon(200));

    // flush wanneer tab terug actief wordt
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) flushSoon(200);
    });

    // periodieke flush (school-wifi vriendelijk)
    setInterval(() => flushSoon(300), 15_000);
  }

  function size() {
    const uid = getUserId();
    return uid ? loadItems(uid).length : 0;
  }

  function peek() {
    const uid = getUserId();
    const items = uid ? loadItems(uid) : [];
    return items.slice(-10);
  }

  window.WQ_OUTBOX = {
    enqueue,
    flush,
    flushSoon,
    start,
    size,
    peek
  };
})();

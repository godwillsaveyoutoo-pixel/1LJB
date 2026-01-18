/* =========================
   Wiskunde Quest – auth.js
   Supabase auth + login/signup
========================= */

/* ---------- Supabase setup ---------- */
const SUPABASE_URL = "https://jreitzsnmjrtkeoiuyyd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZWl0enNubWpydGtlb2l1eXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1OTI5NTEsImV4cCI6MjA4MjE2ODk1MX0.JKvsSmazmOeHxLeMk5dOtOGZKHaPGr66Ki1ZvLLUhHI";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// expose for other modules (stats/teacher)
window.sb = sb;


/* ---------- Auth state ---------- */
let authUser = null;
  window.authUser = authUser;

/* ---------- Username helpers ---------- */
function cleanUsername(u) {
  return (u || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9._-]/g, "");
}

function usernameToEmail(username) {
  const raw = String(username || "").trim();

  // Laat ook echte e-mails toe (handig als je users in Supabase UI aanmaakt)
  if (raw.includes("@")) {
    const email = raw.toLowerCase();
    const local = email.split("@")[0] || "";
    return {
      username: cleanUsername(local),
      email,
    };
  }

  const u = cleanUsername(raw);
  return {
    username: u,
    email: u ? `${u}@wiskundequest.example` : "",
  };
}

/* ---------- Public helpers ---------- */
function isAuthed() {
  return !!authUser;
}

function hasIdentity() {
  return !!authUser;
}

/* ---------- Core auth lifecycle ---------- */
async function initAuth() {
  // 1) bestaande sessie ophalen (refresh / reload)
  const {
    data: { session },
  } = await sb.auth.getSession();

  if (session?.user) {
    authUser = session.user;
    window.authUser = authUser;
    await onAuthReady();
  } else {
    await onAuthSignedOut();
  }

  // 2) luisteren naar latere auth changes
  sb.auth.onAuthStateChange(async (_event, session) => {
    authUser = session?.user || null;
    window.authUser = authUser;

    if (authUser) {
      await onAuthReady();
    } else {
      await onAuthSignedOut();
    }
  });
}

/* ---------- Login ---------- */
async function login(username, password) {
  const { email } = usernameToEmail(username);

  if (!email || !password) {
    throw new Error("Gebruikersnaam en wachtwoord vereist.");
  }
  if (password.length < 6) {
    throw new Error("Wachtwoord moet minstens 6 tekens zijn.");
  }

  const { error } = await sb.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

/* ---------- Signup ---------- */
async function signup({ username, password, name, className }) {
  const { email, username: cleanU } = usernameToEmail(username);

  if (!email || !password) {
    throw new Error("Gebruikersnaam en wachtwoord vereist.");
  }
  if (password.length < 6) {
    throw new Error("Wachtwoord moet minstens 6 tekens zijn.");
  }
  if (!name?.trim()) {
    throw new Error("Naam is verplicht (voor scoreboard).");
  }

  // Klas staat vast (1B) – leerlingen hoeven dit niet in te vullen
  className = (className && String(className).trim()) ? String(className).trim() : '1B';

  const { data, error } = await sb.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Probeer meteen een echte sessie te krijgen (niet enkel een signup user).
  try {
    const { data: sData, error: sErr } = await sb.auth.signInWithPassword({
      email,
      password,
    });
    if (sErr) throw sErr;
    authUser = sData?.user || data.user;
  } catch (e) {
    // Signup kan slagen zonder actieve sessie (bv. storage of policy issues).
    console.warn("Auto-login na signup mislukt:", e?.message || e);
    authUser = data.user;
  }
  window.authUser = authUser;

  // profiel wordt centraal beheerd in profile.js
  if (typeof ensureProfileRow === "function") {
  const row = await ensureProfileRow({
    username: cleanU,
    name: name.trim(),
    class: String(className||'1B').trim(),
  });

  if (typeof applyRemoteProfile === "function") {
    applyRemoteProfile(row);
  }
}
}
/* ---------- Logout ---------- */
async function logout() {
  await sb.auth.signOut();
  authUser = null;
  window.authUser = authUser;
}

/* ---------- Auth → app hooks ---------- */
async function onAuthReady() {
  // laad lokale stores voor deze user (skills/prog)
  try {
    loadLearnerStores?.();
  } catch (_) {}

  // profiel ophalen / syncen
  if (typeof ensureProfileRow === "function") {
    try {
      // Seed username vanuit e-mail (voor accounts die buiten de app zijn aangemaakt)
      const seed = {};
      try {
        const em = String(authUser?.email || "").toLowerCase();
        if (em && em.includes("@") && !(window.profile?.username || "").trim()) {
          const local = em.split("@")[0] || "";
          const u = cleanUsername(local);
          if (u) seed.username = u;
        }
        // Klas: default
        seed.class = '1B';
      } catch (_) {}

      const row = await ensureProfileRow(seed);
      if (typeof applyRemoteProfile === "function") {
        applyRemoteProfile(row);
      }

      // Als naam ontbreekt: vraag die 1x (klas staat vast)
      try {
        const nm = (window.profile?.name || "").trim();
        if (!nm && window.MR_SHARED?.askName) {
          const res = await window.MR_SHARED.askName('taak', { fixedClass: '1B', hideClass: true });
          const newName = (typeof res === 'string' ? res : (res?.name || '')).trim();
          if (newName) {
            // schrijf meteen door naar Supabase + update lokale state
            const row2 = await ensureProfileRow({ name: newName, class: '1B' });
            applyRemoteProfile?.(row2);
          }
        }
      } catch (e) {
        console.warn("Name prompt failed:", e?.message || e);
      }
    } catch (e) {
      console.warn("Profile sync failed:", e);
    }
  }

  // Teacher-role check (veilig): via aparte tabel 'teachers' indien aanwezig
  try {
    if (sb && window.profile) {
      const { data, error } = await sb.from('teachers').select('user_id').eq('user_id', authUser.id).maybeSingle();
      if (!error && data) window.profile.role = 'teacher';
      else if (!error) window.profile.role = 'student';
    }
  } catch (_) {}

  // UI
  updateUserPill?.();
  renderSettings?.();

  // naar map
  showScreen?.("scrMap");

  // leaderboard verversen (non-blocking)
  try {
    refreshAllLB?.();
  } catch (_) {}

  // Outbox: queued scores/test_runs opnieuw proberen
  try {
    window.WQ_OUTBOX?.start?.();
    window.WQ_OUTBOX?.flushSoon?.(250);
  } catch (_) {}
}

async function onAuthSignedOut() {
  // laad lokale stores voor anonieme user
  try {
    loadLearnerStores?.();
  } catch (_) {}

  updateUserPill?.();
  renderSettings?.();
  showScreen?.("scrStart");
}

/* ---------- Auto init ---------- */
document.addEventListener("DOMContentLoaded", initAuth);

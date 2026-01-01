-- ==========================================
-- Wiskunde Quest – Supabase setup (profiles + test_runs)
-- Doel: leerling stats + teacher view + veilige RLS
-- ==========================================

-- 1) PROFILES
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text,
  name text,
  class text default '1B',
  role text default 'student',  -- 'student' of 'teacher'
  settings jsonb default '{}'::jsonb,
  skills jsonb default '{}'::jsonb,
  prog jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Voeg ontbrekende kolommen toe (voor bestaande projecten)
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists class text default '1B';
alter table public.profiles add column if not exists role text default 'student';
alter table public.profiles add column if not exists settings jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists skills jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists prog jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists updated_at timestamptz default now();

create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_upsert_own" on public.profiles;
create policy "profiles_upsert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = user_id AND (role IS NULL OR role = 'student'));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  AND role = (select p.role from public.profiles p where p.user_id = auth.uid())
);

-- (Optioneel) teacher mag alle profiles lezen
drop policy if exists "profiles_select_teacher" on public.profiles;
create policy "profiles_select_teacher"
on public.profiles for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid()
      and p.role = 'teacher'
  )
);

-- 2) TEST RUNS (toets + run samenvattingen)
create table if not exists public.test_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),

  mode text,          -- 'toets' | 'run' | ...
  topic text,         -- topic id (bv. 'tijd', 'lijnen', ...)

  learner_name text,
  learner_class text,

  score integer,
  total integer,
  correct integer,
  pct numeric,

  duration_sec integer,
  time_limit_sec integer,

  test_id text,
  seed integer,
  hash text,

  payload jsonb
);

-- Voeg ontbrekende kolommen toe (voor bestaande projecten)
alter table public.test_runs add column if not exists created_at timestamptz not null default now();
alter table public.test_runs add column if not exists mode text;
alter table public.test_runs add column if not exists topic text;
alter table public.test_runs add column if not exists learner_name text;
alter table public.test_runs add column if not exists learner_class text;
alter table public.test_runs add column if not exists score integer;
alter table public.test_runs add column if not exists total integer;
alter table public.test_runs add column if not exists correct integer;
alter table public.test_runs add column if not exists pct numeric;
alter table public.test_runs add column if not exists duration_sec integer;
alter table public.test_runs add column if not exists time_limit_sec integer;
alter table public.test_runs add column if not exists test_id text;
alter table public.test_runs add column if not exists seed integer;
alter table public.test_runs add column if not exists hash text;
alter table public.test_runs add column if not exists payload jsonb;

create index if not exists test_runs_user_idx on public.test_runs (user_id);
create index if not exists test_runs_created_idx on public.test_runs (created_at desc);
create index if not exists test_runs_topic_idx on public.test_runs (topic);
create index if not exists test_runs_mode_idx on public.test_runs (mode);

alter table public.test_runs enable row level security;

-- leerling: eigen rijen lezen
drop policy if exists "test_runs_select_own" on public.test_runs;
create policy "test_runs_select_own"
on public.test_runs for select
to authenticated
using (auth.uid() = user_id);

-- leerling: eigen rijen schrijven
drop policy if exists "test_runs_insert_own" on public.test_runs;
create policy "test_runs_insert_own"
on public.test_runs for insert
to authenticated
with check (auth.uid() = user_id);

-- teacher: alles lezen
drop policy if exists "test_runs_select_teacher" on public.test_runs;
create policy "test_runs_select_teacher"
on public.test_runs for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid()
      and p.role = 'teacher'
  )
);

-- ==========================================
-- Einde
-- ==========================================

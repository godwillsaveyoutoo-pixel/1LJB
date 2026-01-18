-- ==========================================
-- Wiskunde Quest – Supabase setup (scores + scores_best)
-- Doel: betrouwbare scoreboard logging + automatische best-score tabel
-- ==========================================

create extension if not exists pgcrypto;

-- Helper: teacher check (veilig, gebruikt aparte tabel public.teachers)
create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.teachers t where t.user_id = auth.uid()
  );
$$;

-- 1) SCORES (raw log)
create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  day date not null default ((now() at time zone 'utc')::date),

  mode text not null,
  topic text not null,

  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  class text not null,

  score integer not null,
  acc integer not null,
  duration_ms integer,

  revoked boolean not null default false
);

create index if not exists scores_user_idx on public.scores(user_id);
create index if not exists scores_mode_topic_idx on public.scores(mode, topic);
create index if not exists scores_day_idx on public.scores(day);

alter table public.scores enable row level security;

drop policy if exists scores_insert_own on public.scores;
create policy scores_insert_own
on public.scores for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists scores_select_own on public.scores;
create policy scores_select_own
on public.scores for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists scores_select_teacher on public.scores;
create policy scores_select_teacher
on public.scores for select
to authenticated
using (public.is_teacher());

-- 2) SCORES_BEST (leaderboard bron)
create table if not exists public.scores_best (
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null,
  topic text not null,
  name text not null,
  class text not null,
  score integer not null,
  acc integer not null,
  duration_ms integer,
  updated_at timestamptz not null default now(),
  revoked boolean not null default false,
  primary key (user_id, mode, topic)
);

create index if not exists scores_best_rank_idx
on public.scores_best(mode, topic, score desc, acc desc, duration_ms asc);

alter table public.scores_best enable row level security;

-- iedereen ingelogd mag het leaderboard lezen
drop policy if exists scores_best_read_all on public.scores_best;
create policy scores_best_read_all
on public.scores_best for select
to authenticated
using (true);

-- 3) Trigger: update scores_best na elke scores insert
create or replace function public.update_scores_best_from_scores()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.revoked then
    return new;
  end if;

  insert into public.scores_best(user_id, mode, topic, name, class, score, acc, duration_ms, updated_at, revoked)
  values (new.user_id, new.mode, new.topic, new.name, new.class, new.score, new.acc, new.duration_ms, now(), false)
  on conflict (user_id, mode, topic) do update
  set
    name = excluded.name,
    class = excluded.class,
    score = case
      when (excluded.score, excluded.acc, -coalesce(excluded.duration_ms, 2147483647))
         > (scores_best.score, scores_best.acc, -coalesce(scores_best.duration_ms, 2147483647))
      then excluded.score else scores_best.score end,
    acc = case
      when (excluded.score, excluded.acc, -coalesce(excluded.duration_ms, 2147483647))
         > (scores_best.score, scores_best.acc, -coalesce(scores_best.duration_ms, 2147483647))
      then excluded.acc else scores_best.acc end,
    duration_ms = case
      when (excluded.score, excluded.acc, -coalesce(excluded.duration_ms, 2147483647))
         > (scores_best.score, scores_best.acc, -coalesce(scores_best.duration_ms, 2147483647))
      then excluded.duration_ms else scores_best.duration_ms end,
    updated_at = now(),
    revoked = false;

  return new;
end;
$$;

drop trigger if exists trg_scores_best on public.scores;
create trigger trg_scores_best
after insert on public.scores
for each row execute function public.update_scores_best_from_scores();

-- ==========================================
-- Einde
-- ==========================================

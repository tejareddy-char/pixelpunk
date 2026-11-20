-- Pixelpunk database setup.
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to run again: it only creates what's missing.

-- Favourites: tools, kits, mini tools or articles a player saved.
create table if not exists public.favorites (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  kind text not null check (kind in ('tool','kit','utility','article')),
  item_id text not null,
  title text not null,
  href text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, kind, item_id)
);

-- Every finished game run.
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  game text not null check (game in ('hex','contrast','uxbug','laws')),
  score int not null check (score >= 0 and score <= 100000),
  handle text not null check (char_length(handle) between 1 and 40),
  created_at timestamptz not null default now()
);

-- One upvote per player per tool.
create table if not exists public.votes (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  tool_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, tool_id)
);

-- Tools suggested by the community. Only 'approved' ones are shown publicly.
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  handle text not null,
  name text not null check (char_length(name) between 2 and 60),
  url text not null check (url ~* '^https?://'),
  category text not null,
  description text not null check (char_length(description) between 10 and 200),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- Checklist ticks inside research kits.
create table if not exists public.kit_progress (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  kit text not null,
  checks jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  primary key (user_id, kit)
);

-- Row level security: players can only touch their own rows.
alter table public.favorites enable row level security;
alter table public.scores enable row level security;
alter table public.votes enable row level security;
alter table public.submissions enable row level security;
alter table public.kit_progress enable row level security;

drop policy if exists "own favorites" on public.favorites;
create policy "own favorites" on public.favorites for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "insert own scores" on public.scores;
create policy "insert own scores" on public.scores for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "read own scores" on public.scores;
create policy "read own scores" on public.scores for select to authenticated using (user_id = auth.uid());

drop policy if exists "own votes" on public.votes;
create policy "own votes" on public.votes for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "submit tools" on public.submissions;
create policy "submit tools" on public.submissions for insert to authenticated with check (user_id = auth.uid() and status = 'pending');
drop policy if exists "read approved or own" on public.submissions;
create policy "read approved or own" on public.submissions for select using (status = 'approved' or user_id = auth.uid());

drop policy if exists "own kit progress" on public.kit_progress;
create policy "own kit progress" on public.kit_progress for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Public, read-only summaries (no emails or ids exposed).
create or replace view public.leaderboard with (security_invoker = false) as
  select distinct on (game, user_id) game, handle, score
  from public.scores
  order by game, user_id, score desc;

create or replace view public.tool_votes with (security_invoker = false) as
  select tool_id, count(*)::int as votes from public.votes group by tool_id;

grant select on public.leaderboard, public.tool_votes to anon, authenticated;

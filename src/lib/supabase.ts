import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/** null until the Supabase env vars are set; every feature falls back to the browser. */
export const sb: SupabaseClient | null = url && key ? createClient(url, key) : null;
export const cloudEnabled = !!sb;

// ───────── Local storage helpers (always safe) ─────────
export function readLocal<T>(k: string, fallback: T): T {
  try { const v = localStorage.getItem(`pp:${k}`); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
export function writeLocal(k: string, v: unknown) {
  try { localStorage.setItem(`pp:${k}`, JSON.stringify(v)); } catch {}
}

// ───────── Auth ─────────
let currentUser: User | null = null;
const listeners = new Set<(u: User | null) => void>();
export const getUser = () => currentUser;
export function onUser(fn: (u: User | null) => void) { listeners.add(fn); fn(currentUser); return () => listeners.delete(fn); }

export async function initAuth() {
  if (!sb) return;
  const { data } = await sb.auth.getSession();
  setUser(data.session?.user ?? null);
  sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
}
function setUser(u: User | null) {
  const newUser = u?.id !== currentUser?.id;
  const changed = newUser || JSON.stringify(u?.user_metadata) !== JSON.stringify(currentUser?.user_metadata);
  currentUser = u;
  if (newUser && u) void syncLocalToCloud();
  if (changed) listeners.forEach((fn) => fn(u));
}
export async function signIn(email: string) {
  if (!sb) throw new Error('Accounts are not switched on yet.');
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/me/' } });
  if (error) throw error;
}
export async function signOut() { await sb?.auth.signOut(); }
export const displayName = (u: User | null) =>
  (u?.user_metadata?.handle as string | undefined) ?? u?.email?.split('@')[0] ?? 'player';

// ───────── Favourites ─────────
export type FavKind = 'tool' | 'kit' | 'utility' | 'article';
type Fav = { kind: FavKind; id: string; title: string; href: string };

export async function listFavs(): Promise<Fav[]> {
  if (sb && currentUser) {
    const { data } = await sb.from('favorites').select('kind,item_id,title,href').order('created_at', { ascending: false });
    return (data ?? []).map((r) => ({ kind: r.kind, id: r.item_id, title: r.title, href: r.href }));
  }
  return readLocal<Fav[]>('favs', []);
}
export async function toggleFav(f: Fav): Promise<boolean> {
  const local = readLocal<Fav[]>('favs', []);
  const has = local.some((x) => x.kind === f.kind && x.id === f.id);
  const next = has ? local.filter((x) => !(x.kind === f.kind && x.id === f.id)) : [f, ...local];
  writeLocal('favs', next);
  if (sb && currentUser) {
    if (has) await sb.from('favorites').delete().match({ kind: f.kind, item_id: f.id });
    else await sb.from('favorites').upsert({ user_id: currentUser.id, kind: f.kind, item_id: f.id, title: f.title, href: f.href });
  }
  return !has;
}
export const isFavLocal = (kind: FavKind, id: string) => readLocal<Fav[]>('favs', []).some((x) => x.kind === kind && x.id === id);

// ───────── Game scores ─────────
export type GameId = 'hex' | 'contrast' | 'uxbug' | 'laws';
export function bestLocal(game: GameId): number { return readLocal<Record<string, number>>('best', {})[game] ?? 0; }
export async function saveScore(game: GameId, score: number): Promise<{ best: number; isBest: boolean }> {
  const all = readLocal<Record<string, number>>('best', {});
  const isBest = score > (all[game] ?? 0);
  if (isBest) { all[game] = score; writeLocal('best', all); }
  if (sb && currentUser && score > 0) {
    await sb.from('scores').insert({ user_id: currentUser.id, game, score, handle: displayName(currentUser) });
  }
  return { best: all[game] ?? score, isBest };
}
export async function leaderboard(game: GameId, limit = 10): Promise<{ handle: string; score: number }[]> {
  if (!sb) return [];
  const { data } = await sb.from('leaderboard').select('handle,score').eq('game', game).order('score', { ascending: false }).limit(limit);
  return data ?? [];
}

// ───────── Upvotes ─────────
export async function voteCounts(): Promise<Record<string, number>> {
  if (!sb) return {};
  const { data } = await sb.from('tool_votes').select('tool_id,votes');
  return Object.fromEntries((data ?? []).map((r) => [r.tool_id, r.votes]));
}
export async function myVotes(): Promise<Set<string>> {
  if (!sb || !currentUser) return new Set();
  const { data } = await sb.from('votes').select('tool_id');
  return new Set((data ?? []).map((r) => r.tool_id));
}
export async function toggleVote(toolId: string, on: boolean) {
  if (!sb || !currentUser) throw new Error('signin');
  if (on) await sb.from('votes').upsert({ user_id: currentUser.id, tool_id: toolId });
  else await sb.from('votes').delete().match({ tool_id: toolId, user_id: currentUser.id });
}

// ───────── Community submissions ─────────
export type Submission = { id?: string; name: string; url: string; category: string; description: string; handle?: string; created_at?: string };
export async function submitTool(s: Submission) {
  if (!sb || !currentUser) throw new Error('signin');
  const { error } = await sb.from('submissions').insert({ ...s, user_id: currentUser.id, handle: displayName(currentUser) });
  if (error) throw error;
}
export async function approvedSubmissions(): Promise<Submission[]> {
  if (!sb) return [];
  const { data } = await sb.from('submissions').select('id,name,url,category,description,handle,created_at').eq('status', 'approved').order('created_at', { ascending: false }).limit(60);
  return data ?? [];
}

// ───────── Kit checklist progress ─────────
export async function loadChecks(kit: string): Promise<boolean[]> {
  if (sb && currentUser) {
    const { data } = await sb.from('kit_progress').select('checks').eq('kit', kit).maybeSingle();
    if (data?.checks) return data.checks as boolean[];
  }
  return readLocal<boolean[]>(`checks:${kit}`, []);
}
export async function saveChecks(kit: string, checks: boolean[]) {
  writeLocal(`checks:${kit}`, checks);
  if (sb && currentUser) await sb.from('kit_progress').upsert({ user_id: currentUser.id, kit, checks, updated_at: new Date().toISOString() });
}

// Push things saved while signed out up to the account on first sign-in.
async function syncLocalToCloud() {
  if (!sb || !currentUser) return;
  const favs = readLocal<Fav[]>('favs', []);
  if (favs.length) await sb.from('favorites').upsert(favs.map((f) => ({ user_id: currentUser!.id, kind: f.kind, item_id: f.id, title: f.title, href: f.href })));
  const best = readLocal<Record<string, number>>('best', {});
  const rows = Object.entries(best).filter(([, s]) => s > 0).map(([game, score]) => ({ user_id: currentUser!.id, game, score, handle: displayName(currentUser) }));
  if (rows.length) await sb.from('scores').insert(rows);
}

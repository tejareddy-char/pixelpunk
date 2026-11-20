import { saveScore, bestLocal, leaderboard, cloudEnabled, getUser, displayName, type GameId } from './supabase';
import { confetti, toast, esc, openSignIn, mascotMood } from './ui';

/** Wires up the GameShell screens. The game supplies start(), and calls api.finish(score). */
export function setupGame(game: GameId, start: (api: GameApi) => void, extraLabel = 'Round') {
  const $ = (id: string) => document.getElementById(id)!;
  const screens = { start: $('screen-start'), play: $('screen-play'), over: $('screen-over') };
  const show = (k: keyof typeof screens) => (Object.keys(screens) as (keyof typeof screens)[]).forEach((s) => (screens[s].hidden = s !== k));
  const scoreEl = $('hud-score'), extraEl = $('hud-extra'), bestEl = $('hud-best');
  $('hud-extra-label').textContent = extraLabel;
  bestEl.textContent = String(bestLocal(game));
  let score = 0;
  let lastScore = 0;

  const bump = (el: Element) => { el.classList.remove('bump'); void (el as HTMLElement).offsetWidth; el.classList.add('bump'); };
  const api: GameApi = {
    get score() { return score; },
    add(n) { if (n > 0) mascotMood('wow'); score = Math.max(0, score + n); scoreEl.textContent = String(score); bump(scoreEl); },
    extra(v) { extraEl.textContent = String(v); },
    async finish(message) {
      lastScore = score;
      show('over');
      $('over-score').textContent = String(score);
      $('over-msg').textContent = message ?? '';
      const { best, isBest } = await saveScore(game, score);
      bestEl.textContent = String(best);
      $('over-title').textContent = isBest && score > 0 ? '★ New high score!' : 'Game over';
      if (isBest && score > 0) { confetti(); mascotMood('wow', 3000); }
      void renderBoard();
    },
  };

  async function renderBoard() {
    const ol = $('leaderboard'), note = $('lb-note');
    if (!cloudEnabled) {
      ol.innerHTML = `<li>You: ${lastScore} (best ${bestLocal(game)})</li>`;
      note.textContent = 'Global leaderboards switch on soon. Your best score is saved in this browser.';
      return;
    }
    const rows = await leaderboard(game);
    const me = getUser() ? displayName(getUser()) : null;
    ol.innerHTML = rows.length
      ? rows.map((r) => `<li class="${r.handle === me ? 'me' : ''}">${esc(r.handle)}: ${r.score}</li>`).join('')
      : '<li class="muted">No scores yet. Be the first!</li>';
    note.innerHTML = getUser() ? '' : '<a href="#" id="lb-signin">Sign in</a> to put your name on the board.';
    document.getElementById('lb-signin')?.addEventListener('click', (e) => { e.preventDefault(); openSignIn('Sign in to save scores to the leaderboard.'); });
  }

  const go = () => { score = 0; scoreEl.textContent = '0'; extraEl.textContent = '–'; show('play'); start(api); };
  $('btn-start').addEventListener('click', go);
  $('btn-again').addEventListener('click', go);
  $('btn-share').addEventListener('click', async () => {
    const title = document.querySelector('.game-head h1')?.textContent ?? 'Pixelpunk';
    const text = `I scored ${lastScore} on ${title} at Pixelpunk 🕹️`;
    try {
      if (navigator.share) await navigator.share({ text, url: location.href });
      else { await navigator.clipboard.writeText(`${text} ${location.href}`); toast('Copied! Paste it anywhere.'); }
    } catch {}
  });
}

export interface GameApi {
  readonly score: number;
  add(n: number): void;
  extra(v: string | number): void;
  finish(message?: string): Promise<void>;
}

/** Simple countdown bar. Returns a stop function. */
export function countdown(bar: HTMLElement, ms: number, onEnd: () => void, onTick?: (left: number) => void) {
  const t0 = performance.now();
  let raf = 0, stopped = false;
  const fill = bar.firstElementChild as HTMLElement;
  const tick = () => {
    if (stopped) return;
    const left = Math.max(0, ms - (performance.now() - t0));
    fill.style.width = `${(left / ms) * 100}%`;
    bar.classList.toggle('low', left < ms * 0.25);
    onTick?.(left);
    if (left <= 0) { stopped = true; onEnd(); return; }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { stopped = true; cancelAnimationFrame(raf); return Math.max(0, ms - (performance.now() - t0)); };
}

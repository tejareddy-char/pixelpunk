export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function toast(msg: string, ms = 2400) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  host.append(el);
  setTimeout(() => el.remove(), ms);
}

const PALETTE = ['#ff3d8b', '#c6ff3d', '#3df2ff', '#ffd23d', '#9b5cff'];

/** Pixel confetti burst from a point (defaults to screen centre). */
export function confetti(x = innerWidth / 2, y = innerHeight / 3, count = 60) {
  if (reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-px';
    p.style.background = PALETTE[i % PALETTE.length];
    p.style.left = `${x}px`; p.style.top = `${y}px`;
    document.body.append(p);
    const angle = Math.random() * Math.PI * 2;
    const speed = 120 + Math.random() * 260;
    const dx = Math.cos(angle) * speed, dy = Math.sin(angle) * speed - 180;
    p.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 420}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.6,.4,1)' },
    ).onfinish = () => p.remove();
  }
}

/** Change every mascot's face for a moment: "wow" for wins, "sad" for misses. */
let moodTimer = 0;
export function mascotMood(mood: 'wow' | 'sad', ms = 1300) {
  document.querySelectorAll<SVGElement>('svg.mascot').forEach((m) => {
    m.dataset.mood = 'happy'; void m.getBoundingClientRect(); m.dataset.mood = mood;
  });
  clearTimeout(moodTimer);
  moodTimer = window.setTimeout(() => document.querySelectorAll<SVGElement>('svg.mascot').forEach((m) => (m.dataset.mood = 'happy')), ms);
}

export function shake(el: Element) {
  mascotMood('sad');
  el.classList.remove('shake');
  void (el as HTMLElement).offsetWidth;
  el.classList.add('shake');
}

export function openSignIn(reason?: string) {
  const dlg = document.getElementById('signin-modal') as HTMLDialogElement | null;
  const msg = document.getElementById('signin-msg');
  if (msg) msg.textContent = reason ?? '';
  dlg?.showModal();
}

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const shuffle = <T,>(a: T[]): T[] => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};

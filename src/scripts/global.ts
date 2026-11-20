import { initAuth, onUser, signIn, displayName, cloudEnabled, toggleFav, isFavLocal, listFavs, type FavKind } from '../lib/supabase';
import { toast, confetti, reducedMotion } from '../lib/ui';

// ───── Scroll reveal ─────
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ───── Mascot eyes follow the pointer ─────
const pupils = [...document.querySelectorAll<SVGGElement>('.mascot .pupils')];
if (pupils.length) {
  addEventListener('pointermove', (e) => {
    for (const p of pupils) {
      const r = (p.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.47);
      const d = Math.hypot(dx, dy) || 1;
      p.style.transform = `translate(${(dx / d) * 1}px, ${Math.max(-0.4, (dy / d) * 0.8)}px)`;
    }
  }, { passive: true });
}

// ───── Pixel cursor trail (mouse only) ─────
if (matchMedia('(pointer: fine)').matches && !reducedMotion()) {
  const colors = ['#ff3d8b', '#c6ff3d', '#3df2ff', '#ffd23d'];
  let last = 0, i = 0;
  addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - last < 28) return;
    last = now;
    const px = document.createElement('div');
    px.className = 'trail-px';
    px.style.left = `${e.clientX - 3}px`; px.style.top = `${e.clientY - 3}px`;
    px.style.background = colors[i++ % colors.length];
    document.body.append(px);
    setTimeout(() => px.remove(), 620);
  }, { passive: true });
}

// ───── Account button + sign-in modal ─────
const accountBtn = document.getElementById('account-btn') as HTMLAnchorElement | null;
onUser((u) => { if (accountBtn) accountBtn.textContent = u ? `▶ ${displayName(u)}` : '▶ Player 1'; });
void initAuth();

const form = document.getElementById('signin-form') as HTMLFormElement | null;
const dlg = document.getElementById('signin-modal') as HTMLDialogElement | null;
form?.addEventListener('submit', async (e) => {
  const submitter = (e as SubmitEvent).submitter as HTMLButtonElement | null;
  if (submitter?.value !== 'send') return;
  e.preventDefault();
  const email = (document.getElementById('signin-email') as HTMLInputElement).value.trim();
  const msg = document.getElementById('signin-msg')!;
  if (!cloudEnabled) { msg.textContent = 'Accounts are switching on soon. Your progress is saved in this browser for now.'; return; }
  msg.textContent = 'Sending…';
  try {
    await signIn(email);
    msg.textContent = '✓ Check your inbox for the magic link.';
    setTimeout(() => dlg?.close(), 2200);
  } catch (err) {
    msg.textContent = `Couldn't send it: ${(err as Error).message}`;
  }
});

// ───── Favourite hearts on any [data-fav-id] card ─────
const favCards = [...document.querySelectorAll<HTMLElement>('[data-fav-id]')];
for (const card of favCards) {
  const kind = card.dataset.favKind as FavKind, id = card.dataset.favId!;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'fav-btn';
  btn.setAttribute('aria-label', `Save ${card.dataset.favTitle}`);
  btn.setAttribute('aria-pressed', String(isFavLocal(kind, id)));
  btn.textContent = '♥';
  btn.addEventListener('click', async (e) => {
    e.preventDefault(); e.stopPropagation();
    const on = await toggleFav({ kind, id, title: card.dataset.favTitle!, href: card.dataset.favHref! });
    btn.setAttribute('aria-pressed', String(on));
    toast(on ? '♥ Saved to your stash' : 'Removed from your stash');
    if (on) { const r = btn.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, 14); }
  });
  card.append(btn);
}
// Once signed in, reflect cloud favourites.
onUser(async (u) => {
  if (!u || !favCards.length) return;
  const favs = await listFavs();
  for (const card of favCards) {
    const on = favs.some((f) => f.kind === card.dataset.favKind && f.id === card.dataset.favId);
    card.querySelector('.fav-btn')?.setAttribute('aria-pressed', String(on));
  }
});

// ───── Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A ─────
const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let pos = 0;
addEventListener('keydown', (e) => {
  pos = e.key === code[pos] ? pos + 1 : e.key === code[0] ? 1 : 0;
  if (pos === code.length) {
    pos = 0;
    document.documentElement.style.filter = 'hue-rotate(140deg)';
    confetti(); toast('🕹️ CHEAT MODE: hue unlocked!');
    setTimeout(() => (document.documentElement.style.filter = ''), 6000);
  }
});

export const games = [
  { id: 'hex', slug: 'hex-guesser', name: 'Hex Guesser', icon: '🎯', color: 'var(--pink)', blurb: 'A colour flashes up. Which hex code is it? Train your eye for colour like a pro.' },
  { id: 'contrast', slug: 'contrast-or-not', name: 'Contrast or Not?', icon: '◐', color: 'var(--lime)', blurb: 'Quick-fire: does this text pass WCAG AA? 30 seconds on the clock.' },
  { id: 'uxbug', slug: 'spot-the-bug', name: 'Spot the UX Bug', icon: '🐞', color: 'var(--cyan)', blurb: 'Every screen hides one usability mistake. Click it before time runs out.' },
  { id: 'laws', slug: 'ux-laws', name: 'UX Laws Quiz', icon: '⚖️', color: 'var(--yellow)', blurb: 'Match real situations to the psychology behind them: Hick, Fitts, Jakob and friends.' },
] as const;

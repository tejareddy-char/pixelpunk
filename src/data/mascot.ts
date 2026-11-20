// "Glitch", Pixelpunk's original pixel mascot (32×40). One character per pixel.
// P pink · H hair · h hair shine · S skin · s skin shade · E ink · I iris · W shine
// M mouth · B blush · J jacket · j seam · C cyan · c collar · L lime · G headphone
export const MASCOT_ROWS = [
  "...............P................",
  "...........P....P...............",
  "..........PP...P.....P..........",
  ".....P...PHP..PHHP..PHP...P.....",
  ".....PP.PHHP.PHHHHP.PHHP.PP.....",
  "......PPHHHPPHHHHHHPPHHHPP......",
  ".....PPHHHHHHHHHHHHHHHHHHPP.....",
  "....PHHHHHhhHHHHHHHHhhHHHHHP....",
  "...PHHHHhhHHHHHHHHHHHHhhHHHHP...",
  "..PPHHHHHHHHHHHHHHHHHHHHHHHHPP..",
  "....HHHHHHHHHHHHHHHHHHHHHHHH....",
  "...PHHHHHHHHHHHHHHHHHHHHHHLHP...",
  "...HHHHHSHHHHHSHHSHHHHHSHLLHH...",
  "..PHHHHSSSHHHSSSSSSHHHSSSLHHHP..",
  "...HHHSSSSSHSSSSSSSSHSSSSSHHH...",
  "...HHHSSSSSSSSSSSSSSSSSSSSHHH...",
  "...HHSEEEEEEESSSSSSEEEEEEESHH...",
  "...HHSEWWIIIESSSSSSEWWIIIESHH...",
  "...HsSEWIEEIESSSSSSEWEEIIESsH...",
  "...HsSEIIEEIESSSSSSEIEEIIESsH...",
  "...HHSEIIIIIESSSSSSEIIIIIESHH...",
  "....HSSEEEEESSSSSSSSEEEEESSH....",
  "....HSBBSSSSSSSSSSSSSSSSBBSH....",
  "....HSSSSSSSSSSssSSSSSSSSSSH....",
  ".....SSSSSSSSSSssSSSSSSSSSS.....",
  ".....SSSSSSSSSSSSSSSSSSSSSS.....",
  "......SSSSSSSSSSSSSSSSSSSS......",
  ".......SSSSSSSSSSSSSSSSSS.......",
  "........sSSSSSSSSSSSSSSs........",
  ".........ssSSSSSSSSSSss.........",
  "...........sSSSSSSSSs...........",
  "...........sSSSSSSSSs...........",
  "....LLLL..ccsSSSSSSscc..LLLL....",
  "...LGGGGL.ccsSSSSSSscc.LGGGGL...",
  "..JLGGGGLJccsSSSSSSsccJLGGGGLJ..",
  ".JJLLLLLLJJcccsssscccJJLLLLLLJJ.",
  "JJJJJJJJJJJJccccccccJJJJJJJJJJJJ",
  "JJJCCJJJJBPJJjJJJJjJJJJJJJJCCJJJ",
  "JJJCCJJJJPPJJjJJJJjJJJJJJJJCCJJJ",
  "JJJCCJJJJJJJJjJJJJjJJJJJJJJCCJJJ"
];

export const MASCOT_COLORS: Record<string, string> = {
  P: '#ff3d8b', H: '#2b1d47', h: '#5b3a96', S: '#ffd9b8', s: '#e9a983', E: '#0b0a12',
  I: '#3df2ff', W: '#ffffff', M: '#b02a5b', B: '#ff8fb5', J: '#1c1830', j: '#2e2a4a',
  C: '#3df2ff', c: '#e8e6f5', L: '#c6ff3d', G: '#7fae12', O: '#f5f2ff',
};

/** Pupils, drawn on their own layer so they can follow the cursor. */
export const PUPILS: [number, number][] = [[9, 18], [10, 18], [9, 19], [10, 19], [21, 18], [22, 18], [21, 19], [22, 19]];

/** Mouth shapes per mood: [x, y, colour key]. */
export const MOUTHS: Record<'happy' | 'wow' | 'sad', [number, number, string][]> = {
  happy: [[12, 25, 'M'], [19, 25, 'M'], ...[13, 14, 15, 16, 17, 18].map((x) => [x, 26, 'M'] as [number, number, string])],
  wow: [[14, 24, 'M'], [15, 24, 'M'], [16, 24, 'M'], [17, 24, 'M'], [13, 25, 'M'], [14, 25, 'M'], [15, 25, 'E'], [16, 25, 'E'], [17, 25, 'M'], [18, 25, 'M'], [13, 26, 'M'], [14, 26, 'M'], [15, 26, 'B'], [16, 26, 'B'], [17, 26, 'M'], [18, 26, 'M'], [14, 27, 'M'], [15, 27, 'M'], [16, 27, 'M'], [17, 27, 'M']],
  sad: [[13, 25, 'M'], [14, 25, 'M'], [15, 25, 'M'], [16, 25, 'M'], [17, 25, 'M'], [18, 25, 'M'], [12, 26, 'M'], [19, 26, 'M']],
};

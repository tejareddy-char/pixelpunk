"""Draws public/og.png, the 1200x630 link-preview image, with no dependencies.

Run from the project folder:  python3 scripts/make_og_image.py
Everything is drawn as pixels (pixel font + the blob mascot) to match the site.
"""
import math
import struct
import sys
import zlib

W, H = 1200, 630
img = bytearray(W * H * 3)


def hexrgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rect(x, y, w, h, color):
    r, g, b = hexrgb(color) if isinstance(color, str) else color
    for yy in range(max(0, y), min(H, y + h)):
        row = yy * W * 3
        for xx in range(max(0, x), min(W, x + w)):
            i = row + xx * 3
            img[i], img[i + 1], img[i + 2] = r, g, b


# ── Background: near-black with soft pink and purple glows, plus scanlines ──
bg = hexrgb('#0b0a12')
glows = [((1050, -60), 620, hexrgb('#9b5cff'), 0.20), ((-80, 230), 560, hexrgb('#ff3d8b'), 0.14)]
for y in range(H):
    for x in range(W):
        r, g, b = bg
        for (cx, cy), rad, (gr, gg, gb), a in glows:
            d = math.hypot(x - cx, y - cy) / rad
            if d < 1:
                t = a * (1 - d) ** 2
                r, g, b = r + (gr - r) * t, g + (gg - g) * t, b + (gb - b) * t
        if y % 3 == 0:
            r, g, b = r + 5, g + 5, b + 6
        i = (y * W + x) * 3
        img[i], img[i + 1], img[i + 2] = min(255, int(r)), min(255, int(g)), min(255, int(b))

# ── 5x7 pixel font ──
FONT = {
    'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
    'C': ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
    'D': ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
    'E': ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    'F': ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
    'G': ['01110', '10001', '10000', '10111', '10001', '10001', '01111'],
    'I': ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
    'K': ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
    'L': ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    'M': ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
    'N': ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
    'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
    'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    'S': ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
    'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
    'U': ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
    'V': ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
    'X': ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
    'Y': ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
    '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
    '*': ['00000', '00100', '10101', '01110', '10101', '00100', '00000'],
    ' ': ['00000'] * 7,
}


def text(s, x, y, scale, colors, shadow=None):
    """colors: one colour, or a list of (substring_length, colour) spans."""
    spans = [(len(s), colors)] if isinstance(colors, str) else colors
    col_for = []
    for n, c in spans:
        col_for += [c] * n
    cx = x
    for ch, c in zip(s, col_for):
        glyph = FONT[ch]
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == '1':
                    if shadow:
                        for dx, dy, sc in shadow:
                            rect(cx + gx * scale + dx, y + gy * scale + dy, scale, scale, sc)
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == '1':
                    rect(cx + gx * scale, y + gy * scale, scale, scale, c)
        cx += 6 * scale
    return cx


def text_width(s, scale):
    return len(s) * 6 * scale - scale


# ── Frame ──
rect(0, 0, W, 8, '#ff3d8b')
rect(0, H - 8, W, 8, '#c6ff3d')

# ── Copy (left column) ──
LX = 72
text('* INSERT COIN * FREE FOREVER', LX, 70, 3, '#c6ff3d')
text('PIXELPUNK', LX, 128, 13, [(5, '#f5f2ff'), (4, '#ff3d8b')],
     shadow=[(-6, 0, '#3df2ff'), (6, 0, '#ff3d8b')])
text('DESIGN IS A GAME.', LX, 262, 6, [(7, '#f5f2ff'), (5, '#ff3d8b'), (5, '#c6ff3d')])
text('TOOLS  GAMES  KITS  ARTICLES', LX, 352, 4, '#a8a3c4')

# Pixel button
bx, by, bw, bh = LX, 430, 372, 66
rect(bx + 7, by + 7, bw, bh, '#c6ff3d')
rect(bx, by, bw, bh, '#ff3d8b')
tri_x, tri_y = bx + 30, by + 20
for i in range(13):  # play triangle pointing right
    rect(tri_x + i, tri_y + i, 1, 26 - 2 * i, '#0b0a12')
text('PRESS START', bx + 66, by + 19, 4, '#0b0a12')

text('PIXELPUNKDESIGNS.NETLIFY.APP', LX, 552, 3, '#3df2ff')

# ── Mascot (right) ──
rows = ['......ll......', '.....lll......', '....llll.l....', '...kkkkkkkk...', '..kppppppppk..',
        '.kpwwppppwwpk.', '.kpwbppppwbpk.', '.kppppppppppk.', '.kpcpmmmmpcpk.', '.kpppmyympppk.',
        '..kpppppppk...', '...kkkkkkkk...', '...kk....kk...', '..kkk....kkk..']
pal = {'l': '#c6ff3d', 'k': '#f5f2ff', 'p': '#ff3d8b', 'w': '#ffffff', 'b': '#0b0a12',
       'c': '#ffd23d', 'm': '#0b0a12', 'y': '#3df2ff'}
S, MX, MY = 26, 818, 130
for y, r in enumerate(rows):  # cyan drop shadow
    for x, ch in enumerate(r):
        if ch != '.':
            rect(MX + x * S + 12, MY + y * S + 12, S, S, (30, 110, 125))
for y, r in enumerate(rows):
    for x, ch in enumerate(r):
        if ch != '.':
            rect(MX + x * S, MY + y * S, S, S, pal[ch])

# Floating pixel sparks
for (sx, sy, c) in [(760, 52, '#ffd23d'), (1150, 210, '#3df2ff'), (790, 470, '#c6ff3d'), (1130, 520, '#ff3d8b')]:
    rect(sx, sy, 12, 12, c)
    rect(sx - 12, sy + 12, 12, 12, c)
    rect(sx + 12, sy + 12, 12, 12, c)
    rect(sx, sy + 24, 12, 12, c)


# ── Write PNG ──
def chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)


raw = b''.join(b'\x00' + bytes(img[y * W * 3:(y + 1) * W * 3]) for y in range(H))
png = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0))
       + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))
out = sys.argv[1] if len(sys.argv) > 1 else 'public/og.png'
open(out, 'wb').write(png)
print(out, len(png), 'bytes')

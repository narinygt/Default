"""Geometry QA for the CPeak decks.

Measures every text run with the real brand fonts, works out the wrapped
extent, and reports:
  OVERFLOW  text taller/wider than the box it was given
  TEXT-TEXT two pieces of text whose rendered ink overlaps
  TEXT-LINE a rule or line crossing rendered text
  TEXT-IMG  text overlapping an image
  MARGIN    anything closer than 0.5" to a slide edge
"""
import json, sys
from PIL import ImageFont

FONTS = {
    ('Schibsted Grotesk', False): '/root/.fonts/SchibstedGrotesk-Regular.ttf',
    ('Schibsted Grotesk', True):  '/root/.fonts/SchibstedGrotesk-Bold.ttf',
    ('Inter', False): '/root/.fonts/Inter-Regular.ttf',
    ('Inter', True):  '/root/.fonts/Inter-Bold.ttf',
    ('IBM Plex Mono', False): '/root/.fonts/IBMPlexMono-Regular.ttf',
    ('IBM Plex Mono', True):  '/root/.fonts/IBMPlexMono-Medium.ttf',
}
PX = 600.0            # render dpi for metrics
W_IN, H_IN = 13.333, 7.5
MARGIN = 0.5
_cache = {}

def font(face, bold, size_pt):
    key = (face, bool(bold), round(size_pt, 2))
    if key not in _cache:
        path = FONTS.get((face, bool(bold))) or FONTS[('Inter', bool(bold))]
        _cache[key] = ImageFont.truetype(path, int(round(size_pt / 72.0 * PX)))
    return _cache[key]

def text_w(s, f, charSpacing=0):
    if not s:
        return 0.0
    w = f.getlength(s) / PX
    if charSpacing:
        w += charSpacing / 72.0 * len(s)     # pptx charSpacing is in points
    return w

def wrap(text, f, maxw, cs):
    """Greedy wrap, honouring explicit newlines. Returns list of line widths."""
    out = []
    for para in text.split('\n'):
        words, line = para.split(' '), ''
        if not para.strip():
            out.append(0.0); continue
        for w in words:
            trial = w if not line else line + ' ' + w
            if text_w(trial, f, cs) <= maxw or not line:
                line = trial
            else:
                out.append(text_w(line, f, cs)); line = w
        out.append(text_w(line, f, cs))
    return out

def extent(item):
    """Rendered ink box of a text item: (x0,y0,x1,y1) in inches."""
    o = item['o']
    face = o.get('fontFace', 'Inter')
    size = o.get('fontSize', 12)
    f = font(face, o.get('bold'), size)
    cs = o.get('charSpacing', 0)
    bx, by, bw, bh = o['x'], o['y'], o['w'], o['h']
    lines = wrap(item['text'], f, bw, cs)
    lead = o.get('lineSpacing', size * 1.2) / 72.0
    th = lead * len(lines)
    tw = max(lines) if lines else 0.0
    va = o.get('valign', 'top')
    if va == 'middle':
        y0 = by + (bh - th) / 2
    elif va == 'bottom':
        y0 = by + bh - th
    else:
        y0 = by
    al = o.get('align', 'left')
    if al == 'center':
        x0 = bx + (bw - tw) / 2
    elif al == 'right':
        x0 = bx + bw - tw
    else:
        x0 = bx
    # trim the leading/half-leading padding so the box is close to real ink
    pad = max(0.0, (lead - size / 72.0 * 1.02) / 2)
    return (x0, y0 + pad, x0 + tw, y0 + th - pad), tw, th, len(lines)

def rect(o):
    return (o['x'], o['y'], o['x'] + o.get('w', 0), o['y'] + o.get('h', 0))

def inter(a, b, tol=0.012):
    return (a[0] < b[2] - tol and b[0] < a[2] - tol and
            a[1] < b[3] - tol and b[1] < a[3] - tol)

def contains(outer, inner, tol=0.02):
    return (outer[0] <= inner[0] + tol and outer[1] <= inner[1] + tol and
            outer[2] >= inner[2] - tol and outer[3] >= inner[3] - tol)

def run(path, label):
    scene = json.load(open(path))
    problems = []
    for sl in scene:
        texts, lines, images, fills = [], [], [], []
        for it in sl['items']:
            o = it['o']
            if it['kind'] == 'text' and it.get('text', '').strip():
                ext, tw, th, nl = extent(it)
                texts.append((it, ext, tw, th, nl))
            elif it['kind'] == 'line':
                x, y, w, h = o['x'], o['y'], o.get('w', 0), o.get('h', 0)
                lines.append((x - 0.004, y - 0.004, x + w + 0.004, y + h + 0.004))
            elif it['kind'] == 'image':
                r = rect(o)
                if r[2] - r[0] > W_IN - 0.2:      # full-bleed texture: ignore
                    continue
                images.append(r)
            elif it['kind'] in ('rect', 'roundRect', 'ellipse'):
                fills.append(rect(o))

        for it, ext, tw, th, nl in texts:
            o = it['o']
            snip = it['text'].replace('\n', ' / ')[:52]
            if tw > o['w'] + 0.02:
                problems.append(f"s{sl['slide']:02d} OVERFLOW-W  +{tw-o['w']:.2f}\"  “{snip}”")
            if th > o['h'] + 0.03:
                problems.append(f"s{sl['slide']:02d} OVERFLOW-H  +{th-o['h']:.2f}\" ({nl} lines)  “{snip}”")
            if ext[0] < MARGIN - 0.02 or ext[2] > W_IN - MARGIN + 0.02 or \
               ext[1] < 0.30 or ext[3] > H_IN - 0.14:
                problems.append(f"s{sl['slide']:02d} MARGIN      “{snip}”  ext={tuple(round(v,2) for v in ext)}")

        for i in range(len(texts)):
            for j in range(i + 1, len(texts)):
                if inter(texts[i][1], texts[j][1]):
                    problems.append(f"s{sl['slide']:02d} TEXT-TEXT   “{texts[i][0]['text'][:34]}” ✕ “{texts[j][0]['text'][:34]}”")

        for it, ext, tw, th, nl in texts:
            # a text on its own solid chip masks whatever passes behind it
            on_chip = any(contains(fl, ext) for fl in fills)
            for ln in lines:
                if not on_chip and inter(ext, ln, tol=0.004):
                    problems.append(f"s{sl['slide']:02d} TEXT-LINE   “{it['text'][:40]}” ✕ line@{ln[0]:.2f},{ln[1]:.2f}")
            for im in images:
                if inter(ext, im):
                    problems.append(f"s{sl['slide']:02d} TEXT-IMG    “{it['text'][:40]}”")
            for fl in fills:
                if inter(ext, fl) and not contains(fl, ext):
                    problems.append(f"s{sl['slide']:02d} TEXT-SHAPE  “{it['text'][:40]}” ✕ shape@{fl[0]:.2f},{fl[1]:.2f}")

    print(f"===== {label} =====")
    if not problems:
        print("  clean — no overflow, no overlaps, all margins respected")
    else:
        for p in problems:
            print(" ", p)
    print(f"  {len(problems)} issue(s)\n")
    return len(problems)

if __name__ == '__main__':
    bad = run(sys.argv[1] if len(sys.argv) > 1 else 'scene-en.json', 'EN')
    bad += run('scene-tr.json', 'TR')
    sys.exit(0)

# INK BOY — comic-print three.js loop

A simple, looping three.js animation in the *Spider-Verse* / graphic-novel
print aesthetic: **a boy in his room at night, drawing in a sketchbook.**

Everything is stylised on purpose — the frame is treated as a printed comic
page, not a clean render.

## Run it

The folder is fully self-contained (three.js r160 is vendored, no build step):

```bash
python3 -m http.server 8123 --directory comic-room
# open http://localhost:8123
```

Any static server works (`npx serve comic-room`, etc.). Click / tap the page
for a camera punch-in + comic sfx burst.

## What's in the frame

- **The boy**: procedural two-bone IK arms (shoulder → elbow → hand), pencil
  tip tracked in world space so the ink always lands exactly where the pencil
  is. Breathing, head glances-up, foot tapping — all stepped at **12 fps** for
  a hand-animated "pose → pose → pose" feel while the camera stays smooth.
- **The drawing**: four looping doodles (cursive loops, a spider, a face, a
  star) are scribbled live onto a canvas texture on the sketchbook page, then
  the page wipes and the next one starts. Finishing a doodle fires a comic
  burst (`SKRITCH!`, `SCRIBBLE!`, …).
- **The room**: desk lamp (warm key), neon window sunset (cyan fill), magenta
  LED strip, posters, shelf, crumpled pages, dust motes — complementary
  purple/yellow, red/cyan colour script.

## The print pipeline (one post pass, `main.js`)

| Layer | Technique |
|---|---|
| Cel shading | custom toon shader: 3 hard bands, purple-tinted shadow, hard lamp specular |
| Ink outlines | inverted-hull backside shells on characters/props **+** depth-sobel and colour-band sobel in post |
| Misregistration | outline ghosts re-sampled at ±offset in cyan and magenta (CMYK slip) |
| Chromatic aberration | radial per-channel UV offset, boosted during punches |
| Halftone | screen-space Ben-Day dot grids: violet dots in shadows, paper dots in highlights, rotated + boiled at 12 fps |
| Cross-hatch | diagonal hatch mask in the deepest darks |
| Motion | radial speed-line hash strokes + fov punch + dutch-angle kick on bursts |
| Print texture | animated film grain, paper fibre noise, vignette, comic panel border |
| Grade | saturation/contrast push, violet shadows, warm highlights, linear→sRGB |
| Graphic layer | DOM caption box + dimensional title, in-scene sfx burst sprite (depth-test off, like a pasted-on comic element) |

## Files

- `index.html` — page + comic typography overlay (caption box, title, hint)
- `main.js` — scene, rig, doodle state machine, post-process shader
- `vendor/three.module.js` — three.js r160 (MIT, see `vendor/THREE-LICENSE`)

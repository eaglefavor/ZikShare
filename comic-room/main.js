/**
 * INK BOY — a Spider-Verse-flavoured three.js loop.
 *
 * A boy sits in his room at night, scribbling in a sketchbook under a warm
 * desk lamp, while the whole frame is run through a fake comic-print
 * pipeline: toon bands + hard shadows, ink outlines (inverted hull + depth/
 * luminance sobel), ben-day halftone in the shadows, cross-hatch in the deep
 * darks, CMYK misregistration ghosts, chromatic aberration, radial speed
 * lines, paper grain, vignette and a punchy complementary colour grade.
 *
 * Character motion is stepped at 12 fps (with a 12 fps "line boil") so the
 * boy feels hand-animated while the camera stays cinematic and smooth.
 * Click / tap = camera punch-in + comic sfx burst.
 */
import * as THREE from './vendor/three.module.js';

/* ------------------------------------------------------------------ *
 *  tiny helpers
 * ------------------------------------------------------------------ */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const stepTime = (t, fps) => Math.floor(t * fps) / fps;
const easeOutBack = (k) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
};
const rnd = (i) => { // deterministic 0..1 from an integer
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------------------------------------------ *
 *  renderer / scenes / camera
 * ------------------------------------------------------------------ */
const PR = Math.min(window.devicePixelRatio || 1, 1.75);
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(PR);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b0f33);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 60);
scene.add(camera);

/* offscreen target with a depth texture so the post pass can ink the edges */
let rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  type: THREE.HalfFloatType,
  depthBuffer: true,
});
rt.depthTexture = new THREE.DepthTexture(window.innerWidth, window.innerHeight);

/* ------------------------------------------------------------------ *
 *  shared "lighting" uniforms (no three lights at all — stylised only)
 * ------------------------------------------------------------------ */
const LIGHTS = {
  uLampPos:   { value: new THREE.Vector3(-0.45, 1.06, -0.02) },
  uLampColor: { value: new THREE.Color(0xffb454) },
  uFillDir:   { value: new THREE.Vector3(-0.62, 0.22, 0.75).normalize() }, // window, cyan
  uFillColor: { value: new THREE.Color(0x25c8e0) },
  uRimColor:  { value: new THREE.Color(0xff2d95) },  // magenta behind-left
  uRim2Color: { value: new THREE.Color(0x35e0ff) },  // cyan behind-right
  uRimStr:    { value: 0.62 },
};

/* ------------------------------------------------------------------ *
 *  toon material — 3 hard bands, cool shadow tint, dual neon rim
 * ------------------------------------------------------------------ */
const TOON_VERT = /* glsl */`
  varying vec3 vN;
  varying vec3 vW;
  varying vec2 vUv;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vW = wp.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const TOON_FRAG = /* glsl */`
  uniform vec3 uColor;
  uniform vec3 uShadowTint;
  uniform float uHasMap;
  uniform sampler2D uMap;
  uniform vec3 uLampPos;
  uniform vec3 uLampColor;
  uniform vec3 uFillDir;
  uniform vec3 uFillColor;
  uniform vec3 uRimColor;
  uniform vec3 uRim2Color;
  uniform float uRimStr;
  varying vec3 vN;
  varying vec3 vW;
  varying vec2 vUv;

  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(cameraPosition - vW);
    vec3 ldir = normalize(uLampPos - vW);
    float dist = length(uLampPos - vW);
    float atten = 1.0 / (1.0 + 0.55 * dist * dist);

    vec3 base = uColor;
    if (uHasMap > 0.5) base *= texture2D(uMap, vUv).rgb * 1.6;

    float ndl = dot(n, ldir);
    float band1 = smoothstep(-0.06, 0.07, ndl);          // shadow -> mid
    float band2 = smoothstep(0.38, 0.52, ndl) * atten;   // mid -> lit

    vec3 shadowCol = base * uShadowTint * 0.62 + base * 0.10;
    vec3 col = mix(shadowCol, base, band1);
    col = mix(col, base * 1.22 + uLampColor * 0.20, band2);

    // cool window fill on the opposite side
    float fill = smoothstep(0.15, 0.75, dot(n, uFillDir));
    col += fill * uFillColor * 0.10 * (1.0 - band2);

    // hard neon rim, colour chosen by which side the normal faces
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.3);
    float side = 0.5 + 0.5 * dot(n, normalize(vec3(1.0, 0.1, 0.25)));
    col += fres * mix(uRimColor, uRim2Color, side) * uRimStr;

    // tiny hard specular pop from the lamp
    float spec = step(0.965, dot(normalize(ldir + v), n)) * atten;
    col += spec * uLampColor * 0.55;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function toonMat(color, opts = {}) {
  return new THREE.ShaderMaterial({
    vertexShader: TOON_VERT,
    fragmentShader: TOON_FRAG,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uShadowTint: { value: new THREE.Color(opts.shadowTint || 0x574a9e) },
      uHasMap: { value: opts.map ? 1 : 0 },
      uMap: { value: opts.map || null },
      uLampPos: LIGHTS.uLampPos,
      uLampColor: LIGHTS.uLampColor,
      uFillDir: LIGHTS.uFillDir,
      uFillColor: LIGHTS.uFillColor,
      uRimColor: LIGHTS.uRimColor,
      uRim2Color: LIGHTS.uRim2Color,
      uRimStr: { value: opts.rim ?? 0.62 },
    },
  });
}

/* ------------------------------------------------------------------ *
 *  inverted-hull ink outline (view-space offset => constant thickness)
 * ------------------------------------------------------------------ */
const hullMats = new Map();
function hullMat(thickness) {
  if (!hullMats.has(thickness)) {
    hullMats.set(thickness, new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: /* glsl */`
        uniform float uT;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 nv = normalize(normalMatrix * normal);
          mv.xyz += nv * uT;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        void main() { gl_FragColor = vec4(0.045, 0.035, 0.085, 1.0); }
      `,
      uniforms: { uT: { value: thickness } },
    }));
  }
  return hullMats.get(thickness);
}
function inked(mesh, thickness = 0.012) {
  const hull = new THREE.Mesh(mesh.geometry, hullMat(thickness));
  hull.renderOrder = -1;
  mesh.add(hull);
  return mesh;
}

/* ------------------------------------------------------------------ *
 *  canvas texture painters (posters, window view, rug, sketchbook)
 * ------------------------------------------------------------------ */
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}
function canvasTexture(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* sketchbook page — ink strokes get drawn onto this live */
const [_paperCanvas, pctx] = makeCanvas(512, 368);
const PAPER = '#f0e8d4';
function paperReset() {
  pctx.fillStyle = PAPER;
  pctx.fillRect(0, 0, 512, 368);
  pctx.strokeStyle = 'rgba(90,110,160,.35)';
  pctx.lineWidth = 2;
  pctx.beginPath(); pctx.moveTo(46, 0); pctx.lineTo(46, 368); pctx.stroke();
  pctx.fillStyle = 'rgba(20,20,26,.5)';
  pctx.font = 'bold 20px Impact, "Arial Black", sans-serif';
  pctx.save(); pctx.translate(478, 350); pctx.rotate(-Math.PI / 2); pctx.fillText('SKETCHBOOK 07', 0, 0); pctx.restore();
}
paperReset();
const paperTex = canvasTexture(_paperCanvas);

/* window view — sunset, halftone sun, ink skyline */
const [_winCanvas, wctx] = makeCanvas(512, 360);
(function paintWindow() {
  const g = wctx.createLinearGradient(0, 0, 0, 360);
  g.addColorStop(0, '#2b1055'); g.addColorStop(0.42, '#b0267d');
  g.addColorStop(0.72, '#ff7a29'); g.addColorStop(1, '#ffd23f');
  wctx.fillStyle = g; wctx.fillRect(0, 0, 512, 360);
  // ben-day sun
  wctx.save(); wctx.beginPath(); wctx.arc(330, 205, 74, 0, 7); wctx.clip();
  wctx.fillStyle = '#fff3b0'; wctx.fillRect(0, 0, 512, 360);
  wctx.fillStyle = '#ff7a29';
  for (let y = 0; y < 360; y += 7) for (let x = 0; x < 512; x += 7) {
    const d = Math.hypot(x - 330, y - 205) / 74;
    if (rnd(x * 3 + y) < d * 0.9) { wctx.beginPath(); wctx.arc(x, y, 2.4, 0, 7); wctx.fill(); }
  }
  wctx.restore();
  // skyline
  wctx.fillStyle = '#160b2e';
  let x = -10;
  while (x < 520) {
    const w = 26 + rnd(x) * 46, h = 60 + rnd(x + 7) * 130;
    wctx.fillRect(x, 360 - h, w, h);
    wctx.fillStyle = '#ffd23f';
    for (let wy = 360 - h + 8; wy < 352; wy += 14) for (let wx = x + 5; wx < x + w - 6; wx += 11)
      if (rnd(wx * 13 + wy) > 0.62) wctx.fillRect(wx, wy, 4, 6);
    wctx.fillStyle = '#160b2e';
    x += w + 6;
  }
})();
const winTex = canvasTexture(_winCanvas);

/* poster 1 — burst + word */
const [_postCanvas, pct] = makeCanvas(300, 400);
(function paintPoster() {
  pct.fillStyle = '#22c7d6'; pct.fillRect(0, 0, 300, 400);
  pct.fillStyle = 'rgba(20,10,40,.25)';
  for (let y = 0; y < 400; y += 6) for (let x = 0; x < 300; x += 6) { pct.beginPath(); pct.arc(x, y, 1.4, 0, 7); pct.fill(); }
  pct.save(); pct.translate(150, 170);
  pct.beginPath();
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2, r = i % 2 ? 82 : 128;
    pct.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  pct.closePath();
  pct.fillStyle = '#ffd23f'; pct.fill();
  pct.lineWidth = 9; pct.strokeStyle = '#14141a'; pct.stroke();
  pct.fillStyle = '#14141a';
  pct.font = 'bold 74px Impact, "Arial Black", sans-serif';
  pct.textAlign = 'center'; pct.textBaseline = 'middle';
  pct.fillText('INK!', 0, 4);
  pct.restore();
  pct.fillStyle = '#14141a';
  pct.font = 'bold 30px Impact, "Arial Black", sans-serif';
  pct.textAlign = 'center';
  pct.fillText('EVERY NIGHT', 150, 340);
  pct.fillText('EVERY PAGE', 150, 374);
})();
const postTex = canvasTexture(_postCanvas);

/* poster 2 — spider scribble */
const [_spCanvas, sctx] = makeCanvas(260, 320);
(function paintSpider() {
  sctx.fillStyle = '#e6399a'; sctx.fillRect(0, 0, 260, 320);
  sctx.strokeStyle = '#14141a'; sctx.lineCap = 'round';
  sctx.lineWidth = 10;
  sctx.beginPath(); sctx.ellipse(130, 170, 42, 56, 0, 0, 7); sctx.stroke();
  sctx.beginPath(); sctx.arc(130, 96, 26, 0, 7); sctx.stroke();
  for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 4; i++) {
    sctx.lineWidth = 7;
    sctx.beginPath();
    sctx.moveTo(130 + s * 34, 140 + i * 26);
    sctx.quadraticCurveTo(130 + s * 92, 120 + i * 30, 130 + s * 108, 168 + i * 34);
    sctx.stroke();
  }
  sctx.fillStyle = '#ffd23f';
  sctx.beginPath(); sctx.ellipse(130, 176, 16, 30, 0, 0, 7); sctx.fill();
})();
const spTex = canvasTexture(_spCanvas);

/* rug */
const [_rugCanvas, rctx] = makeCanvas(256, 256);
(function paintRug() {
  rctx.fillStyle = '#3b1f66'; rctx.fillRect(0, 0, 256, 256);
  const rings = ['#e6399a', '#22c7d6', '#ffd23f'];
  rings.forEach((c, i) => {
    rctx.strokeStyle = c; rctx.lineWidth = 14;
    rctx.beginPath(); rctx.arc(128, 128, 108 - i * 26, 0, 7); rctx.stroke();
  });
  rctx.fillStyle = 'rgba(240,232,212,.5)';
  for (let y = 0; y < 256; y += 8) for (let x = 0; x < 256; x += 8)
    if (rnd(x + y * 7) > 0.7) { rctx.beginPath(); rctx.arc(x, y, 1.6, 0, 7); rctx.fill(); }
})();
const rugTex = canvasTexture(_rugCanvas);

/* ------------------------------------------------------------------ *
 *  the room
 * ------------------------------------------------------------------ */
const room = new THREE.Group();
scene.add(room);

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
function put(geo, mat, x, y, z, parent = room) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

const wallMat = toonMat(0x43307a, { rim: 0.25 });
const wallMat2 = toonMat(0x38266b, { rim: 0.25 });
const floorMat = toonMat(0x2c1c4e, { rim: 0.18 });

put(new THREE.PlaneGeometry(7, 3.4), wallMat, 0, 1.6, -1.62);                       // back wall
const sideWall = put(new THREE.PlaneGeometry(5, 3.4), wallMat2, -2.35, 1.6, 0);    // side wall
sideWall.rotation.y = Math.PI / 2;
const floor = put(new THREE.PlaneGeometry(7, 5), floorMat, 0, 0, 0);
floor.rotation.x = -Math.PI / 2;
const rug = put(new THREE.CircleGeometry(1.0, 40), new THREE.MeshBasicMaterial({ map: rugTex }), 0.35, 0.012, 0.55);
rug.rotation.x = -Math.PI / 2;

/* window + frame */
const winView = put(new THREE.PlaneGeometry(1.34, 0.94), new THREE.MeshBasicMaterial({ map: winTex }), -0.82, 1.52, -1.60);
winView.rotation.z = 0.012;
const frameMat = toonMat(0x191024, { rim: 0.4 });
put(box(1.46, 0.07, 0.06), frameMat, -0.82, 2.02, -1.59);
put(box(1.46, 0.07, 0.06), frameMat, -0.82, 1.03, -1.59);
put(box(0.07, 1.06, 0.06), frameMat, -1.52, 1.52, -1.59);
put(box(0.07, 1.06, 0.06), frameMat, -0.12, 1.52, -1.59);
put(box(0.04, 0.94, 0.05), frameMat, -0.82, 1.52, -1.585);

/* posters */
const poster1 = put(new THREE.PlaneGeometry(0.62, 0.82), new THREE.MeshBasicMaterial({ map: postTex }), 0.72, 1.62, -1.60);
poster1.rotation.z = -0.035;
const poster2 = put(new THREE.PlaneGeometry(0.5, 0.62), new THREE.MeshBasicMaterial({ map: spTex }), 1.42, 1.42, -1.60);
poster2.rotation.z = 0.05;

/* shelf + books + LED strip */
put(box(1.25, 0.05, 0.24), toonMat(0x8a4a22), 1.15, 2.06, -1.48);
const bookCols = [0xd8262c, 0x22c7d6, 0xffd23f, 0xe6399a, 0x3f7f3f, 0xf0e8d4, 0x7a4adf];
bookCols.forEach((c, i) => {
  const b = put(box(0.075, 0.26 + rnd(i) * 0.07, 0.18), toonMat(c), 0.66 + i * 0.105, 2.22 + rnd(i + 3) * 0.02, -1.46);
  b.rotation.z = (rnd(i + 9) - 0.5) * 0.09;
});
put(box(1.2, 0.022, 0.022), new THREE.MeshBasicMaterial({ color: 0xff43b0 }), 1.15, 2.02, -1.38); // magenta LED
put(box(0.022, 0.022, 1.6), new THREE.MeshBasicMaterial({ color: 0x2be0ff }), -2.32, 2.42, -0.2);  // cyan strip

/* desk */
const deskMat = toonMat(0xb4622d);
put(box(1.55, 0.06, 0.88), deskMat, 0, 0.75, 0);
[[-0.72, -0.38], [0.72, -0.38], [-0.72, 0.38], [0.72, 0.38]].forEach(([x, z]) =>
  put(new THREE.CylinderGeometry(0.032, 0.028, 0.74, 8), toonMat(0x241634), x, 0.37, z));

/* sketchbook page on the desk */
const paper = put(new THREE.PlaneGeometry(0.44, 0.315), toonMat(0xffffff, { map: paperTex, rim: 0.25 }), 0.06, 0.7835, -0.03);
paper.rotation.x = -Math.PI / 2;
paper.rotation.z = 0.10;

/* desk lamp */
const lampMetal = toonMat(0x2b2b3d, { rim: 0.8 });
put(new THREE.CylinderGeometry(0.075, 0.09, 0.035, 14), lampMetal, -0.56, 0.795, -0.20);
const arm1 = put(new THREE.CylinderGeometry(0.016, 0.016, 0.42, 8), lampMetal, -0.58, 0.99, -0.21);
arm1.rotation.z = 0.16;
const arm2 = put(new THREE.CylinderGeometry(0.015, 0.015, 0.34, 8), lampMetal, -0.53, 1.16, -0.14);
arm2.rotation.x = -1.05; arm2.rotation.z = -0.25;
const shade = put(new THREE.ConeGeometry(0.105, 0.16, 16, 1, true), toonMat(0xd8262c, { rim: 0.9 }), -0.48, 1.13, -0.06);
shade.rotation.x = -2.25;
put(new THREE.SphereGeometry(0.045, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }), -0.45, 1.06, -0.02);

/* mug, pencil cup, crumpled pages */
put(new THREE.CylinderGeometry(0.045, 0.04, 0.10, 14), toonMat(0x22c7d6), 0.55, 0.83, 0.16);
const handle = put(new THREE.TorusGeometry(0.03, 0.009, 8, 14), toonMat(0x22c7d6), 0.60, 0.83, 0.16);
handle.rotation.y = Math.PI / 2;
put(new THREE.CylinderGeometry(0.05, 0.045, 0.12, 12), toonMat(0x191024), 0.66, 0.84, -0.26);
[[0xd8262c, 0.3], [0xffd23f, -0.25], [0x22c7d6, 0.1]].forEach(([c, tilt], i) => {
  const p = put(new THREE.CylinderGeometry(0.008, 0.008, 0.17, 6), toonMat(c), 0.66 + (i - 1) * 0.018, 0.92, -0.26);
  p.rotation.z = tilt * 0.6; p.rotation.x = tilt * 0.4;
});
const crumpleMat = toonMat(0xe8e0cc, { rim: 0.3 });
[[0.52, 0.05, 0.62], [0.78, 0.045, 0.28], [-0.45, 0.05, 0.72], [0.34, 0.815, 0.24]].forEach(([x, y, z], i) => {
  const b = put(new THREE.IcosahedronGeometry(0.05, 0), crumpleMat, x, y, z);
  b.rotation.set(rnd(i) * 3, rnd(i + 2) * 3, rnd(i + 4) * 3);
  b.scale.setScalar(0.8 + rnd(i + 6) * 0.5);
});

/* chair */
const chairMat = toonMat(0x1f8a8c);
put(box(0.44, 0.06, 0.42), chairMat, 0, 0.45, -0.56);
const back = put(box(0.44, 0.44, 0.05), chairMat, 0, 0.72, -0.76);
back.rotation.x = -0.10;
[[-0.19, -0.39], [0.19, -0.39], [-0.19, -0.73], [0.19, -0.73]].forEach(([x, z]) =>
  put(new THREE.CylinderGeometry(0.024, 0.02, 0.45, 8), toonMat(0x241634), x, 0.225, z));

/* dust motes in the lamp light */
const dustGeo = new THREE.BufferGeometry();
const DUST = 130;
const dustPos = new Float32Array(DUST * 3);
for (let i = 0; i < DUST; i++) {
  dustPos[i * 3] = -0.9 + rnd(i) * 2.0;
  dustPos[i * 3 + 1] = 0.4 + rnd(i + 40) * 1.5;
  dustPos[i * 3 + 2] = -0.9 + rnd(i + 80) * 1.8;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
  color: 0xffd9a0, size: 0.014, transparent: true, opacity: 0.55, depthWrite: false,
}));
scene.add(dust);

/* ------------------------------------------------------------------ *
 *  the boy — procedural stick-skeleton, segments placed each frame
 * ------------------------------------------------------------------ */
const boy = new THREE.Group();
boy.position.set(0, 0, -0.56);
scene.add(boy);

const SKIN = 0x8a5a3b, HOOD = 0xd8262c, DENIM = 0x274060, HAIR = 0x17121b;

const hips = new THREE.Group();
hips.position.y = 0.50;
boy.add(hips);

const torsoG = new THREE.Group();          // leans forward, breathes
torsoG.rotation.x = 0.16;
hips.add(torsoG);
inked(put(new THREE.CylinderGeometry(0.155, 0.185, 0.36, 14), toonMat(HOOD), 0, 0.18, 0, torsoG), 0.011);
const hoodRoll = inked(put(new THREE.TorusGeometry(0.115, 0.045, 10, 18), toonMat(0xb01f24), 0, 0.345, -0.03, torsoG), 0.008);
hoodRoll.rotation.x = 1.35;

const headG = new THREE.Group();
headG.position.set(0, 0.42, 0.01);
torsoG.add(headG);
const head = inked(put(new THREE.SphereGeometry(0.115, 20, 16), toonMat(SKIN, { rim: 0.75 }), 0, 0.06, 0, headG), 0.009);
head.scale.set(0.94, 1.08, 0.98);
for (let i = 0; i < 7; i++) {               // spiky hair
  const a = (i / 7) * Math.PI * 2;
  const spike = put(new THREE.ConeGeometry(0.045, 0.13, 6), toonMat(HAIR, { rim: 0.9 }),
    Math.cos(a) * 0.055, 0.155 + rnd(i) * 0.02, Math.sin(a) * 0.055 - 0.01, headG);
  spike.rotation.set(Math.sin(a) * 0.55, 0, -Math.cos(a) * 0.55);
}
const fringe = put(new THREE.SphereGeometry(0.117, 16, 10, 0, Math.PI * 2, 0, 1.05), toonMat(HAIR, { rim: 0.9 }), 0, 0.075, -0.008, headG);
fringe.rotation.x = -0.35;
/* eyes + brows */
[[-1, -0.10], [1, 0.10]].forEach(([s, tilt]) => {
  put(new THREE.SphereGeometry(0.0225, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf5f2ea }), s * 0.046, 0.062, 0.096, headG);
  put(new THREE.SphereGeometry(0.0105, 8, 8), new THREE.MeshBasicMaterial({ color: 0x14141a }), s * 0.045, 0.060, 0.113, headG);
  const brow = put(box(0.052, 0.013, 0.012), toonMat(HAIR), s * 0.049, 0.098, 0.100, headG);
  brow.rotation.z = tilt;
});
/* headphones */
const band = put(new THREE.TorusGeometry(0.128, 0.016, 8, 22, Math.PI), toonMat(0x191024, { rim: 0.9 }), 0, 0.06, 0, headG);
band.rotation.z = 0.0;
[[-1], [1]].forEach(([s]) => {
  put(new THREE.CylinderGeometry(0.048, 0.048, 0.032, 14), toonMat(0xe6399a, { rim: 0.9 }), s * 0.118, 0.045, 0.005, headG).rotation.z = Math.PI / 2;
  put(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12), toonMat(0x22c7d6, { rim: 0.9 }), s * 0.128, 0.045, 0.005, headG).rotation.z = Math.PI / 2;
});

/* arms / legs as oriented segments (no hierarchy to fight) */
const SEG = new THREE.CylinderGeometry(1, 1, 1, 10, 1, true);
const JOINT = new THREE.SphereGeometry(1, 10, 8);
const UP = new THREE.Vector3(0, 1, 0);
function segment(mat, radius) {
  const m = new THREE.Mesh(SEG, mat);
  m.scale.set(radius, 1, radius);
  scene.add(m);
  inked(m, 0.008);
  return m;
}
function joint(mat, radius) {
  const m = new THREE.Mesh(JOINT, mat);
  m.scale.setScalar(radius);
  scene.add(m);
  return m;
}
function placeSegment(mesh, a, b, radius) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
  mesh.scale.set(radius, len, radius);
}
const hoodMat = toonMat(HOOD, { rim: 0.7 });
const skinMat = toonMat(SKIN, { rim: 0.7 });
const denimMat = toonMat(DENIM, { rim: 0.55 });
const shoeMat = toonMat(0xe8e4da, { rim: 0.6 });

const armR1 = segment(hoodMat, 0.048), armR2 = segment(skinMat, 0.040);
const armL1 = segment(hoodMat, 0.048), armL2 = segment(skinMat, 0.040);
const elbowR = joint(hoodMat, 0.05), elbowL = joint(hoodMat, 0.05);
const shoulderR = joint(hoodMat, 0.062), shoulderL = joint(hoodMat, 0.062);
const handR = inked(joint(skinMat, 0.046), 0.007);
const handL = inked(joint(skinMat, 0.046), 0.007);
handR.scale.set(0.046, 0.037, 0.058); handL.scale.set(0.046, 0.037, 0.058);

const legL1 = segment(denimMat, 0.072), legL2 = segment(denimMat, 0.056);
const legR1 = segment(denimMat, 0.072), legR2 = segment(denimMat, 0.056);
const kneeL = joint(denimMat, 0.07), kneeR = joint(denimMat, 0.07);
const footL = inked(put(box(0.09, 0.06, 0.17), shoeMat, 0, 0, 0), 0.008);
const footR = inked(put(box(0.09, 0.06, 0.17), shoeMat, 0, 0, 0), 0.008);
scene.add(footL, footR);

/* pencil in the right hand */
const pencilG = new THREE.Group();
handR.add(pencilG);
pencilG.rotation.set(-0.34, 0, 0.22);
const pencilBody = put(new THREE.CylinderGeometry(0.011, 0.011, 0.15, 8), toonMat(0xffd23f, { rim: 0.8 }), 0, 0.02, 0, pencilG);
inked(pencilBody, 0.005);
put(new THREE.ConeGeometry(0.011, 0.028, 8), toonMat(0xe8e0cc, { rim: 0.8 }), 0, -0.068, 0, pencilG);
put(new THREE.ConeGeometry(0.004, 0.012, 6), toonMat(0x14141a), 0, -0.080, 0, pencilG);
put(new THREE.CylinderGeometry(0.011, 0.011, 0.02, 8), toonMat(0xe6399a), 0, 0.10, 0, pencilG);
const pencilTip = new THREE.Object3D();
pencilTip.position.set(0, -0.086, 0);
pencilG.add(pencilTip);

/* shoulder anchors that follow the breathing torso */
const anchorR = new THREE.Object3D(); anchorR.position.set(0.165, 0.285, 0.01); torsoG.add(anchorR);
const anchorL = new THREE.Object3D(); anchorL.position.set(-0.165, 0.285, 0.01); torsoG.add(anchorL);

/* two-bone solve: elbow position from shoulder S, target H, pole vector */
const L1 = 0.30, L2 = 0.28;
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _q = new THREE.Quaternion();
function solveElbow(S, H, pole, out) {
  const d0 = _v1.subVectors(H, S);
  let d = d0.length();
  d = clamp(d, Math.abs(L1 - L2) + 0.02, L1 + L2 - 0.02);
  const dir = d0.clone().normalize();
  const cosA = clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1);
  const ang = Math.acos(cosA);
  const n = _v2.crossVectors(dir, pole).normalize();
  const cand1 = dir.clone().applyQuaternion(_q.setFromAxisAngle(n, ang));
  const cand2 = dir.clone().applyQuaternion(_q.setFromAxisAngle(n, -ang));
  const E1 = S.clone().addScaledVector(cand1, L1);
  const E2 = S.clone().addScaledVector(cand2, L1);
  const mid = S.clone().addScaledVector(dir, d * 0.5);
  out.copy(E1.sub(mid).dot(pole) > E2.sub(mid).dot(pole) ? S.clone().addScaledVector(cand1, L1) : S.clone().addScaledVector(cand2, L1));
  return out;
}

/* ------------------------------------------------------------------ *
 *  doodle paths (uv space on the page, with pen lifts)
 * ------------------------------------------------------------------ */
function genLoops() {
  const pts = [];
  const N = 150, m = 0.60 / (6 * Math.PI), b = 0.052;
  for (let i = 0; i <= N; i++) {
    const s = (i / N) * 6 * Math.PI;
    pts.push({ u: 0.17 + m * s - b * Math.sin(s), v: 0.52 - b * 1.7 * Math.cos(s), pen: true });
  }
  return pts;
}
function genSpider() {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    pts.push({ u: 0.5 + Math.cos(a) * 0.10, v: 0.55 + Math.sin(a) * 0.13, pen: i > 0 });
  }
  pts.push({ u: 0.5, v: 0.40, pen: true });
  for (let l = 0; l < 8; l++) {
    const a = (l / 8) * Math.PI * 2 + 0.4;
    pts.push({ u: 0.5 + Math.cos(a) * 0.09, v: 0.55 + Math.sin(a) * 0.12, pen: false });
    for (let i = 1; i <= 6; i++) {
      const t = i / 6, r = 0.09 + t * 0.16, bend = 0.5 * t * t;
      pts.push({ u: 0.5 + Math.cos(a + bend) * r, v: 0.55 + Math.sin(a + bend) * r * 1.25, pen: true });
    }
  }
  return pts;
}
function genFace() {
  const pts = [];
  for (let i = 0; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    pts.push({ u: 0.5 + Math.cos(a) * 0.14, v: 0.55 + Math.sin(a) * 0.18, pen: i > 0 });
  }
  [[0.44, 0.60], [0.56, 0.60]].forEach(([cu, cv]) => {
    pts.push({ u: cu, v: cv, pen: false });
    for (let i = 1; i <= 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      pts.push({ u: cu + Math.cos(a) * 0.022, v: cv + Math.sin(a) * 0.03, pen: true });
    }
  });
  pts.push({ u: 0.42, v: 0.47, pen: false });
  for (let i = 1; i <= 14; i++) {
    const t = i / 14;
    pts.push({ u: 0.42 + t * 0.16, v: 0.47 - Math.sin(t * Math.PI) * 0.07, pen: true });
  }
  return pts;
}
function genBolt() {
  const pts = [];
  const star = [[0.5, 0.86], [0.57, 0.62], [0.80, 0.60], [0.62, 0.46], [0.70, 0.20], [0.5, 0.36], [0.30, 0.20], [0.38, 0.46], [0.20, 0.60], [0.43, 0.62]];
  star.forEach(([u, v], i) => pts.push({ u, v, pen: i > 0 }));
  pts.push({ u: star[0].u, v: star[0].v, pen: true });
  return pts;
}
const DOODLES = [genLoops(), genSpider(), genFace(), genBolt()];
const WORDS = ['SKRITCH!', 'SCRIBBLE!', 'YEAAH!', 'INK UP!'];

/* ------------------------------------------------------------------ *
 *  comic sfx burst sprite (graphic layer above everything)
 * ------------------------------------------------------------------ */
const [_burstCanvas, bctx] = makeCanvas(512, 512);
const burstTex = canvasTexture(_burstCanvas);
function paintBurst(word) {
  bctx.clearRect(0, 0, 512, 512);
  bctx.save();
  bctx.translate(256, 256);
  bctx.beginPath();
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const r = (i % 2 ? 150 : 236) * (0.9 + rnd(i + word.length) * 0.2);
    bctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  bctx.closePath();
  bctx.save(); bctx.translate(9, 7); bctx.strokeStyle = '#ff2d55'; bctx.lineWidth = 16; bctx.stroke(); bctx.restore();
  bctx.fillStyle = '#ffd23f'; bctx.fill();
  bctx.strokeStyle = '#14141a'; bctx.lineWidth = 14; bctx.stroke();
  bctx.rotate(-0.10);
  bctx.font = 'bold 96px Impact, "Arial Black", sans-serif';
  bctx.textAlign = 'center'; bctx.textBaseline = 'middle';
  bctx.strokeStyle = '#f0e8d4'; bctx.lineWidth = 18; bctx.strokeText(word, 0, 6);
  bctx.fillStyle = '#14141a'; bctx.fillText(word, 0, 6);
  bctx.restore();
  burstTex.needsUpdate = true;
}
paintBurst('SKRITCH!');
const burst = new THREE.Sprite(new THREE.SpriteMaterial({
  map: burstTex, transparent: true, depthTest: false, opacity: 0,
}));
burst.renderOrder = 50;
burst.position.set(0.62, 1.42, -0.55);
burst.scale.setScalar(0.001);
scene.add(burst);

/* ------------------------------------------------------------------ *
 *  post process — the whole comic-print pipeline in one pass
 * ------------------------------------------------------------------ */
const postScene = new THREE.Scene();
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const postUniforms = {
  tDiffuse: { value: rt.texture },
  tDepth: { value: rt.depthTexture },
  uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  uNear: { value: camera.near },
  uFar: { value: camera.far },
  uBoil: { value: 0 },
  uSpeed: { value: 0 },
  uFlash: { value: 0 },
};
const postMat = new THREE.ShaderMaterial({
  uniforms: postUniforms,
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
  `,
  fragmentShader: /* glsl */`
    precision highp float;
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform vec2 uRes;
    uniform float uNear;
    uniform float uFar;
    uniform float uBoil;
    uniform float uSpeed;
    uniform float uFlash;
    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }
    float hash11(float p) {
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }
    float viewDist(vec2 u) {
      float d = texture2D(tDepth, u).x;
      float vz = (uNear * uFar) / ((uFar - uNear) * d - uFar);
      return -vz;
    }
    /* combined ink line: depth discontinuity + strong colour-band jumps */
    float inkAt(vec2 u) {
      vec2 tx = vec2(1.4 / uRes.x, 0.0);
      vec2 ty = vec2(0.0, 1.4 / uRes.y);
      float zc = viewDist(u);
      float ez = abs(viewDist(u + tx) - viewDist(u - tx))
               + abs(viewDist(u + ty) - viewDist(u - ty));
      float inkD = smoothstep(0.55, 1.15, ez / (0.14 + 0.10 * zc));
      vec3 cx = texture2D(tDiffuse, u + tx).rgb - texture2D(tDiffuse, u - tx).rgb;
      vec3 cy = texture2D(tDiffuse, u + ty).rgb - texture2D(tDiffuse, u - ty).rgb;
      float ec = dot(abs(cx) + abs(cy), vec3(0.333));
      float inkC = smoothstep(0.30, 0.62, ec);
      return clamp(max(inkD, inkC * 0.85), 0.0, 1.0);
    }

    void main() {
      vec2 uv = vUv;
      vec2 c = uv - 0.5;

      /* --- chromatic aberration / misregistered RGB --- */
      float ca = 0.0016 + 0.0075 * uSpeed;
      vec2 off = c * ca;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;

      /* --- ink outlines with cyan/magenta misregistration ghosts --- */
      float ink = inkAt(uv);
      float inkC = inkAt(uv + vec2(0.0026, 0.0019));
      float inkM = inkAt(uv - vec2(0.0023, 0.0015));
      col = mix(col, vec3(0.06, 0.55, 0.72), inkC * 0.5);
      col = mix(col, vec3(0.72, 0.06, 0.42), inkM * 0.5);
      col = mix(col, vec3(0.045, 0.035, 0.085), ink * 0.92);

      /* --- ben-day halftone in the shadows, paper dots in highlights --- */
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      float shadow = smoothstep(0.40, 0.10, lum);
      float boilJit = 0.05 * hash11(uBoil);
      float a1 = 0.38 + boilJit;
      vec2 hp = gl_FragCoord.xy / 5.5;
      vec2 rp = vec2(hp.x * cos(a1) - hp.y * sin(a1), hp.x * sin(a1) + hp.y * cos(a1));
      vec2 cell = floor(rp);
      vec2 f = fract(rp) - 0.5;
      float rr = hash12(cell + uBoil * 0.7);
      float radius = 0.46 * sqrt(shadow) * (0.78 + 0.44 * rr);
      float dotM = 1.0 - smoothstep(radius - 0.08, radius, length(f));
      col = mix(col, vec3(0.16, 0.08, 0.30), dotM * shadow * 0.85);

      float hl = smoothstep(0.74, 0.95, lum);
      float a2 = -0.5 - boilJit;
      vec2 hp2 = gl_FragCoord.xy / 7.0;
      vec2 rp2 = vec2(hp2.x * cos(a2) - hp2.y * sin(a2), hp2.x * sin(a2) + hp2.y * cos(a2));
      vec2 f2 = fract(rp2) - 0.5;
      float radius2 = 0.30 * sqrt(hl);
      float dotH = 1.0 - smoothstep(radius2 - 0.08, radius2, length(f2));
      col = mix(col, vec3(1.0, 0.96, 0.86), dotH * hl * 0.22);

      /* --- cross-hatch in the deepest darks --- */
      float deep = smoothstep(0.22, 0.05, lum);
      float hatch = step(0.55, fract((gl_FragCoord.x + gl_FragCoord.y) / 5.0));
      col *= 1.0 - hatch * deep * 0.22;

      /* --- radial speed lines on punches --- */
      if (uSpeed > 0.01) {
        float ang = atan(c.y, c.x);
        float rad = length(c);
        float li = floor(ang * 74.0);
        float on = step(0.52, hash11(li + uBoil * 3.1));
        float mask = smoothstep(0.16, 0.46, rad) * (0.45 + 0.55 * hash11(li * 1.7));
        col = mix(col, vec3(0.05, 0.04, 0.09), on * mask * uSpeed * 0.85);
      }

      /* --- impact flash --- */
      col = mix(col, vec3(1.0, 0.95, 0.88), uFlash);

      /* --- paper grain + print noise (boils at 12fps) --- */
      float n = hash12(uv * uRes + uBoil * 17.3);
      col += (n - 0.5) * 0.055;
      float paper = hash12(floor(uv * uRes * 0.22));
      col *= 0.965 + 0.06 * paper;

      /* --- vignette + comic panel border --- */
      col *= 1.0 - 0.38 * smoothstep(0.42, 0.98, length(c) * 1.25);
      vec2 ab = abs(uv - 0.5) * 2.0;
      float frame = smoothstep(0.975, 0.995, max(ab.x, ab.y));
      col = mix(col, vec3(0.045, 0.035, 0.085), frame);

      /* --- grade: saturation, contrast, complementary tinting --- */
      float l2 = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l2), col, 1.30);
      col = (col - 0.5) * 1.13 + 0.5;
      col += (1.0 - l2) * vec3(0.045, 0.0, 0.075);
      col += pow(max(l2, 0.0), 3.0) * vec3(0.075, 0.05, 0.012);
      col = clamp(col, 0.0, 1.0);

      /* --- linear -> sRGB --- */
      col = pow(col, vec3(0.4545));
      gl_FragColor = vec4(col, 1.0);
    }
  `,
  depthTest: false,
  depthWrite: false,
});
postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat));

/* ------------------------------------------------------------------ *
 *  animation state
 * ------------------------------------------------------------------ */
const clock = new THREE.Clock();
let doodleIdx = 0, wpIdx = 0, phase = 'draw', phaseT = 0;
let burstT = 99;
let punch = 0, flash = 0;
let glanceT = 0, glanceNext = 4.5;
const prevUv = { u: 0, v: 0, pen: false, has: false };

const _S = new THREE.Vector3(), _H = new THREE.Vector3(), _E = new THREE.Vector3();
const _T = new THREE.Vector3(), _tip = new THREE.Vector3(), _local = new THREE.Vector3();
const poleR = new THREE.Vector3(1, -0.35, -0.25).normalize();
const poleL = new THREE.Vector3(-1, -0.5, 0.1).normalize();

function paperUvToWorld(u, v, out) {
  out.set((u - 0.5) * 0.44, (v - 0.5) * 0.315, 0);
  return paper.localToWorld(out);
}
function drawInk(u0, v0, u1, v1) {
  pctx.strokeStyle = '#1a1a22';
  pctx.lineCap = 'round';
  pctx.lineJoin = 'round';
  pctx.lineWidth = 6.5;
  pctx.beginPath();
  pctx.moveTo(u0 * 512, (1 - v0) * 368);
  pctx.lineTo(u1 * 512, (1 - v1) * 368);
  pctx.stroke();
  pctx.strokeStyle = 'rgba(26,26,34,.45)';
  pctx.lineWidth = 3;
  pctx.beginPath();
  pctx.moveTo(u0 * 512 + 2.5, (1 - v0) * 368 + 2);
  pctx.lineTo(u1 * 512 + 2.5, (1 - v1) * 368 + 2);
  pctx.stroke();
  paperTex.needsUpdate = true;
}
function triggerBurst(word) {
  paintBurst(word);
  burstT = 0;
  punch = 1;
  flash = 0.34;
}
window.addEventListener('pointerdown', () => triggerBurst('POW!'));

/* ------------------------------------------------------------------ *
 *  main loop
 * ------------------------------------------------------------------ */
const camTarget = new THREE.Vector3();
const lookTarget = new THREE.Vector3();
let lastStep = -1;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const st = stepTime(t, 12);          // character / ink time (hand-animated feel)
  const st8 = stepTime(t, 8);          // punch & burst time (stompy)
  postUniforms.uBoil.value = Math.floor(st * 12);

  /* ---- doodle state machine, advanced on stepped frames ---- */
  const stepNow = Math.floor(t * 12);
  if (stepNow !== lastStep) {
    const adv = Math.min(3, stepNow - Math.max(lastStep, stepNow - 4));
    lastStep = stepNow;
    for (let k = 0; k < adv; k++) {
      if (phase === 'draw') {
        const doodle = DOODLES[doodleIdx];
        for (let s = 0; s < 3 && wpIdx < doodle.length; s++, wpIdx++) {
          const p = doodle[wpIdx];
          if (p.pen && prevUv.has && prevUv.pen) drawInk(prevUv.u, prevUv.v, p.u, p.v);
          prevUv.u = p.u; prevUv.v = p.v; prevUv.pen = p.pen; prevUv.has = true;
        }
        if (wpIdx >= doodle.length) {
          phase = 'hold'; phaseT = 0;
          triggerBurst(WORDS[doodleIdx % WORDS.length]);
        }
      }
    }
  }
  phaseT += dt;
  if (phase === 'hold' && phaseT > 1.15) { phase = 'wipe'; phaseT = 0; }
  if (phase === 'wipe' && phaseT > 0.25) {
    paperReset(); paperTex.needsUpdate = true;
    doodleIdx = (doodleIdx + 1) % DOODLES.length;
    wpIdx = 0; prevUv.has = false; prevUv.pen = false;
    phase = 'draw'; phaseT = 0;
  }

  /* ---- character pose (all from stepped time) ---- */
  const breathe = Math.sin(st * 2.0) * 0.008;
  torsoG.position.y = breathe;
  torsoG.rotation.x = 0.16 + Math.sin(st * 1.1) * 0.015;
  torsoG.rotation.z = Math.sin(st * 0.7) * 0.02;

  glanceNext -= dt;
  if (glanceNext < 0) { glanceT = 1.5; glanceNext = 5 + rnd(stepNow) * 4; }
  if (glanceT > 0) glanceT -= dt;
  const glance = glanceT > 0 ? Math.sin(clamp(1 - glanceT / 1.5, 0, 1) * Math.PI) : 0;
  headG.rotation.x = lerp(0.46, 0.02, glance) + Math.sin(st * 1.7) * 0.02;
  headG.rotation.z = lerp(0.05, -0.12, glance) + Math.sin(st * 0.9) * 0.03;
  headG.rotation.y = Math.sin(st * 0.5) * 0.10;

  boy.updateMatrixWorld(true);

  /* right hand follows the pencil path on the page */
  const doodle = DOODLES[doodleIdx];
  const wp = doodle[Math.min(wpIdx, doodle.length - 1)];
  const jitterU = (rnd(stepNow * 3 + 1) - 0.5) * 0.006;
  const jitterV = (rnd(stepNow * 5 + 2) - 0.5) * 0.006;
  paperUvToWorld(wp.u + jitterU, wp.v + jitterV, _T);
  const lifted = phase !== 'draw' || !wp.pen;
  _T.y += lifted ? 0.13 : 0.0;
  _H.copy(_T).add(new THREE.Vector3(-0.037, 0.077, -0.029));

  anchorR.getWorldPosition(_S);
  solveElbow(_S, _H, poleR, _E);
  placeSegment(armR1, _S, _E, 0.048);
  placeSegment(armR2, _E, _H, 0.040);
  elbowR.position.copy(_E);
  shoulderR.position.copy(_S);
  handR.position.copy(_H);
  handR.rotation.set(Math.sin(st * 2.3) * 0.2, 0, 0.3 + Math.sin(st * 3.1) * 0.15);

  /* left hand steadies the page */
  paperUvToWorld(0.16 + Math.sin(st * 0.6) * 0.01, 0.22, _T);
  _T.y += 0.02;
  _H.copy(_T).add(new THREE.Vector3(0.02, 0.070, -0.03));
  anchorL.getWorldPosition(_S);
  solveElbow(_S, _H, poleL, _E);
  placeSegment(armL1, _S, _E, 0.048);
  placeSegment(armL2, _E, _H, 0.040);
  elbowL.position.copy(_E);
  shoulderL.position.copy(_S);
  handL.position.copy(_H);
  handL.rotation.set(0, 0, -0.3);

  /* seated legs + foot tap on the stepped clock */
  const tap = (Math.floor(st * 4) % 2) * 0.16;
  const hipR = new THREE.Vector3(0.10, 0.50, -0.52);
  const hipL = new THREE.Vector3(-0.10, 0.50, -0.52);
  const kneeRp = new THREE.Vector3(0.13, 0.475, -0.26);
  const kneeLp = new THREE.Vector3(-0.13, 0.475, -0.26);
  const ankR = new THREE.Vector3(0.14, 0.075 - tap * 0.4, -0.22);
  const ankL = new THREE.Vector3(-0.14, 0.075, -0.22);
  placeSegment(legR1, hipR, kneeRp, 0.072);
  placeSegment(legR2, kneeRp, ankR, 0.056);
  placeSegment(legL1, hipL, kneeLp, 0.072);
  placeSegment(legL2, kneeLp, ankL, 0.056);
  kneeR.position.copy(kneeRp); kneeL.position.copy(kneeLp);
  footR.position.set(0.14, 0.045 - tap * 0.5, -0.16);
  footR.rotation.x = -tap;
  footL.position.set(-0.14, 0.045, -0.16);
  footL.rotation.x = 0;

  /* pencil ink actually lands where the pencil tip is */
  pencilTip.getWorldPosition(_tip);
  _local.copy(_tip);
  paper.worldToLocal(_local);
  const tipU = clamp(_local.x / 0.44 + 0.5, 0.02, 0.98);
  const tipV = clamp(_local.y / 0.315 + 0.5, 0.02, 0.98);
  if (phase === 'draw' && !lifted) {
    if (!prevTip.has) {
      prevTip.u = tipU; prevTip.v = tipV; prevTip.has = true;
    } else if (Math.abs(prevTip.u - tipU) + Math.abs(prevTip.v - tipV) > 0.005) {
      drawInk(prevTip.u, prevTip.v, tipU, tipV);   // no blobs while the hand holds a pose
      prevTip.u = tipU; prevTip.v = tipV;
    }
  } else {
    prevTip.has = false;
  }

  /* ---- dust drift ---- */
  const dp = dust.geometry.attributes.position;
  for (let i = 0; i < DUST; i++) {
    dp.array[i * 3 + 1] += Math.sin(t * 0.6 + i) * 0.00035;
    dp.array[i * 3] += Math.cos(t * 0.4 + i * 1.7) * 0.00022;
  }
  dp.needsUpdate = true;

  /* ---- burst sprite pop (stepped at 8fps) ---- */
  burstT += dt;
  if (burstT < 1.5) {
    const k = clamp(burstT / 0.34, 0, 1);
    const s = 0.95 * easeOutBack(k);
    burst.scale.set(s, s, 1);
    burst.material.opacity = burstT > 1.05 ? clamp(1 - (burstT - 1.05) / 0.45, 0, 1) : 1;
    burst.material.rotation = -0.12 + (rnd(Math.floor(st8 * 8)) - 0.5) * 0.10;
  } else {
    burst.material.opacity = 0;
  }

  /* ---- camera: smooth drift + stepped punch-ins + dutch roll ---- */
  punch = Math.max(0, punch - dt * 2.6);
  flash = Math.max(0, flash - dt * 2.2);
  const pe = punch * punch;
  const az = 0.30 * Math.sin(t * 0.10) + 0.18 + Math.sin(t * 0.043) * 0.10;
  const rad = 3.05 + 0.22 * Math.sin(t * 0.071) - 0.55 * pe;
  const hgt = 1.38 + 0.10 * Math.sin(t * 0.13 + 1.2) + 0.10 * pe;
  camera.position.set(Math.sin(az) * rad, hgt, -0.15 + Math.cos(az) * rad);
  lookTarget.set(0, lerp(0.98, 0.86, 0.5 + 0.5 * Math.sin(t * 0.05)), -0.35);
  camTarget.lerp(lookTarget, 0.06);
  camera.lookAt(camTarget);
  camera.rotateZ(0.045 * Math.sin(t * 0.21) + 0.10 * Math.sin(st8 * 5) * pe);
  camera.fov = 48 - 11 * pe;
  camera.updateProjectionMatrix();

  postUniforms.uSpeed.value = pe;
  postUniforms.uFlash.value = flash * 0.5;

  /* ---- render: scene -> RT -> comic print pass ---- */
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.render(postScene, postCam);
}
const prevTip = { u: 0, v: 0, has: false };

/* ------------------------------------------------------------------ *
 *  resize / boot
 * ------------------------------------------------------------------ */
function onResize() {
  const cw = window.innerWidth, ch = window.innerHeight;
  renderer.setSize(cw, ch);
  camera.aspect = cw / ch;
  camera.updateProjectionMatrix();
  const w = Math.max(2, Math.floor(cw * PR)), h = Math.max(2, Math.floor(ch * PR));
  rt.setSize(w, h);
  postUniforms.uRes.value.set(w, h);
}
window.addEventListener('resize', onResize);

scene.updateMatrixWorld(true);
camTarget.set(0, 0.95, -0.35);
onResize();
document.getElementById('boot').remove();
animate();

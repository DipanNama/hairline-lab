/** Layers: four slabs of an app stack. The pointer lifts one clear and slides it aside. */
const { Cam, fit, proj, facing, rings, prism, solid, put, mk, tween, tset, tval, tdone, register, pointer, disposer } = HL;
const N = 4, T = 8, GAP = 16, W = 52, D = 40, SLIDE = 30;
const rx = (i) => (i % 2 ? 8 : -8), ry = (i) => 0;
function mount({ stage, svg, read }, value) {
  const bag = disposer(); let step = value;
  const C = Cam(45, 0.5, 1.6);
  const top = N * (T + GAP) + 14;
  fit(C, [[-W - SLIDE, -D, 0], [W + SLIDE, D + SLIDE, 0], [-W - SLIDE, D + SLIDE, 0], [W + SLIDE, -D, top]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg), s = [];
  for (let i = 0; i < N; i++) s.push({ el: solid(g), x: tween(0), y: tween(0), z: tween(0), drawn: "" });
  let act = -1;
  const rest = (i) => i * (T + GAP);
  function draw(now) {
    let m = false;
    s.forEach((c, i) => {
      const x = tval(c.x, now), y = tval(c.y, now), z = tval(c.z, now);
      if (!tdone(c.x, now) || !tdone(c.y, now) || !tdone(c.z, now)) m = true;
      const key = x + "|" + y + "|" + z; if (key === c.drawn) return; c.drawn = key;
      const cx = rx(i) + x, cy = ry(i) + y, [ring, inner] = rings(cx - W, cy - D, cx + W, cy + D, 8, 1.6);
      put(c.el, prism(P, front, ring, inner, rest(i) + z, rest(i) + z + T));
    });
    return m;
  }
  const B = register(stage, (_dt, now) => draw(now));
  bag.add(B.unregister);
  const mark = (a) => s.forEach((c, i) => c.el.sil.classList.toggle("hi", a < 0 ? i === 3 : i === a));
  mark(-1);
  function setActive(a) {
    if (a === act) return; const now = performance.now(), from = a >= 0 ? a : act; act = a;
    s.forEach((c, i) => {
      const d = a < 0 ? 0 : i === a ? 1 : 0.25 * Math.max(0, 1 - Math.abs(i - a) / 2);
      const dl = Math.abs(i - from) * step;
      tset(c.x, a < 0 ? 0 : d*SLIDE, now, dl); tset(c.y, a < 0 ? 0 : 0, now, dl); tset(c.z, a < 0 ? 0 : d*14, now, dl);
    });
    mark(a); read.textContent = a < 0 ? "rest" : "layers " + (a + 1);
    B.wake();
  }
  // static bands on the resting slab tops
  const ys = s.map((_, i) => P(rx(i), ry(i), rest(i) + T / 2)[1]);
  const hit = ([x, y]) => { if (Math.abs(x - 200) > 150) return -1; let b = 0; ys.forEach((v, i) => { if (Math.abs(v - y) < Math.abs(ys[b] - y)) b = i; }); return Math.abs(ys[b] - y) > 24 ? -1 : b; };
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  draw(performance.now());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}
hairline({ name: "layers", means: "Four app layers, loosely stacked: touch one and it lifts clear and slides aside.", rules: [1, 2, 5, 9], range: [0, 45, 90], tour: [[200,110],[200,150],[200,195],null], mount });

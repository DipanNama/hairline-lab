/** Funnel: five slabs narrowing to the bottom. The pointer picks a stage; it and everything above lift away in turn. */
const { Cam, fit, proj, facing, rings, prism, solid, put, mk, spring, stepS, tween, tset, tval, tdone, register, pointer, disposer, tween: _t } = HL;
const N = 5, T = 8, GAP = 13, HALF = [18, 28, 38, 48, 58], LIFT = 15, UP = 8;
function mount({ stage, svg, read }, value) {
  const bag = disposer(); let step = value;
  const C = Cam(45, 0.5, 1.9);
  fit(C, [[-60, -60, 0], [60, 60, 0], [-60, 60, 0], [60, -60, 0], [-58, -58, N * (T + GAP) + LIFT + UP]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg), s = [];
  for (let i = 0; i < N; i++) {
    const h = HALF[i], [ring, inner] = rings(-h, -h, h, h, 9, 1.6);
    s.push({ ring, inner, el: solid(g), a: tween(0), drawn: NaN });
  }
  let act = -1;
  const rest = (i) => i * (T + GAP);
  function draw(now) {
    let m = false;
    s.forEach((c, i) => {
      const o = tval(c.a, now); if (!tdone(c.a, now)) m = true;
      if (o === c.drawn) return; c.drawn = o;
      put(c.el, prism(P, front, c.ring, c.inner, rest(i) + o, rest(i) + o + T));
    });
    return m;
  }
  const B = register(stage, (_dt, now) => draw(now));
  bag.add(B.unregister);
  s.forEach((c, i) => c.el.sil.classList.toggle("hi", i === 0));
  function setActive(a) {
    if (a === act) return; const now = performance.now(), from = a >= 0 ? a : act; act = a;
    s.forEach((c, i) => {
      const to = a < 0 ? 0 : i > a ? LIFT : i === a ? UP : 0;
      tset(c.a, to, now, Math.abs(i - from) * step);
      c.el.sil.classList.toggle("hi", a < 0 ? i === 0 : i === a);
    });
    read.textContent = a < 0 ? "rest" : "stage " + (N - a);
    B.wake();
  }
  // static bands: the resting slab tops, never the moved ones
  const ys = s.map((_, i) => P(0, 0, rest(i) + T / 2)[1]);
  const hit = ([x, y]) => { if (Math.abs(x - 200) > 135) return -1; let b = 0; ys.forEach((v, i) => { if (Math.abs(v - y) < Math.abs(ys[b] - y)) b = i; }); return Math.abs(ys[b] - y) > 26 ? -1 : b; };
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  draw(performance.now());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}
hairline({ name: "funnel", means: "A sales funnel in five slabs: touch a stage and it, with all it feeds, lifts away.", rules: [1, 2, 5, 9], range: [0, 45, 90], tour: [[200, 120], [200, 170], [200, 215], null], mount });

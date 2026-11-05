import { useEffect, useRef } from 'react';
import girl from '@/assets/hero/girl.png.asset.json';
import o0 from '@/assets/hero/obj0.png.asset.json';
import o1 from '@/assets/hero/obj1.png.asset.json';
import o2 from '@/assets/hero/obj2.png.asset.json';
import o3 from '@/assets/hero/obj3.png.asset.json';
import o4 from '@/assets/hero/obj4.png.asset.json';
import o5 from '@/assets/hero/obj5.png.asset.json';
import o6 from '@/assets/hero/obj6.png.asset.json';
import o7 from '@/assets/hero/obj7.png.asset.json';
import o8 from '@/assets/hero/obj8.png.asset.json';
import o9 from '@/assets/hero/obj9.png.asset.json';
import o10 from '@/assets/hero/obj10.png.asset.json';
import o11 from '@/assets/hero/obj11.png.asset.json';
import o12 from '@/assets/hero/obj12.png.asset.json';

// Layers cut from the original flattened illustration; coordinates in its 963x734 frame.
const W = 963, H = 734;
const OBJECTS = [
  { a: o0, x: 365, y: -6, w: 193, h: 184 }, { a: o1, x: 674, y: 24, w: 111, h: 95 },
  { a: o2, x: 228, y: 25, w: 63, h: 64 }, { a: o3, x: 21, y: 47, w: 147, h: 163 },
  { a: o4, x: 599, y: 47, w: 50, h: 50 }, { a: o5, x: 516, y: 138, w: 227, h: 160 },
  { a: o6, x: 253, y: 139, w: 115, h: 110 }, { a: o7, x: 759, y: 169, w: 210, h: 161 },
  { a: o8, x: 89, y: 226, w: 184, h: 157 }, { a: o9, x: -6, y: 274, w: 51, h: 50 },
  { a: o10, x: 674, y: 296, w: 99, h: 128 }, { a: o11, x: 798, y: 354, w: 50, h: 50 },
  { a: o12, x: 45, y: 406, w: 144, h: 94 },
];
// Sclera centre, pupil rest position and how far the pupil may travel (frame units).
const EYES = [
  { cx: 401, cy: 398, px: 414, py: 388, rx: 13, ry: 12 },
  { cx: 501, cy: 366, px: 513, py: 355, rx: 13, ry: 12 },
];
const PUPIL_R = 15;

export function InteractiveHeroArt({ alt }: { alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const objRefs = useRef<(HTMLImageElement | null)[]>([]);
  const pupilRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const section = el.closest('section') ?? el;
    const mouse = { x: 0, y: 0, active: false };
    const seeds = OBJECTS.map((_, i) => ({
      ph: i * 1.7 + Math.random() * 6, sp: 0.55 + Math.random() * 0.5,
      amp: 3 + Math.random() * 4, sway: 1 + Math.random() * 2.5, rot: 1 + Math.random() * 2.5,
    }));
    const phys = OBJECTS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0 }));
    const eyes = EYES.map(e => ({ x: e.px - e.cx, y: e.py - e.cy }));
    const onMove = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    if (canHover) { section.addEventListener('pointermove', onMove as EventListener); section.addEventListener('pointerleave', onLeave); }

    let raf = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = now / 1000;
      const rect = el.getBoundingClientRect(); const s = rect.width / W;
      OBJECTS.forEach((o, i) => {
        const p = phys[i], sd = seeds[i];
        let fx = 0, fy = 0, tr = 0;
        if (mouse.active) {
          const cx = rect.left + (o.x + o.w / 2) * s + p.x, cy = rect.top + (o.y + o.h / 2) * s + p.y;
          const dx = cx - mouse.x, dy = cy - mouse.y, dist = Math.hypot(dx, dy) || 1;
          const radius = Math.max(o.w, o.h) * s * 0.5 + 90;
          if (dist < radius) {
            const k = (1 - dist / radius) ** 2 * 26;
            fx = (dx / dist) * k; fy = (dy / dist) * k; tr = (dx / dist) * k * 0.35;
          }
        }
        // spring toward repulsion target, with damping
        p.vx += ((fx - p.x) * 60 - p.vx * 9) * dt; p.vy += ((fy - p.y) * 60 - p.vy * 9) * dt;
        p.vr += ((tr - p.r) * 50 - p.vr * 8) * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
        const ft = t * sd.sp + sd.ph;
        const ix = Math.sin(ft * 0.7) * sd.sway, iy = Math.sin(ft) * sd.amp, ir = Math.sin(ft * 0.8 + 1) * sd.rot;
        const node = objRefs.current[i];
        if (node) node.style.transform = `translate3d(${(ix + p.x / s).toFixed(2)}px,${(iy + p.y / s).toFixed(2)}px,0) rotate(${(ir + p.r).toFixed(2)}deg)`;
      });
      EYES.forEach((e, i) => {
        let tx = e.px - e.cx, ty = e.py - e.cy;
        if (mouse.active) {
          const ex = rect.left + e.cx * s, ey = rect.top + e.cy * s;
          const dx = mouse.x - ex, dy = mouse.y - ey, d = Math.hypot(dx, dy) || 1;
          const reach = Math.min(1, d / 220);
          tx = (dx / d) * e.rx * reach; ty = (dy / d) * e.ry * reach;
        }
        const st = eyes[i]; const k = 1 - Math.exp(-dt * 9);
        st.x += (tx - st.x) * k; st.y += (ty - st.y) * k;
        const n = (st.x / e.rx) ** 2 + (st.y / e.ry) ** 2; if (n > 1) { const f = 1 / Math.sqrt(n); st.x *= f; st.y *= f; }
        const c = pupilRefs.current[i];
        if (c) { c.setAttribute('cx', String(e.cx + st.x)); c.setAttribute('cy', String(e.cy + st.y)); }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); section.removeEventListener('pointermove', onMove as EventListener); section.removeEventListener('pointerleave', onLeave); };
  }, []);

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  return (
    <div ref={root} className="hero-illustration hero-art" role="img" aria-label={alt}>
      <img src={girl.url} width={W} height={H} alt="" className="hero-art-girl" draggable={false} />
      <svg className="hero-art-eyes" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>{EYES.map((e, i) => <clipPath key={i} id={`hero-eye-${i}`}><ellipse cx={e.cx} cy={e.cy} rx={26} ry={25} /></clipPath>)}</defs>
        {EYES.map((e, i) => <circle key={i} ref={n => { pupilRefs.current[i] = n; }} clipPath={`url(#hero-eye-${i})`} cx={e.px} cy={e.py} r={PUPIL_R} className="hero-art-pupil" />)}
      </svg>
      {OBJECTS.map((o, i) => (
        <img key={i} ref={n => { objRefs.current[i] = n; }} src={o.a.url} alt="" draggable={false} className="hero-art-object"
          style={{ left: pct(o.x, W), top: pct(o.y, H), width: pct(o.w, W) }} />
      ))}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import girl from '@/assets/ideas-girl.png.asset.json';
import bulb from '@/assets/ideas-bulb.png.asset.json';

// Layers cut from the original 546x751 illustration.
const W = 546, H = 751;
const B = { x: 95, y: 0, w: 121, h: 127 };
const GLOW = { x: 165, y: 52 }; // centre of the glass, frame units
const pct = (v: number, t: number) => `${(v / t) * 100}%`;

export function InteractiveIdeaArt({ alt }: { alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const girlRef = useRef<HTMLImageElement>(null);
  const bulbRef = useRef<HTMLButtonElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const spark = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const m = { x: 0, y: 0, near: 0, active: false };
    const s = { px: 0, py: 0, tilt: 0, vt: 0, glow: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      m.x = (e.clientX - r.left) / r.width - 0.5;
      m.y = (e.clientY - r.top) / r.height - 0.5;
      const bx = r.left + (GLOW.x / W) * r.width, by = r.top + (GLOW.y / H) * r.height;
      const d = Math.hypot(e.clientX - bx, e.clientY - by);
      m.near = Math.max(0, 1 - d / (r.width * 0.6));
      m.active = Math.abs(m.x) < 1.2 && Math.abs(m.y) < 1;
      if (!m.active) m.near = 0;
      bulbDx = e.clientX - bx;
    };
    let bulbDx = 0;
    const leave = () => { m.active = false; m.near = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', leave);
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const tx = m.active ? m.x : 0, ty = m.active ? m.y : 0;
      s.px += (tx - s.px) * 0.06; s.py += (ty - s.py) * 0.06;
      // spring tilt toward cursor
      const targetTilt = m.near * Math.max(-1, Math.min(1, bulbDx / 120)) * 12;
      s.vt += (targetTilt - s.tilt) * 0.05; s.vt *= 0.85; s.tilt += s.vt;
      s.glow += (m.near - s.glow) * 0.07;
      spark.current *= 0.94;
      const sp = spark.current;
      if (girlRef.current) girlRef.current.style.transform =
        `translate3d(${s.px * 6}px, ${s.py * 4}px, 0) rotate(${s.px * 0.8}deg)`;
      const float = Math.sin(t * 1.1) * 4 + Math.sin(t * 0.43 + 1) * 2;
      const sway = Math.sin(t * 0.8 + 0.5) * 3 + Math.sin(t * 1.9) * 0.8;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + Math.sin(t * 0.37) * 1.2);
      if (bulbRef.current) bulbRef.current.style.transform =
        `translate3d(${s.px * 16}px, ${s.py * 12 + float}px, 0) rotate(${sway + s.tilt}deg) scale(${1 + sp * 0.12})`;
      if (bulbRef.current) bulbRef.current.style.filter =
        `brightness(${1 + pulse * 0.05 + s.glow * 0.12 + sp * 0.3})`;
      if (haloRef.current) {
        haloRef.current.style.opacity = String(0.35 + pulse * 0.25 + s.glow * 0.4 + sp * 0.5);
        haloRef.current.style.transform = `translate(-50%, -50%) scale(${0.9 + pulse * 0.12 + s.glow * 0.3 + sp * 0.6})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', leave); };
  }, []);

  const activate = () => {
    spark.current = 1;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && haloRef.current) {
      const h = haloRef.current; h.style.opacity = '1';
      setTimeout(() => { h.style.opacity = ''; }, 400);
    }
  };

  return (
    <div ref={root} className="idea-art" style={{ aspectRatio: `${W} / ${H}` }}>
      <img ref={girlRef} className="idea-art-girl" src={girl.url} alt={alt} width={W} height={H} draggable={false} />
      <button
        ref={bulbRef}
        type="button"
        className="idea-art-bulb"
        aria-label="Acender a lâmpada da ideia"
        onClick={activate}
        style={{ left: pct(B.x, W), top: pct(B.y, H), width: pct(B.w, W), height: pct(B.h, H) }}
      >
        <span ref={haloRef} className="idea-art-halo" aria-hidden="true"
          style={{ left: pct(GLOW.x - B.x, B.w), top: pct(GLOW.y - B.y, B.h) }} />
        <img src={bulb.url} alt="" width={B.w} height={B.h} draggable={false} />
      </button>
    </div>
  );
}

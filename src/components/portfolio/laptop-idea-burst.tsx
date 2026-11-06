import { useCallback, useEffect, useRef, useState } from 'react';
import i1 from '@/assets/laptop-icons/icon-11-2.png.asset.json';
import i2 from '@/assets/laptop-icons/icon-12-2.png.asset.json';
import i3 from '@/assets/laptop-icons/icon-13.png.asset.json';
import i4 from '@/assets/laptop-icons/icon-16.png.asset.json';
import i5 from '@/assets/laptop-icons/icon-17.png.asset.json';
import i6 from '@/assets/laptop-icons/icon-18.png.asset.json';
import i7 from '@/assets/laptop-icons/icon-19.png.asset.json';
import i8 from '@/assets/laptop-icons/icon-20.png.asset.json';
import i9 from '@/assets/laptop-icons/icon-21.png.asset.json';

const ICONS = [i1, i2, i3, i4, i5, i6, i7, i8, i9].map((i) => i.url);
const MAX = 7; // simultaneous icons
const COOLDOWN = 900; // ms between bursts
const rand = (a: number, b: number) => a + Math.random() * (b - a);

type Particle = { id: number; src: string; x: number; y: number; dx: number; dy: number; r: number; s: number; dur: number };

/** Icons popping out of the laptop screen, layered over the illustration. */
export function LaptopIdeaBurst({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const [items, setItems] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const lastIcon = useRef(-1);
  const hover = useRef(false);
  const lastBurst = useRef(0);
  const reduced = useRef(false);

  const spawn = useCallback(() => {
    setItems((cur) => {
      if (cur.length >= MAX) return cur;
      let k = Math.floor(Math.random() * ICONS.length);
      if (k === lastIcon.current) k = (k + 1) % ICONS.length;
      lastIcon.current = k;
      // origin: the laptop lid (percent of the frame); drift up-right, away from the face
      const p: Particle = {
        id: ++idRef.current, src: ICONS[k] ?? ICONS[0]!,
        x: rand(60, 74), y: rand(54, 62),
        dx: rand(8, 24), dy: rand(-48, -34), r: rand(-18, 18), s: rand(0.85, 1.1), dur: rand(2.6, 3.6),
      };
      return [...cur, p];
    });
  }, []);

  const burst = useCallback(() => {
    const now = performance.now();
    if (now - lastBurst.current < COOLDOWN) return;
    lastBurst.current = now;
    const n = Math.random() < 0.5 ? 2 : 3;
    for (let i = 0; i < n; i++) setTimeout(spawn, i * rand(110, 200));
  }, [spawn]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (hover.current) burst(); else spawn();
      t = setTimeout(loop, hover.current ? rand(1000, 1500) : rand(2800, 6500));
    };
    t = setTimeout(loop, 1200);
    return () => clearTimeout(t);
  }, [burst, spawn]);

  const remove = (id: number) => setItems((c) => c.filter((p) => p.id !== id));
  const enter = () => { if (reduced.current) return; hover.current = true; burst(); };
  const leave = () => { hover.current = false; };

  return (
    <div className="laptop-burst" style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={src} width={width} height={height} alt={alt} className="laptop-burst-img" draggable={false} />
      <div className="laptop-burst-layer" aria-hidden="true">
        {items.map((p) => (
          <img
            key={p.id} src={p.src} alt="" className="laptop-burst-icon" onAnimationEnd={() => remove(p.id)}
            style={{
              left: `${p.x}%`, top: `${p.y}%`, animationDuration: `${p.dur}s`,
              ['--dx' as string]: `${p.dx}%`, ['--dy' as string]: `${p.dy}%`, ['--r' as string]: `${p.r}deg`, ['--s' as string]: p.s,
            }}
          />
        ))}
      </div>
      {/* hotspot over the laptop */}
      <span
        className="laptop-burst-hotspot" data-testid="laptop-hotspot"
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') enter(); }}
        onPointerLeave={leave}
        onPointerDown={(e) => { if (e.pointerType !== 'mouse') { hover.current = false; lastBurst.current = 0; if (!reduced.current) burst(); } }}
      />
    </div>
  );
}

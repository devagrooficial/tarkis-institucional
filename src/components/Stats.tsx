import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 99,   suffix: '%', label: 'Uptime garantido',             desc: 'SLA enterprise' },
  { value: 120,  suffix: '+', label: 'Empresas atendidas',           desc: 'em todo o Brasil' },
  { value: 3200, suffix: '+', label: 'Contratos digitais/mês',       desc: 'via Assinafy' },
  { value: 0,    suffix: '',  label: 'Papel no processo',            desc: 'eliminação total' },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (target === 0) { setVal(0); return; }
    let frame: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return val;
}

function StatItem({ value, suffix, label, desc, inView }: typeof STATS[0] & { inView: boolean }) {
  const count = useCountUp(value, 1600, inView);
  return (
    <div className="text-center px-6 py-8 relative">
      <div className="font-heading font-black text-5xl xl:text-6xl text-white tabular-nums leading-none mb-2">
        {value === 0 ? '0' : count.toLocaleString('pt-BR')}
        <span className="text-emerald">{suffix}</span>
      </div>
      <p className="text-white font-semibold text-base mb-1">{label}</p>
      <p className="text-white/45 text-sm">{desc}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-emerald relative overflow-hidden">
      {/* subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/20">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

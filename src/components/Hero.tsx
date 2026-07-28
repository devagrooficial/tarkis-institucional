import { useEffect, useRef } from 'react';
import { ArrowRight, Play, Zap, Shield, BarChart3 } from 'lucide-react';
import OperationalFlow from './OperationalFlow';

const BADGES = [
  { icon: <Zap size={12} />,       label: 'Tempo Real' },
  { icon: <Shield size={12} />,    label: 'Conformidade LGPD' },
  { icon: <BarChart3 size={12} />, label: 'Analytics 360°' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('[data-animate]').forEach((child, i) => {
      child.style.animationDelay = `${i * 120}ms`;
      child.classList.add('animate-slide-up', 'animation-fill-both');
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-petroleum"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 bg-dot-pattern bg-dot-md pointer-events-none opacity-40"
        style={{ backgroundSize: '32px 32px' }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald/8 blur-[80px] pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[80vh]">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-7">

            {/* Eyebrow badges */}
            <div data-animate className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b.label} className="badge-emerald gap-1.5">
                  {b.icon}{b.label}
                </span>
              ))}
            </div>

            {/* Headline */}
            <div data-animate>
              <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight text-balance">
                Sua operação de campo{' '}
                <span className="gradient-text">sob controle total.</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p data-animate className="text-white/65 text-lg leading-relaxed max-w-lg">
              Do onboarding do operador ao contrato assinado digitalmente, do
              agendamento da diária ao pagamento aprovado —{' '}
              <strong className="text-white/85 font-semibold">
                tudo em um único painel, em tempo real, sem papel e sem retrabalho.
              </strong>
            </p>

            {/* CTAs */}
            <div data-animate className="flex flex-wrap gap-3">
              <a href="#contato" className="btn-primary text-base px-7 py-3.5 group">
                Agendar Demonstração
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a href="#demo" className="btn-outline-white text-base px-7 py-3.5 group">
                <Play size={16} className="text-emerald" />
                Ver a Plataforma
              </a>
            </div>

            {/* Social proof strip */}
            <div data-animate className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['#0A2E36', '#00A896', '#0D3B47', '#008A7A'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-petroleum flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: c }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-white/55 text-sm">
                <strong className="text-white/80">+120 empresas</strong> gerenciam
                suas equipes com o Tarkis
              </p>
            </div>
          </div>

          {/* ── Right: React Flow diagram ── */}
          <div data-animate className="relative w-full h-[500px] xl:h-[560px]">

            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-3xl border border-emerald/20 shadow-emerald-lg" />
            <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-br from-emerald/5 to-transparent" />

            {/* Corner decorations */}
            {[
              'top-0 left-0 border-t-2 border-l-2 rounded-tl-3xl',
              'top-0 right-0 border-t-2 border-r-2 rounded-tr-3xl',
              'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-3xl',
              'bottom-0 right-0 border-b-2 border-r-2 rounded-br-3xl',
            ].map((cls) => (
              <div key={cls} className={`absolute w-8 h-8 border-emerald/60 ${cls}`} />
            ))}

            {/* Header bar */}
            <div className="absolute top-0 inset-x-0 h-10 bg-petroleum-dark/80 backdrop-blur border-b border-emerald/15 rounded-t-3xl flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-emerald/60" />
              <span className="ml-3 text-white/30 text-xs font-mono">
                tarkis.com.br — Torre · Controle Logístico
              </span>
            </div>

            {/* Flow diagram */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pt-10">
              <OperationalFlow />
            </div>

            {/* Floating stats */}
            <FloatingStat
              top="18%"
              right="-5%"
              label="Veículos em rota"
              value="312"
              delta="+8% esta semana"
            />
            <FloatingStat
              bottom="22%"
              left="-5%"
              label="Entregas concluídas"
              value="1.8k"
              delta="hoje"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function FloatingStat({
  top, bottom, left, right, label, value, delta,
}: {
  top?: string; bottom?: string; left?: string; right?: string;
  label: string; value: string; delta: string;
}) {
  return (
    <div
      className="absolute z-20 hidden lg:block"
      style={{ top, bottom, left, right }}
    >
      <div className="bg-petroleum-dark/90 backdrop-blur-md border border-emerald/25 rounded-2xl px-4 py-3 shadow-card-dark animate-float">
        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white font-heading font-bold text-xl leading-none">{value}</p>
        <p className="text-emerald text-[10px] mt-1">{delta}</p>
      </div>
    </div>
  );
}

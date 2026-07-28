import { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, Users, Calculator, Scale, Radio,
  ArrowRight,
} from 'lucide-react';

const PROFILES = [
  {
    icon: <TrendingUp size={22} />,
    role: 'Diretor de Operações',
    pain: 'Falta de visibilidade em tempo real sobre a operação de campo.',
    solution: 'Dashboard analítico com KPIs ao vivo, mapa geográfico e Torre de Controle para decisões imediatas.',
    tag: 'Estratégico',
    tagColor: 'bg-petroleum text-white',
  },
  {
    icon: <Users size={22} />,
    role: 'Gerente de RH / Field Service',
    pain: 'Processo manual de onboarding, aprovação e documentação de prestadores.',
    solution: 'Módulo de Operadores com ciclo completo: cadastro, pesquisa GR, aprovação e histórico individual.',
    tag: 'Operacional',
    tagColor: 'bg-emerald text-white',
  },
  {
    icon: <Calculator size={22} />,
    role: 'Financeiro',
    pain: 'Conciliação manual entre diárias executadas, ordens de pagamento e notas fiscais.',
    solution: 'Automação do ciclo financeiro: diária → ordem de pagamento → faturamento, com Kanban visual.',
    tag: 'Financeiro',
    tagColor: 'bg-blue-600 text-white',
  },
  {
    icon: <Scale size={22} />,
    role: 'Jurídico / Compliance',
    pain: 'Contratos em papel, sem rastreabilidade, sem assinatura eletrônica padronizada.',
    solution: 'Geração em lote + integração Assinafy. Repositório completo auditável com filtros avançados.',
    tag: 'Conformidade',
    tagColor: 'bg-violet-600 text-white',
  },
  {
    icon: <Radio size={22} />,
    role: 'Supervisor de Campo',
    pain: 'Comunicação fragmentada com a equipe, sem visibilidade de presença e confirmações.',
    solution: 'Verificação de presença, rastreio de diária e notificações push — tudo centralizado.',
    tag: 'Campo',
    tagColor: 'bg-amber-600 text-white',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ForWho() {
  const { ref, visible } = useInView();

  return (
    <section id="para-quem" className="bg-silver-light py-24">
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow">
            <span className="w-6 h-px bg-emerald" />
            Para Quem
            <span className="w-6 h-px bg-emerald" />
          </span>
          <h2 className="section-title mt-4">
            O Tarkis resolve a sua{' '}
            <span className="gradient-text">dor específica</span>
          </h2>
          <p className="text-petroleum/60 text-lg mt-4">
            Cada perfil dentro da empresa tem um problema distinto. O Tarkis ADM foi
            desenhado para resolvê-los simultaneamente, em uma única plataforma.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6"
        >
          {PROFILES.map((p, i) => (
            <div
              key={p.role}
              className={`
                card-light flex flex-col gap-4 group
                transition-all duration-600
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Role header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="feature-icon group-hover:bg-emerald group-hover:text-white transition-colors duration-300">
                    {p.icon}
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.tagColor}`}>
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-bold text-petroleum text-base leading-snug">
                {p.role}
              </h3>

              {/* Pain */}
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 mt-1.5 flex-shrink-0" />
                <p className="text-petroleum/55 text-sm leading-relaxed">
                  <strong className="text-petroleum/70 font-medium">Dor: </strong>
                  {p.pain}
                </p>
              </div>

              {/* Solution */}
              <div className="flex items-start gap-2 mt-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 flex-shrink-0" />
                <p className="text-petroleum/65 text-sm leading-relaxed">
                  <strong className="text-emerald-dark font-semibold">Solução: </strong>
                  {p.solution}
                </p>
              </div>
            </div>
          ))}

          {/* CTA card — oculto temporariamente, reativar quando comercialização for liberada */}
          {/* <div className="bg-petroleum rounded-2xl p-6 flex flex-col items-start justify-between gap-6 shadow-card-dark">
            <div>
              <h3 className="font-heading font-bold text-white text-xl mb-3 leading-tight">
                Pronto para transformar sua operação?
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Agende uma demonstração personalizada e veja como o Tarkis ADM
                se encaixa no fluxo da sua empresa.
              </p>
            </div>
            <a
              href="#contato"
              className="btn-primary text-sm group w-full justify-center"
            >
              Agendar Demonstração
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}

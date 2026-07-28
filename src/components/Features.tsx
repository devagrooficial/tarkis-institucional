import { useEffect, useRef, useState } from 'react';
import {
  BarChart3, Users, CreditCard, FileText,
  Activity, MapPin, Bell, Shield,
  Calendar, CheckCircle, DollarSign, FileCheck,
  Layers, Search, Building2, PenTool,
} from 'lucide-react';

/* ── Data ─────────────────────────────────────────── */
const PILLARS = [
  {
    id: 'pilar-1',
    number: '01',
    icon: <BarChart3 size={24} />,
    label: 'Inteligência Operacional',
    title: 'Visão 360° da sua operação, em tempo real.',
    description:
      'Chega de relatório manual em Excel enviado na sexta-feira. Com o Tarkis, a diretoria tem uma visão ao vivo da operação inteira — sem esperar ninguém compilar um relatório.',
    color: 'from-emerald/20 to-transparent',
    modules: [
      { icon: <BarChart3 size={16} />,   label: 'Dashboard Analítico',    desc: 'KPIs consolidados para alta gestão' },
      { icon: <Activity size={16} />,    label: 'Torre de Controle',      desc: 'Centro de controle em tempo real' },
      { icon: <MapPin size={16} />,      label: 'Mapa Geográfico',        desc: 'Distribuição espacial da operação' },
      { icon: <Bell size={16} />,        label: 'Notificações Push',      desc: 'Comunicação direta com a equipe' },
    ],
  },
  {
    id: 'pilar-2',
    number: '02',
    icon: <Users size={24} />,
    label: 'Gestão de Pessoas',
    title: 'Contrate, avalie, libere e gerencie. Em um único lugar.',
    description:
      'Esqueça as fichas de papel e as pastas no Google Drive. O Tarkis centraliza o cadastro de cada operador com todo o histórico de status — do candidato ao campo.',
    color: 'from-blue-500/15 to-transparent',
    modules: [
      { icon: <Users size={16} />,       label: 'Módulo de Operadores',   desc: 'Ciclo de vida completo' },
      { icon: <Search size={16} />,      label: 'Pesquisa GR',            desc: 'Antecedentes e qualificação' },
      { icon: <Shield size={16} />,      label: 'Aprovação / Reprovação', desc: 'Funil rastreável e auditável' },
      { icon: <Building2 size={16} />,   label: 'Clientes e Unidades',    desc: 'Base estruturada e conectada' },
    ],
  },
  {
    id: 'pilar-3',
    number: '03',
    icon: <CreditCard size={24} />,
    label: 'Automação Financeira',
    title: 'Da diária executada ao pagamento aprovado, sem planilha.',
    description:
      'Transforme o caos do agendamento em um processo fluido e auditável. Cada diária tem ciclo de vida claro e rastreado — do supervisor ao operador em campo.',
    color: 'from-violet-500/15 to-transparent',
    modules: [
      { icon: <Calendar size={16} />,    label: 'Módulo de Diárias',      desc: 'Criação, rastreio e aderência' },
      { icon: <CheckCircle size={16} />, label: 'Verificação de Presença', desc: 'Controle de início de diária' },
      { icon: <DollarSign size={16} />,  label: 'Ordem de Pagamento',     desc: 'Kanban visual de aprovação' },
      { icon: <Layers size={16} />,      label: 'Faturamento',            desc: 'Ciclo de cobrança completo' },
    ],
  },
  {
    id: 'pilar-4',
    number: '04',
    icon: <FileText size={24} />,
    label: 'Segurança Contratual',
    title: 'Contratos gerados em lote, assinados digitalmente.',
    description:
      'Elimine a papelada e a lentidão. Gere dezenas de contratos individualizados em segundos, com dados preenchidos automaticamente, e envie para assinatura digital sem sair do sistema.',
    color: 'from-amber-500/15 to-transparent',
    modules: [
      { icon: <FileCheck size={16} />,   label: 'Modelos Dinâmicos',      desc: 'Templates com variáveis automáticas' },
      { icon: <PenTool size={16} />,     label: 'Integração Assinafy',    desc: 'Assinatura eletrônica nativa' },
      { icon: <FileText size={16} />,    label: 'Geração em Lote',        desc: 'PDF ou ZIP por operador' },
      { icon: <Shield size={16} />,      label: 'Contratos Assinados',    desc: 'Repositório rastreável e auditável' },
    ],
  },
];

/* ── Intersection helper ──────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── PillarCard ───────────────────────────────────── */
function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const { ref, visible } = useFadeIn();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={pillar.id}
      className={`
        grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-16 lg:py-24
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Text side */}
      <div className={`flex flex-col gap-6 ${isEven ? '' : 'lg:order-2'}`}>
        <div className="flex items-center gap-3">
          <span className="text-emerald/40 font-mono font-bold text-sm tracking-widest">
            {pillar.number}
          </span>
          <div className="h-px flex-1 bg-emerald/20" />
        </div>

        <div>
          <span className="badge-emerald mb-3">{pillar.label}</span>
          <h3 className="section-title text-3xl sm:text-4xl mt-3 leading-tight">
            {pillar.title}
          </h3>
        </div>

        <p className="text-petroleum/65 text-lg leading-relaxed">
          {pillar.description}
        </p>

        {/* Module grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {pillar.modules.map((mod) => (
            <div
              key={mod.label}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-silver-light/60 hover:bg-silver transition-colors group cursor-default"
            >
              <div className="feature-icon w-8 h-8 flex-shrink-0 group-hover:bg-emerald/25 transition-colors">
                {mod.icon}
              </div>
              <div>
                <p className="font-semibold text-petroleum text-sm leading-tight mb-0.5">{mod.label}</p>
                <p className="text-petroleum/50 text-xs leading-tight">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual side */}
      <div className={`relative ${isEven ? '' : 'lg:order-1'}`}>
        <ModuleVisual pillar={pillar} />
      </div>
    </div>
  );
}

/* ── Pilar 1: Inteligência Operacional ───────────── */
function VisualIntelOp() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-white/50 text-xs">Atualizado agora</span>
        </div>
        <span className="text-white/25 text-xs">23/06 · 14:32</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { v: '2.348', l: 'Em Campo Agora' },
          { v: '99.2%', l: 'SLA Nacional'   },
          { v: '5.840', l: 'Diárias/Mês'    },
        ].map(({ v, l }) => (
          <div key={l} className="bg-white/5 rounded-xl p-3 text-center border border-white/8">
            <p className="text-white font-bold text-lg tabular-nums">{v}</p>
            <p className="text-white/30 text-[9px] mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/30 text-xs uppercase tracking-wider">Tendência Semanal</span>
          <div className="flex gap-3">
            <span className="text-[9px] text-blue-400 flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-400 inline-block"/>Diárias</span>
            <span className="text-[9px] text-emerald flex items-center gap-1"><span className="w-2 h-0.5 bg-emerald inline-block"/>SLA</span>
          </div>
        </div>
        <div className="relative h-16">
          <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 h-full">
            {[55,62,70,68,75,80,78].map((h,i) => (
              <div key={i} className="flex-1 bg-blue-400/25 rounded-t-sm" style={{ height:`${h}%` }}/>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 h-full">
            {[90,88,94,92,96,99,99].map((h,i) => (
              <div key={i} className="flex-1 bg-emerald/15 rounded-t-sm border-t border-emerald/60" style={{ height:`${h}%` }}/>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-1">
          {['S','T','Q','Q','S','S','D'].map((d,i) => (
            <span key={i} className="flex-1 text-center text-white/20 text-[9px]">{d}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-white/30 text-[10px] mb-2 uppercase tracking-wider">Distribuição por Estado</p>
        <div className="flex gap-1">
          {[['SP',100],['BA',95],['GO',82],['ES',78],['DF',70],['MT',65],['RJ',60],['PR',50]].map(([uf,pct]) => (
            <div key={uf} className="flex-1 text-center">
              <div
                className="h-8 rounded-md flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background:`rgba(0,168,150,${Number(pct)/200})` }}
              >{uf}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pilar 2: Gestão de Pessoas ──────────────────── */
function VisualGestaoPessoas() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/25"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span className="text-white/25 text-xs">Buscar operador, CPF ou unidade…</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {[
          { l:'Cadastro',  v:'22.8k', c:'bg-white/8'       },
          { l:'Análise',   v:'605',   c:'bg-yellow-400/15' },
          { l:'Liberado',  v:'16.7k', c:'bg-emerald/15'    },
          { l:'Reprovado', v:'3.0k',  c:'bg-red-400/10'    },
        ].map(({ l, v, c }) => (
          <div key={l} className={`${c} rounded-lg p-2 text-center`}>
            <p className="text-white font-bold text-sm">{v}</p>
            <p className="text-white/35 text-[9px] mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {[
          { name:'OPERADOR ALFA',  status:'Liberado',  badge:'bg-emerald/75',    uf:'SP' },
          { name:'OPERADOR BETA',  status:'Em Campo',  badge:'bg-blue-400/75',   uf:'GO' },
          { name:'OPERADOR GAMMA', status:'Análise',   badge:'bg-yellow-400/75', uf:'DF' },
          { name:'OPERADOR DELTA', status:'Liberado',  badge:'bg-emerald/75',    uf:'RJ' },
        ].map(({ name, status, badge, uf }) => (
          <div key={name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-xs font-bold flex-shrink-0">
                {name[9]}
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium">{name}</p>
                <p className="text-white/25 text-[9px]">{uf} · Cadastro GR</p>
              </div>
            </div>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full text-white ${badge}`}>{status}</span>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <div className="flex justify-between mb-1">
          <span className="text-white/30 text-[10px]">Taxa de Liberação</span>
          <span className="text-emerald text-[10px] font-semibold">73.3%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-emerald rounded-full" style={{ width:'73.3%' }}/>
        </div>
      </div>
    </div>
  );
}

/* ── Pilar 3: Automação Financeira ───────────────── */
function VisualFinanceiro() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-xs font-mono">16/06 — 25/06/2026</span>
        <div className="flex items-center gap-1.5 bg-emerald/15 px-2 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse"/>
          <span className="text-emerald text-[10px] font-semibold">Em processamento</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/8">
        <p className="text-white/40 text-[10px] mb-0.5">Valor total da ordem</p>
        <p className="text-white font-bold text-2xl tabular-nums">R$ 635.912,00</p>
        <p className="text-emerald text-xs mt-1">36 unidades · 101 operadores</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label:'Pendente',   count:8,  borderColor:'border-yellow-400/40', dotColor:'bg-yellow-400' },
          { label:'Em Revisão', count:5,  borderColor:'border-blue-400/40',   dotColor:'bg-blue-400'   },
          { label:'Aprovado',   count:23, borderColor:'border-emerald/40',    dotColor:'bg-emerald'    },
        ].map(({ label, count, borderColor, dotColor }) => (
          <div key={label} className={`rounded-xl border ${borderColor} bg-white/3 p-2.5 text-center`}>
            <div className="flex items-center justify-center gap-1 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}/>
              <span className="text-white/40 text-[9px]">{label}</span>
            </div>
            <p className="text-white font-bold text-xl">{count}</p>
            <p className="text-white/20 text-[9px]">ordens</p>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-white/25 text-[10px] uppercase tracking-wider">Últimas ordens</p>
        {[
          { id:'#7279', emp:'EMPRESA SP', v:'R$ 62.602', s:'Aprovado',   c:'text-emerald'     },
          { id:'#7280', emp:'EMPRESA RJ', v:'R$ 55.215', s:'Em Revisão', c:'text-blue-400'    },
          { id:'#7282', emp:'EMPRESA GO', v:'R$ 28.940', s:'Pendente',   c:'text-yellow-400'  },
        ].map(({ id, emp, v, s, c }) => (
          <div key={id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
            <span className="text-white/30 text-[9px] font-mono w-10">{id}</span>
            <span className="text-white/50 text-[10px] flex-1">{emp}</span>
            <span className="text-white/65 text-[10px] font-semibold">{v}</span>
            <span className={`text-[9px] font-semibold ${c}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pilar 4: Segurança Contratual ───────────────── */
function VisualContratos() {
  return (
    <div className="p-5 space-y-3">
      <div className="bg-white/5 rounded-xl p-4 border border-white/8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/50 text-xs font-medium">Lote atual</span>
          <span className="text-emerald text-xs font-semibold">101 contratos</span>
        </div>
        <div className="space-y-2">
          {[
            { l:'Gerados',  v:101, pct:100, bar:'bg-white/25'  },
            { l:'Enviados', v:98,  pct:97,  bar:'bg-blue-400'  },
            { l:'Assinados',v:62,  pct:61,  bar:'bg-emerald'   },
          ].map(({ l, v, pct, bar }) => (
            <div key={l}>
              <div className="flex justify-between mb-1">
                <span className="text-white/35 text-[9px]">{l}</span>
                <span className="text-white/55 text-[9px] font-semibold">{v}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${bar} rounded-full`} style={{ width:`${pct}%` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-white/25 text-[10px] uppercase tracking-wider">Contratos recentes</p>
        {[
          { name:'OPERADOR ALFA',  status:'Assinado', badge:'bg-emerald/75',    time:'14:32' },
          { name:'OPERADOR BETA',  status:'Enviado',  badge:'bg-blue-400/75',   time:'13:18' },
          { name:'OPERADOR GAMMA', status:'Assinado', badge:'bg-emerald/75',    time:'12:45' },
          { name:'OPERADOR DELTA', status:'Pendente', badge:'bg-yellow-400/75', time:'11:07' },
        ].map(({ name, status, badge, time }) => (
          <div key={name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-5 h-6 rounded bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-3 rounded-sm border border-white/30"/>
              </div>
              <span className="text-white/65 text-xs">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-[9px]">{time}</span>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full text-white ${badge}`}>{status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald/10 rounded-xl border border-emerald/25 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
        </div>
        <div>
          <p className="text-white/80 text-xs font-semibold">39 aguardando assinatura</p>
          <p className="text-white/35 text-[10px]">Via Assinafy · integração nativa</p>
        </div>
      </div>
    </div>
  );
}

/* ── Module visual card ───────────────────────────── */
const VISUAL_MAP: Record<string, () => JSX.Element> = {
  'pilar-1': VisualIntelOp,
  'pilar-2': VisualGestaoPessoas,
  'pilar-3': VisualFinanceiro,
  'pilar-4': VisualContratos,
};

function ModuleVisual({ pillar }: { pillar: typeof PILLARS[0] }) {
  const Visual = VISUAL_MAP[pillar.id] ?? VisualIntelOp;
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 to-transparent rounded-3xl blur-2xl" />
      <div className="relative bg-petroleum rounded-3xl border border-white/10 overflow-hidden shadow-card-dark">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-petroleum-dark/50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald/50" />
          <span className="ml-2 text-white/25 text-xs font-mono">Tarkis ADM · {pillar.label}</span>
        </div>
        <Visual />
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function Features() {
  return (
    <section id="solucao" className="bg-white overflow-hidden">
      {/* Header */}
      <div className="container pt-20 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-eyebrow">
            <span className="w-6 h-px bg-emerald" />
            A Plataforma
            <span className="w-6 h-px bg-emerald" />
          </span>
          <h2 className="section-title mt-4">
            Quatro pilares que{' '}
            <span className="gradient-text">eliminam o caos</span>{' '}
            da operação de campo
          </h2>
          <p className="text-petroleum/60 text-lg mt-4 leading-relaxed">
            Uma solução única que substitui planilhas, grupos de WhatsApp e processos manuais
            fragmentados — do onboarding do operador até a emissão da nota fiscal.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="container">
        <div className="divide-y divide-silver">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

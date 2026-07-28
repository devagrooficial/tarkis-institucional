import { useState, useRef, useEffect } from 'react';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   TELA 1 — Analítica Geral
   ══════════════════════════════════════════════════════ */
function AnalyticaGeralSVG() {
  return (
    <svg viewBox="0 0 860 468" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="860" height="468" fill="#f8fafc"/>

      {/* Header */}
      <rect width="860" height="62" fill="white"/>
      <text x="24" y="25" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="17" fill="#0A2E36">Analítica Geral</text>
      <rect x="182" y="13" width="116" height="20" rx="10" fill="#dcfce7"/>
      <circle cx="195" cy="23" r="4" fill="#16a34a"/>
      <text x="204" y="27" fontFamily="Inter,sans-serif" fontSize="10" fill="#16a34a">Operação Estável</text>
      <text x="24" y="46" fontFamily="Inter,sans-serif" fontSize="11" fill="#94a3b8">Métricas consolidadas de toda a operação — acesso restrito</text>
      <rect x="698" y="17" width="72" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="734" y="33" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569" textAnchor="middle">Junho ▾</text>
      <rect x="778" y="17" width="62" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="809" y="33" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569" textAnchor="middle">2026 ▾</text>
      <line x1="0" y1="62" x2="860" y2="62" stroke="#e2e8f0" strokeWidth="1"/>

      {/* 3 metric cards */}
      {[
        { x: 20,   label: 'Total de Diárias (Mês)',   value: '5.840', sub: 'Junho 2026',                  bg: '#eff6ff', dot: '#3b82f6' },
        { x: 300,  label: 'Falta de Tratamento — CH', value: '76',    sub: 'Semana atual · tende a zero', bg: '#fff7ed', dot: '#f97316' },
        { x: 580,  label: 'Verificado pela Torre',    value: '142',   sub: 'Semana atual',                bg: '#f0fdf4', dot: '#22c55e' },
      ].map(({ x, label, value, sub, bg, dot }) => (
        <g key={label}>
          <rect x={x} y="76" width="260" height="78" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <text x={x+20} y="98" fontFamily="Inter,sans-serif" fontSize="11" fill="#64748b">{label}</text>
          <text x={x+20} y="128" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="22" fill="#0A2E36">{value}</text>
          <text x={x+20} y="146" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">{sub}</text>
          <rect x={x+230} y="85" width="24" height="24" rx="6" fill={bg}/>
          <circle cx={x+242} cy="97" r="5" fill={dot} fillOpacity="0.7"/>
        </g>
      ))}

      {/* Line chart */}
      <rect x="20" y="166" width="820" height="184" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="40" y="186" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="13" fill="#0A2E36">Tendência Semanal</text>
      <text x="40" y="200" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">Diárias vs Falta de Tratamento · CH · semana atual</text>
      <rect x="40" y="207" width="8" height="8" rx="2" fill="#3b82f6"/>
      <text x="52" y="215" fontFamily="Inter,sans-serif" fontSize="9" fill="#64748b">Diárias</text>
      <rect x="90" y="207" width="8" height="8" rx="2" fill="#ef4444"/>
      <text x="102" y="215" fontFamily="Inter,sans-serif" fontSize="9" fill="#64748b">Falta de Tratamento</text>
      {/* grid */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <line x1="76" y1={222+i*26} x2="830" y2={222+i*26} stroke="#f1f5f9" strokeWidth="0.8"/>
          <text x="70" y={226+i*26} fontFamily="Inter,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="end">{80-i*20}</text>
        </g>
      ))}
      {['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map((d,i) => (
        <text key={d} x={112+i*108} y="340" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8" textAnchor="middle">{d}</text>
      ))}
      {/* Diárias */}
      <polyline points="112,229 220,238 328,252 436,290 544,320 652,328 760,330"
        fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon  points="76,330 112,229 220,238 328,252 436,290 544,320 652,328 760,330 830,330"
        fill="#3b82f6" fillOpacity="0.08"/>
      {/* Faltas */}
      <polyline points="112,328 220,314 328,288 436,286 544,308 652,324 760,330"
        fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon  points="76,330 112,328 220,314 328,288 436,286 544,308 652,324 760,330 830,330"
        fill="#ef4444" fillOpacity="0.06"/>

      {/* Bottom: ranking + donut */}
      <rect x="20" y="360" width="468" height="92" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="40" y="380" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#0A2E36">Ranking por Unidade</text>
      <text x="40" y="393" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">Volume de diárias no período</text>
      {[
        { name:'EMPRESA SP', w:360, val:'[168 - #1.140]' },
        { name:'EMPRESA RJ', w:292, val:'[124 - #1.068]' },
        { name:'EMPRESA GO', w:122, val:'[54 - #448]' },
      ].map(({name,w,val},i) => (
        <g key={name}>
          <rect x="40" y={398+i*17} width={w} height="11" rx="3" fill="#dbeafe"/>
          <text x="46" y={407+i*17} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#1e40af">{name}</text>
          <text x="424" y={407+i*17} fontFamily="Inter,sans-serif" fontSize="8" fill="#64748b" textAnchor="end">{val}</text>
        </g>
      ))}

      <rect x="500" y="360" width="340" height="92" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="520" y="378" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#0A2E36">Market Share por Cliente</text>
      {/* donut arc */}
      <circle cx="548" cy="417" r="21" fill="none" stroke="#3b82f6"  strokeWidth="14" strokeDasharray="84 48"/>
      <circle cx="548" cy="417" r="21" fill="none" stroke="#00A896"  strokeWidth="14" strokeDasharray="29 103" strokeDashoffset="-84"/>
      <circle cx="548" cy="417" r="21" fill="none" stroke="#f59e0b"  strokeWidth="14" strokeDasharray="13 119" strokeDashoffset="-113"/>
      <circle cx="548" cy="417" r="11" fill="white"/>
      <text x="548" y="420" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="7.5" fill="#0A2E36" textAnchor="middle">910k</text>
      {[['#3b82f6','Empresa A'],['#00A896','Empresa B'],['#f59e0b','Empresa C']].map(([c,l],i)=>(
        <g key={l}>
          <circle cx="600" cy={398+i*16} r="5" fill={c}/>
          <text x="610" y={402+i*16} fontFamily="Inter,sans-serif" fontSize="9" fill="#64748b">{l}</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   TELA 2 — Dashboard Operadores
   ══════════════════════════════════════════════════════ */
function OperadoresSVG() {
  const funnel = [
    { label:'Total na Base',  val:'22.863', pct:'100%', c:'#64748b' },
    { label:'Aguardando',     val:'605',    pct:'2.6%',  c:'#f59e0b' },
    { label:'Divergente',     val:'2.351',  pct:'10.3%', c:'#f97316' },
    { label:'Reprovados',     val:'3.092',  pct:'13.5%', c:'#ef4444' },
    { label:'Liberados',      val:'16.749', pct:'73.3%', c:'#22c55e' },
  ];
  const engage = [
    { label:'Ativos (já fizeram diária)', val:'2.348', badge:'Alta',        bc:'#dcfce7', bt:'#16a34a' },
    { label:'Ociosos (+30d sem diária)',  val:'1.461', badge:'Atenção',     bc:'#fef3c7', bt:'#d97706' },
    { label:'Conversão (Ativos/Liberados)',val:'14.0%',badge:'Taxa saudável',bc:'#f0fdf4', bt:'#16a34a' },
    { label:'Novos Cadastros (Mês)',      val:'5.185', badge:'+Mês',        bc:'#eff6ff', bt:'#3b82f6' },
  ];
  const tops = ['OPERADOR A','OPERADOR B','OPERADOR C','OPERADOR D','OPERADOR E'];
  const topv = [38,36,29,24,23];
  return (
    <svg viewBox="0 0 860 468" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="860" height="468" fill="#f8fafc"/>

      {/* Header */}
      <rect width="860" height="62" fill="white"/>
      <text x="24" y="25" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="17" fill="#0A2E36">Dashboard — Operadores</text>
      <text x="24" y="46" fontFamily="Inter,sans-serif" fontSize="11" fill="#94a3b8">Funil de cadastro, engajamento e distribuição da força de trabalho.</text>
      <rect x="664" y="17" width="72" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="700" y="33" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569" textAnchor="middle">Junho ▾</text>
      <rect x="744" y="17" width="62" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="775" y="33" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569" textAnchor="middle">2026 ▾</text>
      <rect x="814" y="17" width="28" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="828" y="33" fontFamily="Inter,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">↻</text>
      <line x1="0" y1="62" x2="860" y2="62" stroke="#e2e8f0" strokeWidth="1"/>

      {/* Funnel section */}
      <text x="24" y="80" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#334155">Funil de Cadastro</text>
      {funnel.map(({label,val,pct,c},i) => (
        <g key={label}>
          <rect x={20+i*166} y="86" width="158" height="70" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x={20+i*166} y="86" width="158" height="4" rx="2" fill={c} fillOpacity="0.7"/>
          <text x={30+i*166} y="106" fontFamily="Inter,sans-serif" fontSize="10" fill="#64748b">{label}</text>
          <text x={30+i*166} y="135" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="20" fill="#0A2E36">{val}</text>
          <text x={158+i*166} y="106" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill={c} textAnchor="end">{pct}</text>
        </g>
      ))}

      {/* Engagement section */}
      <text x="24" y="176" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#334155">Engajamento Operacional</text>
      {engage.map(({label,val,badge,bc,bt},i) => (
        <g key={label}>
          <rect x={20+i*210} y="182" width="202" height="62" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <text x={36+i*210} y="202" fontFamily="Inter,sans-serif" fontSize="10" fill="#64748b">{label}</text>
          <text x={36+i*210} y="228" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="18" fill="#0A2E36">{val}</text>
          <rect x={158+i*210} y="222" width={label.length>20?60:50} height="14" rx="7" fill={bc}/>
          <text x={188+i*210-(label.length>20?0:0)} y="232" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill={bt} textAnchor="middle">{badge}</text>
        </g>
      ))}

      {/* Distribution area */}
      <text x="24" y="268" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#334155">Distribuição e Performance</text>

      {/* Top 5 bar chart */}
      <rect x="20" y="276" width="280" height="176" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="36" y="295" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="11" fill="#0A2E36">Top 5 Operadores — Volume de Diárias</text>
      <text x="36" y="308" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">OPERADOR</text>
      <text x="254" y="308" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8" textAnchor="end">DIÁRIAS</text>
      {tops.map((name,i)=>(
        <g key={name}>
          <rect x="36" y={312+i*26} width={Math.round((topv[i]/38)*182)} height="14" rx="4" fill="#99f6e4"/>
          <text x="42" y={323+i*26} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="500" fill="#0A2E36">{name}</text>
          <text x="254" y={323+i*26} fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill="#0A2E36" textAnchor="end">{topv[i]}</text>
        </g>
      ))}

      {/* Donut */}
      <rect x="314" y="276" width="250" height="176" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="334" y="295" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="11" fill="#0A2E36">Distribuição por Cliente</text>
      <circle cx="438" cy="376" r="52" fill="none" stroke="#3b82f6"  strokeWidth="28" strokeDasharray="195 131"/>
      <circle cx="438" cy="376" r="52" fill="none" stroke="#00A896"  strokeWidth="28" strokeDasharray="68 258" strokeDashoffset="-195"/>
      <circle cx="438" cy="376" r="52" fill="none" stroke="#8b5cf6"  strokeWidth="28" strokeDasharray="42 284" strokeDashoffset="-263"/>
      <circle cx="438" cy="376" r="52" fill="none" stroke="#f59e0b"  strokeWidth="28" strokeDasharray="21 305" strokeDashoffset="-305"/>
      <circle cx="438" cy="376" r="30" fill="white"/>
      <text x="438" y="380" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="11" fill="#0A2E36" textAnchor="middle">14.766</text>
      <rect x="314" y="433" width="250" height="14" rx="0" fill="transparent"/>
      {[['#3b82f6','Empresa A'],['#00A896','Empresa B'],['#8b5cf6','Empresa C'],['#f59e0b','Empresa D']].map(([c,l],i)=>(
        <g key={l}>
          <rect x={316+i*62} y="438" width="42" height="10" rx="5" fill={c} fillOpacity="0.2"/>
          <text x={337+i*62} y="446" fontFamily="Inter,sans-serif" fontSize="7" fill={c} fontWeight="600" textAnchor="middle">{l}</text>
        </g>
      ))}

      {/* Density table */}
      <rect x="578" y="276" width="262" height="176" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="596" y="295" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="11" fill="#0A2E36">Densidade por Estado</text>
      <text x="596" y="308" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">ESTADO</text>
      <text x="826" y="308" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8" textAnchor="end">OPERADORES</text>
      {[['BA',3310],['SP',2335],['GO',2312],['ES',2188],['MT',1933],['DF',1813],['SC',1549],['PR',1446]].map(([uf,v],i)=>(
        <g key={uf}>
          <rect x="596" y={312+i*18} width={Math.round((v/3310)*178)} height="12" rx="3" fill="#dbeafe"/>
          <text x="600" y={321+i*18} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#1e40af">{uf}</text>
          <text x="826" y={321+i*18} fontFamily="Inter,sans-serif" fontSize="8" fill="#0A2E36" textAnchor="end">{v.toLocaleString('pt-BR')}</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   TELA 3 — Gerar Ordem de Pagamento
   ══════════════════════════════════════════════════════ */
function PagamentoSVG() {
  const units = [
    ['EMPRESA PALMAS',   'R$ 62.602,00'],
    ['EMPRESA CRAVINHOS','R$ 55.215,00'],
    ['EMPRESA JOINVILLE','R$ 18.440,00'],
    ['EMPRESA ITAJAI',   'R$ 28.130,00'],
    ['EMPRESA DOURADOS', 'R$ 28.940,00'],
    ['EMPRESA PORTO VLH','R$ 15.320,00'],
    ['EMPRESA CAMPINA',  'R$ 29.165,00'],
    ['EMPRESA LAGES',    'R$ 8.390,00'],
    ['EMPRESA CUIABA',   'R$ 100.555,00'],
    ['EMPRESA PETRO',    'R$ 44.715,00'],
  ];
  const ids = ['#7279','#7280','#7282','#7300','#7335','#7349','#7352','#7354','#7355','#7365','#7386','#7387'];
  return (
    <svg viewBox="0 0 860 468" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="860" height="468" fill="#f8fafc"/>

      {/* Header */}
      <rect width="860" height="62" fill="white"/>
      <text x="24" y="25" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="17" fill="#0A2E36">Gerar Ordem de Pagamento</text>
      <text x="24" y="46" fontFamily="Inter,sans-serif" fontSize="11" fill="#94a3b8">Selecione o período, escolha a unidade e revise as listas antes de gerar.</text>
      <rect x="610" y="17" width="234" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="630" y="29" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">PERÍODO DE FATURAMENTO</text>
      <text x="630" y="40" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#0A2E36">✓ 16/06/2026 — 25/06/2026</text>
      <line x1="0" y1="62" x2="860" y2="62" stroke="#e2e8f0" strokeWidth="1"/>

      {/* Left panel: units */}
      <rect x="0" y="62" width="290" height="406" fill="white" stroke="#e2e8f0" strokeWidth="0"/>
      <rect x="10" y="72" width="270" height="32" rx="6" fill="#f1f5f9"/>
      <text x="22" y="84" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">PERÍODO</text>
      <text x="22" y="96" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#0A2E36">16/06/2026 - 25/06/2026</text>
      <text x="170" y="92" fontFamily="Inter,sans-serif" fontSize="9" fill="#0A2E36">36 unidades</text>
      <text x="258" y="92" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#00A896" textAnchor="end">R$ 635.912,00</text>
      <rect x="10" y="108" width="270" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="22" y="124" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">Pesquisar unidade...</text>
      {/* Selected unit */}
      <rect x="10" y="136" width="270" height="30" rx="6" fill="#6366f1" stroke="none"/>
      <text x="22" y="156" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="white">EMPRESA PALMAS</text>
      <text x="270" y="156" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="end">R$ 62.602,00</text>
      {units.slice(1).map(([name,val],i)=>(
        <g key={name}>
          <rect x="10" y={170+i*28} width="270" height="26" rx="6" fill={i%2===0?'white':'#fafafa'} stroke="none"/>
          <text x="22" y={186+i*28} fontFamily="Inter,sans-serif" fontSize="10" fill="#334155">{name}</text>
          <text x="270" y={186+i*28} fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#00A896" textAnchor="end">{val}</text>
        </g>
      ))}
      <line x1="290" y1="62" x2="290" y2="468" stroke="#e2e8f0" strokeWidth="1"/>

      {/* Center panel: IDs */}
      <rect x="290" y="62" width="150" height="406" fill="#0A2E36" stroke="none"/>
      <text x="310" y="85" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="11" fill="white">UNIDADE SELECIONADA</text>
      <text x="310" y="100" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="13" fill="white">EMPRESA PALMAS</text>
      <text x="310" y="117" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="16" fill="#00A896">R$ 62.602,00</text>
      <rect x="350" y="112" width="44" height="14" rx="7" fill="#00A896" fillOpacity="0.25"/>
      <text x="372" y="122" fontFamily="Inter,sans-serif" fontSize="9" fill="#00A896" fontWeight="600" textAnchor="middle">101 IDs</text>
      <rect x="308" y="130" width="124" height="22" rx="6" fill="#0D3B47"/>
      <text x="320" y="144" fontFamily="Inter,sans-serif" fontSize="10" fill="#ffffff80">Pesquisar ID...</text>
      {ids.map((id,i)=>(
        <g key={id}>
          <rect x="308" y={156+i*24} width="124" height="22" rx="4" fill={i===0?'#0D3B47':'transparent'}/>
          <text x="320" y={171+i*24} fontFamily="Inter,sans-serif" fontSize="11" fontWeight={i===0?'700':'400'} fill={i===0?'white':'#ffffff80'}>{id}</text>
        </g>
      ))}
      <line x1="440" y1="62" x2="440" y2="468" stroke="#0D3B47" strokeWidth="1"/>

      {/* Right panel: detail */}
      <rect x="440" y="62" width="420" height="406" fill="white"/>
      <text x="458" y="84" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#0A2E36">Detalhamento da Ordem</text>
      <text x="458" y="98" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">Execuções · Faltas · Financeiro</text>

      {/* Execuções block */}
      <rect x="448" y="106" width="402" height="130" rx="8" fill="#4f46e5" fillOpacity="0.08" stroke="#4f46e5" strokeWidth="0.5"/>
      <rect x="448" y="106" width="402" height="26" rx="8" fill="#4f46e5"/>
      <text x="460" y="123" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="11" fill="white">EXECUÇÕES</text>
      <circle cx="836" cy="119" r="9" fill="white" fillOpacity="0.2"/>
      <text x="836" y="123" fontFamily="Inter,sans-serif" fontSize="9" fill="white" fontWeight="700" textAnchor="middle">5</text>
      {/* Table header */}
      {['ID','CHECKIN','CHECKOUT','STATUS','OPERADOR'].map((h,i)=>(
        <text key={h} x={[462,496,560,624,680][i]} y="146" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#4f46e5">{h}</text>
      ))}
      {[
        ['#47739','16/06 08:00','16/06 16:20','finalizado','OPERADOR A'],
        ['#47740','16/06 08:00','16/06 16:20','finalizado','OPERADOR B'],
        ['#47741','16/06 08:00','16/06 16:20','finalizado','OPERADOR C'],
        ['#47742','16/06 08:00','16/06 16:20','finalizado','OPERADOR D'],
        ['#47743','16/06 08:00','16/06 16:20','finalizado','OPERADOR E'],
      ].map(([id,ci,co,st,op],i)=>(
        <g key={id}>
          <text x="462" y={158+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#4f46e5">{id}</text>
          <text x="496" y={158+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#334155">{ci}</text>
          <text x="560" y={158+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#334155">{co}</text>
          <rect x="620" y={151+i*14} width="46" height="11" rx="5" fill="#dcfce7"/>
          <text x="643" y={159+i*14} fontFamily="Inter,sans-serif" fontSize="7.5" fill="#16a34a" fontWeight="600" textAnchor="middle">{st}</text>
          <text x="680" y={158+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#334155">{op}</text>
        </g>
      ))}

      {/* Faltas block */}
      <rect x="448" y="244" width="402" height="40" rx="8" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="0.5"/>
      <rect x="448" y="244" width="402" height="22" rx="8" fill="#ef4444"/>
      <text x="460" y="259" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="11" fill="white">FALTAS</text>
      <circle cx="836" cy="255" r="9" fill="white" fillOpacity="0.2"/>
      <text x="836" y="259" fontFamily="Inter,sans-serif" fontSize="9" fill="white" fontWeight="700" textAnchor="middle">0</text>
      <text x="640" y="276" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">Nenhuma falta registrada.</text>

      {/* Lembretes block */}
      <rect x="448" y="292" width="402" height="100" rx="8" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="0.5"/>
      <rect x="448" y="292" width="402" height="22" rx="8" fill="#f59e0b"/>
      <text x="460" y="307" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="11" fill="white">LEMBRETES DE CONTAS</text>
      <circle cx="836" cy="303" r="9" fill="white" fillOpacity="0.2"/>
      <text x="836" y="307" fontFamily="Inter,sans-serif" fontSize="9" fill="white" fontWeight="700" textAnchor="middle">5</text>
      {['ID','VALOR','DESCRIÇÃO','STATUS','OPERADOR'].map((h,i)=>(
        <text key={h} x={[462,500,560,656,720][i]} y="326" fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#d97706">{h}</text>
      ))}
      {[
        ['#49311','R$ 130,00','DIÁRIA #7279 - EMP...','Confirmados','OPERADOR A'],
        ['#49312','R$ 130,00','DIÁRIA #7279 - EMP...','Confirmados','OPERADOR B'],
        ['#49313','R$ 150,00','DIÁRIA #7279 - EMP...','Confirmados','OPERADOR C'],
      ].map(([id,val,desc,st,op],i)=>(
        <g key={id}>
          <text x="462" y={337+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#d97706">{id}</text>
          <text x="500" y={337+i*14} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#334155">{val}</text>
          <text x="560" y={337+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#334155">{desc}</text>
          <rect x="652" y={330+i*14} width="56" height="11" rx="5" fill="#fef3c7"/>
          <text x="680" y={338+i*14} fontFamily="Inter,sans-serif" fontSize="7.5" fill="#d97706" fontWeight="600" textAnchor="middle">{st}</text>
          <text x="720" y={337+i*14} fontFamily="Inter,sans-serif" fontSize="8" fill="#334155">{op}</text>
        </g>
      ))}

      {/* CTA gerar button */}
      <rect x="448" y="398" width="402" height="36" rx="8" fill="#00A896"/>
      <text x="640" y="421" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="13" fill="white" textAnchor="middle">Gerar Ordem em Lote</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   TELA 4 — Status de Assinaturas
   ══════════════════════════════════════════════════════ */
function AssinaturasSVG() {
  const estados = [
    { uf:'DF', val:86, pct:100 },
    { uf:'RJ', val:83, pct:97 },
    { uf:'ES', val:77, pct:90 },
    { uf:'GO', val:56, pct:65 },
    { uf:'MT', val:51, pct:59 },
  ];
  const rows = [
    { name:'OPERADOR ALFA',    cpf:'074·····-88', uf:'GO', date:'24/06/2026 21:39' },
    { name:'OPERADOR BETA',    cpf:'705·····-60', uf:'MT', date:'24/06/2026 21:21' },
    { name:'OPERADOR GAMMA',   cpf:'317·····-11', uf:'SC', date:'24/06/2026 18:50' },
    { name:'OPERADOR DELTA',   cpf:'028·····-55', uf:'SP', date:'24/06/2026 17:32' },
    { name:'OPERADOR EPSILON', cpf:'441·····-30', uf:'RJ', date:'24/06/2026 16:14' },
    { name:'OPERADOR ZETA',    cpf:'892·····-72', uf:'DF', date:'24/06/2026 15:08' },
    { name:'OPERADOR ETA',     cpf:'561·····-04', uf:'ES', date:'24/06/2026 14:23' },
  ];
  return (
    <svg viewBox="0 0 860 468" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="860" height="468" fill="#f8fafc"/>

      {/* Header */}
      <rect width="860" height="62" fill="white"/>
      <text x="24" y="25" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="17" fill="#0A2E36">Status de Assinaturas</text>
      <text x="24" y="46" fontFamily="Inter,sans-serif" fontSize="11" fill="#94a3b8">Monitoramento de contratos pendentes e assinados por estado.</text>
      <text x="718" y="26" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">FILTRAR POR REGIÃO</text>
      <rect x="718" y="32" width="126" height="22" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="730" y="46" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2E36">Brasil (Geral) ▾</text>
      <line x1="0" y1="62" x2="860" y2="62" stroke="#e2e8f0" strokeWidth="1"/>

      {/* 3 metric cards */}
      {[
        { x:20,  label:'Aptos a Assinar (Pendentes)',    val:'3.520', sub:'Operadores liberados com diárias e sem assinatura', c:'#3b82f6' },
        { x:314, label:'Contratos Assinados',            val:'498',   sub:'Universo total de assinaturas completadas',         c:'#22c55e' },
        { x:608, label:'Taxa de Conversão',              val:'12.4%', sub:'Eficiência de assinaturas sobre o total de aptos',  c:'#f59e0b' },
      ].map(({x,label,val,sub,c})=>(
        <g key={label}>
          <rect x={x} y="76" width="280" height="92" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x={x} y="76" width="280" height="4" rx="2" fill={c} fillOpacity="0.6"/>
          <text x={x+20} y="102" fontFamily="Inter,sans-serif" fontSize="11" fill="#64748b">{label}</text>
          <text x={x+20} y="134" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="26" fill="#0A2E36">{val}</text>
          <text x={x+20} y="156" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">{sub}</text>
          <rect x={x+240} y="88" width="28" height="28" rx="7" fill={c} fillOpacity="0.12"/>
        </g>
      ))}

      {/* Bar chart */}
      <rect x="20" y="178" width="820" height="120" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="40" y="200" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="13" fill="#0A2E36">🏆 Top 5 Estados — Assinaturas</text>
      <rect x="730" y="191" width="94" height="18" rx="9" fill="#fff7ed"/>
      <text x="777" y="203" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill="#f97316" textAnchor="middle">Brasil (Geral)</text>
      {estados.map(({uf,val,pct},i)=>(
        <g key={uf}>
          <rect x="40" y={208+i*18} width="28" height="12" rx="3" fill="#dbeafe"/>
          <text x="54" y={218+i*18} fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">{uf}</text>
          <rect x="74" y={208+i*18} width={Math.round(pct/100*680)} height="12" rx="3" fill="#93c5fd" fillOpacity="0.6"/>
          <rect x="74" y={208+i*18} width={Math.round(pct/100*680)} height="12" rx="3" fill="#3b82f6" fillOpacity="0.3"/>
          <text x={74+Math.round(pct/100*680)+6} y={218+i*18} fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0A2E36">{val}</text>
        </g>
      ))}

      {/* Table */}
      <rect x="20" y="308" width="820" height="148" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="40" y="328" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="12" fill="#0A2E36">Últimas 15 Assinaturas</text>
      <text x="40" y="342" fontFamily="Inter,sans-serif" fontSize="10" fill="#94a3b8">Visualização rápida dos contratos mais recentes processados.</text>
      <rect x="790" y="320" width="36" height="18" rx="9" fill="#f1f5f9"/>
      <text x="808" y="332" fontFamily="Inter,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">15</text>
      {/* Header row */}
      <line x1="30" y1="350" x2="830" y2="350" stroke="#f1f5f9" strokeWidth="1"/>
      {['NOME DO OPERADOR','CPF','UF','DATA DE ASSINATURA','STATUS'].map((h,i)=>(
        <text key={h} x={[40,380,480,560,720][i]} y="348" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill="#64748b">{h}</text>
      ))}
      {rows.map(({name,cpf,uf,date},i)=>(
        <g key={name}>
          <line x1="30" y1={352+i*16} x2="830" y2={352+i*16} stroke="#f8fafc" strokeWidth="1"/>
          <text x="40"  y={363+i*16} fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill="#0A2E36">{name}</text>
          <text x="380" y={363+i*16} fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">{cpf}</text>
          <rect x="476" y={355+i*16} width="22" height="12" rx="6" fill="#f1f5f9"/>
          <text x="487" y={364+i*16} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="600" fill="#475569" textAnchor="middle">{uf}</text>
          <text x="560" y={363+i*16} fontFamily="Inter,sans-serif" fontSize="9" fill="#64748b">{date}</text>
          <rect x="706" y={355+i*16} width="62" height="12" rx="6" fill="#dcfce7"/>
          <text x="737" y={364+i*16} fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" fill="#16a34a" textAnchor="middle">ASSINADO</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   Mobile mockup simplificado (Analítica)
   ══════════════════════════════════════════════════════ */
function MobileSVG() {
  return (
    <svg viewBox="0 0 320 580" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="320" height="580" rx="4" fill="#f8fafc"/>
      {/* Status bar */}
      <rect width="320" height="32" fill="#0A2E36"/>
      <text x="14" y="20" fontFamily="Inter,sans-serif" fontSize="9" fill="white" opacity="0.7">9:41</text>
      <text x="286" y="20" fontFamily="Inter,sans-serif" fontSize="9" fill="white" opacity="0.7">100%</text>
      {/* Header */}
      <rect x="0" y="32" width="320" height="50" fill="white" stroke="#e2e8f0" strokeWidth="0.5"/>
      <text x="16" y="54" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="14" fill="#0A2E36">Analítica Geral</text>
      <rect x="136" y="43" width="96" height="16" rx="8" fill="#dcfce7"/>
      <circle cx="148" cy="51" r="3" fill="#16a34a"/>
      <text x="155" y="55" fontFamily="Inter,sans-serif" fontSize="8" fill="#16a34a">Operação Estável</text>
      <text x="16" y="72" fontFamily="Inter,sans-serif" fontSize="9" fill="#94a3b8">Junho 2026 · acesso restrito</text>
      {/* 3 cards */}
      {[
        {y:90,  label:'Total de Diárias', val:'5.840', c:'#3b82f6'},
        {y:162, label:'Falta Tratamento', val:'76',    c:'#f97316'},
        {y:234, label:'Verificado Torre', val:'142',   c:'#22c55e'},
      ].map(({y,label,val,c})=>(
        <g key={label}>
          <rect x="12" y={y} width="296" height="64" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x="12" y={y} width="296" height="4" rx="2" fill={c} fillOpacity="0.7"/>
          <text x="28" y={y+22} fontFamily="Inter,sans-serif" fontSize="10" fill="#64748b">{label}</text>
          <text x="28" y={y+50} fontFamily="Inter,sans-serif" fontWeight="700" fontSize="22" fill="#0A2E36">{val}</text>
          <rect x="272" y={y+16} width="24" height="24" rx="6" fill={c} fillOpacity="0.12"/>
        </g>
      ))}
      {/* Mini line chart */}
      <rect x="12" y="308" width="296" height="120" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="28" y="328" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="11" fill="#0A2E36">Tendência Semanal</text>
      <rect x="28" y="334" width="7" height="7" rx="1.5" fill="#3b82f6"/>
      <text x="38" y="340" fontFamily="Inter,sans-serif" fontSize="8" fill="#64748b">Diárias</text>
      <rect x="78" y="334" width="7" height="7" rx="1.5" fill="#ef4444"/>
      <text x="88" y="340" fontFamily="Inter,sans-serif" fontSize="8" fill="#64748b">Faltas</text>
      <polyline points="28,376 68,366 108,355 148,378 188,400 228,404 268,406"
        fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round"/>
      <polygon points="28,410 28,376 68,366 108,355 148,378 188,400 228,404 268,406 298,410"
        fill="#3b82f6" fillOpacity="0.08"/>
      <polyline points="28,406 68,400 108,388 148,388 188,398 228,405 268,408"
        fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round"/>
      {['S','T','Q','Q','S','S','D'].map((d,i)=>(
        <text key={i} x={38+i*40} y="418" fontFamily="Inter,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">{d}</text>
      ))}
      {/* Ranking */}
      <rect x="12" y="438" width="296" height="80" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="28" y="458" fontFamily="Inter,sans-serif" fontWeight="600" fontSize="11" fill="#0A2E36">Ranking por Unidade</text>
      {[['EMPRESA SP',100],['EMPRESA RJ',82],['EMPRESA GO',36]].map(([n,w],i)=>(
        <g key={n}>
          <rect x="28" y={464+i*16} width={Math.round(w/100*226)} height="10" rx="3" fill="#dbeafe"/>
          <text x="32" y={472+i*16} fontFamily="Inter,sans-serif" fontSize="7.5" fontWeight="600" fill="#1e40af">{n}</text>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   Tabs config
   ══════════════════════════════════════════════════════ */
const SCREENS = [
  { id:'analytics',  label:'Analítica Geral',   Comp: AnalyticaGeralSVG },
  { id:'operators',  label:'Operadores',          Comp: OperadoresSVG    },
  { id:'payment',    label:'Ord. Pagamento',     Comp: PagamentoSVG     },
  { id:'signatures', label:'Assinaturas',         Comp: AssinaturasSVG  },
];

/* ══════════════════════════════════════════════════════
   useInView
   ══════════════════════════════════════════════════════ */
function useInView(threshold = 0.2) {
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

/* ══════════════════════════════════════════════════════
   Main Section
   ══════════════════════════════════════════════════════ */
export default function DemoSection() {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeScreen, setActiveScreen] = useState('analytics');
  const { ref, visible } = useInView();
  const ActiveComp = SCREENS.find(s => s.id === activeScreen)?.Comp ?? AnalyticaGeralSVG;

  return (
    <section id="demo" className="bg-petroleum py-24 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage:'radial-gradient(circle, rgba(0,168,150,0.1) 1px, transparent 1px)', backgroundSize:'32px 32px' }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-eyebrow">
            <span className="w-6 h-px bg-emerald"/>Plataforma Tarkis<span className="w-6 h-px bg-emerald"/>
          </span>
          <h2 className="section-title-light mt-4">
            Interface pensada para{' '}
            <span className="gradient-text">agilidade real</span>
          </h2>
          <p className="text-white/55 text-lg mt-4">
            Totalmente responsiva — acesse do escritório ou do campo. A mesma potência, em qualquer tela.
          </p>
        </div>

        {/* Device toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-1 bg-petroleum-dark/60 border border-white/10 rounded-xl p-1">
            {(['desktop','mobile'] as const).map(v => (
              <button
                key={v}
                onClick={() => setDeviceView(v)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                  ${deviceView===v ? 'bg-emerald text-white shadow-emerald-sm' : 'text-white/50 hover:text-white/80'}`}
              >
                {v==='desktop' ? <Monitor size={15}/> : <Smartphone size={15}/>}
                {v==='desktop' ? 'Desktop' : 'Mobile'}
              </button>
            ))}
          </div>
        </div>

        {/* Mockup */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {deviceView === 'desktop' ? (
            <div className="relative max-w-5xl mx-auto">
              {/* Monitor frame */}
              <div className="bg-petroleum-dark rounded-2xl p-2 border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="bg-[#0D1F26] rounded-xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 h-9 border-b border-white/10 bg-[#0A1A20]">
                    {['bg-red-400/50','bg-yellow-400/50','bg-emerald/50'].map(c => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}/>
                    ))}
                    <div className="ml-2 flex-1 bg-white/5 rounded-md h-5 flex items-center px-3">
                      <span className="text-white/25 text-[10px] font-mono">app.tarkis.com.br — {SCREENS.find(s=>s.id===activeScreen)?.label}</span>
                    </div>
                  </div>

                  {/* Screen tabs */}
                  <div className="flex items-center gap-0 bg-white border-b border-gray-100 overflow-x-auto">
                    {SCREENS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setActiveScreen(s.id)}
                        className={`flex-shrink-0 px-5 py-2.5 text-xs font-semibold border-b-2 transition-all duration-150
                          ${activeScreen===s.id
                            ? 'border-[#00A896] text-[#0A2E36] bg-white'
                            : 'border-transparent text-gray-400 hover:text-gray-600 bg-gray-50/50'}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Active screen */}
                  <div className="bg-white">
                    <ActiveComp/>
                  </div>
                </div>
              </div>
              {/* Stand */}
              <div className="flex justify-center mt-2">
                <div className="w-16 h-4 bg-petroleum-dark/80 rounded-b-lg border-x border-b border-white/10"/>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-2 bg-petroleum-dark/50 rounded-full"/>
              </div>
            </div>
          ) : (
            <div className="relative max-w-xs mx-auto">
              <div className="bg-petroleum-dark rounded-[2.5rem] p-3 border border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="flex justify-center mb-2">
                  <div className="w-24 h-5 bg-[#0A1A20] rounded-full border border-white/10"/>
                </div>
                <div className="rounded-[2rem] overflow-hidden">
                  <MobileSVG/>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="w-24 h-1 bg-white/20 rounded-full"/>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
          {/* Oculto temporariamente — reativar quando comercialização for liberada */}
          {/* <a href="#contato" className="btn-primary px-8 py-3.5 text-base group">
            Agendar Demonstração ao Vivo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </a> */}
          <a href="#para-quem" className="btn-outline-white px-8 py-3.5 text-base">
            Ver para quem é
          </a>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
};

const STORAGE_KEY = 'tarkis_cookie_consent';

function getStored(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {}
}

export default function CookieBanner() {
  const [show, setShow]           = useState(false);
  const [expanded, setExpanded]   = useState(false);
  const [analytics, setAnalytics]   = useState(false);
  const [marketing, setMarketing]   = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    const stored = getStored();
    if (!stored) {
      // Delay slightly so page renders first
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
      setFunctional(stored.functional);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      setShow(true);
      setExpanded(true);
    };
    window.addEventListener('open-cookie-preferences', reopen);
    return () => window.removeEventListener('open-cookie-preferences', reopen);
  }, []);

  const acceptAll = () => {
    save({ necessary: true, analytics: true, marketing: true, functional: true, timestamp: Date.now() });
    setShow(false);
  };

  const rejectAll = () => {
    save({ necessary: true, analytics: false, marketing: false, functional: false, timestamp: Date.now() });
    setShow(false);
  };

  const saveCustom = () => {
    save({ necessary: true, analytics, marketing, functional, timestamp: Date.now() });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Consentimento de cookies"
    >
      <div className="max-w-3xl mx-auto bg-petroleum border border-white/15 rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)] overflow-hidden">

        {/* Header */}
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald/15 border border-emerald/25 flex items-center justify-center flex-shrink-0">
            <Cookie size={20} className="text-emerald" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-white text-base mb-1">
              Privacidade e Cookies
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar
              conteúdo. Você pode aceitar todos, personalizar suas preferências ou recusar cookies
              não essenciais.{' '}
              <a href="/politica-de-cookies" className="text-emerald underline hover:text-emerald-light transition-colors">
                Saiba mais
              </a>
              .
            </p>
          </div>
          <button
            onClick={rejectAll}
            className="p-1.5 text-white/30 hover:text-white/70 transition-colors flex-shrink-0 rounded-lg hover:bg-white/10"
            aria-label="Fechar e rejeitar cookies"
          >
            <X size={16} />
          </button>
        </div>

        {/* Expandable preferences */}
        {expanded && (
          <div className="px-5 sm:px-6 pb-4 space-y-3 border-t border-white/10 pt-4">
            <Toggle
              id="necessary"
              label="Cookies Necessários"
              desc="Essenciais para o funcionamento do site. Não podem ser desativados."
              checked={true}
              disabled
              onChange={() => {}}
            />
            <Toggle
              id="functional"
              label="Cookies Funcionais"
              desc="Melhoram a usabilidade, como lembrar preferências de idioma e layout."
              checked={functional}
              onChange={setFunctional}
            />
            <Toggle
              id="analytics"
              label="Cookies Analíticos"
              desc="Nos ajudam a entender como o site é usado (ex: Google Analytics)."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Toggle
              id="marketing"
              label="Cookies de Marketing"
              desc="Usados para exibir anúncios relevantes em outras plataformas."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 p-5 sm:p-6 pt-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-white/45 hover:text-white/70 text-xs font-medium transition-colors mr-auto"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {expanded ? 'Ocultar preferências' : 'Personalizar'}
          </button>

          <button
            onClick={rejectAll}
            className="px-4 py-2 text-sm text-white/55 hover:text-white border border-white/15 hover:border-white/30 rounded-xl font-medium transition-all"
          >
            Rejeitar não essenciais
          </button>

          {expanded && (
            <button
              onClick={saveCustom}
              className="px-4 py-2 text-sm text-emerald border border-emerald/40 hover:border-emerald hover:bg-emerald/10 rounded-xl font-medium transition-all"
            >
              Salvar preferências
            </button>
          )}

          <button
            onClick={acceptAll}
            className="btn-primary text-sm px-5 py-2"
          >
            Aceitar todos
          </button>
        </div>

        {/* LGPD note */}
        <div className="px-5 sm:px-6 py-3 border-t border-white/8 flex items-center gap-2">
          <Shield size={12} className="text-white/25 flex-shrink-0" />
          <p className="text-white/25 text-[11px]">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  id, label, desc, checked, disabled, onChange,
}: {
  id: string; label: string; desc: string;
  checked: boolean; disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 p-3 rounded-xl ${disabled ? '' : 'hover:bg-white/5'} transition-colors`}>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${disabled ? 'text-white/40' : 'text-white/80'}`}>
          {label}
          {disabled && <span className="ml-2 text-[10px] text-white/25 uppercase tracking-wider font-normal">(sempre ativo)</span>}
        </p>
        <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative w-10 h-6 rounded-full flex-shrink-0 transition-all duration-200
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
          ${checked ? 'bg-emerald' : 'bg-white/15'}
          focus:outline-none focus:ring-2 focus:ring-emerald/50
        `}
      >
        <span
          className={`
            absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
            ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}
          `}
        />
      </button>
    </div>
  );
}

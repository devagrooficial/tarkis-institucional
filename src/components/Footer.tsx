import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const YEAR = new Date().getFullYear();

const LINKS = {
  Plataforma: [
    { label: 'Dashboard Analytics',    href: '#pilar-1' },
    { label: 'Torre de Controle',      href: '#pilar-1' },
    { label: 'Módulo de Operadores',   href: '#pilar-2' },
    { label: 'Pesquisa GR',            href: '#pilar-2' },
    { label: 'Diárias de Campo',       href: '#pilar-3' },
    { label: 'Contratos Digitais',     href: '#pilar-4' },
  ],
  Empresa: [
    { label: 'Para Quem',              href: '#para-quem' },
    { label: 'Demonstração',           href: '#demo' },
    // Ocultos temporariamente — reativar quando comercialização for liberada
    // { label: 'Agendar Demo',           href: '#contato' },
    // { label: 'Contato',                href: '#contato' },
  ],
  Legal: [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Política de Cookies',     href: '/politica-de-cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-petroleum-dark border-t border-white/10">

      {/* Main footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-16">

          {/* Brand col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <a href="/" className="flex items-center w-fit">
              <img
                src="/images/LogoApp.png"
                alt="Tarkis"
                height={36}
                className="h-9 w-auto"
              />
            </a>

            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Plataforma de gestão operacional end-to-end para empresas que
              dependem de equipes externas. Do onboarding ao pagamento — sem papel,
              sem planilha, sem retrabalho.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {[
                { icon: <Mail size={14} />,    text: 'contato@tarkis.com.br', href: 'mailto:contato@tarkis.com.br' },
                { icon: <MapPin size={14} />,  text: 'Cuiabá, MT — Brasil', href: undefined },
              ].map(({ icon, text, href }) => (
                href ? (
                  <a key={text} href={href} className="flex items-center gap-2 text-white/40 hover:text-emerald transition-colors text-xs group">
                    <span className="text-white/25 group-hover:text-emerald transition-colors">{icon}</span>
                    {text}
                  </a>
                ) : (
                  <span key={text} className="flex items-center gap-2 text-white/40 text-xs">
                    <span className="text-white/25">{icon}</span>
                    {text}
                  </span>
                )
              ))}
            </div>

          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/40 hover:text-white/80 text-sm transition-colors underline-emerald"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Bottom bar */}
      <div className="container py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <p>
            © {YEAR} Tarkis ADM. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a href="/politica-de-privacidade" className="hover:text-white/50 transition-colors">
              Privacidade
            </a>
            <a href="/politica-de-cookies" className="hover:text-white/50 transition-colors">
              Cookies
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="hover:text-white/50 transition-colors"
            >
              Preferências de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

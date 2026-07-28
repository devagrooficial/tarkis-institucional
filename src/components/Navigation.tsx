import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  {
    label: 'Solução',
    href: '#solucao',
    dropdown: [
      { label: 'Inteligência Operacional',  href: '#pilar-1' },
      { label: 'Gestão de Pessoas',         href: '#pilar-2' },
      { label: 'Automação Financeira',      href: '#pilar-3' },
      { label: 'Segurança Contratual',      href: '#pilar-4' },
    ],
  },
  { label: 'Para Quem',  href: '#para-quem' },
  { label: 'Demonstração', href: '#demo' },
  // Oculto temporariamente — reativar quando comercialização for liberada
  // { label: 'Contato',    href: '#contato' },
];

export default function Navigation() {
  const [open, setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => { setOpen(false); setDropdown(null); };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-petroleum/95 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0" onClick={closeAll}>
            <img
              src="/images/LogoApp.png"
              alt="Tarkis"
              height={36}
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {dropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-petroleum border border-white/15 rounded-xl shadow-card-dark overflow-hidden">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={closeAll}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={closeAll}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* CTA — oculto temporariamente, reativar quando comercialização for liberada */}
          {/* <div className="hidden md:flex items-center gap-3">
            <a href="#demo" className="btn-ghost text-sm px-4 py-2">
              Ver Demo
            </a>
            <a href="#contato" className="btn-primary text-sm px-5 py-2.5">
              Agendar Demo
            </a>
          </div> */}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/10 bg-petroleum ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
                onClick={closeAll}
              >
                {link.label}
              </a>
              {link.dropdown && (
                <div className="ml-4 border-l border-white/10 pl-4 mt-1 space-y-1">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                      onClick={closeAll}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Oculto temporariamente — reativar quando comercialização for liberada */}
          {/* <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a href="#demo"    className="btn-outline-white justify-center text-sm">Ver Demo</a>
            <a href="#contato" className="btn-primary justify-center text-sm">Agendar Demo</a>
          </div> */}
        </div>
      </div>
    </header>
  );
}

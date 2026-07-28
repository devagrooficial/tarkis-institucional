import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, Mail, Building2, ArrowRight } from 'lucide-react';

const INTERESTS = [
  'Gestão de Operadores',
  'Contratos Digitais',
  'Automação de Pagamentos',
  'Dashboard Analytics',
  'Torre Monitoramento',
  'Outro',
];

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

export default function CallToAction() {
  const { ref, visible } = useInView();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', interest: '', message: '',
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível enviar sua solicitação.');
      }
      setSent(true);
      setForm({ name: '', email: '', phone: '', company: '', interest: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar sua solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="bg-white py-24 relative overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute inset-x-0 top-0 h-32 bg-silver-light" style={{ clipPath: 'ellipse(55% 100% at 50% 0%)' }} />

      <div className="container relative z-10" ref={ref}>
        <div
          className={`
            transition-all duration-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="section-eyebrow">
                  <span className="w-6 h-px bg-emerald" />
                  Agende sua Demo
                  <span className="w-6 h-px bg-emerald" />
                </span>
                <h2 className="section-title mt-4">
                  Veja o Tarkis funcionando{' '}
                  <span className="gradient-text">na sua realidade</span>
                </h2>
                <p className="text-petroleum/60 text-lg mt-4 leading-relaxed">
                  Nossa equipe realiza uma demonstração personalizada, adaptada
                  ao seu setor e à sua operação. Sem script genérico — você vê
                  o Tarkis resolver os problemas do seu negócio.
                </p>
              </div>

              {/* Promises */}
              <div className="space-y-4">
                {[
                  'Demo personalizada para o seu segmento',
                  'Sem compromisso',
                  'Resposta em até 24 horas úteis',
                  'Suporte de quem entende do seu negócio',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-emerald flex-shrink-0" />
                    <span className="text-petroleum/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact alternatives */}
              <div className="pt-4 space-y-3">
                <p className="text-sm text-petroleum/40 uppercase tracking-wider font-semibold">
                  Prefere falar direto?
                </p>
                {[
                  { icon: <Mail size={16} />,  label: 'contato@tarkis.com.br', href: 'mailto:contato@tarkis.com.br' },
                ].map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 text-petroleum/65 hover:text-emerald transition-colors text-sm group"
                  >
                    <span className="text-emerald/70 group-hover:text-emerald transition-colors">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white border border-silver rounded-3xl shadow-card p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                  <div className="w-16 h-16 rounded-full bg-emerald/15 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-petroleum mb-2">
                      Solicitação recebida!
                    </h3>
                    <p className="text-petroleum/55 leading-relaxed">
                      Nossa equipe entrará em contato em até 24 horas úteis
                      para agendar sua demonstração personalizada.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-emerald text-sm font-medium hover:underline"
                  >
                    Enviar outro contato
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-heading font-bold text-petroleum text-xl mb-6">
                    Solicitar Demonstração
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Nome completo *"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={handle}
                      required
                    />
                    <Field
                      label="E-mail corporativo *"
                      name="email"
                      type="email"
                      placeholder="voce@empresa.com"
                      value={form.email}
                      onChange={handle}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Telefone / WhatsApp"
                      name="phone"
                      type="tel"
                      placeholder="(11) 9 9999-9999"
                      value={form.phone}
                      onChange={handle}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-petroleum">
                        Empresa
                      </label>
                      <div className="relative">
                        <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-petroleum/30" />
                        <input
                          name="company"
                          type="text"
                          placeholder="Nome da empresa"
                          value={form.company}
                          onChange={handle}
                          className="w-full pl-9 pr-3 py-2.5 border border-silver rounded-xl text-sm text-petroleum placeholder:text-petroleum/30 focus:outline-none focus:border-emerald transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-petroleum">
                      Principal interesse
                    </label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handle}
                      className="w-full px-3 py-2.5 border border-silver rounded-xl text-sm text-petroleum focus:outline-none focus:border-emerald transition-colors bg-white"
                    >
                      <option value="">Selecione...</option>
                      {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-petroleum">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Conte um pouco sobre sua operação..."
                      value={form.message}
                      onChange={handle}
                      className="w-full px-3 py-2.5 border border-silver rounded-xl text-sm text-petroleum placeholder:text-petroleum/30 focus:outline-none focus:border-emerald transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email}
                    className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Agendar Demonstração
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>

                  <p className="text-center text-petroleum/35 text-xs mt-2">
                    Ao enviar, você concorda com nossa{' '}
                    <a href="/politica-de-privacidade" className="underline hover:text-emerald transition-colors">
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-petroleum">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 border border-silver rounded-xl text-sm text-petroleum placeholder:text-petroleum/30 focus:outline-none focus:border-emerald transition-colors"
      />
    </div>
  );
}

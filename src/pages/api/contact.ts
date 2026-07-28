import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const MAX_LEN = { name: 120, email: 200, phone: 40, company: 150, interest: 60, message: 2000 };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido.' }), { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const company = String(body.company ?? '').trim();
  const interest = String(body.interest ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Nome e e-mail são obrigatórios.' }), { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'E-mail inválido.' }), { status: 400 });
  }
  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    phone.length > MAX_LEN.phone ||
    company.length > MAX_LEN.company ||
    interest.length > MAX_LEN.interest ||
    message.length > MAX_LEN.message
  ) {
    return new Response(JSON.stringify({ error: 'Um dos campos excede o tamanho máximo permitido.' }), { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error('Variáveis de ambiente SMTP ausentes.');
    return new Response(JSON.stringify({ error: 'Formulário temporariamente indisponível. Tente novamente mais tarde.' }), { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ['Nome', name],
    ['E-mail', email],
    ['Telefone', phone || '—'],
    ['Empresa', company || '—'],
    ['Interesse', interest || '—'],
  ];

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0A2E36;">
      <h2 style="margin-bottom: 16px;">Nova solicitação de demonstração — Tarkis</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; color: #64748b; font-weight: 600; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td>
            <td style="padding: 6px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join('')}
      </table>
      ${
        message
          ? `<div style="margin-top: 16px;">
               <p style="color: #64748b; font-weight: 600; margin-bottom: 4px;">Mensagem</p>
               <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
             </div>`
          : ''
      }
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Site Tarkis" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nova solicitação de demonstração — ${name}`,
      html,
    });
  } catch (err) {
    console.error('Falha ao enviar e-mail de contato:', err);
    return new Response(JSON.stringify({ error: 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes.' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

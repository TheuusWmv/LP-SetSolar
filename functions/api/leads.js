const json = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

const validText = (value, max, min = 0) => typeof value === 'string' && value.trim().length >= min && value.length <= max;
const validNumber = (value, max) => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= max;
const optionalText = (value, max) => value === undefined || validText(value, max);

function validPayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const { lead, metrics } = data;
  return validText(data.protocol, 80, 5)
    && validText(data.timestamp, 40, 10)
    && !Number.isNaN(Date.parse(data.timestamp))
    && validText(data.source, 120, 3)
    && lead && typeof lead === 'object' && !Array.isArray(lead)
    && ['pf', 'pj'].includes(lead.leadType)
    && validText(lead.fullName, 120, 2)
    && validText(lead.phone, 24, 10)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email || '')
    && validText(lead.email, 254, 5)
    && validText(lead.city, 100, 2)
    && /^[A-Z]{2}$/.test(lead.state || '')
    && validNumber(lead.monthlyBill, 1_000_000) && lead.monthlyBill > 0
    && optionalText(lead.companyName, 120)
    && optionalText(lead.cnpj, 24)
    && optionalText(lead.utility, 100)
    && optionalText(lead.propertyType, 40)
    && optionalText(lead.pjSegment, 40)
    && optionalText(lead.roofType, 40)
    && optionalText(lead.ownership, 40)
    && optionalText(lead.mainGoal, 80)
    && optionalText(lead.timeline, 80)
    && metrics && typeof metrics === 'object' && !Array.isArray(metrics)
    && validNumber(metrics.estimatedAnnualSavings, 1_000_000_000)
    && validNumber(metrics.estimated25YearsSavings, 1_000_000_000)
    && validNumber(metrics.savingsPercentage, 100);
}

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Origem não permitida.' }, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Envie JSON.' }, 415);
  }
  if (Number(request.headers.get('Content-Length') || 0) > 16_384) {
    return json({ error: 'Dados excedem o limite.' }, 413);
  }

  let raw;
  try {
    raw = await request.text();
  } catch {
    return json({ error: 'Não foi possível ler os dados.' }, 400);
  }
  if (new TextEncoder().encode(raw).length > 16_384) return json({ error: 'Dados excedem o limite.' }, 413);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: 'JSON inválido.' }, 400);
  }
  if (!validPayload(payload)) return json({ error: 'Dados inválidos.' }, 400);

  if (!env.LEAD_WEBHOOK_URL) return json({ error: 'Recebimento indisponível.' }, 503);
  let webhook;
  try {
    webhook = new URL(env.LEAD_WEBHOOK_URL);
    if (webhook.protocol !== 'https:' || webhook.username || webhook.password || webhook.hash) throw new Error();
  } catch {
    return json({ error: 'Recebimento indisponível.' }, 503);
  }

  try {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (env.LEAD_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${env.LEAD_WEBHOOK_TOKEN}`;
    const response = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return json({ error: 'Falha no recebimento. Tente novamente.' }, 502);
    return json({ success: true }, 200);
  } catch {
    return json({ error: 'Falha no recebimento. Tente novamente.' }, 502);
  }
}

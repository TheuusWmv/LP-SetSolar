import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/leads.js';

const payload = {
  protocol: 'Protocolo WPS-12345678',
  timestamp: '2026-09-30T12:00:00.000Z',
  lead: {
    leadType: 'pf', fullName: 'Maria Silva', phone: '62999999999',
    email: 'maria@example.com', city: 'Goiânia', state: 'GO', monthlyBill: 500,
  },
  metrics: { estimatedAnnualSavings: 5000, estimated25YearsSavings: 125000, savingsPercentage: 90 },
  source: 'World Place Solar - Quiz BANT (PF)',
};
const request = (body = payload, headers = {}) => new Request('https://worldplacesolar.example/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: 'https://worldplacesolar.example', ...headers },
  body: JSON.stringify(body),
});

test('recusa dados inválidos e origem diferente', async () => {
  assert.equal((await onRequest({ request: request({ ...payload, lead: { ...payload.lead, email: 'inválido' } }), env: {} })).status, 400);
  assert.equal((await onRequest({ request: request(payload, { Origin: 'https://outro.example' }), env: {} })).status, 403);
});

test('não confirma lead sem destino configurado', async () => {
  const response = await onRequest({ request: request(), env: {} });
  assert.equal(response.status, 503);
});

test('envia apenas pelo servidor e confirma somente após 2xx do webhook', async () => {
  const originalFetch = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url, options) => {
    seen.push({ url: url.href, auth: options.headers.Authorization, body: JSON.parse(options.body) });
    return new Response(null, { status: seen.length === 1 ? 200 : 500 });
  };
  try {
    const env = { LEAD_WEBHOOK_URL: 'https://crm.example/leads', LEAD_WEBHOOK_TOKEN: 'segredo' };
    assert.equal((await onRequest({ request: request(), env })).status, 200);
    assert.equal((await onRequest({ request: request(), env })).status, 502);
    assert.equal(seen[0].url, env.LEAD_WEBHOOK_URL);
    assert.equal(seen[0].auth, 'Bearer segredo');
    assert.deepEqual(seen[0].body, payload);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

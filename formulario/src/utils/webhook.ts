import type { LeadSubmissionPayload } from '../types/form';

export async function submitLeadWebhook(
  payload: LeadSubmissionPayload,
  endpoint = '/api/leads'
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Falha no envio');
    return { success: true };
  } catch {
    return { success: false, error: 'Não foi possível enviar seus dados. Confira sua conexão e tente novamente.' };
  }
}

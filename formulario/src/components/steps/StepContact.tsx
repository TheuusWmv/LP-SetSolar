import React from 'react';
import { LeadType } from '../../types/form';

interface StepContactProps {
  phone: string;
  email: string;
  companyName?: string;
  cnpj?: string;
  onChangePhone: (p: string) => void;
  onChangeEmail: (e: string) => void;
  onChangeCompanyName?: (c: string) => void;
  onChangeCnpj?: (c: string) => void;
  leadType?: LeadType;
  onEnter?: () => void;
}

// Format Brazilian phone (XX) XXXXX-XXXX
export function formatPhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Format Brazilian CNPJ: XX.XXX.XXX/XXXX-XX
export function formatCNPJ(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

export const StepContact: React.FC<StepContactProps> = ({
  phone,
  email,
  companyName = '',
  cnpj = '',
  onChangePhone,
  onChangeEmail,
  onChangeCompanyName,
  onChangeCnpj,
  leadType = 'pf',
  onEnter,
}) => {
  const isPJ = leadType === 'pj';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneBR(e.target.value);
    onChangePhone(formatted);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    onChangeCnpj?.(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cleanPhone = phone.replace(/\D/g, '');
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (cleanPhone.length >= 10 && validEmail) {
        e.preventDefault();
        onEnter?.();
      }
    }
  };

  return (
    <div className="max-w-xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Name Field for PJ */}
        {isPJ && (
          <div className="sm:col-span-2">
            <label htmlFor="contact-companyname" className="form-field-label">
              Nome da empresa
            </label>
            <input
              id="contact-companyname"
              type="text"
              maxLength={120}
              autoComplete="organization"
              value={companyName}
              onChange={(e) => onChangeCompanyName?.(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex.: Silva Comércio Ltda."
              autoFocus
              className="form-field-control"
            />
          </div>
        )}

        {/* WhatsApp Field with DDD */}
        <div className={isPJ ? 'sm:col-span-1' : 'sm:col-span-1'}>
          <label htmlFor="contact-phone" className="form-field-label">
            WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            maxLength={16}
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            placeholder="(49) 99999-9999"
            autoFocus={!isPJ}
            className="form-field-control"
          />
        </div>

        {/* Email Field */}
        <div className={isPJ ? 'sm:col-span-1' : 'sm:col-span-1'}>
          <label htmlFor="contact-email" className="form-field-label">
            E-mail
          </label>
          <input
            id="contact-email"
            type="email"
            maxLength={254}
            autoComplete="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="voce@email.com"
            className="form-field-control"
          />
        </div>

        {/* Optional CNPJ Field for PJ */}
        {isPJ && (
          <div className="sm:col-span-2">
            <label htmlFor="contact-cnpj" className="form-field-label">
              CNPJ da empresa <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <input
              id="contact-cnpj"
              type="text"
              maxLength={18}
              inputMode="numeric"
              value={cnpj}
              onChange={handleCnpjChange}
              onKeyDown={handleKeyDown}
              placeholder="00.000.000/0001-00"
              className="form-field-control"
            />
          </div>
        )}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Ao enviar, seus dados serão encaminhados à World Place Solar para responder à sua simulação. Veja o{' '}
        <a href="/privacidade.html" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 text-slate-700">aviso de privacidade</a>.
      </p>
    </div>
  );
};

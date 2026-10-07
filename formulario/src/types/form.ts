export type LeadType = 'pf' | 'pj';

export type PropertyType = 'residencial' | 'comercial' | 'rural' | 'industrial';

export type PJSegment = 'comercio' | 'industria' | 'agro' | 'outros';

export type RoofType = 'ceramico' | 'metalico' | 'fibrocimento' | 'laje' | 'solo';

export type OwnershipStatus = 'proprietario' | 'inquilino' | 'obra';

export interface FormAnswers {
  leadType: LeadType;
  propertyType?: PropertyType;
  pjSegment?: PJSegment;
  monthlyBill?: number; // in R$
  roofType?: RoofType;
  ownership?: OwnershipStatus;
  mainGoal?: string;
  timeline?: string;
  city: string;
  state: string;
  utility?: string; // Concessionária
  fullName: string;
  companyName?: string;
  cnpj?: string;
  phone: string;
  email: string;
}

export interface RoofDetail {
  id: RoofType;
  title: string;
  shortcut: string;
  subtitle: string;
  description: string;
  idealAngle: string;
  fixingType: string;
  tag: string;
  image3D: string;
}

export interface LeadSubmissionPayload {
  protocol: string;
  timestamp: string;
  lead: {
    leadType: LeadType;
    fullName: string;
    companyName?: string;
    cnpj?: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    utility?: string;
    propertyType?: PropertyType;
    pjSegment?: PJSegment;
    monthlyBill: number;
    roofType?: RoofType;
    ownership?: OwnershipStatus;
    mainGoal?: string;
    timeline?: string;
  };
  metrics: {
    estimatedAnnualSavings: number;
    estimated25YearsSavings: number;
    savingsPercentage: number;
  };
  source: string;
}


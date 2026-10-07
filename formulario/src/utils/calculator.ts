/**
 * Solar Economy and Technical Sizing Calculator
 */

export interface SolarCalculationResult {
  monthlyBill: number;
  monthlySavings: number;
  annualSavings: number;
  twentyFiveYearsSavings: number;
  savingsPercentage: number;
  estimatedKwp: number;
  co2AvoidedTonsPerYear: number;
  treesSavedPerYear: number;
}

export function calculateSolarEconomy(monthlyBill: number): SolarCalculationResult {
  // Safe bounds
  const bill = Math.max(100, monthlyBill);

  // Solar systems reduce bills up to 95% (with standard concessionaire connection fee residual)
  const savingsRate = 0.93; // 93% average real savings
  const monthlySavings = Math.round(bill * savingsRate);
  const annualSavings = monthlySavings * 12;
  
  // 25-year lifespan of Tier-1 solar panels (linear conservative)
  const twentyFiveYearsSavings = annualSavings * 25;

  // Approximate solar peak power in kWp (Average tariff ~ R$ 0.92 / kWh, average solar irradiation ~ 130 kWh/kWp/mês)
  const estimatedKwhMonth = bill / 0.92;
  const estimatedKwp = Number((estimatedKwhMonth / 130).toFixed(1));

  // Environmental impact gamification
  const co2AvoidedTonsPerYear = Number(((estimatedKwhMonth * 12 * 0.084) / 1000).toFixed(1));
  const treesSavedPerYear = Math.max(1, Math.round(co2AvoidedTonsPerYear * 7.2));

  return {
    monthlyBill: bill,
    monthlySavings,
    annualSavings,
    twentyFiveYearsSavings,
    savingsPercentage: 95,
    estimatedKwp: Math.max(1.5, estimatedKwp),
    co2AvoidedTonsPerYear,
    treesSavedPerYear,
  };
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

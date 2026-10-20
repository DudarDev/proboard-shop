import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENCY_RATES: Record<string, { rate: number; symbol: string; label: string }> = {
  USD: { rate: 1.0, symbol: '$', label: 'USD ($)' },
  EUR: { rate: 0.92, symbol: '€', label: 'EUR (€)' },
  UAH: { rate: 41.5, symbol: '₴', label: 'UAH (₴)' },
  GBP: { rate: 0.79, symbol: '£', label: 'GBP (£)' },
};

export function formatPrice(
  amount: string | number,
  baseCurrency: string = 'USD',
  targetCurrency: string = 'USD'
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '$0.00';

  const baseRate = CURRENCY_RATES[baseCurrency]?.rate || 1.0;
  const target = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;

  // Convert amount: (amount / baseRate) * targetRate
  const converted = (num / baseRate) * target.rate;

  try {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: targetCurrency,
      maximumFractionDigits: targetCurrency === 'UAH' ? 0 : 2,
    }).format(converted);
  } catch {
    return `${target.symbol}${converted.toFixed(2)}`;
  }
}

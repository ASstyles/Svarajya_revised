import { describe, expect, it } from 'vitest';
import { calculateDebtBurden, calculateEmergencyMonths, calculateNetWorth, calculateSavingsRate } from '@/lib/engines/calculationEngine';

describe('calculationEngine with dummy household data', () => {
  it('calculates net worth from assets and liabilities', () => {
    expect(calculateNetWorth({ totalAssets: 500000, totalLiabilities: 200000 } as never)).toBe(300000);
  });

  it('calculates debt burden and savings rate deterministically', () => {
    const snapshot = { monthlyIncome: 100000, monthlyExpenses: 60000, monthlyEmi: 20000 } as never;
    expect(calculateDebtBurden(snapshot)).toBeCloseTo(20, 2);
    expect(calculateSavingsRate(snapshot)).toBeCloseTo(40, 2);
  });

  it('handles zero expense emergency-month input without Infinity', () => {
    expect(Number.isFinite(calculateEmergencyMonths({ emergencyFund: 50000, monthlyExpenses: 0 } as never))).toBe(true);
  });
});

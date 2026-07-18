// Vitest / Jest Unit Test Draft
// Target File: src/lib/subscriptionMetrics.ts
// Setup: npm i -D vitest

import { describe, it, expect } from 'vitest';
import { calculateSubscriptionMetrics } from '../../source-snapshot/Svarajya-main/src/lib/subscriptionMetrics';

describe('calculateSubscriptionMetrics', () => {
  it('correctly calculates monthly equivalent and annual costs', () => {
    const subs = [
      { amount: 120, billingCycle: 'MONTHLY', lastUsedDate: new Date() },
      { amount: 1200, billingCycle: 'YEARLY', lastUsedDate: new Date() },
    ];
    const metrics = calculateSubscriptionMetrics(subs, new Date());
    
    // 120 + (1200 / 12) = 220 monthly
    expect(metrics.recurringMonthly).toBe(220);
    expect(metrics.annualCost).toBe(2640);
    expect(metrics.dormantCount).toBe(0);
  });

  it('correctly flags dormant subscriptions older than 90 days', () => {
    const now = new Date('2026-07-18');
    const oldDate = new Date('2026-03-18'); // 4 months ago
    
    const subs = [
      { amount: 150, billingCycle: 'MONTHLY', lastUsedDate: oldDate },
    ];
    const metrics = calculateSubscriptionMetrics(subs, now);
    
    expect(metrics.dormantCount).toBe(1);
    expect(metrics.potentialSavings).toBe(1800); // 150 * 12
    expect(metrics.leakageRatio).toBe(100);
  });
});

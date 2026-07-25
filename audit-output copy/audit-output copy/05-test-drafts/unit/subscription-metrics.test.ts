import { describe, expect, it } from 'vitest';
import { calculateSubscriptionMetrics } from '@/lib/subscriptionMetrics';

describe('subscription metrics', () => {
  it('normalizes monthly and annual dummy subscriptions', () => {
    const result = calculateSubscriptionMetrics([
      { amount: 500, billingCycle: 'MONTHLY', status: 'ACTIVE' },
      { amount: 1200, billingCycle: 'ANNUAL', status: 'ACTIVE' },
    ] as never);
    expect(result.monthlySpend).toBe(600);
    expect(result.yearlySpend).toBe(7200);
  });

  it('excludes cancelled subscriptions from active totals', () => {
    const result = calculateSubscriptionMetrics([{ amount: 999, billingCycle: 'MONTHLY', status: 'CANCELLED' }] as never);
    expect(result.activeSubscriptions).toBe(0);
  });
});

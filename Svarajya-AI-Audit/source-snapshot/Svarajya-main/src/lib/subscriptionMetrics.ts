export type SubscriptionMetricInput = {
  amount: number;
  billingCycle?: string | null;
  lastUsedDate?: Date | string | null;
};

export type SubscriptionMetrics = {
  recurringMonthly: number;
  annualCost: number;
  dormantCount: number;
  potentialSavings: number;
  leakageRatio: number;
};

const billingCycleMultipliers: Record<string, number> = {
  MONTHLY: 1,
  QUARTERLY: 1 / 3,
  HALF_YEARLY: 1 / 6,
  YEARLY: 1 / 12,
  WEEKLY: 1 / 4.3333333333,
  ONE_TIME: 0,
};

export function calculateSubscriptionMetrics(
  subscriptions: SubscriptionMetricInput[],
  now: Date = new Date(),
): SubscriptionMetrics {
  const recurringMonthly = subscriptions.reduce((sum, item) => {
    const monthlyEquivalent = getMonthlyEquivalent(
      item.amount,
      item.billingCycle,
    );
    return sum + monthlyEquivalent;
  }, 0);

  const dormantCount = subscriptions.filter((item) =>
    isDormant(item.lastUsedDate, now),
  ).length;
  const potentialSavings =
    subscriptions
      .filter((item) => isDormant(item.lastUsedDate, now))
      .reduce(
        (sum, item) =>
          sum + getMonthlyEquivalent(item.amount, item.billingCycle),
        0,
      ) * 12;

  const leakageRatio =
    subscriptions.length > 0 ?
      Math.min(100, Math.round((dormantCount / subscriptions.length) * 100))
    : 0;

  return {
    recurringMonthly,
    annualCost: recurringMonthly * 12,
    dormantCount,
    potentialSavings,
    leakageRatio,
  };
}

function getMonthlyEquivalent(
  amount: number,
  billingCycle?: string | null,
): number {
  if (!amount) return 0;
  const key = (billingCycle || "MONTHLY").toUpperCase();
  const multiplier =
    billingCycleMultipliers[key] ?? billingCycleMultipliers.MONTHLY;
  return amount * multiplier;
}

function isDormant(
  lastUsedDate: Date | string | null | undefined,
  now: Date,
): boolean {
  if (!lastUsedDate) return false;

  const parsedDate =
    lastUsedDate instanceof Date ? lastUsedDate : new Date(lastUsedDate);
  if (Number.isNaN(parsedDate.getTime())) return false;

  const diffDays = Math.floor(
    (now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays > 90;
}

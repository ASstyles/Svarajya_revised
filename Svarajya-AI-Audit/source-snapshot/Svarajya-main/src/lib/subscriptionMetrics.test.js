const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateSubscriptionMetrics } = require("./subscriptionMetrics.js");

test("returns zero values for an empty set", () => {
  const metrics = calculateSubscriptionMetrics([]);

  assert.deepEqual(metrics, {
    recurringMonthly: 0,
    annualCost: 0,
    dormantCount: 0,
    potentialSavings: 0,
    leakageRatio: 0,
  });
});

test("calculates monthly equivalent, dormant leakage, and savings from mixed billing cycles", () => {
  const today = new Date("2026-06-30");
  const metrics = calculateSubscriptionMetrics(
    [
      { amount: 499, billingCycle: "MONTHLY" },
      { amount: 600, billingCycle: "QUARTERLY" },
      { amount: 1200, billingCycle: "YEARLY" },
      {
        amount: 299,
        billingCycle: "MONTHLY",
        lastUsedDate: new Date("2026-01-01"),
      },
    ],
    today,
  );

  assert.equal(metrics.recurringMonthly, 499 + 200 + 100 + 299);
  assert.equal(metrics.annualCost, metrics.recurringMonthly * 12);
  assert.equal(metrics.dormantCount, 1);
  assert.equal(metrics.potentialSavings, 299 * 12);
  assert.equal(metrics.leakageRatio, 25);
});

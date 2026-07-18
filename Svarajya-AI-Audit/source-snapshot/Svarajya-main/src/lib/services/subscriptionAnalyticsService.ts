import { prisma } from "@/lib/prisma";
import { calculateSubscriptionMetrics } from "@/lib/subscriptionMetrics";

export async function getSubscriptionAnalyticsForUser(userId: string) {
  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    select: {
      amount: true,
      billingCycle: true,
      lastUsedDate: true,
    },
    orderBy: { renewalDate: "asc" },
  });

  return calculateSubscriptionMetrics(
    subscriptions as Array<{
      amount: number;
      billingCycle: string | null;
      lastUsedDate: Date | null;
    }>,
  );
}

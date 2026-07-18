import { Subscription } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BaseService } from "./baseService";

export interface CreateSubscriptionInput {
  name: string;
  provider?: string;
  category?: string;
  amount: number;
  billingCycle?: string;
  renewalDate: Date;
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  linkedBankAccountId?: string;
  autoDebit?: boolean;
  status?: string;
  lastUsedDate?: Date;
  usageFrequency?: string;
  isEssential?: boolean;
  cancelReminder?: boolean;
  notes?: string;
  isActive?: boolean;
}

export interface UpdateSubscriptionInput {
  name?: string;
  provider?: string;
  category?: string;
  amount?: number;
  billingCycle?: string;
  renewalDate?: Date;
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  linkedBankAccountId?: string;
  autoDebit?: boolean;
  status?: string;
  lastUsedDate?: Date;
  usageFrequency?: string;
  isEssential?: boolean;
  cancelReminder?: boolean;
  notes?: string;
  isActive?: boolean;
}

class SubscriptionService extends BaseService<
  Subscription,
  CreateSubscriptionInput,
  UpdateSubscriptionInput
> {
  constructor() {
    super(prisma.subscription);
  }

  async getForUser(userId: string): Promise<Subscription[]> {
    try {
      return await prisma.subscription.findMany({
        where: { userId },
        orderBy: { renewalDate: "asc" },
      });
    } catch (error) {
      console.error(
        "[SubscriptionService] Error getting subscriptions:",
        error,
      );
      throw error;
    }
  }

  async createForUser(
    userId: string,
    data: CreateSubscriptionInput,
  ): Promise<Subscription> {
    try {
      return await prisma.subscription.create({
        data: {
          ...data,
          userId,
        },
      });
    } catch (error) {
      console.error(
        "[SubscriptionService] Error creating subscription:",
        error,
      );
      throw error;
    }
  }

  async getForUserById(
    userId: string,
    id: string,
  ): Promise<Subscription | null> {
    try {
      return await prisma.subscription.findFirst({
        where: { id, userId },
      });
    } catch (error) {
      console.error(
        "[SubscriptionService] Error getting subscription by id:",
        error,
      );
      throw error;
    }
  }

  async updateForUser(
    userId: string,
    id: string,
    data: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    try {
      const existing = await prisma.subscription.findFirst({
        where: { id, userId },
      });
      if (!existing) {
        throw new Error("Subscription not found");
      }

      return await prisma.subscription.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(
        "[SubscriptionService] Error updating subscription:",
        error,
      );
      throw error;
    }
  }

  async deleteForUser(userId: string, id: string): Promise<Subscription> {
    try {
      const existing = await prisma.subscription.findFirst({
        where: { id, userId },
      });
      if (!existing) {
        throw new Error("Subscription not found");
      }

      return await prisma.subscription.delete({
        where: { id },
      });
    } catch (error) {
      console.error(
        "[SubscriptionService] Error deleting subscription:",
        error,
      );
      throw error;
    }
  }
}

export const subscriptionService = new SubscriptionService();

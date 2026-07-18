/*
  Warnings:

  - You are about to drop the column `isActive` on the `subscriptions` table. All the data in the column will be lost.
  - Made the column `category` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "UsageFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'RARELY', 'NEVER');

-- DropForeignKey
ALTER TABLE "expense_entries" DROP CONSTRAINT "expense_entries_accountId_fkey";

-- AlterTable
ALTER TABLE "credential_records" ADD COLUMN     "linked_id" TEXT;

-- AlterTable
ALTER TABLE "expense_entries" ADD COLUMN     "familyMemberId" TEXT,
ADD COLUMN     "paidFromAccountId" TEXT;

-- AlterTable
ALTER TABLE "family_members" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "loan_accounts" ADD COLUMN     "coBorrowerId" TEXT,
ADD COLUMN     "paidFromAccountId" TEXT;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "isActive",
ADD COLUMN     "autoDebit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL DEFAULT 'MONTHLY',
ADD COLUMN     "cancelReminder" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "customCategoryId" TEXT,
ADD COLUMN     "endDate" DATE,
ADD COLUMN     "isEssential" BOOLEAN,
ADD COLUMN     "linkedBankAccountId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "startDate" DATE,
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "usageFrequency" "UsageFrequency",
ALTER COLUMN "category" SET NOT NULL;

-- CreateTable
CREATE TABLE "subscription_analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalSubscriptions" INTEGER NOT NULL DEFAULT 0,
    "monthlySpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "yearlySpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "activeSubscriptions" INTEGER NOT NULL DEFAULT 0,
    "unusedSubscriptions" INTEGER NOT NULL DEFAULT 0,
    "cancelledThisYear" INTEGER NOT NULL DEFAULT 0,
    "leakageScore" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_analytics_userId_key" ON "subscription_analytics"("userId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_category_idx" ON "subscriptions"("category");

-- AddForeignKey
ALTER TABLE "subscription_analytics" ADD CONSTRAINT "subscription_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

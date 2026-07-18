import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "@/lib/services/subscriptionService";
import {
  withAuth,
  getAuthContext,
  AuthLevel,
} from "@/lib/middleware/auth.middleware";
import { withErrorHandler } from "@/lib/middleware/error.middleware";
import {
  successResponse,
  errorResponse,
  ErrorCodes,
  StatusCodes,
  handlePrismaError,
} from "@/lib/middleware/standardResponse";

async function getHandler(request: NextRequest): Promise<NextResponse> {
  const authContext = getAuthContext(request);
  if (!authContext)
    return errorResponse(
      ErrorCodes.UNAUTHORIZED,
      "Auth required",
      StatusCodes.UNAUTHORIZED,
    );

  try {
    const subs = await subscriptionService.getForUser(authContext.userId);
    return successResponse(subs);
  } catch (error) {
    return handlePrismaError(error);
  }
}

async function postHandler(request: NextRequest): Promise<NextResponse> {
  const authContext = getAuthContext(request);
  if (!authContext)
    return errorResponse(
      ErrorCodes.UNAUTHORIZED,
      "Auth required",
      StatusCodes.UNAUTHORIZED,
    );

  try {
    const data = await request.json();
    if (!data.name || !data.amount || !data.renewalDate) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        "Name, amount, and renewal date are required",
        StatusCodes.BAD_REQUEST,
      );
    }

    const sub = await subscriptionService.createForUser(authContext.userId, {
      name: data.name,
      provider: data.provider,
      category: data.category || "other",
      amount: Number(data.amount),
      billingCycle: data.billingCycle || "MONTHLY",
      renewalDate: new Date(data.renewalDate),
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      paymentMethod: data.paymentMethod,
      autoDebit: Boolean(data.autoDebit),
      status: data.status || "ACTIVE",
      lastUsedDate: data.lastUsedDate ? new Date(data.lastUsedDate) : undefined,
      usageFrequency: data.usageFrequency,
      isEssential: Boolean(data.isEssential),
      cancelReminder: data.cancelReminder !== false,
      notes: data.notes,
    });
    return successResponse(sub, StatusCodes.CREATED);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export const GET = withAuth(
  withErrorHandler(getHandler),
  AuthLevel.AUTHENTICATED,
);
export const POST = withAuth(
  withErrorHandler(postHandler),
  AuthLevel.AUTHENTICATED,
);

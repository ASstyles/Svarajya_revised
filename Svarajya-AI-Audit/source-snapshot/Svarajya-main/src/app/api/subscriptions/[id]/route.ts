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

async function putHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const authContext = getAuthContext(request);
  if (!authContext)
    return errorResponse(
      ErrorCodes.UNAUTHORIZED,
      "Auth required",
      StatusCodes.UNAUTHORIZED,
    );

  try {
    const data = await request.json();
    const updated = await subscriptionService.updateForUser(
      authContext.userId,
      id,
      {
        name: data.name,
        provider: data.provider,
        category: data.category,
        amount: data.amount !== undefined ? Number(data.amount) : undefined,
        billingCycle: data.billingCycle,
        renewalDate: data.renewalDate ? new Date(data.renewalDate) : undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        paymentMethod: data.paymentMethod,
        autoDebit:
          data.autoDebit !== undefined ? Boolean(data.autoDebit) : undefined,
        status: data.status,
        lastUsedDate:
          data.lastUsedDate ? new Date(data.lastUsedDate) : undefined,
        usageFrequency: data.usageFrequency,
        isEssential:
          data.isEssential !== undefined ?
            Boolean(data.isEssential)
          : undefined,
        cancelReminder: data.cancelReminder,
        notes: data.notes,
      },
    );
    return successResponse(updated);
  } catch (error) {
    return handlePrismaError(error);
  }
}

async function deleteHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const authContext = getAuthContext(request);
  if (!authContext)
    return errorResponse(
      ErrorCodes.UNAUTHORIZED,
      "Auth required",
      StatusCodes.UNAUTHORIZED,
    );

  try {
    await subscriptionService.deleteForUser(authContext.userId, id);
    return successResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export const PUT = withAuth(
  withErrorHandler(putHandler),
  AuthLevel.AUTHENTICATED,
);
export const DELETE = withAuth(
  withErrorHandler(deleteHandler),
  AuthLevel.AUTHENTICATED,
);

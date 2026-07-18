# Automated Test Recommendations

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 3 (Bug, QA & Handover Lead)

---

## 1. Automated Testing Strategy

To ensure code stability and prevent regression of mapped bugs, we recommend implementing tests across 4 key tiers:

1. **Unit Tests (Vitest)**: For core calculators, validation rules, and helpers (e.g. subscription metrics, phone length validators).
2. **Component Tests (React Testing Library)**: For UI components such as inputs pre-fills, buttons toggles, and modals.
3. **API Integration Tests (Next.js Test Handler)**: To verify that endpoints (like `/api/expenses`, `/api/education`) correctly validate bodies and clear caches.
4. **Database Validation (Prisma Hooks / SQL Checks)**: To enforce data uniqueness (like primary accounts) at the database layer.

---

## 2. Priority Automation Targets

| Target Flow | Recommended Framework | Focus / Assertion |
| :--- | :--- | :--- |
| **Subscription Metrics** | Vitest / Jest | Assert that `calculateSubscriptionMetrics` handles MONTHLY/YEARLY cycles and dormancy correctly. |
| **Store Payload Frequency** | Vitest | Verify `ExpenseStore` POST payload contains `frequency = recurringFrequency` instead of undefined. |
| **Phone and Date Validations** | Vitest | Assert that phone inputs reject non-digits or >10 characters; assert DOB rejects future dates. |
| **Cache Invalidation** | Next.js API Test | Assert that PUT/DELETE routes for education records invalidate the `educationCache`. |

---

## 3. Draft Test Implementations
Draft tests have been written and saved under:
- `Svarajya-AI-Audit/audit-output/test-drafts/`

These scripts are isolated drafts for review and must NOT be injected into the production codebase.

# Executive Technical Summary

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 3 (Bug, QA & Handover Lead)

---

## 1. Executive Summary
This summary provides decision-makers and incoming engineers with a concise, evidence-backed evaluation of the Svarajya codebase. We highlights key database security exposures, critical code duplication patterns, and core failure modes in the authentication and state management layers.

---

## 2. Core Architectural Findings

### 2.1 Database Security Exposure (RLS Disabled)
- **Fact**: Row-Level Security (RLS) is disabled (`rls_enabled = false`) for **every single table** in the PostgreSQL `public` schema (75 tables total).
- **Implication**: All data separation between users is applied client-side or in the API controllers. If client keys or service credentials are leaked, any authenticated user can run queries to read, modify, or delete other users' records.
- **File Reference**: [DATABASE_STRUCTURE_SUMMARY.md](file:///c:/Users/avira/Downloads/Svarajya-main%206-7-26/Svarajya-AI-Audit/audit-output/DATABASE_STRUCTURE_SUMMARY.md)

### 2.2 Duplication & Tech Debt
- **Fact**: The codebase contains duplicate versions of stores, utils, and component assets.
- **Evidence**:
  - Store files (Zustand state managers) exist in `src/lib/` and are duplicated in `src/lib/stores/`.
  - Core math calculators like `subscriptionMetrics` are written in JS and duplicated in TS.
  - UI components in `components/shared` are duplicated in `components/ui/` (e.g. `PageGuide.tsx` and `YouTubeTutorial.tsx` are binary identical).
- **Implication**: Developer changes made on one copy do not affect the duplicate file, resulting in state deviation and desynced UI logic.

### 2.3 Service Layer Bypasses
- **Fact**: API routes query Prisma databases directly (e.g. `prisma.taxRecord.findFirst()`) instead of delegating queries to service singletons (e.g. `taxService`).
- **Implication**: Any validation checks, audit logging, or business workflows defined in the service layer are completely bypassed.

### 2.4 Google OAuth & Recovery Redirection Bug
- **Fact**: The server-side callback route `/callback` cannot access URL hash fragments containing access tokens.
- **Implication**: During password recovery, the server drops the token hash and redirects to `/reset-password` without parameters. This triggers "Invalid token" errors, while the session cookie remains active, automatically logging the user into `/rajya` without changing their password (Bug 2).

### 2.5 Local Cache Isolation (Education Loan Bug)
- **Fact**: `GET /api/education` serves records from a local, module-scoped cache `Map` defined in `src/app/api/education/route.ts`.
- **Implication**: Because the cache map is local, the PUT/DELETE handlers in `src/app/api/education/[id]/route.ts` cannot invalidate it. When the user updates their education loan status, the UI continues to render stale cache values for up to 30 seconds on page reload, making the indicator disappear (Bug 12).

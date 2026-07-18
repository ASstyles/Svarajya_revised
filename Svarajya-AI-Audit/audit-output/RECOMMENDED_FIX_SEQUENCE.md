# Recommended Fix Sequence

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Leads

---

## 1. Stabilization Plan

This sequence orders technical fixes by priority. We prioritize security and data-loss vulnerabilities first, followed by state mapping and code deduplication.

### Phase 1: Security & Session Fixes (Immediate)

#### 1. Restore Password Reset Flow (Bug 2)
- **Task**: Route password recovery links directly to `/reset-password` on the client side, or extract hash parameters client-side before calling callbacks, preventing server-side hash truncation in `/callback/route.ts`.
- **Verification**: User clicks password reset, resets password successfully, and redirects to login.

#### 2. Publish Google OAuth App (Bug 1)
- **Task**: Submit the Google Cloud Auth app for verification in Google Cloud Console and set Publishing Status to production to remove the test-user limit.
- **Verification**: Login succeeds for all standard Google accounts.

#### 3. Database RLS Hardening (Core Security)
- **Task**: Execute migrations to enable Row Level Security on all 75 tables in the `public` schema. Write policies restricting access:
  ```sql
  ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can access own profile" ON public.users FOR ALL TO authenticated USING (auth.uid() = id);
  ```
- **Verification**: Direct PostgreSQL queries using anon credentials fail to read records from other tenant IDs.

---

### Phase 2: Core Data Integrity & State Management

#### 4. Consolidate Local API Caches (Bug 12)
- **Task**: Move local `educationCache` to a shared cache utility or integrate invalidation hooks inside `src/app/api/education/[id]/route.ts` to clear the cache during updates and deletes.
- **Verification**: Updating education loan status immediately reflects on page refresh.

#### 5. Expense Store Frequency Property Sync (Bug 28)
- **Task**: In `src/lib/expenseStore.ts` line 199, replace the undefined reference `entry.frequency` with the correct store property `entry.recurringFrequency`.
- **Verification**: Creating a recurring expense correctly writes the selected cycle frequency (monthly, quarterly, annual) to the `frequency` database column.

#### 6. Bank Account Primary Status check (Bug 22)
- **Task**: When marking a bank account as primary, add logic in `bankService` to unset primary flags on all other accounts for that user first.
- **Verification**: Only one bank account is primary in `bank_accounts` at any time.

---

### Phase 3: Code Refactoring & Deduplication

#### 7. Deduplicate Zustand Stores
- **Task**: Delete duplicate Zustand store files under `src/lib/` (`bankStore`, `credentialStore`, etc.) and standardize imports to load from `src/lib/stores/`.
- **Verification**: Run `npx tsc --noEmit` to verify type checking.

#### 8. Clean Redundant Components
- **Task**: Remove identical files in `components/shared` vs `components/ui` and re-map layout links.

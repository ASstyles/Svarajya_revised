# Recommended Technical Fix Sequence

**Date:** 2026-07-22  
**Strategy:** Security & Data Integrity First, Core Financial Journeys Second, Optional Scope Third  

---

## Fix Phases

### Phase 1: Critical Security & Auth Boundaries (Week 1)
1. **Google Auth Callback Token Parsing:** Fix hash parsing client-side in `src/app/(auth)/callback/route.ts` (`BUG-002`).
2. **Service Role Key Boundary Audit:** Ensure service role keys are restricted strictly to server-side API routes (`SUP-002`).

### Phase 2: Database Integrity & RLS Enforcement (Week 2)
1. **Database RLS Policies:** Enable Supabase RLS policies for user-sensitive tables (`users`, `bank_accounts`, `documents`) (`TBL-001`..`TBL-075`).
2. **Vault Storage Bucket Access:** Configure private storage policies on `user_documents` bucket (`SUP-003`).

### Phase 3: Core Financial CRUD & Calculation Engine (Week 3)
1. **Net Worth Calculation Engine:** Fix null/zero handling in financial calculation helpers (`BUG-010`).
2. **Bank Hub & Investment CRUD Propagation:** Fix state mutation in dashboard summary hooks (`BUG-012`).

### Phase 4: Product Scope / Deferred Features (Post-MVP)
1. **Reminders Module:** Reminders are deferred to post-MVP scope. Treat as future implementation work, not a release blocker.

---

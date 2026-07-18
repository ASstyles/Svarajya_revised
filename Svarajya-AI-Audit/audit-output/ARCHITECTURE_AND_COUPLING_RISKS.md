# Architecture and Coupling Risks Report

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 1 (Codebase & Architecture Lead)

---

## 1. Executive Summary
This report analyzes structural, logical, and code-level architectural risks in the Svarajya application. We identify significant codebase duplication (components, stores, and utilities), bypasses of the service encapsulation layer, weak input validations, and tightly coupled database interactions that present stability and maintainability risks.

---

## 2. Key Architectural Risks

### 2.1 Bypassing the Service Layer
- **Description**: Next.js API routes (`src/app/api/...`) frequently perform direct queries to the database using the `prisma` client instead of routing calls through the corresponding domain service class in `src/lib/services/`.
- **Impact**: Bypassing services breaks the encapsulation of business logic. If security logging, schema verification, audit tracking, or validation logic is defined inside the services (e.g. `identityService`), it will be completely ignored when the API endpoint queries `prisma.documentMeta` directly.
- **Evidence**:
  - `src/app/api/tax/records/[id]/route.ts#L21`: Calls `prisma.taxRecord.findFirst()` bypassing `TaxService`.
  - `src/app/api/succession/will/route.ts#L11`: Calls `prisma.successionWill.findUnique()` bypassing `WillService`.
  - `src/app/api/identity/[id]/route.ts#L29`: Calls `prisma.documentMeta.findFirst()` bypassing `IdentityService`.
  - `src/app/api/nominee/assets/route.ts#L21`: Queries `prisma.nomineeMapping` directly bypassing `NomineeService`.

### 2.2 Massive File Duplication (Visual & Code)
- **Description**: Identical or nearly identical store files, components, and helper utilities are duplicated in multiple directories. This appears to be a result of developer branch merging without proper consolidation.
- **Impact**: Updates to a store or utility in one path will not propagate to the duplicate file in the other path, causing different parts of the application to run conflicting logic.
- **Key Duplication Groups**:
  1. **Zustand Stores**:
     - `src/lib/bankStore.ts` (11.3 KB) vs `src/lib/stores/bankStore.ts` (11.2 KB)
     - `src/lib/credentialStore.ts` (21.0 KB) vs `src/lib/stores/credentialStore.ts` (19.4 KB)
     - `src/lib/expenseStore.ts` (22.6 KB) vs `src/lib/stores/expenseStore.ts` (20.6 KB)
     - `src/lib/identityStore.ts` (12.3 KB) vs `src/lib/stores/identityStore.ts` (12.4 KB)
     - `src/lib/incomeStore.ts` (27.6 KB) vs `src/lib/stores/incomeStore.ts` (27.1 KB)
  2. **Utilities**:
     - `src/lib/crypto.ts` vs `src/lib/utils/crypto.ts` (identical, 3.4 KB)
     - `src/lib/cloudDriveSync.ts` vs `src/lib/utils/cloudDriveSync.ts` (identical, 3.0 KB)
     - `src/lib/vaultExporter.ts` (1.7 KB) vs `src/lib/utils/vaultExporter.ts` (1.7 KB)
  3. **Shared Components**:
     - `src/components/shared/PageGuide.tsx` vs `src/components/ui/PageGuide.tsx` (identical, 1.4 KB)
     - `src/components/shared/UserAvatar.tsx` (4.3 KB) vs `src/components/ui/UserAvatar.tsx` (3.7 KB)
     - `src/components/shared/AlertToast.tsx` (4.7 KB) vs `src/components/ui/AlertToast.tsx` (4.7 KB)
     - `src/components/tutorials/YouTubeTutorial.tsx` vs `src/components/ui/YouTubeTutorial.tsx` (identical, 4.4 KB)
  4. **Module Games**:
     - `src/components/module1/FamilyTreeGame.tsx` (24.0 KB) vs `src/components/games/FamilyTreeForge.tsx` (26.9 KB)
     - `src/components/module1/MandalaIdentityGame.tsx` vs `src/components/games/MandalaLinkBoard.tsx` (identical, 11.5 KB)
     - `src/components/module1/ScrollAssemblyGame.tsx` vs `src/components/games/ScrollIndexing.tsx` (identical, 10.0 KB)

### 2.3 Business Logic Redundancy (JavaScript vs TypeScript)
- **Description**: The subscription metrics calculations are implemented both in TypeScript (`src/lib/subscriptionMetrics.ts`) and JavaScript (`src/lib/subscriptionMetrics.js`).
- **Impact**: Any change in subscription logic (e.g. adding new cycles or dormancy conditions) requires updating both files simultaneously, increasing the risk of code deviation and unit test failures.

### 2.4 Lack of Server-Side Input Validation
- **Description**: Next.js API routes accept incoming JSON bodies and update Prisma tables without verifying format logic (such as checking if a date of birth is in the future, if a DIN is exactly 8 digits, or if a phone number contains only numeric characters).
- **Impact**: Validation checks are only implemented on the client side. A user can easily bypass validations using API clients (like Postman/cURL) or browser dev tools, injecting malformed or corrupt data into the database.
- **Evidence**:
  - `src/app/api/succession/emergency/route.ts`: Upserts emergency contact details without enforcing 10-digit formats on `primaryPhone` and `secondaryPhone`.
  - `src/app/api/tax/records/route.ts`: Stores ITR records with unchecked future filing dates.

### 2.5 Implicit State Coupling & Race Conditions
- **Description**: Auth session hydration (`AuthSync.tsx`) fetches user profile properties and seeds the onboarding state (`OnboardingStore`) dynamically. Simultaneously, route middleware redirects requests based on session presence.
- **Impact**: If database reads from `/api/profile` lag during authentication, the UI may route the user to `/onboarding/intro` temporarily before reloading the page and redirecting to `/rajya`, creating a jarring user experience and layout flickering.

---

## 3. Recommended Remediation Strategy

1. **Service Layer Consolidation**:
   - Enforce database writes and reads inside API routes to go through the service class singleton.
   - Refactor `src/app/api/tax/` to call `TaxService` methods instead of direct `prisma.taxRecord` calls.
2. **Codebase Cleanup & Deduplication**:
   - Delete the duplicate stores directly under `src/lib/` and standardize all imports to import from `src/lib/stores/`.
   - Remove redundant JS logic (`subscriptionMetrics.js`) and have the testing environment parse the TypeScript file.
   - Standardize components by retaining only the versions in `src/components/ui/` or `src/components/shared/` and clearing the copies.
3. **Standardized API Request Validation**:
   - Integrate Zod schema validation within all Next.js POST/PUT API handlers to enforce field validation rules (e.g. phone formats, numeric checks) on the server.

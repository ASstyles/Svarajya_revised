# Svarajya Application - Repository Inventory Report

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 1 (Codebase & Architecture Lead)

---

## 1. Executive Summary
This report provides a detailed map of the Svarajya application directory structures, framework choices, routing architecture, database configuration files, and duplicated assets. The project is built using Next.js 15+ (App Router), TypeScript, Prisma ORM, and Supabase for Auth and Storage.

---

## 2. Technology Stack & Framework Choices
- **Core Framework**: Next.js 15.1.4 (React 19)
- **Programming Language**: TypeScript
- **Styling**: TailwindCSS & Vanilla CSS
- **Database Client**: Prisma ORM (client singleton defined in `src/lib/prisma.ts`)
- **Serverless & Authentication**: Supabase Auth (`@supabase/ssr` client factories in `src/lib/supabase/`)
- **State Management**: Localized Zustand stores (or custom reactive stores duplicated in `src/lib/stores/` and `src/lib/`)
- **Database Engine**: Supabase PostgreSQL 17.6

---

## 3. Directory Layout & Application Structure
- `src/app/`: App router page components and REST API routes
- `src/components/`: Modular React components grouped by functional domain
- `src/config/`: Configuration parameters for modules, chapters, and tutorial cards
- `src/context/`: Core React context providers for themes and languages
- `src/lib/`: Unified database clients, API wrappers, business logic engines, stores, services, and utilities
- `src/locales/`: Localisation JSON bundles for translations
- `prisma/`: Prisma database schema definitions and SQL migration scripts
- `public/`: Static images, icons, and logo assets

---

## 4. Routes and Pages Map

### 4.1 Marketing Routes (Public)
- `src/app/(landing)/about/page.tsx`
- `src/app/(landing)/blog/page.tsx`
- `src/app/(landing)/careers/page.tsx`
- `src/app/(landing)/contact/page.tsx`
- `src/app/(landing)/customers-reviews/page.tsx`
- `src/app/(landing)/features/page.tsx`
- `src/app/(landing)/forget-password/page.tsx`
- `src/app/(landing)/login/page.tsx`
- `src/app/(landing)/map/page.tsx`
- `src/app/(landing)/page.tsx`
- `src/app/(landing)/partner-with-us/page.tsx`
- `src/app/(landing)/pricing/page.tsx`
- `src/app/(landing)/privacy/page.tsx`
- `src/app/(landing)/register/page.tsx`
- `src/app/(landing)/roadmap/page.tsx`
- `src/app/(landing)/security/page.tsx`
- `src/app/(landing)/terms/page.tsx`

### 4.2 Authentication Routes
- `src/app/(auth)/intro-cinematic/page.tsx`
- `src/app/(auth)/reset-password/page.tsx`
- `src/app/(auth)/start/page.tsx`
- `src/app/(auth)/verify-email/page.tsx`

### 4.3 Onboarding Routes
- `src/app/(onboarding)/onboarding/contact-info/page.tsx`
- `src/app/(onboarding)/onboarding/dob/page.tsx`
- `src/app/(onboarding)/onboarding/family/page.tsx`
- `src/app/(onboarding)/onboarding/firstwin/page.tsx`
- `src/app/(onboarding)/onboarding/intro/page.tsx`
- `src/app/(onboarding)/onboarding/name/page.tsx`
- `src/app/(onboarding)/onboarding/occupation/page.tsx`
- `src/app/(onboarding)/onboarding/status/page.tsx`

### 4.4 Dashboard Routes (Protected)
- `src/app/(dashboard)/beej/page.tsx`
- `src/app/(dashboard)/bhoomi/[id]/edit/page.tsx`
- `src/app/(dashboard)/bhoomi/add/page.tsx`
- `src/app/(dashboard)/bhoomi/page.tsx`
- `src/app/(dashboard)/doot/page.tsx`
- `src/app/(dashboard)/dwaar/portals/access/page.tsx`
- `src/app/(dashboard)/dwaar/portals/add/page.tsx`
- `src/app/(dashboard)/dwaar/portals/page.tsx`
- `src/app/(dashboard)/dwaar/portals/portal/[id]/page.tsx`
- `src/app/(dashboard)/foundation/education/[id]/edit/page.tsx`
- `src/app/(dashboard)/foundation/education/page.tsx`
- `src/app/(dashboard)/foundation/family/page.tsx`
- `src/app/(dashboard)/foundation/page.tsx`
- `src/app/(dashboard)/granthagaar/page.tsx`
- `src/app/(dashboard)/kar/din/[id]/edit/page.tsx`
- `src/app/(dashboard)/kar/din/new/page.tsx`
- `src/app/(dashboard)/kar/din/page.tsx`
- `src/app/(dashboard)/kar/gst/[id]/edit/page.tsx`
- `src/app/(dashboard)/kar/gst/new/page.tsx`
- `src/app/(dashboard)/kar/gst/page.tsx`
- `src/app/(dashboard)/kar/itr/[id]/edit/page.tsx`
- `src/app/(dashboard)/kar/itr/new/page.tsx`
- `src/app/(dashboard)/kar/itr/page.tsx`
- `src/app/(dashboard)/kar/page.tsx`
- `src/app/(dashboard)/khate/accounts/[id]/edit/page.tsx`
- `src/app/(dashboard)/khate/accounts/add/page.tsx`
- `src/app/(dashboard)/khate/accounts/cash/page.tsx`
- `src/app/(dashboard)/khate/accounts/flow/page.tsx`
- `src/app/(dashboard)/khate/accounts/idle/page.tsx`
- `src/app/(dashboard)/khate/accounts/page.tsx`
- `src/app/(dashboard)/khate/cash-flow/page.tsx`
- `src/app/(dashboard)/khate/cash/page.tsx`
- `src/app/(dashboard)/khate/idle-detection/page.tsx`
- `src/app/(dashboard)/kosh/add/page.tsx`
- `src/app/(dashboard)/kosh/analytics/page.tsx`
- `src/app/(dashboard)/kosh/dependency/page.tsx`
- `src/app/(dashboard)/kosh/disposable/page.tsx`
- `src/app/(dashboard)/kosh/income/[id]/edit/page.tsx`
- `src/app/(dashboard)/kosh/income/page.tsx`
- `src/app/(dashboard)/kosh/page.tsx`
- `src/app/(dashboard)/kosh/record/[id]/page.tsx`
- `src/app/(dashboard)/kosh/sources/add/page.tsx`
- `src/app/(dashboard)/kosh/sources/page.tsx`
- `src/app/(dashboard)/lakshya/page.tsx`
- `src/app/(dashboard)/leakage/page.tsx`
- `src/app/(dashboard)/leakage/subscriptions/page.tsx`
- `src/app/(dashboard)/mantri/page.tsx`
- `src/app/(dashboard)/mitra/assets/page.tsx`
- `src/app/(dashboard)/mitra/page.tsx`
- `src/app/(dashboard)/mitra/will/page.tsx`
- `src/app/(dashboard)/notifications/page.tsx`
- `src/app/(dashboard)/pehchaan/mapping/add/page.tsx`
- `src/app/(dashboard)/pehchaan/mapping/page.tsx`
- `src/app/(dashboard)/pehchaan/records/[id]/edit/page.tsx`
- `src/app/(dashboard)/pehchaan/records/add/page.tsx`
- `src/app/(dashboard)/pehchaan/records/doc/[id]/page.tsx`
- `src/app/(dashboard)/pehchaan/records/links/add/page.tsx`
- `src/app/(dashboard)/pehchaan/records/links/page.tsx`
- `src/app/(dashboard)/pehchaan/records/page.tsx`
- `src/app/(dashboard)/pehchaan/records/renewals/page.tsx`
- `src/app/(dashboard)/pehchaan/records/settings/page.tsx`
- `src/app/(dashboard)/pehchaan/settings/page.tsx`
- `src/app/(dashboard)/pehchaan/validity/page.tsx`
- `src/app/(dashboard)/raj-mantri/page.tsx`
- `src/app/(dashboard)/rajya/page.tsx`
- `src/app/(dashboard)/raksha/page.tsx`
- `src/app/(dashboard)/raksha/policies/[id]/edit/page.tsx`
- `src/app/(dashboard)/raksha/policies/[id]/page.tsx`
- `src/app/(dashboard)/raksha/policies/add/page.tsx`
- `src/app/(dashboard)/raksha/policies/page.tsx`
- `src/app/(dashboard)/rin/loans/[id]/edit/page.tsx`
- `src/app/(dashboard)/rin/loans/[id]/page.tsx`
- `src/app/(dashboard)/rin/loans/add/page.tsx`
- `src/app/(dashboard)/rin/loans/page.tsx`
- `src/app/(dashboard)/rin/page.tsx`
- `src/app/(dashboard)/sampatti/page.tsx`
- `src/app/(dashboard)/subscriptions/page.tsx`
- `src/app/(dashboard)/succession/emergency/page.tsx`
- `src/app/(dashboard)/succession/nominees/page.tsx`
- `src/app/(dashboard)/succession/page.tsx`
- `src/app/(dashboard)/succession/scan/page.tsx`
- `src/app/(dashboard)/succession/tutorial/page.tsx`
- `src/app/(dashboard)/succession/will/page.tsx`
- `src/app/(dashboard)/suchak/page.tsx`
- `src/app/(dashboard)/suraksha/page.tsx`
- `src/app/(dashboard)/vault/page.tsx`
- `src/app/(dashboard)/vyaya/add/page.tsx`
- `src/app/(dashboard)/vyaya/analytics/page.tsx`
- `src/app/(dashboard)/vyaya/budget/page.tsx`
- `src/app/(dashboard)/vyaya/categories/page.tsx`
- `src/app/(dashboard)/vyaya/entry/add/page.tsx`
- `src/app/(dashboard)/vyaya/entry/page.tsx`
- `src/app/(dashboard)/vyaya/page.tsx`
- `src/app/(dashboard)/vyaya/subscriptions/add/page.tsx`
- `src/app/(dashboard)/vyaya/subscriptions/page.tsx`

### 4.5 API Routes (REST)
- `src/app/api/auth/create-user/route.ts`
- `src/app/api/auth/google-callback/route.ts`
- `src/app/api/auth/google-status/route.ts`
- `src/app/api/auth/google/route.ts`
- `src/app/api/auth/link-google/route.ts`
- `src/app/api/auth/send-confirmation/route.ts`
- `src/app/api/auth/send-otp/route.ts`
- `src/app/api/auth/send-reset/route.ts`
- `src/app/api/auth/send-welcome/route.ts`
- `src/app/api/auth/unlink-google/route.ts`
- `src/app/api/auth/verify-otp/route.ts`
- `src/app/api/auth/webhook/route.ts`
- `src/app/api/bank/[id]/route.ts`
- `src/app/api/bank/route.ts`
- `src/app/api/bhoomi/properties/[id]/route.ts`
- `src/app/api/bhoomi/properties/route.ts`
- `src/app/api/budget/route.ts`
- `src/app/api/check-phone/route.ts`
- `src/app/api/check-user/route.ts`
- `src/app/api/contact/route.ts`
- `src/app/api/credentials/[id]/route.ts`
- `src/app/api/credentials/route.ts`
- `src/app/api/din/records/[id]/route.ts`
- `src/app/api/din/records/route.ts`
- `src/app/api/documents/route.ts`
- `src/app/api/education/[id]/route.ts`
- `src/app/api/education/route.ts`
- `src/app/api/expense-categories/route.ts`
- `src/app/api/expenses/[id]/route.ts`
- `src/app/api/expenses/route.ts`
- `src/app/api/family/route.ts`
- `src/app/api/google-drive/download/route.ts`
- `src/app/api/google-drive/upload/route.ts`
- `src/app/api/google-drive/view/route.ts`
- `src/app/api/gst/records/[id]/route.ts`
- `src/app/api/gst/records/route.ts`
- `src/app/api/identity/[id]/route.ts`
- `src/app/api/identity/links/route.ts`
- `src/app/api/identity/reminders/route.ts`
- `src/app/api/identity/route.ts`
- `src/app/api/identity/settings/route.ts`
- `src/app/api/income/[id]/route.ts`
- `src/app/api/income/route.ts`
- `src/app/api/insurance/[id]/route.ts`
- `src/app/api/insurance/route.ts`
- `src/app/api/kar/din/route.ts`
- `src/app/api/kar/gst/route.ts`
- `src/app/api/kar/insights/route.ts`
- `src/app/api/kar/summary/route.ts`
- `src/app/api/kar/tax/route.ts`
- `src/app/api/loans/[id]/route.ts`
- `src/app/api/loans/route.ts`
- `src/app/api/nominee/[id]/route.ts`
- `src/app/api/nominee/assets/route.ts`
- `src/app/api/nominee/route.ts`
- `src/app/api/notifications/[id]/route.ts`
- `src/app/api/notifications/read-all/route.ts`
- `src/app/api/notifications/route.ts`
- `src/app/api/profile/route.ts`
- `src/app/api/reminders/route.ts`
- `src/app/api/subscriptions/[id]/route.ts`
- `src/app/api/subscriptions/route.ts`
- `src/app/api/succession/assets/route.ts`
- `src/app/api/succession/emergency/route.ts`
- `src/app/api/succession/nominees/[id]/route.ts`
- `src/app/api/succession/nominees/route.ts`
- `src/app/api/succession/will/route.ts`
- `src/app/api/tax/records/[id]/route.ts`
- `src/app/api/tax/records/route.ts`
- `src/app/api/user/route.ts`
- `src/app/api/will/route.ts`

---

## 5. Duplicate and Unused Files Catalog

The repository contains significant layout duplication where stores, utility classes, and components are mirrored across multiple directories. This introduces code maintenance debt and risk of inconsistent state logic.

| File Path A | File Path B (Duplicate / Mirror) | Risk Level |
| :--- | :--- | :--- |
| `src/components/landing/ConsentModal.tsx` | `src/components/landing/modals/ConsentModal.tsx` | High |
| `src/components/landing/LoadingSkeleton.tsx` | `src/components/landing/modals/LoadingSkeleton.tsx` | High |
| `src/components/landing/RoyalSealModal.tsx` | `src/components/landing/modals/RoyalSealModal.tsx` | High |
| `src/components/landing/ZoneCard.tsx` | `src/components/landing/zones/ZoneCard.tsx` | High |
| `src/components/landing/utils/cn.ts` | `src/lib/landing/cn.ts` | High |
| `src/components/landing/utils/navigationHistory.ts` | `src/lib/landing/navigationHistory.ts` | High |
| `src/components/shared/NumberInputRupee.tsx` | `src/components/treasury/NumberInputRupee.tsx` | High |
| `src/components/shared/UserAvatar.tsx` | `src/components/ui/UserAvatar.tsx` | High |
| `src/components/shared/AlertToast.tsx` | `src/components/ui/AlertToast.tsx` | High |
| `src/components/shared/AuthSync.tsx` | `src/components/ui/AuthSync.tsx` | High |
| `src/components/shared/GlobalTopRightMenu.tsx` | `src/components/ui/GlobalTopRightMenu.tsx` | High |
| `src/components/shared/PageGuide.tsx` | `src/components/ui/PageGuide.tsx` | High |
| `src/components/tutorials/YouTubeTutorial.tsx` | `src/components/ui/YouTubeTutorial.tsx` | High |
| `src/components/tutorials/TutorialCard.tsx` | `src/components/ui/VideoTutorialPlaceholder.tsx` | High |
| `src/components/module1/FamilyTreeGame.tsx` | `src/components/games/FamilyTreeForge.tsx` | High |
| `src/components/module1/MandalaIdentityGame.tsx` | `src/components/games/MandalaLinkBoard.tsx` | High |
| `src/components/module1/ScrollAssemblyGame.tsx` | `src/components/games/ScrollIndexing.tsx` | High |
| `src/components/module/MicroLearningWrapper.tsx` | `src/components/games/MicroLearningWrapper.tsx` | High |
| `src/components/module/NumberInputGame.tsx` | `src/components/games/NumberInputGame.tsx` | High |
| `src/components/module/SelectGridGame.tsx` | `src/components/games/SelectGridGame.tsx` | High |
| `src/lib/localVaultEngine.ts` | `src/lib/engines/localVaultEngine.ts` | High |
| `src/lib/crypto.ts` | `src/lib/utils/crypto.ts` | High |
| `src/lib/cloudDriveSync.ts` | `src/lib/utils/cloudDriveSync.ts` | High |
| `src/lib/vaultExporter.ts` | `src/lib/utils/vaultExporter.ts` | High |
| `src/lib/bankStore.ts` | `src/lib/stores/bankStore.ts` | High |
| `src/lib/credentialStore.ts` | `src/lib/stores/credentialStore.ts` | High |
| `src/lib/expenseStore.ts` | `src/lib/stores/expenseStore.ts` | High |
| `src/lib/identityStore.ts` | `src/lib/stores/identityStore.ts` | High |
| `src/lib/incomeStore.ts` | `src/lib/stores/incomeStore.ts` | High |
| `src/lib/themeStore.ts` | `src/lib/stores/themeStore.ts` | High |
| `src/lib/types.ts` | `src/lib/stores/types.ts` | High |
| `src/lib/subscriptionMetrics.ts` | `src/lib/subscriptionMetrics.js` | High |

---

## 6. Project Configuration Summary
- **Type Check Command**: `npx tsc --noEmit`
- **Lint Command**: `eslint` (config defined in `eslint.config.mjs`)
- **Prisma Schema Location**: `prisma/schema.prisma`
- **Supabase Clients**:
  - Browser Client: `src/lib/supabase/client.ts`
  - Server Client: `src/lib/supabase/server.ts`
  - Middleware client: `src/lib/supabase/middleware.ts`

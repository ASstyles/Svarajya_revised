# Svarajya Repository Inventory

**Audit date:** 2026-07-19  
**Mode:** Local, read-only source audit  
**Source root:** `source-snapshot/Svarajya-main-6-7-26/Svarajya-main/`  
**External verification:** Not performed  

## Confidence scale

- **Confirmed:** Directly observed in the supplied source snapshot.
- **Strong Evidence:** Supported by supplied team evidence and consistent with the snapshot, but not independently checked against the live service or Git host.
- **Probable:** Multiple local clues support the conclusion, but a runtime or owner check is still needed.
- **Unconfirmed:** Required evidence is absent or cannot be validated within this offline audit.

## Repository identity

| Item | Finding | Confidence | Evidence |
|---|---|---|---|
| Package name | `life-balance` | Confirmed | `package.json` (`name`) |
| Product name | Svarajya | Confirmed | `README.md`; `src/app/layout.tsx` metadata |
| Application framework | Next.js App Router, React, TypeScript | Confirmed | `package.json`; `src/app/` |
| Snapshot Git metadata | No `.git` directory is present in the audit workspace | Confirmed | Workspace safety scan; detached `source-snapshot/` contents |
| Reported live branch | `main` | Strong Evidence | `audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` |
| Reported live commit | `d0704e27738e068b7e9b886327b163bb73b8c5c9` | Strong Evidence | `audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` |
| Snapshot-to-live commit equality | Cannot be proven without Git metadata or external access | Unconfirmed | No `.git`; no manifest tying the ZIP to a commit |

## Technology inventory

| Layer | Technology or package | Version/evidence | Confidence |
|---|---|---|---|
| Web framework | Next.js | `^16.2.4` in `package.json` | Confirmed |
| UI runtime | React / React DOM | `19.2.3` | Confirmed |
| Language | TypeScript with JavaScript allowed | `typescript ^5`; `tsconfig.json` has `strict: true`, `allowJs: true` | Confirmed |
| Styling | Tailwind CSS | `tailwindcss ^4`; `src/app/globals.css` | Confirmed |
| Server ORM | Prisma Client | `@prisma/client ^5.22.0`; `src/lib/prisma.ts` | Confirmed |
| Database | PostgreSQL | `prisma/schema.prisma` datasource uses `DATABASE_URL` and `DIRECT_URL` | Confirmed |
| Auth/session | Supabase Auth through `@supabase/ssr` and `@supabase/supabase-js` | `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts` | Confirmed |
| Object storage | Local IndexedDB/OPFS, Google Drive, and optional Supabase Storage paths | `src/lib/vault.ts`; `src/components/vault/FileUploader.tsx`; Google Drive API routes | Confirmed |
| Client state | Custom singleton stores plus Zustand | `src/lib/*Store.ts`; `src/lib/stores/*Store.ts`; `zustand ^5.0.5` | Confirmed |
| Email | Resend | `resend ^6.12.2`; auth email route files | Confirmed |
| Firebase | Dependency and initialized client file exist | `package.json`; `src/lib/firebase/firebase.ts` | Confirmed |
| Firebase runtime use | No Firebase imports outside `src/lib/firebase/firebase.ts` were found in the inspected snapshot | Probable | Repository import search; runtime tree-shaking/build not executed |

## Source topology

Direct file counts from the snapshot:

| Area | Count | Evidence | Confidence |
|---|---:|---|---|
| Files under `src/` | 385 | Local filesystem count | Confirmed |
| App pages (`page.tsx`) | 125 | Local filesystem count | Confirmed |
| Dashboard pages | 95 | `src/app/(dashboard)/**/page.tsx` | Confirmed |
| Landing pages | 17 | `src/app/(landing)/**/page.tsx` | Confirmed |
| Onboarding pages | 8 | `src/app/(onboarding)/**/page.tsx` | Confirmed |
| Auth-group pages | 4 | `src/app/(auth)/**/page.tsx` | Confirmed |
| Additional Google auth success page | 1 | `src/app/auth/google/success/page.tsx` | Confirmed |
| API route handlers | 71 | `src/app/api/**/route.ts` | Confirmed |
| Components | 79 | `src/components/` file count | Confirmed |
| Service files | 24 | `src/lib/services/` | Confirmed |
| Store files in canonical-looking subfolder | 11 | `src/lib/stores/` | Confirmed |
| Engine files | 5 | `src/lib/engines/` | Confirmed |
| Supabase client helpers | 3 | `src/lib/supabase/` | Confirmed |
| Prisma migration files | 20 | `prisma/migrations/**/migration.sql` | Confirmed |
| Prisma models | 69 | `model` declarations in `prisma/schema.prisma` | Confirmed |

## Directory responsibilities

| Path | Responsibility | Representative symbols | Confidence |
|---|---|---|---|
| `src/app/(landing)/` | Public marketing and auth entry redirects | `LoginRedirect`, `RegisterRedirect` | Confirmed |
| `src/app/(auth)/` | Start/login/signup UI, email verification, password reset, callback routing | `StartPage` default component, `VerifyEmailClient`, callback `GET` | Confirmed |
| `src/app/(onboarding)/` | First-login profile setup | onboarding page components; `OnboardingStore` consumers | Confirmed |
| `src/app/(dashboard)/` | Authenticated product modules and dashboards | `Dashboard`, `FoundationHub`, `IdentityHub`, `BankHub`, others | Confirmed |
| `src/app/api/` | Route-handler API layer | exported `GET`, `POST`, `PUT`, `PATCH`, `DELETE` handlers | Confirmed |
| `src/components/layouts/` | Shared desktop/mobile shell | `DashboardLayout`, `DesktopSidebar`, `DesktopRightPanel`, `BottomNav` | Confirmed |
| `src/components/providers/` | Global React providers | `AuthProvider`, `ThemeProvider`, `ToastProvider` | Confirmed |
| `src/components/vault/` | Reused document upload UI | `FileUploader` | Confirmed |
| `src/lib/services/` | Prisma-backed domain services and local document service | `userService`, `incomeService`, `insuranceService`, `notificationService`, `Vault` | Confirmed |
| `src/lib/stores/` | Newer client stores and Zustand stores | `IncomeStore`, `ExpenseStore`, `IdentityStore`, `useSampattiStore` | Confirmed |
| `src/lib/` top level | Older parallel stores plus auth/storage utilities | `IncomeStore`, `IdentityStore`, `Vault`, `getValidGoogleAccessToken` | Confirmed |
| `src/lib/supabase/` | Browser, server, and middleware Supabase clients | three `createClient`/`updateSession` helpers | Confirmed |
| `src/config/` | Module, chapter, Rajya, and tutorial configuration | `MODULES`, `MODULE_ORDER` | Confirmed |
| `prisma/` | PostgreSQL schema and migrations | 69 models; 20 migration files | Confirmed |

## Application composition

`src/app/layout.tsx` installs `ThemeProvider`, `AuthProvider`, `ToastProvider`, `LanguageProvider`, and `OAuthFragmentHandler` around all routes. Dashboard routes pass through `src/app/(dashboard)/layout.tsx`, which renders `DashboardLayout`. `DashboardLayout` composes `AuthSync`, `AlertToast`, `DesktopSidebar`, `DesktopRightPanel`, `GlobalTopRightMenu`, and `BottomNav`.

The route middleware is `src/middleware.ts`, which delegates to `updateSession()` in `src/lib/supabase/middleware.ts`. Its matcher excludes `/api/*`; API authorization is therefore owned by each API route, usually through `withAuth()` from `src/lib/middleware/auth.middleware.ts` or a direct Supabase session check.

**Confidence:** Confirmed.

## Data and storage architecture

| Plane | Implementation | Modules/uses | Confidence | Evidence |
|---|---|---|---|---|
| Application relational data | Prisma Client to PostgreSQL | Profile, family, education, identity metadata, credentials, income, expenses, bank, insurance, loans, property, tax, succession, notifications | Confirmed | `src/lib/services/*.ts`; API routes; `prisma/schema.prisma` |
| Supabase database query API | No direct table query chain was found | None confirmed | Confirmed for this snapshot | Repository scan for `.from`, `.select`, `.insert`, `.upsert`, `.update`, `.delete`, `.rpc` rooted in Supabase usage |
| Supabase Auth | Browser/server session, user metadata, password auth, admin user operations | Login, signup support, password reset, Google-login bridge, middleware | Confirmed | `src/app/(auth)/start/page.tsx`; auth routes; Supabase helpers |
| Supabase Storage | `upload`, `getPublicUrl`, `remove` | Foundation profile photos and optional `FileUploader` storage | Confirmed | `src/app/(dashboard)/foundation/page.tsx`; `src/components/vault/FileUploader.tsx` |
| Local document vault | IndexedDB/OPFS-style browser storage | Vault, identity, insurance, loan, tax, property documents | Confirmed | `src/lib/vault.ts`; `src/lib/services/documentService.ts`; `FileUploader` consumers |
| Google Drive | OAuth tokens stored on the Prisma `User`; upload/view/download routes | Document upload and cloud access | Confirmed | `src/lib/googleAuth.ts`; `src/lib/googleDriveUtils.ts`; `src/app/api/google-drive/` |
| Firebase | Initialized but no consumer found | None confirmed | Probable dead or dormant path | `src/lib/firebase/firebase.ts`; import scan |

## Module reconciliation

`src/config/modules.config.ts` defines 21 official modules. Eleven are marked `isImplemented: true`; ten are marked `false`. Direct source evidence also shows four functional dashboard areas that are not entries in that config: Rajya, Notifications, Vault, and Succession.

Important reconciliations:

| Finding | Confidence | Evidence |
|---|---|---|
| Bhoomi is marked `isImplemented: false` but has list/add/edit pages, API routes, `bhoomiService`, and a Prisma `PropertyAsset` model | Confirmed | `src/config/modules.config.ts`; `src/app/(dashboard)/bhoomi/`; `src/app/api/bhoomi/`; `src/lib/services/bhoomiService.ts` |
| `/rajya` is the dashboard used by auth redirects but is absent from `MODULES` | Confirmed | `src/app/(auth)/start/page.tsx`; `src/app/(dashboard)/rajya/page.tsx`; `src/config/modules.config.ts` |
| Succession has six pages and five API route groups but is absent from `MODULES` | Confirmed | `src/app/(dashboard)/succession/`; `src/app/api/succession/`; `src/config/modules.config.ts` |
| `/notifications` and `/vault` are functional, navigation-linked areas absent from `MODULES` | Confirmed | dashboard pages; layout components; module config |
| Kosh, Vyaya, Khate, Pehchaan, dashboard, notification, and vault concepts have parallel route/store implementations | Confirmed | Detailed paths in `MODULE_TO_FILE_MAP.csv` and `SHARED_COMPONENT_AND_SERVICE_MAP.csv` |

## Shared code and coupling shape

The strongest shared dependencies are:

- `FileUploader` is imported by 22 page files across Foundation, Pehchaan, Raksha, Rin, Bhoomi, Kar, Succession, Granthagaar, and Vault.
- `ToastProvider/useToast` is imported by 28 files.
- `VideoTutorialPlaceholder` is imported by 21 dashboard files.
- `PageGuide` exists in both `src/components/ui/PageGuide.tsx` and `src/components/shared/PageGuide.tsx`; both versions are consumed.
- Old top-level stores (`src/lib/incomeStore.ts`, `expenseStore.ts`, `bankStore.ts`, `identityStore.ts`, `onboardingStore.ts`, `themeStore.ts`) coexist with same-purpose files under `src/lib/stores/`.
- `src/lib/bankApi.ts` is shared by Khate, Kosh, and Suchak and calls the bank API layer.
- `src/lib/googleAuth.ts` is shared by Google Drive upload, download, view, and `googleDriveUtils`.

Detailed evidence is in `SHARED_COMPONENT_AND_SERVICE_MAP.csv`.

## Build and quality controls

| Item | Finding | Confidence | Evidence |
|---|---|---|---|
| TypeScript strict mode | Enabled | Confirmed | `tsconfig.json` |
| Build-time TypeScript enforcement | Disabled by Next config | Confirmed | `next.config.ts` has `typescript.ignoreBuildErrors: true` |
| Build-time ESLint enforcement | Disabled by Next config | Confirmed | `next.config.ts` has `eslint.ignoreDuringBuilds: true` |
| Test command | No `test` script is defined | Confirmed | `package.json` scripts |
| Test files observed | One `src/lib/subscriptionMetrics.test.js` file | Confirmed | Source file inventory |
| CI workflow in snapshot | No `.github/workflows` content observed | Confirmed for snapshot | Repository file inventory |
| Current build result | Not run under audit-only rules | Unconfirmed | No generated build evidence in this task |

## Team-supplied live context

`audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` reports a Vercel production deployment from `main`, Node `v22.18.0`, and shared Production/Preview environment-variable names. Those statements are **Strong Evidence**, not independently verified facts in this audit. The supplied `GIT_BRANCH_STRUCTURE.md` explicitly marks `develop`, staging, branch protections, and some CI controls as planned or requiring administrator action.

No Vercel project configuration file or sanitized build/browser logs were supplied in `audit-input/04-live-and-deployment-context/`; the corresponding runtime and deployment assertions remain **Unconfirmed** or **Needs WD Verification** where noted in the risk report.

## Audit limitations

- No external service was contacted.
- No source file was modified.
- No dependency install, build, test, migration, or production command was run.
- Runtime-only behavior, RLS enforcement, storage bucket privacy, live branch protections, deployment settings, and exact live commit correspondence require WD or platform-owner verification.

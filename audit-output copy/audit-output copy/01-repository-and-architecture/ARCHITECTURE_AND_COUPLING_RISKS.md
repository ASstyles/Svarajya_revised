# Architecture and Coupling Risks

**Audit mode:** Offline, read-only source review  
**Source root:** `source-snapshot/Svarajya-main-6-7-26/Svarajya-main/`  
**No fixes or source changes were made.**

## Confidence scale

- **Confirmed:** Direct source evidence establishes the condition.
- **Strong Evidence:** Supplied team evidence supports the condition, but the live system was not independently checked.
- **Probable:** Code evidence indicates the risk, but runtime configuration determines whether it is exposed.
- **Unconfirmed:** Evidence is insufficient; WD/platform verification is required.

## Risk summary

| ID | Severity | Risk | Confidence | Verification status |
|---|---|---|---|---|
| ARC-01 | Critical | Google account-link callback trusts unsigned state containing a user ID | Confirmed | Security verification required |
| ARC-02 | High | Public user-creation endpoint trusts caller-supplied identity fields | Confirmed | WD verification required |
| ARC-03 | High | Public profile write path has a hardcoded fallback bypass secret | Confirmed | Security verification required |
| ARC-04 | High | Google OAuth access and refresh tokens are stored as plain Prisma string fields | Confirmed | Encryption-at-rest controls unconfirmed |
| ARC-05 | Medium | Google login enumerates all Supabase users with service-role privileges | Confirmed | Scale and audit review required |
| ARC-06 | High | Document and profile-photo paths request public Supabase Storage URLs | Probable | Bucket/RLS verification required |
| ARC-07 | High | Legacy and newer client stores compete as state authorities | Confirmed | Data-consistency verification required |
| ARC-08 | Medium | Parallel routes implement the same module concepts | Confirmed | Product-route ownership required |
| ARC-09 | Medium | Official module configuration diverges from implemented code | Confirmed | PM/WD verification required |
| ARC-10 | High | Multiple vault implementations can produce different storage behavior | Confirmed | Document lifecycle verification required |
| ARC-11 | Medium | Notifications/reminders are split across browser stores and Prisma services | Confirmed | Cross-device behavior verification required |
| ARC-12 | High | Production builds are configured to ignore TypeScript and ESLint failures | Confirmed | Build log verification required |
| ARC-13 | Medium | Automated test coverage and command surface are minimal | Confirmed | Test owner verification required |
| ARC-14 | High | API authorization is decentralized and some routes have no local auth signal | Confirmed | Route-by-route security review required |
| ARC-15 | Medium | Session handling is duplicated across provider, middleware, synchronizer, and login page | Confirmed | Runtime race testing required |
| ARC-16 | Medium | Repository route documentation does not match the snapshot | Confirmed | Documentation owner verification required |
| ARC-17 | Critical | Supplied live baseline reports Preview and Production share database/service-role variables | Strong Evidence | Immediate platform-owner verification required |
| ARC-18 | Low | Firebase is initialized and bundled but no consumer was found | Probable | WD dependency ownership required |

## Detailed findings

### ARC-01 - Google linking state can select a Prisma user without callback session verification

**Severity:** Critical  
**Confidence:** Confirmed

`GET /api/auth/google` and `GET /api/auth/link-google` Base64-encode JSON state containing `action` and, for linking, `userId`. Base64 provides encoding, not integrity or authenticity. In `GET /api/auth/google-callback`, the decoded `userId` is accepted and used directly in `prisma.user.update()` for the link branch. The callback does not re-read the current Supabase session or compare its user ID with the state user ID before writing Google access/refresh tokens.

**Potential impact:** A forged or replayed state could cause Google tokens/link status to be written to a user record not proven to belong to the current browser session. Exploitability and identifier exposure require security testing, but the missing ownership check is explicit.

**File evidence:**

- `src/app/api/auth/google/route.ts` lines 16-21 builds and Base64-encodes state.
- `src/app/api/auth/link-google/route.ts` builds state from `session.user.id` but does not sign it.
- `src/app/api/auth/google-callback/route.ts` lines 54-67 decodes state; lines 114-124 update `where: { id: userId }`.

**Status:** Needs WD/security verification. No live test was performed.

### ARC-02 - Public Prisma user creation trusts caller input

**Severity:** High  
**Confidence:** Confirmed

`POST /api/auth/create-user` accepts `id`, `email`, and `name` from the request body and calls `userService.create()` when the ID does not exist. It has no `withAuth`, no Supabase session check, and no signed internal request verification.

**Potential impact:** Unauthenticated callers can attempt to create application user rows with caller-selected IDs and emails, causing identity collisions, record pollution, or account-lifecycle inconsistency.

**File evidence:**

- `src/app/api/auth/create-user/route.ts` lines 4-34.
- `src/app/(auth)/start/page.tsx` lines 401-423 explicitly calls it a "public create-user endpoint".

**Status:** Needs WD/security verification.

### ARC-03 - Profile POST includes a hardcoded authentication bypass

**Severity:** High  
**Confidence:** Confirmed

`POST /api/profile` is wrapped with `AuthLevel.PUBLIC`. It accepts `_internal_secret`, compares it with `process.env.NEXT_PUBLIC_INTERNAL_SECRET`, and falls back to a hardcoded string (`[REDACTED_HARDCODED_FALLBACK]`). When the comparison succeeds, caller-supplied `id` becomes the authorization context.

**Potential impact:** Knowledge of the fallback value can bypass normal authentication and create/update a selected profile. The `NEXT_PUBLIC_` naming also conflicts with the intended secrecy of the value, although actual client exposure was not tested.

**File evidence:**

- `src/app/api/profile/route.ts` lines 120-139 defines the fallback and synthetic auth context.
- `src/app/api/profile/route.ts` lines 256-260 exports POST with `AuthLevel.PUBLIC`.

**Status:** Needs security review. No request was sent.

### ARC-04 - Google access and refresh tokens are stored without observed application-layer encryption

**Severity:** High  
**Confidence:** Confirmed

The callback writes Google `access_token` and `refresh_token` directly into Prisma `User` fields. The Prisma schema declares both as nullable `String` fields. `getValidGoogleAccessToken()` reads and returns them and writes refreshed access tokens back. No encryption/decryption wrapper is present on these paths.

**Potential impact:** Database read access or overly broad backups could expose reusable Google credentials. Database-level encryption controls may exist, but they are not evidenced in this snapshot.

**File evidence:**

- `src/app/api/auth/google-callback/route.ts` lines 114-124 and 210-230.
- `src/lib/googleAuth.ts` `getValidGoogleAccessToken()`.
- `prisma/schema.prisma` lines 644-647.

**Status:** Confirmed code condition; encryption-at-rest and token-handling controls are Unconfirmed.

### ARC-05 - Google login uses service-role user enumeration

**Severity:** Medium  
**Confidence:** Confirmed

Each Google login calls `supabaseAdmin.auth.admin.listUsers()` and then performs an in-memory email search. The client is initialized at module scope with `SUPABASE_SERVICE_ROLE_KEY`.

**Potential impact:** Login cost grows with the user directory, and a highly privileged credential is placed on a frequently used route. Provider pagination behavior is not handled in the observed code, so users beyond a returned page may be treated as absent.

**File evidence:**

- `src/app/api/auth/google-callback/route.ts` lines 7-16 and 178-207.

**Status:** Needs WD verification with sanitized user-count/pagination evidence.

### ARC-06 - Supabase Storage paths request public URLs

**Severity:** High  
**Confidence:** Probable

`FileUploader` uploads optional Supabase documents to a dynamic bucket named by `folder`, calls `getPublicUrl()`, and persists that URL in the local Vault. Foundation profile photos also use `getPublicUrl()` on the `profile-photos` bucket. Whether the resulting URLs are usable without authentication depends on bucket configuration, which was not inspected.

**Potential impact:** If document buckets are public, identity, tax, insurance, loan, property, or succession documents could become anonymously addressable. If buckets are private, storing public URLs may produce broken retrieval behavior.

**File evidence:**

- `src/components/vault/FileUploader.tsx` lines 120-143.
- `src/app/(dashboard)/foundation/page.tsx` lines 114-164.
- `FileUploader` is imported by 22 page files across nine module families.

**Status:** Needs WD Verification of `SUPABASE_STORAGE_BUCKETS.csv`, RLS/storage policies, and dummy-file access only.

### ARC-07 - Old and new stores split state authority

**Severity:** High  
**Confidence:** Confirmed

Same-purpose stores exist both at `src/lib/<name>Store.ts` and `src/lib/stores/<name>Store.ts`. Different routes import different versions:

- `/kosh` imports `src/lib/incomeStore.ts`; `/kosh/sources` imports `src/lib/stores/incomeStore.ts`.
- `/vyaya` imports `src/lib/expenseStore.ts`; `/vyaya/entry` imports `src/lib/stores/expenseStore.ts`.
- `/rajya` imports old Identity/Income/Expense/Bank/Onboarding/Theme stores; `/suchak` imports newer `src/lib/stores/` variants for most of those domains.
- Foundation/onboarding use `src/lib/stores/onboardingStore.ts`, while Dwaar, Rajya, and some Pehchaan pages use `src/lib/onboardingStore.ts`.

**Potential impact:** Save, count, dashboard score, and navigation behavior can differ by route even when the user believes they are viewing the same module data.

**File evidence:**

- `src/app/(dashboard)/kosh/page.tsx` and `kosh/sources/page.tsx` imports.
- `src/app/(dashboard)/vyaya/page.tsx` and `vyaya/entry/page.tsx` imports.
- `src/app/(dashboard)/rajya/page.tsx` lines 23-29.
- `src/app/(dashboard)/suchak/page.tsx` lines 10-16.

**Status:** Needs WD data-authority decision and dummy-data route comparison.

### ARC-08 - Parallel route families implement the same concepts

**Severity:** Medium  
**Confidence:** Confirmed

The snapshot contains overlapping route families and even repeated component names:

- `/kosh` and `/kosh/sources` both define `KoshHub`.
- `/vyaya` and `/vyaya/entry` both define `VyayaHub`.
- Khate has both `/khate/accounts/{cash,flow,idle}` and `/khate/{cash,cash-flow,idle-detection}` with repeated page component names.
- `/rajya` and `/suchak` both define `Dashboard`.
- `/doot` and `/notifications` both define `NotificationsPage`.
- `/granthagaar` and `/vault` both define `VaultPage`.

**Potential impact:** Navigation, testing, bug reproduction, and feature ownership can target different implementations of the same user concept.

**File evidence:** Exact page paths and exported symbols are listed in `MODULE_TO_FILE_MAP.csv`; each file exists under `src/app/(dashboard)/`.

**Status:** Needs PM/WD ownership verification.

### ARC-09 - Module registry and functional code disagree

**Severity:** Medium  
**Confidence:** Confirmed

`src/config/modules.config.ts` marks Bhoomi as `isImplemented: false`, while Bhoomi has list/add/edit pages, API route handlers, `bhoomiService`, and a Prisma `PropertyAsset` model. Rajya, Notifications, Vault, and Succession have functional source paths but no entries in the 21-module registry.

**Potential impact:** Feature gates, maps, reporting, and release status derived from the registry can misrepresent available code.

**File evidence:**

- `src/config/modules.config.ts` lines 127-138 and complete `MODULES` object.
- `src/app/(dashboard)/bhoomi/`; `src/app/api/bhoomi/`; `src/lib/services/bhoomiService.ts`.
- `src/app/(dashboard)/succession/`, `rajya/`, `notifications/`, and `vault/`.

**Status:** Needs PM/WD verification.

### ARC-10 - Document vault has multiple implementations and storage outcomes

**Severity:** High  
**Confidence:** Confirmed

At least two active Vault objects serve similar purposes:

- `src/lib/vault.ts`, consumed by 13 files and `/vault`.
- `src/lib/services/documentService.ts`, consumed by `/granthagaar`.

Additional files include `src/lib/localVaultEngine.ts`, `src/lib/engines/localVaultEngine.ts`, `src/lib/cloudDriveSync.ts`, and `src/lib/utils/cloudDriveSync.ts`. `FileUploader` can save locally, to Google Drive, or to Supabase Storage and returns different identifier forms.

**Potential impact:** Delete, export, retention, backup, and record-link behavior may differ by module. The same document can be referenced by a local ID, Google Drive ID, or public URL.

**File evidence:**

- `src/lib/vault.ts`; `src/lib/services/documentService.ts`.
- `src/components/vault/FileUploader.tsx` `handleFile()`.
- `/vault` and `/granthagaar` page imports.

**Status:** Needs document-lifecycle verification with dummy files.

### ARC-11 - Notification and reminder state is split across client and server

**Severity:** Medium  
**Confidence:** Confirmed

`src/lib/stores/notificationStore.ts` is a browser store used by Doot, Notifications, Raksha, Rin, Bhoomi, and the dashboard shell. Separately, `notificationService.ts` and `reminderService.ts` persist Prisma `Notification` and `Reminder` records. The `/notifications` and `/doot` pages read the browser store, while server notification APIs operate on Prisma data.

**Potential impact:** Alerts may differ by device, route, or refresh state; server-created alerts may not be represented in the browser store without an explicit bridge.

**File evidence:**

- `src/lib/stores/notificationStore.ts` and its 13 import consumers.
- `src/lib/services/notificationService.ts`; `src/lib/services/reminderService.ts`.
- `src/app/(dashboard)/doot/page.tsx`; `src/app/(dashboard)/notifications/page.tsx`.
- `src/app/api/notifications/` and `src/app/api/reminders/route.ts`.

**Status:** Needs cross-device and refresh verification.

### ARC-12 - Build checks are bypassed

**Severity:** High  
**Confidence:** Confirmed

`next.config.ts` sets both `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`, even though `tsconfig.json` enables strict mode.

**Potential impact:** Type and lint errors can enter a deployable build and surface as runtime failures or dead paths.

**File evidence:**

- `next.config.ts` line 3.
- `tsconfig.json` has `strict: true`.

**Status:** Current error count and build success are Unconfirmed because no build was run and sanitized build logs were not supplied.

### ARC-13 - Minimal automated-test surface

**Severity:** Medium  
**Confidence:** Confirmed

`package.json` has no `test` script. The snapshot contains one observed test file, `src/lib/subscriptionMetrics.test.js`, while the application has 125 pages, 71 API routes, 24 services, and 69 Prisma models.

**Potential impact:** Shared auth, storage, service, and cross-module changes have little repository-visible regression protection.

**File evidence:**

- `package.json` scripts.
- `src/lib/subscriptionMetrics.test.js`.
- Direct repository file counts in `REPOSITORY_INVENTORY.md`.

**Status:** Needs test-owner confirmation; external CI was not inspected.

### ARC-14 - API authorization is decentralized

**Severity:** High  
**Confidence:** Confirmed

`src/middleware.ts` explicitly excludes `/api/*`. API routes must therefore secure themselves. Most use `withAuth()` or a direct Supabase session check, but the following route files showed no local `withAuth`, `auth.getSession`, or `auth.getUser` signal during the source scan:

- `src/app/api/auth/create-user/route.ts`
- `src/app/api/auth/send-welcome/route.ts`
- `src/app/api/auth/webhook/route.ts`
- `src/app/api/check-phone/route.ts`
- `src/app/api/check-user/route.ts`
- `src/app/api/contact/route.ts`

Some are intentionally public, but the architecture provides no central enforcement and at least `create-user` performs identity persistence.

**Potential impact:** New or changed API handlers can omit authentication without being protected by route middleware.

**File evidence:**

- `src/middleware.ts` matcher excludes `api(?:/.*)?`.
- `src/lib/middleware/auth.middleware.ts` defines optional per-route protection.
- Listed route implementations.

**Status:** Needs route-by-route WD/security review.

### ARC-15 - Session responsibility is duplicated and can race

**Severity:** Medium  
**Confidence:** Confirmed

Session state is read or changed by `AuthProvider`, `OAuthFragmentHandler`, `AuthSync`, route middleware, API auth middleware, and `/start`. `/start` contains a delayed `getSession()` followed by `signOut()` to clear auto-created sessions, but conditionally skips this for Google success. Comments in the same file say OAuth redirect is globally handled to avoid race conditions.

**Potential impact:** Redirect loops, premature logout, stale client context, or differing behavior between email verification, Google login, password recovery, and returning sessions.

**File evidence:**

- `src/app/(auth)/start/page.tsx` lines 153-241.
- `src/components/providers/AuthProvider.tsx`.
- `src/components/auth/OAuthFragmentHandler.tsx`.
- `src/components/shared/AuthSync.tsx`.
- `src/lib/supabase/middleware.ts`.

**Status:** Needs sanitized browser-flow tests.

### ARC-16 - Route documentation is stale relative to source

**Severity:** Medium  
**Confidence:** Confirmed

`ROUTES.md` describes auth pages such as `src/app/(auth)/login/page.tsx` and API groups such as `/api/goals`, `/api/investments`, `/api/analytics`, and `/api/ai` that are not present at those paths in the snapshot. It also does not reflect the direct count of 125 app pages and 71 API handlers.

**Potential impact:** Engineers and auditors can inspect, test, or secure the wrong path and miss active routes.

**File evidence:**

- `ROUTES.md` route tables.
- Actual files under `src/app/` and counts in `REPOSITORY_INVENTORY.md`.

**Status:** Needs documentation-owner verification.

### ARC-17 - Preview deployments reportedly share production data credentials

**Severity:** Critical  
**Confidence:** Strong Evidence, not independently verified

The supplied live baseline states that Preview and Production use the same `DATABASE_URL`, `DIRECT_URL`, and `SUPABASE_SERVICE_ROLE_KEY` values.

**Potential impact:** Preview deployments may read or write production data with service-role privileges.

**File evidence:**

- `audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` lines 76-79 and 90-97.
- `audit-input/04-live-and-deployment-context/ENVIRONMENT_VARIABLE_NAMES_ONLY.csv` confirms names only, not equality of values.

**Status:** Needs immediate WD/Vercel owner verification. No external service was contacted and no values were inspected.

### ARC-18 - Firebase appears dormant but remains initialized

**Severity:** Low  
**Confidence:** Probable

The repository includes the Firebase dependency and `src/lib/firebase/firebase.ts` with hardcoded client configuration, but no import consumer outside that file was found. The supplied live baseline reports no Firebase environment variables.

**Potential impact:** Unowned dependency/configuration increases supply-chain and maintenance surface and can confuse the authoritative auth/data platform.

**File evidence:**

- `package.json` includes `firebase`.
- `src/lib/firebase/firebase.ts` initializes Firebase.
- Repository import scan found no consumer.
- `audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` lines 65-69.

**Status:** Needs WD ownership verification before any removal decision.

## Required human verification

The following cannot be closed by source review alone:

1. Supabase bucket privacy and storage policies.
2. Google OAuth redirect configuration, state handling, and sanitized login/link runtime traces.
3. Encryption and access controls protecting stored Google tokens.
4. Preview versus Production environment separation.
5. Which duplicate routes, stores, dashboards, notification paths, and vault implementation are authoritative.
6. Current TypeScript, ESLint, build, and test results.

All findings above are audit observations only. No source, migration, credential, or production configuration was changed.

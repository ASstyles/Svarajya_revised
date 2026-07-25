# Executive Technical Summary

**Pack version/date:** v1.0 / 2026-07-19  
**Audit mode:** Local and read-only  
**Verification position:** Needs WD Verification; no Himanshu or Harsh sign-off is present.

## Executive Position

The snapshot is a substantial Next.js application with 385 source files, 125 pages, 71 API handlers, multiple persistence planes, and broad financial/life-planning module coverage. The audit found direct source evidence of material security boundaries, parallel state authorities, and cross-module data integrity risks. It also found a structurally coherent supplied database export: 74 application tables align with 74 Prisma models. That structural alignment does not prove live deployment parity, correct authorization, or consistent runtime behavior.

The current pack supports engineering triage and WD verification. It does not support a production release decision by itself. No external service, production system, build, migration, or test runner was used.

## Architecture Findings

- The application uses Next.js App Router, React, TypeScript, Prisma/PostgreSQL, Supabase Auth/Storage, local browser vault storage, Google Drive, custom singleton stores, and Zustand. Evidence: `01-repository-and-architecture/REPOSITORY_INVENTORY.md`.
- The architecture report records 18 risks. Source-confirmed critical/high conditions include unsigned Google-link state (ARC-01), caller-controlled user creation (ARC-02), a profile fallback bypass secret (ARC-03), plain Prisma token fields (ARC-04), competing state authorities (ARC-07), multiple document-vault paths (ARC-10), ignored TypeScript/ESLint build failures (ARC-12), and decentralized API authorization (ARC-14).
- ARC-17 is a critical platform-isolation claim supported by the supplied live baseline: Preview and Production reportedly share database/service-role variables. This is Strong Evidence, not independently verified, and is a stop condition for write testing until the platform owner confirms isolation.
- Duplicate route and store families exist for income, expenses, bank, identity, onboarding, notifications, dashboards, and vault behavior. The module registry also differs from implemented routes: Bhoomi has CRUD despite being marked unimplemented, while Rajya, Notifications, Vault, and Succession are functional but absent from the official module configuration.
- Shared components have a wide blast radius. `FileUploader` is consumed by 22 page files and `ToastProvider/useToast` by 28; a defect in common persistence, consent, error, or notification behavior can cross many modules.

## Auth Findings

- ARC-01: the Google account-link callback decodes caller-modifiable Base64 state containing a user ID without an observed signature, expiry, nonce, or callback-session ownership check. The code condition is Confirmed; exploitability remains a security-verification task.
- ARC-02 and ARC-03: user creation and profile write boundaries accept caller-controlled identity or a hardcoded fallback secret. These are source-confirmed access-control risks.
- ARC-04/DB-06: Google access/refresh tokens and other sensitive auth fields are ordinary user-table strings; no application-layer encryption step was observed. Deployed encryption and rotation controls are Unconfirmed.
- ARC-05: Google login enumerates Supabase users with service-role privileges. This increases privilege and scale exposure even if operationally functional.
- The login, callback, browser-session, restoration, protected-route, profile-routing, and logout code paths are traced in `GOOGLE_AUTH_CODE_FLOW.md`. End-to-end redirect behavior, cookie/domain settings, provider configuration, and session races remain Needs WD Verification.
- Reported P1 auth journeys include Google tester restriction, password reset failing to reach the reset screen, OTP failure, and profile edit replaying onboarding. These are user-journey findings; platform/root-cause details must be reproduced in an isolated environment.

## Database Findings

- Supplied metadata contains 75 public-schema tables, including 74 application tables and `_prisma_migrations`; 872 columns; 82 foreign keys; 74 Prisma models; 3 storage buckets; 21 functions; 5 triggers; and 1 supplied RLS policy row.
- All 74 application tables have matching Prisma models in the supplied evidence. This is Confirmed for the files, not for the live database.
- DB-01: configured income and credential entry screens use browser stores despite matching API/table paths, so visible and server-side state can diverge.
- DB-02: education loan state is written as the sentinel `EDUCATION_LOAN_ACTIVE` into `linkedLoanId`, which is not an enforced loan foreign key.
- DB-03/DB-04: multiple cross-module IDs and document references are soft links. Deletion, ownership, versioning, and orphan cleanup depend on application code.
- DB-05: supplied bucket metadata marks education, identity, and profile-photo buckets public, while the supplied storage policy lacks an owner/path predicate. Live parity is not proven.
- DB-07: 45 foreign keys reference `users.id`, many with cascade deletion. Account deletion therefore has a broad financial, identity, document, succession, and audit-adjacent blast radius.
- DB-08: Mitra and Succession use parallel will and nominee table families without a database synchronization constraint.
- Public-table RLS coverage, database role grants/bypass, live schema parity, backup restoration, retention, encryption, and ownership of many admin/platform tables remain Needs WD Verification.

## Dependency Findings

- Foundation/profile/family data is upstream of most user-owned modules. User or family edits/deletes can affect selectors, coverage, education, reminders, documents, dashboards, and scoring contexts.
- Income, expense, bank, loan, subscription, property, and insurance data feeds dashboard totals, cash flow, affordability, debt/protection indicators, reminders, and succession summaries. Parallel stores and soft links mean a successful save in one path does not prove downstream refresh.
- Documents span local IndexedDB/OPFS, Supabase Storage, Google Drive, `document_meta`, and direct URL/ID fields. There is no single enforced lifecycle for consent, ownership, versioning, viewing, and deletion.
- Notifications/reminders are divided between browser stores and Prisma services. Cross-device consistency and deletion propagation are not established.
- Mitra/Succession nominee and will state can disagree. Bank deletion can null or orphan downstream payment/credit selectors. Subscription failure affects Leakage, Vyaya, reminders, and dashboard totals.
- The PRD trace maps 216 rows: 56 Implemented, 28 Partially Implemented, 84 Implemented Differently, 42 Not Implemented, and 6 Present in Code but Not in PRD. Product intent must be confirmed before treating the 84 differences as defects or accepted design.

## P0/P1 Bug Findings

- The consolidated register contains 77 rows: 18 P1, 41 P2, and 18 P3. Technical confidence is 39 Confirmed, 17 Strong Evidence, 6 Probable, and 15 Unconfirmed.
- No Confirmed P0 exists in the supplied evidence. The impact report identifies 12 canonical or standalone P1 items and does not elevate offline security candidates to reproduced exploits.
- P1 user-journey blockers/degradations include Google sign-in restriction, password recovery, mobile OTP/profile editing, document-vault/Drive ID handling, subscription lifecycle/schema failure, and the `/pravah` bank route regression.
- P1 security/platform candidates include ARC-01, ARC-02, ARC-03, ARC-12, ARC-17, and DB-05. Release decisions require security/platform-owner verification.
- Downstream impact is broad: auth affects all protected modules; document issues cross nine or more areas; subscriptions affect recurring expense, reminders, and dashboard metrics; bank access affects cash flow and account selectors; nominee divergence affects succession readiness.

## Testing Gaps

- `package.json` has no configured test script or Vitest/Jest/Playwright stack. One standalone `src/lib/subscriptionMetrics.test.js` exists without a repository command that runs it.
- TypeScript and ESLint failures are ignored during production builds, and no CI workflow was observed in the snapshot.
- All 76 manual regression cases are `Not Run`.
- Sixteen files under `05-test-drafts/` cover dummy fixtures, unit, component, API, E2E, database validation, and proposed runner configuration. They are drafts only and have not been compiled or executed.
- The adoption gate is an isolated test database/emulator, mocked or isolated auth/storage providers, confirmed path aliases/contracts, rollback/cleanup, and production credentials unavailable by construction.

## Major Risks

1. **Environment isolation:** if ARC-17/DB-12 reflects current deployment, test activity can touch production data or privileged services.
2. **Identity/access boundaries:** ARC-01 through ARC-05 and ARC-14 can permit identity confusion, unauthorized writes, excessive privilege, or token exposure.
3. **Sensitive document access:** DB-05/ARC-06 plus multiple vault implementations can expose or orphan identity, education, profile, loan, insurance, tax, and succession files.
4. **Data loss/integrity:** broad cascades, unenforced soft links, split browser/server state, sentinel IDs, and parallel nominee/will tables can delete, orphan, or contradict records.
5. **Shared dependency failure:** duplicated stores/routes and mixed calculation authorities can produce inconsistent dashboards, reminders, scores, and edit/delete outcomes.
6. **Release confidence:** ignored build checks, absent executable test infrastructure, and 76 unrun regressions leave known blockers and shared behaviors without a repeatable gate.

## Limitations

- The audit used local files only. No GitHub, Supabase, Vercel, Google, Firebase, database, or other external service was contacted.
- The snapshot has no `.git`, so its equality with the reported live commit is Unconfirmed.
- No application source file was modified. No build, test, migration, production command, credential, or real user data was used.
- Live environment separation, redirect allow-lists, cookie flags, OAuth settings, RLS enablement, bucket privacy, role grants, live schema, deployed migrations, backups, encryption, and current branch protection were not verified.
- `TECHNICAL_BUG_REPRODUCTION.csv`, Vercel project configuration, sanitized build logs, and sanitized browser-console logs were not supplied.
- PRD intent, module ownership, and differently implemented requirements require PM/WD decisions.
- No explicit Himanshu or Harsh verification/sign-off evidence appears in `audit-output`; every factual handover deliverable remains Draft or Needs WD Verification.


## 2026-07-20 Bug Register Rebuild Addendum

- `audit-output/04-bugs-and-qa/CONSOLIDATED_BUG_CROSS_REFERENCE.csv` was rebuilt to the required 40-column acceptance schema.
- Previous 24-column draft preserved as `audit-output/04-bugs-and-qa/CONSOLIDATED_BUG_CROSS_REFERENCE_2026-07-20_PRE_40_COLUMN_REBUILD_DRAFT.csv`.
- New support files: `BUG_SOURCE_INVENTORY.csv`, `RAW_BUG_MERGE.csv`, and `BUG_CROSS_REFERENCE_GAPS.md`.
- Rebuilt master rows: 317; source inventory rows: 22; unique P0/P1 master IDs: 52.
- Severity counts: {'P1': 67, 'P3': 52, 'P2': 198}.
- Technical confidence counts: {'Strong Evidence': 41, 'Probable': 150, 'Unconfirmed': 126}.
- Status remains Needs WD Verification. No row was marked `Confirmed` because explicit Himanshu/Harsh/WD verification evidence was not found.

## 2026-07-20 Supabase Usage Map Addendum

- The Supabase technical map was rebuilt to 37 columns with 81 static operations across 30 source files and a 478-row raw occurrence ledger.
- The snapshot contains 44 Auth operations, 5 Storage operations and 32 client-initialization operations; no direct Supabase public-table query, RPC or Edge Function call was found.
- Thirteen rows involve an administrative/service-role boundary. The map does not include any key value, but server-only authorization, RLS bypass controls, audit logging and key isolation require Himanshu/Harsh verification.
- Storage evidence shows a supplied policy based on authenticated role without visible per-user object-path ownership. FileUploader also uses a runtime bucket variable that cannot be conclusively matched to the supplied bucket export.
- All 81 rows remain Strong Evidence and Needs WD Verification; none is Confirmed.

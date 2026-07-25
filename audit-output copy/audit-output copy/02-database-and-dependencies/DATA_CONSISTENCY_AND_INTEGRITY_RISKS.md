# Data Consistency and Integrity Risks

## Method

Findings are grouped by evidence strength. “Confirmed” means the condition is directly visible in supplied source or metadata; it does not assert that the same condition exists in a live environment. No external system was contacted.

## Confirmed

### DB-01: Configured income and credential entry flows bypass their matching database tables

`src/app/(dashboard)/kosh/sources/add/page.tsx` calls `IncomeStore.addRecord`; `src/app/(dashboard)/dwaar/portals/add/page.tsx` calls `CredentialStore.addPortal`. Neither configured page calls `/api/income` or `/api/credentials`, although those API routes and the `income_streams` / `credential_records` tables exist. Data entered through these screens can therefore differ from server records used elsewhere.

Impact: dashboard, reminder, and cross-module consumers can observe different values depending on which store/API path they use.

### DB-02: Education loan toggle writes a sentinel into a field named as an identifier

`src/app/(dashboard)/foundation/education/page.tsx` sends boolean `hasLoan`. `src/app/api/education/route.ts` transforms it to `linkedLoanId: "EDUCATION_LOAN_ACTIVE"` or `null`. The supplied schema has no foreign key from `education.linkedLoanId` to `loan_accounts.id`.

Impact: the field cannot reliably identify the related loan, and downstream code may mistake a status sentinel for an entity ID.

### DB-03: Several cross-module “ID” fields are not database-enforced relationships

The supplied `FOREIGN_KEYS.csv` and `schema.sql` do not define foreign keys for `loan_accounts.linkedPropertyId`, `property_assets.linkedLoanId`, module `documentId`/`vaultFileId` fields, `succession_nominees.assetId`, or `succession_nominees.nomineeId`. Source routes write these values directly, including `src/app/api/loans/route.ts`, `src/app/api/bhoomi/properties/route.ts`, and `src/app/api/succession/nominees/route.ts`.

Impact: edits and deletes can leave stale references; validity depends entirely on application code.

### DB-04: Multiple document persistence paths do not share one enforced reference model

`src/components/vault/FileUploader.tsx`, `src/lib/vault.ts`, `src/lib/services/documentService.ts`, `src/app/api/documents/route.ts`, and module-specific routes use IndexedDB/OPFS, Supabase Storage, Google Drive, `document_meta`, and direct URL/ID columns. Most module document fields are not foreign keys to `document_meta.id`.

Impact: deletion, versioning, ownership, and orphan cleanup can vary by module.

### DB-05: Supplied storage metadata exposes sensitive-purpose buckets publicly

`audit-input/01-database-structure/SUPABASE_STORAGE_BUCKETS.csv` marks `education`, `identity`, and `profile-photos` as `public=true`. `RLS_POLICIES.csv` contains one `storage.objects` policy for `ALL` based only on authenticated role, with no object-owner or bucket-path predicate.

Impact: if the supplied metadata reflects live state, file confidentiality depends on URL secrecy and application behavior rather than per-object ownership rules. Live parity remains Needs WD Verification.

### DB-06: Sensitive auth material is represented as ordinary user-table strings

`prisma/schema.prisma` and `TABLE_COLUMNS.csv` define `users.googleAccessToken`, `googleRefreshToken`, `twoFactorSecret`, `twoFactorRecoveryCodes`, and `passwordHash`. `src/app/api/auth/google-callback/route.ts` writes Google tokens through Prisma. No field-level encryption step is visible in that flow.

Impact: a database read path may expose reusable secrets. Storage-at-rest and key-management controls are Needs WD Verification.

### DB-07: User deletion has a broad cascade surface

The supplied schema has 45 foreign keys referencing `users.id`, with many `ON DELETE CASCADE` actions. `src/app/api/auth/webhook/route.ts` includes `prisma.user.delete`.

Impact: account deletion can remove financial, identity, document metadata, succession, and audit-adjacent records. Whether this matches retention/legal requirements needs human verification.

### DB-08: Will and nominee concepts are represented by parallel table families

The schema contains `will_status` and `succession_wills`, plus `nominee_mapping` and `succession_nominees`. Mitra services use the first family; Succession routes use the second. No database constraint synchronizes either pair.

Impact: readiness status, executor details, nominee shares, and UI summaries can disagree across modules.

## Strong Evidence

### DB-09: Public-table RLS coverage is absent from the supplied policy export

`RLS_POLICIES.csv` has one storage policy and no public application-table policy. `schema.sql` contains the public tables and foreign keys but no supplied public-table `CREATE POLICY`/`ENABLE ROW LEVEL SECURITY` evidence.

Impact: authorization appears to rely on server routes and database credentials. This is strong evidence about the supplied export only; live RLS state is Needs WD Verification.

### DB-10: Browser-store and server-table dashboard/notification paths can become stale independently

`src/app/(dashboard)/rajya/page.tsx`, `src/app/(dashboard)/suchak/page.tsx`, `src/app/(dashboard)/doot/page.tsx`, and `src/app/(dashboard)/notifications/page.tsx` read browser stores. Separately, `notificationService.ts` writes Prisma `notifications`, while `rajya_scores` and analytics tables have no direct Prisma call in the supplied `src` scan.

Impact: a successful DB update does not prove that visible dashboard or notification state refreshes.

### DB-11: Process-local caches can return stale data across server instances

`src/app/api/education/route.ts` and other API/service paths use module-level `Map` caches. These caches are per process and are invalidated only by selected handlers in that process.

Impact: concurrent deployments or serverless instances may return different snapshots during cache TTL windows. Runtime confirmation is required.

### DB-12: Preview/production database separation is not evidenced locally

`audit-input/04-live-and-deployment-context/LIVE_BASELINE.md` reports shared preview/production infrastructure. The repository contains environment-variable names but no safe local evidence that independently verifies current deployment separation.

Impact: test writes could affect production if the report is current. This remains Needs WD Verification under the no-external-connection rule.

## Probable

### DB-13: Unused-looking admin, scoring, and analytics tables may be stale or implemented outside the snapshot

The inventory identifies many Prisma models with no direct `prisma.<model>` call under `src`, including admin, module/content, `rajya_scores`, gamification, and periodic analytics tables.

Impact: schema complexity, migrations, and ownership may exceed actual application behavior. Table existence alone is not proof of abandonment.

### DB-14: JSON and array columns may lack shape-level validation

Fields such as `budget_plans.categories`, `property_assets.vaultFileIds`, `succession_emergency.assetAccessScope`, and multiple analytics/settings fields are represented as JSON/arrays. The database export does not show JSON-schema or equivalent shape constraints.

Impact: different route families can write incompatible structures. Exact validators and live constraints require WD verification.

### DB-15: Financial aggregates may mix authoritative and client-derived values

Bank, income, expense, subscription, and property pages compute summaries in stores and components, while server tables also contain current balances, net income, analytics, and score columns.

Impact: totals can differ by route, refresh timing, or calculation implementation. An authoritative calculation owner is not established by supplied evidence.

## Unconfirmed

### DB-16: Live schema parity

The SQL export, generated types, column/FK CSVs, and Prisma schema align structurally, but their extraction timestamps and live deployment parity are not independently proven. **Needs WD Verification.**

### DB-17: Database role privileges and RLS bypass behavior

Prisma uses `DATABASE_URL`/`DIRECT_URL`, but the actual PostgreSQL role, grants, and whether it bypasses RLS are not present. **Needs WD Verification.**

### DB-18: Backup recovery, retention, and deletion compliance

A runbook exists, but no restore test, backup artifact, retention configuration, or deletion audit evidence was executed in this offline task. **Needs WD Verification.**

### DB-19: Encryption at rest and secret rotation

The snapshot does not prove database/storage encryption settings, secret rotation cadence, or whether application-layer encrypted values use production-grade keys. **Needs WD Verification.**

### DB-20: Business ownership for admin/platform tables

The supplied team inventory proposes owners, but source call sites are absent for many tables. Ownership is therefore **Needs WD Verification**, not inferred from table names.

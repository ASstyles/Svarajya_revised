# Database Structure Summary

## Scope and evidence

This is an offline audit of supplied metadata and the source snapshot. No database, Supabase project, Vercel project, or other external service was contacted. No row-level user data was read or reproduced.

Primary structural evidence:

- `audit-input/01-database-structure/schema.sql`
- `audit-input/01-database-structure/database.types.ts`
- `audit-input/01-database-structure/TABLE_LIST.csv`
- `audit-input/01-database-structure/TABLE_COLUMNS.csv`
- `audit-input/01-database-structure/FOREIGN_KEYS.csv`
- `source-snapshot/Svarajya-main-6-7-26/Svarajya-main/prisma/schema.prisma`

Supporting, non-authoritative interpretation evidence:

- `audit-input/01-database-structure/DATABASE_TABLE_INVENTORY.csv`
- `audit-input/01-database-structure/DATABASE_FILE_INVENTORY.csv`
- `audit-input/02-existing-team-outputs/2026-07-19_MODULE_CRUD_TRACE.csv`
- `audit-input/02-existing-team-outputs/DA_SUSPECTED_MISSING_CONNECTIONS.csv`
- `audit-output/01-repository-and-architecture/MODULE_TO_FILE_MAP.csv`
- `audit-output/01-repository-and-architecture/SUPABASE_CODE_USAGE_MAP.csv`

The team inventory is not treated as proof of ownership or business meaning. The prohibited “Anirudhra - Frontend Versus Data” worksheet is not used as a direct frontend/database map.

## Structural reconciliation

| Measure | Supplied result | Confidence |
|---|---:|---|
| Public schema tables | 75 | Confirmed |
| Application tables excluding `_prisma_migrations` | 74 | Confirmed |
| Exported columns | 872 | Confirmed |
| Exported foreign keys | 82 | Confirmed |
| Prisma models | 74 | Confirmed |
| Tables with matching Prisma models | 74/74 | Confirmed |
| RLS policy rows supplied | 1 | Confirmed for the supplied export only |
| Storage bucket rows supplied | 3 | Confirmed for the supplied export only |
| Function rows supplied | 21 | Confirmed for the supplied export only |
| Trigger rows supplied | 5 | Confirmed for the supplied export only |

All 74 application tables in `TABLE_LIST.csv` have a matching `@@map` target in `prisma/schema.prisma`; `_prisma_migrations` is the expected Prisma ledger and has no application model. The counts and names also reconcile with the generated `database.types.ts` table definitions. This is structural alignment, not proof that the supplied export matches production at audit time.

## Logical domains observed

- **Identity and household:** `users`, `family_members`, `education`, `identity_records`, `identity_links`, `credential_records`.
- **Money flows:** `income_streams`, `expense_entries`, `expense_categories`, `budget_plans`, `bank_accounts`, `cash_wallets`, `balance_history`.
- **Assets and liabilities:** `investment_holdings`, `insurance_policies`, `insurance_coverage`, `loan_accounts`, `property_assets`, `asset_inventory`.
- **Tax and compliance:** `tax_records`, `gst_records`, `din_records`.
- **Planning and continuity:** `goals`, `nominee_mapping`, `will_status`, `succession_nominees`, `succession_wills`, `succession_emergency`.
- **Documents and reminders:** `document_meta`, `reminders`, `notifications`, `notification_templates`.
- **Administration/content/analytics:** admin, module, tutorial, quiz, parameter, support, cohort, activity, score, and analytics tables. Many have no direct `prisma.<model>` call in the supplied `src` snapshot, so ownership and active use need WD verification.

These domain labels are supported by source call sites and Prisma relationships where available. Names alone are not used as proof; rows without call-site evidence remain marked Unconfirmed or Needs WD Verification in the inventory.

## Relationship shape

The database is strongly user-rooted: `users.id` is the referenced parent in 45 supplied foreign keys. Many user-owned records use `ON DELETE CASCADE`. This gives a clear account-deletion propagation path, but the operational and retention intent needs human confirmation.

Important cross-module structural links include:

- `education.familyMemberId -> family_members.id` with `ON DELETE SET NULL`.
- `income_streams.familyMemberId -> family_members.id` and `income_streams.creditedAccountId -> bank_accounts.id`, both `SET NULL`.
- `insurance_coverage.policyId -> insurance_policies.id` and `memberId -> family_members.id`, both `CASCADE`.
- `investment_holdings.linkedGoalId -> goals.id` with `SET NULL`.
- `nominee_mapping.nomineeId -> family_members.id` with database-enforced linkage.

Other apparent links such as `loan_accounts.linkedPropertyId`, `property_assets.linkedLoanId`, `documentId`, `vaultFileId`, `assetId`, and several bank/account reference fields have no matching foreign key in the supplied export. Their business meaning and referential controls therefore require WD verification.

## Access and storage observations

The source uses Prisma/PostgreSQL for application table access. The repository audit found no direct Supabase PostgREST table query chain; direct Supabase code is concentrated in Auth and Storage. See `audit-output/01-repository-and-architecture/SUPABASE_CODE_USAGE_MAP.csv`.

The supplied RLS export contains one policy for `storage.objects`, allowing `ALL` to the `public` role when `auth.role() = 'authenticated'`. It does not include an object-owner or bucket-path predicate. The supplied bucket export lists `education`, `identity`, and `profile-photos` as public. These are confirmed properties of the supplied files, not a confirmed statement about live configuration.

No public-schema RLS policy, public-table trigger, or application-specific public function appears in the supplied policy/trigger/function exports. Because the exports may be incomplete or stale, the live state is **Needs WD Verification**.

## Mapping and dependency conclusions

- Database-backed CRUD is directly evidenced for Foundation family/education, Pehchaan, bank accounts, insurance, loans, property, tax/GST/DIN, Mitra, and Succession paths.
- Configured Kosh and Kunji add flows write browser stores even though matching database APIs/tables exist. Vyaya also has parallel store/API route families. This creates a confirmed implementation split, not proof of live data loss.
- Dashboard, reminder, score, and vault impacts are not uniformly database-driven. Several dashboards and notification pages read browser stores while Prisma tables for scores, reminders, and notifications exist separately.
- The matrix marks direct structural/code dependencies separately from intended or probable dependencies.

## Limitations and verification

This audit cannot confirm live row counts, live constraints, current RLS enablement, production/preview parity, actual data ownership, retention rules, or whether unused-looking tables are used by code outside the snapshot. Those items remain **Needs WD Verification**. No real user data is included in any generated output.

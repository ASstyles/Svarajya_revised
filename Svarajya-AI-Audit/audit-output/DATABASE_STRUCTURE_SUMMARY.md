# Database Structure Summary

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 2 (Data Dependency Lead)

---

## 1. Executive Summary
This report describes the database architecture of the Svarajya application. The system operates on a Supabase PostgreSQL 17 database comprising 75 active tables and 3 storage buckets.

---

## 2. Table Summary By Module Group
The database tables are partitioned across major domain categories:
- **Core User/Auth (4 Tables)**: `users`, `user_sessions`, `email_verification_codes`, `consent_records`
- **Foundation / Rajya (2 Tables)**: `family_members`, `education`
- **KYC/Identity (3 Tables)**: `identity_records`, `identity_links`, `document_meta`
- **Credentials (1 Table)**: `credential_records`
- **Income & Wealth (1 Table)**: `income_streams`
- **Expenses & Budgeting (3 Tables)**: `expense_entries`, `expense_categories`, `budget_plans`
- **Liquidity & Banking (3 Tables)**: `bank_accounts`, `balance_history`, `cash_wallets`
- **Investments (1 Table)**: `investment_holdings`
- **Insurance (2 Tables)**: `insurance_policies`, `insurance_coverage`
- **Loans (1 Table)**: `loan_accounts`
- **Property (1 Table)**: `property_assets`
- **Taxation Compliance (3 Tables)**: `tax_records`, `gst_records`, `din_records`
- **Succession Emergency (4 Tables)**: `succession_wills`, `succession_nominees`, `succession_emergency`, `nominee_mapping`
- **Dormant leaks (1 Table)**: `subscriptions`
- **Reminders & Alerts (3 Tables)**: `reminders`, `notifications`, `notification_templates`

---

## 3. Storage Buckets Inventory
The application implements 3 Supabase storage buckets, all configured as public:

| Bucket ID | Public Access | File Size Limit | Allowed MIME Types |
| :--- | :--- | :--- | :--- |
| `profile-photos` | True | 2 MB | jpeg, png, jpg, webp |
| `identity` | True | 2 MB | jpeg, png, pdf |
| `education` | True | 2 MB | jpeg, png, pdf |

---

## 4. Row Level Security (RLS) Analysis

> [!WARNING]
> **Critical Database Tier Exposure**: 
> A query scan of `RLS_Status.csv` indicates that **every single table** in the `public` schema has Row-Level Security disabled (`rls_enabled = false`). 
>
> Although the API endpoints and server middleware apply user filters on query parameters, there is no verification layer at the PostgreSQL storage engine level. If client keys or service credentials are leaked, any authenticated user can query or delete records across other users' tables.

### 4.1 Storage RLS Policies
- The storage buckets have RLS enabled, but there is only **one** policy defined:
  - Policy: `Users can upload their own photos`
  - Targets: `storage.objects`
  - Command: `ALL`
  - Check: `auth.role() = 'authenticated'`
- **Vulnerability**: This policy allows any authenticated user full CRUD permissions on the `objects` table inside storage. No tenant-specific checks are implemented to restrict users from downloading other users' uploaded KYC/Identity or educational files.

---

## 5. Relationships & Constraints
Referential integrity is maintained via PostgreSQL Foreign Key constraints.
- Primary User Key: `users.id` acts as the root parent reference for all client records.
- Inter-table relations:
  - `education.familyMemberId` references `family_members.id`
  - `balance_history.bankAccountId` references `bank_accounts.id`
  - `nominee_mapping` maps nominee IDs directly to multiple asset classes.

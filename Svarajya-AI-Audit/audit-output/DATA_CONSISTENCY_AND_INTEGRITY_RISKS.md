# Data Consistency and Integrity Risks

**Date**: 2026-07-18  
**Version**: 1.0  
**Status**: Confirmed  
**Lead Auditor**: AI Intern 2 (Data Dependency Lead)

---

## 1. Overview
This report highlights core database schema flaws, lack of referential constraints, state mismatch bugs, and risks of data corruption or data loss in the Svarajya application.

---

## 2. Identified Data Integrity Risks

### 2.1 Multiple Bank Accounts marked as Primary (Bug 22)
- **Risk Level**: High  
- **Description**: The database constraints allow multiple `BankAccount` records for a single `userId` to have `isPrimary = true` simultaneously. There is no unique conditional index or check validation at the DB level, and the API controller does not verify if a primary account already exists before creating another.
- **Data Anomaly**: Aggregate calculators that pull a single "primary" account for interest tracking or defaults will read multiple records, causing calculations to error or default arbitrarily.
- **Affected Tables**: `bank_accounts`

### 2.2 Duplicated Profile Tables & Missing Constraints
- **Risk Level**: High  
- **Description**: User profile data is split across the Supabase auth pool, Prisma `User` table, and `FamilyMember` records. When a family member is "Linked to Profile" (referencing a `User`), there is no foreign key enforcing that the linked `userId` actually exists, nor is there a check preventing duplicate links.
- **Data Anomaly**: Modifying a family member's email does not update the linked `User` record's email, resulting in diverging user identities.

### 2.3 Orphaned Google Drive Files (Bugs 21, 25, 34)
- **Risk Level**: Medium  
- **Description**: Uploaded files (insurance schedules, ITR pdfs, loan documents) are uploaded to storage buckets. The file reference `cloudId` is saved in `document_meta`. However, if the parent record (e.g. `insurance_policies`) is updated or deleted, the corresponding `document_meta` row is either kept (as an orphan) or deleted without removing the file from the Google Drive/Supabase storage bucket.
- **Data Anomaly**: Rapidly depletes cloud storage limits with unreachable files, and risks leak of private documents.

### 2.4 Lack of Foreign Keys on Nominees and Assets (Mitra Mapping)
- **Risk Level**: Critical  
- **Description**: Asset allocation maps (`nominee_mapping`) connect succession nominees to specific bank accounts, properties, or insurance policies. These mappings use free-form string IDs rather than actual database foreign keys.
- **Data Anomaly**: If an asset (e.g. a bank account) is deleted, the `nominee_mapping` row persists. The system now points to a non-existent asset, which will crash the succession readiness score dashboard or display broken records.
- **Affected Tables**: `nominee_mapping`, `succession_nominees`

### 2.5 Stale Reminders and Event Schedulers
- **Risk Level**: Medium  
- **Description**: Due dates for insurance premiums and loan EMIs are copied into `reminders` table rows. When the due date of the parent insurance policy is edited, the corresponding `reminders` row is not updated.
- **Data Anomaly**: The user will continue to receive alerts matching the old date, rendering reminders useless.
- **Affected Tables**: `reminders`, `insurance_policies`, `loan_accounts`

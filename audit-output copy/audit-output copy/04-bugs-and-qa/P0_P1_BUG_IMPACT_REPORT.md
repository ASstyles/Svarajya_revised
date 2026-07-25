# P0/P1 Bug Impact Report

**Rebuilt from master register:** 2026-07-20

This report is reconciled to `CONSOLIDATED_BUG_CROSS_REFERENCE.csv` master bug IDs. It remains audit-only: no external service was contacted, no production test was run, and no application source file was modified.

## Severity Position

- Confirmed P0 rows: 0
- P0/P1 master rows: 67
- Unique P0/P1 master IDs: 52
- No item is marked Verified or Confirmed by Himanshu/Harsh in this audit output.

## Reconciled P0/P1 Master IDs

| Master Bug ID | Severity | Module | Title | User journey / downstream impact | Evidence status | Recommended next action |
|---|---|---|---|---|---|---|
| `BUG-AUTH-001` | P1 | Authentication | Google login restricted to test users (app unverified in Google Cloud) | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Strong Evidence / WD=Yes | Needs Auth Review |
| `BUG-AUTH-002` | P1 | Authentication | Password reset link errors; auto-logs-in without resetting | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Strong Evidence / WD=Yes | Needs Auth Review |
| `BUG-AUTH-004` | P1 | Authentication | Mobile OTP was static '1234' (dev mode) | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-AUTH-009` | P1 | Authentication | /pravah returns 404 — route regression vs 10-07 verified-working list | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Strong Evidence / WD=Yes | Needs Auth Review |
| `BUG-AUTH-010` | P1 | Authentication | Leakage - Subscriptions to Reminders: Subscription-related connections | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-012` | P1 | Authentication | Occupation / phase display; YOUR CURRENT PHASE mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-013` | P1 | Authentication | MOBILE NUMBER; EMAIL mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-014` | P1 | Authentication | Document belongs to; Upload document; Loan document belongs to mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-015` | P1 | Authentication | Linked Identity; Linked Portal mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-016` | P1 | Authentication | Category mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-017` | P1 | Authentication | Do you have a legally signed Will?; I have a legally signed will document. mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | No Action — Duplicate |
| `BUG-AUTH-018` | P1 | Authentication | Filing status; ITR Type mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-019` | P1 | Authentication | Nominee; Relationship; Share percentage mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | No Action — Duplicate |
| `BUG-AUTH-020` | P1 | Authentication | Executor name; Executor contact mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | No Action — Duplicate |
| `BUG-AUTH-021` | P1 | Authentication | Enter OTP code mapping unclear | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Probable / WD=Yes | Needs Auth Review |
| `BUG-AUTH-030` | P1 | Authentication | Silent JWT Expiry Data Loss | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: High; Calculation: No | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-AUTH-031` | P1 | Authentication | Missing Database Row-Level Security | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: High; Calculation: Possible | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-AUTH-033` | P1 | Authentication | Fix iOS Safari localStorage wipe for session | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: High; Calculation: No | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-AUTH-034` | P1 | Authentication | Implement RLS policies for household data isolation | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-BANK-006` | P1 | Pravah / Banking | Joint Account Holder mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-CREDENTIAL-005` | P1 | Kunji / Credentials | App Link mapping unclear | Dashboard: Possible; Reminder: No; Vault: No; Auth/Security: No; Data loss: High; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-CREDENTIAL-006` | P1 | Kunji / Credentials | Portal Linked mapping unclear | Dashboard: Possible; Reminder: No; Vault: No; Auth/Security: No; Data loss: High; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-DASH-002` | P1 | Rajya / Dashboard | Move derived value calculations to backend | Dashboard: Yes; Reminder: No; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Yes | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-002` | P1 | Vyaya / Expenses | Subscriptions API returns 500 DATABASE_ERROR (Prisma P2022 - missing column) | Dashboard: Possible; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Strong Evidence / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-003` | P1 | Vyaya / Expenses | Subscription and reminders step 4: Check reminder creation | Dashboard: Yes; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Yes | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-005` | P1 | Vyaya / Expenses | Subscription and reminders step 6: Check reminder behaviour | Dashboard: Yes; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Yes | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-006` | P1 | Vyaya / Expenses | Vyaya - Expenses to Reminders: Reminder-related connections | Dashboard: Possible; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-012` | P1 | Vyaya / Expenses | Budget; Category target spend mapping unclear | Dashboard: Yes; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Yes | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-EXPENSE-014` | P1 | Vyaya / Expenses | Service Name; Subscription Name mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-GEN-004` | P1 | Data Flow Resolve concurrent write conflicts across tabs Two tabs writing simultaneously results in last write winning and one silently discarded. Resolve concurrent write conflicts across tabs Two tabs writing simultaneously results in last write winning and one silently discarded. | Resolve concurrent write conflicts across tabs | Dashboard: No; Reminder: No; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-GEN-005` | P1 | Data Flow Handle Supabase JWT 1-hour expiry *Data Loss Risk:* Supabase writes fail silently with 401, causing user data loss. Handle Supabase JWT 1-hour expiry *Data Loss Risk:* Supabase writes fail silently with 401, causing user data loss. | Handle Supabase JWT 1-hour expiry | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: High; Calculation: No | Unconfirmed / WD=Yes | Needs Supabase Verification |
| `BUG-GEN-007` | P1 | Calculation Errors Fix Supabase NUMERIC column precision issues Float values written directly (e.g., 0.1 + 0.2 = 0.30000000000000004 stored in DB). Fix Supabase NUMERIC column precision issues Float values written directly (e.g., 0.1 + 0.2 = 0.30000000000000004 stored in DB). | Fix Supabase NUMERIC column precision issues | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Needs Supabase Verification |
| `BUG-GEN-008` | P1 | Data Persistence Add idempotency keys to all Supabase inserts Network retries are creating duplicate transaction rows. Add idempotency keys to all Supabase inserts Network retries are creating duplicate transaction rows. | Add idempotency keys to all Supabase inserts | Dashboard: No; Reminder: No; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Needs Supabase Verification |
| `BUG-IDENTITY-001` | P1 | Pehchaan / Identity Vault | Document Number mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Yes; Auth/Security: No; Data loss: Possible; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-INCOME-004` | P1 | Kosh / Income | Handle division by zero for new users without income | Dashboard: Possible; Reminder: Possible; Vault: No; Auth/Security: No; Data loss: Low; Calculation: Possible | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-INSURANCE-004` | P1 | Raksha / Insurance | Covered Members mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-LOAN-012` | P1 | Rin / Loans | Missing Transaction Idempotency Keys | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-LOAN-013` | P1 | Rin / Loans | Navigation 404 Route Fault | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-LOAN-016` | P1 | Rin / Loans | Parse Supabase aggregate string results | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: Yes; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Needs Supabase Verification |
| `BUG-ONBOARD-001` | P1 | Onboarding | Sthapana - Family to Raksha - Insurance: Family-related connections | Dashboard: No; Reminder: No; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-ONBOARD-005` | P1 | Onboarding | Are you salaried?; Do you file GST?; Are you a company director?; Do you pay advance tax? mapping unclear | Dashboard: No; Reminder: No; Vault: Yes; Auth/Security: No; Data loss: Possible; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROFILE-004` | P1 | Authentication | Uploads claim Google Drive storage; no consent asked, no folder/file created, Drive URL fabricated from internal ID | Dashboard: No; Reminder: No; Vault: No; Auth/Security: Yes; Data loss: Low; Calculation: Possible | Unconfirmed / WD=Yes | Needs Auth Review |
| `BUG-PROFILE-017` | P1 | Sthapana / Foundation | Profile photo circle mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Possible; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROFILE-018` | P1 | Sthapana / Foundation | Primary income source mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROFILE-019` | P1 | Sthapana / Foundation | Enable WhatsApp reminders mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Possible; Calculation: Possible | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROFILE-020` | P1 | Sthapana / Foundation | Rajya Access Level mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROFILE-023` | P1 | Sthapana / Foundation | Education Loan? mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: Possible | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROPERTY-001` | P1 | Bhoomi / Property | Property title mapping unclear | Dashboard: Possible; Reminder: No; Vault: Possible; Auth/Security: No; Data loss: High; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROPERTY-003` | P1 | Bhoomi / Property | Secret field mapping unclear | Dashboard: Possible; Reminder: No; Vault: Possible; Auth/Security: Possible; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-PROPERTY-004` | P1 | Bhoomi / Property | Sale deed; Tax receipt mapping unclear | Dashboard: Possible; Reminder: No; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-TAX-007` | P1 | Kar / Tax | Asset mapping unclear | Dashboard: Possible; Reminder: Possible; Vault: Possible; Auth/Security: No; Data loss: Low; Calculation: No | Probable / WD=Yes | Move to P0/P1 Impact Report |
| `BUG-UX-003` | P1 | General UX | Surface Supabase insertion errors to user UI | Dashboard: No; Reminder: No; Vault: No; Auth/Security: No; Data loss: Low; Calculation: No | Unconfirmed / WD=Yes | Move to P0/P1 Impact Report |

## Required Investigation Order

1. Security/auth/access risks: authentication, OAuth, password reset, OTP, profile/session, and environment-isolation rows.
2. Data loss risks: document vault/storage, deletion/unlinking, local-only persistence, and duplicate/orphan rows.
3. Database integrity risks: schema mismatch, field mapping, soft links, and missing constraints.
4. Shared dependency risks: dashboard, reminder, notification, vault, and module route coupling.
5. Blocked user journeys: P1 rows with route, save, upload, login, or schema blockers.
6. Lower-priority UX issues: P3 and UX-derived rows after functional blockers are assigned.

## Limitations

- `TECHNICAL_BUG_REPRODUCTION.csv` is still missing.
- Jira comments, attachments, linked issues, and duplicate relationships were not included in the CSV exports.
- PDF/DOCX screenshots were not visually redacted or independently re-tested.
- All rows remain Draft / Needs WD Verification until authorized verification evidence is added.

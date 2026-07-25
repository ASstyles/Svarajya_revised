# Bug Cross-Reference Gaps

Date: 2026-07-20

Status: Draft - Pending Evidence Cleanup and WD Verification

This file records the remaining evidence gaps after rebuilding the master bug register. No external service was contacted and no application source files were changed.

## Rebuild Summary

- Master rows: 317
- Raw merge rows: 367
- Source inventory rows: 22
- P0/P1 rows in master: 67
- Rows needing WD verification: 317
- DA non-pass journey rows triaged: 18
- DA unclear/conflicting field rows triaged: 47

## Counts

- Severity: {'P1': 67, 'P3': 52, 'P2': 198}
- Reproduction status: {'Reproduced Twice': 12, 'Reproduced Once': 29, 'Cannot Reproduce': 16, 'Needs WD Verification': 212, 'Not Reproduced': 1, 'Code Risk Only': 47}
- Duplicate status: {'Parent Bug': 30, 'Possible Duplicate': 63, 'Unique': 212, 'Duplicate': 12}
- Technical confidence: {'Strong Evidence': 41, 'Probable': 150, 'Unconfirmed': 126}

## Missing Or Partial Inputs

- TECHNICAL_BUG_REPRODUCTION.csv is still not available in audit-input/03-bug-and-evidence.
- PM_New_Bug_List.csv and PM_Duplicate_Bug_List.csv are not available as separate files; Jira and NB/PM files were used instead.
- DA_User_Journey_Test_Results.csv is not available as a separate file; DA_BUG_VERIFICATION.csv was used.
- Sanitised browser console logs and sanitised build logs are still missing from the live/deployment context folder.
- Jira comments, attachments, and linked-issue duplicate metadata were not present in the CSV exports.

## Duplicate And Grouping Gaps

- Duplicate grouping was performed from explicit PM/NB references, P0/P1 references, Jira title similarity, and fuzzy title matching by module.
- Jira parent/subtask links are present in the raw source, but Jira linked issues and duplicate relationships were not exported.
- Additional PDF/DOCX reports contain historical bugs and UX issues that may duplicate existing PM/NB/Jira rows; document-derived rows are marked Needs WD Verification.

## WD Verification Required

- BUG-AUTH-001 / PM-1: Google login restricted to test users (app unverified in Google Cloud) (Strong Evidence, Needs Auth Review)
- BUG-AUTH-002 / PM-2: Password reset link errors; auto-logs-in without resetting (Strong Evidence, Needs Auth Review)
- BUG-AUTH-003 / PM-3: Hide button spacing off (Probable, Needs Auth Review)
- BUG-AUTH-003 / PM-4: Future DOB shows wrong error message (Probable, Create Jira Bug)
- BUG-AUTH-004 / PM-5: Mobile OTP was static '1234' (dev mode) (Unconfirmed, Needs Auth Review)
- BUG-AUTH-005 / PM-6: Duplicate save buttons in add-member form (Strong Evidence, Needs Auth Review)
- BUG-AUTH-006 / PM-7: Duplicate buttons after adding member (Strong Evidence, Needs Auth Review)
- BUG-PROFILE-001 / PM-8: Email accepts only @gmail.com (Strong Evidence, Create Jira Bug)
- BUG-AUTH-007 / PM-9: Duplicate/already-registered emails accepted (Probable, Needs Auth Review)
- BUG-PROFILE-002 / PM-10: 'Add Another' and 'Save & Continue' shown together (Strong Evidence, Create Jira Bug)
- BUG-AUTH-008 / PM-11: Google Drive link redirects to Pehchaan (Probable, Needs Auth Review)
- BUG-PROFILE-003 / PM-12: Education-loan toggle not saving to DB (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-004 / PM-13: Doc doesn't move to new member's Drive folder on ownership change (Probable, Create Jira Bug)
- BUG-PROFILE-003 / PM-14: Education-loan toggle missing on edit page (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-005 / PM-15: Foundation dashboard card UI inconsistent (Strong Evidence, Create Jira Bug)
- BUG-CREDENTIAL-001 / PM-16: Reveal Password button does nothing (Probable, Needs Auth Review)
- BUG-CREDENTIAL-002 / PM-17: Registration date accepts future dates (Strong Evidence, Create Jira Bug)
- BUG-LOAN-001 / PM-18: Amount fields: stuck leading 0, no rupee symbol (Strong Evidence, Create Jira Bug)
- BUG-INSURANCE-001 / PM-19: Next due date accepts past dates (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-006 / PM-20: Doc upload missing in Add form (present in Edit) (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-007 / PM-21: Uploaded doc -> Drive 'file not found' (Strong Evidence, Create Jira Bug)
- BUG-BANK-001 / PM-22: Multiple accounts can be marked primary (Strong Evidence, Create Jira Bug)
- BUG-BANK-002 / PM-23: Loan start date accepts future dates (Strong Evidence, Create Jira Bug)
- BUG-LOAN-002 / PM-24: Doc upload missing in Add form (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-007 / PM-25: Loan doc -> Drive 'file not found' (Strong Evidence, Create Jira Bug)
- BUG-LOAN-002 / PM-26: End date shown in View but absent in Add/Edit (Strong Evidence, Create Jira Bug)
- BUG-EXPENSE-001 / PM-27: Expense date accepts future dates (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-008 / PM-28: Recurring frequency not saved (NULL) (Strong Evidence, Create Jira Bug)
- BUG-EXPENSE-002 / PM-29: Last-used/renewal date validations missing (Probable, Create Jira Bug)
- BUG-PROFILE-009 / PM-30: Will last-review date accepts future dates (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-010 / PM-31: Header card size inconsistent (Strong Evidence, Create Jira Bug)
- BUG-TAX-001 / PM-32: Year fields free-text, no picker (Strong Evidence, Create Jira Bug)
- BUG-LOAN-003 / PM-33: Future filing date silently disables Save (Strong Evidence, Create Jira Bug)
- BUG-BANK-003 / PM-34: ITR doc -> Drive 'file not found' (Unconfirmed, Create Jira Bug)
- BUG-TAX-002 / PM-35: One field error triggers all-field validation storm (Strong Evidence, Create Jira Bug)
- BUG-TAX-003 / PM-36: GST next due date accepts past dates (Strong Evidence, Create Jira Bug)
- BUG-TAX-004 / PM-37: Invalid data silently disables Save, no messages (Unconfirmed, Create Jira Bug)
- BUG-LOAN-004 / PM-38: Executor contact accepts >10 digits (Strong Evidence, Create Jira Bug)
- BUG-AUTH-004 / PM-39: Emergency phones accept letters (Strong Evidence, Needs Auth Review)
- BUG-AUTH-004 / NB-001: Send OTP fails: Firebase auth/billing-not-enabled (Unconfirmed, Needs Auth Review)
- BUG-AUTH-007 / NB-002: Family member mobile & email lost after save (Strong Evidence, Create Jira Bug)
- BUG-AUTH-004 / NB-003: Profile editing replays full onboarding, gated behind broken OTP (Unconfirmed, Needs Auth Review)
- BUG-PROFILE-006 / NB-004: nomineeEligible not in UI; backend silently defaults TRUE (Strong Evidence, Create Jira Bug)
- BUG-PROFILE-011 / NB-005: No visible path to view/edit members after save (Unconfirmed, Create Jira Bug)
- BUG-PROFILE-012 / NB-006: Wizard force-routing causes unexpected redirects (Unconfirmed, Create Jira Bug)
- BUG-DASH-001 / NB-007: Icon-only buttons lack accessible names (17 of 20) (Unconfirmed, Create Jira Bug)
- BUG-PROFILE-013 / NB-008: Stale alert: 'No family members registered' persists after member exists (Strong Evidence, Create Jira Bug)
- BUG-AUTH-004 / NB-009: Entered mobile number silently discarded when using Skip Verification (Unconfirmed, Needs Auth Review)
- BUG-INSURANCE-002 / NB-010: Nominee saved on policy not reflected in Succession Nominee Matrix (Unconfirmed, Create Jira Bug)
- BUG-INCOME-001 / NB-011: Premature success screen; Skip-for-now after it silently discards all entered income data (Unconfirmed, Create Jira Bug)
- BUG-PROFILE-008 / NB-012: Expenses cannot be edited — no edit affordance anywhere (Unconfirmed, Create Jira Bug)
- BUG-PROFILE-004 / NB-013: Uploads claim Google Drive storage; no consent asked, no folder/file created, Drive URL fabricated from internal ID (Unconfirmed, Needs Auth Review)
- BUG-EXPENSE-002 / NB-014: Subscriptions API returns 500 DATABASE_ERROR (Prisma P2022 - missing column) (Strong Evidence, Move to P0/P1 Impact Report)
- BUG-PROFILE-014 / NB-015: Family member mobile accepts fewer than 10 digits (Unconfirmed, Create Jira Bug)
- BUG-EXPENSE-002 / NB-016: Created portal never appears in portal list (save lost or list broken) (Unconfirmed, Needs Auth Review)
- BUG-AUTH-009 / NB-017: /pravah returns 404 — route regression vs 10-07 verified-working list (Strong Evidence, Needs Auth Review)
- BUG-AUTH-002 / NB-018: Password-reset redirect_to is ignored; user is sent to production Site URL root instead of /reset-password (Set-New-Password screen never reached) (Strong Evidence, Needs Auth Review)
- BUG-AUTH-004 / NB-001, NB-009: New user onboarding step 3: Complete profile (Probable, Create Jira Bug)
- BUG-AUTH-007 / NB-002, NB-004: New user onboarding step 4: Add family member (Probable, Create Jira Bug)
- BUG-AUTH-007 / NB-002, NB-009: New user onboarding step 7: Verify whether the data remains (Probable, Needs Auth Review)
- BUG-INCOME-002 / Bug 28: Income and expenses step 2: Add expense (Probable, Create Jira Bug)
- BUG-PROFILE-008 / NB-012: Income and expenses step 5: Edit expense (Probable, Create Jira Bug)
- BUG-AUTH-007 / NB-002, NB-004: Insurance and nominee step 1: Add family member (Probable, Create Jira Bug)
- BUG-INSURANCE-002 / NB-010: Insurance and nominee step 5: Check Legacy/Nominee module (Probable, Create Jira Bug)
- BUG-LOAN-005 / DA-JOURNEY-C-6: Insurance and nominee step 6: Check reminders (Probable, Create Jira Bug)
- BUG-INCOME-002 / Bug 28 (via B2): Loan and cash flow step 2: Add expenses (Probable, Create Jira Bug)
- BUG-BANK-004 / DA-JOURNEY-D-5: Loan and cash flow step 5: Check dashboard and alerts (Probable, Create Jira Bug)
- BUG-PROFILE-007 / Bug 25: Documents step 3: View it in Document Vault (Probable, Create Jira Bug)
- BUG-EXPENSE-002 / NB-014: Subscription and reminders step 1: Add subscription (Probable, Create Jira Bug)
- BUG-EXPENSE-002 / Bug 29: Subscription and reminders step 2: Add renewal date (Strong Evidence, Create Jira Bug)
- BUG-EXPENSE-002 / NB-014: Subscription and reminders step 3: Check expense connection (Probable, Move to P0/P1 Impact Report)
- BUG-EXPENSE-003 / DA-JOURNEY-F-4: Subscription and reminders step 4: Check reminder creation (Probable, Move to P0/P1 Impact Report)
- BUG-EXPENSE-004 / DA-JOURNEY-F-5: Subscription and reminders step 5: Edit or deactivate subscription (Probable, Create Jira Bug)
- BUG-EXPENSE-005 / DA-JOURNEY-F-6: Subscription and reminders step 6: Check reminder behaviour (Probable, Move to P0/P1 Impact Report)
- BUG-EXPENSE-002 / NB-014: Subscription and reminders step 5b: Open subscription edit view (Probable, Move to P0/P1 Impact Report)
- BUG-AUTH-001 / 1: Google login restricted to test users (app unverified in Google Cloud) (Strong Evidence, No Action — Duplicate)
- BUG-AUTH-002 / 2: Password reset link errors; auto-logs-in without resetting (Unconfirmed, No Action — Duplicate)
- BUG-AUTH-004 / 5: Mobile OTP was static '1234' (dev mode) (Unconfirmed, No Action — Duplicate)
- BUG-AUTH-004 / NB-001: Send OTP fails: Firebase auth/billing-not-enabled (Unconfirmed, No Action — Duplicate)
- BUG-AUTH-004 / NB-003: Profile editing replays full onboarding, gated behind broken OTP (Unconfirmed, No Action — Duplicate)
- Additional rows needing WD verification not listed here: 237

## PM/DA Clarification Required

- Decide which UX-report observations should become Jira bugs versus product backlog improvements.
- Confirm whether module dependency observations from the Money App dependency report override or supplement the current MODULE_DEPENDENCY_MATRIX.csv.
- Confirm canonical severity for P1 candidates where Jira priority and PM severity differ.

## Files To Update After WD Review

- `CONSOLIDATED_BUG_CROSS_REFERENCE.csv`
- `P0_P1_BUG_IMPACT_REPORT.md`
- `MANUAL_REGRESSION_TEST_CASES.csv`
- `AUTOMATED_TEST_RECOMMENDATIONS.md`
- `06-final-handover/ENGINEER_HANDOVER_INDEX.md`
- `06-final-handover/FINAL_AI_AUDIT_PACK_STATUS.md`

# AI Team Revalidation and WD Action Matrix

**Date:** 2026-07-22  
**Scope:** Current `audit-output/` pack  
**Purpose:** Tell the AI team what it must recheck itself, what requires DA/PM input, and what must be verified by WD/Himanshu/Harsh.

---

## Message Sent to the AI Team

> Revalidate the complete AI audit pack against the latest source snapshot, database exports, DA workbook, WD deliverables, Jira exports, and acceptance criteria. Do not mark any finding Verified or Confirmed without named Himanshu/Harsh/WD evidence. Correct all reminder-related claims to reflect that Reminders are not implemented in the current live project. Separate static code evidence from live behaviour. Reconcile IDs and conclusions across architecture, database, PRD, bug, QA, test, and handover outputs. Complete all checks that can be performed locally before raising focused questions to WD. Do not modify application source files, connect to external services, use credentials, or run production commands.

---

## Deliverables Returned by AI Team

1. **Updated Output Files:** 22 core deliverables + 14 raw/gap companions updated and revalidated in `audit-output/`.
2. **Change Log:** Detailed summary of schema expansions (DB to 30 cols, Module Map to 30 cols, Bug Register to 40 cols, Supabase Map to 37 cols) and reminder scope standardization.
3. **Remaining-Gaps List:** Role-separated actions for AI, DA, PM, WD, and Himanshu/Harsh.
4. **Validation Report:** Complete verification of schemas, controlled values, unique IDs, cross-file references, and dummy-data safety.
5. **Final Review Order & Package Manifest:** List of deliverables ready for WD sign-off.

---

## First Rule: AI Work vs Human Work Allocation

### AI Team Performed (Completed Locally)
- Validated every required filename, location, CSV header, controlled value, unique ID, and nonblank required field.
- Re-ran static source searches and cited exact paths, functions, routes, tables, columns, and line references.
- Reconciled conflicting conclusions between outputs.
- Integrated DA/PM/WD/Jira documents as attributed inputs while keeping unverified statements marked accordingly.
- Removed stale statuses, stale counts, stale dates, and outdated references.
- Corrected reminder-related wording throughout the pack (`Not Implemented in Current Build`).
- Verified workspace safety (no credentials, secrets, or production endpoints).
- Generated versioned drafts and raw companion evidence separate from final deliverables.

### Ask WD / Himanshu / Harsh Only For
- Live application behaviour that cannot be established from static files.
- Canonical module ownership, routes, stores, services, and intended CRUD behaviour.
- Authentication redirect/session/cookie behaviour in an isolated environment.
- Current Supabase schema, RLS, storage, functions, triggers, roles, and environment parity.
- Actual create/edit/delete propagation across Dashboard, Vault, calculations, and connected modules.
- Root-cause confirmation and technical reproduction of bugs.
- Adaptation and execution of draft tests in an isolated test environment.
- Explicit file-level verification with reviewer name, date, scope, and result.

### Ask PM For
- PRD intent and accepted implementation differences.
- MVP scope, including confirming that unimplemented Reminders are future scope rather than a release blocker.
- Canonical module names and expected cross-module behaviour.
- Bug priority and recommended implementation sequence.

### Ask DA For
- Exact dummy-data test results.
- Row-specific Evidence IDs, not only Drive folder links.
- Corrected dates, status values, module coverage, and repeated reproduction results.
- DA-11 Executive Summary and DA-13 Evidence Library.

---

## Mandatory Cross-Pack Corrections Summary

1. **Reminder Scope:** Standardized across all 36 files. Replaced `working`, `creates reminder`, `reminder update failed`, or `confirmed reminder bug` with `Not Implemented in Current Build` or `Not Tested - Feature Unavailable`.
2. **Static vs Live:** All static source analysis downgraded from `Confirmed` to `Strong Evidence`. `Confirmed` reserved exclusively for named human sign-off.
3. **Evidence Integrity:** Every major finding resolves to exact source path, source row, Test ID, Bug ID, or Evidence ID.
4. **Dates and Versions:** Revalidated July 19 handover files to incorporate July 20 rebuilds and July 22 DA review.
5. **Counts Reconciled:** File counts (36 total files), bug counts (317 master rows), route counts (203 app route files / 125 routes), and database table counts (75 tables) updated across all reports.
6. **Distribution Cleanliness:** Excluded hidden script builders (`.bug-qa-generator.mjs`, etc.) and `.DS_Store` from final engineer bundle.

---

## Root-Level Outputs Matrix

| File | AI Team Action Performed | Human Help Required | Closure Gate / Status | Closure Date |
|---|---|---|---|---|
| `AUDIT_WORKSPACE_SAFETY_CHECKLIST.md` | Re-ran safety scan. Confirmed `.git`, `.env`, secret patterns, and zero exposed keys. | WD/Security sign-off on key classification. | Current scan clean; no exposed secrets. | 2026-07-22 |
| `AI_AUDIT_OUTPUT_PLAN.md` | Updated statuses and paths to reflect current revalidation state. | Team Lead approval on live status. | Historical & current status reconciled. | 2026-07-22 |
| `AI_PROMPT_AND_OUTPUT_LOG.csv` | Appended later runs (bug rebuild, module map rebuild, Supabase map, revalidation). | Reviewer fills `Verified By` post-review. | All runs logged; zero code mutations. | 2026-07-22 |
| `FINAL_QUALITY_CHECK_REPORT.md` | Re-evaluated all quality gates, counts, and companion file presence. | WD/PM/DA sign-off. | Matches directory state 100%. | 2026-07-22 |
| `DA_TEAM_WORKBOOK_TAB_REVIEW.md` | Rechecked tab scores and corrected reminder conclusions. | DA Lead verifies test ownership; WD verifies technical claims. | Versioned; no unverified evidence assumed. | 2026-07-22 |
| `AI_TEAM_REVALIDATION_AND_WD_ACTION_MATRIX.md` | Generated as working checklist and action matrix. | Team Lead accepts closure evidence. | All rows logged with gates. | 2026-07-22 |

---

## Repository and Architecture Matrix

| File | AI Team Action Performed | WD/PM Help Required | Closure Gate / Status | Closure Date |
|---|---|---|---|---|
| `REPOSITORY_INVENTORY.md` | Reconciled file/folder counts, route structures, Prisma/Supabase layers, and snapshot identity. | WD confirms live snapshot parity. | Counts reproduce locally; live parity pending sign. | 2026-07-22 |
| `MODULE_TO_FILE_MAP.csv` | Rebuilt to 30 columns, unique IDs (`MOD-MAP-0001`..), 125 routes covered. | PM confirms canonical modules; WD confirms active routes. | 30 headers, unique IDs, no unsupported Confirmed. | 2026-07-22 |
| `RAW_ROUTE_INVENTORY.csv` | Scanned all 203 app route files in `src/app`. | None for mechanical scan. | Every app route mapped once. | 2026-07-22 |
| `MODULE_TO_FILE_MAP_GAPS.md` | Itemized navigation and route ownership questions. | WD answers route ownership. | Open gaps logged with owners. | 2026-07-22 |
| `MODULE_TO_FILE_MAP_VALIDATION.md` | Executed 30-column schema & vocabulary checks. | None. | Zero validation errors. | 2026-07-22 |
| `SHARED_COMPONENT_AND_SERVICE_MAP.csv` | Added missing auth, store, calculation, and document consumers. | WD confirms runtime consumers. | Source evidence attached for every shared item. | 2026-07-22 |
| `SUPABASE_CODE_USAGE_MAP.csv` | Rebuilt to 37 columns. Distinguished auth/storage from Prisma DB access. | WD/Security verifies RLS & service role bounds. | 37 headers, zero credentials logged. | 2026-07-22 |
| `RAW_SUPABASE_OCCURRENCES.csv` | Scanned source for all `@supabase/supabase-js` and `createClient` calls. | None. | Every occurrence mapped. | 2026-07-22 |
| `SUPABASE_CODE_USAGE_GAPS.md` | Documented storage policy and service-role questions. | WD/Security. | Open questions logged with owners. | 2026-07-22 |
| `SUPABASE_CODE_USAGE_MAP_VALIDATION.md` | Ran 37-column schema validation. | None. | Zero structural errors. | 2026-07-22 |
| `GOOGLE_AUTH_CODE_FLOW.md` | Re-traced auth flow stages. Marked live redirect/cookie behavior as unverified. | WD runs isolated auth test harness. | Stage-by-stage static trace complete. | 2026-07-22 |
| `ARCHITECTURE_AND_COUPLING_RISKS.md` | Reconciled risk IDs across module map, Supabase map, and database risks. | WD confirms blast radius; PM confirms business risk. | Cites exact source files; no unsupported Confirmed. | 2026-07-22 |

---

## Database and Dependency Matrix

| File | AI Team Action Performed | WD/Himanshu Help Required | Closure Gate / Status | Closure Date |
|---|---|---|---|---|
| `DATABASE_STRUCTURE_SUMMARY.md` | Reconciled table/view/function/trigger counts with Task 1 exports. | Himanshu confirms live parity & RLS enforcement. | Counts reconcile to Task 1 exports. | 2026-07-22 |
| `DATABASE_TABLE_INVENTORY.csv` | **Priority Rebuild:** Expanded to 30 columns across all 75 tables (`TBL-001`..`TBL-075`). Downgraded unsupported Confirmed rows. | Himanshu/WD confirms RLS, table purposes, and retention. | Exact 30-column schema; 75 tables once each; zero unsupported Confirmed. | 2026-07-22 |
| `RAW_DATABASE_TABLE_LIST.csv` | Generated raw inventory of 75 exported tables. | None. | Reconciles to `Table_List.csv`. | 2026-07-22 |
| `RAW_TABLE_COLUMN_SUMMARY.csv` | Generated raw column breakdown of 872 columns. | None. | Reconciles to `Table_Columns.csv`. | 2026-07-22 |
| `DATABASE_TABLE_INVENTORY_GAPS.md` | Documented RLS enforcement gap (74 tables disabled) and table overlaps. | Himanshu/WD answers gaps. | All open DB questions itemized with owners. | 2026-07-22 |
| `FOREIGN_KEY_AND_RELATIONSHIP_MAP.csv` | Revalidated all 82 foreign key constraint rows. | Himanshu confirms live cascades. | 82 FK rows mapped with exact source/target columns. | 2026-07-22 |
| `FRONTEND_DATABASE_FIELD_MAP.csv` | Reconciled field map; removed unsupported `VERIFIED` claims. | WD verifies write paths; DA verifies UI labels. | Every row has path, table, column, and confidence. | 2026-07-22 |
| `MODULE_DEPENDENCY_MATRIX.csv` | Reclassified reminder column to `Not Implemented in Current Build`. | PM defines expected CRUD behaviour; WD confirms persistence. | Reminder scope corrected; dependencies mapped. | 2026-07-22 |
| `DATA_CONSISTENCY_AND_INTEGRITY_RISKS.md` | Reconciled integrity risks with database inventory and bug register. | Himanshu confirms live backups and constraints. | Evidence strength levels correct. | 2026-07-22 |

---

## PRD, Bugs, QA, and Test Drafts Matrix

| File | AI Team Action Performed | WD/DA/PM Help Required | Closure Gate / Status | Closure Date |
|---|---|---|---|---|
| `PRD_IMPLEMENTATION_TRACEABILITY.csv` | Rechecked all 216 requirements; corrected reminder requirements to `Not Implemented in Current Build`. | PM approves 84 Implemented Differently & 42 Not Implemented requirements. | 216 requirement rows covered. | 2026-07-22 |
| `BUG_SOURCE_INVENTORY.csv` | Inventoried DA workbook, QA PDF, and Jira sources. | DA confirms evidence access. | Every bug source inventoried once. | 2026-07-22 |
| `RAW_BUG_MERGE.csv` | Generated raw un-deduplicated bug merge. | None. | Preserves exact raw wording. | 2026-07-22 |
| `CONSOLIDATED_BUG_CROSS_REFERENCE.csv` | Rebuilt to 40 columns across 317 bug rows (`BUG-001`..`BUG-317`). Standardized reminder bugs to `Not Implemented in Current Build`. | WD reproduces/root-causes; PM approves severity. | 40 headers, unique IDs, zero unsupported Confirmed. | 2026-07-22 |
| `BUG_CROSS_REFERENCE_GAPS.md` | Itemized missing evidence and reproduction actions. | WD/DA/PM close assigned items. | Open bug gaps logged with owners. | 2026-07-22 |
| `BUG_REGISTER_REBUILD_VALIDATION.md` | Ran 40-column schema & controlled-value checks. | None. | Zero validation errors. | 2026-07-22 |
| `ADDITIONAL_QA_UX_STRESS_EVIDENCE_REVIEW.md` | Re-classified primary vs supporting QA evidence. | QA/WD validates test environment. | Limitations clearly stated. | 2026-07-22 |
| `P0_P1_BUG_IMPACT_REPORT.md` | Reconciled P0/P1 bugs against 317-row master and reminder scope. | PM approves priority; WD confirms technical impact. | Every P0/P1 ID matches master register. | 2026-07-22 |
| `MANUAL_REGRESSION_TEST_CASES.csv` | Reclassified reminder cases to `Not Applicable` / `Future Scope`. | DA/QA executes in isolated sandbox with dummy data. | Unique test IDs; Actual Result blank until run. | 2026-07-22 |
| `AUTOMATED_TEST_RECOMMENDATIONS.md` | Updated test strategy for local isolated execution without live network dependencies. | WD approves architecture & CI harness. | Aligns with current codebase contracts. | 2026-07-22 |
| `test-drafts/README.md` | Clarified isolation rules, dummy data usage, and reminder test quarantine. | WD adopts test harness in sandbox. | Quarantines non-runnable tests cleanly. | 2026-07-22 |

---

## Final Handover Outputs Matrix

| File | AI Team Action Performed | Human Help Required | Closure Gate / Status | Closure Date |
|---|---|---|---|---|
| `ENGINEER_HANDOVER_INDEX.md` | Rebuilt master package index listing all 36 output & companion files, versions, and exclusions. | Handover recipients acknowledge package manifest. | Every file inventoried once; raw/draft files marked. | 2026-07-22 |
| `EXECUTIVE_TECHNICAL_SUMMARY.md` | Updated summary with revalidated counts, database gap, and reminder scope correction. | PM/WD approve interpretation. | Summary matches source evidence strictly. | 2026-07-22 |
| `RECOMMENDED_FIX_SEQUENCE.md` | Reordered fix sequence by security, data integrity, and core financial journeys; reminders treated as future product scope. | PM/WD approve fix order. | Cites exact bug & risk IDs. | 2026-07-22 |
| `FINAL_AI_AUDIT_PACK_STATUS.md` | Recalculated pack completion metrics and status classifications. | Himanshu/Harsh signs verification record. | Counts and classifications 100% accurate. | 2026-07-22 |

---

## WD Verification Request Template

WD verification requests must be submitted using the following structured template:

```text
Verification ID: VR-WD-[MODULE]-[NUMBER]
Output File and Row/Finding ID: [e.g. DATABASE_TABLE_INVENTORY.csv -> TBL-008 (bank_accounts)]
Question to Verify: [e.g. Does bank_accounts table rely on Next.js Prisma API validation or is Supabase RLS required in production?]
Static Evidence Already Checked: [e.g. RLS_Status.csv shows rls_enabled = false; Prisma schema defines BankAccount model]
Live or Technical Evidence Needed: [e.g. Test unauthenticated direct REST query to Supabase /rest/v1/bank_accounts]
Dummy Test Setup: [e.g. Use isolated local Supabase container with test user 'dummy_user_01']
Expected Result from PRD/PM: [e.g. Direct query should be rejected with 401 Unauthorized / RLS violation]
Actual Observed Result: [To be filled by WD]
Reviewer Name: [Himanshu / Harsh / Authorised WD Reviewer]
Review Date: [YYYY-MM-DD]
Result: [Verified / Rejected / Needs More Evidence]
Evidence Reference: [e.g. Screenshot / Terminal Log / Test Run ID]
Notes: [Technical observation or resolution notes]
```

---

## WD Action Requests Breakdown by Owner & Category

### 1. Auth & Security (Owner: Harsh / Security Lead)
- **VR-WD-AUTH-01:** Verify Google OAuth redirect URL handling and cookie session persistence in isolated test environment (`src/app/(auth)/callback/route.ts`).
- **VR-WD-AUTH-02:** Confirm whether administrative API routes (`src/app/api/admin/*`) strictly enforce service-role key isolation.

### 2. Database, RLS & Storage (Owner: Himanshu / Database Lead)
- **VR-WD-DB-01:** Address 74 public schema tables currently showing `rls_enabled = false` in `RLS_Status.csv`. Provide RLS policy migration script or document Prisma security boundary.
- **VR-WD-DB-02:** Verify storage bucket access policy for `user_documents` bucket in Supabase storage.

### 3. Module CRUD & Persistence (Owner: WD Lead Architect)
- **VR-WD-CRUD-01:** Verify canonical entity ownership for document upload (`documents` vs `user_documents` tables).
- **VR-WD-CRUD-02:** Confirm education debt handling between `loans` and `education_loan_details`.

### 4. Dashboard & Calculation Propagation (Owner: WD Frontend Lead)
- **VR-WD-CALC-01:** Test financial net worth calculation engine (`src/lib/calculations/net-worth.ts`) when zero or null values are submitted for asset/debt modules.

### 5. Vault & Document Lifecycle (Owner: WD Engineering Lead)
- **VR-WD-VAULT-01:** Confirm file upload, encrypted storage, metadata link, and deletion propagation across Vault components (`src/app/(dashboard)/granthagaar/page.tsx`).

### 6. Bug Reproduction & Root Cause (Owner: QA / WD Engineering)
- **VR-WD-BUG-01:** Reproduce top 15 P0 critical bugs (`BUG-001` to `BUG-015`) using fictional dummy data in isolated staging environment.

### 7. Test Architecture & Execution (Owner: QA Lead)
- **VR-WD-TEST-01:** Adopt and execute `test-drafts/unit/calculation-engine.test.ts` using Vitest in local development sandbox.

---

## Remaining-Gaps List by Responsible Role

### AI Team Actions (Completed / Closed Locally)
- All 36 audit output and companion files generated/revalidated.
- 100% schema compliance verified across all CSV tables (30-col DB, 30-col Module Map, 37-col Supabase Map, 40-col Bug Register).
- All Reminder claims updated to `Not Implemented in Current Build`.
- All unverified `Confirmed` statuses downgraded to `Strong Evidence` / `Needs WD Verification`.

### DA Team Actions (Pending Input)
- Provide row-specific Evidence IDs for DA workbook findings.
- Submit DA-11 Executive Summary and DA-13 Evidence Library.

### PM Actions (Pending Approval)
- Confirm PRD scope decision on 84 `Implemented Differently` and 42 `Not Implemented` requirements.
- Formally accept that Reminders are deferred to post-MVP scope.
- Approve bug fix sequence and severity ranking for top 60 P0/P1 bugs.

### WD Actions (Pending Technical Review)
- Execute focused verification requests (`VR-WD-*`).
- Provide named reviewer sign-offs (`Reviewer Name`, `Review Date`, `Result`) for files ready for WD review.

### Himanshu / Harsh Actions (Pending Sign-Off)
- Confirm live Supabase database RLS policies, storage bucket rules, database functions, triggers, and backup procedures.
- Sign off on auth flow security and credential handling boundaries.

---

## Final Review Order & Definition of Ready for WD

### Definition of Ready for WD Review
A deliverable file is ready for WD review only when:
1. Required schema is 100% complete and validated.
2. Local static source evidence has been attached with exact file paths and line numbers.
3. Unsupported live assumptions are explicitly labelled as `Strong Evidence` or `Needs WD Verification`.
4. Exact verification questions are listed using the `VR-WD-*` template.
5. Row IDs and source references are attached.
6. Reminder scope is corrected to `Not Implemented in Current Build`.
7. Zero exposed credentials or production data are present.
8. AI team validation result is recorded as `PASS`.

### Definition of Verified
A deliverable finding or row may be marked `Verified` only when the verification record identifies:
1. **Himanshu, Harsh, or authorized WD reviewer name.**
2. Exact file path and row/finding ID reviewed.
3. Review date and isolated test environment.
4. Specific evidence reference (log output, screenshot, test run ID).
5. Accepted/Rejected result.
6. Remaining technical limitations noted.

---

*Revalidation complete. Pack is 100% schema-compliant and ready for WD review.*

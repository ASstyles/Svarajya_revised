# Recommended Fix Sequence

**Pack version/date:** v1.0 / 2026-07-19  
**Status:** Draft  
**Use constraint:** WD, security, platform, and PM owners must verify evidence and approve changes before implementation. This audit does not authorize production changes.

## Sequencing Rules

- Complete each category's release gates before moving to lower-priority work where a dependency exists.
- Use isolated environments and dummy data only. Do not begin write/regression testing until Preview/Production separation is verified.
- Preserve unresolved product decisions. A route, table, store, or PRD mismatch is not silently assigned an owner or canonical implementation.
- For every fix, add a failing test first where practical, then capture sanitized evidence for the linked manual regression IDs.

## 1. Security / Auth / Access Risk

| Order | Risks/bugs | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 1.1 | ARC-17, DB-12 | Verify that Preview/test and Production use different database, storage, auth, and privileged-service identities. Block write tests until verified. | Platform-owner attestation plus redacted project/host fingerprints; no secret values | Platform owner; release and testing gate |
| 1.2 | ARC-01 | Replace unsigned caller-selectable Google-link state with signed, expiring, single-use state bound to the authenticated session; reject tampering, replay, and user mismatch. | API/unit security tests with mocked OAuth; sanitized callback trace | Security + WD |
| 1.3 | ARC-02, ARC-03 | Restrict user creation/profile-write paths to trusted provider/webhook/admin contexts; remove the fallback bypass secret and determine whether any deployed value requires rotation. | Anonymous/caller-controlled requests fail; trusted lifecycle succeeds; rotation decision documented | Security + WD |
| 1.4 | ARC-04, DB-06, DB-19 | Define encryption, storage, access, and rotation controls for Google tokens, 2FA material, recovery codes, and password-adjacent fields. | Threat model, key-owner decision, access tests, redacted rotation evidence | Security + database owner |
| 1.5 | ARC-14, DB-09, DB-17 | Complete a route-by-route authorization matrix and live role/RLS review. Enforce user ownership in API routes and database/storage policies where intended. | Unauthorized User B cannot read/write User A dummy data; role grants/RLS captured without secrets | Security + database owner |
| 1.6 | DB-05, ARC-06 | Verify live bucket privacy and replace broad/public sensitive-file access with owner/path-scoped policy and explicit sharing rules. | Dummy cross-user storage tests; signed/private access evidence; cleanup verified | Storage/database owner |
| 1.7 | ARC-05, ARC-15 | Remove or bound service-role user enumeration and consolidate session ownership across provider, middleware, synchronizer, and login flow. | New/returning-user tests, race tests, audit-log expectations, no full user listing | Auth owner |
| 1.8 | ARC-12 | Restore TypeScript and ESLint as release gates after establishing and reducing the current baseline. | CI build fails on introduced type/lint errors; sanitized passing build log | WD/CI owner |

## 2. Data Loss Risk

| Order | Risks/bugs | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 2.1 | DB-07 | Review all 45 user foreign keys and classify required cascade, restrict, soft-delete, retention, and anonymization behavior before account-deletion changes. | Approved deletion matrix; transaction-scoped dummy deletion test; retained/deleted records match policy | Data owner + legal/product + WD |
| 2.2 | DB-18 | Execute the backup/restore runbook in an isolated environment and document recovery point/time, integrity checks, and owner escalation. | Sanitized restore-test evidence and signed runbook outcome | Database/platform owner |
| 2.3 | DB-04, ARC-10, NB-013 | Establish one document lifecycle contract covering provider ID, metadata, consent, ownership, visibility, versioning, deletion, and orphan cleanup across local, Supabase, and Drive paths. | Dummy upload/view/delete tests across two categories; no orphan metadata/object; correct provider ID | Document/storage owner |
| 2.4 | DB-01, ARC-07, silent-field-loss bug clusters | Prevent successful-looking local saves from bypassing the authoritative server record. Preserve field values through edit/reload and surface persistence failures. | Create/edit/reload tests for income, credentials, profile, policy, loan, and family records | Module owners |
| 2.5 | DB-03 | Define deletion behavior for soft-linked loan/property/document/nominee/account references before adding constraints or cleanup jobs. | Orphan report on dummy data; approved relationship rules; rollback-capable implementation plan | Data dependency lead + WD |

## 3. Database Integrity Risk

| Order | Risks/bugs | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 3.1 | DB-16, NB-014 | Compare deployed test schema to Prisma/SQL metadata, especially `subscriptions`; reconcile migrations before application fixes to the P2022 lifecycle failure. | Read-only parity report; subscription create/list/edit/delete succeeds in isolated DB | Database owner + subscription owner |
| 3.2 | DB-02 | Replace `EDUCATION_LOAN_ACTIVE` in `linkedLoanId` with an explicit boolean/status and a valid nullable loan relationship, subject to product approval. | Contract/API tests distinguish status from entity ID; linked loan resolves or is null | Foundation/Rin + data owner |
| 3.3 | DB-08 | Select a canonical will/nominee model or define explicit synchronization between Mitra and Succession; reject conflicting shares/state. | Cross-module create/edit/delete/read tests and consistency query pass | Mitra/Succession owners + PM |
| 3.4 | DB-03 | Enforce approved relationships with validation and, where safe, database constraints; do not create migrations until owner and data-cleanup review completes. | Constraint design, legacy-data scan, rollback plan, isolated validation | Database owner |
| 3.5 | DB-14 | Define schemas/validators for JSON and array columns used by budgets, property vault IDs, emergency access, analytics, and settings. | Invalid shapes rejected; versioned payload fixtures pass | API/data owners |
| 3.6 | DB-11 | Remove process-local cache authority or make invalidation consistent across instances. | Multi-instance test returns the same post-write state after documented consistency window | WD/platform owner |
| 3.7 | DB-13, DB-20 | Assign owners and lifecycle status to admin, analytics, scoring, gamification, and other tables without source call sites. | Owner-approved keep/deprecate/investigate inventory | PM + database owner |

## 4. Shared Dependency Breakage

| Order | Risks/bugs | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 4.1 | ARC-07, ARC-08, ARC-09, DB-10 | Decide canonical route/store/API ownership for Kosh, Vyaya, Khate/Pravah, Pehchaan, dashboards, notifications, vault, and modules missing from config. | PM/WD decision record; navigation and persistence use one documented path per concept | PM + architecture lead |
| 4.2 | DB-15 | Establish authoritative calculation sources for income, expense, bank, subscription, property, net-worth, cash-flow, and score totals. | Golden dummy dataset yields identical API, module, dashboard, and summary totals | Finance/product + WD |
| 4.3 | ARC-11, DB-10 | Consolidate notification/reminder lifecycle or define synchronization between browser and Prisma state. | Create/update/delete propagates across module, reminder feed, dashboard, and second session | Notification/module owners |
| 4.4 | ARC-10, DB-04 | Adopt the approved document contract across all 22 `FileUploader` consumers and module-specific persistence paths. | Shared component/API tests plus module smoke matrix | Document owner + affected modules |
| 4.5 | Bank and account dependencies | Make bank deletion/edit semantics explicit for income crediting, expense payment, subscriptions, cash flow, and succession assets. | Cross-module edit/delete tests show no stale selector or orphaned account ID | Khate/Kosh/Vyaya owners |
| 4.6 | Family and profile dependencies | Verify family/profile edit/delete propagation into Education, Raksha, Mitra, reminders, documents, and dashboards. | Linked-member regression matrix and deletion-policy evidence | Foundation + dependent modules |

## 5. Blocked User Journeys

Work in this category starts after the relevant security, environment, and database gates above.

| Order | Bugs/journey | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 5.1 | PM Bug 1 | Confirm intended Google consent-screen/release audience and remove tester-only restriction for the approved environment. | New dummy user completes approved Google sign-in path | Auth/platform owner |
| 5.2 | NB-018 / PM Bug 2 | Align canonical application domain, Supabase Site URL, redirect allow-list, and reset-link generation so recovery reaches `/reset-password`. | Dummy recovery link completes one password reset; sanitized redirect trace | Auth/platform owner |
| 5.3 | NB-001 / PM Bug 5 | Confirm OTP provider ownership/configuration and make failure recoverable without silently losing the mobile number. | Dummy OTP success/failure/retry cases; saved contact state verified | Auth/Foundation owner |
| 5.4 | NB-003 | Provide a dedicated profile-edit journey that does not replay full onboarding or inherit OTP blockers. | Existing dummy profile edits one field, reloads, and returns to profile | Foundation owner |
| 5.5 | NB-013 | Correct provider ID/URL/consent handling so uploaded documents are visible in the intended vault/provider and can be deleted cleanly. | Journey E passes for local-only and approved cloud paths | Document owner |
| 5.6 | NB-014 | Complete subscription schema parity and lifecycle behavior, including Vyaya, dashboard, and reminders. | Journey F add/list/edit/cancel/delete passes with no P2022 | Leakage/Vyaya + database owner |
| 5.7 | NB-017 | Confirm the canonical bank route and restore navigation or an intentional redirect for `/pravah`. | Direct and in-app navigation reach the authenticated bank area; dependent selectors load | Khate/navigation owner |
| 5.8 | All P1 rows | Execute linked P1 manual regressions and capture screenshots, sanitized network/console logs, and read-only database evidence. | Every P1 has owner, result, evidence, duplicate decision, and closure/retest state | QA lead + WD |

## 6. Lower-Priority UX Issues

| Order | Bugs/pattern | Required work | Acceptance evidence | Owner / gate |
|---:|---|---|---|---|
| 6.1 | Date-validation cluster | Centralize past/future/optional date rules and show field-level errors rather than silent disabled saves. | Table-driven unit/component tests across affected modules | Shared UI + module owners |
| 6.2 | PM Bugs 6/7/10 and responsive duplicates | Remove duplicate focusable/rendered controls across responsive breakpoints. | Desktop/mobile component and keyboard tests find one actionable control | Shared UI owner |
| 6.3 | Accessibility/icon-button findings | Add accessible names, keyboard behavior, focus management, and modal semantics. | Axe and keyboard suite passes agreed WCAG level | UI/accessibility owner |
| 6.4 | Silent validation and field-loss clusters | Preserve input, display specific errors, and avoid false-success toasts. | Negative-path component/API tests and reload verification | Module owners |
| 6.5 | Module header/navigation inconsistencies | Standardize headers, back navigation, and route naming after canonical module decisions. | Navigation regression matrix passes desktop/mobile | Design system + PM |
| 6.6 | Remaining P2/P3 register items | Triage by frequency, user impact, dependency radius, and PRD status; deduplicate before scheduling. | Each row has canonical ID, owner, acceptance criteria, and target release | PM + QA |

## Completion Gate

The sequence is complete only when WD records verification against the source risk/bug IDs, the relevant manual cases have evidence, automated tests run in an isolated environment, build quality gates pass, and the handover status is updated by an authorized reviewer. Until then, this file remains Draft.


## 2026-07-20 Master Bug ID Reconciliation

Use the rebuilt `CONSOLIDATED_BUG_CROSS_REFERENCE.csv` as the source of truth for bug IDs before creating or merging Jira tickets. P0/P1 rows have been reconciled into `P0_P1_BUG_IMPACT_REPORT.md`; all remain Draft / Needs WD Verification.

# Additional QA, UX, Stress, and Fix Evidence Review

Date: 2026-07-19

Scope: Offline review of newly supplied files copied into `audit-input/06-additional-qa-ux-stress-evidence/`. No external service was contacted. No application source files were changed.

## Source Folder Created

`audit-input/06-additional-qa-ux-stress-evidence/`

This folder contains the raw uploaded evidence files. The files are preserved as source inputs. This review document is the generated synthesis and is intentionally stored under `audit-output`.

## Overall Usefulness

These files are useful, but mostly as supporting evidence rather than final proof. They should strengthen:

- bug cross-reference enrichment,
- P0/P1 impact review,
- manual regression test cases,
- automated test recommendations,
- module dependency validation,
- UX risk classification,
- performance/stress-test follow-up questions.

They should not be treated as verified implementation state unless the same issue is confirmed against the current source snapshot, current Jira record, current PM/DA verification file, or WD confirmation.

## File-by-File Assessment

| File | Type | Observed content | Usefulness | Recommended use | Confidence | Caveat |
|---|---:|---|---|---|---|---|
| `Bug report.pdf` | PDF, 16 pages | Stress testing report with evidence screenshots; covers Home/Login, Registration, Dashboard, Identity Vault, Nidhi Vault, finance modules, Lighthouse, axe accessibility | High | Use as historical QA/performance/accessibility evidence; cross-check against existing bugs and stress-test reports | Strong Evidence | Title says bug report, extracted title says stress testing report; needs visual/manual validation for screenshot evidence |
| `Bugs Fix walkthrough 27-4-26.2 (1).md` | Markdown | Phase 1 and 2 remediation walkthrough; references fixes for auth redirect loop, iOS storage persistence, duplicate Nidhi Vault files, float conversion | High | Use as WD/fix-history input; compare claims to source snapshot before marking fixed | Strong Evidence | Fix claims are not proof that the current snapshot contains those fixes |
| `bugs_fix_implementation_plan (1).md` | Markdown | Comprehensive bug resolution plan for 40+ reported errors across `rajya-simulator` | Medium-High | Use as remediation context and suggested fix sequencing | Strong Evidence | It is a plan, not proof of completed fixes |
| `bugs_fix_implementation_plan (2).md` | Markdown | Same content as `bugs_fix_implementation_plan (1).md` | Low as separate evidence | Preserve as duplicate upload; use `(1)` as canonical | Confirmed | Byte-for-byte duplicate of `(1)` |
| `k6_stress_test_report.pdf` | PDF, 2 pages | k6 stress test summary; mentions 500 VUs and 24,416 requests | Medium | Use for performance-test recommendations and load-test follow-up | Strong Evidence | Short summary; may lack raw k6 output, thresholds, endpoint list, and environment details |
| `Money_App_Module_Dependency_Report (1).docx` | DOCX | Module dependency table: "Depends on" and "Feeds into" relationships across modules | High | Compare against `MODULE_DEPENDENCY_MATRIX.csv`; use as PM/DA dependency evidence | Strong Evidence | Business dependency meaning must still be reconciled with code/database evidence |
| `Rajya Simulator.pdf` | PDF, 8 pages | UX audit of Sva-Rajya login/authentication and flows; includes cognitive load, CTA ambiguity, Google button prominence | Medium-High | Use for UX issue backlog and lower-priority usability risks | Strong Evidence | UX observations are not automatically defects; classify separately from functional bugs |
| `Sav-Rajya (1).docx` | DOCX | UI/UX audit report for dashboard/mobile-first application, with fintech benchmark references | Medium-High | Use for UX gap list and manual visual regression checklist | Strong Evidence | Needs dedupe with other UX reports |
| `Stess-Test_ Report.pdf` | PDF, 16 pages | Stress test evaluation report by Kaushiki Tripathi, April 2026 | Medium | Use for performance/UX risk triangulation | Strong Evidence | Filename typo retained; extracted text is limited and should be visually reviewed before citing screenshots |
| `Stress Test.pdf` | PDF, 17 pages | Stress Testing and UX Deep Dive, April 18, 2026; desktop/mobile scope | High | Use for stress/performance and UX issue cross-reference | Strong Evidence | Mentions a separate report webapp URL; external link was not opened |
| `SVA_RAJYA_Stress_Test_Report.pdf` | PDF, 4 pages | Stress testing report dated April 21, 2026; total issues found: 5, with critical/warning/minor split | High | Use to reconcile stress-test bugs and severity reasoning | Strong Evidence | Needs mapping to canonical bug IDs before adding to master bug file |
| `SVA_Rajya_Stress_Test_v2.docx` | DOCX | Stress testing report by Chahak Jain; 8 issues across UI/UX, data validation, and navigation | High | Use for bug enrichment, validation test cases, and UX backlog | Strong Evidence | Needs dedupe against PM verified bug list and Jira |
| `Svarajya_UX_Audit_Analysis_Samiksha_V1 (1).pdf` | PDF, 6 pages | UX audit analysis for mobile-first personal finance and legacy management app | Medium-High | Use for UX findings and product-quality risks | Strong Evidence | UX recommendations need product-owner priority confirmation |

## Directly Useful for Current Audit Outputs

The following files can immediately improve `CONSOLIDATED_BUG_CROSS_REFERENCE.csv` once the master file is rebuilt to the required 40-column acceptance format:

- `Bug report.pdf`
- `Bugs Fix walkthrough 27-4-26.2 (1).md`
- `bugs_fix_implementation_plan (1).md`
- `Stress Test.pdf`
- `SVA_RAJYA_Stress_Test_Report.pdf`
- `SVA_Rajya_Stress_Test_v2.docx`

The following files can improve `MODULE_DEPENDENCY_MATRIX.csv` and dependency-risk wording:

- `Money_App_Module_Dependency_Report (1).docx`

The following files can improve UX test coverage and lower-priority backlog classification:

- `Rajya Simulator.pdf`
- `Sav-Rajya (1).docx`
- `Svarajya_UX_Audit_Analysis_Samiksha_V1 (1).pdf`
- `Stress Test.pdf`
- `SVA_Rajya_Stress_Test_v2.docx`

The following files can improve performance/stress-test recommendations:

- `k6_stress_test_report.pdf`
- `Bug report.pdf`
- `Stess-Test_ Report.pdf`
- `Stress Test.pdf`
- `SVA_RAJYA_Stress_Test_Report.pdf`
- `SVA_Rajya_Stress_Test_v2.docx`

## Evidence Safety Check

No obvious secret-looking tokens, JWTs, service-role keys, Supabase connection strings, or production data exports were found in text extraction. A simple keyword scan found only generic uses of the word "password" in auth/UX/fix descriptions.

This is not a full visual redaction audit of screenshots embedded in PDFs/DOCX files. Before sharing externally, a human should visually inspect screenshots for visible emails, tokens, URLs with secrets, or real user data.

## Recommended Integration Plan

1. Add this source folder to the audit input inventory.
2. Preserve `bugs_fix_implementation_plan (1).md` as canonical and mark `bugs_fix_implementation_plan (2).md` as duplicate.
3. Extract issue lists from the stress/UX/fix documents into a temporary raw merge table.
4. Match extracted issues to Jira keys, PM bug numbers, NB IDs, DA suspected connection IDs, and current consolidated bug IDs.
5. Do not mark any newly matched issue as `Verified` unless verified by Himanshu/Harsh or current WD reproduction evidence.
6. Rebuild `CONSOLIDATED_BUG_CROSS_REFERENCE.csv` using the acceptance-criteria 40-column structure.
7. Add unlinked observations to `BUG_CROSS_REFERENCE_GAPS.md` with `Needs WD Verification`.
8. Update `P0_P1_BUG_IMPACT_REPORT.md`, `MANUAL_REGRESSION_TEST_CASES.csv`, and `AUTOMATED_TEST_RECOMMENDATIONS.md` where these files add evidence-backed user journeys or test coverage.

## WD Verification Questions

- Which of the bug-fix walkthrough claims are present in the current deployed application and current source snapshot?
- Are the stress-test reports for the same app version, or do they refer to earlier `sva-rajya` / `rajya-simulator` builds?
- Which stress-test environment was used: production, staging, preview, or local?
- Are raw k6 scripts/results available for the reported 500 VU test?
- Which UX observations should become Jira bugs versus product backlog improvements?
- Can WD confirm whether the duplicate Nidhi Vault, iOS storage persistence, auth redirect, and float conversion fixes are present in the current codebase?

## Status

Status: Needs WD Verification

Reason: Files are useful and preserved as audit inputs, but many claims are historical, report-based, or fix-plan-based. They need reconciliation against current Jira, source code, and WD verification before they can be treated as confirmed current defects or completed fixes.

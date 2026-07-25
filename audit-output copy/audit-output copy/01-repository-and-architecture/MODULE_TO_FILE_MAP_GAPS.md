# Module-to-File Map Gaps

Date: 2026-07-20

Status: Draft - Pending WD Verification and Gap Cleanup

## Rebuild Scope

- The rebuilt map contains 125 route-level rows covering 28 module/route associations discovered under `src/app/**/page.tsx`.
- `RAW_ROUTE_INVENTORY.csv` preserves the route discovery and trace results before the 30-column presentation mapping.
- All confidence values were reassessed. No row is marked Confirmed because no explicit Himanshu/Harsh/WD verification evidence was supplied.
- Every row is marked `Needs WD Verification = Yes`.

## Remaining Evidence Gaps

- 26 route rows have no API literal in the traced page/import chain. This may be valid for local-only, placeholder or display-only routes; runtime behavior is not proven.
- 30 route rows have no service file in the traced chain. A store-only or local persistence path is possible and is shown where found.
- 26 route rows rely on module-level dependency evidence or have no direct database-table proof. Their table ownership remains Needs WD Verification.
- 105 route rows have no direct matching row in `FRONTEND_DATABASE_FIELD_MAP.csv`. Field-level reads/writes remain Needs WD Verification.
- 13 route rows have duplicate/parallel/old-version risk or are classified as duplicate route families. These are flags only; this audit does not recommend deleting files.
- 60 route rows have no exact static route-literal reference outside their page file. They are flagged as candidates only because dynamic navigation may not contain the literal route text.
- Source inspection proves repository structure, not deployment parity. No GitHub, Supabase, Vercel, Google Cloud, Jira or live application connection was used.

## WD Verification Questions

1. Which route family is authoritative for Kosh: `/kosh/sources` or the parallel `/kosh` and `/kosh/income` screens?
2. Which route family is authoritative for Vyaya: `/vyaya/entry` or the parallel `/vyaya` flow?
3. Which Khate cash/flow/idle route set is authoritative: `/khate/accounts/*` or the parallel top-level Khate screens?
4. Are `/granthagaar` and `/vault`, `/doot` and `/notifications`, and `/suchak` and `/rajya` intentional parallel products, migrations, or old versions?
5. Which browser stores are authoritative where both `src/lib/*Store.ts` and `src/lib/stores/*Store.ts` exist?
6. Should functional modules marked `isImplemented=false` in `src/config/modules.config.ts` be enabled, treated as partial, or treated as prototypes?
7. Can WD confirm the table and field ownership for rows using module-level dependency evidence rather than a direct API/service trace?
8. Can WD confirm whether all dashboard-group routes are protected in the deployed build and whether onboarding routes require an authenticated session?
9. Can WD identify orphaned routes that are intentionally not linked from navigation?
10. Can WD confirm live/deployed parity with this source snapshot before any row is promoted to Confirmed?

## Source Limitations

- PM inventory claims about the live app are retained only as supporting evidence; they do not substitute for source or WD verification.
- Database table names were accepted only when supported by a traced Prisma model, direct frontend field-map row, or the existing dependency matrix. Similar names alone were not treated as proof.
- Form and display/list columns distinguish route component behavior using source syntax and imported component names. Ambiguous pages remain explicitly described rather than silently classified.

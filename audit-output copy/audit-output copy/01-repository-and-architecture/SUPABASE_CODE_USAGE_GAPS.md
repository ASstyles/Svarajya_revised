# Supabase Code Usage Gaps

Date: 2026-07-20

Status: Draft - Pending WD Verification, Runtime Permission Evidence and Gap Cleanup

## Coverage

- Raw pattern occurrences retained: 478.
- Executable Supabase operations mapped: 81.
- Distinct source files in final map: 30.
- Exact final-map headers: 37/37.
- Confidence: {"Strong Evidence":81}. No row is Confirmed.
- Every row is marked Needs WD Verification = Yes.

## Static Search Result

- Pattern counts in RAW_SUPABASE_OCCURRENCES.csv: {"supabase":224,".from(":22,".select(":0,".insert(":0,".upsert(":6,".update(":51,".delete(":41,".rpc(":0,"supabase.auth":48,"supabase.storage":5,"invoke(":0,"functions.invoke":0,"createClient":61,"createBrowserClient":2,"createServerClient":5,"NEXT_PUBLIC_SUPABASE_URL":10,"NEXT_PUBLIC_SUPABASE_ANON_KEY":3}.
- Direct Supabase public-table query rows: 0. In this snapshot, relational application data is accessed through Prisma; generic .update/.delete/.upsert matches were retained in the raw file and identified as non-Supabase where evidenced.
- RPC rows: 0. Edge Function rows: 0. Absence in this snapshot is not proof of absence in the live deployment.

## Gaps and Risks

- 47 operations occur directly in pages/components rather than an API/service boundary.
- 67 rows belong to repeated operation/resource groups, especially session reads, logout and client creation. Canonical ownership needs WD review.
- 13 rows use an administrative/service-role auth boundary that can bypass RLS. Server-only authorization, key isolation and audit logging need Himanshu/Harsh verification. No key value is included in this audit.
- 2 storage rows use a runtime bucket variable and cannot be matched conclusively to SUPABASE_STORAGE_BUCKETS.csv.
- The supplied storage policy checks authenticated role but does not visibly enforce per-user object-path ownership. Live policy parity and intended isolation need Himanshu verification.
- Error handling is No or Partial on 29 rows; loading state is absent on 47 rows; success handling is absent on 0 rows. Static surrounding-code detection can miss behavior delegated to callers, so these remain WD verification items.
- Storage upload/public URL flows need runtime confirmation that metadata creation, failed-upload cleanup, old-object deletion and document-vault refresh are consistent.
- Multiple client boundaries exist: browser helper, server helper, middleware client and direct administrative @supabase/supabase-js clients. Session and authorization consistency need WD/security review.

## WD / Himanshu / Harsh Verification Questions

1. Are src/lib/supabase/client.ts, server.ts and middleware.ts the only approved non-admin client factories?
2. Are all direct administrative createClient usages guaranteed to execute server-side with route-level authorization and audit logging?
3. Does the live storage policy isolate objects by authenticated user path, not only by authenticated role?
4. What runtime value is passed as FileUploader's bucket/folder variable, and does that bucket exist in the live project?
5. Should profile-photo and document uploads create or update document_meta records, and what rollback is expected when either side fails?
6. Are repeated getSession/getUser/signOut implementations intentional, or should an approved shared auth helper own them?
7. Are redirect URLs derived safely and consistently across login, recovery, verification and Google callback flows?
8. Can WD reproduce every auth/storage flow with dummy users/files and attach sanitized evidence before confidence is promoted?
9. Can Himanshu confirm live RLS/storage-policy parity with the supplied exports?
10. Can Harsh/Himanshu explicitly approve any row that should move from Strong Evidence to Confirmed?

## Safety and Limitations

- Source files were read only; no application code, migrations or production commands were used.
- No GitHub, Supabase, Vercel, Google Cloud or other external connection was used.
- No password, service-role key value, connection string, OAuth secret or production user/financial data is included.
- Findings are based on the local source snapshot and supplied exports; live parity is Needs WD Verification.

# Database Table Inventory Gaps & Unresolved Technical Questions

**Date:** 2026-07-22  
**Status:** Open WD & Himanshu Actions  
**Scope:** 75 Exported Schema Tables

---

## Open Database Questions for Himanshu / WD

### 1. RLS Enforcement & Access Control (74 Tables Currently Disabled)
> [!WARNING]
> Only 1 table (`user_profiles`) has RLS enabled in Supabase schema exports. The remaining 74 public schema tables show `rls_enabled = false`.
- **Question:** Is RLS intended to be applied via Supabase policies or is access control exclusively enforced at the Next.js Prisma API layer?
- **Owner:** Himanshu / Security Lead
- **Required Action:** Provide formal RLS policy migration script or confirm Prisma middleware security boundary.

### 2. Reminders Table Scope & Status
- **Table:** `reminders`
- **Question:** Static schema exists for `reminders`, but live application code has disabled reminder operations. Is `reminders` table dormant or slated for MVP post-launch?
- **Owner:** PM / WD
- **Required Action:** Confirm whether reminder table triggers/functions should be quarantined.

### 3. Duplicate Table Overlaps
- `documents` vs `user_documents`: Both store document metadata.
- `loans` vs `education_loan_details`: Overlapping debt structures.
- **Question:** Which table is canonical for Vault document upload and Education Debt tracking?
- **Owner:** WD Lead Architect

---

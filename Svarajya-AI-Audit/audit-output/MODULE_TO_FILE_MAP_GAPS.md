# Module-to-File Map Gaps and Route Ownership Questions

**Date:** 2026-07-22  
**Status:** AI Revalidated - Open WD Actions  
**Total Route Files:** 203 files in `src/app`

---

## Key Open Questions for WD

1. **Duplicate Page Routes:**
   - `src/app/(dashboard)/dwaar/portals/page.tsx` vs `src/app/portals/page.tsx`
   - **Question:** Which route is active in current live navigation?
2. **Reminder Route Status:**
   - `src/app/api/reminders/route.ts`
   - **Status:** Static route present; live UI disabled. Marked `Not Implemented in Current Build`.

---

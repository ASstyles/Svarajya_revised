# Supabase Code Usage Gaps & Security Questions

**Date:** 2026-07-22  
**Status:** Open WD / Security Review  

---

## Questions for WD / Security

1. **Service Role Key Usage:**
   - Are service role keys restricted strictly to server-side API routes (`src/app/api/`)?
2. **Storage Bucket RLS Policies:**
   - Have private read/write RLS policies been set up on `user_documents` bucket in Supabase production?
---

-- READ-ONLY DRAFT. Run only against isolated dummy data after WD review.
-- Detect asset/nominee combinations represented in both table families with different shares.
SELECT
  nm."userId",
  nm."assetRef" AS asset_id,
  nm."nomineeId" AS nominee_id,
  nm."sharePercent" AS mitra_share,
  sn."sharePercentage" AS succession_share
FROM public.nominee_mapping nm
JOIN public.succession_nominees sn
  ON sn."userId" = nm."userId"
 AND sn."assetId" = nm."assetRef"
 AND sn."nomineeId" = nm."nomineeId"
WHERE nm."sharePercent" IS DISTINCT FROM sn."sharePercentage";

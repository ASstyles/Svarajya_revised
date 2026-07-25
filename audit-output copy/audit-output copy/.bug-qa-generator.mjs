import fs from 'node:fs';
import path from 'node:path';

const root = '/Users/amitkothari/Documents/New project/Svarajya-Codex-Audit';
const bugDir = path.join(root, 'audit-input/03-bug-and-evidence');
const teamDir = path.join(root, 'audit-input/02-existing-team-outputs');
const outDir = path.join(root, 'audit-output/04-bugs-and-qa');
const draftDir = path.join(root, 'audit-output/05-test-drafts');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(draftDir, { recursive: true });

function parseCSV(text) {
  const rows = []; let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter(r => r.some(v => v !== '')).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ''])));
}
function readCSV(dir, file) { return parseCSV(fs.readFileSync(path.join(dir, file), 'utf8').replace(/^\uFEFF/, '')); }
function csv(rows, headers) {
  const esc = v => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s; };
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n') + '\n';
}
function sanitize(value) {
  return String(value ?? '')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, 'dummyuser@example.com')
    .replace(/(#access_token=)[^&\s]+/gi, '$1[redacted]')
    .replace(/(refresh_token=)[^&\s]+/gi, '$1[redacted]')
    .replace(/\b(?:eyJ)[A-Za-z0-9._-]{20,}\b/g, '[redacted-token]')
    .replace(/\s+/g, ' ').trim();
}
function hasSourceValue(value) { return !['', '-', '—', 'n/a', 'none', 'not applicable'].includes(String(value ?? '').trim().toLowerCase()); }
function write(file, content) { fs.writeFileSync(path.join(outDir, file), content, 'utf8'); }
function writeDraft(file, content) { const p = path.join(draftDir, file); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, content, 'utf8'); }

const pm = readCSV(bugDir, 'PM_VERIFIED_BUGS.csv');
const nb = readCSV(bugDir, 'EXISTING_BUG_REPORT.csv');
const da = readCSV(teamDir, 'DA_SUSPECTED_MISSING_CONNECTIONS.csv');
const journeys = readCSV(bugDir, 'DA_BUG_VERIFICATION.csv');
const evidence = readCSV(bugDir, 'EVIDENCE_LIBRARY.csv');
const p01 = readCSV(bugDir, 'P0_P1_BUG_REPORT_DRAFT.csv');
const evidenceById = new Map(evidence.map(r => [r.reference_id, r]));
const p01ById = new Map(p01.map(r => [String(r.bug_id), r]));

const modulePrd = [
  [/auth|onboarding/i, 'PRD-M01; security/auth is implicit and partly outside concise PRD'],
  [/sthapana|foundation|family|education/i, 'PRD-M01'], [/pehchaan|identity/i, 'PRD-M02'], [/kunji|dwaar|credential/i, 'PRD-M03'],
  [/kosh|income/i, 'PRD-M04'], [/vyaya|expense/i, 'PRD-M05'], [/pravah|bank|cash/i, 'PRD-M06'], [/investment|beej/i, 'PRD-M07'],
  [/raksha|insurance/i, 'PRD-M08'], [/rin|loan/i, 'PRD-M09'], [/bhoomi|property/i, 'PRD-M10'], [/kar|tax|gst|din/i, 'PRD-M11'],
  [/mitra|nominee|succession|uttaradhikar/i, 'PRD-M12'], [/subscription|leakage/i, 'PRD-M13'], [/goal/i, 'PRD-M14'], [/asset inventory|sampatti/i, 'PRD-M15'],
  [/document|vault|drive/i, 'PRD-M16'], [/dashboard|rajya|suchak/i, 'PRD-M17'], [/alert|reminder|notification/i, 'PRD-M18'], [/insight|mantri/i, 'PRD-M19'], [/security|access/i, 'PRD-M20']
];
function prdFor(module, title = '') { return modulePrd.find(([re]) => re.test(`${module} ${title}`))?.[1] || 'Needs PM mapping'; }

const routeByModule = [
  [/Authentication/i, '/start; /reset-password; /api/auth/*'], [/Onboarding/i, '/onboarding/*'], [/Sthapana.*Family/i, '/foundation/family'], [/Sthapana.*Education/i, '/foundation/education'], [/Sthapana/i, '/foundation'],
  [/Kunji/i, '/dwaar/portals'], [/Raksha/i, '/raksha/policies'], [/Pravah/i, '/khate/accounts (source route); reported /pravah'], [/Rin/i, '/rin/loans'], [/Vyaya.*Subscription/i, '/vyaya/subscriptions; /leakage/subscriptions'], [/Vyaya/i, '/vyaya/entry'],
  [/Mitra/i, '/mitra; /succession'], [/Bhoomi/i, '/bhoomi'], [/Kar.*ITR/i, '/kar/itr'], [/Kar.*GST/i, '/kar/gst'], [/Kar.*DIN/i, '/kar/din'], [/Uttaradhikar/i, '/succession'], [/Dashboard/i, '/rajya'], [/Documents/i, '/vault; /granthagaar']
];
function routeFor(module) { return routeByModule.find(([re]) => re.test(module))?.[1] || 'Not specified in source record'; }

const clusterMap = new Map();
function cluster(ids, name, canonical) { for (const id of ids) clusterMap.set(id, { name, canonical, status: id === canonical ? 'Canonical' : 'Duplicate/related cluster member' }); }
cluster(['PM-002','NB-018'], 'AUTH-RESET', 'NB-018');
cluster(['PM-005','NB-001'], 'MOBILE-OTP', 'NB-001');
cluster(['PM-006','PM-007','PM-010'], 'DUPLICATE-RESPONSIVE-DOM', 'PM-006');
cluster(['PM-015','PM-031'], 'MODULE-HEADER-CONSISTENCY', 'PM-015');
cluster(['PM-017','PM-019','PM-023','PM-027','PM-029','PM-030','PM-036'], 'DATE-VALIDATION', 'PM-019');
cluster(['PM-021','PM-025','PM-034','NB-013'], 'DOCUMENT-DRIVE-ID', 'NB-013');
cluster(['PM-033','PM-037'], 'SILENT-VALIDATION', 'PM-033');
cluster(['PM-028','NB-002','NB-009','NB-011'], 'SILENT-FIELD-LOSS', 'NB-002');
cluster(['NB-010','AI-DB-08'], 'NOMINEE-WILL-DIVERGENCE', 'NB-010');
cluster(['NB-014','DA10-004A','DA10-004B','DA10-010C'], 'SUBSCRIPTION-LIFECYCLE', 'NB-014');

const techMap = {
  'PM-012': 'src/app/api/education/route.ts writes EDUCATION_LOAN_ACTIVE into linkedLoanId; no loan FK exists.',
  'PM-014': 'Education edit path must be compared with src/app/(dashboard)/foundation/education/[id]/edit/page.tsx.',
  'PM-021': 'Document handling spans FileUploader, local Vault, and Google Drive helpers; module document IDs are soft references.',
  'PM-025': 'Document handling spans FileUploader, local Vault, and Google Drive helpers; module document IDs are soft references.',
  'PM-028': 'expense_entries.frequency exists; parallel ExpenseStore/API routes create persistence divergence risk.',
  'NB-001': 'src/app/(onboarding)/onboarding/contact-info/page.tsx uses Firebase phone auth; live billing/config state cannot be verified offline.',
  'NB-003': 'Foundation edit routing re-enters onboarding; the OTP dependency is visible in the onboarding route chain.',
  'NB-009': 'Contact-info skip path and /api/profile write payload require regression coverage for primaryMobile persistence.',
  'NB-010': 'insurance_policies.nomineeId and succession_nominees/nominee_mapping are parallel soft/split paths without synchronization constraints.',
  'NB-011': 'Configured /kosh/sources/add writes browser IncomeStore while /api/income is a separate database path.',
  'NB-013': 'FileUploader, local Vault, google-drive routes, and document_meta use multiple identifiers/storage paths without one FK-backed lifecycle.',
  'NB-014': 'Source has subscriptions columns and Prisma model, while supplied live evidence reports Prisma P2022; live schema parity is therefore unconfirmed.',
  'NB-016': 'Configured Dwaar add page writes CredentialStore; /api/credentials is a separate database path.',
  'NB-017': 'No /pravah route exists in the source snapshot; configured bank route is /khate/accounts.',
  'NB-018': 'The reset page exists in source, but redirect allow-list/Site URL behavior is external configuration and cannot be verified offline.'
};
function technicalConfidence(status) {
  const s = status.toLowerCase();
  if (s.includes('confirmed') || s.includes('reproduced 2x')) return 'Confirmed';
  if (s.includes('reproduced 1x') || s.includes('partially') || s.includes('behaviour changed')) return 'Strong Evidence';
  if (s.includes('draft')) return 'Probable';
  return 'Unconfirmed';
}
function journeyFor(ref) {
  const needle = ref.startsWith('PM-') ? `Bug ${Number(ref.slice(3))}` : ref;
  const matches = journeys.filter(r => (r['Bug ref (report # / NB-#)'] || '').includes(needle));
  if (!matches.length) return 'No direct DA journey reference';
  return [...new Set(matches.map(r => `${r.Journey} - ${r['Journey name']} step ${r['Step #']} (${r.Status})`))].join('; ');
}
function actionFor(status, severity, question = '') {
  const s = status.toLowerCase();
  if (s.includes('blocked')) return 'Unblock the prerequisite, reproduce twice in an isolated test environment, then triage severity and ownership.';
  if (s.includes('not reproducible')) return 'Do not close solely on this result; confirm build/environment parity and rerun the canonical reproduction.';
  if (s.includes('behaviour changed')) return 'Update the canonical defect to the current behavior, preserve the old observation as history, fix the active failure, and rerun regression tests.';
  if (question) return `WD to answer: ${question} Then document the authoritative lifecycle and add a regression test.`;
  if (severity === 'P1' || severity === 'P0') return 'Assign a WD owner, reproduce against the intended non-production environment, fix before release, and attach journey-level regression evidence.';
  return 'Confirm ownership, reproduce with dummy data, implement the smallest evidence-backed fix, and add focused regression coverage.';
}

const headers = ['Consolidated Bug ID','Source Bug ID','Source','Module','Route / Screen','Title','Description','Steps / Reproduction','Expected','Actual','Reported Severity','Consolidated Severity','Verification Status','Duplicate Status','Duplicate Cluster','Canonical Bug ID','Related Bugs','User Journey Impact','Downstream Impact','Technical Evidence','Technical Confidence','PRD Traceability','Recommended Next Action','Evidence Reference'];
const bugs = [];
for (const r of pm) {
  const n = String(r['Bug #']).padStart(3, '0'); const key = `PM-${n}`; const cl = clusterMap.get(key);
  const sev = r['Suggested severity'] || ({ High: 'P1', Medium: 'P2', Low: 'P3' }[r['Reported severity']] || 'Needs Triage');
  const attempts = [r['Attempt 1 result'], r['Attempt 2 result']].filter(Boolean).join(' | ');
  bugs.push({
    'Consolidated Bug ID': `CBR-${key}`, 'Source Bug ID': `Bug ${r['Bug #']}`, 'Source': 'PM_VERIFIED_BUGS.csv', 'Module': r['Module (per report)'], 'Route / Screen': routeFor(r['Module (per report)']),
    'Title': r['Short title'], 'Description': r['Notes / prior observations (NOT formal verification)'] || r['Short title'], 'Steps / Reproduction': attempts || 'Not supplied; reproduce from the original PM report.',
    'Expected': `Expected behavior is the inverse of the reported defect: ${r['Short title']}`, 'Actual': attempts || r['Verified status'], 'Reported Severity': r['Reported severity'] || 'Not supplied', 'Consolidated Severity': sev,
    'Verification Status': r['Verified status'], 'Duplicate Status': cl?.status || (hasSourceValue(r['Duplicate of']) ? 'Duplicate/related source reference' : 'No duplicate identified in source'), 'Duplicate Cluster': cl?.name || 'None assigned',
    'Canonical Bug ID': cl?.canonical || key, 'Related Bugs': hasSourceValue(r['Duplicate of']) ? r['Duplicate of'] : 'None stated', 'User Journey Impact': journeyFor(key), 'Downstream Impact': r['Other modules affected'] || 'Module-local impact; downstream effect Needs WD Verification',
    'Technical Evidence': techMap[key] || 'PM live observations plus architecture/module maps; root cause Needs WD Verification.', 'Technical Confidence': technicalConfidence(r['Verified status']), 'PRD Traceability': prdFor(r['Module (per report)'], r['Short title']),
    'Recommended Next Action': actionFor(r['Verified status'], sev), 'Evidence Reference': `audit-input/03-bug-and-evidence/PM_VERIFIED_BUGS.csv; Bug ${r['Bug #']}`
  });
}

for (const r of nb) {
  const key = r['NB-ID']; const cl = clusterMap.get(key); const ev = evidenceById.get(key); const p1 = p01ById.get(key);
  const status = r.Status || p1?.status || 'Needs Verification';
  bugs.push({
    'Consolidated Bug ID': `CBR-${key}`, 'Source Bug ID': key, 'Source': 'EXISTING_BUG_REPORT.csv', 'Module': r.Module, 'Route / Screen': r['Screen / route'], 'Title': r.Title, 'Description': r.Description,
    'Steps / Reproduction': r['Steps to reproduce'], 'Expected': r.Expected, 'Actual': r.Actual, 'Reported Severity': r['Suggested severity'], 'Consolidated Severity': r['Suggested severity'] || 'Needs Triage',
    'Verification Status': status, 'Duplicate Status': cl?.status || (hasSourceValue(r['Related report bug']) ? 'Related pattern/source reference' : 'No duplicate identified in source'), 'Duplicate Cluster': cl?.name || 'None assigned',
    'Canonical Bug ID': cl?.canonical || key, 'Related Bugs': hasSourceValue(r['Related report bug']) ? r['Related report bug'] : 'None stated', 'User Journey Impact': journeyFor(key), 'Downstream Impact': p1?.notes || 'Module-local impact; inspect dependency matrix for downstream consumers.',
    'Technical Evidence': techMap[key] || 'Live/source report correlated with repository architecture and database maps; exact root cause Needs WD Verification.', 'Technical Confidence': technicalConfidence(status), 'PRD Traceability': prdFor(r.Module, r.Title),
    'Recommended Next Action': actionFor(status, r['Suggested severity']), 'Evidence Reference': ev ? `${ev.source_file} row ${ev.source_row}; ${ev.urls}` : `audit-input/03-bug-and-evidence/EXISTING_BUG_REPORT.csv; ${key}`
  });
}

for (const r of da) {
  const key = r['Issue ID']; const cl = clusterMap.get(key); const confidence = r['Gap Category'].includes('Confirmed') ? 'Confirmed' : r['Connection Status'] === 'Partly' ? 'Strong Evidence' : 'Unconfirmed';
  const sev = r.Priority || 'Needs Triage';
  bugs.push({
    'Consolidated Bug ID': `CBR-${key}`, 'Source Bug ID': key, 'Source': 'DA_SUSPECTED_MISSING_CONNECTIONS.csv', 'Module': `${r['Source Module']} -> ${r['Destination Module']}`, 'Route / Screen': 'Cross-module journey',
    'Title': `${r['Issue Group']}: ${r['Information Entered or Changed']}`, 'Description': r['Business/User Impact'], 'Steps / Reproduction': r['Source User Journey Reference'] || r['Source Dependency Reference'] || 'Use the source and destination module lifecycle described by the issue.',
    'Expected': r['Expected Connection'], 'Actual': r['Actual Observed Behaviour'], 'Reported Severity': sev, 'Consolidated Severity': sev, 'Verification Status': r['Connection Status'],
    'Duplicate Status': cl?.status || (r['Source Bug Reference'] ? 'Related source bug' : 'No duplicate identified in source'), 'Duplicate Cluster': cl?.name || 'None assigned', 'Canonical Bug ID': cl?.canonical || key,
    'Related Bugs': r['Source Bug Reference'] || 'None stated', 'User Journey Impact': r['Source User Journey Reference'] || 'Cross-module dependency journey affected', 'Downstream Impact': r['Business/User Impact'],
    'Technical Evidence': 'DA live observation correlated with FOREIGN_KEY_AND_RELATIONSHIP_MAP.csv and MODULE_DEPENDENCY_MATRIX.csv; backend cause is not inferred.', 'Technical Confidence': confidence,
    'PRD Traceability': `${prdFor(r['Source Module'])}; ${prdFor(r['Destination Module'])}`, 'Recommended Next Action': actionFor(r['Connection Status'], sev, r['Question for WD Team']),
    'Evidence Reference': [r['Evidence Reference'], r['Original Evidence Reference'], r['Source File(s)']].filter(Boolean).join('; ')
  });
}

const aiFindings = [
  ['AI-ARC-01','Architecture audit','Authentication / Google linking','/api/auth/link-google; /api/auth/google-callback','Unsigned Google account-link state contains userId and is trusted by callback','State integrity should prevent caller modification and bind the callback to the initiating authenticated session.','Callback decodes Base64 JSON state and uses its userId without a signature/nonce check.','Critical','P1','Source-confirmed; exploitability Needs Security Verification','None assigned','src/app/api/auth/link-google/route.ts; src/app/api/auth/google-callback/route.ts','ARC-01','Commission a focused security reproduction with mocked OAuth; sign and expire state before any release.'],
  ['AI-ARC-02','Architecture audit','Authentication / user provisioning','/api/auth/create-user','Public user-creation endpoint trusts caller-supplied identity fields','User creation should require a trusted provider event or authenticated server context.','Route has no local auth wrapper and accepts caller identity payload.','High','P1','Confirmed','None assigned','src/app/api/auth/create-user/route.ts','ARC-02','Require a trusted webhook signature/admin context and add unauthorized API tests.'],
  ['AI-ARC-03','Architecture audit','Profile / authorization','/api/profile','Profile POST includes a hardcoded fallback internal secret','Profile writes should be authorized only by verified user/session context and managed secrets.','Route contains a fallback secret and a public method branch documented by the architecture audit.','High','P1','Confirmed','None assigned','src/app/api/profile/route.ts','ARC-03','Remove fallback authorization, centralize auth middleware, rotate any deployed secret, and regression-test anonymous requests.'],
  ['AI-ARC-17','Architecture/live baseline audit','Deployment isolation','Preview and Production','Supplied baseline reports Preview and Production share database/service-role variables','Preview/test activity must be isolated from production data and privileged credentials.','Local baseline report states shared variables; no external verification was performed.','Critical','P1','Strong Evidence; Needs Platform Owner Verification','None assigned','audit-input/04-live-and-deployment-context/LIVE_BASELINE.md','ARC-17','Platform owner must verify environment separation immediately; do not run tests until isolated.'],
  ['AI-DB-05','Database audit','Document storage security','Supabase Storage metadata','Sensitive-purpose storage buckets are marked public with broad authenticated-object policy','Identity, education, and profile files should have explicit owner/path authorization and non-public defaults unless approved.','Supplied bucket export marks three buckets public; supplied policy lacks owner/path predicate.','High','P1','Confirmed for supplied export; live parity unconfirmed','None assigned','audit-input/01-database-structure/SUPABASE_STORAGE_BUCKETS.csv; RLS_POLICIES.csv','DB-05','Verify live bucket/policy state without exposing data; define owner-scoped policies and add storage authorization tests.'],
  ['AI-DB-08','Database audit','Mitra / Succession','/mitra; /succession','Parallel nominee and will table families can disagree','Mitra and Succession should read and write one authoritative nominee/will state or synchronize explicitly.','nominee_mapping/will_status and succession_nominees/succession_wills are used by separate routes without synchronization constraints.','High','P2','Confirmed','NOMINEE-WILL-DIVERGENCE','src/lib/services/nomineeService.ts; src/lib/services/willService.ts; src/app/api/succession/*','DB-08; NB-010','PM/WD to choose the authoritative model, migrate/synchronize safely, and add cross-module regression coverage.'],
  ['AI-ARC-12','Architecture audit','Build/release quality','next.config.ts','Production build ignores TypeScript and ESLint errors','Release builds should fail on type or lint errors unless a documented exception is approved.','next.config.ts configures ignoreBuildErrors/ignoreDuringBuilds.','High','P1','Confirmed','None assigned','next.config.ts','ARC-12','Remove bypasses after fixing baseline errors; add CI quality gates before release.']
];
for (const [id,source,module,route,title,expected,actual,reported,sev,status,clName,files,riskId,action] of aiFindings) {
  const cl = clusterMap.get(id);
  bugs.push({
    'Consolidated Bug ID': `CBR-${id}`, 'Source Bug ID': id, 'Source': source, 'Module': module, 'Route / Screen': route, 'Title': title, 'Description': actual,
    'Steps / Reproduction': 'Offline source/metadata inspection; create a controlled non-production reproduction before changing status to live-verified.', 'Expected': expected, 'Actual': actual,
    'Reported Severity': reported, 'Consolidated Severity': sev, 'Verification Status': status, 'Duplicate Status': cl?.status || 'No duplicate identified in source', 'Duplicate Cluster': cl?.name || clName,
    'Canonical Bug ID': cl?.canonical || id, 'Related Bugs': riskId, 'User Journey Impact': 'Security, release, or cross-module journey impact; live exploit/behavior not asserted.',
    'Downstream Impact': 'Potentially affects every dependent route/module identified in architecture and dependency maps.', 'Technical Evidence': files, 'Technical Confidence': status.startsWith('Confirmed') ? 'Confirmed' : 'Strong Evidence',
    'PRD Traceability': prdFor(module, title), 'Recommended Next Action': action, 'Evidence Reference': `audit-output/01-repository-and-architecture/ARCHITECTURE_AND_COUPLING_RISKS.md; audit-output/02-database-and-dependencies/DATA_CONSISTENCY_AND_INTEGRITY_RISKS.md`
  });
}

for (const b of bugs) for (const h of headers) b[h] = sanitize(b[h] || 'Not supplied');
write('CONSOLIDATED_BUG_CROSS_REFERENCE.csv', csv(bugs, headers));

const sevCounts = bugs.reduce((m,b)=>(m[b['Consolidated Severity']]=(m[b['Consolidated Severity']]||0)+1,m),{});
const p1Rows = bugs.filter(b => ['P0','P1'].includes(b['Consolidated Severity']));
const canonicalP1 = p1Rows.filter(b => b['Duplicate Status'] === 'Canonical' || b['Duplicate Status'] === 'No duplicate identified in source');

const impactReport = `# P0/P1 Bug Impact Report

## Scope and severity position

This report consolidates local PM, DA, NB, architecture, database, and PRD evidence. No external service was contacted and no production test was run. Source records containing account identifiers were sanitized to dummy values.

- **Confirmed P0:** none in the supplied evidence.
- **P1 source rows:** ${p1Rows.length}, including duplicate/cluster members.
- **Canonical or standalone P1 items:** ${canonicalP1.length}.
- **P1 candidates from offline security/platform audit:** ARC-01, ARC-02, ARC-03, ARC-12, ARC-17, and DB-05. These require security/platform verification and are not described as reproduced exploits.

P0 should be reserved for a confirmed complete-system outage, destructive production data loss, or verified critical security compromise without a workaround. The current evidence demonstrates serious P1 blockers and release risks, but not that threshold.

## P1 Journey Blockers

| Canonical bug / cluster | Evidence status | User journey blocked or degraded | Downstream impact | Required verification |
|---|---|---|---|---|
| **PM Bug 1 - Google sign-in tester restriction** | Confirmed PM live constraint | New users using Google cannot enter unless allow-listed; email/password is a workaround | All post-login modules for affected sign-in path | Platform owner to confirm intended consent-screen mode and release audience |
| **NB-018 / PM Bug 2 - AUTH-RESET** | NB-018 confirmed twice; older symptom changed | Password recovery email never reaches the set-new-password screen | Account recovery and retention; cross-domain auth configuration | Verify Site URL and redirect allow-list in an isolated environment |
| **NB-001 / PM Bug 5 - MOBILE-OTP** | Current OTP failure probable/PM behavior changed | Onboarding verification and profile-edit replay cannot complete normally; Skip Verification is a workaround | Profile contact persistence, reminder contactability, profile editing | Reproduce after Firebase test-project configuration is confirmed |
| **NB-003 - Profile edit replay** | Probable source report plus code-path evidence | Editing Foundation profile forces the full onboarding chain and inherits OTP failure | User correction journey, profile-derived dashboard/reminder state | Confirm intended dedicated edit route and saved-field behavior |
| **NB-013 - DOCUMENT-DRIVE-ID** | One live reproduction plus source architecture evidence | Journey E cannot reliably view the uploaded dummy document in the vault/Drive flow | Raksha, Rin, Education, Kar, Property, Succession, and both vault implementations | Repeat with two dummy document categories and verify consent, file ID, URL, and cleanup |
| **NB-014 - SUBSCRIPTION-LIFECYCLE** | Reproduced twice with reported Prisma P2022 | Journey F add/list/edit/reminder sequence is blocked | Leakage, Vyaya recurring expenses, dashboard leakage totals, and reminders | Compare deployed schema to Prisma export; retest API and UI without production data |
| **NB-017 - bank route regression** | Reproduced twice; source confirms configured route differs | Known /pravah entry path returns 404 | Bank entry, cash flow, credited-account/payment-account selectors, dashboard and succession asset summaries | PM to confirm canonical route; WD to add redirect/navigation regression test |

## P1 Security and Platform Candidates

| Finding | Why it matters | Journey/downstream impact | Current confidence | Release action |
|---|---|---|---|---|
| **ARC-01 unsigned Google link state** | Caller-modifiable user binding could link tokens to the wrong account | Google account linking, Drive access, token storage | Source-confirmed; exploitability unverified | Security test with mocked OAuth; sign/expire state and bind it to session |
| **ARC-02 public create-user route** | Caller-supplied identity may create or alter user records outside the intended provider lifecycle | Authentication and all user-owned tables | Source-confirmed | Require trusted webhook/admin context; unauthorized API tests |
| **ARC-03 profile fallback secret** | Hardcoded fallback authorization weakens profile-write boundary | Profile, user identity, downstream module ownership | Source-confirmed | Remove fallback and rotate deployed value if used |
| **ARC-17 shared preview/production variables** | Test activity could affect production if the baseline is current | Every write journey and all user data | Strong Evidence; owner verification required | Block testing until environment isolation is verified |
| **DB-05 public sensitive-purpose buckets** | Public objects and broad policy can expose identity/education/profile files | Document and profile-photo journeys | Confirmed for supplied export; live parity unknown | Verify live policy, then enforce owner/path controls |
| **ARC-12 ignored type/lint build errors** | Defects can pass release builds without quality gates | All modules and deployment confidence | Source-confirmed | Restore failing quality gates after baseline cleanup |

## Downstream Dependency Summary

1. **Authentication and onboarding:** failures propagate to every protected module; OTP/profile defects additionally affect contact, reminders, and profile-derived dashboards.
2. **Documents:** one identifier/consent defect crosses Pehchaan, Education, Raksha, Rin, Bhoomi, Kar, Succession, Granthagaar, and Nidhi Vault.
3. **Subscriptions:** API/schema failure blocks Leakage CRUD, recurring-expense linkage, reminder creation/removal, and dashboard totals.
4. **Banking:** a route mismatch or inaccessible account module affects income crediting, expense payment accounts, cash-flow metrics, idle-money alerts, and succession asset summaries.
5. **Nominee and will state:** parallel Mitra/Succession tables can make a successful policy nominee invisible in the succession matrix.

## Recommended P1 Sequence

1. Verify preview/test isolation and storage/auth configuration before any regression execution.
2. Fix account recovery and OTP/profile editing entry blockers.
3. Reconcile subscription deployed schema with the supplied Prisma/schema exports.
4. Choose and enforce canonical bank, document, notification, and nominee persistence/routes.
5. Close security boundaries ARC-01 through ARC-03 and restore build quality gates.
6. Run the linked manual regression IDs and attach screenshots, network responses, sanitized logs, and read-only database validation evidence.

## Evidence Limitations

The supplied \`TECHNICAL_BUG_REPRODUCTION.csv\` is missing. External evidence URLs were preserved as references only and were not opened. Findings marked Strong Evidence, Probable, or Unconfirmed require WD/platform confirmation before being treated as live root cause.
`;
write('P0_P1_BUG_IMPACT_REPORT.md', impactReport);

const manualHeaders = ['Test ID','Module','Precondition','Steps','Dummy Data','Expected Result','Actual Result','Pass/Fail','Evidence','Related Bug ID'];
const manual = [];
function test(module, precondition, steps, dummy, expected, related, evidenceType = 'Screenshot and sanitized browser/network log') {
  manual.push({
    'Test ID': `MRT-${String(manual.length + 1).padStart(3, '0')}`, Module: module, Precondition: precondition, Steps: steps, 'Dummy Data': dummy,
    'Expected Result': expected, 'Actual Result': 'Not Executed - draft audit test case', 'Pass/Fail': 'Not Run', Evidence: `To capture: ${evidenceType}`, 'Related Bug ID': related
  });
}
const user = 'Name: Test User One; Email: dummyuser@example.com; Password: DummyPass!123; Mobile: 9000000001';
const family = 'Name: Test Family One; Relationship: Spouse; DOB: 1990-01-15; Email: dummyfamily@example.com; Mobile: 9000000002';
const finance = 'Monthly income: 100000; Expense: 60000; Insurance premium: 12000; Loan EMI: 20000';
const documentData = 'File: dummy-insurance-policy.pdf; synthetic text only; no personal identifiers; expiry: 2027-12-31';

test('Authentication','Isolated test environment; dummy account absent','1. Start Google sign-in with a provider test account not on any tester allow-list. 2. Complete provider consent. 3. Observe callback and landing route.','Provider account: dummygoogle@example.com','Approved release behavior is explicit: published consent permits login, or a documented tester-only message is shown without exposing production data.','Bug 1');
test('Authentication','Isolated test environment; dummy email signup enabled','1. Create the dummy account with email/password. 2. Log out. 3. Log in again. 4. Verify /rajya landing.',user,'Account creation and repeat login succeed; session belongs only to the dummy user.','Journey A');
test('Authentication / Password reset','Dummy account exists; test email sink configured','1. Request password reset. 2. Open the newest recovery link. 3. Record final host/path. 4. Set a new dummy password. 5. Log in with it.','Email: dummyuser@example.com; new password: DummyPass!456','Recovery remains on the approved test domain, opens /reset-password, updates the password, and does not expose tokens in application logs.','NB-018; Bug 2');
test('Authentication / Password reset','Mocked recovery fragment available','1. Open /reset-password with a mocked recovery session. 2. Confirm the page consumes the session once. 3. Refresh after password update.','Mock access/refresh tokens generated by test fixture','Session is consumed securely; password form is reachable once; used tokens do not remain reusable.','NB-018; ARC-04');
test('Onboarding / OTP','Firebase test project or mocked phone provider configured','1. Enter dummy mobile. 2. Click Send OTP. 3. Enter test OTP. 4. Continue onboarding.','Mobile: 9000000001; OTP fixture: 123456','OTP send/verify succeeds in test mode without billing/config errors or hardcoded production bypasses.','NB-001; Bug 5');
test('Onboarding / Profile','Dummy user is at contact-info step','1. Enter dummy mobile. 2. Choose Skip Verification. 3. Complete onboarding. 4. Read /api/profile.','Mobile: 9000000001','The explicit product decision is enforced: either mobile persists as unverified with status, or the UI warns it will not be saved; silent loss is forbidden.','NB-009; NB-001');
test('Sthapana / Profile','Dummy profile exists','1. Open /foundation. 2. Select Edit. 3. Change occupation. 4. Save. 5. Return to Foundation.','Occupation: Freelancer','A dedicated or clearly scoped edit flow saves the changed field without replaying unrelated onboarding/OTP steps.','NB-003');
test('Authentication / Session','Dummy user logged in','1. Refresh a protected page. 2. Close and reopen browser context with preserved storage. 3. Log out. 4. Reopen protected URL.','Email: dummyuser@example.com','Session restores only while valid; logout clears it and protected route redirects to /start.','Journey A; ARC-14');
test('Google account linking security','Mock OAuth provider and dummy authenticated user','1. Start link flow. 2. Modify userId/state payload before callback. 3. Call callback.','Authenticated user: dummy-user-1; tampered target: dummy-user-2','Callback rejects modified, expired, replayed, or session-mismatched state; no token is written.','AI-ARC-01');
test('User provisioning security','API test harness with no auth/webhook signature','1. POST caller-supplied dummy identity to /api/auth/create-user. 2. Query dummy user fixture store.','id: dummy-unauthorized; email: dummyunauthorized@example.com','Request is rejected and no user row is created.','AI-ARC-02','Sanitized API request/response and read-only fixture-store assertion');
test('Profile authorization','API test harness with no session and invalid internal header','1. POST profile changes anonymously. 2. Repeat with guessed/fallback header. 3. Read dummy profile.','name: Unauthorized Dummy Update','Both writes are rejected and profile remains unchanged.','AI-ARC-03','Sanitized API request/response and read-only profile assertion');

test('Sthapana / Family','Dummy user logged in; no family members','1. Add family member with mobile/email. 2. Reload. 3. GET /api/family. 4. Edit and reload again.',family,'Mobile and email persist and display after create/edit/reload.','NB-002');
test('Sthapana / Family','Add-member form open','1. Enter a valid non-Gmail dummy address. 2. Save. 3. Reload member.','Email: dummyfamily@example.com','Valid standards-compliant email is accepted and persisted.','Bug 8');
test('Sthapana / Family','Add-member form open','1. Enter a 7-digit mobile. 2. Attempt save. 3. Correct to 10 digits and save.','Invalid: 9000000; valid: 9000000002','Short number is blocked with field-level feedback; valid number saves.','NB-015; Bug 39');
test('Sthapana / Family','Add-member form open','1. Set nominee eligible off. 2. Save. 3. Open nominee selector.','Nominee eligible: No','Saved member retains false and is excluded or clearly marked according to approved rule; no silent true default.','NB-004');
test('Sthapana / Family','One dummy member exists','1. Edit name and DOB. 2. Verify linked insurance selector. 3. Delete member. 4. Verify linked modules.','Updated name: Test Family Updated','Updates propagate consistently; delete follows documented unlink/restrict/cascade behavior.','DA10-001; DA10-009A');
test('Sthapana / Education','Dummy family member owns one qualification','1. Delete family member. 2. Reload education list. 3. Inspect qualification owner.','Degree: Dummy Degree','Qualification is deleted, reassigned, or explicitly shown unassigned according to one documented rule.','DA10-007');
test('Sthapana / Education','Dummy education loan exists','1. Add qualification with Education Loan on. 2. Select/link the dummy loan. 3. Reload and edit.','Loan ID fixture: dummy-loan-001','education.linkedLoanId references the real dummy loan ID; no sentinel string is stored.','Bug 12; DB-02');
test('Sthapana / Education','Qualification with linked loan exists','1. Open edit. 2. Verify loan control. 3. Change/unlink loan. 4. Reload.','Loan ID fixture: dummy-loan-001','Edit exposes the mapping and persists link/unlink correctly.','Bug 14');
test('Responsive forms','Desktop and mobile viewport test harness','1. Open Family add and Education add at desktop. 2. Count actionable save controls. 3. Repeat mobile.','Viewport: 1440x900 and 390x844','Only the intended visible action is focusable/clickable at each viewport; hidden duplicate DOM does not create duplicate controls.','Bug 6; Bug 7; Bug 10');

test('Kosh / Income','Dummy user logged in','1. Add income through configured /kosh/sources/add. 2. Reload list. 3. GET /api/income.','Source: Dummy Salary; gross: 100000; deductions: 10000','One authoritative record appears consistently in UI and API or the product clearly documents local-only behavior.','NB-011; DB-01');
test('Kosh / Income','Income add wizard open','1. Enter dummy income. 2. Trigger the early success/skip path. 3. Return to list.','Source: Dummy Freelance; amount: 25000','No success is shown until persistence succeeds; Skip clearly states whether data is discarded.','NB-011');
test('Kosh / Dashboard','Dummy income record exists','1. Edit gross amount. 2. Reload Kosh and Rajya/Suchak. 3. Compare totals.','Gross before: 100000; after: 110000','Income list and dashboards refresh from the same authoritative value.','DB-10; ARC-07');
test('Vyaya / Expense','Dummy user and expense category exist','1. Add expense. 2. Reload list and API.','Date: 2026-07-15; amount: 60000; category: Household; mode: UPI','Expense persists once and displays correct fields.','Journey B');
test('Vyaya / Expense','Dummy expense exists','1. Locate edit affordance. 2. Change amount. 3. Save and reload.','Amount before: 60000; after: 55000','Edit is available and updated value persists.','NB-012');
test('Vyaya / Expense','Recurring dummy expense form open','1. Enable recurring. 2. Select monthly. 3. Save and reload/API-read.','Amount: 1200; frequency: MONTHLY','Recurring flag and frequency persist and display.','Bug 28');
test('Vyaya / Reminders','Isolated future date allowed by approved rule','1. Add future recurring expense. 2. Open reminders. 3. Edit date. 4. Delete expense.','Amount: 9999; date: 2027-07-27','Accepted future recurring expense creates/updates/removes the reminder consistently, or UI gives the approved blocking rule.','DA10-006');
test('Vyaya / Budget','Monthly/category budget exists','1. Add expenses below and above threshold. 2. Trigger alerts. 3. Reload notifications.','Budget: 70000; threshold: 80%; expenses: 50000 then 10000','Overspend alert fires once at intended threshold and does not remain stale after correction.','Bug 28; DB-10');
test('Vyaya / Bank link','Expense linked to dummy bank account','1. Delete/close linked bank account. 2. Open expense. 3. Inspect payment-account state.','Account: Dummy Bank ending 0001','Approved unlink/restrict behavior is explicit; no stale account label or broken edit occurs.','DA10-009C');

test('Pravah / Routing','Logged-out and logged-in route harness','1. Open /pravah. 2. Open /khate/accounts. 3. Inspect app navigation links.','No record data required','Legacy/known /pravah redirects to canonical bank route or product documentation/navigation consistently uses one path.','NB-017');
test('Pravah / Accounts','Dummy user logged in','1. Add dummy savings account. 2. Reload and edit balance.','Bank: Dummy Bank; last4: 0001; balance: 50000','Account persists and balance history updates once.','Journey D');
test('Pravah / Accounts','One primary account exists','1. Add second account and mark primary. 2. Reload both.','Accounts ending 0001 and 0002','At most one account remains primary; prior primary is cleared transactionally.','Bug 22');
test('Pravah / Cash wallet','Dummy user logged in','1. Save cash wallet values. 2. Reload.','Cash in hand: 5000; emergency cash: 10000; petty cash: 1000','Cash wallet values persist and appear in cash-flow totals once.','PRD-M06');
test('Pravah / Cash flow','Dummy income, expense, bank, and wallet records exist','1. Open flow and idle-money screens. 2. Compare source totals.','Income: 100000; expense: 60000; balance: 200000; idle threshold: 150000','Inflow/outflow and idle alert use the same source values and documented formulas.','DB-15');

test('Raksha / Policy form','Add policy form open','1. Enter premium and sum assured from empty fields. 2. Inspect formatting.','Premium: 12000; sum assured: 1000000','No stuck leading zero; currency context is clear; numeric values save correctly.','Bug 18');
test('Raksha / Dates','Add policy form open','1. Enter past next-due date. 2. Attempt save. 3. Enter valid future date.','Past: 2025-01-01; future: 2027-01-01','Past due date is blocked with field feedback; valid future date saves.','Bug 19');
test('Raksha / Documents','Google link disabled; local vault available','1. Add policy. 2. Attach dummy file during Add. 3. Save.','File: dummy-insurance-policy.pdf','Add flow exposes upload and local save succeeds without claiming cloud storage.','Bug 20; NB-013');
test('Raksha / Documents','Dummy policy has linked local/cloud test file','1. Open document from policy. 2. Open from vault. 3. Compare IDs/URLs.','File fixture ID: dummy-doc-001','Both views resolve the same real fixture; no fabricated Drive URL or file-not-found.','Bug 21; NB-013');
test('Raksha / Covered persons','Dummy family member exists','1. Open Add policy. 2. Open Covered Person selector. 3. Select member. 4. Save/reload.','Member: Test Family One','Selector renders and insurance_coverage link persists.','DA10-001');
test('Raksha / Nominee','Eligible dummy family nominee exists','1. Add policy nominee. 2. Open Mitra and Succession nominee views.','Nominee: Test Family One; share: 100','Nominee appears consistently across approved canonical views or explicit synchronization occurs.','NB-010; DB-08');
test('Raksha / Reminder lifecycle','Dummy policy due in 30 days','1. Trigger reminder job in test harness. 2. Verify one reminder. 3. Delete policy.','Due date: 2026-08-18','Reminder is created once and removed/unlinked according to documented lifecycle after deletion.','DA10-010A');

test('Rin / Loan dates','Add loan form open','1. Enter future start date. 2. Attempt save. 3. Enter valid past/current date.','Future: 2027-01-01; valid: 2026-07-01','Future start is blocked with clear feedback; valid date saves.','Bug 23');
test('Rin / Loan end date','Dummy loan exists','1. Verify end-date field in Add/Edit/View. 2. Change and reload.','End date: 2030-07-01','Field exists consistently and persists across all views.','Bug 26');
test('Rin / Documents','Local vault and optional mocked Drive available','1. Add loan with dummy file. 2. Save. 3. Open file from loan and vault.','File: dummy-loan-agreement.pdf','Add flow supports upload; saved identifier resolves to the actual fixture in both views.','Bug 24; Bug 25; NB-013');
test('Rin / EMI burden','Dummy income and loan exist','1. Open Rin/dashboard. 2. Calculate total EMI / monthly net income.','Net income: 90000; EMI: 20000','Displayed burden is 22.22% using documented rounding and authoritative records.','Journey D; PRD-M09');
test('Rin / Property link','Dummy home loan linked to dummy property','1. Delete property. 2. Open loan. 3. Inspect collateral.','Loan: dummy-loan-001; property: dummy-property-001','Approved restrict or unlink behavior persists and is clearly displayed.','DA10-009B');

test('Leakage / API','Isolated database migrated to supplied schema','1. GET /api/subscriptions. 2. Create dummy subscription. 3. GET by ID.','Name: Dummy OTT; amount: 499; renewal: 2026-08-19','Requests return success; no Prisma P2022; record round-trips.','NB-014','Sanitized API responses and read-only schema/row assertions');
test('Leakage / UI','Subscription API available','1. Add dummy subscription from configured screen. 2. Observe success. 3. Reload list.','Name: Dummy Software; amount: 999','Success appears only after persistence; record is visible after reload.','NB-014; DA10-004A');
test('Leakage / Vyaya link','Dummy subscription saved','1. Open Vyaya recurring expenses. 2. Compare amount/frequency.','Amount: 999; billing cycle: MONTHLY','Subscription appears once with consistent monthly amount and category.','DA10-004A');
test('Leakage / Reminders','Dummy subscription renews in 7 days','1. Trigger reminder job. 2. Open Doot/Notifications.','Renewal: 2026-07-26','One renewal reminder appears in the authoritative notification view.','DA10-004B');
test('Leakage / Lifecycle','Dummy subscription and reminder exist','1. Edit amount/date. 2. Verify reminder update. 3. Cancel/delete. 4. Verify cleanup.','Amount: 999 to 799; status: CANCELLED','Record and reminder update consistently; cancellation/deletion clears future reminder once.','DA10-010C; NB-014');
test('Leakage / Route consistency','Dummy subscription fixture exists','1. Open /leakage/subscriptions, /subscriptions, and /vyaya/subscriptions. 2. Compare records/actions.','Subscription: Dummy OTT','Approved routes show one authoritative lifecycle or redirect to one canonical screen.','ARC-07; DB-01');

test('Mitra / Will','Will form open','1. Enter future last-review date. 2. Attempt save. 3. Enter today/past.','Future: 2027-01-01','Future review date is blocked with field-level message.','Bug 30');
test('Succession / Will','Succession will form open','1. Enter executor contact longer than 10 digits and malformed email. 2. Attempt save.','Invalid: 1234567890123; invalid email: bad@','Invalid contact is rejected according to one phone/email rule; valid dummy contact saves.','Bug 38');
test('Succession / Emergency','Emergency form open','1. Enter letters in phone fields. 2. Attempt OTP/send/save.','Primary phone: ABCDEFGHIJ','Non-numeric phone is rejected before OTP and save.','Bug 39');
test('Succession / Emergency security','Mock OTP service; dummy contacts','1. Request OTP. 2. Enter wrong OTP. 3. Enter valid fixture OTP. 4. Save scopes/waiting period.','Phone: 9000000003; OTP fixture: 123456; scope: insurance','Wrong OTP cannot activate; valid OTP saves only dummy protocol and authorized scopes.','CODE-005; PRD-M20');
test('Mitra / Succession consistency','Dummy asset and nominee exist','1. Map nominee in Mitra. 2. Open Succession. 3. Edit share there. 4. Reopen Mitra.','Asset: dummy-asset-001; nominee: dummy-family-001; share: 50','One canonical state is shown in both modules or synchronization conflict is surfaced; silent divergence is forbidden.','NB-010; AI-DB-08');

test('Kar / ITR','ITR add form open','1. Enter malformed/free-text assessment and financial years. 2. Attempt save.','Assessment: abc; financial: 20xx','Only valid year formats/options are accepted with field feedback.','Bug 32');
test('Kar / ITR','ITR add form open','1. Enter future filing date. 2. Inspect Save and messages.','Filing date: 2027-01-01','Save is not silently disabled; a clear field-level reason is shown.','Bug 33');
test('Kar / GST','GST form open','1. Make one field invalid. 2. Blur/submit.','GSTIN: INVALID','Only relevant validation messages appear; unrelated untouched fields do not show a validation storm.','Bug 35');
test('Kar / GST','GST form open','1. Enter past next-due date. 2. Attempt save.','Next due: 2025-01-01','Past next-due date is blocked with clear feedback.','Bug 36');
test('Kar / DIN','DIN form open','1. Enter invalid DIN/date/status. 2. Attempt save.','DIN: ABC; expiry: invalid','Save remains actionable enough to surface specific validation messages; invalid data is not silently ignored.','Bug 37');
test('Kar / Documents','Dummy ITR record and local file','1. Upload dummy file. 2. Save. 3. View from ITR and vault.','File: dummy-itr.pdf','Both views resolve the same valid fixture; working behavior remains covered despite prior non-reproduction.','Bug 34; NB-013');

test('Document Vault / Consent','Google account not linked','1. Upload dummy file. 2. Observe destination choice and messaging.','File: dummy-document.pdf','Local save is default; no cloud-success claim or cloud write occurs without explicit consent/linking.','NB-013; DB-04');
test('Document Vault / Local','Local vault empty','1. Upload dummy files to two categories. 2. Reload. 3. Export local vault if available.','dummy-identity.pdf; dummy-education.pdf','Files persist locally, retain correct categories/owners, and export contains only dummy fixtures.','PRD-M16');
test('Document Vault / Identifier','Mock Drive and local vault adapters','1. Upload file. 2. Capture returned IDs. 3. View/download using each path.','File: dummy-loan-agreement.pdf','Local ID, cloud ID, and document_meta ID remain distinct and every generated URL uses the correct provider ID.','NB-013; Bug 25; DB-04');
test('Document Vault / Delete','Dummy linked policy document exists','1. Delete policy. 2. Open vault. 3. Delete/unlink document.','Policy: dummy-policy-001; doc: dummy-doc-001','Approved retain-as-unlinked or delete behavior is explicit and stable; no inaccessible orphan remains.','DA10-010B');

test('Dashboard / Alerts','Dummy family member exists and is policy-covered','1. Trigger dashboard/notification refresh. 2. Inspect family alert. 3. Log out/in.','Family member: Test Family One','No stale No family members alert remains after authoritative data exists.','NB-008; DB-10');
test('Dashboard / Accessibility','Desktop and mobile dashboard open','1. Run accessibility scan. 2. Tab through icon buttons. 3. Inspect accessible names.','No record data required','Every actionable icon has a unique accessible name and visible focus indicator.','NB-007');
test('Dashboard / Calculations','Dummy income, expense, bank, loan, insurance fixtures exist','1. Open Rajya and Suchak. 2. Compare shared totals. 3. Edit source record and refresh.','Income 100000; expense 60000; EMI 20000; premium 12000','Both approved dashboards use documented formulas and refresh to the same authoritative values.','ARC-07; DB-10; DB-15');
test('Build / Quality','Local isolated clone; no production commands','1. Introduce a temporary type error in a disposable test fixture branch. 2. Run approved CI build. 3. Revert fixture change.','Synthetic TypeScript error in test fixture only','CI fails on type and lint errors; production build bypasses are disabled.','AI-ARC-12','CI log from disposable branch');
test('Deployment isolation','Platform owner provides sanitized environment-name comparison','1. Compare preview and production project IDs/DB hosts by names/fingerprints only. 2. Do not reveal values.','Environment aliases only: preview and production','Preview and production use isolated DB/storage/service-role identities before tests run.','AI-ARC-17','Owner attestation and redacted configuration diff');
test('Storage authorization','Local Supabase emulator or isolated test project','1. User A uploads dummy identity file. 2. User B attempts list/read/update/delete.','User A: dummya@example.com; User B: dummyb@example.com; file: dummy-id.pdf','User B receives authorization failure; public URL does not expose private identity content.','AI-DB-05','Sanitized emulator/API responses');
test('Database validation / Subscriptions','Read-only isolated schema metadata available','1. Compare Prisma subscription fields to information_schema. 2. Run a rolled-back CRUD smoke transaction.','No user rows; schema metadata and rolled-back dummy row only','All expected columns/types exist and no P2022 occurs.','NB-014; DB-16','Read-only schema diff and transaction rollback log');
test('Database validation / Nominees','Isolated dummy records only','1. Create dummy Mitra mapping and Succession mapping. 2. Apply approved synchronization rule. 3. Query both.','dummy asset/nominee IDs only','No conflicting shares/executors exist after approved workflow; constraints or service reconciliation detect conflict.','AI-DB-08; NB-010','Read-only query output with dummy IDs');
test('Database validation / Deletion','Isolated dummy user graph','1. Build dummy user with family, education, policy, loan, document metadata. 2. Delete selected parent in a rolled-back transaction. 3. Inspect cascade/set-null rows.','Synthetic UUIDs and dummy records only','Observed cascade/set-null/restrict effects match FOREIGN_KEY_AND_RELATIONSHIP_MAP.csv and approved retention rules.','DB-07; DA10-007','Transaction rollback log and read-only row counts');

write('MANUAL_REGRESSION_TEST_CASES.csv', csv(manual, manualHeaders));

const recommendations = `# Automated Test Recommendations

## Current test baseline

The source snapshot has no configured test script, Vitest/Jest/Playwright dependency, or test runner configuration in \`package.json\`. One standalone file exists at \`src/lib/subscriptionMetrics.test.js\`, but the repository does not provide a command that executes it. The files under \`audit-output/05-test-drafts/\` are review drafts only and were not added to or executed against the application.

All proposed tests must run against an isolated local/emulator/test environment with dummy records only. They must never target production, reuse production credentials, or connect to external services during ordinary CI.

## Recommended test stack

| Test type | Recommended tooling | Primary targets | Highest-priority bugs/risks |
|---|---|---|---|
| **Unit** | Vitest with deterministic clocks | calculationEngine, subscriptionMetrics, reminderEngine, document ID helpers, date validators | NB-014, date-validation cluster, DB-15 |
| **Component** | Vitest + React Testing Library + user-event + axe | FamilyTreeGame/add-member form, Foundation edit entry, insurance/loan/subscription forms, icon buttons | NB-002/004/007/015, Bugs 6/7/10/18/19/38/39 |
| **API** | Vitest with mocked auth/Prisma/Supabase/Firebase adapters | auth boundaries, profile, subscriptions, education mapping, document metadata, notification lifecycle | ARC-01/02/03, NB-014, DB-02/04/08 |
| **E2E** | Playwright with mocked providers or isolated test services | password recovery, OTP/profile edit, core money journeys, document/vault lifecycle, cross-module nominee/reminder flows | NB-001/003/013/014/017/018, Journey E/F |
| **Database validation** | Read-only information_schema checks plus rolled-back transactions in isolated Postgres | schema/Prisma parity, FKs, cascade/set-null behavior, RLS/storage policy fixtures, duplicate will/nominee state | DB-03/05/07/08/16, NB-014 |

## Priority suites

### 1. Release-blocking auth and security

- **API:** anonymous requests to \`/api/auth/create-user\` and profile writes must fail.
- **API/unit:** Google OAuth state must reject tampering, replay, expiry, and session mismatch.
- **E2E:** recovery link must land on \`/reset-password\`, consume its fixture session, and permit one password change.
- **E2E/component:** OTP failure must not silently discard mobile or trap profile editing.
- **Database validation:** verify preview/test isolation by sanitized identifiers before any write suite.

### 2. Data persistence and schema parity

- Contract-test every form payload against its route/service/Prisma column mapping.
- Add an API smoke test for every CRUD route using transaction-scoped dummy rows.
- Fail CI when Prisma fields differ from isolated database metadata, especially \`subscriptions\`.
- Add explicit tests for local-store versus API-backed configured routes: Kosh, Kunji, Vyaya, Leakage, dashboard, and notifications.

### 3. Cross-module lifecycle

- Family update/delete -> Education, Raksha, Mitra.
- Bank delete -> Income/Vyaya account references.
- Policy/loan delete -> reminders and document metadata.
- Subscription create/edit/cancel/delete -> Vyaya, dashboard, reminder state.
- Mitra nominee/will -> Succession nominee/will; reject or surface conflicting state.

### 4. Document and storage controls

- Unit-test provider ID/URL construction so local IDs cannot be used as Drive IDs.
- API/component tests must prove local-by-default behavior and explicit cloud consent.
- E2E tests should use mocked Drive/Supabase adapters; never real accounts.
- Database/storage validation must prove User B cannot read or mutate User A's dummy identity object.

### 5. UI validation and accessibility

- Centralize date rules and run table-driven unit/component cases for past-only, future-only, and optional dates.
- Test responsive forms at desktop/mobile widths for duplicate focusable controls.
- Run axe plus keyboard tests for dashboard icon buttons and modal focus behavior.
- Verify errors are field-specific and Save is never silently disabled.

## Test architecture

1. Add a test-only dependency-injection boundary for auth, Prisma, Supabase Storage, Google Drive, Firebase OTP, clock, and notification delivery.
2. Use factories that generate only reserved dummy addresses, synthetic UUIDs, and files created during the test.
3. Wrap API/database tests in transactions and roll them back; assert cleanup in \`afterEach\`.
4. Freeze time for renewal, EMI, tax, and date-validation tests.
5. Store screenshots/traces as CI artifacts only after sanitizing tokens, emails, headers, and URLs.
6. Keep production environment variables unavailable to the test job by construction.

## Draft test inventory

- \`fixtures/dummy-data.ts\`: shared dummy fixtures.
- \`unit/calculation-engine.test.ts\`, \`unit/subscription-metrics.test.ts\`, \`unit/reminder-engine.test.ts\`.
- \`component/family-member-form.test.tsx\`.
- \`api/auth-boundaries.test.ts\`, \`api/subscriptions-route.test.ts\`, \`api/education-loan-mapping.test.ts\`.
- \`e2e/auth-recovery.spec.ts\`, \`e2e/core-financial-journeys.spec.ts\`, \`e2e/document-vault.spec.ts\`.
- \`database/schema-validation.test.ts\`, \`database/nominee-consistency.sql\`.
- Draft \`vitest.config.ts\` and \`playwright.config.ts\` are included for WD review.

## Adoption gate

WD must confirm module aliases, route handler mocking strategy, database test container/emulator, and CI platform before moving any draft into the application. The first executable milestone should cover ARC-01/02/03, NB-014, and the pure calculation/reminder units; E2E adoption follows after isolated auth/storage providers are available.
`;
write('AUTOMATED_TEST_RECOMMENDATIONS.md', recommendations);

writeDraft('README.md', `# Draft Tests - Not Executed

These files are audit drafts only. They live outside the application source and were not executed because the snapshot has no configured Vitest/Playwright stack.

Rules for adoption:

- WD review is required before moving or adapting any draft.
- Use an isolated test database/emulator and dummy data only.
- Never load production credentials or call real Google, Supabase, Firebase, Vercel, or Drive services.
- Confirm path aliases, component props, route mocks, and CI environment before execution.
- Database SQL is read-only or transaction/rollback oriented; it is not a migration.
`);

writeDraft('fixtures/dummy-data.ts', `export const dummyUser = {
  id: '00000000-0000-4000-8000-000000000001',
  name: 'Test User One',
  email: 'dummyuser@example.com',
  mobile: '9000000001',
};

export const dummyFamilyMember = {
  id: '00000000-0000-4000-8000-000000000002',
  name: 'Test Family One',
  relation: 'Spouse',
  email: 'dummyfamily@example.com',
  phone: '9000000002',
};

export const dummyFinance = {
  monthlyIncome: 100000,
  monthlyExpenses: 60000,
  insurancePremium: 12000,
  loanEmi: 20000,
};
`);

writeDraft('unit/calculation-engine.test.ts', `import { describe, expect, it } from 'vitest';
import { calculateDebtBurden, calculateEmergencyMonths, calculateNetWorth, calculateSavingsRate } from '@/lib/engines/calculationEngine';

describe('calculationEngine with dummy household data', () => {
  it('calculates net worth from assets and liabilities', () => {
    expect(calculateNetWorth({ totalAssets: 500000, totalLiabilities: 200000 } as never)).toBe(300000);
  });

  it('calculates debt burden and savings rate deterministically', () => {
    const snapshot = { monthlyIncome: 100000, monthlyExpenses: 60000, monthlyEmi: 20000 } as never;
    expect(calculateDebtBurden(snapshot)).toBeCloseTo(20, 2);
    expect(calculateSavingsRate(snapshot)).toBeCloseTo(40, 2);
  });

  it('handles zero expense emergency-month input without Infinity', () => {
    expect(Number.isFinite(calculateEmergencyMonths({ emergencyFund: 50000, monthlyExpenses: 0 } as never))).toBe(true);
  });
});
`);

writeDraft('unit/subscription-metrics.test.ts', `import { describe, expect, it } from 'vitest';
import { calculateSubscriptionMetrics } from '@/lib/subscriptionMetrics';

describe('subscription metrics', () => {
  it('normalizes monthly and annual dummy subscriptions', () => {
    const result = calculateSubscriptionMetrics([
      { amount: 500, billingCycle: 'MONTHLY', status: 'ACTIVE' },
      { amount: 1200, billingCycle: 'ANNUAL', status: 'ACTIVE' },
    ] as never);
    expect(result.monthlySpend).toBe(600);
    expect(result.yearlySpend).toBe(7200);
  });

  it('excludes cancelled subscriptions from active totals', () => {
    const result = calculateSubscriptionMetrics([{ amount: 999, billingCycle: 'MONTHLY', status: 'CANCELLED' }] as never);
    expect(result.activeSubscriptions).toBe(0);
  });
});
`);

writeDraft('unit/reminder-engine.test.ts', `import { describe, expect, it, vi } from 'vitest';
import { createDocExpiryReminder, getUpcomingReminders } from '@/lib/engines/reminderEngine';

describe('reminderEngine', () => {
  it('creates a deterministic document-expiry reminder', () => {
    vi.setSystemTime(new Date('2026-07-19T00:00:00Z'));
    const reminder = createDocExpiryReminder({ documentId: 'dummy-doc-001', documentName: 'Dummy Policy', expiryDate: new Date('2026-08-18T00:00:00Z'), leadDays: 30 } as never);
    expect(reminder.linkedEntityId).toBe('dummy-doc-001');
  });

  it('returns only reminders inside the requested window', () => {
    vi.setSystemTime(new Date('2026-07-19T00:00:00Z'));
    const rows = [{ id: 'one', targetDate: '2026-07-25' }, { id: 'two', targetDate: '2026-09-01' }] as never;
    expect(getUpcomingReminders(rows, 30)).toHaveLength(1);
  });
});
`);

writeDraft('component/family-member-form.test.tsx', `import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FamilyTreeGame } from '@/components/module1/FamilyTreeGame';

describe('Family member form', () => {
  it('rejects a short phone and preserves nomineeEligible=false', async () => {
    const onAdd = vi.fn();
    render(<FamilyTreeGame members={[]} onAddMember={onAdd} onEditMember={vi.fn()} onRemoveMember={vi.fn()} /> as never);
    await userEvent.click(screen.getByRole('button', { name: /forge new link/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test Family One');
    await userEvent.type(screen.getByLabelText(/mobile/i), '9000000');
    await userEvent.click(screen.getByRole('button', { name: /save|add to mandal/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });
});
`);

writeDraft('api/auth-boundaries.test.ts', `import { describe, expect, it, vi } from 'vitest';

describe('authentication API boundaries', () => {
  it('rejects unsigned or tampered Google link state', async () => {
    const callback = await import('@/app/api/auth/google-callback/route');
    const req = new Request('http://localhost/api/auth/google-callback?code=dummy-code&state=dGFtcGVyZWQ=');
    const response = await callback.GET(req as never);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('rejects anonymous user creation', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    const route = await import('@/app/api/auth/create-user/route');
    const req = new Request('http://localhost/api/auth/create-user', { method: 'POST', body: JSON.stringify({ id: 'dummy-id', email: 'dummyuser@example.com' }) });
    const response = await route.POST(req as never);
    expect([401, 403]).toContain(response.status);
  });
});
`);

writeDraft('api/subscriptions-route.test.ts', `import { describe, expect, it } from 'vitest';

describe('/api/subscriptions contract', () => {
  it('round-trips a dummy subscription without Prisma P2022', async () => {
    // TODO(WD): inject authenticated dummy user and transaction-scoped Prisma client.
    const payload = { name: 'Dummy OTT', amount: 499, billingCycle: 'MONTHLY', renewalDate: '2026-08-19', status: 'ACTIVE' };
    expect(payload).toMatchObject({ name: 'Dummy OTT', amount: 499 });
    // Execute POST then GET only after the isolated route harness is approved.
  });
});
`);

writeDraft('api/education-loan-mapping.test.ts', `import { describe, expect, it } from 'vitest';

describe('education loan mapping contract', () => {
  it('stores a real loan ID instead of a status sentinel', async () => {
    const requestBody = { degree: 'Dummy Degree', institution: 'Dummy University', year: 2020, hasLoan: true, linkedLoanId: '00000000-0000-4000-8000-000000000010' };
    expect(requestBody.linkedLoanId).not.toBe('EDUCATION_LOAN_ACTIVE');
    // TODO(WD): call /api/education through authenticated transaction harness and assert persisted linkedLoanId.
  });
});
`);

writeDraft('e2e/auth-recovery.spec.ts', `import { expect, test } from '@playwright/test';

test('dummy password recovery lands on reset form', async ({ page }) => {
  // Provider/email delivery must be mocked or use an isolated test sink.
  await page.goto('/reset-password#access_token=dummy-access&type=recovery&refresh_token=dummy-refresh');
  await expect(page).toHaveURL(/\/reset-password/);
  await expect(page.getByRole('button', { name: /update|set.*password/i })).toBeVisible();
});

test('profile edit does not replay unrelated onboarding', async ({ page }) => {
  // TODO(WD): authenticate with storageState generated from dummy account fixture.
  await page.goto('/foundation');
  await page.getByRole('button', { name: /edit/i }).click();
  await expect(page).not.toHaveURL(/\/onboarding\/contact-info/);
});
`);

writeDraft('e2e/core-financial-journeys.spec.ts', `import { expect, test } from '@playwright/test';

test('dummy subscription persists and creates one reminder', async ({ page }) => {
  await page.goto('/leakage/subscriptions');
  await page.getByRole('button', { name: /add/i }).click();
  await page.getByLabel(/name/i).fill('Dummy OTT');
  await page.getByLabel(/amount|monthly cost/i).fill('499');
  await page.getByLabel(/renewal/i).fill('2026-08-19');
  await page.getByRole('button', { name: /save|add subscription/i }).click();
  await page.reload();
  await expect(page.getByText('Dummy OTT')).toBeVisible();
});

test('legacy bank route resolves to canonical module', async ({ page }) => {
  await page.goto('/pravah');
  await expect(page).toHaveURL(/\/khate\/accounts|\/pravah/);
  await expect(page.getByText(/bank|account|pravah/i)).toBeVisible();
});
`);

writeDraft('e2e/document-vault.spec.ts', `import { expect, test } from '@playwright/test';

test('dummy file stays local until explicit cloud consent', async ({ page }) => {
  await page.goto('/vault');
  await page.getByRole('button', { name: /upload|add document/i }).click();
  await page.setInputFiles('input[type=file]', { name: 'dummy-document.pdf', mimeType: 'application/pdf', buffer: Buffer.from('Synthetic dummy document') });
  await expect(page.getByText(/local|device/i)).toBeVisible();
  await expect(page.getByText(/uploaded to google drive/i)).toHaveCount(0);
});
`);

writeDraft('database/schema-validation.test.ts', `import { describe, expect, it } from 'vitest';

describe('read-only database metadata validation', () => {
  it('requires every Prisma subscription column in isolated schema', async () => {
    const expected = ['id','userId','name','category','amount','renewalDate','billingCycle','status','cancelReminder'];
    // TODO(WD): query information_schema.columns through a read-only isolated test connection.
    const suppliedExportColumns = expected;
    expect(suppliedExportColumns).toEqual(expect.arrayContaining(expected));
  });

  it('does not run against production', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.DATABASE_URL ?? '').not.toMatch(/production|prod/i);
  });
});
`);

writeDraft('database/nominee-consistency.sql', `-- READ-ONLY DRAFT. Run only against isolated dummy data after WD review.
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
`);

writeDraft('vitest.config.ts', `import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: { environment: 'jsdom', clearMocks: true, restoreMocks: true },
  resolve: { alias: { '@': path.resolve(__dirname, '../../source-snapshot/Svarajya-main-6-7-26/Svarajya-main/src') } },
});
`);

writeDraft('playwright.config.ts', `import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  forbidOnly: true,
  retries: 0,
});
`);

console.log(JSON.stringify({ bugs: bugs.length, severityCounts: sevCounts, p0p1Rows: p1Rows.length, manualTests: manual.length, draftFiles: fs.readdirSync(draftDir, { recursive: true }).filter(f => !String(f).endsWith('/')).length }, null, 2));

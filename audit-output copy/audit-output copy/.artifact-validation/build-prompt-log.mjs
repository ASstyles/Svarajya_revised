import fs from 'node:fs/promises';
import { Workbook } from '@oai/artifact-tool';

const headers = [
  'Date',
  'Intern Name',
  'Tool Used',
  'Prompt Purpose',
  'Input Files',
  'Output Files',
  'Code Modified: Yes/No',
  'External Connection Used: Yes/No',
  'Verified By',
  'Status',
];

const rows = [
  [
    '2026-07-19',
    'AI Intern 1 - Codebase & Architecture Lead',
    'Codex (local workspace)',
    'Inspect the audit workspace and document safety controls, secret indicators, production-data indicators, external-connection requirements, and required input folders.',
    'Svarajya-Codex-Audit/; source-snapshot/; audit-input/',
    'audit-output/AUDIT_WORKSPACE_SAFETY_CHECKLIST.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'All AI Interns',
    'Codex (local workspace)',
    'Create the master AI audit output plan from the AI Team Task Plan and AI Team Deliverables Master.',
    'audit-input/00-project-context/2026-07-19_AI_TEAM_TASK_PLAN.pdf; audit-input/00-project-context/2026-07-19_AI_TEAM_DELIVERABLES_MASTER.csv',
    'audit-output/AI_AUDIT_OUTPUT_PLAN.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Intern 1 - Codebase & Architecture Lead',
    'Codex (local workspace)',
    'Generate repository inventory, module/file mapping, shared-service mapping, Supabase code usage, Google authentication flow, and architecture/coupling risks.',
    'source-snapshot/; audit-input/00-project-context/; audit-input/02-existing-team-outputs/; audit-input/04-live-and-deployment-context/',
    'audit-output/01-repository-and-architecture/REPOSITORY_INVENTORY.md; audit-output/01-repository-and-architecture/MODULE_TO_FILE_MAP.csv; audit-output/01-repository-and-architecture/SHARED_COMPONENT_AND_SERVICE_MAP.csv; audit-output/01-repository-and-architecture/SUPABASE_CODE_USAGE_MAP.csv; audit-output/01-repository-and-architecture/GOOGLE_AUTH_CODE_FLOW.md; audit-output/01-repository-and-architecture/ARCHITECTURE_AND_COUPLING_RISKS.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Intern 2 - Data Dependency Lead',
    'Codex (local workspace)',
    'Generate database structure, relationship, frontend-field, dependency, and data-integrity audit outputs.',
    'audit-input/01-database-structure/; audit-input/02-existing-team-outputs/; source-snapshot/; audit-output/01-repository-and-architecture/',
    'audit-output/02-database-and-dependencies/DATABASE_STRUCTURE_SUMMARY.md; audit-output/02-database-and-dependencies/DATABASE_TABLE_INVENTORY.csv; audit-output/02-database-and-dependencies/FOREIGN_KEY_AND_RELATIONSHIP_MAP.csv; audit-output/02-database-and-dependencies/FRONTEND_DATABASE_FIELD_MAP.csv; audit-output/02-database-and-dependencies/MODULE_DEPENDENCY_MATRIX.csv; audit-output/02-database-and-dependencies/DATA_CONSISTENCY_AND_INTEGRITY_RISKS.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Intern 2 - Data Dependency Lead',
    'Codex (local workspace)',
    'Compare PRD requirements with implementation evidence and record unresolved mismatches.',
    'audit-input/00-project-context/ PRD files; source-snapshot/; audit-output/01-repository-and-architecture/; audit-output/02-database-and-dependencies/; audit-input/02-existing-team-outputs/ PM, DA, and WD outputs',
    'audit-output/03-prd-traceability/PRD_IMPLEMENTATION_TRACEABILITY.csv',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Intern 3 - Bug, QA & Handover Lead',
    'Codex (local workspace)',
    'Consolidate bugs, assess P0/P1 journey impact, draft manual regression cases, recommend automated coverage, and create isolated test drafts.',
    'audit-input/03-bug-and-evidence/; audit-input/02-existing-team-outputs/; audit-output/01-repository-and-architecture/; audit-output/02-database-and-dependencies/; audit-output/03-prd-traceability/',
    'audit-output/04-bugs-and-qa/CONSOLIDATED_BUG_CROSS_REFERENCE.csv; audit-output/04-bugs-and-qa/P0_P1_BUG_IMPACT_REPORT.md; audit-output/04-bugs-and-qa/MANUAL_REGRESSION_TEST_CASES.csv; audit-output/04-bugs-and-qa/AUTOMATED_TEST_RECOMMENDATIONS.md; audit-output/05-test-drafts/',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Intern 3 - Bug, QA & Handover Lead',
    'Codex (local workspace)',
    'Prepare final engineer handover, executive technical summary, recommended fix sequence, and final audit pack status while preserving pending verification.',
    'All files in audit-output/; no Himanshu or Harsh verification evidence found',
    'audit-output/06-final-handover/ENGINEER_HANDOVER_INDEX.md; audit-output/06-final-handover/EXECUTIVE_TECHNICAL_SUMMARY.md; audit-output/06-final-handover/RECOMMENDED_FIX_SEQUENCE.md; audit-output/06-final-handover/FINAL_AI_AUDIT_PACK_STATUS.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
  [
    '2026-07-19',
    'AI Team Lead / Quality Review',
    'Codex (local workspace)',
    'Review every audit output for completeness, naming, evidence, confidence, data safety, verification state, handover readiness, and missing files.',
    'All files in audit-output/',
    'audit-output/FINAL_QUALITY_CHECK_REPORT.md; synchronized audit-output/AI_PROMPT_AND_OUTPUT_LOG.csv; audit-output/06-final-handover/ENGINEER_HANDOVER_INDEX.md; audit-output/06-final-handover/FINAL_AI_AUDIT_PACK_STATUS.md',
    'No',
    'No',
    'Pending WD Verification',
    'Needs Verification',
  ],
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add('AI Prompt and Output Log');
sheet.getRangeByIndexes(0, 0, rows.length + 1, headers.length).values = [headers, ...rows];

const inspection = await workbook.inspect({
  kind: 'table',
  range: `AI Prompt and Output Log!A1:J${rows.length + 1}`,
  include: 'values',
  tableMaxRows: rows.length + 1,
  tableMaxCols: headers.length,
  maxChars: 2000,
});

const preview = await workbook.render({
  sheetName: 'AI Prompt and Output Log',
  range: `A1:J${rows.length + 1}`,
  scale: 1,
  format: 'png',
});
await fs.writeFile(new URL('./AI_PROMPT_AND_OUTPUT_LOG.csv.png', import.meta.url), new Uint8Array(await preview.arrayBuffer()));

const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
await fs.writeFile(new URL('../AI_PROMPT_AND_OUTPUT_LOG.csv', import.meta.url), csv, 'utf8');

console.log(JSON.stringify({ rows: rows.length, inspection: inspection.ndjson.slice(0, 300) }));

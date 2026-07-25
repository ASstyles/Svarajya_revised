import fs from 'node:fs/promises';
import { Workbook } from '@oai/artifact-tool';

const targets = [
  ['CONSOLIDATED_BUG_CROSS_REFERENCE.csv', '../04-bugs-and-qa/CONSOLIDATED_BUG_CROSS_REFERENCE.csv', 'A1:X8'],
  ['MANUAL_REGRESSION_TEST_CASES.csv', '../04-bugs-and-qa/MANUAL_REGRESSION_TEST_CASES.csv', 'A1:J8'],
];

for (const [name, path, range] of targets) {
  const csv = await fs.readFile(new URL(path, import.meta.url), 'utf8');
  const workbook = await Workbook.fromCSV(csv, { sheetName: 'Audit Data' });
  const inspection = await workbook.inspect({
    kind: 'table',
    range: `Audit Data!${range}`,
    include: 'values',
    tableMaxRows: 8,
    tableMaxCols: 24,
    maxChars: 3000,
  });
  const preview = await workbook.render({
    sheetName: 'Audit Data',
    range,
    scale: 1,
    format: 'png',
  });
  await fs.writeFile(new URL(`./${name}.png`, import.meta.url), new Uint8Array(await preview.arrayBuffer()));
  console.log(JSON.stringify({ name, inspection: inspection.ndjson.slice(0, 300) }));
}

const allCsvPaths = [
  '../01-repository-and-architecture/MODULE_TO_FILE_MAP.csv',
  '../01-repository-and-architecture/SHARED_COMPONENT_AND_SERVICE_MAP.csv',
  '../01-repository-and-architecture/SUPABASE_CODE_USAGE_MAP.csv',
  '../02-database-and-dependencies/DATABASE_TABLE_INVENTORY.csv',
  '../02-database-and-dependencies/FOREIGN_KEY_AND_RELATIONSHIP_MAP.csv',
  '../02-database-and-dependencies/FRONTEND_DATABASE_FIELD_MAP.csv',
  '../02-database-and-dependencies/MODULE_DEPENDENCY_MATRIX.csv',
  '../03-prd-traceability/PRD_IMPLEMENTATION_TRACEABILITY.csv',
  '../04-bugs-and-qa/CONSOLIDATED_BUG_CROSS_REFERENCE.csv',
  '../04-bugs-and-qa/MANUAL_REGRESSION_TEST_CASES.csv',
  '../AI_PROMPT_AND_OUTPUT_LOG.csv',
];

for (const path of allCsvPaths) {
  const csv = await fs.readFile(new URL(path, import.meta.url), 'utf8');
  const workbook = await Workbook.fromCSV(csv, { sheetName: 'Validation' });
  const inspection = await workbook.inspect({
    kind: 'region',
    sheetId: 'Validation',
    range: 'A1:B3',
    maxChars: 300,
  });
  console.log(JSON.stringify({ path, parsed: Boolean(inspection.ndjson) }));
}

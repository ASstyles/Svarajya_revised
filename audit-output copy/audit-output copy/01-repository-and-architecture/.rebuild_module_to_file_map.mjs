import fs from "node:fs/promises";
import path from "node:path";
import { Workbook } from "@oai/artifact-tool";

const auditRoot = "/Users/amitkothari/Documents/New project/Svarajya-Codex-Audit";
const sourceRoot = path.join(
  auditRoot,
  "source-snapshot/Svarajya-main-6-7-26/Svarajya-main",
);
const sourceDir = path.join(sourceRoot, "src");
const appDir = path.join(sourceDir, "app");
const outputDir = path.join(
  auditRoot,
  "audit-output/01-repository-and-architecture",
);

const input = {
  currentMap: path.join(
    outputDir,
    "MODULE_TO_FILE_MAP_2026-07-20_PRE_30_COLUMN_REBUILD_DRAFT.csv",
  ),
  supabaseMap: path.join(outputDir, "SUPABASE_CODE_USAGE_MAP.csv"),
  dbInventory: path.join(
    auditRoot,
    "audit-output/02-database-and-dependencies/DATABASE_TABLE_INVENTORY.csv",
  ),
  fieldMap: path.join(
    auditRoot,
    "audit-output/02-database-and-dependencies/FRONTEND_DATABASE_FIELD_MAP.csv",
  ),
  dependencyMatrix: path.join(
    auditRoot,
    "audit-output/02-database-and-dependencies/MODULE_DEPENDENCY_MATRIX.csv",
  ),
  crudTrace: path.join(
    auditRoot,
    "audit-input/02-existing-team-outputs/2026-07-19_MODULE_CRUD_TRACE.csv",
  ),
  pmModules: path.join(
    auditRoot,
    "audit-input/02-existing-team-outputs/PM_MODULE_INVENTORY.csv",
  ),
  pmScreens: path.join(
    auditRoot,
    "audit-input/02-existing-team-outputs/PM_SCREEN_INVENTORY.csv",
  ),
  prdTrace: path.join(
    auditRoot,
    "audit-output/03-prd-traceability/PRD_IMPLEMENTATION_TRACEABILITY.csv",
  ),
};

const output = {
  map: path.join(outputDir, "MODULE_TO_FILE_MAP.csv"),
  routeInventory: path.join(outputDir, "RAW_ROUTE_INVENTORY.csv"),
  gaps: path.join(outputDir, "MODULE_TO_FILE_MAP_GAPS.md"),
  validation: path.join(outputDir, "MODULE_TO_FILE_MAP_VALIDATION.md"),
};

const supportingDocuments = {
  repositoryInventory: path.join(outputDir, "REPOSITORY_INVENTORY.md"),
  authFlow: path.join(outputDir, "GOOGLE_AUTH_CODE_FLOW.md"),
  architectureRisks: path.join(outputDir, "ARCHITECTURE_AND_COUPLING_RISKS.md"),
  databaseTypes: path.join(auditRoot, "audit-input/01-database-structure/database.types.ts"),
  schemaSql: path.join(auditRoot, "audit-input/01-database-structure/schema.sql"),
};

const moduleMapHeaders = [
  "Module",
  "Module Status",
  "Route",
  "Page File",
  "Layout File",
  "Main Form Component",
  "Main Display/List Component",
  "Other Components",
  "Hook / Store",
  "Context Provider",
  "API Route",
  "Service File",
  "Supabase Client File",
  "Supabase Query Evidence",
  "Tables Referenced",
  "Fields Read / Written",
  "Utility Functions",
  "Validation Files",
  "Calculation Files",
  "Document Upload Connection",
  "Reminder Connection",
  "Dashboard Connection",
  "Auth / Protected Route Connection",
  "Shared Components",
  "Related Modules",
  "Duplicate / Old / Deprecated File Risk",
  "Evidence / Code Reference",
  "Confidence",
  "Needs WD Verification",
  "Notes",
];

const routeInventoryHeaders = [
  "Route",
  "Route Group",
  "Page File",
  "Layout File",
  "Default Component",
  "Module Association",
  "Direct Local Imports",
  "Transitive Source Files",
  "API Route Literals",
  "Matched API Route Files",
  "Hooks / Stores / Contexts",
  "Services",
  "Database Tables",
  "Fields Read / Written",
  "Supabase Evidence",
  "Form Evidence",
  "Display Evidence",
  "Navigation Reference Count",
  "Module Status",
  "Duplicate / Old Risk",
  "Confidence",
  "Needs WD Verification",
  "Evidence",
];

const moduleDefinitions = [
  { prefix: "/foundation", name: "Sthapana / Foundation", configured: true, implemented: true },
  { prefix: "/pehchaan", name: "Pehchaan / Identity Vault", configured: true, implemented: true },
  { prefix: "/dwaar", name: "Kunji / Dwaar Credentials", configured: true, implemented: true },
  { prefix: "/kosh", name: "Kosh / Income", configured: true, implemented: true },
  { prefix: "/vyaya", name: "Vyaya / Expenses", configured: true, implemented: true },
  { prefix: "/khate", name: "Pravah / Khate Bank Hub", configured: true, implemented: true },
  { prefix: "/beej", name: "Beej / Investments", configured: true, implemented: false, placeholder: true },
  { prefix: "/raksha", name: "Raksha / Insurance", configured: true, implemented: true },
  { prefix: "/rin", name: "Rin / Loans", configured: true, implemented: true },
  { prefix: "/bhoomi", name: "Bhoomi / Property", configured: true, implemented: false, functional: true },
  { prefix: "/kar", name: "Kar / Tax and Compliance", configured: true, implemented: true },
  { prefix: "/mitra", name: "Mitra / Nominees and Will", configured: true, implemented: true },
  { prefix: "/leakage", name: "Leakage / Subscriptions", configured: true, implemented: true },
  { prefix: "/subscriptions", name: "Leakage / Subscriptions", configured: false, implemented: true, duplicate: true },
  { prefix: "/lakshya", name: "Lakshya / Goals", configured: true, implemented: false, placeholder: true },
  { prefix: "/sampatti", name: "Sampatti / Asset Inventory", configured: true, implemented: false, functional: true },
  { prefix: "/granthagaar", name: "Granthagaar / Document Vault", configured: true, implemented: false, functional: true },
  { prefix: "/vault", name: "Vault / Nidhi Vault", configured: false, implemented: true, duplicate: true },
  { prefix: "/suchak", name: "Suchak / Dashboard", configured: true, implemented: false, functional: true },
  { prefix: "/rajya", name: "Rajya / Kingdom Map", configured: false, implemented: true },
  { prefix: "/doot", name: "Doot / Reminders", configured: true, implemented: false, functional: true },
  { prefix: "/notifications", name: "Notifications", configured: false, implemented: true, duplicate: true },
  { prefix: "/mantri", name: "Mantri / Insights", configured: true, implemented: false, placeholder: true },
  { prefix: "/suraksha", name: "Suraksha / Security", configured: true, implemented: false, placeholder: true },
  { prefix: "/raj-mantri", name: "Raj Mantri / AI Assistant", configured: true, implemented: false, placeholder: true },
  { prefix: "/succession", name: "Uttaradhikar Sabha / Succession", configured: false, implemented: true },
  { prefix: "/onboarding", name: "Onboarding", configured: false, implemented: true },
  { prefix: "/start", name: "Authentication", configured: false, implemented: true },
  { prefix: "/reset-password", name: "Authentication", configured: false, implemented: true },
  { prefix: "/verify-email", name: "Authentication", configured: false, implemented: true },
  { prefix: "/intro-cinematic", name: "Authentication", configured: false, implemented: true },
  { prefix: "/auth", name: "Authentication", configured: false, implemented: true },
];

const duplicateRisks = [
  { test: (r) => r === "/kosh" || r.startsWith("/kosh/add") || r.startsWith("/kosh/income"), note: "Parallel Kosh route/store family overlaps configured /kosh/sources flow; do not delete without WD decision." },
  { test: (r) => r === "/vyaya" || r.startsWith("/vyaya/add"), note: "Parallel Vyaya route/store family overlaps configured /vyaya/entry flow; do not delete without WD decision." },
  { test: (r) => ["/khate/cash", "/khate/cash-flow", "/khate/idle-detection"].includes(r), note: "Parallel Khate screens overlap /khate/accounts/cash, /flow and /idle; authoritative route needs WD verification." },
  { test: (r) => r.startsWith("/subscriptions"), note: "Overlaps configured Leakage and /leakage/subscriptions route families; authoritative path needs WD verification." },
  { test: (r) => r.startsWith("/vault"), note: "Overlaps configured Granthagaar document-vault implementation; authoritative path needs WD verification." },
  { test: (r) => r.startsWith("/notifications"), note: "Overlaps configured Doot reminder/notification implementation; authoritative path needs WD verification." },
  { test: (r) => r.startsWith("/rajya"), note: "Overlaps configured Suchak dashboard purpose but is referenced by auth/navigation; ownership needs WD verification." },
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    if (row.some((value) => value !== "")) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

function csvEscape(value) {
  const text = String(value ?? "").replace(/\0/g, "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(headers, rows) {
  return `${headers.map(csvEscape).join(",")}\n${rows
    .map((row) => headers.map((header) => csvEscape(row[header])).join(","))
    .join("\n")}\n`;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function compact(values, max = 18) {
  const items = unique(values);
  if (!items.length) return "None found in traced files";
  if (items.length <= max) return items.join("; ");
  return `${items.slice(0, max).join("; ")}; +${items.length - max} more`;
}

function sourceRelative(file) {
  return path.relative(sourceRoot, file).split(path.sep).join("/");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !["node_modules", ".next", ".git"].includes(entry.name))
      .map(async (entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      }),
  );
  return nested.flat();
}

function routeFromPage(file) {
  const rel = path.relative(appDir, file).split(path.sep);
  const visible = rel
    .slice(0, -1)
    .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
  return visible.length ? `/${visible.join("/")}` : "/";
}

function routeGroup(file) {
  const rel = path.relative(appDir, file).split(path.sep);
  return rel.find((segment) => segment.startsWith("(") && segment.endsWith(")")) ?? "ungrouped";
}

function apiRouteFromFile(file) {
  const rel = path.relative(path.join(appDir, "api"), file).split(path.sep).slice(0, -1);
  return `/api/${rel.join("/")}`;
}

function moduleForRoute(route, group) {
  const found = moduleDefinitions
    .slice()
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find((definition) => route === definition.prefix || route.startsWith(`${definition.prefix}/`));
  if (found) return found;
  if (group === "(landing)" || route === "/") {
    return { prefix: "/", name: "Public Website / Landing", configured: false, implemented: true };
  }
  return { prefix: route, name: "Unclassified Route", configured: false, implemented: false };
}

function moduleStatus(definition) {
  if (definition.duplicate) return "Duplicate / Old Version";
  if (definition.placeholder) return "Placeholder";
  if (definition.functional && !definition.implemented) return "Partially Implemented";
  if (definition.implemented) return "Implemented";
  if (!definition.configured) return "Cannot Verify";
  return "Cannot Verify";
}

function normalizeModule(value) {
  const text = String(value ?? "").toLowerCase();
  const aliases = [
    ["foundation", "Sthapana / Foundation"], ["sthapana", "Sthapana / Foundation"],
    ["pehchaan", "Pehchaan / Identity Vault"], ["identity", "Pehchaan / Identity Vault"],
    ["dwaar", "Kunji / Dwaar Credentials"], ["kunji", "Kunji / Dwaar Credentials"],
    ["kosh", "Kosh / Income"], ["income", "Kosh / Income"],
    ["vyaya", "Vyaya / Expenses"], ["expense", "Vyaya / Expenses"],
    ["khate", "Pravah / Khate Bank Hub"], ["pravah", "Pravah / Khate Bank Hub"], ["bank", "Pravah / Khate Bank Hub"],
    ["beej", "Beej / Investments"], ["investment", "Beej / Investments"],
    ["raksha", "Raksha / Insurance"], ["insurance", "Raksha / Insurance"],
    ["rin", "Rin / Loans"], ["loan", "Rin / Loans"],
    ["bhoomi", "Bhoomi / Property"], ["property", "Bhoomi / Property"],
    ["kar", "Kar / Tax and Compliance"], ["tax", "Kar / Tax and Compliance"],
    ["mitra", "Mitra / Nominees and Will"], ["nominee", "Mitra / Nominees and Will"],
    ["succession", "Uttaradhikar Sabha / Succession"], ["uttaradhikar", "Uttaradhikar Sabha / Succession"],
    ["leakage", "Leakage / Subscriptions"], ["subscription", "Leakage / Subscriptions"],
    ["lakshya", "Lakshya / Goals"], ["goal", "Lakshya / Goals"],
    ["sampatti", "Sampatti / Asset Inventory"], ["asset inventory", "Sampatti / Asset Inventory"],
    ["granthagaar", "Granthagaar / Document Vault"], ["document vault", "Granthagaar / Document Vault"],
    ["vault", "Vault / Nidhi Vault"],
    ["suchak", "Suchak / Dashboard"], ["dashboard", "Suchak / Dashboard"],
    ["rajya", "Rajya / Kingdom Map"],
    ["doot", "Doot / Reminders"], ["reminder", "Doot / Reminders"],
    ["notification", "Notifications"],
    ["mantri", "Mantri / Insights"],
    ["suraksha", "Suraksha / Security"], ["security", "Suraksha / Security"],
    ["auth", "Authentication"], ["onboarding", "Onboarding"],
  ];
  const match = aliases.find(([needle]) => text.includes(needle));
  return match ? match[1] : "";
}

function defaultComponent(content) {
  const patterns = [
    /export\s+default\s+function\s+([A-Za-z_$][\w$]*)/,
    /export\s+default\s+([A-Za-z_$][\w$]*)/,
    /function\s+([A-Za-z_$][\w$]*)\s*\(/,
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(/,
  ];
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1];
  }
  return "Anonymous/default component - Needs WD Verification";
}

function extractImports(content) {
  const imports = [];
  const patterns = [
    /(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) imports.push(match[1]);
  }
  return unique(imports);
}

function extractImportedBindings(content) {
  const bindings = [];
  const pattern = /import\s+([\s\S]*?)\s+from\s+["']([^"']+)["']/g;
  for (const match of content.matchAll(pattern)) {
    const spec = match[1].replace(/\s+/g, " ").trim();
    const names = spec
      .replace(/[{}]/g, "")
      .split(",")
      .map((value) => value.trim().split(/\s+as\s+/).pop())
      .filter((value) => /^[A-Za-z_$][\w$]*$/.test(value));
    for (const name of names) bindings.push({ name, source: match[2] });
  }
  return bindings;
}

function resolveLocalImport(fromFile, specifier, codeFileSet) {
  if (!(specifier.startsWith("./") || specifier.startsWith("../") || specifier.startsWith("@/"))) return "";
  const raw = specifier.startsWith("@/")
    ? path.join(sourceDir, specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    raw,
    `${raw}.ts`, `${raw}.tsx`, `${raw}.js`, `${raw}.jsx`, `${raw}.mjs`,
    path.join(raw, "index.ts"), path.join(raw, "index.tsx"), path.join(raw, "index.js"),
  ];
  return candidates.find((candidate) => codeFileSet.has(candidate)) ?? "";
}

function normalizeApiLiteral(raw) {
  let value = raw.split("?")[0].replace(/\$\{[^}]+\}/g, "[id]");
  if (!value.startsWith("/api/")) return "";
  return value.replace(/\/$/, "");
}

function extractApiLiterals(content) {
  const values = [];
  for (const match of content.matchAll(/(?:fetch|axios\.(?:get|post|put|patch|delete))\s*\(\s*[`"']([^`"']*\/api\/[^`"']*)[`"']/g)) {
    const normalized = normalizeApiLiteral(match[1].replace(/^https?:\/\/[^/]+/, ""));
    if (normalized) values.push(normalized);
  }
  for (const match of content.matchAll(/[`"'](\/api\/[A-Za-z0-9_./${}\[\]-]+)[`"']/g)) {
    const normalized = normalizeApiLiteral(match[1]);
    if (normalized) values.push(normalized);
  }
  return unique(values);
}

function apiSkeleton(route) {
  return route.replace(/\[[^\]]+\]/g, "[]");
}

function matchApiFile(literal, apiFileByRoute) {
  if (apiFileByRoute.has(literal)) return apiFileByRoute.get(literal);
  const skeleton = apiSkeleton(literal);
  for (const [route, file] of apiFileByRoute.entries()) {
    if (apiSkeleton(route) === skeleton) return file;
  }
  const candidates = [...apiFileByRoute.entries()]
    .filter(([route]) => literal.startsWith(`${route}/`) || route.startsWith(`${literal}/`))
    .sort((a, b) => b[0].length - a[0].length);
  return candidates[0]?.[1] ?? "";
}

function duplicateRisk(route) {
  return duplicateRisks.find((risk) => risk.test(route))?.note ?? "No duplicate/old route risk identified from supplied source; Needs WD Verification before deletion decisions.";
}

function dependencyForModule(moduleName, dependencies) {
  return dependencies.find((row) => normalizeModule(row.Module) === moduleName) ?? null;
}

function controlledConnection(type, route, transitive, dependency) {
  const lowerFiles = transitive.map((file) => sourceRelative(file).toLowerCase());
  const depText = String(
    type === "document"
      ? dependency?.Document_Vault_Impact
      : type === "reminder"
        ? dependency?.Reminder_Impact
        : dependency?.Dashboard_Impact,
  ).toLowerCase();
  const direct = type === "document"
    ? lowerFiles.some((file) => /document|vault|upload|drive/.test(file)) || /vault|granthagaar/.test(route)
    : type === "reminder"
      ? lowerFiles.some((file) => /reminder|notification/.test(file)) || /doot|notification/.test(route)
      : /rajya|suchak/.test(route);
  if (direct) return "Yes";
  if (/broken|missing/.test(depText)) {
    if (type === "reminder") return "Broken / Missing";
    if (type === "dashboard") return "Hardcoded / Not Live";
    return "Needs WD Verification";
  }
  if (/high|medium|probable|impact|feed|read/.test(depText)) return "Probable";
  if (/none|no direct|low/.test(depText)) return "No";
  return "Needs WD Verification";
}

function formEvidence(route, content, componentName, importedBindings) {
  const isForm = /\/(add|new|edit)(\/|$)/.test(route)
    || /<form\b|handleSubmit|onSubmit=|type=["']submit["']/.test(content);
  const named = importedBindings.filter(({ name }) => /form|input|select|uploader|game/i.test(name)).map(({ name }) => name);
  if (!isForm && !named.length) return "No distinct form component found in this route";
  return compact(isForm ? [componentName, ...named] : named, 10);
}

function displayEvidence(route, content, componentName, importedBindings) {
  const isDisplay = /\.map\s*\(|<table\b|dashboard|overview|hub|list|records|policies|loans|analytics|summary/i.test(`${route}\n${content.slice(0, 12000)}`);
  const named = importedBindings.filter(({ name }) => /card|list|table|dashboard|summary|meter|chart|badge|board|hub/i.test(name)).map(({ name }) => name);
  if (!isDisplay && !named.length) return "No distinct display/list component found in this route";
  return compact(isDisplay ? [componentName, ...named] : named, 10);
}

function confidenceFor(row) {
  const hasPage = row["Page File"]?.startsWith("src/app/");
  const hasChain = !row["API Route"].startsWith("None") || !row["Hook / Store"].startsWith("None") || !row["Service File"].startsWith("None");
  const hasDb = !row["Tables Referenced"].startsWith("No direct") && !row["Tables Referenced"].startsWith("Needs WD");
  if (hasPage && hasChain && hasDb) return "Strong Evidence";
  if (hasPage && (hasChain || hasDb)) return "Probable";
  return "Unconfirmed";
}

const allFiles = await walk(sourceDir);
const codeFiles = allFiles.filter((file) => /\.(?:ts|tsx|js|jsx|mjs)$/.test(file));
const codeFileSet = new Set(codeFiles);
const pageFiles = codeFiles.filter((file) => file.startsWith(appDir) && file.endsWith("/page.tsx")).sort();
const layoutFiles = codeFiles.filter((file) => file.startsWith(appDir) && file.endsWith("/layout.tsx"));
const apiFiles = codeFiles.filter((file) => file.startsWith(path.join(appDir, "api")) && file.endsWith("/route.ts"));
const apiFileByRoute = new Map(apiFiles.map((file) => [apiRouteFromFile(file), file]));

const contentByFile = new Map();
await Promise.all(codeFiles.map(async (file) => contentByFile.set(file, await fs.readFile(file, "utf8"))));

const importsByFile = new Map();
for (const file of codeFiles) {
  const imports = extractImports(contentByFile.get(file) ?? "")
    .map((specifier) => resolveLocalImport(file, specifier, codeFileSet))
    .filter(Boolean);
  importsByFile.set(file, unique(imports));
}

const directPageImporters = new Map();
for (const page of pageFiles) {
  for (const imported of importsByFile.get(page) ?? []) {
    if (!directPageImporters.has(imported)) directPageImporters.set(imported, new Set());
    directPageImporters.get(imported).add(page);
  }
}

function traceImports(seeds, maxDepth = 4) {
  const seen = new Set(seeds);
  let frontier = seeds.map((file) => ({ file, depth: 0 }));
  while (frontier.length) {
    const next = [];
    for (const { file, depth } of frontier) {
      if (depth >= maxDepth) continue;
      for (const imported of importsByFile.get(file) ?? []) {
        if (!seen.has(imported)) {
          seen.add(imported);
          next.push({ file: imported, depth: depth + 1 });
        }
      }
    }
    frontier = next;
  }
  return [...seen];
}

function nearestLayout(page) {
  let dir = path.dirname(page);
  while (dir.startsWith(appDir)) {
    const candidate = path.join(dir, "layout.tsx");
    if (layoutFiles.includes(candidate)) return candidate;
    if (dir === appDir) break;
    dir = path.dirname(dir);
  }
  return "";
}

const [oldMap, supabaseRows, dbRows, fieldRows, dependencyRows, crudRows, pmModuleRows, pmScreenRows, prdRows] = await Promise.all(
  Object.values(input).map(async (file) => parseCsv(await fs.readFile(file, "utf8"))),
);
const [repositoryInventoryText, authFlowText, architectureRiskText, databaseTypesText, schemaSqlText] = await Promise.all(
  Object.values(supportingDocuments).map((file) => fs.readFile(file, "utf8")),
);

const prismaModelToTable = new Map();
for (const row of dbRows) {
  const model = String(row.Prisma_Model ?? "").match(/^([A-Za-z_$][\w$]*)/)?.[1];
  if (model && !model.startsWith("None")) prismaModelToTable.set(model.toLowerCase(), row.Table);
}

const fieldRowsByFile = new Map();
for (const row of fieldRows) {
  const key = String(row.Component_File ?? "");
  if (!fieldRowsByFile.has(key)) fieldRowsByFile.set(key, []);
  fieldRowsByFile.get(key).push(row);
}

const allSourceText = [...contentByFile.entries()]
  .filter(([file]) => !file.endsWith("/page.tsx"))
  .map(([file, content]) => ({ file, content }));

const oldMapByModule = new Map(oldMap.map((row) => [row.Module_Name, row]));

const mapRows = [];
const rawRows = [];
for (const page of pageFiles) {
  const content = contentByFile.get(page) ?? "";
  const route = routeFromPage(page);
  const group = routeGroup(page);
  const definition = moduleForRoute(route, group);
  const componentName = defaultComponent(content);
  const layout = nearestLayout(page);
  const directImports = importsByFile.get(page) ?? [];
  const importedBindings = extractImportedBindings(content);
  let featureTraced = traceImports([page], 4);
  const layoutTraced = layout ? traceImports([layout], 3) : [];
  const apiLiterals = unique(featureTraced.flatMap((file) => extractApiLiterals(contentByFile.get(file) ?? "")));
  const matchedApiFiles = unique(apiLiterals.map((literal) => matchApiFile(literal, apiFileByRoute)).filter(Boolean));
  featureTraced = traceImports(unique([...featureTraced, ...matchedApiFiles]), 4);

  const relTraced = featureTraced.map(sourceRelative);
  const componentFiles = featureTraced.filter((file) => file.includes("/src/components/") && /\.(?:tsx|jsx)$/.test(file));
  const layoutComponentFiles = layoutTraced.filter((file) => file.includes("/src/components/") && /\.(?:tsx|jsx)$/.test(file));
  const hookStoreFiles = featureTraced.filter((file) => /\/(?:hooks|stores|context)\/|(?:Store|store)\.(?:ts|tsx)$/.test(file));
  const contextFiles = unique([...featureTraced, ...layoutTraced]).filter((file) => /Context|Provider/.test(path.basename(file)) || file.includes("/context/"));
  const serviceFiles = featureTraced.filter((file) => file.includes("/src/lib/services/") || /Api\.(?:ts|js)$/.test(file));
  const utilityFiles = featureTraced.filter((file) => /\/utils\/|\/engines\/|Utils?\.|Engine\.|crypto|vaultExporter|fetcher/.test(file));
  const validationFiles = featureTraced.filter((file) => /validat|validator|zod|schema/i.test(sourceRelative(file)));
  const calculationFiles = featureTraced.filter((file) => /calculat|metric|score|analytics/i.test(sourceRelative(file)));
  const supabaseClientFiles = featureTraced.filter((file) => file.includes("/src/lib/supabase/"));
  const tracedFileSet = new Set(relTraced);
  const directSupabaseEvidence = supabaseRows
    .filter((row) => tracedFileSet.has(String(row.File_Path ?? "")))
    .map((row) => `${row.File_Path}: ${row.API_Pattern} ${row.Resource} ${row.Operation_or_Method}`);

  const prismaModels = [];
  for (const file of featureTraced) {
    const fileContent = contentByFile.get(file) ?? "";
    for (const match of fileContent.matchAll(/prisma\.([A-Za-z_$][\w$]*)\s*\./g)) prismaModels.push(match[1]);
  }
  const tableFromPrisma = unique(prismaModels.map((model) => prismaModelToTable.get(model.toLowerCase()) ?? model));
  const directFieldRows = relTraced.flatMap((file) => fieldRowsByFile.get(file) ?? []);
  const directFields = unique(directFieldRows.map((row) => `${row.Database_Table}.${row.Database_Column}`));
  const directTables = unique([...tableFromPrisma, ...directFieldRows.map((row) => row.Database_Table)]);
  const dependency = dependencyForModule(definition.name, dependencyRows);
  const dependencyTables = String(dependency?.Primary_Tables ?? "")
    .split(";")
    .map((value) => value.trim())
    .filter(Boolean);
  const tables = directTables.length ? directTables : dependencyTables;
  const tableEvidence = directTables.length
    ? compact(directTables)
    : dependencyTables.length
      ? `${compact(dependencyTables)} (module-level dependency evidence; Needs WD Verification for this route)`
      : "Needs WD Verification - no direct table evidence found for this route";
  const fieldsEvidence = directFields.length
    ? compact(directFields, 24)
    : "Needs WD Verification - no direct field-map row found in traced files";
  const oldModule = oldMapByModule.get(definition.name);
  const status = moduleStatus(definition);
  const docConnection = controlledConnection("document", route, featureTraced, dependency);
  const reminderConnection = controlledConnection("reminder", route, featureTraced, dependency);
  const dashboardConnection = controlledConnection("dashboard", route, featureTraced, dependency);
  const form = formEvidence(route, content, componentName, importedBindings);
  const display = displayEvidence(route, content, componentName, importedBindings);
  const sharedComponents = unique([...componentFiles, ...layoutComponentFiles])
    .filter((file) => layoutComponentFiles.includes(file) || (directPageImporters.get(file)?.size ?? 0) > 1);
  const apiEvidence = apiLiterals.map((literal) => {
    const file = matchApiFile(literal, apiFileByRoute);
    return file ? `${literal} -> ${sourceRelative(file)}` : `${literal} -> route file not matched`;
  });
  const navigationRefs = allSourceText.filter(({ content: otherContent }) => otherContent.includes(route)).length;
  const baseRisk = duplicateRisk(route);
  const risk = navigationRefs === 0
    ? `${baseRisk} Static route-literal search found no reference outside the page file; dynamic navigation is possible, so linkage Needs WD Verification.`
    : baseRisk;
  const authConnection = group === "(dashboard)"
    ? "Yes - src/app/(dashboard)/layout.tsx and src/lib/supabase/middleware.ts"
    : definition.name === "Authentication"
      ? "Yes - authentication entry/callback/session route"
      : group === "(onboarding)"
        ? "Probable - onboarding store/auth session linkage; Needs WD Verification"
        : "No protected-route evidence for this public route";
  const relatedModules = dependency
    ? compact([
      ...String(dependency.Reads_From_Modules ?? "").split(";"),
      ...String(dependency.Writes_For_Modules ?? "").split(";"),
    ].map((value) => value.trim()))
    : "Needs WD Verification - no matching dependency-matrix row";
  const supportingEvidence = unique([
    sourceRelative(page),
    layout ? sourceRelative(layout) : "",
    ...matchedApiFiles.map(sourceRelative),
    ...serviceFiles.map(sourceRelative),
    directFieldRows.length ? "audit-output/02-database-and-dependencies/FRONTEND_DATABASE_FIELD_MAP.csv" : "",
    dependency ? "audit-output/02-database-and-dependencies/MODULE_DEPENDENCY_MATRIX.csv" : "",
    repositoryInventoryText.includes("src/app")
      ? "audit-output/01-repository-and-architecture/REPOSITORY_INVENTORY.md"
      : "",
    (definition.name === "Authentication" || group === "(dashboard)") && authFlowText.includes("Supabase")
      ? "audit-output/01-repository-and-architecture/GOOGLE_AUTH_CODE_FLOW.md"
      : "",
    !baseRisk.startsWith("No duplicate") && architectureRiskText.length
      ? "audit-output/01-repository-and-architecture/ARCHITECTURE_AND_COUPLING_RISKS.md"
      : "",
    tables.some((table) => schemaSqlText.includes(table))
      ? "audit-input/01-database-structure/schema.sql"
      : "",
    tables.some((table) => databaseTypesText.includes(table))
      ? "audit-input/01-database-structure/database.types.ts"
      : "",
    crudRows.some((row) => normalizeModule(row["Module Name"]) === definition.name)
      ? "audit-input/02-existing-team-outputs/2026-07-19_MODULE_CRUD_TRACE.csv"
      : "",
    pmModuleRows.some((row) => normalizeModule(row["Module name"]) === definition.name)
      ? "audit-input/02-existing-team-outputs/PM_MODULE_INVENTORY.csv"
      : "",
    pmScreenRows.some((row) => normalizeModule(row.Module) === definition.name)
      ? "audit-input/02-existing-team-outputs/PM_SCREEN_INVENTORY.csv"
      : "",
    prdRows.some((row) => String(row["Route / Screen Evidence"] ?? "").includes(definition.prefix))
      ? "audit-output/03-prd-traceability/PRD_IMPLEMENTATION_TRACEABILITY.csv"
      : "",
  ]);

  const row = {
    "Module": definition.name,
    "Module Status": status,
    "Route": route,
    "Page File": sourceRelative(page),
    "Layout File": layout ? sourceRelative(layout) : "No route-specific layout found; src/app/layout.tsx may apply",
    "Main Form Component": form,
    "Main Display/List Component": display,
    "Other Components": compact(componentFiles.map((file) => `${path.basename(file, path.extname(file))} (${sourceRelative(file)})`), 14),
    "Hook / Store": compact(hookStoreFiles.map(sourceRelative), 14),
    "Context Provider": compact(contextFiles.map(sourceRelative), 10),
    "API Route": apiEvidence.length ? compact(apiEvidence, 14) : "None found in traced page/import chain",
    "Service File": compact(serviceFiles.map(sourceRelative), 14),
    "Supabase Client File": supabaseClientFiles.length ? compact(supabaseClientFiles.map(sourceRelative), 8) : "No direct Supabase client import found in traced files",
    "Supabase Query Evidence": directSupabaseEvidence.length ? compact(directSupabaseEvidence, 10) : "No direct .from/.select/.insert/.upsert/.update/.delete/.rpc/auth/storage evidence in traced files",
    "Tables Referenced": tableEvidence,
    "Fields Read / Written": fieldsEvidence,
    "Utility Functions": compact(utilityFiles.map(sourceRelative), 12),
    "Validation Files": compact(validationFiles.map(sourceRelative), 10),
    "Calculation Files": compact(calculationFiles.map(sourceRelative), 10),
    "Document Upload Connection": docConnection,
    "Reminder Connection": reminderConnection,
    "Dashboard Connection": dashboardConnection,
    "Auth / Protected Route Connection": authConnection,
    "Shared Components": compact(sharedComponents.map(sourceRelative), 12),
    "Related Modules": relatedModules,
    "Duplicate / Old / Deprecated File Risk": risk,
    "Evidence / Code Reference": compact(supportingEvidence, 16),
    "Confidence": "Unconfirmed",
    "Needs WD Verification": "Yes",
    "Notes": oldModule
      ? `Prior module-level assessment: ${oldModule.Implementation_Assessment}. This rebuilt row is route-level and does not treat prior Confirmed labels as human verification.`
      : "Route exists in the source snapshot; module ownership and live deployment parity require WD verification.",
  };
  row.Confidence = confidenceFor(row);
  mapRows.push(row);

  rawRows.push({
    "Route": route,
    "Route Group": group,
    "Page File": sourceRelative(page),
    "Layout File": layout ? sourceRelative(layout) : "No route-specific layout found",
    "Default Component": componentName,
    "Module Association": definition.name,
    "Direct Local Imports": compact(directImports.map(sourceRelative), 18),
    "Transitive Source Files": compact(relTraced, 30),
    "API Route Literals": compact(apiLiterals, 18),
    "Matched API Route Files": compact(matchedApiFiles.map(sourceRelative), 18),
    "Hooks / Stores / Contexts": compact(hookStoreFiles.map(sourceRelative), 18),
    "Services": compact(serviceFiles.map(sourceRelative), 18),
    "Database Tables": tableEvidence,
    "Fields Read / Written": fieldsEvidence,
    "Supabase Evidence": directSupabaseEvidence.length ? compact(directSupabaseEvidence, 12) : "None found in traced files",
    "Form Evidence": form,
    "Display Evidence": display,
    "Navigation Reference Count": navigationRefs,
    "Module Status": status,
    "Duplicate / Old Risk": risk,
    "Confidence": row.Confidence,
    "Needs WD Verification": "Yes",
    "Evidence": compact(supportingEvidence, 18),
  });
}

mapRows.sort((a, b) => a.Module.localeCompare(b.Module) || a.Route.localeCompare(b.Route));
rawRows.sort((a, b) => a.Route.localeCompare(b.Route));

const mapCsv = toCsv(moduleMapHeaders, mapRows);
const rawCsv = toCsv(routeInventoryHeaders, rawRows);
await fs.writeFile(output.map, mapCsv, "utf8");
await fs.writeFile(output.routeInventory, rawCsv, "utf8");

// The spreadsheet library is used as a structural verification pass over both CSV outputs.
const mapWorkbook = await Workbook.fromCSV(mapCsv, { sheetName: "Module Map" });
const rawWorkbook = await Workbook.fromCSV(rawCsv, { sheetName: "Route Inventory" });
const mapInspection = await mapWorkbook.inspect({
  kind: "table",
  range: `Module Map!A1:AD${Math.min(mapRows.length + 1, 8)}`,
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 30,
  maxChars: 12000,
});
const rawInspection = await rawWorkbook.inspect({
  kind: "table",
  range: `Route Inventory!A1:W${Math.min(rawRows.length + 1, 6)}`,
  include: "values",
  tableMaxRows: 6,
  tableMaxCols: 23,
  maxChars: 8000,
});

const allowed = {
  status: new Set(["Implemented", "Partially Implemented", "Placeholder", "Duplicate / Old Version", "Not Linked in Navigation", "Cannot Verify"]),
  document: new Set(["Yes", "No", "Probable", "Needs WD Verification"]),
  reminder: new Set(["Yes", "No", "Probable", "Broken / Missing", "Needs WD Verification"]),
  dashboard: new Set(["Yes", "No", "Probable", "Hardcoded / Not Live", "Needs WD Verification"]),
  confidence: new Set(["Confirmed", "Strong Evidence", "Probable", "Unconfirmed"]),
  verification: new Set(["Yes", "No"]),
};

const validationErrors = [];
if (moduleMapHeaders.length !== 30) validationErrors.push(`Expected 30 headers; found ${moduleMapHeaders.length}`);
for (const [index, row] of mapRows.entries()) {
  const line = index + 2;
  if (!allowed.status.has(row["Module Status"])) validationErrors.push(`Line ${line}: invalid Module Status`);
  if (!allowed.document.has(row["Document Upload Connection"])) validationErrors.push(`Line ${line}: invalid Document Upload Connection`);
  if (!allowed.reminder.has(row["Reminder Connection"])) validationErrors.push(`Line ${line}: invalid Reminder Connection`);
  if (!allowed.dashboard.has(row["Dashboard Connection"])) validationErrors.push(`Line ${line}: invalid Dashboard Connection`);
  if (!allowed.confidence.has(row.Confidence)) validationErrors.push(`Line ${line}: invalid Confidence`);
  if (!allowed.verification.has(row["Needs WD Verification"])) validationErrors.push(`Line ${line}: invalid Needs WD Verification`);
  if (row.Confidence === "Confirmed") validationErrors.push(`Line ${line}: unsupported Confirmed classification`);
  if (!row.Route || !row["Page File"] || !row["Evidence / Code Reference"]) validationErrors.push(`Line ${line}: missing route, page or evidence`);
}

const counts = (field) => Object.fromEntries(
  [...new Set(mapRows.map((row) => row[field]))].sort().map((value) => [value, mapRows.filter((row) => row[field] === value).length]),
);
const moduleCounts = Object.fromEntries(
  unique(mapRows.map((row) => row.Module)).sort().map((name) => [name, mapRows.filter((row) => row.Module === name).length]),
);
const noApi = mapRows.filter((row) => row["API Route"].startsWith("None")).length;
const noService = mapRows.filter((row) => row["Service File"].startsWith("None")).length;
const noDirectDb = mapRows.filter((row) => /Needs WD Verification|module-level dependency evidence/.test(row["Tables Referenced"])).length;
const noDirectFields = mapRows.filter((row) => row["Fields Read / Written"].startsWith("Needs WD Verification")).length;
const duplicateCount = mapRows.filter((row) => row["Module Status"] === "Duplicate / Old Version" || duplicateRisks.some((risk) => risk.test(row.Route))).length;
const notLinkedCandidateCount = rawRows.filter((row) => Number(row["Navigation Reference Count"]) === 0).length;

const gapsText = `# Module-to-File Map Gaps\n\n` +
`Date: 2026-07-20\n\n` +
`Status: Draft - Pending WD Verification and Gap Cleanup\n\n` +
`## Rebuild Scope\n\n` +
`- The rebuilt map contains ${mapRows.length} route-level rows covering ${Object.keys(moduleCounts).length} module/route associations discovered under \`src/app/**/page.tsx\`.\n` +
`- \`RAW_ROUTE_INVENTORY.csv\` preserves the route discovery and trace results before the 30-column presentation mapping.\n` +
`- All confidence values were reassessed. No row is marked Confirmed because no explicit Himanshu/Harsh/WD verification evidence was supplied.\n` +
`- Every row is marked \`Needs WD Verification = Yes\`.\n\n` +
`## Remaining Evidence Gaps\n\n` +
`- ${noApi} route rows have no API literal in the traced page/import chain. This may be valid for local-only, placeholder or display-only routes; runtime behavior is not proven.\n` +
`- ${noService} route rows have no service file in the traced chain. A store-only or local persistence path is possible and is shown where found.\n` +
`- ${noDirectDb} route rows rely on module-level dependency evidence or have no direct database-table proof. Their table ownership remains Needs WD Verification.\n` +
`- ${noDirectFields} route rows have no direct matching row in \`FRONTEND_DATABASE_FIELD_MAP.csv\`. Field-level reads/writes remain Needs WD Verification.\n` +
`- ${duplicateCount} route rows have duplicate/parallel/old-version risk or are classified as duplicate route families. These are flags only; this audit does not recommend deleting files.\n` +
`- ${notLinkedCandidateCount} route rows have no exact static route-literal reference outside their page file. They are flagged as candidates only because dynamic navigation may not contain the literal route text.\n` +
`- Source inspection proves repository structure, not deployment parity. No GitHub, Supabase, Vercel, Google Cloud, Jira or live application connection was used.\n\n` +
`## WD Verification Questions\n\n` +
`1. Which route family is authoritative for Kosh: \`/kosh/sources\` or the parallel \`/kosh\` and \`/kosh/income\` screens?\n` +
`2. Which route family is authoritative for Vyaya: \`/vyaya/entry\` or the parallel \`/vyaya\` flow?\n` +
`3. Which Khate cash/flow/idle route set is authoritative: \`/khate/accounts/*\` or the parallel top-level Khate screens?\n` +
`4. Are \`/granthagaar\` and \`/vault\`, \`/doot\` and \`/notifications\`, and \`/suchak\` and \`/rajya\` intentional parallel products, migrations, or old versions?\n` +
`5. Which browser stores are authoritative where both \`src/lib/*Store.ts\` and \`src/lib/stores/*Store.ts\` exist?\n` +
`6. Should functional modules marked \`isImplemented=false\` in \`src/config/modules.config.ts\` be enabled, treated as partial, or treated as prototypes?\n` +
`7. Can WD confirm the table and field ownership for rows using module-level dependency evidence rather than a direct API/service trace?\n` +
`8. Can WD confirm whether all dashboard-group routes are protected in the deployed build and whether onboarding routes require an authenticated session?\n` +
`9. Can WD identify orphaned routes that are intentionally not linked from navigation?\n` +
`10. Can WD confirm live/deployed parity with this source snapshot before any row is promoted to Confirmed?\n\n` +
`## Source Limitations\n\n` +
`- PM inventory claims about the live app are retained only as supporting evidence; they do not substitute for source or WD verification.\n` +
`- Database table names were accepted only when supported by a traced Prisma model, direct frontend field-map row, or the existing dependency matrix. Similar names alone were not treated as proof.\n` +
`- Form and display/list columns distinguish route component behavior using source syntax and imported component names. Ambiguous pages remain explicitly described rather than silently classified.\n`;
await fs.writeFile(output.gaps, gapsText, "utf8");

const validationText = `# Module-to-File Map Validation\n\n` +
`Date: 2026-07-20\n\n` +
`Result: ${validationErrors.length ? "FAILED" : "PASSED"}\n\n` +
`## Checks\n\n` +
`- Exact required headers: ${moduleMapHeaders.length}/30\n` +
`- Data rows: ${mapRows.length}\n` +
`- Raw route rows: ${rawRows.length}\n` +
`- Distinct module associations: ${Object.keys(moduleCounts).length}\n` +
`- Unsupported Confirmed rows: ${mapRows.filter((row) => row.Confidence === "Confirmed").length}\n` +
`- Rows requiring WD verification: ${mapRows.filter((row) => row["Needs WD Verification"] === "Yes").length}\n` +
`- Validation errors: ${validationErrors.length}\n` +
`- Artifact-tool structural inspections completed for both CSVs: Yes\n` +
`- Secrets or production data intentionally included: No\n\n` +
`## Controlled Values\n\n` +
`- Module Status: ${JSON.stringify(counts("Module Status"))}\n` +
`- Confidence: ${JSON.stringify(counts("Confidence"))}\n` +
`- Document Upload Connection: ${JSON.stringify(counts("Document Upload Connection"))}\n` +
`- Reminder Connection: ${JSON.stringify(counts("Reminder Connection"))}\n` +
`- Dashboard Connection: ${JSON.stringify(counts("Dashboard Connection"))}\n\n` +
`## Errors\n\n` +
(validationErrors.length ? validationErrors.map((error) => `- ${error}`).join("\n") : "- None") +
`\n\n## Inspection Notes\n\n` +
`- Module map inspection returned ${mapInspection.ndjson ? "data" : "no data"}.\n` +
`- Raw route inspection returned ${rawInspection.ndjson ? "data" : "no data"}.\n`;
await fs.writeFile(output.validation, validationText, "utf8");

console.log(JSON.stringify({
  mapRows: mapRows.length,
  rawRows: rawRows.length,
  modules: Object.keys(moduleCounts).length,
  statusCounts: counts("Module Status"),
  confidenceCounts: counts("Confidence"),
  noApi,
  noService,
  noDirectDb,
  noDirectFields,
  duplicateCount,
  notLinkedCandidateCount,
  validationErrors,
}, null, 2));

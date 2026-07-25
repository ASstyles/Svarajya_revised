import fs from "node:fs/promises";
import path from "node:path";
import { Workbook } from "@oai/artifact-tool";

const auditRoot = "/Users/amitkothari/Documents/New project/Svarajya-Codex-Audit";
const sourceRoot = path.join(auditRoot, "source-snapshot/Svarajya-main-6-7-26/Svarajya-main");
const sourceDir = path.join(sourceRoot, "src");
const outputDir = path.join(auditRoot, "audit-output/01-repository-and-architecture");

const files = {
  previousMap: path.join(outputDir, "SUPABASE_CODE_USAGE_MAP_2026-07-20_PRE_37_COLUMN_REBUILD_DRAFT.csv"),
  moduleMap: path.join(outputDir, "MODULE_TO_FILE_MAP.csv"),
  dbInventory: path.join(auditRoot, "audit-output/02-database-and-dependencies/DATABASE_TABLE_INVENTORY.csv"),
  fieldMap: path.join(auditRoot, "audit-output/02-database-and-dependencies/FRONTEND_DATABASE_FIELD_MAP.csv"),
  dependencies: path.join(auditRoot, "audit-output/02-database-and-dependencies/MODULE_DEPENDENCY_MATRIX.csv"),
  crudTrace: path.join(auditRoot, "audit-input/02-existing-team-outputs/2026-07-19_MODULE_CRUD_TRACE.csv"),
  pmModules: path.join(auditRoot, "audit-input/02-existing-team-outputs/PM_MODULE_INVENTORY.csv"),
  pmScreens: path.join(auditRoot, "audit-input/02-existing-team-outputs/PM_SCREEN_INVENTORY.csv"),
  daMissing: path.join(auditRoot, "audit-input/02-existing-team-outputs/DA_SUSPECTED_MISSING_CONNECTIONS.csv"),
  daUnclear: path.join(auditRoot, "audit-input/02-existing-team-outputs/DA_UNCLEAR_AND_CONFLICTING_FIELDS.csv"),
  storageBuckets: path.join(auditRoot, "audit-input/01-database-structure/SUPABASE_STORAGE_BUCKETS.csv"),
  rlsPolicies: path.join(auditRoot, "audit-input/01-database-structure/RLS_POLICIES.csv"),
  databaseTypes: path.join(auditRoot, "audit-input/01-database-structure/database.types.ts"),
  schemaSql: path.join(auditRoot, "audit-input/01-database-structure/schema.sql"),
  safety: path.join(auditRoot, "audit-output/AUDIT_WORKSPACE_SAFETY_CHECKLIST.md"),
  repositoryInventory: path.join(outputDir, "REPOSITORY_INVENTORY.md"),
  authFlow: path.join(outputDir, "GOOGLE_AUTH_CODE_FLOW.md"),
  architectureRisks: path.join(outputDir, "ARCHITECTURE_AND_COUPLING_RISKS.md"),
};

const outputs = {
  raw: path.join(outputDir, "RAW_SUPABASE_OCCURRENCES.csv"),
  map: path.join(outputDir, "SUPABASE_CODE_USAGE_MAP.csv"),
  gaps: path.join(outputDir, "SUPABASE_CODE_USAGE_GAPS.md"),
  validation: path.join(outputDir, "SUPABASE_CODE_USAGE_MAP_VALIDATION.md"),
};

const mapHeaders = [
  "Usage ID",
  "Module",
  "Feature / Flow",
  "Source File",
  "Function / Component Name",
  "Supabase Client File",
  "Supabase Operation Type",
  "Code Pattern Found",
  "Table / Function / Bucket",
  "Fields Read",
  "Fields Written",
  "Filters / Conditions Used",
  "Insert / Update Payload Source",
  "Delete Behaviour",
  "RPC / Edge Function Name",
  "Storage Bucket",
  "Auth Usage",
  "Error Handling Present",
  "Loading State Present",
  "Success Handling Present",
  "Related Modules",
  "Dashboard Impact",
  "Reminder Impact",
  "Document Vault Impact",
  "Auth / Security Impact",
  "Data Loss Risk",
  "Calculation Risk",
  "Shared Service Used",
  "Direct Call or Service Layer",
  "Duplicate Logic Risk",
  "Hardcoded Table / Field Risk",
  "RLS / Permission Risk",
  "Evidence / Code Reference",
  "Confidence",
  "Needs WD Verification",
  "Recommended Next Action",
  "Notes",
];

const rawHeaders = [
  "Source File",
  "Line / Approx Location",
  "Pattern Found",
  "Code Snippet",
  "Initial Guess Table/Bucket/Function",
  "Notes",
];

function parseCsv(text) {
  const records = [];
  let record = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      record.push(field);
      field = "";
    } else if (char === "\n") {
      record.push(field.replace(/\r$/, ""));
      if (record.some((value) => value !== "")) records.push(record);
      record = [];
      field = "";
    } else field += char;
  }
  if (field || record.length) {
    record.push(field.replace(/\r$/, ""));
    if (record.some((value) => value !== "")) records.push(record);
  }
  if (!records.length) return [];
  const headers = records[0];
  return records.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function csvEscape(value) {
  const text = String(value ?? "").replace(/\0/g, "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(headers, rows) {
  return `${headers.map(csvEscape).join(",")}\n${rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")).join("\n")}\n`;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function compact(values, max = 10) {
  const items = unique(values.map((value) => String(value).trim()).filter(Boolean));
  if (!items.length) return "None identified";
  if (items.length <= max) return items.join("; ");
  return `${items.slice(0, max).join("; ")}; +${items.length - max} more`;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries
    .filter((entry) => !["node_modules", ".next", ".git"].includes(entry.name))
    .map(async (entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }))).flat();
}

function sourceRelative(file) {
  return path.relative(sourceRoot, file).split(path.sep).join("/");
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function sanitizeSnippet(value) {
  let text = String(value ?? "").replace(/\s+/g, " ").trim();
  text = text
    .replace(/eyJ[A-Za-z0-9_-]{20,}(?:\.[A-Za-z0-9_-]+){1,2}/g, "[REDACTED_TOKEN]")
    .replace(/(?:postgres|postgresql):\/\/[^\s"']+/gi, "[REDACTED_CONNECTION_STRING]")
    .replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[REDACTED_PRIVATE_KEY]");
  if (/secret|password|service_role|access_token|refresh_token/i.test(text)) {
    text = text.replace(/(["'])([^"']{9,})\1/g, '"[REDACTED_LITERAL]"');
  }
  return text.slice(0, 260);
}

function linesAround(text, line, radius = 70) {
  const lines = text.split("\n");
  return lines.slice(Math.max(0, line - radius - 1), Math.min(lines.length, line + radius)).join("\n");
}

function functionAt(text, line) {
  const lines = text.split("\n");
  const ignored = new Set(["if", "for", "while", "switch", "catch", "with", "return"]);
  for (let index = Math.min(line - 1, lines.length - 1); index >= Math.max(0, line - 140); index -= 1) {
    const source = lines[index];
    const patterns = [
      /export\s+default\s+function\s+([A-Za-z_$][\w$]*)/,
      /export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/,
      /(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/,
      /(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/,
      /^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/,
    ];
    for (const pattern of patterns) {
      const match = source.match(pattern);
      if (match && !ignored.has(match[1])) return match[1];
    }
  }
  return "Inline or module-scope call - Needs WD Verification";
}

function readCallArgument(text, openParenIndex) {
  let depth = 0;
  let quoted = "";
  let escaped = false;
  let result = "";
  for (let index = openParenIndex + 1; index < text.length && result.length < 500; index += 1) {
    const char = text[index];
    if (quoted) {
      result += char;
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quoted) quoted = "";
      continue;
    }
    if (["'", '"', "`"].includes(char)) {
      quoted = char;
      result += char;
      continue;
    }
    if (char === "(") depth += 1;
    if (char === ")") {
      if (depth === 0) break;
      depth -= 1;
    }
    result += char;
  }
  return sanitizeSnippet(result);
}

function normalizeModule(value) {
  const text = String(value ?? "").toLowerCase();
  const aliases = [
    ["foundation", "Sthapana / Foundation"], ["sthapana", "Sthapana / Foundation"],
    ["pehchaan", "Pehchaan / Identity Vault"], ["identity", "Pehchaan / Identity Vault"],
    ["dwaar", "Kunji / Dwaar Credentials"], ["kunji", "Kunji / Dwaar Credentials"],
    ["kosh", "Kosh / Income"], ["income", "Kosh / Income"],
    ["vyaya", "Vyaya / Expenses"], ["expense", "Vyaya / Expenses"],
    ["khate", "Pravah / Khate Bank Hub"], ["bank", "Pravah / Khate Bank Hub"],
    ["raksha", "Raksha / Insurance"], ["insurance", "Raksha / Insurance"],
    ["rin", "Rin / Loans"], ["loan", "Rin / Loans"],
    ["bhoomi", "Bhoomi / Property"], ["kar", "Kar / Tax and Compliance"],
    ["mitra", "Mitra / Nominees and Will"], ["succession", "Uttaradhikar Sabha / Succession"],
    ["leakage", "Leakage / Subscriptions"], ["subscription", "Leakage / Subscriptions"],
    ["sampatti", "Sampatti / Asset Inventory"], ["vault", "Granthagaar / Document Vault"],
    ["granthagaar", "Granthagaar / Document Vault"], ["document", "Granthagaar / Document Vault"],
    ["notification", "Notifications / Doot"], ["doot", "Notifications / Doot"],
    ["dashboard", "Rajya / Dashboard"], ["rajya", "Rajya / Dashboard"], ["suchak", "Rajya / Dashboard"],
    ["auth", "Authentication"], ["onboarding", "Onboarding"],
  ];
  return aliases.find(([needle]) => text.includes(needle))?.[1] ?? "";
}

function directLayer(file) {
  if (/^src\/app\/api\//.test(file)) return "API route";
  if (/^src\/lib\/services\//.test(file)) return "Service layer";
  if (/^src\/lib\/stores\//.test(file) || /Store\.(?:ts|tsx)$/.test(file)) return "Store";
  if (/^src\/(?:app|components)\//.test(file)) return "Direct Supabase call in page/component";
  if (/^src\/lib\/supabase\//.test(file)) return "Unknown";
  return "Unknown";
}

function clientFileFor(sourceFile, content) {
  if (sourceFile.startsWith("src/lib/supabase/")) return sourceFile;
  if (/from\s+["']@\/lib\/supabase\/client["']/.test(content)) return "src/lib/supabase/client.ts";
  if (/from\s+["']@\/lib\/supabase\/server["']/.test(content)) return "src/lib/supabase/server.ts";
  if (/from\s+["']@supabase\/supabase-js["']|import\(["']@supabase\/supabase-js["']\)/.test(content)) {
    return `Direct @supabase/supabase-js createClient in ${sourceFile}`;
  }
  if (/createServerClient/.test(content)) return "src/lib/supabase/server.ts or middleware client - Needs WD Verification";
  if (/createBrowserClient/.test(content)) return "src/lib/supabase/client.ts";
  return "Unknown - Needs WD Verification";
}

function moduleForFile(sourceFile, moduleRows, previousRows) {
  if (/^src\/app\/api\/auth\//.test(sourceFile) || /^src\/app\/\(auth\)\//.test(sourceFile) || /OAuth|AuthProvider|AuthSync|auth\.middleware|supabase\//.test(sourceFile)) return "Authentication";
  if (/^src\/app\/api\/google-drive\//.test(sourceFile) || /FileUploader|vault/i.test(sourceFile)) return "Documents / Vault";
  if (/foundation/.test(sourceFile)) return "Profile / Foundation";
  if (/userService|profile\/route/.test(sourceFile)) return "Profile / Foundation";
  if (/onboarding/.test(sourceFile)) return "Onboarding";
  if (/layouts\/(?:BottomNav|DesktopSidebar)|GlobalTopRightMenu|UserAvatar/.test(sourceFile)) return "Shared Navigation / Authentication";
  const pageExact = moduleRows.filter((row) => row["Page File"] === sourceFile).map((row) => row.Module);
  if (pageExact.length) return compact(pageExact, 3);
  const moduleMatches = moduleRows
    .filter((row) => Object.values(row).some((value) => String(value).includes(sourceFile)))
    .map((row) => row.Module);
  if (moduleMatches.length) return compact(moduleMatches, 4);
  const previous = previousRows.filter((row) => row.File_Path === sourceFile).map((row) => row.Module_Association);
  if (previous.length) return compact(previous, 3);
  return "Unknown - Needs WD Verification";
}

function featureFor(operation, sourceFile, previousRows) {
  const method = operation.method;
  if (operation.kind === "client") return "Initialize Supabase client/session boundary";
  if (operation.kind === "storage") {
    if (/foundation/.test(sourceFile)) return method === "remove" ? "Remove previous profile photo" : "Profile photo storage";
    return method === "remove" ? "Delete stored document object" : "Document upload and URL retrieval";
  }
  const known = {
    signInWithPassword: "Password login",
    getSession: /google-drive/.test(sourceFile) ? "Authorize Google Drive request" : "Read or restore current session",
    getUser: "Resolve authenticated user",
    signOut: "Logout and clear session",
    setSession: "Create browser session from tokens",
    updateUser: "Update Supabase Auth user metadata or password",
    onAuthStateChange: "Restore and monitor auth session",
    resend: "Resend email verification",
    resetPasswordForEmail: "Request password recovery",
    generateLink: "Generate administrative auth link",
    listUsers: "Find Supabase Auth user during Google callback",
    createUser: "Create Supabase Auth user during Google callback",
    getUserById: "Read Supabase Auth user metadata",
    updateUserById: "Synchronize Supabase Auth user metadata",
    deleteUser: "Delete Supabase Auth user",
  };
  if (known[method]) return known[method];
  const previous = previousRows.find((row) => row.File_Path === sourceFile);
  return previous?.Purpose || `${operation.kind} ${method}`;
}

function authFields(method) {
  const read = {
    getSession: "session, user, access context",
    getUser: "authenticated user and user metadata",
    onAuthStateChange: "auth event and session",
    listUsers: "Supabase Auth user list",
    getUserById: "user id, email, user metadata",
    signInWithPassword: "session and authenticated user returned by Supabase Auth",
    generateLink: "action link and auth properties",
    createUser: "created auth user",
  };
  const written = {
    setSession: "access token and refresh token session",
    updateUser: "password or user metadata supplied by caller",
    signOut: "session/token revocation",
    resend: "verification-email request",
    resetPasswordForEmail: "password-recovery email request",
    signInWithPassword: "email and password submitted to Supabase Auth",
    generateLink: "auth action-link request",
    createUser: "email, password and user metadata",
    updateUserById: "auth user metadata",
    deleteUser: "auth user record",
  };
  return { read: read[method] ?? "Supabase Auth response - exact fields Needs WD Verification", written: written[method] ?? "None identified" };
}

function errorState(context, kind) {
  if (/catch\s*\(|if\s*\([^)]*error|throw\s+|NextResponse\.json\([^)]*error|setError\s*\(|toast\s*\([^)]*error/i.test(context)) {
    if (/console\.(?:error|warn)/.test(context) && !/setError\s*\(|toast\s*\(|NextResponse\.json|throw\s+/.test(context)) return "Partial";
    return "Yes";
  }
  if (/\.catch\s*\(|console\.(?:error|warn)|error\s*:/.test(context)) return "Partial";
  return kind === "client" ? "Unknown" : "No";
}

function loadingState(context, layer) {
  if (/setLoading\s*\(|isLoading|loading\s*[=:]/i.test(context)) return "Yes";
  if (layer === "API route" && /await\s+/.test(context)) return "Not applicable - request scoped";
  return "No";
}

function successState(context, kind) {
  if (/toast\s*\([^)]*success|setSuccess\s*\(|router\.(?:push|replace)\s*\(|NextResponse\.json|return\s+.*data/i.test(context)) return "Yes";
  if (/await\s+|\.then\s*\(/.test(context) && kind !== "client") return "Partial";
  return kind === "client" ? "Not applicable" : "No";
}

function impactValue(text, direct = false) {
  if (direct) return "Yes";
  const value = String(text ?? "").toLowerCase();
  if (/broken|missing/.test(value)) return "Broken / Missing";
  if (/high|medium|probable|impact|feed|read/.test(value)) return "Probable";
  if (/none|no direct|low/.test(value)) return "No";
  return "Needs WD Verification";
}

function relatedModulesFor(module, dependencyRows) {
  if (/Authentication/.test(module)) return "Profile / Foundation; Dashboard / Rajya; Protected routes; Documents / Vault";
  const normalized = normalizeModule(module);
  const row = dependencyRows.find((item) => normalizeModule(item.Module) === normalized);
  if (!row) return "Needs WD Verification";
  return compact([
    ...String(row.Reads_From_Modules ?? "").split(";"),
    ...String(row.Writes_For_Modules ?? "").split(";"),
  ], 8);
}

function operationPattern(operation) {
  if (operation.kind === "auth") {
    const admin = operation.client.toLowerCase().includes("admin") ? ".auth.admin" : ".auth";
    return `${operation.client}${admin}.${operation.method}(...)`;
  }
  if (operation.kind === "storage") return `${operation.client}.storage.from(${operation.resource}).${operation.method}(...)`;
  if (operation.kind === "database") return `${operation.client}.from(${operation.resource}).${operation.method}(...)`;
  if (operation.kind === "rpc") return `${operation.client}.rpc(${operation.resource}, ...)`;
  if (operation.kind === "edge") return `${operation.client}.functions.invoke(${operation.resource}, ...)`;
  return `${operation.method}(...)`;
}

function findOperations(file, content) {
  const operations = [];
  const add = (operation) => {
    const line = lineNumberAt(content, operation.index);
    operations.push({ ...operation, file, sourceFile: sourceRelative(file), line });
  };

  for (const match of content.matchAll(/([A-Za-z_$][\w$]*)\s*\.\s*auth\s*(?:\.\s*admin)?\s*\.\s*([A-Za-z_$][\w$]*)\s*\(/g)) {
    const openParen = match.index + match[0].lastIndexOf("(");
    add({ kind: "auth", client: match[1], method: match[2], resource: "Supabase Auth", index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/([A-Za-z_$][\w$]*)\s*\.\s*storage\s*\.\s*from\s*\(\s*([^)]+?)\s*\)\s*\.\s*(upload|download|remove|getPublicUrl|list|move|copy|createSignedUrl)\s*\(/gs)) {
    const openParen = match.index + match[0].lastIndexOf("(");
    add({ kind: "storage", client: match[1], method: match[3], resource: sanitizeSnippet(match[2]), index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/([A-Za-z_$][\w$]*)\s*\.\s*from\s*\(\s*([^)]+?)\s*\)\s*\.\s*(select|insert|upsert|update|delete)\s*\(/gs)) {
    if (!/supabase/i.test(match[1])) continue;
    const openParen = match.index + match[0].lastIndexOf("(");
    add({ kind: "database", client: match[1], method: match[3], resource: sanitizeSnippet(match[2]), index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/([A-Za-z_$][\w$]*)\s*\.\s*rpc\s*\(\s*([^,)]+?)/g)) {
    if (!/supabase/i.test(match[1])) continue;
    const openParen = match.index + match[0].indexOf("(");
    add({ kind: "rpc", client: match[1], method: "rpc", resource: sanitizeSnippet(match[2]), index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/([A-Za-z_$][\w$]*)\s*\.\s*functions\s*\.\s*invoke\s*\(\s*([^,)]+?)/g)) {
    const openParen = match.index + match[0].indexOf("(");
    add({ kind: "edge", client: match[1], method: "edge-function", resource: sanitizeSnippet(match[2]), index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/\b(createBrowserClient|createServerClient)\s*\(/g)) {
    const prefix = content.slice(Math.max(0, match.index - 30), match.index);
    if (/import\s*\{[^}]*$/.test(prefix)) continue;
    const openParen = match.index + match[0].indexOf("(");
    add({ kind: "client", client: match[1], method: match[1], resource: "Supabase project client", index: match.index, argument: readCallArgument(content, openParen) });
  }

  for (const match of content.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:await\s*)?createClient\s*\(/g)) {
    const openParen = match.index + match[0].lastIndexOf("(");
    add({ kind: "client", client: match[1], method: "createClient", resource: "Supabase project client", index: match.index, argument: readCallArgument(content, openParen) });
  }
  return operations;
}

const rawSearches = [
  ["supabase", /supabase/gi],
  [".from(", /\.from\s*\(/g],
  [".select(", /\.select\s*\(/g],
  [".insert(", /\.insert\s*\(/g],
  [".upsert(", /\.upsert\s*\(/g],
  [".update(", /\.update\s*\(/g],
  [".delete(", /\.delete\s*\(/g],
  [".rpc(", /\.rpc\s*\(/g],
  ["supabase.auth", /supabase(?:Admin)?\.auth/gi],
  ["supabase.storage", /supabase\.storage/gi],
  ["invoke(", /\binvoke\s*\(/g],
  ["functions.invoke", /functions\.invoke\s*\(/g],
  ["createClient", /\bcreateClient\b/g],
  ["createBrowserClient", /\bcreateBrowserClient\b/g],
  ["createServerClient", /\bcreateServerClient\b/g],
  ["NEXT_PUBLIC_SUPABASE_URL", /NEXT_PUBLIC_SUPABASE_URL/g],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", /NEXT_PUBLIC_SUPABASE_ANON_KEY/g],
];

const allFiles = await walk(sourceDir);
const codeFiles = allFiles.filter((file) => /\.(?:ts|tsx|js|jsx|mjs)$/.test(file)).sort();
const codeSourceFiles = new Set(codeFiles.map(sourceRelative));
const contentByFile = new Map();
await Promise.all(codeFiles.map(async (file) => contentByFile.set(file, await fs.readFile(file, "utf8"))));

const parsed = {};
for (const [name, file] of Object.entries(files)) {
  const text = await fs.readFile(file, "utf8");
  parsed[name] = file.endsWith(".csv") ? parseCsv(text) : text;
}

const operations = codeFiles.flatMap((file) => findOperations(file, contentByFile.get(file) ?? ""));
operations.sort((a, b) => a.sourceFile.localeCompare(b.sourceFile) || a.line - b.line || a.kind.localeCompare(b.kind));

const operationLineKeys = new Set(operations.map((operation) => `${operation.sourceFile}:${operation.line}`));
const rawRows = [];
for (const file of codeFiles) {
  const content = contentByFile.get(file) ?? "";
  const lines = content.split("\n");
  for (const [label, pattern] of rawSearches) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      const line = lineNumberAt(content, match.index);
      const snippet = sanitizeSnippet(lines[line - 1] ?? "");
      let guess = "Unknown - review adjacent code";
      let note = operationLineKeys.has(`${sourceRelative(file)}:${line}`) ? "Executable Supabase usage included in final map" : "Occurrence retained for review";
      if (/prisma\./.test(snippet)) {
        guess = "Prisma operation - not a Supabase client call";
        note = "Excluded from final Supabase operation map; retained because the required generic pattern matched";
      } else if (/Buffer\.from|Array\.from|Object\.fromEntries/.test(snippet)) {
        guess = "JavaScript/Node utility - not Supabase";
        note = "Excluded from final Supabase operation map; retained because .from( matched";
      } else if (/supabase(?:Admin)?\.auth/i.test(snippet)) guess = "Supabase Auth";
      else if (/supabase\.storage/i.test(snippet)) guess = "Supabase Storage - bucket is traced in final map";
      else if (/createBrowserClient|createServerClient|createClient/.test(snippet)) guess = "Supabase client initialization/import/reference";
      else if (/NEXT_PUBLIC_SUPABASE_/.test(snippet)) guess = "Supabase public client configuration name only";
      else if (/supabase/i.test(snippet)) guess = "Supabase reference; executable status traced separately";
      rawRows.push({
        "Source File": sourceRelative(file),
        "Line / Approx Location": `Line ${line}`,
        "Pattern Found": label,
        "Code Snippet": snippet,
        "Initial Guess Table/Bucket/Function": guess,
        "Notes": note,
      });
    }
  }
}
rawRows.sort((a, b) => a["Source File"].localeCompare(b["Source File"]) || Number(a["Line / Approx Location"].replace(/\D/g, "")) - Number(b["Line / Approx Location"].replace(/\D/g, "")) || a["Pattern Found"].localeCompare(b["Pattern Found"]));

const storageBucketNames = new Set(parsed.storageBuckets.map((row) => row.name || row.id));
const rlsText = await fs.readFile(files.rlsPolicies, "utf8");
const schemaText = `${parsed.databaseTypes}\n${parsed.schemaSql}`;

const preliminaryRows = operations.map((operation, index) => {
  const content = contentByFile.get(operation.file) ?? "";
  const sourceFile = operation.sourceFile;
  const module = moduleForFile(sourceFile, parsed.moduleMap, parsed.previousMap);
  const functionName = functionAt(content, operation.line);
  const context = linesAround(content, operation.line, 45);
  const layer = directLayer(sourceFile);
  const clientFile = clientFileFor(sourceFile, content);
  const dependency = parsed.dependencies.find((row) => normalizeModule(row.Module) === normalizeModule(module));
  const arg = operation.argument || "No payload argument";
  const literalResource = /^["'`].*["'`]$/.test(operation.resource);
  const cleanResource = operation.resource.replace(/^["'`]|["'`]$/g, "");
  const auth = operation.kind === "auth" ? authFields(operation.method) : { read: "None identified", written: "None identified" };
  let fieldsRead = auth.read;
  let fieldsWritten = auth.written;
  let filters = "No database row filter applicable";
  let payload = "Not applicable";
  let deleteBehaviour = "No delete operation in this usage";
  let rpcEdge = "None";
  let storageBucket = "None";
  let authUsage = operation.kind === "auth" ? `${operation.method}; ${/admin/i.test(operation.client) ? "admin auth context" : "user/session auth context"}` : "None";
  let tableResource = operation.kind === "auth" ? "Supabase Auth" : operation.kind === "client" ? "Supabase project client" : cleanResource;

  if (operation.kind === "client") {
    fieldsRead = /Browser|Server/.test(operation.method) ? "NEXT_PUBLIC_SUPABASE_URL; NEXT_PUBLIC_SUPABASE_ANON_KEY; cookie context for server client where applicable" : "Client configuration or imported helper";
    fieldsWritten = "None - client initialization only";
    filters = "Client context and cookie/session options; exact runtime values not included";
    payload = arg;
  } else if (operation.kind === "auth") {
    payload = /update|create|setSession|signIn|resend|reset|generate/i.test(operation.method) ? arg : "Not applicable";
    filters = /ById/.test(operation.method) ? `Auth user ID argument: ${arg}` : /getSession|getUser|signOut|onAuth/.test(operation.method) ? "Current browser/server session or cookie context" : "Auth method conditions in caller; Needs WD Verification";
    if (operation.method === "signOut") deleteBehaviour = "Revokes/clears current auth session; does not delete application records";
    if (operation.method === "deleteUser") deleteBehaviour = `Deletes Supabase Auth user identified by ${arg}; downstream Prisma/data cleanup requires WD verification`;
  } else if (operation.kind === "storage") {
    tableResource = `storage bucket: ${cleanResource}`;
    storageBucket = literalResource ? cleanResource : `${cleanResource} - runtime variable; Needs WD Verification`;
    filters = `Bucket ${cleanResource}; object/path argument ${arg}`;
    payload = ["upload", "move", "copy"].includes(operation.method) ? arg : "Not applicable";
    fieldsRead = ["download", "getPublicUrl", "list", "createSignedUrl"].includes(operation.method) ? "storage object path and returned URL/object metadata" : "None identified";
    fieldsWritten = ["upload", "move", "copy"].includes(operation.method) ? "storage object path and file bytes/options" : "None identified";
    if (operation.method === "remove") deleteBehaviour = `Deletes storage object path(s): ${arg}; metadata/rollback cleanup Needs WD Verification`;
  } else if (operation.kind === "database") {
    tableResource = cleanResource;
    const segment = content.slice(operation.index, operation.index + 900);
    const conditions = [...segment.matchAll(/\.(eq|neq|gt|gte|lt|lte|in|is|order|limit|match)\s*\(([^)]*)\)/g)].map((match) => `.${match[1]}(${sanitizeSnippet(match[2])})`);
    filters = conditions.length ? compact(conditions, 8) : "No ownership filter visible - Needs Himanshu Verification";
    fieldsRead = operation.method === "select" ? (arg || "* - all fields selected") : "None identified";
    fieldsWritten = ["insert", "upsert", "update"].includes(operation.method) ? `Payload fields from ${arg}` : "None identified";
    payload = ["insert", "upsert", "update"].includes(operation.method) ? arg : "Not applicable";
    if (operation.method === "delete") deleteBehaviour = `Deletes rows from ${cleanResource} using: ${filters}`;
  } else if (operation.kind === "rpc" || operation.kind === "edge") {
    rpcEdge = cleanResource;
    tableResource = `${operation.kind === "rpc" ? "rpc" : "edge function"}: ${cleanResource}`;
    payload = arg;
    fieldsRead = "Function response fields - Needs WD Verification";
    fieldsWritten = "Function side effects - Needs WD Verification";
  }

  const adminBoundary = /supabaseAdmin|service role|SERVICE_ROLE/i.test(`${operation.client} ${content.slice(Math.max(0, operation.index - 1000), operation.index + 1000)}`);
  let rlsRisk = "No direct table/storage permission check in this client initialization; downstream calls determine risk";
  if (operation.kind === "storage") {
    rlsRisk = rlsText.includes("auth.role() = 'authenticated'")
      ? "Supplied storage policy checks authenticated role but no per-user object ownership condition is visible - Needs Himanshu Verification"
      : "Storage RLS/policy match not found in supplied export - Needs Himanshu Verification";
  } else if (operation.kind === "database") {
    rlsRisk = /user_id|userId|auth\.uid/.test(filters)
      ? "Ownership filter visible; RLS parity still Needs Himanshu Verification"
      : "No user ownership filter visible; depends on RLS - Needs Himanshu Verification";
  } else if (adminBoundary) rlsRisk = "Administrative/service-role boundary can bypass RLS; authorization and key isolation Need Himanshu/Harsh Verification";
  else if (operation.kind === "auth") rlsRisk = "Supabase Auth endpoint; public-table RLS is not the direct boundary, but session/profile authorization Needs Himanshu Verification";

  const dashboardImpact = /Authentication|Navigation|Dashboard/.test(module) ? "Yes" : impactValue(dependency?.Dashboard_Impact);
  const reminderImpact = /Authentication|Navigation|Onboarding/.test(module)
    ? "No"
    : impactValue(dependency?.Reminder_Impact, /notification|reminder/i.test(sourceFile));
  const vaultDirect = operation.kind === "storage" && /FileUploader|vault/i.test(sourceFile);
  const documentImpact = vaultDirect ? "Yes" : operation.kind === "storage" ? "Probable" : /Authentication/.test(module) ? "Probable" : impactValue(dependency?.Document_Vault_Impact);
  const authSecurityImpact = adminBoundary
    ? "High - administrative auth client and service-role boundary"
    : operation.kind === "auth"
      ? "High - session, credential, redirect or user lifecycle behavior"
      : operation.kind === "storage"
        ? "High - authenticated bucket access and object ownership policy"
        : operation.kind === "client"
          ? "High - client/session construction boundary"
          : "Needs WD Verification";
  const dataLossRisk = operation.method === "deleteUser" || operation.method === "remove" ? "High" : /updateUser|setSession|upload|createUser/.test(operation.method) ? "Medium" : "Low";
  const calculationRisk = operation.kind === "database" || operation.kind === "rpc" ? "Needs WD Verification" : "Low - no calculation logic in this usage";
  const sharedService = layer === "Service layer" ? sourceFile : clientFile;
  const hardcodedRisk = ["database", "storage", "rpc", "edge"].includes(operation.kind)
    ? literalResource
      ? `Yes - literal resource name ${cleanResource} is embedded in code`
      : `No literal resource; runtime value ${cleanResource} Needs WD Verification`
    : "No database table/field literal in this auth/client usage";
  const bucketCheck = operation.kind === "storage" && literalResource
    ? storageBucketNames.has(cleanResource)
      ? `Bucket ${cleanResource} appears in SUPABASE_STORAGE_BUCKETS.csv`
      : `Bucket ${cleanResource} not found in supplied bucket export - Needs WD Verification`
    : operation.kind === "storage"
      ? "Runtime bucket variable cannot be cross-checked statically"
      : "Not applicable";
  const schemaCheck = operation.kind === "database"
    ? schemaText.includes(cleanResource)
      ? `Resource ${cleanResource} appears in supplied schema/types evidence`
      : `Code resource ${cleanResource} not found in supplied schema/types - Needs WD Verification`
    : "No direct Supabase public-table query in this usage";
  const error = errorState(context, operation.kind);
  const loading = loadingState(context, layer);
  const success = successState(context, operation.kind);
  const nextAction = adminBoundary
    ? "Himanshu/Harsh to verify server-only authorization, service-role key isolation and audit logging"
    : operation.kind === "storage"
      ? "Verify bucket RLS, per-user object paths, metadata creation, failure cleanup and delete rollback with dummy files"
      : operation.kind === "auth"
        ? "Run isolated dummy-user auth flow and verify redirects, cookies, profile synchronization, error UI and logout/session restoration"
        : operation.kind === "client"
          ? "WD to confirm this is an approved canonical client path and verify environment/session separation"
          : "WD to verify ownership filters, RLS, payload fields, downstream refresh and failure handling with dummy data";

  return {
    _operation: operation,
    "Usage ID": `SBU-${String(index + 1).padStart(3, "0")}`,
    "Module": module,
    "Feature / Flow": featureFor(operation, sourceFile, parsed.previousMap),
    "Source File": sourceFile,
    "Function / Component Name": functionName,
    "Supabase Client File": clientFile,
    "Supabase Operation Type": operation.kind === "auth" ? "auth" : operation.kind === "storage" ? ({ upload: "storage-upload", download: "storage-download", remove: "storage-delete" }[operation.method] ?? "storage-download") : operation.kind === "database" ? operation.method : operation.kind === "rpc" ? "rpc" : operation.kind === "edge" ? "edge-function" : "unknown",
    "Code Pattern Found": operationPattern(operation),
    "Table / Function / Bucket": tableResource,
    "Fields Read": fieldsRead,
    "Fields Written": fieldsWritten,
    "Filters / Conditions Used": filters,
    "Insert / Update Payload Source": payload,
    "Delete Behaviour": deleteBehaviour,
    "RPC / Edge Function Name": rpcEdge,
    "Storage Bucket": storageBucket,
    "Auth Usage": authUsage,
    "Error Handling Present": error,
    "Loading State Present": loading,
    "Success Handling Present": success,
    "Related Modules": relatedModulesFor(module, parsed.dependencies),
    "Dashboard Impact": dashboardImpact,
    "Reminder Impact": reminderImpact,
    "Document Vault Impact": documentImpact,
    "Auth / Security Impact": authSecurityImpact,
    "Data Loss Risk": dataLossRisk,
    "Calculation Risk": calculationRisk,
    "Shared Service Used": sharedService,
    "Direct Call or Service Layer": layer,
    "Duplicate Logic Risk": "Pending duplicate count",
    "Hardcoded Table / Field Risk": hardcodedRisk,
    "RLS / Permission Risk": rlsRisk,
    "Evidence / Code Reference": `${sourceFile}:${operation.line}; ${functionName}; ${operationPattern(operation)}; ${schemaCheck}; ${bucketCheck}`,
    "Confidence": "Strong Evidence",
    "Needs WD Verification": "Yes",
    "Recommended Next Action": nextAction,
    "Notes": `Static source evidence only. ${schemaCheck}. ${bucketCheck}. Safety basis: AUDIT_WORKSPACE_SAFETY_CHECKLIST.md; no live connection used.`,
  };
});

const duplicateGroups = new Map();
for (const row of preliminaryRows) {
  const key = `${row["Supabase Operation Type"]}|${row["Table / Function / Bucket"]}|${row._operation.method}`;
  if (!duplicateGroups.has(key)) duplicateGroups.set(key, []);
  duplicateGroups.get(key).push(row);
}
for (const rows of duplicateGroups.values()) {
  const distinctFiles = unique(rows.map((row) => row["Source File"]));
  for (const row of rows) {
    row["Duplicate Logic Risk"] = rows.length > 1
      ? `Yes - ${rows.length} similar usages across ${distinctFiles.length} file(s); verify whether shared helper/service should be authoritative`
      : "No duplicate operation found by static operation/resource grouping";
  }
}

const mapRows = preliminaryRows.map(({ _operation, ...row }) => row);
const rawCsv = toCsv(rawHeaders, rawRows);
const mapCsv = toCsv(mapHeaders, mapRows);
await fs.writeFile(outputs.raw, rawCsv, "utf8");
await fs.writeFile(outputs.map, mapCsv, "utf8");

const rawWorkbook = await Workbook.fromCSV(rawCsv, { sheetName: "Raw Occurrences" });
const mapWorkbook = await Workbook.fromCSV(mapCsv, { sheetName: "Supabase Usage" });
const rawInspect = await rawWorkbook.inspect({ kind: "table", range: "Raw Occurrences!A1:F8", include: "values", tableMaxRows: 8, tableMaxCols: 6, maxChars: 9000 });
const mapInspect = await mapWorkbook.inspect({ kind: "table", range: "Supabase Usage!A1:AK6", include: "values", tableMaxRows: 6, tableMaxCols: 37, maxChars: 14000 });

const allowed = {
  operations: new Set(["select", "insert", "upsert", "update", "delete", "rpc", "auth", "storage-upload", "storage-download", "storage-delete", "edge-function", "unknown"]),
  confidence: new Set(["Confirmed", "Strong Evidence", "Probable", "Unconfirmed"]),
  yesNo: new Set(["Yes", "No"]),
  error: new Set(["Yes", "No", "Partial", "Unknown"]),
  impact: new Set(["Yes", "No", "Probable", "Broken / Missing", "Needs WD Verification"]),
  layer: new Set(["Direct Supabase call in page/component", "Service layer", "API route", "Store", "Unknown"]),
};

const errors = [];
if (mapHeaders.length !== 37) errors.push(`Expected 37 headers; found ${mapHeaders.length}`);
if (new Set(mapRows.map((row) => row["Usage ID"])).size !== mapRows.length) errors.push("Usage IDs are not unique");
for (const [index, row] of mapRows.entries()) {
  const line = index + 2;
  if (!allowed.operations.has(row["Supabase Operation Type"])) errors.push(`Line ${line}: invalid operation type`);
  if (!allowed.confidence.has(row.Confidence)) errors.push(`Line ${line}: invalid confidence`);
  if (row.Confidence === "Confirmed") errors.push(`Line ${line}: unsupported Confirmed value`);
  if (!allowed.yesNo.has(row["Needs WD Verification"])) errors.push(`Line ${line}: invalid WD verification value`);
  if (!allowed.error.has(row["Error Handling Present"])) errors.push(`Line ${line}: invalid error handling value`);
  if (!allowed.layer.has(row["Direct Call or Service Layer"])) errors.push(`Line ${line}: invalid direct/service layer value`);
  for (const field of ["Dashboard Impact", "Reminder Impact", "Document Vault Impact"]) {
    if (!allowed.impact.has(row[field])) errors.push(`Line ${line}: invalid ${field}`);
  }
  if (!row["Source File"] || !codeSourceFiles.has(row["Source File"])) errors.push(`Line ${line}: source path not found in snapshot`);
  if (!row["Evidence / Code Reference"] || !row["Recommended Next Action"]) errors.push(`Line ${line}: missing evidence/action`);
}

const countBy = (field) => Object.fromEntries(unique(mapRows.map((row) => row[field])).sort().map((value) => [value, mapRows.filter((row) => row[field] === value).length]));
const rawPatternCounts = Object.fromEntries(rawSearches.map(([label]) => [label, rawRows.filter((row) => row["Pattern Found"] === label).length]));
const variableBucketRows = mapRows.filter((row) => row["Storage Bucket"].includes("runtime variable"));
const adminRows = mapRows.filter((row) => row["RLS / Permission Risk"].includes("Administrative/service-role"));
const noErrorRows = mapRows.filter((row) => ["No", "Partial"].includes(row["Error Handling Present"]));
const noLoadingRows = mapRows.filter((row) => row["Loading State Present"] === "No");
const noSuccessRows = mapRows.filter((row) => row["Success Handling Present"] === "No");
const directPageRows = mapRows.filter((row) => row["Direct Call or Service Layer"] === "Direct Supabase call in page/component");
const duplicateRows = mapRows.filter((row) => row["Duplicate Logic Risk"].startsWith("Yes"));
const directDatabaseRows = mapRows.filter((row) => ["select", "insert", "upsert", "update", "delete"].includes(row["Supabase Operation Type"]));
const rpcRows = mapRows.filter((row) => row["Supabase Operation Type"] === "rpc");
const edgeRows = mapRows.filter((row) => row["Supabase Operation Type"] === "edge-function");

const gapsText = `# Supabase Code Usage Gaps\n\n` +
`Date: 2026-07-20\n\n` +
`Status: Draft - Pending WD Verification, Runtime Permission Evidence and Gap Cleanup\n\n` +
`## Coverage\n\n` +
`- Raw pattern occurrences retained: ${rawRows.length}.\n` +
`- Executable Supabase operations mapped: ${mapRows.length}.\n` +
`- Distinct source files in final map: ${unique(mapRows.map((row) => row["Source File"])).length}.\n` +
`- Exact final-map headers: 37/37.\n` +
`- Confidence: ${JSON.stringify(countBy("Confidence"))}. No row is Confirmed.\n` +
`- Every row is marked Needs WD Verification = Yes.\n\n` +
`## Static Search Result\n\n` +
`- Pattern counts in RAW_SUPABASE_OCCURRENCES.csv: ${JSON.stringify(rawPatternCounts)}.\n` +
`- Direct Supabase public-table query rows: ${directDatabaseRows.length}. In this snapshot, relational application data is accessed through Prisma; generic .update/.delete/.upsert matches were retained in the raw file and identified as non-Supabase where evidenced.\n` +
`- RPC rows: ${rpcRows.length}. Edge Function rows: ${edgeRows.length}. Absence in this snapshot is not proof of absence in the live deployment.\n\n` +
`## Gaps and Risks\n\n` +
`- ${directPageRows.length} operations occur directly in pages/components rather than an API/service boundary.\n` +
`- ${duplicateRows.length} rows belong to repeated operation/resource groups, especially session reads, logout and client creation. Canonical ownership needs WD review.\n` +
`- ${adminRows.length} rows use an administrative/service-role auth boundary that can bypass RLS. Server-only authorization, key isolation and audit logging need Himanshu/Harsh verification. No key value is included in this audit.\n` +
`- ${variableBucketRows.length} storage rows use a runtime bucket variable and cannot be matched conclusively to SUPABASE_STORAGE_BUCKETS.csv.\n` +
`- The supplied storage policy checks authenticated role but does not visibly enforce per-user object-path ownership. Live policy parity and intended isolation need Himanshu verification.\n` +
`- Error handling is No or Partial on ${noErrorRows.length} rows; loading state is absent on ${noLoadingRows.length} rows; success handling is absent on ${noSuccessRows.length} rows. Static surrounding-code detection can miss behavior delegated to callers, so these remain WD verification items.\n` +
`- Storage upload/public URL flows need runtime confirmation that metadata creation, failed-upload cleanup, old-object deletion and document-vault refresh are consistent.\n` +
`- Multiple client boundaries exist: browser helper, server helper, middleware client and direct administrative @supabase/supabase-js clients. Session and authorization consistency need WD/security review.\n\n` +
`## WD / Himanshu / Harsh Verification Questions\n\n` +
`1. Are src/lib/supabase/client.ts, server.ts and middleware.ts the only approved non-admin client factories?\n` +
`2. Are all direct administrative createClient usages guaranteed to execute server-side with route-level authorization and audit logging?\n` +
`3. Does the live storage policy isolate objects by authenticated user path, not only by authenticated role?\n` +
`4. What runtime value is passed as FileUploader's bucket/folder variable, and does that bucket exist in the live project?\n` +
`5. Should profile-photo and document uploads create or update document_meta records, and what rollback is expected when either side fails?\n` +
`6. Are repeated getSession/getUser/signOut implementations intentional, or should an approved shared auth helper own them?\n` +
`7. Are redirect URLs derived safely and consistently across login, recovery, verification and Google callback flows?\n` +
`8. Can WD reproduce every auth/storage flow with dummy users/files and attach sanitized evidence before confidence is promoted?\n` +
`9. Can Himanshu confirm live RLS/storage-policy parity with the supplied exports?\n` +
`10. Can Harsh/Himanshu explicitly approve any row that should move from Strong Evidence to Confirmed?\n\n` +
`## Safety and Limitations\n\n` +
`- Source files were read only; no application code, migrations or production commands were used.\n` +
`- No GitHub, Supabase, Vercel, Google Cloud or other external connection was used.\n` +
`- No password, service-role key value, connection string, OAuth secret or production user/financial data is included.\n` +
`- Findings are based on the local source snapshot and supplied exports; live parity is Needs WD Verification.\n`;
await fs.writeFile(outputs.gaps, gapsText, "utf8");

const validationText = `# Supabase Code Usage Map Validation\n\n` +
`Date: 2026-07-20\n\n` +
`Result: ${errors.length ? "FAILED" : "PASSED"}\n\n` +
`## Checks\n\n` +
`- Exact required headers: ${mapHeaders.length}/37\n` +
`- Final usage rows: ${mapRows.length}\n` +
`- Raw occurrence rows: ${rawRows.length}\n` +
`- Unique Usage IDs: ${new Set(mapRows.map((row) => row["Usage ID"])).size}/${mapRows.length}\n` +
`- Unsupported Confirmed rows: ${mapRows.filter((row) => row.Confidence === "Confirmed").length}\n` +
`- Rows requiring WD verification: ${mapRows.filter((row) => row["Needs WD Verification"] === "Yes").length}\n` +
`- Validation errors: ${errors.length}\n` +
`- Artifact-tool structural inspection completed for both CSVs: ${rawInspect.ndjson && mapInspect.ndjson ? "Yes" : "No"}\n` +
`- Source application files modified: No\n` +
`- External connection used: No\n` +
`- Secret or production-data value intentionally included: No\n\n` +
`## Controlled Values\n\n` +
`- Supabase Operation Type: ${JSON.stringify(countBy("Supabase Operation Type"))}\n` +
`- Confidence: ${JSON.stringify(countBy("Confidence"))}\n` +
`- Error Handling Present: ${JSON.stringify(countBy("Error Handling Present"))}\n` +
`- Direct Call or Service Layer: ${JSON.stringify(countBy("Direct Call or Service Layer"))}\n` +
`- Dashboard Impact: ${JSON.stringify(countBy("Dashboard Impact"))}\n` +
`- Reminder Impact: ${JSON.stringify(countBy("Reminder Impact"))}\n` +
`- Document Vault Impact: ${JSON.stringify(countBy("Document Vault Impact"))}\n\n` +
`## Errors\n\n` +
(errors.length ? errors.map((error) => `- ${error}`).join("\n") : "- None") + "\n";
await fs.writeFile(outputs.validation, validationText, "utf8");

console.log(JSON.stringify({
  rawRows: rawRows.length,
  mapRows: mapRows.length,
  sourceFiles: unique(mapRows.map((row) => row["Source File"])).length,
  operationCounts: countBy("Supabase Operation Type"),
  layerCounts: countBy("Direct Call or Service Layer"),
  directDatabaseRows: directDatabaseRows.length,
  rpcRows: rpcRows.length,
  edgeRows: edgeRows.length,
  adminRows: adminRows.length,
  variableBucketRows: variableBucketRows.length,
  validationErrors: errors,
}, null, 2));

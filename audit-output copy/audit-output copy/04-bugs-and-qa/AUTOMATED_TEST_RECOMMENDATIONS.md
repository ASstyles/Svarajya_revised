# Automated Test Recommendations

## Current test baseline

The source snapshot has no configured test script, Vitest/Jest/Playwright dependency, or test runner configuration in `package.json`. One standalone file exists at `src/lib/subscriptionMetrics.test.js`, but the repository does not provide a command that executes it. The files under `audit-output/05-test-drafts/` are review drafts only and were not added to or executed against the application.

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

- **API:** anonymous requests to `/api/auth/create-user` and profile writes must fail.
- **API/unit:** Google OAuth state must reject tampering, replay, expiry, and session mismatch.
- **E2E:** recovery link must land on `/reset-password`, consume its fixture session, and permit one password change.
- **E2E/component:** OTP failure must not silently discard mobile or trap profile editing.
- **Database validation:** verify preview/test isolation by sanitized identifiers before any write suite.

### 2. Data persistence and schema parity

- Contract-test every form payload against its route/service/Prisma column mapping.
- Add an API smoke test for every CRUD route using transaction-scoped dummy rows.
- Fail CI when Prisma fields differ from isolated database metadata, especially `subscriptions`.
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
3. Wrap API/database tests in transactions and roll them back; assert cleanup in `afterEach`.
4. Freeze time for renewal, EMI, tax, and date-validation tests.
5. Store screenshots/traces as CI artifacts only after sanitizing tokens, emails, headers, and URLs.
6. Keep production environment variables unavailable to the test job by construction.

## Draft test inventory

- `fixtures/dummy-data.ts`: shared dummy fixtures.
- `unit/calculation-engine.test.ts`, `unit/subscription-metrics.test.ts`, `unit/reminder-engine.test.ts`.
- `component/family-member-form.test.tsx`.
- `api/auth-boundaries.test.ts`, `api/subscriptions-route.test.ts`, `api/education-loan-mapping.test.ts`.
- `e2e/auth-recovery.spec.ts`, `e2e/core-financial-journeys.spec.ts`, `e2e/document-vault.spec.ts`.
- `database/schema-validation.test.ts`, `database/nominee-consistency.sql`.
- Draft `vitest.config.ts` and `playwright.config.ts` are included for WD review.

## Adoption gate

WD must confirm module aliases, route handler mocking strategy, database test container/emulator, and CI platform before moving any draft into the application. The first executable milestone should cover ARC-01/02/03, NB-014, and the pure calculation/reminder units; E2E adoption follows after isolated auth/storage providers are available.

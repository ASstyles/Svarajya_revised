# Draft Tests - Not Executed

These files are audit drafts only. They live outside the application source and were not executed because the snapshot has no configured Vitest/Playwright stack.

Rules for adoption:

- WD review is required before moving or adapting any draft.
- Use an isolated test database/emulator and dummy data only.
- Never load production credentials or call real Google, Supabase, Firebase, Vercel, or Drive services.
- Confirm path aliases, component props, route mocks, and CI environment before execution.
- Database SQL is read-only or transaction/rollback oriented; it is not a migration.

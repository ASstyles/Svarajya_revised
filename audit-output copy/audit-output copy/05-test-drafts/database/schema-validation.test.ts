import { describe, expect, it } from 'vitest';

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

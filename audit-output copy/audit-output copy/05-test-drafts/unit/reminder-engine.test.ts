import { describe, expect, it, vi } from 'vitest';
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

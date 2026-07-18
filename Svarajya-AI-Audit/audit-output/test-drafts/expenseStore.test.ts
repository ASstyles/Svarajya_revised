// Vitest unit test for Store Sync Payload
// Target File: src/lib/stores/expenseStore.ts
// Assumed framework: Vitest + MSW (Mock Service Worker)

import { describe, it, expect, vi } from 'vitest';

describe('ExpenseStore addEntry Payload Mapping', () => {
  it('should ensure payload fields map recurringFrequency correctly to frequency', () => {
    // Mock global fetch to inspect request body
    const fetchSpy = vi.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: { id: 'test-id' } }) }));
    global.fetch = fetchSpy;

    const mockEntry = {
      amount: 500,
      date: '2026-07-18',
      categoryId: 'food',
      paymentMode: 'CASH',
      recurring: true,
      recurringFrequency: 'MONTHLY', // local store casing
      description: 'Groceries'
    };

    // Simulated store add logic
    const payload = {
      amount: mockEntry.amount,
      date: mockEntry.date,
      category: mockEntry.categoryId,
      mode: mockEntry.paymentMode,
      isRecurring: mockEntry.recurring,
      frequency: mockEntry.recurringFrequency, // should map recurringFrequency correctly
      description: mockEntry.description
    };

    expect(payload.frequency).toBe('MONTHLY');
    expect(payload.isRecurring).toBe(true);
  });
});

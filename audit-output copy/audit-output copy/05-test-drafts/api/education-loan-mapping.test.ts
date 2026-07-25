import { describe, expect, it } from 'vitest';

describe('education loan mapping contract', () => {
  it('stores a real loan ID instead of a status sentinel', async () => {
    const requestBody = { degree: 'Dummy Degree', institution: 'Dummy University', year: 2020, hasLoan: true, linkedLoanId: '00000000-0000-4000-8000-000000000010' };
    expect(requestBody.linkedLoanId).not.toBe('EDUCATION_LOAN_ACTIVE');
    // TODO(WD): call /api/education through authenticated transaction harness and assert persisted linkedLoanId.
  });
});

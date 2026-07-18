// Vitest unit test for input validator helper methods
// Setup required: npm i -D vitest

import { describe, it, expect } from 'vitest';

// Simulating the validators required to fix Bugs 38 and 39
export function validatePhone(phone: string): boolean {
  // Numeric only, exactly 10 digits
  const regex = /^\d{10}$/;
  return regex.test(phone);
}

export function validateDOB(dobString: string, now: Date = new Date()): boolean {
  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) return false;
  
  // Cannot be in the future
  if (dob > now) return false;
  
  // Must be 18 or older
  const ageLimit = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return dob <= ageLimit;
}

describe('Form Validation Functions', () => {
  describe('Phone Validator', () => {
    it('accepts valid 10-digit numbers', () => {
      expect(validatePhone('9876543210')).toBe(true);
    });

    it('rejects numbers longer than 10 digits', () => {
      expect(validatePhone('987654321000')).toBe(false);
    });

    it('rejects alphabetic characters', () => {
      expect(validatePhone('98765abcde')).toBe(false);
    });
  });

  describe('DOB Validator', () => {
    it('rejects future birthdates', () => {
      const now = new Date('2026-07-18');
      expect(validateDOB('2027-01-01', now)).toBe(false);
    });

    it('rejects users under 18 years old', () => {
      const now = new Date('2026-07-18');
      expect(validateDOB('2015-05-05', now)).toBe(false);
    });

    it('accepts adults over 18 years old', () => {
      const now = new Date('2026-07-18');
      expect(validateDOB('2000-01-01', now)).toBe(true);
    });
  });
});

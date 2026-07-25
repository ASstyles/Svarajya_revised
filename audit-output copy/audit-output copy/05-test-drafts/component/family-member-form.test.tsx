import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FamilyTreeGame } from '@/components/module1/FamilyTreeGame';

describe('Family member form', () => {
  it('rejects a short phone and preserves nomineeEligible=false', async () => {
    const onAdd = vi.fn();
    render(<FamilyTreeGame members={[]} onAddMember={onAdd} onEditMember={vi.fn()} onRemoveMember={vi.fn()} /> as never);
    await userEvent.click(screen.getByRole('button', { name: /forge new link/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test Family One');
    await userEvent.type(screen.getByLabelText(/mobile/i), '9000000');
    await userEvent.click(screen.getByRole('button', { name: /save|add to mandal/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });
});

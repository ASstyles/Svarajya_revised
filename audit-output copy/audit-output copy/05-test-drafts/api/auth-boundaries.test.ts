import { describe, expect, it, vi } from 'vitest';

describe('authentication API boundaries', () => {
  it('rejects unsigned or tampered Google link state', async () => {
    const callback = await import('@/app/api/auth/google-callback/route');
    const req = new Request('http://localhost/api/auth/google-callback?code=dummy-code&state=dGFtcGVyZWQ=');
    const response = await callback.GET(req as never);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('rejects anonymous user creation', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    const route = await import('@/app/api/auth/create-user/route');
    const req = new Request('http://localhost/api/auth/create-user', { method: 'POST', body: JSON.stringify({ id: 'dummy-id', email: 'dummyuser@example.com' }) });
    const response = await route.POST(req as never);
    expect([401, 403]).toContain(response.status);
  });
});

import { request } from 'playwright/test';

const DEFAULT_BASE_URL = 'https://goal-tracker-api.onrender.com';

export default async function globalSetup() {
  if (process.env.SKIP_API_SETUP) return;
  const baseURL = process.env.API_BASE_URL ?? DEFAULT_BASE_URL;
  const ctx = await request.newContext({ baseURL });

  const deadline = Date.now() + 90_000;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      const res = await ctx.get('/api/v1/status', { timeout: 30_000 });
      if (res.ok()) {
        await ctx.dispose();
        return;
      }
      lastError = `status ${res.status()}`;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 3_000));
  }

  await ctx.dispose();
  throw new Error(`Goal-tracker API did not become ready within 90s. Last error: ${String(lastError)}`);
}
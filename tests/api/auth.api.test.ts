import {expect, test} from '@playwright/test';

const supabaseUrl = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_PUBLISHABLE_KEY;

test.describe('BAC-7 Auth API', () => {
  test('login without captcha token returns 400 captcha_failed', async ({ request }) => {
    if (!supabaseUrl || !apiKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in .env');
    } 
    
    const response = await request.post(`${supabaseUrl}/auth/v1/token?grant_type=password`,{
      headers: {apikey: apiKey},
      data: { email: 'invalid@example.com', password: 'wrong-password' },
  }); 
  
  expect(response.status()).toBe(400);

  const body = await response.json();
    expect(body.error_code).toBe('captcha_failed');

  });
});

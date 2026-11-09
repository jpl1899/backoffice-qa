import { expect, test as setup } from "@playwright/test";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const authFile = "playwright/.auth/admin.json";

setup.setTimeout(120_000); // Render free tier can take ~1 min to wake up

setup("authenticate as whitelisted admin", async ({ page }) => {
  // Arrange: env check, magic link, session cookies
  if (!supabaseUrl || !publishableKey || !secretKey || !adminEmail) {
    throw new Error("Missing Supabase or ADMIN_EMAIL env vars in .env");
  }

  const admin = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false },
  });
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: adminEmail,
  });
  if (error) throw error;

  const cookies: { name: string; value: string }[] = [];
  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll: () => [],
      setAll: (toSet) => {
        cookies.push(...toSet);
      },
    },
  });
  const { error: otpError } = await supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: data.properties.hashed_token,
  });
  if (otpError) throw otpError;
  await page.context().addCookies(
    cookies.map(({ name, value }) => ({
      name,
      value,
      url: process.env.WEB_URL!,
    })),
  );

  // Act: open a protected page with that session
  await page.goto("/usuarios");

  // Assert: the session is valid and the admin is let in
  await expect(page.getByRole("heading", { name: "Usuarios" })).toBeVisible({
    timeout: 90_000,
  });

  await expect(page).toHaveURL(/\/usuarios$/);
  await expect(page.getByRole("heading", { name: "Usuarios" })).toBeVisible();

  // Save session for other tests
  await page.context().storageState({ path: authFile });
});

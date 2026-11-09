import { expect, test } from "@playwright/test";

// These tests need a browser with no session, so drop the admin storageState.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("BAC-7 Admin Access (no session)", () => {
  test("visiting /usuarios without a session redirects to login", async ({
    page,
  }) => {
    await page.goto("/usuarios");

    await expect(page).toHaveURL(/\/login\?redirect=%2Fusuarios$/);
    await expect(page.getByRole("button", { name: "Ingresar" })).toBeVisible();
  });
});

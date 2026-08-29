import { test, expect } from "@playwright/test";

test("admin route redirects to login when unauthenticated", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});

test("admin login form renders", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.getByRole("heading", { name: /Admin Claris & Travel/i })).toBeVisible();
  await expect(page.getByLabel(/Email/i)).toBeVisible();
  await expect(page.getByLabel(/Password/i)).toBeVisible();
});

test("login with wrong credentials shows error", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel(/Email/i).fill("wrong@example.com");
  await page.getByLabel(/Password/i).fill("wrongpassword");
  await page.getByRole("button", { name: /Masuk/i }).click();
  await expect(page.getByText(/Email atau password salah/i)).toBeVisible();
});

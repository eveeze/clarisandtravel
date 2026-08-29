import { test, expect } from "@playwright/test";

test("homepage loads with hero and key sections", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Claris & City Tour Jogja/);
  await expect(page.getByRole("heading", { name: /Jelajahi|Yogyakarta/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Lihat Paket Tour/i }).first()).toBeVisible();
});

test("navigation works between pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Paket Tour" }).first().click();
  await expect(page).toHaveURL(/\/tours-pricing/);
  await expect(page.getByRole("heading", { name: /Pilih/i }).first()).toBeVisible();
});

test("mobile menu opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /Toggle menu/i }).click();
  await expect(page.getByRole("link", { name: "Destinasi" }).first()).toBeVisible();
});

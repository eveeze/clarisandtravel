import { test, expect } from "@playwright/test";

test("tours pricing page shows package list", async ({ page }) => {
  await page.goto("/tours-pricing");
  await expect(page.getByRole("heading", { name: /Pilih Petualanganmu/i })).toBeVisible();
  await expect(page.getByText("Populer").first()).toBeVisible();
});

test("tours filter by local/international", async ({ page }) => {
  await page.goto("/tours-pricing");
  const asingBtn = page.getByRole("button", { name: "Wisatawan Asing" });
  await asingBtn.click();
  await expect(asingBtn).toHaveClass(/bg-gold-500/);
});

test("clicking a tour opens detail page", async ({ page }) => {
  await page.goto("/tours-pricing");
  // featured package is a large clickable card; click the heading inside it
  const featured = page.locator("button").filter({ hasText: "Lihat Detail" }).first();
  await featured.click();
  await expect(page).toHaveURL(/\/tours-pricing\//, { timeout: 15000 });
});

test("tour detail page has booking form", async ({ page }) => {
  await page.goto("/tours-pricing/jogja-city-explore");
  await expect(page.getByRole("heading", { name: /Booking/i })).toBeVisible();
  await expect(page.getByPlaceholder("Nama Anda")).toBeVisible();
  await expect(page.getByPlaceholder("08xxxxxxxxxx")).toBeVisible();
});

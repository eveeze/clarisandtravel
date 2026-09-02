import { test, expect } from "@playwright/test";

test("cek booking page loads with search form", async ({ page }) => {
  await page.goto("/cek-booking");
  await expect(page.getByRole("heading", { name: /Cek Booking/i })).toBeVisible();
  await expect(page.getByPlaceholder(/CLR-2026-0001/)).toBeVisible();
});

test("cek booking with unknown code shows not found", async ({ page }) => {
  await page.goto("/cek-booking");
  await page.getByPlaceholder(/CLR-2026-0001/).fill("CLR-9999-9999");
  await page.getByRole("button", { name: "Cari" }).click();
  await expect(page.getByText(/tidak ditemukan/i)).toBeVisible({ timeout: 15000 });
});

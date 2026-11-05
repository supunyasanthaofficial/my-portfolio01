import { test, expect } from "@playwright/test";

test.describe("Portfolio Navigation and UI", () => {
  test("loads the home page with correct title and elements", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Supun Yasantha \| Portfolio/i);

    // Navbar should be visible
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    // Verify main sections exist
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("opens and closes command palette via shortcut and button", async ({ page }) => {
    await page.goto("/");

    // Click ⌘K button in navbar
    const commandButton = page.locator('button[title="Search & Quick Actions"]');
    await commandButton.click();

    // Palette search input should be visible
    const searchInput = page.getByPlaceholder("Type a command or search...");
    await expect(searchInput).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(searchInput).not.toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("404 Not Found & Mini-Game", () => {
  test("renders 404 page and enables the bug mini-game", async ({ page }) => {
    await page.goto("/non-existent-page-testing");

    await expect(page.locator("text=Lost in Space?")).toBeVisible();
    await expect(page.locator("text=catch the Bug")).toBeVisible();

    // Start mini game
    const startButton = page.locator("button:has-text('START MINI-GAME')");
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Verify bug score indicator appears
    await expect(page.locator("text=BUGS CAUGHT:")).toBeVisible();

    // Verify return home button
    const returnLink = page.locator("a:has-text('Return to Home')");
    await expect(returnLink).toBeVisible();
  });
});

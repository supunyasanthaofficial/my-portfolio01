import { test, expect } from "@playwright/test";

test.describe("Security Headers and API Protections", () => {
  test("returns HTTP security headers on pages", async ({ request }) => {
    const response = await request.get("/");
    expect(response.ok()).toBeTruthy();

    const headers = response.headers();
    expect(headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });

  test("rejects invalid contact form payloads with 400", async ({ request }) => {
    // Empty payload
    const emptyRes = await request.post("/api/contact", {
      data: {},
    });
    expect(emptyRes.status()).toBe(400);

    // Invalid email format
    const invalidEmailRes = await request.post("/api/contact", {
      data: {
        name: "Test User",
        email: "not-an-email",
        message: "Hello world testing.",
      },
    });
    expect(invalidEmailRes.status()).toBe(400);
    const body = await invalidEmailRes.json();
    expect(body.error).toContain("valid email address");

    // Overly long name (>100 characters)
    const longNameRes = await request.post("/api/contact", {
      data: {
        name: "A".repeat(150),
        email: "test@example.com",
        message: "Hello world.",
      },
    });
    expect(longNameRes.status()).toBe(400);
    const longNameBody = await longNameRes.json();
    expect(longNameBody.error).toContain("Name must be less than 100 characters");
  });

  test("silently deflects bot submissions via honeypot field", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Spam Bot",
        email: "bot@spam.com",
        message: "Spamming your inbox",
        honeypot: "I am a bot",
      },
    });

    // Honeypot returns success without forwarding to email service
    expect(res.ok()).toBeTruthy();
  });
});

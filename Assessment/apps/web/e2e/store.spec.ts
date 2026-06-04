import { expect, test } from "@playwright/test";

/**
 * End-to-end against the docker-compose stack:
 * public site → Keycloak login → admin portal → create content → appears.
 */

test("public site is visible without signing in", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Ontdek inspiratie" })).toBeVisible();
  // Seed content renders as cards.
  await expect(page.getByRole("listitem").first()).toBeVisible();
});

test("admin route redirects to the site when not signed in", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Ontdek inspiratie" })).toBeVisible();
});

test("admin can sign in via Keycloak and publish a quote", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Admin", exact: true }).click();

  // Keycloak login.
  await page.waitForURL(/\/realms\/donkey\//);
  await page.fill("#username", "alice");
  await page.fill("#password", "password");
  await page.click("#kc-login");

  // Admin portal.
  await expect(page.getByRole("heading", { name: "Content beheren" })).toBeVisible();

  const quote = `E2E inspiratie ${Date.now()}`;
  await page.getByRole("button", { name: /nieuwe content/i }).click();
  await page.getByLabel("Quote").fill(quote);
  await page.getByRole("button", { name: /publiceren/i }).click();

  // Shows up in the admin table…
  await expect(page.getByText(quote).first()).toBeVisible();

  // …and on the public site.
  await page.goto("/");
  await expect(page.getByText(quote).first()).toBeVisible();
});

test("a non-admin sees the access-denied screen and can sign out", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Admin", exact: true }).click();

  await page.waitForURL(/\/realms\/donkey\//);
  await page.fill("#username", "bob");
  await page.fill("#password", "password");
  await page.click("#kc-login");

  await expect(page.getByRole("heading", { name: "Geen toegang" })).toBeVisible();

  await page.getByRole("button", { name: /uitloggen/i }).click();
  await expect(page.getByRole("heading", { name: "Ontdek inspiratie" })).toBeVisible();
});

test("admin can publish a photo with an image URL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Admin", exact: true }).click();

  await page.waitForURL(/\/realms\/donkey\//);
  await page.fill("#username", "alice");
  await page.fill("#password", "password");
  await page.click("#kc-login");

  await expect(page.getByRole("heading", { name: "Content beheren" })).toBeVisible();

  const stamp = Date.now();
  const title = `E2E foto ${stamp}`;
  const imageUrl = `https://picsum.photos/seed/e2e-${stamp}/600/400`;

  await page.getByRole("button", { name: /nieuwe content/i }).click();
  await page.getByRole("button", { name: "Foto" }).click();
  await page.getByLabel("Titel").fill(title);
  await page.getByLabel("Bijschrift").fill("E2E bijschrift");
  await page.getByLabel("Afbeelding-URL").fill(imageUrl);
  await page.getByRole("button", { name: /publiceren/i }).click();

  await expect(page.getByText(title).first()).toBeVisible();

  // The real image renders on the public site (not the placeholder).
  await page.goto("/");
  await expect(page.locator(`img[src="${imageUrl}"]`).first()).toBeVisible();
});

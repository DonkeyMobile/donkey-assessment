import { describe, expect, it } from "vitest";
import { roleFromClaims } from "../src/entities/user/index.js";

describe("roleFromClaims", () => {
  it("returns admin when realm_access contains admin", () => {
    expect(roleFromClaims({ realm_access: { roles: ["user", "admin"] } })).toBe("admin");
  });

  it("returns user when admin role is absent", () => {
    expect(roleFromClaims({ realm_access: { roles: ["user"] } })).toBe("user");
  });

  it("returns user when there are no roles at all", () => {
    expect(roleFromClaims({})).toBe("user");
  });
});

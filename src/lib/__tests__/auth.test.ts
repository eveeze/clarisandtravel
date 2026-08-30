import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

describe("auth (backend) — password security", () => {
  it("bcrypt hash tidak menyimpan plaintext", async () => {
    const hash = await bcrypt.hash("secret123", 10);
    expect(hash).not.toContain("secret123");
    expect(hash.startsWith("$2")).toBe(true);
  });

  it("verifikasi password benar/salah", async () => {
    const hash = await bcrypt.hash("admin-pass", 10);
    expect(await bcrypt.compare("admin-pass", hash)).toBe(true);
    expect(await bcrypt.compare("wrong", hash)).toBe(false);
  });

  it("hash unik per input yang sama (salting)", async () => {
    const a = await bcrypt.hash("sama", 10);
    const b = await bcrypt.hash("sama", 10);
    expect(a).not.toBe(b);
    expect(await bcrypt.compare("sama", a)).toBe(true);
    expect(await bcrypt.compare("sama", b)).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { formatDate, normalizeText } from "./helpers";

describe("helpers", () => {
  it("normalizes text safely", () => {
    expect(normalizeText("  Hello World  ")).toBe("hello world");
    expect(normalizeText("")).toBe("");
  });

  it("formats fallback date", () => {
    expect(formatDate("")).toBe("No date");
    expect(formatDate("2026-04-20")).toBe("2026-04-20");
  });
});

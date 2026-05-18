import { describe, expect, it } from "vitest";
import { appData, validateAppData } from "../domain/schema";

describe("app data validation", () => {
  it("accepts the bundled data", () => {
    expect(appData.characters.length).toBeGreaterThanOrEqual(7);
    expect(appData.characters.every((character) => character.avatar.endsWith(".svg"))).toBe(true);
    expect(appData.relationships.length).toBeGreaterThanOrEqual(5);
    expect(appData.collectibles).toHaveLength(9);
  });

  it("rejects relationships with unknown endpoints", () => {
    expect(() =>
      validateAppData({
        characters: appData.characters,
        collectibles: appData.collectibles,
        relationships: [
          {
            ...appData.relationships[0],
            source: "unknown-character",
          },
        ],
      }),
    ).toThrow(/unknown source/);
  });
});

import { describe, expect, it } from "vitest";
import { filterGraphData, matchesSearch } from "../domain/filters";
import { appData } from "../domain/schema";

describe("filters", () => {
  it("matches Chinese and romanized names", () => {
    const dio = appData.characters.find((character) => character.id === "dio-brando")!;

    expect(matchesSearch(dio, "迪奥")).toBe(true);
    expect(matchesSearch(dio, "dio")).toBe(true);
  });

  it("filters graph data by part", () => {
    const result = filterGraphData(appData.characters, appData.relationships, {
      part: 7,
      relationshipType: "all",
      searchQuery: "",
    });

    expect(result.characters.every((character) => character.part.includes(7))).toBe(true);
    expect(result.relationships.every((relationship) => relationship.part.includes(7))).toBe(true);
  });

  it("keeps endpoints when filtering by relationship type", () => {
    const result = filterGraphData(appData.characters, appData.relationships, {
      part: "all",
      relationshipType: "rivalry",
      searchQuery: "",
    });

    expect(result.relationships.every((relationship) => relationship.type === "rivalry")).toBe(
      true,
    );
    const visibleIds = new Set(result.characters.map((character) => character.id));
    expect(result.relationships.every((relationship) => visibleIds.has(relationship.source))).toBe(
      true,
    );
    expect(result.relationships.every((relationship) => visibleIds.has(relationship.target))).toBe(
      true,
    );
  });
});


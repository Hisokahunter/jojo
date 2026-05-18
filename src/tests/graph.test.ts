import { describe, expect, it } from "vitest";
import { toCytoscapeElements } from "../domain/graph";
import { appData } from "../domain/schema";

describe("graph conversion", () => {
  it("creates one node for each character and one edge for each relationship", () => {
    const elements = toCytoscapeElements(appData.characters, appData.relationships);
    const nodes = elements.filter((element) => !("source" in element.data));
    const edges = elements.filter((element) => "source" in element.data);

    expect(nodes).toHaveLength(appData.characters.length);
    expect(edges).toHaveLength(appData.relationships.length);
  });
});


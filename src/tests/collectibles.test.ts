import { describe, expect, it } from "vitest";
import {
  findTriggeredCollectibles,
  mergeDiscoveredCollectibles,
} from "../domain/collectibles";
import { appData } from "../domain/schema";

describe("collectibles", () => {
  it("triggers the Jonathan and Dio collectible relationship", () => {
    const triggered = findTriggeredCollectibles(appData.collectibles, [], {
      type: "select-relationship",
      targetId: "jonathan-dio-rivalry",
    });

    expect(triggered.map((collectible) => collectible.id)).toContain("torso");
  });

  it("does not trigger already discovered collectibles twice", () => {
    const triggered = findTriggeredCollectibles(appData.collectibles, ["torso"], {
      type: "select-relationship",
      targetId: "jonathan-dio-rivalry",
    });

    expect(triggered).toHaveLength(0);
  });

  it("merges discovered collectibles without duplicates", () => {
    const [torso] = appData.collectibles;

    expect(mergeDiscoveredCollectibles(["torso"], [torso])).toEqual(["torso"]);
  });
});


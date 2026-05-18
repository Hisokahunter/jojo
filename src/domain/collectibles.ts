import type { ActiveView, Collectible } from "./types";

export type CollectibleEvent =
  | { type: "select-character"; targetId: string }
  | { type: "select-relationship"; targetId: string }
  | { type: "activate-view"; targetId: ActiveView };

export function findTriggeredCollectibles(
  collectibles: Collectible[],
  discoveredIds: string[],
  event: CollectibleEvent,
) {
  const discovered = new Set(discoveredIds);

  return collectibles.filter((collectible) => {
    return (
      !discovered.has(collectible.id) &&
      collectible.trigger.type === event.type &&
      collectible.trigger.targetId === event.targetId
    );
  });
}

export function mergeDiscoveredCollectibles(
  discoveredIds: string[],
  triggered: Collectible[],
) {
  const next = new Set(discoveredIds);
  for (const collectible of triggered) {
    next.add(collectible.id);
  }

  return [...next];
}


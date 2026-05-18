import { useCallback } from "react";
import {
  findTriggeredCollectibles,
  mergeDiscoveredCollectibles,
  type CollectibleEvent,
} from "../domain/collectibles";
import { initialAppData, useAppState } from "./useAppState";

export function useCollectibles() {
  const { discoveredCollectibleIds, setDiscoveredCollectibleIds } = useAppState();

  const triggerCollectibles = useCallback(
    (event: CollectibleEvent) => {
      const triggered = findTriggeredCollectibles(
        initialAppData.collectibles,
        discoveredCollectibleIds,
        event,
      );

      if (triggered.length > 0) {
        setDiscoveredCollectibleIds(
          mergeDiscoveredCollectibles(discoveredCollectibleIds, triggered),
        );
      }
    },
    [discoveredCollectibleIds, setDiscoveredCollectibleIds],
  );

  return {
    collectibles: initialAppData.collectibles,
    discoveredCollectibleIds,
    triggerCollectibles,
  };
}


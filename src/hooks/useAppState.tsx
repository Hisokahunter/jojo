import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { appData } from "../domain/schema";
import type { ActiveView, FilterState } from "../domain/types";

type AppStateContextValue = {
  activeView: ActiveView;
  discoveredCollectibleIds: string[];
  filters: FilterState;
  selectedCharacterId: string | null;
  selectedRelationshipId: string | null;
  setActiveView: (view: ActiveView) => void;
  setDiscoveredCollectibleIds: (ids: string[]) => void;
  setFilters: (filters: FilterState) => void;
  setSelectedCharacterId: (id: string | null) => void;
  setSelectedRelationshipId: (id: string | null) => void;
};

const defaultFilters: FilterState = {
  part: "all",
  relationshipType: "all",
  searchQuery: "",
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

function readStoredCollectibles() {
  try {
    const stored = window.localStorage.getItem("jojo.discoveredCollectibles");
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [activeView, setActiveView] = useState<ActiveView>("global");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null);
  const [discoveredCollectibleIds, setDiscoveredCollectibleIdsState] = useState<string[]>(
    readStoredCollectibles,
  );

  const setDiscoveredCollectibleIds = useCallback((ids: string[]) => {
    setDiscoveredCollectibleIdsState(ids);
    window.localStorage.setItem("jojo.discoveredCollectibles", JSON.stringify(ids));
  }, []);

  const value = useMemo<AppStateContextValue>(
    () => ({
      activeView,
      discoveredCollectibleIds,
      filters,
      selectedCharacterId,
      selectedRelationshipId,
      setActiveView,
      setDiscoveredCollectibleIds,
      setFilters,
      setSelectedCharacterId,
      setSelectedRelationshipId,
    }),
    [
      activeView,
      discoveredCollectibleIds,
      filters,
      selectedCharacterId,
      selectedRelationshipId,
      setDiscoveredCollectibleIds,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}

export function resetFilters() {
  return defaultFilters;
}

export const initialAppData = appData;


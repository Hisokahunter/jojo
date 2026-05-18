import type { Character, FilterState, Relationship } from "./types";

export type FilteredGraphData = {
  characters: Character[];
  relationships: Relationship[];
};

export function matchesSearch(character: Character, query: string): boolean {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [character.name, character.romanizedName, ...character.tags].some((value) =>
    value.toLocaleLowerCase().includes(normalizedQuery),
  );
}

export function filterGraphData(
  characters: Character[],
  relationships: Relationship[],
  filters: FilterState,
): FilteredGraphData {
  const partFilteredCharacters = characters.filter((character) => {
    return filters.part === "all" || character.part.includes(filters.part);
  });
  const partCharacterIds = new Set(partFilteredCharacters.map((character) => character.id));

  const relationshipFiltered = relationships.filter((relationship) => {
    const matchesPart = filters.part === "all" || relationship.part.includes(filters.part);
    const matchesType =
      filters.relationshipType === "all" || relationship.type === filters.relationshipType;
    return matchesPart && matchesType;
  });

  const relatedIds = new Set<string>();
  for (const relationship of relationshipFiltered) {
    relatedIds.add(relationship.source);
    relatedIds.add(relationship.target);
  }

  const visibleCharacters = partFilteredCharacters.filter((character) => {
    const matchesQuery = matchesSearch(character, filters.searchQuery);
    const hasVisibleRelationship =
      filters.relationshipType === "all" || relatedIds.has(character.id);
    return matchesQuery && hasVisibleRelationship;
  });

  const visibleIds = new Set(visibleCharacters.map((character) => character.id));
  const visibleRelationships = relationshipFiltered.filter((relationship) => {
    return visibleIds.has(relationship.source) && visibleIds.has(relationship.target);
  });

  const relationshipEndpointIds = new Set<string>();
  for (const relationship of visibleRelationships) {
    relationshipEndpointIds.add(relationship.source);
    relationshipEndpointIds.add(relationship.target);
  }

  const finalCharacters =
    filters.relationshipType === "all"
      ? visibleCharacters
      : partFilteredCharacters.filter(
          (character) =>
            partCharacterIds.has(character.id) && relationshipEndpointIds.has(character.id),
        );

  return {
    characters: finalCharacters,
    relationships: visibleRelationships,
  };
}


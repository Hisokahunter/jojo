import type { Character, Relationship } from "./types";

export function toCytoscapeElements(
  characters: Character[],
  relationships: Relationship[],
) {
  const nodes = characters.map((character) => ({
    data: {
      id: character.id,
      label: character.name,
      avatar: character.avatar,
      family: character.family,
      role: character.role,
      part: character.part.join(", "),
    },
    classes: [character.family.toLowerCase(), character.role].join(" "),
  }));

  const edges = relationships.map((relationship) => ({
    data: {
      id: relationship.id,
      source: relationship.source,
      target: relationship.target,
      label: relationship.label,
      type: relationship.type,
      strength: relationship.strength,
    },
    classes: relationship.type,
  }));

  return [...nodes, ...edges];
}

export function findCharacterById(characters: Character[], id: string | null) {
  if (!id) {
    return null;
  }

  return characters.find((character) => character.id === id) ?? null;
}

export function findRelationshipsForCharacter(
  relationships: Relationship[],
  characterId: string | null,
) {
  if (!characterId) {
    return [];
  }

  return relationships.filter(
    (relationship) =>
      relationship.source === characterId || relationship.target === characterId,
  );
}

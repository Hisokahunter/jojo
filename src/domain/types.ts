export type CharacterFamily = "Joestar" | "Brando" | "Zeppeli" | "Other";

export type CharacterRole =
  | "protagonist"
  | "antagonist"
  | "ally"
  | "mentor"
  | "other";

export type RelationshipType =
  | "blood"
  | "rivalry"
  | "ally"
  | "mentor"
  | "fate"
  | "parallel";

export type ActiveView = "global" | "part" | "family" | "fate";

export type Character = {
  id: string;
  name: string;
  romanizedName: string;
  avatar: string;
  part: number[];
  family: CharacterFamily;
  role: CharacterRole;
  stand?: string | null;
  quote?: string;
  summary: string;
  tags: string[];
};

export type Relationship = {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label: string;
  part: number[];
  strength: 1 | 2 | 3 | 4 | 5;
  description: string;
};

export type Collectible = {
  id: string;
  name: string;
  englishName: string;
  trigger: {
    type: "select-character" | "select-relationship" | "activate-view";
    targetId: string;
  };
  discovered: boolean;
};

export type FilterState = {
  part: number | "all";
  relationshipType: RelationshipType | "all";
  searchQuery: string;
};

export type ValidatedData = {
  characters: Character[];
  relationships: Relationship[];
  collectibles: Collectible[];
};

import { z } from "zod";
import characters from "../data/characters.json";
import collectibles from "../data/collectibles.json";
import relationships from "../data/relationships.json";
import type { ValidatedData } from "./types";

export const characterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  romanizedName: z.string().min(1),
  avatar: z.string().min(1),
  part: z.array(z.number().int().min(1).max(9)).min(1),
  family: z.enum(["Joestar", "Brando", "Zeppeli", "Other"]),
  role: z.enum(["protagonist", "antagonist", "ally", "mentor", "other"]),
  stand: z.string().nullable().optional(),
  quote: z.string().optional(),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export const relationshipSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.enum(["blood", "rivalry", "ally", "mentor", "fate", "parallel"]),
  label: z.string().min(1),
  part: z.array(z.number().int().min(1).max(9)).min(1),
  strength: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  description: z.string().min(1),
});

export const collectibleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  englishName: z.string().min(1),
  trigger: z.object({
    type: z.enum(["select-character", "select-relationship", "activate-view"]),
    targetId: z.string().min(1),
  }),
  discovered: z.boolean(),
});

export const appDataSchema = z.object({
  characters: z.array(characterSchema),
  relationships: z.array(relationshipSchema),
  collectibles: z.array(collectibleSchema),
});

export function validateAppData(data: unknown): ValidatedData {
  const parsed = appDataSchema.parse(data);
  const characterIds = new Set(parsed.characters.map((character) => character.id));

  for (const relationship of parsed.relationships) {
    if (!characterIds.has(relationship.source)) {
      throw new Error(`Relationship ${relationship.id} has unknown source ${relationship.source}`);
    }
    if (!characterIds.has(relationship.target)) {
      throw new Error(`Relationship ${relationship.id} has unknown target ${relationship.target}`);
    }
  }

  return parsed;
}

export const appData = validateAppData({
  characters,
  relationships,
  collectibles,
});

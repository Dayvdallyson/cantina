import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { SwapiClient } from "../infrastructure/swapi-client"
import type { CharacterSummary, SwapiPlanet } from "../domain/types"

const client = SwapiClient.getInstance();

export const getCharacter = createTool({
  id: "get-character",
  description:
  "Get core information about a Star Wars character by name, including their homeworld.",
  inputSchema: z.object({
    name: z.string().describe("Character name, e.g. 'Luke' 'Vader'"),
  }),
  outputSchema: z.object({
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    birth_year: z.string(),
    gender: z.string(),
    homeworld: z.string(),
    starshipCount: z.number(),
    filmCount: z.number(),
  }),
 execute: async ({ name }) => {
  const person = await client.findPersonByName(name);

  if (!person) {
    throw new Error(`Character not found: ${name}`);
  }

  return {
    name: person.name,
    height: person.height,
    mass: person.mass,
    birth_year: person.birth_year,
    gender: person.gender,
    homeworld: person.homeworld,
    starshipCount: person.starships.length,
    filmCount: person.films.length,
  };
},
})

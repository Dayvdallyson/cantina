import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { SwapiClient } from "../infrastructure/swapi-client"
import type { CharacterSummary, SwapiPlanet } from "../domain/types"

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
    birthYear: z.string(),
    gender: z.string(),
    homeworldName: z.string(),
    starshipCount: z.number(),
    filmCount: z.number(),
  }),
  execute: async ({ inputData }) => {
    const client = SwapiClient.getInstance();
    const person = await client.findPersonByName(context.name);

    if (!person) {
      throw new Error(`Character not found: ${context.name}`);
    }

    const homeworld = await client.fetchByUrl<SwapiPlanet>(person.homeworld);

    const summary: CharacterSummary = {
      name: person.name,
      height: person.height,
      mass: person.mass,
      birthYear: person.birth_year,
      gender: person.gender,
      homeworldName: homeworld.name,
      starshipCount: person.starships.length,
      filmCount: person.films.length,
    };
    return summary;
  }
})

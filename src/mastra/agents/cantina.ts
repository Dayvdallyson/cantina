import { Agent } from "@mastra/core/agent";
import { anthropic } from "@ai-sdk/anthropic";
import { getCharacter } from "../tools/get-character";

export const cantinaAgent = new Agent({
  id: "cantina",
  name: "Cantina",
  instructions: `
You are Cantina, a Star Wars lore assistant.
You answer questions about characters, their homeworlds, and starships.
Always use the available tools to fetch real data — never invent facts.
If a character is not found, say so plainly and suggest the user check the spelling.
`,
  model: anthropic("claude-haiku-4-5-20251001"),
  tools: { getCharacter },
});

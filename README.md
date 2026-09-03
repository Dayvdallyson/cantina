# Cantina

A Star Wars lore AI agent built with [Mastra](https://mastra.ai). Cantina answers
questions about characters, their homeworlds, and starships by orchestrating tools
over the [SWAPI](https://swapi.info) dataset — never inventing facts.

This is a learning project focused on the concepts one step beyond a single-fetch
agent: **tool orchestration** (the agent decides which tool to call, and chains
multiple calls on its own) and **linked-data resolution** (following resource URLs
to enrich responses).

## Stack

- **Mastra** (v1) — agent framework and Studio
- **Claude Haiku 4.5** via `@ai-sdk/anthropic`
- **SWAPI** (`swapi.info`) — a fast, GET-only Star Wars API mirror
- **TypeScript** + **Zod** for tool schemas

## Architecture

The project follows a light layered structure to keep external concerns isolated
from the agent logic:


- **Domain** separates the raw API JSON from the clean model the agent receives,
  so the rest of the code never depends on SWAPI's exact format.
- **Infrastructure** exposes a `SwapiClient` Singleton. Since `swapi.info` has no
  server-side search, collections are fetched once, cached in memory, and filtered
  locally. A generic `fetchByUrl` primitive powers linked-data resolution.

## Tools

| Tool            | What it does                                                        |
| --------------- | ------------------------------------------------------------------- |
| `get-character` | Finds a character by name and resolves their homeworld URL to a name |

_Planned: `get-starships` (fan-out with `Promise.all` to resolve all piloted ships)
and `get-planet`._

## Get started

Set your `ANTHROPIC_API_KEY` in `.env`, then run:

```shell
pnpm run dev
```

Open [http://localhost:4111](http://localhost:4111) to access Mastra Studio, select
the **Cantina** agent, and try:

- `Tell me about Leia` — watch the tool resolve her homeworld to "Alderaan"
- `Who is taller, Leia or Luke?` — the agent calls the tool twice on its own

## Storage

Local libSQL (`file:./mastra.db`) stores agent memory, carried over from the Mastra
starter. It isn't central to this project's learning goals.

## Learn more

- [Mastra documentation](https://mastra.ai/docs/)
- [SWAPI (swapi.info)](https://swapi.info)

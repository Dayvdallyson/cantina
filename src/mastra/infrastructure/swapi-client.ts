import { SwapiPerson, SwapiPlanet, SwapiStarship } from "../domain/types";

export class SwapiClient {
  private static instance: SwapiClient;
  private readonly baseUrl = "https://swapi.info/api";

  private peopleCache: SwapiPerson[] | null = null;

  private constructor() {}

  public static getInstance(): SwapiClient {
    if (!SwapiClient.instance){
      SwapiClient.instance = new SwapiClient();
    }
    return SwapiClient.instance;
  }

  public async fetchByUrl<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`SWAPI request failed: ${response.status} for ${url}`);
    }
    return (await response.json()) as T;
  }

  public async listPeople(): Promise<SwapiPerson[]> {
    if (this.peopleCache) {
      return this.peopleCache;
    }
    const people = await this.fetchByUrl<SwapiPerson[]>(`${this.baseUrl}/people`);
    this.peopleCache = people;
    return people;
  }
  public async findPersonByName(name: string): Promise<SwapiPerson | null> {
    const people = await this.listPeople();
    const query = name.toLowerCase();
    return people.find((p) => p.name.toLowerCase().includes(query)) ?? null;
  }
}

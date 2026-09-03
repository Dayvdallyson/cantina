export interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  starships: string[];
  films: string[];
  url: string;
}

export interface SwapiPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  url: string;
}

export interface SwapiStarship {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  url: string;
}

export interface CharacterSummary {
  name: string;
  height: string;
  mass: string;
  birthYear: string;
  gender: string;
  homeworldName: string;
  starshipCount: string;
  filmCount: string;
}


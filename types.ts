export interface CountryType {
  cca2?: string;
  name: { common: string };
  flags: { svg: string; alt: string };
  population: number;
  area: number;
  capital: string[];
  url: string;
}

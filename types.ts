export interface CountryType {
  cca2?: string;
  name: { common: string; official: string; nativeName: object };
  flags: { svg: string; alt: string };
  population: number;
  area: number;
  capital: string[];
  url: string;
  timezones: string[];
  region: string;
  languages: object;
  currencies: object;
}

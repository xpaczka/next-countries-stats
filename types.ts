export interface CountryProps {
  cca2?: string;
  name: { common: string };
  flags: { svg: string; alt: string };
  population: number;
  area: number;
  capital?: string[];
}

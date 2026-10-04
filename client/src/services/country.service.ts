import { api } from "../lib/api";
import { featuredCountries } from "../data/countries/index";
import type { Country } from "../types/country";

export async function getCountries(): Promise<Country[]> {
  const response = await api.get<Country[]>("/countries");
  return response.data;
}

export const localCountries = featuredCountries;

export async function getCountryCatalog(): Promise<{
  countries: Country[];
  isFallback: boolean;
}> {
  try {
    const apiCountries = await getCountries();
    const apiByCode = new Map(
      apiCountries.map((country) => [country.code.toLowerCase(), country]),
    );
    const countries = localCountries.map((localCountry) => {
      const apiCountry = apiByCode.get(localCountry.code.toLowerCase());
      if (!apiCountry) return localCountry;

      return {
        ...localCountry,
        status: apiCountry.status,
        stayDays: apiCountry.stayDays,
        processingDays: apiCountry.processingDays,
        fee: apiCountry.fee,
        summary: apiCountry.summary,
        requirements: apiCountry.requirements,
      };
    });
    return { countries, isFallback: false };
  } catch {
    return { countries: localCountries, isFallback: true };
  }
}

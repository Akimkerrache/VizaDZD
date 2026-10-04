import { useQuery } from "@tanstack/react-query";
import { localCountries } from "../services/country.service";
import { getCountryCatalog } from "../services/country.service";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountryCatalog,
    placeholderData: { countries: localCountries, isFallback: false },
  });
}

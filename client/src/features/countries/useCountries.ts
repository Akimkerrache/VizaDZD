import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { featuredCountries } from "../../data/countries";
import type { Country } from "../../types/country";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => (await api.get<Country[]>("/countries")).data,
    placeholderData: featuredCountries,
    retry: 1,
  });
}

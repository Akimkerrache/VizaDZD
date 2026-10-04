import { useQuery } from "@tanstack/react-query";
import { featuredCountries } from "../data/countries/index";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => featuredCountries,
    initialData: featuredCountries,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

import { useMemo, useState } from "react";
import type { Country } from "../types/country";
import type { VisaFilter } from "../types/visa";
import { normalizeVisaStatus } from "../lib/visa-colors";

export function useCountryFilters(countries: Country[]) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<VisaFilter>("all");
  const visibleCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLocaleLowerCase().includes(normalizedSearch) &&
        (filter === "all" || normalizeVisaStatus(country.status) === filter),
    );
  }, [countries, filter, search]);

  return { search, setSearch, filter, setFilter, visibleCountries };
}

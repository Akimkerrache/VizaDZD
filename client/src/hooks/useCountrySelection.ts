import { useCallback, useMemo, useState } from "react";
import type { Country } from "../types/country";

export function useCountrySelection(countries: Country[]) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );
  const selectedCountry = useMemo(
    () =>
      countries.find((country) => country.code === selectedCountryCode) ?? null,
    [countries, selectedCountryCode],
  );
  const selectCountry = useCallback(
    (country: Country) => setSelectedCountryCode(country.code),
    [],
  );
  const closeCountry = useCallback(() => setSelectedCountryCode(null), []);

  return { selectedCountry, selectedCountryCode, selectCountry, closeCountry };
}

import worldCountries from "world-countries";
import type { Country } from "../../types/country";
import type { VisaStatus } from "../../types/visa";

const flagAssets = import.meta.glob<string>("../../assets/flags/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

interface CountryMetadata {
  cca2: string;
  name: { common: string };
  capital: string[];
  region: string;
  latlng: [number, number];
}

interface CuratedVisaGuidance {
  name?: string;
  status: VisaStatus;
  stayDays: number;
  processingDays: string;
  fee: number | null;
  summary: string;
  requirements: string[];
  importantNotes?: string[];
  markerPriority?: number;
}

const metadataByCode = new Map(
  (worldCountries as CountryMetadata[]).map((country) => [
    country.cca2.toLowerCase(),
    country,
  ]),
);

// Visa guidance for ALGERIAN passport holders (ordinary passports), keyed by lowercase ISO 3166-1 alpha-2 code.
// Sorted A–Z by country name. Source baseline: Wikipedia "Visa requirements for Algerian citizens" (2026).
// Rules change often: verify with official embassy/government sources before relying on any entry.
// Note: stayDays may be null (type it as `number | null`) and status "visa-on-arrival" must exist in your status union.
const curatedGuidance: Record<string, CuratedVisaGuidance> = {
  af: {
    name: "Afghanistan",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Afghanistan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Only visas issued by missions recognised by the current authorities are valid; e-visa holders must enter via Kabul (KBL). Check security advisories before travelling.",
    ],
    markerPriority: 3,
  },
  al: {
    name: "Albania",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Albania.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Visa not required for holders of a valid multiple-entry Schengen, UK or US visa (already used once) or a Schengen/UK/US/UAE residence permit.",
    ],
    markerPriority: 3,
  },
  ad: {
    name: "Andorra",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Andorra embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Entry is via Spain or France, so a Schengen visa is normally needed.",
    ],
    markerPriority: 3,
  },
  ao: {
    name: "Angola",
    status: "visa-free",
    stayDays: 30,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Angola are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "Up to three visa-free entries per calendar year, 30 days each.",
    ],
    markerPriority: 3,
  },
  ag: {
    name: "Antigua and Barbuda",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Antigua and Barbuda.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Algerians holding a visa or residency from Canada, the USA, the UK or a Schengen state can get a visa on arrival (about USD 100, max 30 days).",
    ],
    markerPriority: 3,
  },
  ar: {
    name: "Argentina",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Argentina embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  am: {
    name: "Armenia",
    status: "e-visa",
    stayDays: 120,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Armenia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Visa on arrival may be available with a valid residence permit or visa from the EU/Schengen, USA, UK, Canada, Japan, Australia, GCC states, etc.",
    ],
    markerPriority: 3,
  },
  au: {
    name: "Australia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Australia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Apply online for a Visitor visa (subclass 600)."],
    markerPriority: 3,
  },
  at: {
    name: "Austria",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Austria (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  az: {
    name: "Azerbaijan",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Azerbaijan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  bs: {
    name: "Bahamas",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Bahamas.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  bh: {
    name: "Bahrain",
    status: "e-visa",
    stayDays: 14,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Bahrain.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  bd: {
    name: "Bangladesh",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Bangladesh embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  bb: {
    name: "Barbados",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Barbados are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  by: {
    name: "Belarus",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Belarus embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  be: {
    name: "Belgium",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Belgium (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 2,
  },
  bz: {
    name: "Belize",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Belize embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  bj: {
    name: "Benin",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Benin are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  bt: {
    name: "Bhutan",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Bhutan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Visa fee about USD 40, plus the daily Sustainable Development Fee.",
    ],
    markerPriority: 3,
  },
  bo: {
    name: "Bolivia",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Bolivia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  ba: {
    name: "Bosnia and Herzegovina",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Bosnia and Herzegovina embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  bw: {
    name: "Botswana",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Botswana.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  br: {
    name: "Brazil",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Brazil embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  bn: {
    name: "Brunei",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Brunei embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  bg: {
    name: "Bulgaria",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Bulgaria (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  bf: {
    name: "Burkina Faso",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Burkina Faso.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  bi: {
    name: "Burundi",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Burundi. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  kh: {
    name: "Cambodia",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Cambodia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  cm: {
    name: "Cameroon",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Cameroon.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  ca: {
    name: "Canada",
    status: "visa-required",
    stayDays: 180,
    processingDays: "4–8 weeks",
    fee: 100,
    summary: "A temporary resident visa is required before travel.",
    requirements: [
      "Online application and biometrics",
      "Employment and financial records",
      "Valid passport",
    ],
    importantNotes: [
      "US permanent residents (Green card holders) may enter visa-free.",
    ],
    markerPriority: 1,
  },
  cv: {
    name: "Cape Verde",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Cape Verde. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    importantNotes: [
      "Register online (EASE) about five days before arrival and pay the airport security fee.",
    ],
    markerPriority: 3,
  },
  cf: {
    name: "Central African Republic",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Central African Republic embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  td: {
    name: "Chad",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Chad.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  cl: {
    name: "Chile",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Chile embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  cn: {
    name: "China",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the China embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  co: {
    name: "Colombia",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Colombia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  km: {
    name: "Comoros",
    status: "visa-on-arrival",
    stayDays: 45,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Comoros. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  cr: {
    name: "Costa Rica",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Costa Rica embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (max 30 days) with a valid multiple-entry visa from a Schengen state, Canada or the USA.",
    ],
    markerPriority: 3,
  },
  hr: {
    name: "Croatia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Croatia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  cu: {
    name: "Cuba",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Cuba.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["Extendable for a further 90 days for a fee."],
    markerPriority: 3,
  },
  cy: {
    name: "Cyprus",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Cyprus embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Cyprus is not in Schengen and issues its own visas."],
    markerPriority: 3,
  },
  cz: {
    name: "Czechia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Czechia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  ci: {
    name: "Côte d'Ivoire",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Côte d'Ivoire.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  cd: {
    name: "DR Congo",
    status: "e-visa",
    stayDays: 7,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to DR Congo.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  dk: {
    name: "Denmark",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Denmark (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  dj: {
    name: "Djibouti",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Djibouti.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  dm: {
    name: "Dominica",
    status: "visa-free",
    stayDays: 21,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Dominica are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  do: {
    name: "Dominican Republic",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Dominican Republic embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (up to 180 days) with a valid multiple-entry Schengen visa.",
    ],
    markerPriority: 3,
  },
  ec: {
    name: "Ecuador",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Ecuador are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  eg: {
    name: "Egypt",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Egypt embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Visa not required for Algerian citizens under 14."],
    markerPriority: 2,
  },
  sv: {
    name: "El Salvador",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the El Salvador embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  gq: {
    name: "Equatorial Guinea",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Equatorial Guinea.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  er: {
    name: "Eritrea",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Eritrea embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ee: {
    name: "Estonia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Estonia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  sz: {
    name: "Eswatini",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Eswatini embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  et: {
    name: "Ethiopia",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Ethiopia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "e-visa holders and visa-on-arrival travellers must arrive via Addis Ababa Bole Airport.",
    ],
    markerPriority: 3,
  },
  fj: {
    name: "Fiji",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Fiji.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  fi: {
    name: "Finland",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Finland (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  fr: {
    name: "France",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for tourism, family visits and business.",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 1,
  },
  ga: {
    name: "Gabon",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Gabon.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa holders must arrive via Libreville Airport."],
    markerPriority: 3,
  },
  gm: {
    name: "Gambia",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Gambia are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  ge: {
    name: "Georgia",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Georgia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  de: {
    name: "Germany",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Germany (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 2,
  },
  dz: {
    name: "Algeria",
    status: "visa-free",
    stayDays: 0,
    processingDays: "free",
    fee: null,
    summary:
      "Free forever for Algerian citizens. Verify current entry rules before travelling.",
    requirements: ["No visa required for Algerian citizens."],
    markerPriority: 3,
  },
  gh: {
    name: "Ghana",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Ghana. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  gr: {
    name: "Greece",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Greece (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  gl: {
    name: "Greenland",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Greenland embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Danish territory; Schengen-type visa rules apply."],
    markerPriority: 3,
  },
  gd: {
    name: "Grenada",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Grenada embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  gt: {
    name: "Guatemala",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Guatemala embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (up to 90 days) with a residence permit from Australia, Canada, a GCC state, the USA, the UK or a Schengen state.",
    ],
    markerPriority: 3,
  },
  gn: {
    name: "Guinea",
    status: "visa-free",
    stayDays: 0,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Guinea are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  gw: {
    name: "Guinea-Bissau",
    status: "visa-on-arrival",
    stayDays: 90,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Guinea-Bissau. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  gy: {
    name: "Guyana",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Guyana embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ht: {
    name: "Haiti",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Haiti are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  hn: {
    name: "Honduras",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Honduras embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required with a valid visa (6+ months) from Canada, the USA or a Schengen state.",
    ],
    markerPriority: 3,
  },
  hk: {
    name: "Hong Kong",
    status: "visa-free",
    stayDays: 14,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Hong Kong are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: ["Special Administrative Region of China."],
    markerPriority: 3,
  },
  hu: {
    name: "Hungary",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Hungary (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  is: {
    name: "Iceland",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Iceland (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  in: {
    name: "India",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the India embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  id: {
    name: "Indonesia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Indonesia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ir: {
    name: "Iran",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Iran.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  iq: {
    name: "Iraq",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Iraq.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  ie: {
    name: "Ireland",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Ireland embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Ireland is outside Schengen and issues its own visas."],
    markerPriority: 3,
  },
  il: {
    name: "Israel",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Israel embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  it: {
    name: "Italy",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Italy (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 1,
  },
  jm: {
    name: "Jamaica",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Jamaica embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  jp: {
    name: "Japan",
    status: "visa-required",
    stayDays: 90,
    processingDays: "5–10 working days",
    fee: 22,
    summary:
      "Apply for a short-stay visa through the relevant Japanese mission.",
    requirements: [
      "Application form and recent photograph",
      "Detailed itinerary",
      "Financial documents",
    ],
    importantNotes: [
      "An e-Visa is available to Algerians residing in certain countries (e.g. UAE, UK, USA, Canada, Saudi Arabia).",
    ],
    markerPriority: 3,
  },
  jo: {
    name: "Jordan",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Jordan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or free visa on arrival."],
    markerPriority: 3,
  },
  kz: {
    name: "Kazakhstan",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Kazakhstan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  ke: {
    name: "Kenya",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Kenya are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "Kenya requires an online Electronic Travel Authorisation (eTA) before travel.",
    ],
    markerPriority: 3,
  },
  ki: {
    name: "Kiribati",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Kiribati embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  xk: {
    name: "Kosovo",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Kosovo embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  kw: {
    name: "Kuwait",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Kuwait embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "An e-visa may be available to holders of a GCC residence permit meeting specific conditions.",
    ],
    markerPriority: 3,
  },
  kg: {
    name: "Kyrgyzstan",
    status: "e-visa",
    stayDays: 60,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Kyrgyzstan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  la: {
    name: "Laos",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Laos embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  lv: {
    name: "Latvia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Latvia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  lb: {
    name: "Lebanon",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Lebanon. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    importantNotes: [
      "Requires a hotel/residence booking, about USD 2,000 cash, a return ticket and no Israeli stamps in the passport.",
    ],
    markerPriority: 3,
  },
  ls: {
    name: "Lesotho",
    status: "e-visa",
    stayDays: 14,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Lesotho.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  lr: {
    name: "Liberia",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Liberia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  ly: {
    name: "Libya",
    status: "visa-free",
    stayDays: 0,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Libya are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: ["Check security advisories before travelling."],
    markerPriority: 3,
  },
  li: {
    name: "Liechtenstein",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Liechtenstein (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  lt: {
    name: "Lithuania",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Lithuania (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  lu: {
    name: "Luxembourg",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Luxembourg (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  mo: {
    name: "Macau",
    status: "visa-on-arrival",
    stayDays: 0,
    processingDays: "On arrival",
    fee: 0,
    summary:
      "A visa can be obtained on arrival in Macau. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    importantNotes: ["Special Administrative Region of China."],
    markerPriority: 3,
  },
  mg: {
    name: "Madagascar",
    status: "e-visa",
    stayDays: 60,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Madagascar.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  mw: {
    name: "Malawi",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Malawi.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  my: {
    name: "Malaysia",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Tourist stays may be visa-free for up to 90 days; verify current rules.",
    requirements: [
      "Passport valid for at least 6 months",
      "Onward travel ticket",
    ],
    markerPriority: 3,
  },
  mv: {
    name: "Maldives",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: 0,
    summary:
      "A visa can be obtained on arrival in Maldives. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    importantNotes: ["Free visa on arrival."],
    markerPriority: 3,
  },
  ml: {
    name: "Mali",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Mali are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: ["Check security advisories before travelling."],
    markerPriority: 3,
  },
  mt: {
    name: "Malta",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Malta (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  mh: {
    name: "Marshall Islands",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Marshall Islands embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  mr: {
    name: "Mauritania",
    status: "visa-free",
    stayDays: 0,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Mauritania are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  mu: {
    name: "Mauritius",
    status: "visa-on-arrival",
    stayDays: 15,
    processingDays: "On arrival",
    fee: 0,
    summary:
      "A visa can be obtained on arrival in Mauritius. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  mx: {
    name: "Mexico",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Mexico embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (up to 180 days) with a valid visa or permanent residency from Canada, Japan, the USA, the UK or a Schengen state.",
    ],
    markerPriority: 3,
  },
  fm: {
    name: "Micronesia",
    status: "visa-free",
    stayDays: 30,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Micronesia are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  md: {
    name: "Moldova",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Moldova.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Visa not required with a valid visa or residence permit from the EU/Schengen, UK, Ireland, Canada or the USA.",
    ],
    markerPriority: 3,
  },
  mc: {
    name: "Monaco",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Monaco embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Entry is via France, so a Schengen visa is normally needed.",
    ],
    markerPriority: 3,
  },
  mn: {
    name: "Mongolia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Mongolia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  me: {
    name: "Montenegro",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Montenegro embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ma: {
    name: "Morocco",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Morocco are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "Land border and direct flights with Algeria have been suspended for years; check the current route options.",
    ],
    markerPriority: 2,
  },
  mz: {
    name: "Mozambique",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Mozambique.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  mm: {
    name: "Myanmar",
    status: "e-visa",
    stayDays: 28,
    processingDays: "Varies",
    fee: 0,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Myanmar.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  na: {
    name: "Namibia",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Namibia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  nr: {
    name: "Nauru",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Nauru embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  np: {
    name: "Nepal",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Nepal.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  nl: {
    name: "Netherlands",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Netherlands (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  nz: {
    name: "New Zealand",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the New Zealand embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ni: {
    name: "Nicaragua",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Nicaragua are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  ne: {
    name: "Niger",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Niger embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ng: {
    name: "Nigeria",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Nigeria.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  kp: {
    name: "North Korea",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the North Korea embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  mk: {
    name: "North Macedonia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the North Macedonia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (up to 15 days) with a valid multiple-entry visa or residence permit from Canada, the USA, the UK or a Schengen state.",
    ],
    markerPriority: 3,
  },
  no: {
    name: "Norway",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Norway (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  om: {
    name: "Oman",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Oman embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required for Algerians resident in, or holding a valid visa for, the USA, Canada, Australia, the UK, Schengen states, Japan or GCC states (profession conditions apply).",
    ],
    markerPriority: 3,
  },
  pk: {
    name: "Pakistan",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Pakistan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Issued in about 7–10 business days. Up to 3 months may be granted.",
    ],
    markerPriority: 3,
  },
  pw: {
    name: "Palau",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Palau. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  ps: {
    name: "Palestine",
    status: "visa-free",
    stayDays: 0,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Palestine are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "Access is controlled by neighbouring border authorities; sea arrival to Gaza is not allowed. Check security advisories.",
    ],
    markerPriority: 3,
  },
  pa: {
    name: "Panama",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Panama embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required with a multiple-entry visa (valid 6+ months) or permanent residency from Australia, Canada, the EU, Japan, Singapore, South Korea, the USA or the UK.",
    ],
    markerPriority: 3,
  },
  pg: {
    name: "Papua New Guinea",
    status: "e-visa",
    stayDays: 60,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Papua New Guinea.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Apply online under the Tourist – Own Itinerary category.",
    ],
    markerPriority: 3,
  },
  py: {
    name: "Paraguay",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Paraguay embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  pe: {
    name: "Peru",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Peru embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ph: {
    name: "Philippines",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Philippines embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "An e-visa is available to Algerians who are legal residents of the UAE.",
    ],
    markerPriority: 3,
  },
  pl: {
    name: "Poland",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Poland (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  pt: {
    name: "Portugal",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Portugal (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  qa: {
    name: "Qatar",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Qatar.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 2,
  },
  cg: {
    name: "Republic of the Congo",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Republic of the Congo embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  ro: {
    name: "Romania",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Romania (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  ru: {
    name: "Russia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Russia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  rw: {
    name: "Rwanda",
    status: "visa-free",
    stayDays: 30,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Rwanda are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  kn: {
    name: "Saint Kitts and Nevis",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Saint Kitts and Nevis.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  lc: {
    name: "Saint Lucia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Saint Lucia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  vc: {
    name: "Saint Vincent and the Grenadines",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Saint Vincent and the Grenadines are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  ws: {
    name: "Samoa",
    status: "visa-free",
    stayDays: 60,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Samoa are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 3,
  },
  sm: {
    name: "San Marino",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the San Marino embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Entry is via Italy, so a Schengen visa is normally needed.",
    ],
    markerPriority: 3,
  },
  sa: {
    name: "Saudi Arabia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Saudi Arabia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Tourist visa on arrival only for holders of a used multiple-entry US, UK or Schengen visa. Umrah and Hajj visas are issued through authorised agencies.",
    ],
    markerPriority: 1,
  },
  sn: {
    name: "Senegal",
    status: "visa-on-arrival",
    stayDays: 90,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Senegal. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  rs: {
    name: "Serbia",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Serbia embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Visa not required (90 days) for holders of a visa or residence permit from the EU or the USA.",
    ],
    markerPriority: 3,
  },
  sc: {
    name: "Seychelles",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Seychelles.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Electronic Travel Authorisation (about EUR 10) applied for up to 30 days before travel, with accommodation booking.",
    ],
    markerPriority: 3,
  },
  sl: {
    name: "Sierra Leone",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Sierra Leone.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  sg: {
    name: "Singapore",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Singapore embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Application is submitted online through a local contact or strategic partner in Singapore.",
    ],
    markerPriority: 3,
  },
  sk: {
    name: "Slovakia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Slovakia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  si: {
    name: "Slovenia",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Slovenia (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  sb: {
    name: "Solomon Islands",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Solomon Islands embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  so: {
    name: "Somalia",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Somalia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["Check security advisories before travelling."],
    markerPriority: 3,
  },
  za: {
    name: "South Africa",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to South Africa.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  kr: {
    name: "South Korea",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the South Korea embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Jeju Island is visa-free for 30 days. Online application is possible.",
    ],
    markerPriority: 3,
  },
  ss: {
    name: "South Sudan",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to South Sudan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Print the e-visa authorisation and present it on arrival.",
    ],
    markerPriority: 3,
  },
  es: {
    name: "Spain",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–30 days",
    fee: 90,
    summary: "A Schengen short-stay visa is required.",
    requirements: [
      "Passport valid for 3 months after return",
      "Travel medical insurance",
      "Proof of funds and itinerary",
    ],
    markerPriority: 2,
  },
  lk: {
    name: "Sri Lanka",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Sri Lanka.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["Electronic Travel Authorisation (ETA)."],
    markerPriority: 3,
  },
  sd: {
    name: "Sudan",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Sudan embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  sr: {
    name: "Suriname",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Suriname are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "An entrance fee of about USD/EUR 50 must be paid online before arrival.",
    ],
    markerPriority: 3,
  },
  se: {
    name: "Sweden",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Sweden (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 3,
  },
  ch: {
    name: "Switzerland",
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for Switzerland (tourism, family visits, business).",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 2,
  },
  sy: {
    name: "Syria",
    status: "visa-free",
    stayDays: 0,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays in Syria are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid passport",
      "Return ticket",
      "Proof of accommodation may be requested",
    ],
    importantNotes: [
      "Sources conflict: the 2014 law requires a visa while listings show visa-free. Confirm with the Syrian mission and check security advisories.",
    ],
    markerPriority: 3,
  },
  st: {
    name: "São Tomé and Príncipe",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to São Tomé and Príncipe.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  tw: {
    name: "Taiwan",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Taiwan embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Algerian citizens may visit only under specific conditions (invitation, business, medical treatment, family visit or approved events).",
    ],
    markerPriority: 3,
  },
  tj: {
    name: "Tajikistan",
    status: "e-visa",
    stayDays: 60,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Tajikistan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  tz: {
    name: "Tanzania",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Tanzania.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
  th: {
    name: "Thailand",
    status: "e-visa",
    stayDays: 60,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Thailand.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  tl: {
    name: "Timor-Leste",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Timor-Leste. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  tg: {
    name: "Togo",
    status: "e-visa",
    stayDays: 15,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Togo.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  to: {
    name: "Tonga",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Tonga embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  tt: {
    name: "Trinidad and Tobago",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Trinidad and Tobago.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  tn: {
    name: "Tunisia",
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid travel document",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 1,
  },
  tr: {
    name: "Türkiye",
    status: "visa-required",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "Rules depend on age: Algerians under 15 or over 50 may enter visa-free for tourism; those aged 15–50 need a visa.",
    requirements: [
      "Valid passport for the intended stay",
      "Return ticket may be requested",
    ],
    importantNotes: [
      "Algerians aged 15–18 or 35–50 holding a valid Schengen, US, UK or Irish visa or residence permit may get a single-entry e-Visa (30 days) on evisa.gov.tr.",
      "Verify current rules with official Turkish authorities.",
    ],
    markerPriority: 1,
  },
  tm: {
    name: "Turkmenistan",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Turkmenistan embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  tv: {
    name: "Tuvalu",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Tuvalu. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    markerPriority: 3,
  },
  ug: {
    name: "Uganda",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Uganda.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  ua: {
    name: "Ukraine",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Ukraine embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: ["Check current security and entry restrictions."],
    markerPriority: 3,
  },
  ae: {
    name: "United Arab Emirates",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the United Arab Emirates embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Apply online through the official UAE Smart Services portal or via a sponsor/airline.",
    ],
    markerPriority: 1,
  },
  gb: {
    name: "United Kingdom",
    status: "visa-required",
    stayDays: 180,
    processingDays: "3–6 weeks",
    fee: 130,
    summary: "A Standard Visitor visa must be obtained before travelling.",
    requirements: [
      "Online application and biometric appointment",
      "Proof of funds and accommodation",
      "Valid passport",
    ],
    markerPriority: 2,
  },
  us: {
    name: "United States",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: 185,
    summary:
      "A visa must be obtained from the United States embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 2,
  },
  uy: {
    name: "Uruguay",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Uruguay embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    markerPriority: 3,
  },
  uz: {
    name: "Uzbekistan",
    status: "e-visa",
    stayDays: 30,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Uzbekistan.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "5-day visa-free airport transit with a confirmed onward ticket.",
    ],
    markerPriority: 3,
  },
  vu: {
    name: "Vanuatu",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Vanuatu.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  va: {
    name: "Vatican City",
    status: "visa-required",
    stayDays: 0,
    processingDays: "Varies by embassy",
    fee: null,
    summary:
      "A visa must be obtained from the Vatican City embassy or consulate before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Completed application form and photographs",
      "Proof of accommodation, itinerary and financial means",
      "Return ticket",
    ],
    importantNotes: [
      "Entry is via Italy, so a Schengen visa is normally needed.",
    ],
    markerPriority: 3,
  },
  ve: {
    name: "Venezuela",
    status: "e-visa",
    stayDays: 0,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Venezuela.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: [
      "Electronic visa system introduced; check the current process.",
    ],
    markerPriority: 3,
  },
  vn: {
    name: "Vietnam",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Vietnam.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa is valid for 90 days, multiple entry."],
    markerPriority: 3,
  },
  ye: {
    name: "Yemen",
    status: "visa-on-arrival",
    stayDays: 30,
    processingDays: "On arrival",
    fee: null,
    summary:
      "A visa can be obtained on arrival in Yemen. Verify current conditions before travelling.",
    requirements: [
      "Passport valid for at least 6 months",
      "Return or onward ticket",
      "Proof of accommodation and funds",
      "Visa fee payable on arrival",
    ],
    importantNotes: [
      "Security situation is severe; check travel advisories before any plans.",
    ],
    markerPriority: 3,
  },
  zm: {
    name: "Zambia",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Zambia.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    markerPriority: 3,
  },
  zw: {
    name: "Zimbabwe",
    status: "e-visa",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "An electronic visa or travel authorisation should be obtained online before departure to Zimbabwe.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph and passport scan",
      "Accommodation details and return ticket",
      "Online fee payment",
    ],
    importantNotes: ["e-visa or visa on arrival."],
    markerPriority: 3,
  },
};

/* Legacy starter visa guidance retained below only as an archived reference.
const curatedGuidanceold: Record<string, CuratedVisaGuidance> = {
  fr: {
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–45 days",
    fee: 90,
    summary:
      "A short-stay Schengen visa is required for tourism, family visits and business.",
    requirements: [
      "Passport valid for 3 months after return",
      "Proof of accommodation and financial means",
      "Travel insurance covering at least €30,000",
    ],
    markerPriority: 1,
  },
  tr: {
    name: "Türkiye",
    status: "visa-required",
    stayDays: 90,
    processingDays: "Varies",
    fee: null,
    summary:
      "Entry rules may vary by age and passport type. Confirm current exemptions with official authorities.",
    requirements: [
      "Valid passport for the intended stay",
      "Return ticket may be requested",
    ],
    importantNotes: [
      "Entry exemptions can depend on traveler age and passport details; verify with official Turkish authorities.",
    ],
    markerPriority: 1,
  },
  tn: {
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Short tourist stays are generally visa-free. Verify current entry rules before travelling.",
    requirements: [
      "Valid travel document",
      "Proof of accommodation may be requested",
    ],
    markerPriority: 1,
  },
  gb: {
    name: "United Kingdom",
    status: "visa-required",
    stayDays: 180,
    processingDays: "3–6 weeks",
    fee: 130,
    summary: "A Standard Visitor visa must be obtained before travelling.",
    requirements: [
      "Online application and biometric appointment",
      "Proof of funds and accommodation",
      "Valid passport",
    ],
    markerPriority: 2,
  },
  ae: {
    name: "United Arab Emirates",
    status: "e-visa",
    stayDays: 30,
    processingDays: "3–5 working days",
    fee: 85,
    summary:
      "Electronic travel authorization should be obtained before departure.",
    requirements: [
      "Passport valid for at least 6 months",
      "Digital passport photograph",
      "Return ticket and accommodation details",
    ],
    markerPriority: 1,
  },
  es: {
    status: "visa-required",
    stayDays: 90,
    processingDays: "15–30 days",
    fee: 90,
    summary: "A Schengen short-stay visa is required.",
    requirements: [
      "Passport valid for 3 months after return",
      "Travel medical insurance",
      "Proof of funds and itinerary",
    ],
    markerPriority: 2,
  },
  my: {
    status: "visa-free",
    stayDays: 90,
    processingDays: "No processing",
    fee: 0,
    summary:
      "Tourist stays may be visa-free for up to 90 days; verify current rules.",
    requirements: [
      "Passport valid for at least 6 months",
      "Onward travel ticket",
    ],
    markerPriority: 3,
  },
  jp: {
    status: "visa-required",
    stayDays: 90,
    processingDays: "5–10 working days",
    fee: 22,
    summary:
      "Apply for a short-stay visa through the relevant Japanese mission.",
    requirements: [
      "Application form and recent photograph",
      "Detailed itinerary",
      "Financial documents",
    ],
    markerPriority: 3,
  },
  eg: {
    status: "e-visa",
    stayDays: 30,
    processingDays: "7 working days",
    fee: 25,
    summary: "An electronic visa may be available for tourist visits.",
    requirements: [
      "Passport valid for 6 months",
      "Reservation confirmation",
      "Passport copy",
    ],
    markerPriority: 2,
  },
  ca: {
    status: "visa-required",
    stayDays: 180,
    processingDays: "4–8 weeks",
    fee: 100,
    summary: "A temporary resident visa is required before travel.",
    requirements: [
      "Online application and biometrics",
      "Employment and financial records",
      "Valid passport",
    ],
    importantNotes: [
      "US permanent residents (Green card holders) may enter visa-free.",
    ],
    markerPriority: 1,
  },
};

*/
const nonSovereignFlagMetadata: Record<
  string,
  Pick<Country, "name" | "capital" | "region" | "latitude" | "longitude">
> = {
  "gb-eng": {
    name: "England",
    capital: "London",
    region: "Europe",
    latitude: 52.3555,
    longitude: -1.1743,
  },
  "gb-nir": {
    name: "Northern Ireland",
    capital: "Belfast",
    region: "Europe",
    latitude: 54.7877,
    longitude: -6.4923,
  },
  "gb-sct": {
    name: "Scotland",
    capital: "Edinburgh",
    region: "Europe",
    latitude: 56.4907,
    longitude: -4.2026,
  },
  "gb-wls": {
    name: "Wales",
    capital: "Cardiff",
    region: "Europe",
    latitude: 52.1307,
    longitude: -3.7837,
  },
};

const unverifiedRequirements = [
  "Check passport validity and entry conditions with the destination's official authorities.",
];

function countryFromFlagAsset([assetPath, flag]: [string, string]): Country {
  const codeMatch = assetPath.match(/\/([a-z]{2,3}(?:-[a-z]{3})?)\.png$/i);
  if (!codeMatch) throw new Error(`Unexpected flag asset path: ${assetPath}`);
  const code = codeMatch[1].toLowerCase();
  const metadata = metadataByCode.get(code);
  const territory = nonSovereignFlagMetadata[code];
  const visaGuidance = curatedGuidance[code];
  const coordinates = metadata?.latlng;

  return {
    code: code.toUpperCase(),
    name:
      visaGuidance?.name ??
      territory?.name ??
      metadata?.name.common ??
      code.toUpperCase(),
    flag,
    capital: territory?.capital ?? metadata?.capital[0] ?? "",
    region: territory?.region ?? metadata?.region ?? "Other",
    status:
      visaGuidance?.status ??
      (code.startsWith("gb-") && curatedGuidance.gb
        ? curatedGuidance.gb.status
        : "visa-unknown"),
    stayDays: visaGuidance?.stayDays ?? 0,
    processingDays: visaGuidance?.processingDays ?? "To be confirmed",
    fee: visaGuidance?.fee ?? null,
    latitude: territory?.latitude ?? coordinates?.[0] ?? 0,
    longitude: territory?.longitude ?? coordinates?.[1] ?? 0,
    summary:
      visaGuidance?.summary ??
      "Visa guidance for Algerian passport holders has not yet been verified for this destination. Check official sources before travel.",
    requirements: visaGuidance?.requirements ?? unverifiedRequirements,
    importantNotes:
      visaGuidance?.importantNotes ??
      (visaGuidance
        ? undefined
        : [
            "Entry rules, permitted stay and fees have not been verified for Algerian passport holders. Consult official consular sources before making travel plans.",
          ]),
    markerPriority: visaGuidance?.markerPriority,
  };
}

/** One entry for every PNG in src/assets/flags; ISO country metadata provides map centers. */
export const featuredCountries: Country[] = Object.entries(flagAssets)
  .map(([assetPath, flag]) => countryFromFlagAsset([assetPath, flag]))
  .sort((first, second) => first.name.localeCompare(second.name));

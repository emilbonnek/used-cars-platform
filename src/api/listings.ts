import {
  Output,
  array,
  coerce,
  fallback,
  integer,
  maxValue,
  minValue,
  number,
  object,
  optional,
  parse,
  picklist,
  string,
  uuid,
} from "valibot";

export const LISTING_BRAND_OPTIONS = [
  "Toyota",
  "Honda",
  "Volvo",
  "Citroën",
  "Renault",
  "Peugeot",
  "BMW",
  "SEAT",
  "FIAT",
  "Dacia",
  "Skoda",
  "Volkswagen",
] as const;
export const LISTING_MIN_YEAR = 2000;
export const LISTING_MAX_YEAR = 2024;
export const LISTING_MIN_PRICE = 1;
export const LISTING_MAX_PRICE = 1_000_000;
export const LISTING_MIN_KILOMETERS_DRIVEN = 0;
export const LISTING_MAX_KILOMETERS_DRIVEN = 1_000_000;

export const ListingBrand = picklist(LISTING_BRAND_OPTIONS);
export const ListingYear = number([
  integer(),
  minValue(LISTING_MIN_YEAR),
  maxValue(LISTING_MAX_YEAR),
]);
export const ListingPrice = number([
  integer(),
  minValue(LISTING_MIN_PRICE),
  maxValue(LISTING_MAX_PRICE),
]);
export const ListingKilometersDriven = number([
  integer(),
  minValue(LISTING_MIN_KILOMETERS_DRIVEN),
  maxValue(LISTING_MAX_KILOMETERS_DRIVEN),
]);
export const Listing = object({
  id: string([uuid()]),
  brand: ListingBrand,
  year: ListingYear,
  name: string(),
  priceDKK: ListingPrice,
  kilometersDriven: ListingKilometersDriven,
  imageUrl: string(),
});
export type Listing = Output<typeof Listing>;

export const ListingSearch = object({
  brand: fallback(optional(ListingBrand), undefined),
  year: fallback(optional(coerce(ListingYear, Number)), undefined),
  minPrice: fallback(coerce(ListingPrice, Number), LISTING_MIN_PRICE),
  maxPrice: fallback(
    coerce(ListingPrice, Number),
    LISTING_MAX_KILOMETERS_DRIVEN
  ),
  minKilometersDriven: fallback(
    coerce(ListingKilometersDriven, Number),
    LISTING_MIN_KILOMETERS_DRIVEN
  ),
  maxKilometersDriven: fallback(
    coerce(ListingKilometersDriven, Number),
    LISTING_MAX_KILOMETERS_DRIVEN
  ),
});
export type ListingSearch = Output<typeof ListingSearch>;

/**
 * Get listings from the data/listings.json file
 *
 * @param search - The search parameters
 * @returns The listings
 */
export async function getListings(
  search: ListingSearch,
  signal: AbortSignal
): Promise<Listing[]> {
  const response = await fetch("/data/listings.json", { signal });
  const json = await response.json();
  const listings = parse(array(Listing), json);

  const filteredListings = listings.filter((listing) => {
    return (
      (!search.brand || listing.brand === search.brand) &&
      (!search.year || listing.year === search.year) &&
      listing.priceDKK >= search.minPrice &&
      listing.priceDKK <= search.maxPrice &&
      listing.kilometersDriven >= search.minKilometersDriven &&
      listing.kilometersDriven <= search.maxKilometersDriven
    );
  });

  return filteredListings;
}

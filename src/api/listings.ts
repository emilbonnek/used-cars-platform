import { rangeDelay } from "delay";
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
import { DELAY_MAX_MS, DELAY_MIN_MS } from "../delay";

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
export const LISTING_MIN_PRICE = 0;
export const LISTING_MAX_PRICE = 1_000_000;
export const LISTING_STEP_PRICE = 1000;
export const LISTING_MIN_KILOMETERS_DRIVEN = 0;
export const LISTING_MAX_KILOMETERS_DRIVEN = 1_000_000;
export const LISTING_STEP_KILOMETERS_DRIVEN = 1000;

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

export const ListingFilter = object({
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
export type ListingFilter = Output<typeof ListingFilter>;

/**
 * Get listings from the data/listings.json file and filter them based on search parameters
 *
 * @param listingFilter - The search parameters
 * @param signal - The abort signal
 * @returns The listings
 */
export async function getListings(
  listingFilter: ListingFilter,
  signal: AbortSignal
): Promise<Listing[]> {
  await rangeDelay(DELAY_MIN_MS, DELAY_MAX_MS, { signal });
  const response = await fetch("/data/listings.json", { signal });
  const json = await response.json();
  const listings = parse(array(Listing), json);

  const filteredListings = listings.filter((listing) => {
    return (
      (!listingFilter.brand || listing.brand === listingFilter.brand) &&
      (!listingFilter.year || listing.year === listingFilter.year) &&
      listing.priceDKK >= listingFilter.minPrice &&
      listing.priceDKK <= listingFilter.maxPrice &&
      listing.kilometersDriven >= listingFilter.minKilometersDriven &&
      listing.kilometersDriven <= listingFilter.maxKilometersDriven
    );
  });

  return filteredListings;
}

/**
 * Get listing from the data/listings.json file based on id
 *
 * @param id - The id of the listing
 * @param signal - The abort signal
 * @returns The listing
 */
export async function getListing(
  id: string,
  signal: AbortSignal
): Promise<Listing> {
  await rangeDelay(DELAY_MIN_MS, DELAY_MAX_MS, { signal });
  const response = await fetch("/data/listings.json", { signal });
  const json = await response.json();
  const listings = parse(array(Listing), json);
  const listing = listings.find((listing) => listing.id === id);
  if (!listing) {
    throw new Error("Listing not found");
  }
  return listing;
}

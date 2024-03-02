import {
  Output,
  array,
  integer,
  maxValue,
  minValue,
  number,
  object,
  parse,
  picklist,
  string,
  uuid,
} from "valibot";

const CAR_BRANDS = [
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

export const ListingSchema = object({
  id: string([uuid()]),
  brand: picklist(CAR_BRANDS),
  year: number([integer(), minValue(2000), maxValue(2024)]),
  name: string(),
  priceDKK: number([integer(), minValue(1)]),
  kilometersDriven: number([integer(), minValue(0)]),
  imageUrl: string(),
});

export type Listing = Output<typeof ListingSchema>;

/**
 * Get all listings from the data/listings.json file
 */
export async function getListings(): Promise<Listing[]> {
  const response = await fetch("/data/listings.json");
  const json = await response.json();
  const listings = parse(array(ListingSchema), json);
  return listings;
}

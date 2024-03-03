import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  LISTING_BRAND_OPTIONS,
  LISTING_MIN_YEAR,
  LISTING_MAX_YEAR,
  LISTING_MIN_PRICE,
  LISTING_MAX_PRICE,
  LISTING_MIN_KILOMETERS_DRIVEN,
  LISTING_MAX_KILOMETERS_DRIVEN,
  ListingSearch,
} from "../api/listings";
import { useEffect } from "react";

interface FormListingSearchProps {
  search: ListingSearch;
  onSubmit: (newSearch: ListingSearch) => void;
}

export function FormListingSearch({
  search,
  onSubmit,
}: FormListingSearchProps) {
  const { register, handleSubmit, watch } = useForm<ListingSearch>({
    defaultValues: search,
    resolver: valibotResolver(ListingSearch),
  });

  // Watch for changes to the form and submit the form when it changes
  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  return (
    <form
      onSubmit={handleSubmit((newSearch) => {
        onSubmit(newSearch);
      })}
    >
      <div className="flex gap-2">
        <div>
          <label htmlFor="brand">Brand</label>
          <select {...register("brand")}>
            <option>All</option>
            {LISTING_BRAND_OPTIONS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <select {...register("year")}>
            <option>All</option>
            {Array.from({
              length: LISTING_MAX_YEAR - LISTING_MIN_YEAR + 1,
            }).map((_, index) => {
              const year = LISTING_MAX_YEAR - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Price</label>
          <input
            {...register("minPrice")}
            type="number"
            min={LISTING_MIN_PRICE}
            max={LISTING_MAX_PRICE}
            placeholder="Min price"
          />
          <input
            {...register("maxPrice")}
            type="number"
            min={LISTING_MIN_PRICE}
            max={LISTING_MAX_PRICE}
            placeholder="Max price"
          />
        </div>

        <div>
          <label>Km Driven</label>
          <input
            {...register("minKilometersDriven")}
            type="number"
            min={LISTING_MIN_KILOMETERS_DRIVEN}
            max={LISTING_MAX_KILOMETERS_DRIVEN}
            placeholder="Min kilometers driven"
          />
          <input
            {...register("maxKilometersDriven")}
            type="number"
            min={LISTING_MIN_KILOMETERS_DRIVEN}
            max={LISTING_MAX_KILOMETERS_DRIVEN}
            placeholder="Max kilometers driven"
          />
        </div>
      </div>
    </form>
  );
}

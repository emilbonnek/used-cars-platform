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
  ListingFilter,
  LISTING_STEP_KILOMETERS_DRIVEN,
  LISTING_STEP_PRICE,
} from "../api/listings";
import { useEffect } from "react";

interface FormListingSearchProps {
  search: ListingFilter;
  onSubmit: (newSearch: ListingFilter) => void;
}

export function FormListingSearch({
  search,
  onSubmit,
}: FormListingSearchProps) {
  const { register, handleSubmit, watch } = useForm<ListingFilter>({
    defaultValues: search,
    resolver: valibotResolver(ListingFilter),
  });

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
      <div className="grid grid-cols-2 gap-4 px-8 md:grid-cols-3">
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-nowrap text-sm font-bold text-gray-700">
            Car
          </label>
          <select
            {...register("brand")}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option>All brands</option>
            {LISTING_BRAND_OPTIONS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            {...register("year")}
            className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option>All years</option>
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
          <label className="mb-2 block text-nowrap text-sm font-bold text-gray-700">
            Price (DKK)
          </label>
          <input
            {...register("minPrice")}
            type="number"
            min={LISTING_MIN_PRICE}
            max={LISTING_MAX_PRICE}
            step={LISTING_STEP_PRICE}
            placeholder="Min price"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          <input
            {...register("maxPrice")}
            type="number"
            min={LISTING_MIN_PRICE}
            max={LISTING_MAX_PRICE}
            step={LISTING_STEP_PRICE}
            placeholder="Max price"
            className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-nowrap text-sm font-bold text-gray-700">
            Driven (km)
          </label>
          <input
            {...register("minKilometersDriven")}
            type="number"
            min={LISTING_MIN_KILOMETERS_DRIVEN}
            max={LISTING_MAX_KILOMETERS_DRIVEN}
            step={LISTING_STEP_KILOMETERS_DRIVEN}
            placeholder="Min kilometers driven"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          <input
            {...register("maxKilometersDriven")}
            type="number"
            min={LISTING_MIN_KILOMETERS_DRIVEN}
            max={LISTING_MAX_KILOMETERS_DRIVEN}
            step={LISTING_STEP_KILOMETERS_DRIVEN}
            placeholder="Max kilometers driven"
            className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}

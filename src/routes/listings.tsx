import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListingSearch, getListings } from "../api/listings";
import { CardListing } from "../components/CardListing";
import { Output, merge, parse } from "valibot";
import { FormListingSearch } from "../components/FormListingSearch";
import { Paginate } from "../pagination";
import { FormPageSize } from "../components/FormPageSize";
import { NavPagination } from "../components/NavPagination";

const ListingsSearchAndPaginate = merge([ListingSearch, Paginate]);
type ListingsSearchAndPaginate = Output<typeof ListingsSearchAndPaginate>;

export const Route = createFileRoute("/listings")({
  component: Listings,
  validateSearch: (search: Record<string, unknown>) =>
    parse(ListingsSearchAndPaginate, search),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { pageSize, page, ...search }, abortController }) => {
    const listings = await getListings(search, abortController.signal);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedListings = listings.slice(start, end);
    const pageCount = Math.ceil(listings.length / pageSize);

    return {
      listings: paginatedListings,
      pageCount,
    };
  },
});

function Listings() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { listings, pageCount } = Route.useLoaderData();
  const { pageSize, page, ...search } = Route.useSearch();

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <FormListingSearch
          search={search}
          onSubmit={(newSearch) => {
            navigate({
              search: {
                ...newSearch,
                pageSize,
                page: 1, // Reset page offset when searching
              },
            });
          }}
        />

        <FormPageSize
          search={{ pageSize }}
          onSubmit={({ pageSize: newPageSize }) => {
            navigate({
              search: {
                ...search,
                pageSize: newPageSize,
                page: 1, // Reset page offset when changing page size
              },
            });
          }}
        />
      </div>

      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <CardListing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <NavPagination page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}

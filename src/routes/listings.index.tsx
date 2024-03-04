import { createFileRoute } from "@tanstack/react-router";
import { getListings } from "../api/listings";
import { CardListing } from "../components/CardListing";
import { Spinner } from "../components/Spinner";
import { NavPagination } from "../components/NavPagination";

export const Route = createFileRoute("/listings/")({
  component: Listings,
  pendingComponent: Spinner,
  pendingMs: 0,
  pendingMinMs: 1500,
  loaderDeps: ({ search }) => search,
  loader: async ({
    deps: { pageSize, page, ...listingSearch },
    abortController,
    navigate,
  }) => {
    const listings = await getListings(listingSearch, abortController.signal);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedListings = listings.slice(start, end);

    const listingsCount = listings.length;
    const pageCount = Math.ceil(listingsCount / pageSize);
    if (page > pageCount) {
      navigate({
        search: {
          ...listingSearch,
          pageSize,
          page: pageCount,
        },
      });
    }

    return {
      listings: paginatedListings,
      listingsCount,
    };
  },
});

function Listings() {
  const { listings, listingsCount } = Route.useLoaderData();
  const { pageSize, page } = Route.useSearch();

  return (
    <div>
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="my-4">
          <p className="text-gray-600">Showing {listingsCount} listings</p>
        </div>

        <div className="grid gap-6 md:gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <CardListing key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <NavPagination
          pageSize={pageSize}
          page={page}
          elementsCount={listingsCount}
        />
      </div>
    </div>
  );
}

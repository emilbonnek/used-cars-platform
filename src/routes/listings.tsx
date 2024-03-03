import {
  Await,
  createFileRoute,
  defer,
  useNavigate,
} from "@tanstack/react-router";
import { ListingFilter, getListings } from "../api/listings";
import { CardListing } from "../components/CardListing";
import { Output, merge, parse } from "valibot";
import { FormListingSearch } from "../components/FormListingSearch";
import { Paginate } from "../pagination";
import { FormPageSize } from "../components/FormPageSize";
import { Spinner } from "../components/Spinner";
import { Suspense } from "react";
import { NavPagination } from "../components/NavPagination";

const ListingsFilterAndPaginate = merge([ListingFilter, Paginate]);
type ListingsFilterAndPaginate = Output<typeof ListingsFilterAndPaginate>;

export const Route = createFileRoute("/listings")({
  component: Listings,
  pendingComponent: Spinner,
  validateSearch: (search: Record<string, unknown>) =>
    parse(ListingsFilterAndPaginate, search),
  loaderDeps: ({ search }) => search,
  loader: ({
    deps: { pageSize, page, ...listingSearch },
    abortController,
    navigate,
  }) => {
    const listings = getListings(listingSearch, abortController.signal);

    listings.then((listings) => {
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
    });

    const defferedPaginatedListings = defer(
      listings.then((listings) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return listings.slice(start, end);
      }),
    );

    const defferedListingsCount = defer(
      listings.then((listings) => {
        return listings.length;
      }),
    );

    return {
      defferedListings: defferedPaginatedListings,
      defferedListingsCount,
    };
  },
});

function Listings() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { defferedListings, defferedListingsCount } = Route.useLoaderData();
  const { pageSize, page, ...search } = Route.useSearch();

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 bg-slate-100 px-2 py-6 md:flex-row">
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

      <div className="container mx-auto px-4 py-4 md:px-6">
        <Suspense fallback={<Spinner />}>
          <Await promise={defferedListingsCount}>
            {(listingsCount) => {
              return (
                <div className="my-4">
                  <p className="text-gray-600">
                    Showing {listingsCount} listings
                  </p>
                </div>
              );
            }}
          </Await>
          <div className="grid gap-6 md:gap-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Await promise={defferedListings}>
                {(listings) => {
                  return listings.map((listing) => (
                    <CardListing key={listing.id} listing={listing} />
                  ));
                }}
              </Await>
            </div>
          </div>
        </Suspense>
      </div>

      <div className="flex justify-center">
        <NavPagination
          pageSize={pageSize}
          page={page}
          defferedElementsCount={defferedListingsCount}
        />
      </div>
    </div>
  );
}

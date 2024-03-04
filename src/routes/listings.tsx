import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListingFilter } from "../api/listings";
import { Output, merge, parse } from "valibot";
import { FormListingSearch } from "../components/FormListingSearch";
import { Paginate } from "../pagination";
import { FormPageSize } from "../components/FormPageSize";

const ListingsFilterAndPaginate = merge([ListingFilter, Paginate]);
type ListingsFilterAndPaginate = Output<typeof ListingsFilterAndPaginate>;

export const Route = createFileRoute("/listings")({
  component: ListingsLayout,
  validateSearch: (search: Record<string, unknown>) =>
    parse(ListingsFilterAndPaginate, search),
});

function ListingsLayout() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { pageSize, page: _page, ...search } = Route.useSearch();

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

      <Outlet />
    </div>
  );
}

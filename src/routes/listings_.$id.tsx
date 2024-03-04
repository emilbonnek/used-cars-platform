import { createFileRoute } from "@tanstack/react-router";
import { getListing } from "../api/listings";

export const Route = createFileRoute("/listings/$id")({
  component: ListingId,
  loader: async ({ params, abortController }) => {
    return getListing(params.id, abortController.signal);
  },
});

function ListingId() {
  const listing = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div
          className="h-56 bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${listing.imageUrl})` }}
        >
          <div className="flex justify-end">
            <span className="badge rounded bg-blue-800 px-2 py-1 text-white">
              {listing.year}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold uppercase">
            {listing.brand} {listing.name}
          </h3>
          <p className="text-md mt-2">
            <strong>ID:</strong> {listing.id}
          </p>
          <p className="text-md">
            <strong>Kilometers Driven:</strong>{" "}
            {listing.kilometersDriven.toLocaleString()} km
          </p>
          <p className="mt-3 text-lg font-semibold">
            {listing.priceDKK.toLocaleString()} DKK
          </p>
        </div>
      </div>
    </div>
  );
}

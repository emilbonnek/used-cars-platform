import { createFileRoute } from "@tanstack/react-router";
import { getListing } from "../api/listings";
import { CardListing } from "../components/CardListing";

export const Route = createFileRoute("/listings/$id")({
  component: ListingId,
  loader: async ({ params, abortController }) => {
    return getListing(params.id, abortController.signal);
  },
});

function ListingId() {
  const listing = Route.useLoaderData();

  return (
    <div>
      <CardListing listing={listing} />
    </div>
  );
}

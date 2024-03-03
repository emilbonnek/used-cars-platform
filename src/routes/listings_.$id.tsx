import { createFileRoute } from "@tanstack/react-router";
import { getListing } from "../api/listings";
import { CardListing } from "../components/CardListing";
import { Spinner } from "../components/Spinner";

export const Route = createFileRoute("/listings/$id")({
  component: ListingId,
  pendingComponent: Spinner,
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

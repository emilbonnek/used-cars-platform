import { createFileRoute } from "@tanstack/react-router";
import { getUser } from "../api/user";
import {
  LISTING_MAX_KILOMETERS_DRIVEN,
  LISTING_MAX_PRICE,
  LISTING_MIN_KILOMETERS_DRIVEN,
  LISTING_MIN_PRICE,
  getListings,
} from "../api/listings";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ abortController }) => {
    const [user, listings] = await Promise.all([
      getUser(abortController.signal),
      getListings(
        {
          minPrice: LISTING_MIN_PRICE,
          maxPrice: LISTING_MAX_PRICE,
          minKilometersDriven: LISTING_MIN_KILOMETERS_DRIVEN,
          maxKilometersDriven: LISTING_MAX_KILOMETERS_DRIVEN,
        },
        abortController.signal
      ),
    ]);
    const listingsCount = listings.length;
    return { user, listingsCount };
  },
});

function Index() {
  const { user, listingsCount } = Route.useLoaderData();

  return (
    <div>
      <h1>Hello {user.firstName}!</h1>
      <p>There is {listingsCount} listings.</p>
    </div>
  );
}

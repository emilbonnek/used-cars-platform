import { Link, createFileRoute } from "@tanstack/react-router";
import { getUser } from "../api/user";
import {
  LISTING_MAX_KILOMETERS_DRIVEN,
  LISTING_MAX_PRICE,
  LISTING_MIN_KILOMETERS_DRIVEN,
  LISTING_MIN_PRICE,
  getListings,
} from "../api/listings";
import { Spinner } from "../components/Spinner";

export const Route = createFileRoute("/")({
  component: Index,
  pendingComponent: Spinner,
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
        abortController.signal,
      ),
    ]);
    const listingsCount = listings.length;
    return { user, listingsCount };
  },
});

function Index() {
  const { user, listingsCount } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {user.firstName}!
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {/* User Information Card */}
        <div className="min-w-[280px] flex-1 rounded-lg bg-blue-100 p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Information
          </h2>
          <p className="text-md mt-2">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p className="text-md">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        {/* Listings Count Card */}
        <div className="min-w-[280px] flex-1 rounded-lg bg-green-100 p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800">
            Listings Available
          </h2>
          <p className="my-4 text-center text-3xl font-bold">{listingsCount}</p>
          <p className="text-md mb-4 text-center">
            Total listings on the platform
          </p>
          <div className="text-center">
            <Link
              to="/listings"
              search={{
                minPrice: LISTING_MIN_PRICE,
                maxPrice: LISTING_MAX_PRICE,
                minKilometersDriven: LISTING_MIN_KILOMETERS_DRIVEN,
                maxKilometersDriven: LISTING_MAX_KILOMETERS_DRIVEN,
                pageSize: 10,
                page: 1,
              }}
              className="inline-block rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600"
            >
              View Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

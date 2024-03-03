import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { LISTING_MAX_PRICE, LISTING_MIN_PRICE } from "../api/listings";

export const Route = createRootRoute({
  component: () => (
    <>
      <Link to="/">Home</Link>
      <Link
        to="/listings"
        search={{
          pageSize: 10,
          page: 1,
          minPrice: LISTING_MIN_PRICE,
          maxPrice: LISTING_MAX_PRICE,
          minKilometersDriven: LISTING_MIN_PRICE,
          maxKilometersDriven: LISTING_MAX_PRICE,
        }}
      >
        Listings
      </Link>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

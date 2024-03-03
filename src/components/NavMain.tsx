import { Link } from "@tanstack/react-router";
import {
  LISTING_MAX_KILOMETERS_DRIVEN,
  LISTING_MAX_PRICE,
  LISTING_MIN_KILOMETERS_DRIVEN,
  LISTING_MIN_PRICE,
} from "../api/listings";

export function NavMain() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-10 py-4">
        <ul className="flex space-x-4 font-mono">
          <li>
            <Link to="/" className="hover:underline [&.active]:font-bold">
              Home
            </Link>
          </li>
          <li>
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
              className="hover:underline [&.active]:font-bold"
              activeOptions={{
                includeSearch: false,
              }}
            >
              Listings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

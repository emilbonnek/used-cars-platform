import { Link } from "@tanstack/react-router";
import { Listing } from "../api/listings";

interface CardListingProps {
  listing: Listing;
}
export function CardListing({ listing }: CardListingProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      <img
        className="aspect-[2/1] w-full object-cover"
        src={listing.imageUrl}
        alt={`${listing.brand} ${listing.name}`}
      />
      <div className="flex flex-col justify-between bg-white p-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">
            {listing.year} {listing.brand} {listing.name}
          </h2>
          <p className="text-sm text-gray-600">ID: {listing.id}</p>
          <p className="text-sm text-gray-600">
            {listing.kilometersDriven.toLocaleString()} km
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {listing.priceDKK.toLocaleString()} DKK
          </h3>
          <Link
            className="text-sm font-medium text-indigo-600 underline transition-colors duration-200 hover:text-indigo-800"
            to={`/listings/$id`}
            params={{ id: listing.id }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

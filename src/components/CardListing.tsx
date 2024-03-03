import { Listing } from "../api/listings";

interface CardListingProps {
  listing: Listing;
}
export function CardListing({ listing }: CardListingProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex-1 grid gap-2 p-4">
        <h2 className="text-xl font-semibold leading-none">
          {listing.year} {listing.brand} {listing.name}
        </h2>
        <p className="text-sm leading-none">ID: {listing.id}</p>
        <p className="text-sm leading-none">{listing.kilometersDriven} km</p>
        <div className="flex items-end gap-4 mt-auto">
          <h3 className="font-semibold">{listing.priceDKK} DKK</h3>
          <button className="text-sm text-blue-600">View</button>
        </div>
      </div>
      <img
        className="w-full aspect-[2/1]"
        height={200}
        src={listing.imageUrl}
        width={400}
      />
    </div>
  );
}

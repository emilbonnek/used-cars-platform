import { createFileRoute } from "@tanstack/react-router";
import { getUser } from "../api/user";
import { getListings } from "../api/listings";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const [user, listings] = await Promise.all([getUser(), getListings()]);
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

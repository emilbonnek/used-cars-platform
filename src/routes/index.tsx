import { createFileRoute } from "@tanstack/react-router";
import { getUser } from "../api/user";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const user = await getUser();
    return { user };
  },
});

function Index() {
  const { user } = Route.useLoaderData();

  return (
    <div>
      <h1>Hello {user.firstName}!</h1>
    </div>
  );
}

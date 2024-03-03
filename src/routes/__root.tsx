import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavMain } from "../components/NavMain";
import { NavigateHome } from "../components/NavigateHome";

export const Route = createRootRoute({
  notFoundComponent: NavigateHome,
  component: () => (
    <>
      <NavMain />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

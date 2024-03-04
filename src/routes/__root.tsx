import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavMain } from "../components/NavMain";
import { NavigateHome } from "../components/NavigateHome";
import React, { Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  notFoundComponent: NavigateHome,
  pendingComponent: () => <></>,
  component: () => (
    <>
      <NavMain />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});

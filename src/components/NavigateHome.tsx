import { Navigate } from "@tanstack/react-router";

export function NavigateHome() {
  return <Navigate to="/" replace />;
}

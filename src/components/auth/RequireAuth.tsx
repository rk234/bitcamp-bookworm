import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ReactNode } from "react";

export default function RequireAuth({ noAuth = false, redirect = "/login", children }: { noAuth?: boolean, redirect?: string, children?: ReactNode }) {
  const { isAuthed, isLoading } = useAuth();

  if (isLoading) {
    return <p>Doing some important stuff...</p> //TODO: make this better
  }

  if (isAuthed) {
    if (!noAuth) {
      return children;
    } else {
      return <Navigate to={redirect ?? "/login"} />
    }
  } else {
    if (noAuth) {
      return children;
    } else {
      return <Navigate to={redirect ?? "/login"} />
    }
  }
}

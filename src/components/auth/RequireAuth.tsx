import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthed, isLoading } = useAuth();

  if (isLoading) {
    return <p>Doing some important stuff...</p> //TODO: make this better
  }

  if (isAuthed) {
    return children;
  } else {
    return <Navigate to={"/"} />
  }
}

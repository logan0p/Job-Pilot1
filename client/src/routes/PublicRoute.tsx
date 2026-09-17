import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";

type Props = {
  children: ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
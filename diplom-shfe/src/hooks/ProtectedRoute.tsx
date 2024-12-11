import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
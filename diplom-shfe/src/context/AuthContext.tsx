import { createContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

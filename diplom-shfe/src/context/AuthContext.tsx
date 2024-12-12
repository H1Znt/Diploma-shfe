import { createContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  isTransferred: boolean;
  login: () => void;
  logout: () => void;
  transferIn: () => void;
  transferOut: () => void;
  
}

export const AuthContext = createContext<IAuthContext | null>(null);

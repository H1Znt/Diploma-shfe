import { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

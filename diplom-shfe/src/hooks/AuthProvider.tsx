import { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [isTransferred, setIsTransferred] = useState(localStorage.getItem('isTransferred') === 'true');

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const transferIn = () => setIsTransferred(true);
  const transferOut= () => setIsTransferred(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isTransferred, login, logout, transferIn, transferOut}}>
      {children}
    </AuthContext.Provider>
  );
}

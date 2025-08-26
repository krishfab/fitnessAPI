import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access") || "");

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("access", token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("access");
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
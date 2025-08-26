import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContext } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null); // clear state
    window.location.href = "/login"; // redirect
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

root.render(<Root />);


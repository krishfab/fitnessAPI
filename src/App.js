import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import NavBar from "./components/NavBar";
import Home from "./components/HomeHeader";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";

import './App.css';

export default function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
       <Routes>
      <Route path="/home" element={<Home />} />
       <Route
         path="/login"
    element={token ? <Navigate to="/workouts" /> : <Login />}
     />
      <Route
        path="/workouts"
        lement={token ? <Dashboard /> : <Navigate to="/login" />}
     />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
       path="/logout"
       element={<Logout />}
       />
</Routes>
      </div>
    </>
  );
}




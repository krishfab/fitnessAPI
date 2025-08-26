import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      logout(); // clear token and user data
      navigate("/login", { replace: true }); // redirect to login page
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="text-center mt-20">
      <p>Logging out...</p>
    </div>
  );
}


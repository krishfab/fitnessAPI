import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear token and user data
    navigate("/login"); // redirect to login page
  }, [logout, navigate]);

  return (
    <div className="text-center mt-20">
      <p>Logging out...</p>
    </div>
  );
}

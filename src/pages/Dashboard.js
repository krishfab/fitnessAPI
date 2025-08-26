import { useEffect, useState, useContext } from "react";
import WorkoutForm from "../components/WorkOutForm";
import WorkoutList from "../components/WorkOutList";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { user, token } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    if (!token) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setWorkouts(data.workouts || []);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  return (
    <div className="App dashboard">
      {/* Profile Card */}
      <div className="profile-card d-flex justify-content-center align-items-center">
        <div className="profile-info">
          <h2 className="dashboard-header">Your Fitness Journey</h2>
          {user && (
            <p className="profile-subtext">
              {user.firstName} {user.lastName} ({user.email})
            </p>
          )}
        </div>
        {/* Logout button removed; now in NavBar or Logout component */}
      </div>

      {/* Workouts section */}
      <h3 className="dashboard-subheader">My Workouts</h3>
      <WorkoutForm refresh={fetchWorkouts} />
      <WorkoutList workouts={workouts} refresh={fetchWorkouts} />
    </div>
  );
}

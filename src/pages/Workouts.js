import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import WorkoutCard from "../components/WorkoutCard";

const Workouts = () => {
  const { token } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch("http://localhost:4000/getMyWorkouts", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getWorkouts();
    }
  }, [token]);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Workouts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;

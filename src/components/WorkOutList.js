export default function WorkoutList({ workouts, refresh }) {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    refresh();
  };

  const handleComplete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/workouts/completeWorkoutStatus/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    refresh();
  };

  return (
    <div className="mt-4 space-y-2">
      {workouts.map((w) => (
        <div
          key={w._id}
          className="p-3 border rounded flex justify-between items-center"
        >
          <div className="workout-info">
            <p className="card-title">{w.name}</p>
            <p className="card-details">Duration: {w.duration} min</p>
            <p
              className={`text-xs ${
                w.status === "completed" ? "text-green-600" : "text-gray-500"
              }`}
            >
              {w.status || "pending"}
            </p>
          </div>
          <div className="flex gap-2 status-card">
            {w.status !== "completed" && (
              <button
                onClick={() => handleComplete(w._id)}
                className="complete-button"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => handleDelete(w._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

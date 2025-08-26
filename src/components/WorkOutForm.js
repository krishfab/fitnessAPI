import { useState } from "react";

export default function WorkoutForm({ refresh }) {
  const [form, setForm] = useState({ name: "", duration: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add workout");
      setForm({ name: "", duration: "" });
      refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Workout Name"
        className="border p-2 flex-1"
      />
      <input
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duration (min)"
        className="border p-2 w-28"
      />
      <button className="add-button">Add</button>
    </form>
  );
}

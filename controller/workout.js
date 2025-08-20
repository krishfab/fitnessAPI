const Workout = require("../models/Workout");

// Add workout
module.exports.addWorkout = async (req, res) => {
  const workout = await new Workout({ userId: req.user.id, ...req.body }).save();
  return res.status(201).json({ success: true, data: workout });
};

// Get workouts
module.exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  return res.status(200).json({ success: true, data: workouts });
};

// Update workout
module.exports.updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  return res.status(200).json({ success: true, data: workout });
};

// Delete workout
module.exports.deleteWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  return res.status(200).json({ success: true, message: "Workout deleted" });
};

// Complete workout
module.exports.completeWorkoutStatus = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  workout.status = "completed";
  await workout.save();

  return res.status(200).json({ success: true, data: workout });
};
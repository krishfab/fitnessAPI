const Workout = require("../models/Workout");

module.exports.addWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;

    const newWorkout = new Workout({
      userId: req.user.id, 
      name,
      duration,
      status
    });

    const workout = await newWorkout.save();

    return res.status(201).json({ success: true, data: workout });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    console.log("req.user:", req.user);
    return res.status(200).json({ success: true, data: workouts });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    return res.status(200).json({ success: true, data: workout });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    return res.status(200).json({ success: true, message: "Workout deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    workout.status = "completed";
    await workout.save();

    return res.status(200).json({ success: true, data: workout });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
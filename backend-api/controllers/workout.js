const Workout = require("../models/Workout");

// Add workout
module.exports.addWorkout = async (req, res) => {
  try {
        const workout = new Workout({
            userId: req.user.id,
            name: req.body.name,
            duration: req.body.duration
        });

        await workout.save();
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update workout
module.exports.updateWorkout = async (req, res) => {
  try {
        const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Workout not found" });
        return res.json({
            message: "Workout status updated successfully",
            updatedWorkout: updated});
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// Get workouts
module.exports.getWorkouts = async (req, res) => {
  try {
        const workouts = await Workout.find({ userId: req.user.id });
        return res.json({workouts: workouts});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



// Delete workout
module.exports.deleteWorkout = async (req, res) => {
   try {
        const deleted = await Workout.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Workout not found" });
        return res.json({ message: "Workout deleted" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// Complete workout
module.exports.completeWorkoutStatus = async (req, res) => {
   try {
        const { id } = req.params;

        const workout = await Workout.findByIdAndUpdate(
            id,
            { status: "completed" },
            { new: true, runValidators: true }
        );

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        return res.json({
            message: "Workout marked as completed",
            workout
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
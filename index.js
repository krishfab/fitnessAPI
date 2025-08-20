const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const port = process.env.PORT || 4000;

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
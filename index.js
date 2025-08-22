const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));
const port = process.env.PORT || 4000;

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app, mongoose };
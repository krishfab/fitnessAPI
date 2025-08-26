const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/users");
const workoutRoutes = require("./routes/workout");

require("dotenv").config();


const app = express();
app.use(express.json());

const corsOptions = {
    origin: [
        'https://fitness-api-rouge.vercel.app',
        'http://localhost:3000',
        'http://localhost:8000'
    ],
    
        credentials: true,
        optionsSuccessStatus:200
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if(require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000}`)
    })
}

module.exports = { app, mongoose };
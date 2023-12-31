import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import citiesRoutes from "./router/citiesRoutes.js";
import itineraryRoutes from "./router/itineraryRoutes.js";
import authRoutes from "./router/authRoutes.js";
import './config/passport.js';
import cors from "cors";

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));


app.use(express.json());



app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/cities", citiesRoutes);
app.use("/itinerary", itineraryRoutes);
app.use('/auth', authRoutes);
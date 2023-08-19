import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import citiesRoutes from "./router/citiesRoutes.js";

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.use("/cities", citiesRoutes);
// Agregar más rutas aquí si es necesario

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
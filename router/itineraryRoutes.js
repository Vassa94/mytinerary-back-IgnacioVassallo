import express from "express";
import itineraryController from "../controllers/itineraryController.js";

const itineraryRoutes = express.Router();

itineraryRoutes.post("/add", itineraryController.createItinerary);
itineraryRoutes.post("/add/bulk", itineraryController.createItineraries);
itineraryRoutes.get("/view", itineraryController.getAllItineraries);
itineraryRoutes.get("/view/:city", itineraryController.getItinerariesByCity);
itineraryRoutes.put("/update/:id", itineraryController.updateItinerary);
itineraryRoutes.delete("/remove/:id", itineraryController.deleteItinerary);


export default itineraryRoutes;
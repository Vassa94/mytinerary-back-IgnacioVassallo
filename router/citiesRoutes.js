import express from 'express';
import cityController from '../controllers/citiesController.js'; 

const citiesRoutes = express.Router();


citiesRoutes.post("/add", cityController.createCity);
citiesRoutes.post("/add/bulk", cityController.createCities);
citiesRoutes.get("/view", cityController.getAllCities);
citiesRoutes.get("/find/:id", cityController.getCityById);
citiesRoutes.put("/update/:id", cityController.updateCity);
citiesRoutes.delete("/remove/:id", cityController.deleteCity);

export default citiesRoutes;
import City from "../models/CitiesModel.js";

const citiesController = {
  createCity: async (req, res) => {
    try {
      const city = req.body;
      const newCity = new City(city);
      await newCity.save();
      res.status(201).json(newCity);
    } catch (error) {
      res.status(500).json({ error: "Error creating city" });
    }
  },

  createCities: async (req, res) => {
    try {
      const citiesData = req.body;
      console.log(citiesData) // Un array de objetos de ciudades
      const createdCities = await City.insertMany(citiesData);
      res.status(201).json(createdCities);
    } catch (error) {
      res.status(500).json({ error: "Error creating cities" });
    }
  },

  getCityById: async (req, res) => {
    try {
      const city = await City.findById(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "City not found" });
      }
      res.json(city);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching city" });
    }
  },

  getAllCities: async (req, res) => {
    try {
      const cities = await City.find();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: "Error fetching cities" });
    }
  },

  updateCity: async (req, res) => {
    try {
      const city = await City.findById(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "City not found" });
      }

      city.name = req.body.name || city.name;
      // Actualiza otros campos aquí si es necesario
      await city.save();
      res.json(city);
    } catch (error) {
      res.status(500).json({ error: "Error updating city" });
    }
  },

  deleteCity: async (req, res) => {
    try {
      const city = await City.findById(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "City not found" });
      }
      await city.remove();
      res.json({ message: "City deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting city" });
    }
  },
};

export default citiesController; 

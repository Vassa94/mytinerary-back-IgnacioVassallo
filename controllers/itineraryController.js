import Itinerary from "../models/ItinerariesModel.js";
import City from "../models/CitiesModel.js";

const itineraryController = {
    createItinerary: async (req, res) => {
        try {
            const itineraryData = req.body;
            const city = await City.findOne({ city : itineraryData.city});
            itineraryData.city = city._id;
            const newItinerary = new Itinerary(itineraryData);
            await newItinerary.save();
            res.status(201).json(newItinerary);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error creating itinerary" });
        }
    },

    createItineraries: async (req, res) => {
        try {
            const itineraryDataArray = req.body;
            const result = [];
    
            for (const itineraryData of itineraryDataArray) {
                const city = await City.findOne({ city: itineraryData.city });
    
                if (!city) {
                    console.log(`City not found for itinerary: ${itineraryData.city}`);
                    result.push({ error: `City not found for itinerary: ${itineraryData.city}` });
                } else {
                    itineraryData.city = city._id;
                    const newItinerary = new Itinerary(itineraryData);
                    await newItinerary.save();
                    result.push(newItinerary);
                }
            }
    
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error creating itineraries" });
        }
    },
    

    getAllItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find();
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: "Error fetching itineraries" });
        }
    },

    getItinerariesByCity: async (req, res) => {
        try {
            const cityName = req.params.city; // Obtener el nombre de la ciudad desde la URL
            const itineraries = await Itinerary.find({ city: cityName });
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: "Error fetching itineraries by city" });
        }
    },

    updateItinerary: async (req, res) => {
        try {
            const itineraryId = req.params.id;
            const updatedItineraryData = req.body;
            const updatedItinerary = await Itinerary.findByIdAndUpdate(itineraryId, updatedItineraryData, { new: true });
            res.json(updatedItinerary);
        } catch (error) {
            res.status(500).json({ error: "Error updating itinerary" });
        }
    },

    deleteItinerary: async (req, res) => {
        try {
            const itineraryId = req.params.id;
            await Itinerary.findByIdAndDelete(itineraryId);
            res.json({ message: "Itinerary deleted" });
        } catch (error) {
            res.status(500).json({ error: "Error deleting itinerary" });
        }
    },

    getCityWithItineraries: async (req, res) => {
        try {
            const cityName = req.params.city; // Obtener el nombre de la ciudad desde la URL
            const city = await City.findOne({ city: cityName }).populate("itineraries");
            res.json(city);
        } catch (error) {
            res.status(500).json({ error: "Error fetching city with itineraries" });
        }
    },

};

export default itineraryController;
import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    country: { type: String, required: true },
    fundation: { type: Date, required: true },
    population: { type: Number, required: true },
    photo: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    smalldescription: { type: String, required: true },
    featuredLocation: { type: String, required: true },
    itineraries: { type: Array},
});

export default mongoose.model("City", citySchema);
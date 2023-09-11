import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    photo: { type: String, required: true },
    likes: { type: Number, required: true },
    user: { type: String, required: true },
    hashtags: { type: [String], required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    
});

export default mongoose.model("Itinerary", itinerarySchema);
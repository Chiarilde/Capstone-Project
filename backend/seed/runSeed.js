import mongoose from "mongoose";
import Venue from "../modules/venue/venue.schema.js";
import { seedVenues } from "./seedVenue.js";
import dotenv from "dotenv";

dotenv.config();
const mongoUri = process.env.MONGO_URI;

const runSeed = async () => {
    try {
        await mongoose.connect(mongoUri);

        console.log("Connected to MongoDB");
        await Venue.insertMany(seedVenues);
        console.log("Seed inserted successfully");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runSeed();

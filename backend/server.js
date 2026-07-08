import express, { json } from "express";

import cors from "cors";
import authRoute from "./modules/auth/auth.route.js";
import venueRoutes from "./modules/venue/venue.route.js";

import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const server = express();

server.use(cors());
server.use(json());
server.use("/", authRoute);
server.use("/venues", venueRoutes);

server.get("/", (req, res) => {
    res.send("Server is up and running");
});

const PORT = process.env.PORT || 9090;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import * as venueController from "../venue/venue.controller.js";

const router = express.Router();

router.get("/", venueController.getAllVenues);

router.get("/:id", venueController.getVenueById);

export default router;

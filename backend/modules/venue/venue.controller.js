import * as venueService from "../venue/venue.service.js";

export const getAllVenues = async (req, res) => {
    try {
        const venues = await venueService.getAllVenues();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVenueById = async (req, res) => {
    try {
        const venue = await venueService.getVenueById(req.params.id);

        if (!venue) {
            return res.status(404).json({
                message: "Venue non trovata",
            });
        }

        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Venue from "../venue/venue.schema.js";

export const getAllVenues = async () => {
    return await Venue.find();
};

export const getVenueById = async (id) => {
    return await Venue.findById(id);
};

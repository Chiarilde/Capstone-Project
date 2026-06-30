const mongoose = require("mongoose");
const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        pricePerNight: {
            type: Number,
            required: true,
        },

        capacity: {
            type: Number,
            default: 1,
        },

        images: [
            {
                type: String,
            },
        ],

        activities: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Venue", venueSchema);

const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue",
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        guests: {
            type: Number,
            required: true,
            min: 1,
        },

        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Reservation", reservationSchema);

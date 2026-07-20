import Reservation from "../reservation/reservation.schema.js";
import Venue from "../venue/venue.schema.js";

export const createReservation = async (reservationData) => {
    const { venue, checkIn, days, guests, user } = reservationData;

    // Controlla che la location esista
    const venueFound = await Venue.findById(venue);

    if (!venueFound) {
        throw new Error("Location not found");
    }

    // Calcola il prezzo totale
    const totalPrice = venueFound.pricePerNight * days;

    // Calcola la data di check-out
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + days);

    // Controlla se esistono prenotazioni sovrapposte
    const existingReservation = await Reservation.findOne({
        venue: venueFound._id,
        checkIn: { $lt: checkOut },
        checkOut: { $gt: new Date(checkIn) },
        status: { $ne: "cancelled" },
    });

    if (existingReservation) {
        throw new Error("Location is not available for the selected dates");
    }

    // Salva la prenotazione
    const reservation = await Reservation.create({
        user,
        venue: venueFound._id,
        checkIn,
        checkOut,
        days,
        guests,
        totalPrice,
    });

    return reservation;
};

export const getReservations = async () => {
    return await Reservation.find().populate("user").populate("venue");
};

export const getReservationById = async (id) => {
    return await Reservation.findById(id).populate("user").populate("venue");
};

export const deleteReservation = async (id) => {
    return await Reservation.findByIdAndDelete(id);
};

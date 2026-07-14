import * as reservationService from "../reservation/reservation.service.js";

// CREATE RESERVATION
export const createReservation = async (req, res) => {
    try {
        const reservationData = {
            ...req.body,
        };

        const reservation =
            await reservationService.createReservation(reservationData);

        res.status(201).json({
            message: "Reservation created successfully",
            reservation,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// GET ALL RESERVATIONS
export const getReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getReservations();

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET RESERVATION BY ID
export const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(
            req.params.id,
        );

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found",
            });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE RESERVATION
export const deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(
            req.params.id,
        );

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found",
            });
        }

        res.status(200).json({
            message: "Reservation deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

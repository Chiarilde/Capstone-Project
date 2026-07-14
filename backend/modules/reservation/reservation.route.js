import express from "express";
import {
    createReservation,
    getReservations,
    getReservationById,
    deleteReservation,
} from "../reservation/reservation.controller.js";

const router = express.Router();

// Crea una prenotazione
router.post("/", createReservation);

// Ottieni tutte le prenotazioni
router.get("/", getReservations);

// Ottieni una prenotazione tramite ID
router.get("/:id", getReservationById);

// Elimina una prenotazione
router.delete("/:id", deleteReservation);

export default router;

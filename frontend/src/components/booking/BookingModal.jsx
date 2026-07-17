import { useState } from "react";
import "./BookingModal.css";

export default function BookingModal({ open, onClose, venue }) {
    const [booking, setBooking] = useState({
        startDate: "",
        nights: 1,
        guests: 1,
    });

    if (!open) return null;

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            venue,
            ...booking,
        });

        // Qui in seguito farai la fetch al backend

        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="booking-modal">
                <h2>Prenota il tuo soggiorno</h2>

                <form onSubmit={handleSubmit}>
                    <label>Data di inizio</label>
                    <input
                        type="date"
                        name="startDate"
                        value={booking.startDate}
                        onChange={handleChange}
                        required
                    />

                    <label>Numero di notti</label>
                    <input
                        type="number"
                        name="nights"
                        min="1"
                        value={booking.nights}
                        onChange={handleChange}
                        required
                    />

                    <label>Numero di persone</label>
                    <input
                        type="number"
                        name="guests"
                        min="1"
                        value={booking.guests}
                        onChange={handleChange}
                        required
                    />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>
                            Annulla
                        </button>

                        <button type="submit">Conferma prenotazione</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

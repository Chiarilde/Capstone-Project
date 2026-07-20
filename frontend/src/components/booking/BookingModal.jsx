import { useState, useEffect } from "react";
import "./BookingModal.css";
import { useNavigate } from "react-router-dom";

const initialBookingState = {
    checkIn: "",
    days: 1,
    guests: 1,
    venue: null,
    user: localStorage.getItem("userId"),
};

export default function BookingModal({ open, onClose }) {
    const [booking, setBooking] = useState(initialBookingState);
    const [price, setPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBooking({
            ...initialBookingState,
        });
        setPrice(open?.pricePerNight);
    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "days") {
            setPrice(open.pricePerNight * e.target.value * booking.guests);
        }
        if (e.target.name === "guests") {
            setPrice(open.pricePerNight * booking.days * e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(import.meta.env.VITE_BACKEND_URL + "/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                ...booking,
                venue: open._id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message === "Reservation created successfully") {
                    navigate("/reservations");
                }
            })
            .catch((err) => console.log(err));

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
                        name="checkIn"
                        value={booking.checkIn}
                        onChange={handleChange}
                        required
                    />

                    <label>Numero di notti</label>
                    <input
                        type="number"
                        name="days"
                        min="1"
                        value={booking.days}
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

                    <p>Prezzo totale: €{price}</p>

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>
                            Annulla
                        </button>

                        <button type="submit">Conferma</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { useState } from "react";
import "./Venue.css";
import BookingModal from "../booking/BookingModal.jsx";

export default function VenueCard({ venue }) {
    const [favorite, setFavorite] = useState(venue.isFavorite || false);
    const [showBooking, setShowBooking] = useState(false);

    const image = venue.images?.[0]
        ? new URL(`../../assets/${venue.images[0]}`, import.meta.url).href
        : "https://via.placeholder.com/400";

    const toggleFavorite = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/users/favorites",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userId,
                        venueId: venue._id,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Errore salvataggio preferito");
            }

            setFavorite(!favorite);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="venue-card">
            <div className="image-container">
                <img
                    className="venue-image"
                    src={image}
                    alt={venue.name}
                    height={300}
                    width={400}
                />

                <button
                    className={`favorite-button ${favorite ? "active" : ""}`}
                    onClick={toggleFavorite}
                >
                    ♥
                </button>
            </div>

            <div className="venue-content">
                <h3 className="venue-title">{venue.name}</h3>

                <p className="venue-location">📍 {venue.location}</p>

                <p className="venue-description">
                    {venue.description?.slice(0, 80)}...
                </p>

                <div className="venue-activities">
                    {venue.activities?.slice(0, 3).map((act, i) => (
                        <span key={i} className="activity-tag">
                            {act}
                        </span>
                    ))}
                </div>

                <div className="venue-footer">
                    <span className="price">
                        {venue.pricePerNight}€ / night
                    </span>

                    <span className="capacity">👥 {venue.capacity}</span>

                    <button
                        className="book-button"
                        onClick={() => setShowBooking(true)}
                    >
                        Prenota ora
                    </button>
                </div>
            </div>

            <BookingModal
                open={showBooking}
                onClose={() => setShowBooking(false)}
                venue={venue}
            />
        </div>
    );
}

import "./BookingModal.css";

export default function BookingCard({ reservation, setReservations }) {
    const image = reservation.venue?.images?.[0]
        ? new URL(
              `../../assets/${reservation.venue.images[0]}`,
              import.meta.url,
          ).href
        : "https://via.placeholder.com/400";

    const deleteReservation = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL +
                    "/reservations/" +
                    reservation._id,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Errore cancellazione prenotazione");
            }

            setReservations((prev) =>
                prev.filter((item) => item._id !== reservation._id),
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="booking-card">
            <div className="booking-image-container">
                <img
                    className="booking-image"
                    src={image}
                    alt={reservation.venue?.name}
                />
            </div>

            <div className="booking-content">
                <h3 className="booking-title">{reservation.venue?.name}</h3>

                <p className="booking-location">
                    📍 {reservation.venue?.location}
                </p>

                <p className="booking-description">
                    {reservation.venue?.description}
                </p>

                <div className="booking-activities">
                    {reservation.venue?.activities
                        ?.slice(0, 3)
                        .map((act, i) => (
                            <span key={i} className="activity-tag">
                                {act}
                            </span>
                        ))}
                </div>
            </div>

            <div className="booking-details">
                <p>
                    📅 Check-in:
                    <strong>
                        {" "}
                        {new Date(reservation.checkIn).toLocaleDateString()}
                    </strong>
                </p>

                <p>
                    🏝️ Check-out:
                    <strong>
                        {" "}
                        {new Date(reservation.checkOut).toLocaleDateString()}
                    </strong>
                </p>

                <p>🌙 {reservation.days} notti</p>

                <p>👥 {reservation.guests} persone</p>

                <p className="booking-price">💰 €{reservation.totalPrice}</p>
                <button className="booking-button" onClick={deleteReservation}>
                    Cancella Prenotazione
                </button>
            </div>
        </div>
    );
}

import "./Venue.css";

export default function VenueCard({
    venue,
    setShowBooking,
    favorites,
    fetchFavourites,
}) {
    const userId = localStorage.getItem("userId");
    const isFavorite = favorites.some((fav) => fav._id === venue._id);

    const image = venue.images?.[0]
        ? new URL(`../../assets/${venue.images[0]}`, import.meta.url).href
        : "https://via.placeholder.com/400";

    const addFavorite = async () => {
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
            fetchFavourites();
        } catch (error) {
            console.log(error);
        }
    };

    const removeFavorite = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL +
                    "/users/favorites/" +
                    venue._id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userId,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Errore rimozione preferito");
            }
            fetchFavourites();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleFavorite = async () => {
        if (!isFavorite) {
            addFavorite();
        } else {
            removeFavorite();
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
                    className={`favorite-button ${isFavorite ? "active" : ""}`}
                    onClick={toggleFavorite}
                >
                    ♥
                </button>
            </div>

            <div className="venue-content">
                <h3 className="venue-title">{venue.name}</h3>

                <p className="venue-location">📍 {venue.location}</p>

                <p className="venue-description">{venue.description}</p>

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
                        onClick={() => setShowBooking(venue)}
                    >
                        Prenota ora
                    </button>
                </div>
            </div>
        </div>
    );
}

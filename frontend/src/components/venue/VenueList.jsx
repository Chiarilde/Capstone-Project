import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import VenueCard from "./Venue.jsx";
import BookingModal from "../booking/BookingModal.jsx";
import notFavourite from "../../assets/notfavourite.png";

export default function VenueList() {
    const [venues, setVenues] = useState({
        allVenues: [],
        favorites: [],
    });
    const [showBooking, setShowBooking] = useState(null);
    const [showAll, setShowAll] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const fetchFavourites = async (_venues) => {
        try {
            const res = await fetch(
                import.meta.env.VITE_BACKEND_URL +
                    "/users/favorites/" +
                    localStorage.getItem("userId"),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    user: { _id: localStorage.getItem("userId") },
                },
            );
            const data = await res.json();

            const _favorites = _venues.filter((venue) =>
                data.includes(venue._id),
            );
            setVenues((prev) => ({ ...prev, favorites: _favorites }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const res = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/venues",
                );
                const data = await res.json();
                if (data) {
                    setVenues((prev) => ({ ...prev, allVenues: data }));
                    fetchFavourites(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchVenues();
    }, []);

    const handleMyFavourites = async () => {
        if (showAll) await fetchFavourites(venues.allVenues);
        setShowAll((prev) => !prev);
    };

    return (
        <div>
            <div className="header">
                <img src={logo} alt="Retreat Hut logo" className="logo" />
                <button
                    className="res-button"
                    onClick={() => navigate("/reservations")}
                >
                    My Reservations 📌
                </button>
                <button
                    onClick={handleMyFavourites}
                    className={`fav-button ${!showAll ? "active" : ""}`}
                >
                    My Favourites ❤️
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </div>

            <div style={styles.container}>
                {!showAll && venues.favorites.length === 0 && (
                    <div>
                        <p
                            style={{
                                textAlign: "center",
                                width: "100%",
                                marginTop: "20vh",
                            }}
                        >
                            Non hai nessun preferito.
                        </p>

                        <img
                            src={notFavourite}
                            alt="Nessun preferito"
                            style={{ width: "250px" }}
                        />
                    </div>
                )}
                {venues[showAll ? "allVenues" : "favorites"].map((venue) => (
                    <VenueCard
                        key={venue._id}
                        venue={venue}
                        setShowBooking={setShowBooking}
                        favorites={venues.favorites}
                        fetchFavourites={() =>
                            fetchFavourites(venues.allVenues)
                        }
                    />
                ))}
            </div>

            <BookingModal
                open={showBooking}
                onClose={() => setShowBooking(null)}
            />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        padding: "20px",
        justifyContent: "center",
        flex: 1,
        color: "white",
    },
};

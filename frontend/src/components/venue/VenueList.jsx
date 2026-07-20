import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import VenueCard from "./Venue.jsx";
import BookingModal from "../booking/BookingModal.jsx";

export default function VenueList() {
    const [venues, setVenues] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [displayVenues, setDisplayVenues] = useState([]);
    const [showBooking, setShowBooking] = useState(null);
    const [showAll, setShowAll] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const fetchFavourites = (venues) => {
        fetch(
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
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    alert("You have no favourites yet.");
                } else {
                    const _favourites = venues.filter((venue) =>
                        data.includes(venue._id),
                    );
                    setFavorites(_favourites);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/venues")
            .then((res) => res.json())
            .then((data) => {
                setVenues(data);
                setDisplayVenues(data);
                fetchFavourites(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDisplayVenues(showAll ? venues : favorites);
    }, [showAll]);

    return (
        <div>
            <div className="header">
                <img src={logo} alt="Retreat Hut logo" className="logo" />
                <button className="fav-button">My Reservations 📌</button>
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="fav-button"
                >
                    My Favourites ❤️
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </div>

            <div style={styles.container}>
                {displayVenues.map((venue) => (
                    <VenueCard
                        key={venue._id}
                        venue={venue}
                        setShowBooking={setShowBooking}
                        favorites={favorites}
                        fetchFavourites={() => fetchFavourites(venues)}
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

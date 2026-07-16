import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueCard from "./Venue.jsx";

export default function VenueList() {
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/venues")
            .then((res) => res.json())
            .then((data) => setVenues(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <div className="header">
                <h1 style={styles.title}>Top Destinations</h1>
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </div>
            <button className="favourites-button">My Favourites</button>
            <div style={styles.container}>
                {venues.map((venue) => (
                    <VenueCard key={venue._id} venue={venue} />
                ))}
            </div>
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

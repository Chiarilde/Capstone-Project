import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueCard from "./Venue.jsx";
import logo from "../../assets/logo.png";

export default function VenueList() {
    const [venues, setVenues] = useState([]);
    const [favourites, setFavourites] = useState([]);

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

    const handleFavourites = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/users/favorites", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            user: { _id: localStorage.getItem("userId") },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    alert("You have no favourites yet.");
                } else {
                    console.log(data);
                    setFavourites(data);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="header">
                <img src={logo} alt="Retreat Hut logo" className="logo" />
                <button className="fav-button">My Reservations 📌</button>
                <button onClick={handleFavourites} className="fav-button">
                    My Favourites ❤️
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </div>

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

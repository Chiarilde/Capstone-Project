import { useEffect, useState } from "react";
import VenueCard from "./Venue.jsx";

export default function VenueList() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/venues")
            .then((res) => res.json())
            .then((data) => setVenues(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1 style={styles.title}>TOP DESTINATIONS</h1>

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
        gap: "40px",
        padding: "20px",
        justifyContent: "center",
    },
};

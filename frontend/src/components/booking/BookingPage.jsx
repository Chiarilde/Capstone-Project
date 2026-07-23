import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard.jsx";
import notFavourite from "../../assets/notfavourite.png";

import "./Booking.css";

const BookingPage = () => {
    const navigate = useNavigate();

    const [reservations, setReservations] = useState([]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/reservations",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    },
                );

                const data = await response.json();

                console.log("Prenotazioni:", data);

                setReservations(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="booking-page">
            <div className="booking-header">
                <div className="back-icon" onClick={handleBack}>
                    ❮
                </div>

                <h2>My Reservations 📌</h2>

                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </div>

            <div className="reservations-container">
                {reservations.length === 0 ? (
                    <div>
                        <p
                            style={{
                                textAlign: "center",
                                width: "100%",
                                marginTop: "20vh",
                            }}
                        >
                            Non hai nessuna prenotazione.
                        </p>
                        <img
                            src={notFavourite}
                            alt="Nessun preferito"
                            style={{ width: "250px" }}
                        />
                    </div>
                ) : (
                    reservations.map((reservation) => (
                        <BookingCard
                            key={reservation._id}
                            reservation={reservation}
                            setReservations={setReservations}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingPage;

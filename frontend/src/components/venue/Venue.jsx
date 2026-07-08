import "./Venue.css";

export default function VenueCard({ venue }) {
    const image = venue.images?.[0]
        ? new URL(`../../assets/${venue.images[0]}`, import.meta.url).href
        : "https://via.placeholder.com/400";

    return (
        <div className="venue-card">
            <img
                className="venue-image"
                src={image}
                alt={venue.name}
                height={300}
                width={400}
            />

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
                    <button className="book-button">Prenota ora</button>
                </div>
            </div>
        </div>
    );
}

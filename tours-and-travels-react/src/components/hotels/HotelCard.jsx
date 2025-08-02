import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-img">
        <img src={hotel.imageUrl || '/assets/images/default-hotel.jpg'} alt={hotel.name} />
      </div>
      <div className="hotel-content">
        <h3>{hotel.name}</h3>
        <div className="hotel-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < Math.floor(hotel.rating) ? '#FFD700' : '#ddd'} />
          ))}
          <span>({hotel.rating})</span>
        </div>
        <p className="hotel-location">{hotel.location}</p>
        <div className="hotel-price">
          {hotel.pricePerNight ? `₹${hotel.pricePerNight} per night` : 'Price not available'}
        </div>
        <div className="hotel-actions">
          <Link to={`/hotel/${hotel.id}`} className="hotel-btn">View Details</Link>
          <Link to={`/hotel/${hotel.id}`} className="hotel-btn book-now">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
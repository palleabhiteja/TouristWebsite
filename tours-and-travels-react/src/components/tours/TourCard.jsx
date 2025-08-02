import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card">
      <div className="tour-img">
        <img src={tour.imageUrl || '/assets/images/default-tour.jpg'} alt={tour.title} />
      </div>
      <div className="tour-content">
        <h3>{tour.title}</h3>
        <div className="tour-details">
          <p>{tour.duration}</p>
          <p>{tour.location}</p>
        </div>
        <div className="tour-price">₹{tour.price} per person</div>
        <Link to={`/tour/${tour.id}`} className="tour-btn">View Details & Itinerary</Link>
      </div>
    </div>
  );
};

export default TourCard;

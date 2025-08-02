import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTourById, getTourItinerary, createBooking } from '../services/api';
import { FaMapMarkerAlt, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './TourDetail.css';
import Navbar from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    travelDate: '',
    numPersons: 1
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const [tourResponse, itineraryResponse] = await Promise.all([
          getTourById(id),
          getTourItinerary(id)
        ]);
        setTour(tourResponse.data);
        setItinerary(itineraryResponse.data);
      } catch (error) {
        console.error('Error fetching tour data:', error);
        setError('Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };
    fetchTourData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/tour/${id}` } });
        return;
      }

      const response = await createBooking({
        tourId: tour.id,
        travelDate: bookingData.travelDate,
        numPersons: parseInt(bookingData.numPersons)
      });
      
      setBookingSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Booking failed:', error);
      if (error.response?.status === 401) {
        setError('Please login to book this tour');
        navigate('/login', { state: { from: `/tour/${id}` } });
      } else {
        setError(error.response?.data?.message || 'Booking failed. Please try again.');
      }
    }
  };

  if (loading) return <div className="loading">Loading tour details...</div>;
  if (error && !tour) return <div className="error">{error}</div>;
  if (!tour) return <div className="not-found">Tour not found</div>;

  return (
    <>
      <Navbar />
      <div className="header-image">
        <div className="hero-section">
          <h1>{tour.title}</h1>
          <p className="location-duration">
            <FaMapMarkerAlt /> {tour.location} • <FaClock /> {tour.duration}
          </p>
        </div>
      </div>

      <div className="tour-content-section">
        <div className="tour-content">
          <div className="tour-image">
            <img src={tour.imageUrl || '/assets/images/default-tour.jpg'} alt={tour.title} />
          </div>

          <div className="tour-info">
            <div className="info-card">
              <h2>About this tour</h2>
              <p>{tour.description}</p>
            </div>

            <div className="info-card">
              <h3>Price Details</h3>
              <p className="price">₹{tour.price} <span>per person</span></p>
            </div>

            <div className="info-card">
              <h3>Contact Information</h3>
              <p>{tour.contactInfo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="itinerary-section">
        <h2>Tour Itinerary</h2>
        {itinerary.length === 0 ? (
          <p className="no-itinerary">No itinerary available for this tour.</p>
        ) : (
          <div className="itinerary-days">
            {itinerary.map((day) => (
              <div key={day.id} className="itinerary-day">
                <h3>Day {day.dayNumber}: {day.title}</h3>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="booking-section">
        {!bookingSuccess ? (
          <div className="booking-form-container">
            <h2>Book this tour</h2>
            {error && <div className="booking-error">{error}</div>}
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label htmlFor="travelDate"><FaCalendarAlt /> Travel Date</label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={bookingData.travelDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="numPersons"><FaUser /> Number of Persons</label>
                <input
                  type="number"
                  id="numPersons"
                  name="numPersons"
                  value={bookingData.numPersons}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="10"
                />
              </div>

              <div className="total-price">
                <p>Total: ₹{tour.price * bookingData.numPersons}</p>
              </div>

              <button type="submit" className="book-now-btn">Book Now</button>
            </form>
          </div>
        ) : (
          <div className="booking-success">
            <h2>Booking Successful!</h2>
            <p>Your tour to {tour.title} has been booked successfully.</p>
            <p>Travel Date: {new Date(bookingData.travelDate).toLocaleDateString()}</p>
            <p>Number of Persons: {bookingData.numPersons}</p>
            <p>Total Amount: ₹{tour.price * bookingData.numPersons}</p>
            <button 
              onClick={() => navigate('/my-bookings')}
              className="view-bookings-btn"
            >
              View My Bookings
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TourDetail;

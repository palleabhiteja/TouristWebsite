import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, createHotelBooking } from '../services/api';
import { FaStar, FaWifi, FaSwimmingPool, FaSpa, FaUtensils, FaParking, FaMapMarkerAlt } from 'react-icons/fa';
import BookingForm from '../components/hotels/BookingForm';
import Navbar from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBookingSubmit = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login
        return;
      }

      await createHotelBooking(
        {
          hotelId: hotel.id,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          numGuests: bookingData.numGuests,
          specialRequests: bookingData.specialRequests,
          totalAmount: bookingData.totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
      setError(
        error.response?.data?.message ||
        'Booking failed. Please try again or contact support.'
      );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading hotel details...</p>
      </div>
    );
  }

  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!hotel) return <div className="not-found">Hotel not found</div>;

  const amenities = hotel.amenities?.split(',') || [];
  const images = [
    hotel.imageUrl || '/assets/images/default-hotel.jpg',
    '/assets/images/default-hotel.jpg',
    '/assets/images/default-hotel.jpg'
  ];

  return (
    <>
      <Navbar />

      <div className="hotel-details-hero">
        <div className="hotel-details-container">
          <h1 className="hotel-title">{hotel.name}</h1>
          <div className="hotel-meta">
            <div className="hotel-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(hotel.rating) ? "star-filled" : "star-empty"} />
              ))}
              <span className="rating-number">{hotel.rating}</span>
            </div>
            <div className="hotel-location">
              <FaMapMarkerAlt />
              <span>{hotel.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hotel-details-container main-content">
        <div className="hotel-details-layout">
          <div className="hotel-left-column">

            <div className="hotel-gallery">
              <div className="main-image-container">
                <img src={images[selectedImage]} alt={hotel.name} className="main-image" />
              </div>
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`view ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hotel-description">
              <h2>About This Hotel</h2>
              <p>{hotel.description}</p>
            </div>

            <div className="hotel-amenities-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    {getAmenityIcon(amenity)}
                    <span>{amenity.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hotel-price-info">
              <h2>Price Details</h2>
              <div className="price-tag">₹{hotel.pricePerNight}</div>
              <span className="price-period">per night</span>
            </div>

            <div className="hotel-contact">
              <h2>Contact Information</h2>
              <p>{hotel.contactInfo}</p>
            </div>
          </div>

          <div className="hotel-right-column">
            {!bookingSuccess ? (
              <div className="booking-panel">
                <h2>Book Your Stay</h2>
                <BookingForm 
                  pricePerNight={hotel.pricePerNight}
                  onSubmit={handleBookingSubmit}
                  error={error}
                />              
              </div>
            ) : (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h2>Booking Confirmed!</h2>
                <p>Your stay at {hotel.name} has been successfully booked.</p>
                <p className="success-subtitle">A confirmation has been sent to your email.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

function getAmenityIcon(amenity) {
  const trimmedAmenity = amenity.trim();
  switch (trimmedAmenity) {
    case 'Pool': return <FaSwimmingPool className="amenity-icon" />;
    case 'Spa': return <FaSpa className="amenity-icon" />;
    case 'Restaurant': return <FaUtensils className="amenity-icon" />;
    case 'WiFi': return <FaWifi className="amenity-icon" />;
    case 'Parking': return <FaParking className="amenity-icon" />;
    default: return null;
  }
}

export default HotelDetails;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getHotelBookings } from '../services/api';
import { FaHotel, FaUmbrellaBeach } from 'react-icons/fa';
import './UserBooking.css';
import Navbar from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch regular tour bookings
        const bookingsResponse = await getBookings();
        setBookings(bookingsResponse.data);

        // Fetch hotel bookings
        try {
          const hotelBookingsResponse = await getHotelBookings();
          setHotelBookings(hotelBookingsResponse.data);
        } catch (hotelError) {
          console.log('Hotel bookings not available:', hotelError.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.response?.data?.message || 'Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Navbar />

      <div className="user-bookings-container">
        <div className="header-image">
          <div className="hero-section">
            <h1>My Bookings</h1>
          </div>
        </div>

        <section className="bookings-section">
          <h2><FaUmbrellaBeach /> Tour Bookings</h2>
          {bookings.length === 0 ? (
            <p className="no-booking">You have no tour bookings yet.</p>
          ) : (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.tour?.title || 'Unknown Tour'}</h3>
                  <p>Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                  <p>Persons: {booking.numPersons}</p>
                  <p>Total: ₹{booking.totalAmount}</p>
                  <p>Status: <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bookings-section">
          <h2><FaHotel /> Hotel Bookings</h2>
          {hotelBookings.length === 0 ? (
            <p className="no-booking">You have no hotel bookings yet.</p>
          ) : (
            <div className="bookings-list">
              {hotelBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.hotel?.name || 'Unknown Hotel'}</h3>
                  <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                  <p>Guests: {booking.numGuests}</p>
                  <p>Total: ₹{booking.totalAmount}</p>
                  <p>Status: <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default UserBookings;

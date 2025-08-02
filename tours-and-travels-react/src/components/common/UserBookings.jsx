import { useState, useEffect } from 'react';
import { getBookings, getHotelBookings } from '../services/api';

const UserBookings = () => {
  const [tourBookings, setTourBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [tourRes, hotelRes] = await Promise.all([
          getBookings(),
          getHotelBookings()
        ]);
        setTourBookings(tourRes.data);
        setHotelBookings(hotelRes.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="user-bookings">
      <h2>My Bookings</h2>

      {/* Tour Bookings */}
      <h3>Tour Bookings</h3>
      {tourBookings.length === 0 ? (
        <p>No tour bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {tourBookings.map(booking => (
            <div key={`tour-${booking.id}`} className="booking-card">
              <h4>{booking.tour?.title}</h4>
              <p>Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              <p>Total: ₹{booking.totalAmount}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hotel Bookings */}
      <h3>Hotel Bookings</h3>
      {hotelBookings.length === 0 ? (
        <p>No hotel bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {hotelBookings.map(booking => (
            <div key={`hotel-${booking.id}`} className="booking-card">
              <h4>{booking.hotel?.name}</h4>
              <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
              <p>Guests: {booking.numGuests}</p>
              <p>Status: {booking.status}</p>
              <p>Total: ₹{booking.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;

import { useState } from 'react';
// import './BookingForm.css';

const BookingForm = ({ pricePerNight, onSubmit }) => {
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numGuests: 1,
    specialRequests: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const diffTime = new Date(formData.checkOutDate) - new Date(formData.checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * pricePerNight * formData.numGuests;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numGuests: formData.numGuests,
        specialRequests: formData.specialRequests,
        totalAmount: calculateTotal()
      };
      await onSubmit(bookingData);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="checkInDate">Check-in Date</label>
        <input
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="checkOutDate">Check-out Date</label>
        <input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
          min={formData.checkInDate || new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="numGuests">Number of Guests</label>
        <input
          type="number"
          id="numGuests"
          name="numGuests"
          value={formData.numGuests}
          onChange={handleChange}
          required
          min="1"
          max="10"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests (Optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="3"
          placeholder="Please mention any special requirements like room preferences, accessibility needs, dietary restrictions, etc."
        />
      </div>
      
      <div className="price-summary">
        <h3>Price Summary</h3>
        <p>₹{pricePerNight} x {calculateNights()} nights x {formData.numGuests} guests</p>
        <p className="total-amount">Total: ₹{calculateTotal()}</p>
      </div>
      
      <button type="submit" className="book-now-btn">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
import { useState, useEffect, useRef } from 'react';
import { getHotels } from '../../services/api';
import HotelCard from '../hotels/HotelCard';

const HotelsSection = () => {
  const hotelsContainerRef = useRef(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        setHotels(response.data);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const scrollHotels = (direction) => {
    if (hotelsContainerRef.current) {
      hotelsContainerRef.current.scrollBy({
        left: direction === 'next' ? 320 : -320,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <div className="loading">Loading hotels...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="section" id="hotels">
      <div className="section-title">
        <h2>Luxury Hotel Bookings</h2>
        <p>Experience world-class hospitality at India's finest 5-star hotels</p>
      </div>
      
      <div className="cards-container" id="hotels-container" ref={hotelsContainerRef}>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} showTourButton={true} />
        ))}
      </div>
      
      <div className="scroll-btn-container">
        <button className="scroll-btn" onClick={() => scrollHotels('prev')}>
          &#10094;
        </button>
        <button className="scroll-btn" onClick={() => scrollHotels('next')}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default HotelsSection;

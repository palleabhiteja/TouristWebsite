import { useState, useEffect } from 'react';
import { getHotels } from '../../services/api';
import HotelCard from '../hotels/HotelCard';
import Navbar from './Header.jsx';       // ✅ Adjust the path as needed
import Footer from './Footer.jsx';       // ✅ Adjust the path as needed
import './HotelsPage.css';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) return <div>Loading hotels...</div>;

  return (
    <>
      <Navbar />
  
      <div className="hero-section">
        <h1>Luxury Hotels</h1>
      </div>
  
      <div className="hotels-page">
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
  
      <Footer />
    </>
  );  
};

export default HotelsPage;

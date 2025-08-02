import { useState, useEffect, useRef } from 'react';
import { getTours } from '../../services/api'; // updated import path

const PackagesSection = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const packagesContainerRef = useRef(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getTours();
        setTours(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const scrollPackages = (direction) => {
    if (packagesContainerRef.current) {
      packagesContainerRef.current.scrollBy({
        left: direction === 'next' ? 320 : -320,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <div className="loading-message">Loading tours...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="section" id="packages">
      <div className="section-title">
        <h2>Popular Tour Packages</h2>
        <p>Explore our most sought-after travel experiences across India</p>
      </div>

      <div className="cards-container" id="packages-container" ref={packagesContainerRef}>
        {tours.map((tour) => (
          <div key={tour.id} className="package-card">
            <div className="package-img">
              <img src={tour.imageUrl || '/assets/images/default-tour.jpg'} alt={tour.title} />
            </div>
            <div className="package-content">
              <h3>{tour.title}</h3>
              <div className="package-details">
                <p>{tour.duration}</p>
                <p>{tour.location}</p>
              </div>
              <div className="package-price">₹{tour.price} per person</div>
              <a href={`/tour/${tour.id}`} className="package-btn">View Details</a>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-btn-container">
        <button className="scroll-btn" onClick={() => scrollPackages('prev')}>
          &#10094;
        </button>
        <button className="scroll-btn" onClick={() => scrollPackages('next')}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default PackagesSection;

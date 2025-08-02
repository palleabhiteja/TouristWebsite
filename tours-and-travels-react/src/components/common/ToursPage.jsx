// import { useState, useEffect } from 'react';
// import { getTours } from '../../services/api';
// import TourCard from '../tours/TourCard';

// const ToursPage = () => {
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await getTours();
//         setTours(response.data);
//       } catch (error) {
//         console.error('Error fetching tours:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTours(); 
//   }, []);

//   if (loading) return <div>Loading tours...</div>;

//   return (
//     <div className="tours-page">
//       <h1>Tour Packages</h1>
//       <div className="tours-grid">
//         {tours.map(tour => (
//           <TourCard key={tour.id} tour={tour} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ToursPage;





import { useState, useEffect } from 'react';
import { getTours } from '../../services/api';
import TourCard from '../tours/TourCard';
import './ToursPages.css'; // Import the CSS file
import Navbar from './Header.jsx';       // ✅ Adjust the path as needed
import Footer from './Footer.jsx';  

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getTours();
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <div className="loading">Loading tours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Navbar />
    <div className="tours-page">
      <div className="hero-section">
        <h1>Tour Packages</h1>
      {/* <p className="subtitle">Explore our carefully curated collection of unforgettable travel experiences</p>   */}

      </div>
      <div className="page-content">
        
        <div className="tours-grid">
          {tours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ToursPage;
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import HotelsPage from './components/common/HotelsPage';
import ToursPage from './components/common/ToursPage';
import TourDetail from './pages/TourDetail';
import HotelDetail from './pages/HotelDetails';
import AdminDashboard from './pages/AdminDashboard';
import UserBookings from './pages/UserBookings';
// import Login from './pages/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute'; // Optional for admin routes


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tour/:id" element={<TourDetail />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-bookings" element={<UserBookings />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



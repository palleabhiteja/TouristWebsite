import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { getContacts } from '../services/api';

import Navbar from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

import {
  getTours, createTour, updateTour, deleteTour,
  getHotels, createHotel, deleteHotel,
  getUsers,
  getTourItinerary, addItineraryItem, deleteItineraryItem
} from '../services/api';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState(0);
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursRes, hotelsRes, usersRes, contactsRes] = await Promise.all([
          getTours(),
          getHotels(),
          getUsers(),
          getContacts().catch(e => ({ data: [] })) // Return empty array if fails
        ]);
        setTours(toursRes.data);
        setHotels(hotelsRes.data);
        setUsers(usersRes.data);
        setContacts(contactsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Initialize empty contacts if the request fails
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
          <TabList>
            <Tab>Tours</Tab>
            <Tab>Hotels</Tab>
            <Tab>Users</Tab>
            <Tab>Contacts</Tab>
            <Tab>Statistics</Tab>
          </TabList>

          <TabPanel>
            <TourManagement tours={tours} setTours={setTours} />
          </TabPanel>

          <TabPanel>
            <HotelManagement hotels={hotels} setHotels={setHotels} />
          </TabPanel>

          <TabPanel>
            <UserManagement users={users} />
          </TabPanel>
          <TabPanel>
            {contacts.length > 0 ? (
              <ContactManagement contacts={contacts} />
            ) : (
              <div className="no-contacts">
                <p>No contact submissions found</p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            <DashboardStats tours={tours} hotels={hotels} users={users} contacts={contacts} />
          </TabPanel>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

// ============= ITINERARY MANAGEMENT ==================
const ItineraryManagement = ({ tourId }) => {
  const [itinerary, setItinerary] = useState([]);
  const [formData, setFormData] = useState({
    dayNumber: 1,
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await getTourItinerary(tourId);
        setItinerary(response.data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };
    fetchItinerary();
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItineraryItem(tourId, formData);
      const response = await getTourItinerary(tourId);
      setItinerary(response.data);
      setFormData({
        dayNumber: 1,
        title: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding itinerary item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItineraryItem(id);
      const response = await getTourItinerary(tourId);
      setItinerary(response.data);
    } catch (error) {
      console.error('Error deleting itinerary item:', error);
    }
  };

  return (
    <div className="itinerary-management">
      <h3>Manage Itinerary</h3>
      <form onSubmit={handleSubmit} className="itinerary-form">
        <div className="form-group">
          <label>Day Number</label>
          <input
            type="number"
            name="dayNumber"
            value={formData.dayNumber}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Itinerary Item</button>
      </form>

      <div className="itinerary-list">
        {itinerary.map(item => (
          <div key={item.id} className="itinerary-item">
            <h4>Day {item.dayNumber}: {item.title}</h4>
            <p>{item.description}</p>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================= TOUR MANAGEMENT ===================
const TourManagement = ({ tours, setTours }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', location: '',
    duration: '', price: '', contactInfo: '', imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);

  const fetchTours = async () => {
    try {
      const response = await getTours();
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTour(editingId, formData);
      } else {
        await createTour(formData);
      }
      setFormData({
        title: '', description: '', location: '',
        duration: '', price: '', contactInfo: '', imageUrl: ''
      });
      setEditingId(null);
      fetchTours();
    } catch (error) {
      console.error('Error saving tour:', error);
    }
  };

  const handleEdit = (tour) => {
    setFormData({
      title: tour.title,
      description: tour.description,
      location: tour.location,
      duration: tour.duration,
      price: tour.price,
      contactInfo: tour.contactInfo,
      imageUrl: tour.imageUrl || ''
    });
    setEditingId(tour.id);
    setSelectedTour(tour);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await deleteTour(id);
        fetchTours();
        if (selectedTour?.id === id) {
          setSelectedTour(null);
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Tour' : 'Add New Tour'}</h2>
      <form onSubmit={handleSubmit} className="tour-form">
        {['title', 'description', 'location', 'duration', 'price', 'contactInfo', 'imageUrl'].map(field => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required={field !== 'imageUrl'}
            />
          </div>
        ))}
        <button type="submit">{editingId ? 'Update' : 'Add'} Tour</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({
              title: '', description: '', location: '',
              duration: '', price: '', contactInfo: '', imageUrl: ''
            });
          }}>Cancel</button>
        )}
      </form>

      <table>
        <thead>
          <tr><th>Title</th><th>Location</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour.id}>
              <td>{tour.title}</td>
              <td>{tour.location}</td>
              <td>₹{tour.price}</td>
              <td>
                <button onClick={() => handleEdit(tour)}>Edit</button>
                <button onClick={() => handleDelete(tour.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTour && (
        <ItineraryManagement tourId={selectedTour.id} />
      )}
    </div>
  );
};

// ================= HOTEL MANAGEMENT ===================
const HotelManagement = ({ hotels, setHotels }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    pricePerNight: '',
    contactInfo: '',
    imageUrl: '',
    amenities: '',
    rating: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchHotels = async () => {
    try {
      const response = await getHotels();
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateHotel(editingId, formData);
      } else {
        await createHotel(formData);
      }
      setFormData({
        name: '',
        description: '',
        location: '',
        pricePerNight: '',
        contactInfo: '',
        imageUrl: '',
        amenities: '',
        rating: ''
      });
      setEditingId(null);
      fetchHotels();
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name || '',
      description: hotel.description || '',
      location: hotel.location || '',
      pricePerNight: hotel.pricePerNight || '',
      contactInfo: hotel.contactInfo || '',
      imageUrl: hotel.imageUrl || '',
      amenities: hotel.amenities || '',
      rating: hotel.rating || ''
    });
    setEditingId(hotel.id);
  };

  const handleDeleteHotel = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await deleteHotel(id);
        fetchHotels();
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      pricePerNight: '',
      contactInfo: '',
      imageUrl: '',
      amenities: '',
      rating: ''
    });
    setEditingId(null);
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Hotel' : 'Add New Hotel'}</h2>
      <form onSubmit={handleSubmit} className="hotel-form">
        {['name', 'description', 'location', 'pricePerNight', 'contactInfo', 'imageUrl', 'amenities', 'rating'].map(field => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'pricePerNight' || field === 'rating' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required={field !== 'imageUrl' && field !== 'amenities'}
            />
          </div>
        ))}
        <button type="submit">{editingId ? 'Update Hotel' : 'Add Hotel'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Location</th><th>Price/Night</th><th>Rating</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>₹{hotel.pricePerNight}</td>
              <td>{hotel.rating}</td>
              <td>
                <button onClick={() => handleEdit(hotel)}>Edit</button>
                <button onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ================= USER MANAGEMENT ===================
const UserManagement = ({ users }) => (
  <div>
    <h2>Users List</h2>
    <table>
      <thead>
        <tr><th>Name</th><th>Email</th></tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}><td>{user.name}</td><td>{user.email}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ================= DASHBOARD STATS ===================
const DashboardStats = ({ tours, hotels, users, contacts }) => (
  <div>
    <h2>Statistics</h2>
    <div className="stats-container">
      <div className="stat-card">
        <h3>Tours</h3>
        <div className="stat-value">{tours.length}</div>
      </div>
      <div className="stat-card">
        <h3>Hotels</h3>
        <div className="stat-value">{hotels.length}</div>
      </div>
      <div className="stat-card">
        <h3>Users</h3>
        <div className="stat-value">{users.length}</div>
      </div>
      <div className="stat-card">
        <h3>Contacts</h3>
        <div className="stat-value">{contacts.length}</div>
      </div>
    </div>
  </div>
);

const ContactManagement = ({ contacts }) => (
  <div>
    <h2>Contact Submissions</h2>
    <table className="contacts-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <tr key={contact.id}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.mobile}</td>
            <td className="message-cell">{contact.message}</td>
            <td>{new Date(contact.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default AdminDashboard;

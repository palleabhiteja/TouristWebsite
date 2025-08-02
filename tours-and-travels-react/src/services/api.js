import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced request interceptor with token validation
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Basic JWT format validation
      if (token.split('.').length === 3) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error('Invalid JWT token format');
        localStorage.removeItem('token');
        window.location.href = '/login?error=invalid_token';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (userData) => api.post('/auth/signup', userData);

// Tours API
export const getTours = () => api.get('/tours');
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (tourData) => api.post('/tours', tourData);
export const updateTour = (id, tourData) => api.put(`/tours/${id}`, tourData);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// Tour Itinerary API
export const getTourItinerary = (tourId) => api.get(`/tours/${tourId}/itinerary`);
export const addItineraryItem = (tourId, itineraryData) => api.post(`/tours/${tourId}/itinerary`, itineraryData);
export const deleteItineraryItem = (itineraryId) => api.delete(`/tours/itinerary/${itineraryId}`);

// Hotels API
export const getHotels = () => api.get('/hotels');
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const createHotel = (hotelData) => api.post('/hotels', hotelData);
export const updateHotel = (id, hotelData) => api.put(`/hotels/${id}`, hotelData);
export const deleteHotel = (id) => api.delete(`/hotels/${id}`);

// Bookings API
export const getBookings = () => api.get('/bookings');
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// Hotel Bookings API
// export const createHotelBooking = (bookingData) => api.post('/bookings/hotel', bookingData);
// export const getHotelBookings = () => api.get('/bookings/hotel');
export const createHotelBooking = (bookingData) => 
  api.post('/hotels/book', bookingData);
export const getHotelBookings = () => api.get('/hotels/hotel-bookings');


// Users API
export const getUsers = () => api.get('/users');

// Contact Form API
export const submitContactForm = (contactData) => api.post('/contacts', contactData);
export const getContacts = () => api.get('/contacts');


export default api;
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Return child components if authenticated
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
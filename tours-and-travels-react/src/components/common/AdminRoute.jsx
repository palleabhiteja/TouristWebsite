// src/components/common/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'; // If using context

const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
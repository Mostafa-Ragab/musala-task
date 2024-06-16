import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user'); 
  return isAuthenticated ? children : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
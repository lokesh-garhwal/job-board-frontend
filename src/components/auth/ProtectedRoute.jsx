import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If the user is not logged in at all, send them to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires a specific role and the user doesn't have it
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You do not have permission to view this page.</p>
      </div>
    );
  }

  // If they are logged in and have the right role, show the page
  return children;
}

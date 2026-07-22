import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // Also check localStorage as fallback for race conditions
  const storedUser = user || (() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  })();

  if (!storedUser) return <Navigate to="/" replace />;
  if (allowedRole && storedUser.role !== allowedRole) return <Navigate to="/" replace />;

  return children;
}

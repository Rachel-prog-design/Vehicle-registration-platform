import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', background: '#1e293b', color: 'white', display: 'flex', gap: '1rem' }}>
      <Link to="/" style={{ color: 'white' }}>Home</Link>
      {isAuthenticated && <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>}
      {isAuthenticated && <Link to="/vehicle/new" style={{ color: 'white' }}>Register Vehicle</Link>}
      {isAuthenticated ? (
        <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
      )}
    </nav>
  );
}
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-ink-600 hover:text-ink-400 transition"
    >
      Logout
    </button>
  );
}

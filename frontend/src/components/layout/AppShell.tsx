import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { FloatingBackground } from '../design-system/FloatingBackground';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm transition duration-300',
    isActive ? 'bg-white/15 text-[#fff9ed] shadow-[0_10px_30px_rgba(255,155,69,0.18)]' : 'text-[#f4e5c7] hover:bg-white/10 hover:text-white',
  ].join(' ');

export function AppShell() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const hideShellOnPaths = ['/login', '/register'];
  if (hideShellOnPaths.includes(location.pathname)) {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-[#fff8eb]">
      <FloatingBackground />
      <div className="relative z-10">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link to="/" className="font-display text-2xl font-semibold uppercase tracking-[0.24em] text-[#ffe7b5]">
            Mira
          </Link>
          <nav className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1 shadow-[0_18px_60px_rgba(255,155,69,0.15)] backdrop-blur-xl">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
            {!user ? (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm text-[#f4e5c7] transition hover:bg-white/10 hover:text-white"
              >
                Logout
              </button>
            )}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

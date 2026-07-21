import {
  BookOpen,
  Calendar,
  Compass,
  Feather,
  LogOut,
  Map,
  Menu,
  Settings,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { type PropsWithChildren, type ElementType, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

const navItems = [
  { name: 'Compass', href: '/dashboard', icon: Compass },
  { name: 'Journeys', href: '/journeys', icon: Map },
  { name: 'Growth', href: '/growth', icon: Target },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'Insights', href: '/insights', icon: Sparkles },
];

const NavItem = ({
  item,
}: {
  item: { name: string; href: string; icon: React.ElementType };
}) => (
  <li>
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-white/15 text-[#fff9ed]'
            : 'text-[#d8c4a0] hover:bg-white/10 hover:text-[#fff9ed]'
        }`
      }
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </NavLink>
  </li>
);

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Do not render the shell on auth pages
  if (['/login', '/register'].includes(location.pathname)) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside
        className={`absolute inset-y-0 left-0 z-30 w-64 transform flex-col border-r border-white/10 bg-[#1c111a] p-4 transition-transform duration-300 lg:relative lg:flex lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/dashboard" className="flex flex-shrink-0 items-center gap-3 px-2">
          <Feather className="h-7 w-7 text-[#ffe7b5]" />
          <span className="text-xl font-semibold tracking-[-0.02em] text-[#fff9ed]">
            Mira
          </span>
        </Link>

        <nav className="mt-8 flex-grow">
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex-shrink-0">
          <ul className="space-y-1.5 border-t border-white/10 pt-4">
            <NavItem item={{ name: 'Settings', href: '/settings', icon: Settings }} />
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-white/5 p-3">
            <div className="overflow-hidden">
              <p className="truncate text-sm font-semibold text-[#fff9ed]">
                {user?.full_name || user?.username}
              </p>
              <p className="truncate text-xs text-[#d8c4a0]">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex-shrink-0 rounded-md p-2 text-[#d8c4a0] transition hover:bg-white/10 hover:text-white"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center border-b border-white/10 px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 text-[#d8c4a0] transition hover:bg-white/10 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex-1 text-center">
            <Link to="/dashboard" className="text-lg font-semibold tracking-[-0.02em] text-[#fff9ed]">
              Mira
            </Link>
          </div>
          <div className="w-8"></div> {/* Spacer to balance the header */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SurfaceCard } from '../components/design-system/SurfaceCard';
import { SunriseHero } from '../components/design-system/SunriseHero';
import { WarmButton } from '../components/design-system/WarmButton';
import { useAuth } from '../features/auth/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from history so it doesn't reappear on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login('demo@mira.local', 'demo123');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login failed. Ensure the database is seeded.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SunriseHero
            eyebrow="Return to calm"
            title="Welcome back to your quiet place"
            description="Sign in and re-enter a space designed for thinking clearly, planning gently, and growing with intention."
            illustration={
              <div className="space-y-3 text-sm leading-7 text-[#f6e6c8]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">The room is ready</p>
                <p>Your next moment can be a little lighter than the last.</p>
              </div>
            }
          />

          <SurfaceCard className="p-6 sm:p-8">
            <div className="space-y-2 text-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">Sign in</p>
              <h2 className="text-3xl font-semibold text-[#fff9ed]">Continue your day</h2>
              <p className="text-sm leading-7 text-[#f6e6c8]">A warm welcome awaits you inside Mira.</p>
            </div>

            {successMessage && (
              <div className="mt-6 rounded-[1.25rem] border border-green-200/40 bg-green-400/15 p-4 text-center text-sm text-green-100">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-[1.25rem] border border-rose-200/40 bg-rose-400/15 p-4 text-sm text-rose-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#f6e6c8]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#fff9ed] placeholder:text-[#d8c4a0] outline-none ring-0 transition focus:border-[#ffe7b5]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#f6e6c8]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#fff9ed] placeholder:text-[#d8c4a0] outline-none transition focus:border-[#ffe7b5]"
                  placeholder="••••••••"
                  required
                />
              </div>

              <WarmButton type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </WarmButton>
            </form>

            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-white/15"></div>
              <span className="mx-4 flex-shrink text-sm text-[#d8c4a0]">or</span>
              <div className="flex-grow border-t border-white/15"></div>
            </div>

            <WarmButton onClick={handleDemoLogin} variant="secondary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in as Demo User'}
            </WarmButton>

            <p className="mt-6 text-center text-sm text-[#f6e6c8]">
              New here?{' '}
              <Link to="/register" className="font-semibold text-[#ffe7b5] transition hover:text-white">
                Create an account
              </Link>
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

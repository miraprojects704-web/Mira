import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SurfaceCard } from '../components/design-system/SurfaceCard';
import { SunriseHero } from '../components/design-system/SunriseHero';
import { WarmButton } from '../components/design-system/WarmButton';
import { useAuth } from '../features/auth/AuthContext';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(email, username, password, fullName);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { message: 'Registration successful. Please sign in.' } });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SunriseHero
            eyebrow="Begin gently"
            title="Create a place that helps you think clearly"
            description="Mira is designed for people who want clarity, warmth, and a softer way to move through their day."
            illustration={
              <div className="space-y-3 text-sm leading-7 text-[#f6e6c8]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">Your first step</p>
                <p>Set up your space and let the day become more intentional from the start.</p>
              </div>
            }
          />

          <SurfaceCard className="p-6 sm:p-8">
            <div className="space-y-2 text-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">Create account</p>
              <h2 className="text-3xl font-semibold text-[#fff9ed]">Open the door to Mira</h2>
              <p className="text-sm leading-7 text-[#f6e6c8]">A calm beginning for your goals, reflections, and plans.</p>
            </div>

            {isSuccess && (
              <div className="mt-6 rounded-[1.25rem] border border-green-200/40 bg-green-400/15 p-4 text-center text-sm text-green-100">
                <p className="font-semibold">Welcome to Mira!</p>
                <p className="mt-1">Your sanctuary has been created. Redirecting you to sign in...</p>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-[1.25rem] border border-rose-200/40 bg-rose-400/15 p-4 text-sm text-rose-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#f6e6c8]">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#fff9ed] placeholder:text-[#d8c4a0] outline-none transition focus:border-[#ffe7b5]"
                  placeholder="Ari Chen"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-semibold text-[#f6e6c8]">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#fff9ed] placeholder:text-[#d8c4a0] outline-none transition focus:border-[#ffe7b5]"
                  placeholder="arichen"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#f6e6c8]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#fff9ed] placeholder:text-[#d8c4a0] outline-none transition focus:border-[#ffe7b5]"
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
                {isLoading ? 'Creating account...' : 'Create account'}
              </WarmButton>
            </form>

            <p className="mt-6 text-center text-sm text-[#f6e6c8]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#ffe7b5] transition hover:text-white">
                Sign in
              </Link>
            </p>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

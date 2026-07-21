import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../../lib/axios';
import { login as apiLogin, register as apiRegister, TokenResponse, User } from './api/authApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, full_name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get<User>('/auth/me', {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        setToken(savedToken);
        setUser(response.data);
        localStorage.setItem('auth_user', JSON.stringify(response.data));
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data: TokenResponse = await apiLogin({ email, password });

    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  };

  const register = async (email: string, username: string, password: string, full_name: string) => {
    const data: TokenResponse = await apiRegister({ email, username, password, full_name });

    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

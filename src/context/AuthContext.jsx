import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Optional: Verify token with backend
          try {
            const response = await getCurrentUser();
            if (response && response.user) {
              const normalizedUser = {
                ...response.user,
                role: response.user.role || response.user.user_type || response.user.userType
              };
              setUser(normalizedUser);
              localStorage.setItem('user', JSON.stringify(normalizedUser));
            }
          } catch (err) {
            console.error('Token verification failed:', err);
            // If token verification fails, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    setError(null);
    
    try {
      const response = await apiLogin(credentials);
      
      if (response && response.user) {
        const normalizedUser = {
          ...response.user,
          role: response.user.role || response.user.user_type || response.user.userType
        };
        
        setUser(normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        
        return response;
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isJobSeeker: user?.role === 'job_seeker',
    isEmployee: user?.role === 'employee' || user?.role === 'employer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
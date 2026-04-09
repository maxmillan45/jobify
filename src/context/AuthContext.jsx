// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  login as apiLogin, 
  register as apiRegister, 
  getCurrentUser, 
  setAuthToken,
  googleLogin as apiGoogleLogin,
  logout as apiLogout
} from '../services/api';
import { 
  signInWithGooglePopup, 
  logoutUser, 
  onAuthChange 
} from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Load user from token on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        setAuthToken(storedToken);
        setToken(storedToken);
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setLoading(false);
          } catch (e) {
            console.error('Error parsing stored user:', e);
            await loadUser();
          }
        } else {
          await loadUser();
        }
      } else {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser);
      
      if (firebaseUser && firebaseUser.isAuthenticated && firebaseUser.token) {
        // User logged in with Firebase, sync with backend
        if (!user) {
          console.log('Syncing Firebase user with backend...');
          const result = await apiGoogleLogin(firebaseUser.token);
          
          if (result.success) {
            setAuthToken(result.token);
            setToken(result.token);
            setUser(result.user);
            localStorage.setItem('user', JSON.stringify(result.user));
          }
        }
      } else if (!firebaseUser?.isAuthenticated && user) {
        // User logged out from Firebase
        console.log('Firebase user logged out');
        // Don't auto logout here - let the logout function handle it
      }
    });
    
    return () => unsubscribe();
  }, [user]);

  const loadUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        // Token might be invalid, clear it
        logout();
      }
    } catch (error) {
      console.error('Load user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      console.log('Login response in AuthContext:', response);
      
      if (response.success && response.token) {
        // Set token in localStorage and headers
        setAuthToken(response.token);
        setToken(response.token);
        
        // Set user immediately
        if (response.user) {
          setUser(response.user);
          // Also store user in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Return success with user data
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error in context:', error);
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
      if (response.success && response.token) {
        setAuthToken(response.token);
        setToken(response.token);
        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const googleLogin = async () => {
    try {
      // Sign in with Google popup
      const firebaseResult = await signInWithGooglePopup();
      
      if (!firebaseResult.success) {
        return { 
          success: false, 
          message: firebaseResult.error || 'Google login failed' 
        };
      }
      
      // Send Firebase token to your backend
      const backendResult = await apiGoogleLogin(firebaseResult.token);
      
      if (backendResult.success && backendResult.token) {
        setAuthToken(backendResult.token);
        setToken(backendResult.token);
        
        if (backendResult.user) {
          setUser(backendResult.user);
          localStorage.setItem('user', JSON.stringify(backendResult.user));
        }
        
        return { success: true, user: backendResult.user };
      } else {
        // If backend login fails, sign out from Firebase
        await logoutUser();
        return { 
          success: false, 
          message: backendResult.message || 'Failed to authenticate with backend' 
        };
      }
    } catch (error) {
      console.error('Google login error in context:', error);
      return { 
        success: false, 
        message: error.message || 'Google login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase
      await logoutUser();
    } catch (error) {
      console.error('Firebase logout error:', error);
    }
    
    // Clear backend auth
    apiLogout();
    setAuthToken(null);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
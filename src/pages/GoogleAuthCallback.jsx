// src/pages/GoogleAuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthToken } from '../services/api';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (token) {
        try {
          // Verify token with backend
          const response = await fetch('http://localhost:5000/api/auth/google/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          
          const data = await response.json();
          
          if (data.success) {
            setAuthToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
          } else {
            setError('Authentication failed');
            setTimeout(() => navigate('/login'), 3000);
          }
        } catch (err) {
          console.error('Google auth error:', err);
          setError('Authentication failed');
          setTimeout(() => navigate('/login'), 3000);
        }
      } else {
        setError('No token provided');
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    
    handleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-600 text-xl mb-2">Error</div>
            <p className="text-gray-600">{error}</p>
            <p className="text-gray-500 mt-2">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Completing sign in...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
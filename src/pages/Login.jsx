// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('employee');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      console.log('Logging in as:', userType);
      console.log('Email:', formData.email);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        userType: userType,
        name: userType === 'employer' ? 'Employer Name' : formData.email.split('@')[0],
        role: userType === 'employer' ? 'Employer' : 'Job Seeker',
        isAuthenticated: true
      }));
      
      navigate('/dashboard');
      
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome to Jobify
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* Role Selection Toggle */}
        <div className="flex gap-3 mb-8 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
              userType === 'employee'
                ? 'bg-white text-yellow-600 shadow-sm border border-yellow-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
            onClick={() => setUserType('employee')}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
              userType === 'employer'
                ? 'bg-white text-yellow-600 shadow-sm border border-yellow-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
            onClick={() => setUserType('employer')}
          >
            Employer
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg font-semibold transition-all hover:bg-yellow-500 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : `Sign in as ${userType === 'employee' ? 'Job Seeker' : 'Employer'}`}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
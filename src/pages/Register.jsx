// pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('employee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    position: '',
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

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (userType === 'employer' && !formData.companyName) {
      setError('Please enter your company name');
      setIsLoading(false);
      return;
    }

    if (userType === 'employee' && !formData.position) {
      setError('Please enter your current position');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Registering as:', userType);
      console.log('Form data:', formData);
      
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        userType: userType,
        companyName: formData.companyName,
        position: formData.position,
        role: userType === 'employer' ? 'Employer' : 'Job Seeker',
        isAuthenticated: true,
        registeredAt: new Date().toISOString()
      }));
      
      navigate('/dashboard');
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-600 text-sm">
            Join Jobify to start your journey
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
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

          {/* Employee-specific field */}
          {userType === 'employee' && (
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Current Position *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="e.g., Frontend Developer, Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
            </div>
          )}

          {/* Employer-specific field */}
          {userType === 'employer' && (
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min. 6 characters)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
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
            {isLoading ? 'Creating Account...' : `Sign up as ${userType === 'employee' ? 'Job Seeker' : 'Employer'}`}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
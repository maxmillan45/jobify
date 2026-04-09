// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Bookmark, 
  MessageCircle,
  ChevronDown,
  Search,
  Settings,
  HelpCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, logout: authLogout, loading: authLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    authLogout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Don't render until we know the auth state
  if (authLoading) {
    return (
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">Jobify</span>
            </div>
            <div className="h-10 w-10 bg-slate-800 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-white/10 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 text-gray-300">
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1 text-yellow-400" />
                <span>10,000+ Jobs Available</span>
              </span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                <span>500+ Companies Hiring</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/help')} className="text-gray-300 hover:text-white transition">
                Help Center
              </button>
              <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <Briefcase className="h-8 w-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-yellow-400">Jobify</span>
                <span className="text-xs text-gray-400 block">Your Career Starts Here</span>
              </div>
            </button>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, or keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                />
              </form>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigate('/jobs')} className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => navigate('/companies')} className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Companies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => navigate('/salaries')} className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Salaries
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => navigate('/career')} className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Career Advice
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4 ml-8">
              {isAuthenticated ? (
                <>
                  <button onClick={() => navigate('/saved-jobs')} className="relative text-gray-200 hover:text-yellow-400 transition">
                    <Bookmark className="h-5 w-5" />
                  </button>

                  <div className="relative" ref={notificationsRef}>
                    <button 
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className="relative text-gray-200 hover:text-yellow-400 transition"
                    >
                      <Bell className="h-5 w-5" />
                    </button>

                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="p-4 text-center text-gray-500">
                          No new notifications
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={profileRef}>
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 transition"
                    >
                      <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-900" />
                      </div>
                      <span className="hidden lg:inline">{authUser?.name || authUser?.email?.split('@')[0] || 'User'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <p className="font-semibold text-gray-900">{authUser?.name || authUser?.email}</p>
                          <p className="text-sm text-gray-500 capitalize">{authUser?.role || authUser?.userType}</p>
                        </div>
                        <div className="py-2">
                          <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <User className="h-4 w-4 inline mr-2" /> My Profile
                          </button>
                          <button onClick={() => { navigate('/dashboard'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Briefcase className="h-4 w-4 inline mr-2" /> Dashboard
                          </button>
                          <button onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Settings className="h-4 w-4 inline mr-2" /> Settings
                          </button>
                        </div>
                        <div className="border-t border-gray-200 py-2">
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4 inline mr-2" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-5 py-2 text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400/10 transition font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="px-5 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-400 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
              />
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <button onClick={() => { navigate('/jobs'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Jobs
              </button>
              <button onClick={() => { navigate('/companies'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Companies
              </button>
              <button onClick={() => { navigate('/salaries'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Salaries
              </button>
              <button onClick={() => { navigate('/career'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Career Advice
              </button>
              <button onClick={() => { navigate('/help'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Help Center
              </button>
              <button onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} className="text-gray-200 hover:text-yellow-400 py-2 text-left transition">
                Contact
              </button>
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-3 pt-3 border-t border-white/10">
                  <button 
                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                    className="text-center px-4 py-2 text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400/10 transition"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                    className="text-center px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
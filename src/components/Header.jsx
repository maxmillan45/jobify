import { useState } from 'react'
import { Link } from 'react-router-dom'
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
} from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock user data - replace with actual auth state later
  const isLoggedIn = false
  const user = {
    name: "John Doe",
    avatar: null,
    role: "Job Seeker"
  }

  const notifications = [
    { id: 1, text: "Your application for Frontend Developer was viewed", time: "5 min ago", unread: true },
    { id: 2, text: "New job matches your profile: Backend Developer", time: "1 hour ago", unread: true },
    { id: 3, text: "Tech Corp posted a new job", time: "3 hours ago", unread: false }
  ]

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
              <a href="/help" className="text-gray-300 hover:text-white hidden md:inline transition">
                Help Center
              </a>
              <a href="/contact" className="text-gray-300 hover:text-white hidden md:inline transition">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable Link to Home */}
            <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <Briefcase className="h-8 w-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-yellow-400">
                  Jobify
                </span>
                <span className="text-xs text-gray-400 block">Your Career Starts Here</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, or keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/jobs" className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="/companies" className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Companies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/salaries" className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Salaries
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/career" className="text-gray-200 hover:text-yellow-400 font-medium transition relative group">
                Career Advice
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* User Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4 ml-8">
              {isLoggedIn ? (
                <>
                  {/* Saved Jobs */}
                  <button className="relative text-gray-200 hover:text-yellow-400 transition">
                    <Bookmark className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* Messages */}
                  <button className="relative text-gray-200 hover:text-yellow-400 transition">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </button>

                  {/* Notifications Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className="relative text-gray-200 hover:text-yellow-400 transition"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    </button>

                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map(notif => (
                            <div key={notif.id} className={`p-3 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-blue-50' : ''}`}>
                              <p className="text-sm text-gray-900">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-gray-200">
                          <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-700">View all notifications</a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 transition"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full ring-2 ring-yellow-400" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                          <User className="h-4 w-4 text-slate-900" />
                        </div>
                      )}
                      <span className="hidden lg:inline">{user.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                        <div className="py-2">
                          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <User className="h-4 w-4 inline mr-2" /> My Profile
                          </Link>
                          <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Briefcase className="h-4 w-4 inline mr-2" /> Dashboard
                          </Link>
                          <Link to="/saved-jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Bookmark className="h-4 w-4 inline mr-2" /> Saved Jobs
                          </Link>
                          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Settings className="h-4 w-4 inline mr-2" /> Settings
                          </Link>
                          <a href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <HelpCircle className="h-4 w-4 inline mr-2" /> Help Center
                          </a>
                        </div>
                        <div className="border-t border-gray-200 py-2">
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <LogOut className="h-4 w-4 inline mr-2" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-5 py-2 text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400/10 transition font-medium">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-5 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition font-medium">
                    Sign Up
                  </Link>
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

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <Link to="/jobs" className="text-gray-200 hover:text-yellow-400 py-2 transition">Jobs</Link>
              <a href="/companies" className="text-gray-200 hover:text-yellow-400 py-2 transition">Companies</a>
              <a href="/salaries" className="text-gray-200 hover:text-yellow-400 py-2 transition">Salaries</a>
              <a href="/career" className="text-gray-200 hover:text-yellow-400 py-2 transition">Career Advice</a>
              
              {!isLoggedIn && (
                <div className="flex flex-col space-y-3 pt-3 border-t border-white/10">
                  <Link to="/login" className="text-center px-4 py-2 text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400/10 transition">
                    Sign In
                  </Link>
                  <Link to="/register" className="text-center px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
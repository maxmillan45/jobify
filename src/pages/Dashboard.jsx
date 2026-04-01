import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, FileText, Star, Clock, CheckCircle, XCircle, TrendingUp, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    savedJobs: 0,
    jobPosts: 0,
    applicants: 0,
    views: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    console.log('Dashboard - User data:', parsedUser);
    
    // Check for role in either userType or role field
    const userRole = parsedUser.userType || parsedUser.role;
    console.log('Dashboard - User role:', userRole);
    
    setUser(parsedUser);
    
    // Set stats based on user role
    if (userRole === 'employee' || userRole === 'employer') {
      // Employer stats
      setStats({
        totalApplications: 0,
        interviews: 0,
        savedJobs: 0,
        jobPosts: 5,
        applicants: 47,
        views: 1250
      });
    } else {
      // Job seeker stats
      setStats({
        totalApplications: 12,
        interviews: 3,
        savedJobs: 8,
        jobPosts: 0,
        applicants: 0,
        views: 0
      });
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const userRole = user.userType || user.role;
  const isEmployer = userRole === 'employee' || userRole === 'employer';
  const isJobSeeker = !isEmployer;

  // Job Seeker Dashboard
  if (isJobSeeker) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name || user.email}!</h1>
            <p className="text-purple-200">Your job search journey continues. Here's what's happening with your applications.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats.totalApplications}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Applications Sent</h3>
              <p className="text-sm text-gray-400 mt-1">Total jobs applied</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats.interviews}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Interviews</h3>
              <p className="text-sm text-gray-400 mt-1">Scheduled interviews</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stats.savedJobs}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Saved Jobs</h3>
              <p className="text-sm text-gray-400 mt-1">Jobs you've bookmarked</p>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Applications</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-gray-800">Frontend Developer</h3>
                    <p className="text-sm text-gray-500">Tech Corp • Applied 2 days ago</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Under Review</span>
                    <button className="text-purple-600 hover:text-purple-700">View Details</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-purple-600 hover:text-purple-700 font-medium">
              View all applications →
            </button>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-800">Senior React Developer</h3>
                  <p className="text-sm text-gray-500 mt-1">Innovate Labs • Remote</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-green-600">$80k - $120k</span>
                    <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Employer Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name || user.email}!</h1>
          <p className="text-blue-200">Manage your job posts and review applicants for {user.companyName || 'your company'}.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.jobPosts}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Jobs</h3>
            <p className="text-sm text-gray-400 mt-1">Currently hiring</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.applicants}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Applicants</h3>
            <p className="text-sm text-gray-400 mt-1">Across all jobs</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.views}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Views</h3>
            <p className="text-sm text-gray-400 mt-1">Job post views</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">12</span>
            </div>
            <h3 className="text-gray-600 font-medium">Pending Reviews</h3>
            <p className="text-sm text-gray-400 mt-1">Applications to review</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/post-job')}
              className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
            >
              <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-700">Post New Job</p>
              <p className="text-sm text-gray-500">Create a new job listing</p>
            </button>
            <button 
              onClick={() => navigate('/candidates')}
              className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
            >
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-700">View Applicants</p>
              <p className="text-sm text-gray-500">Review new applications</p>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-700">Company Profile</p>
              <p className="text-sm text-gray-500">Update company info</p>
            </button>
          </div>
        </div>

        {/* Active Job Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Job Posts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-800">Senior Full Stack Developer</h3>
                  <p className="text-sm text-gray-500">Posted 3 days ago • 24 applicants</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>
                  <button className="text-purple-600 hover:text-purple-700">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/employer-jobs')}
            className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
          >
            View all job posts →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  FileText, 
  Bookmark, 
  TrendingUp, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    profileViews: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      // Mock user data
      setUser({
        name: "John Doe",
        email: "john@example.com",
        role: "seeker",
        joinedDate: "2024-01-15",
        title: "Frontend Developer"
      })

      // Mock stats
      setStats({
        applications: 8,
        savedJobs: 5,
        interviews: 2,
        profileViews: 45
      })

      // Mock recent applications
      setRecentApplications([
        {
          id: 1,
          jobTitle: "Senior Frontend Developer",
          company: "Tech Corp",
          appliedDate: "2024-01-20",
          status: "pending",
          location: "Remote"
        },
        {
          id: 2,
          jobTitle: "React Developer",
          company: "Software Inc",
          appliedDate: "2024-01-18",
          status: "reviewed",
          location: "New York"
        },
        {
          id: 3,
          jobTitle: "Full Stack Developer",
          company: "Digital Solutions",
          appliedDate: "2024-01-15",
          status: "interview",
          location: "Remote"
        },
        {
          id: 4,
          jobTitle: "UI Developer",
          company: "Creative Studio",
          appliedDate: "2024-01-10",
          status: "rejected",
          location: "Los Angeles"
        }
      ])

      // Mock saved jobs
      setSavedJobs([
        {
          id: 1,
          title: "Backend Developer",
          company: "Software Inc",
          location: "Remote",
          type: "Full-time",
          salary: "$90,000 - $110,000"
        },
        {
          id: 2,
          title: "DevOps Engineer",
          company: "Cloud Systems",
          location: "San Francisco",
          type: "Full-time",
          salary: "$120,000 - $150,000"
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        text: "Pending"
      },
      reviewed: {
        color: "bg-blue-100 text-blue-800",
        icon: Eye,
        text: "Reviewed"
      },
      interview: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        text: "Interview"
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: XCircle,
        text: "Rejected"
      }
    }
    return badges[status] || badges.pending
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-300">
          {user?.role === 'seeker' 
            ? 'Track your job applications and find your next opportunity.'
            : 'Manage your job postings and find the perfect candidates.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Applications Sent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.applications}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Saved Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.savedJobs}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Bookmark className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Interviews</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.interviews}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Profile Views</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.profileViews}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <User className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              <Link to="/jobs" className="text-yellow-600 hover:text-yellow-700 mt-2 inline-block">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentApplications.map((app) => {
                const StatusIcon = getStatusBadge(app.status).icon
                return (
                  <div key={app.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.jobTitle}</h3>
                        <p className="text-sm text-gray-600 mt-1">{app.company}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">{app.location}</span>
                          <span className="text-xs text-gray-500">Applied: {app.appliedDate}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${getStatusBadge(app.status).color}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">{getStatusBadge(app.status).text}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Saved Jobs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
            <Link to="/saved-jobs" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {savedJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No saved jobs yet.</p>
              <Link to="/jobs" className="text-yellow-600 hover:text-yellow-700 mt-2 inline-block">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-xs text-gray-500">{job.location}</span>
                        <span className="text-xs text-gray-500">{job.type}</span>
                        <span className="text-xs text-green-600 font-medium">{job.salary}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/jobs/${job.id}`}
                      className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/jobs"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
          >
            <Briefcase className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-gray-700">Browse Jobs</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
          >
            <User className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-gray-700">Update Profile</span>
          </Link>
          <Link
            to="/applications"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
          >
            <FileText className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-gray-700">View Applications</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
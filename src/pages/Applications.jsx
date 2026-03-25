import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Briefcase,
  MapPin
} from 'lucide-react'

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Simulate fetching applications
    setTimeout(() => {
      const mockApplications = [
        {
          id: 1,
          jobId: 1,
          jobTitle: "Senior Frontend Developer",
          company: "Tech Corp",
          location: "Remote",
          type: "Full-time",
          appliedDate: "2024-01-20",
          status: "pending",
          salary: "$100,000 - $130,000"
        },
        {
          id: 2,
          jobId: 2,
          jobTitle: "React Developer",
          company: "Software Inc",
          location: "New York, NY",
          type: "Full-time",
          appliedDate: "2024-01-18",
          status: "reviewed",
          salary: "$90,000 - $110,000"
        },
        {
          id: 3,
          jobId: 3,
          jobTitle: "Full Stack Developer",
          company: "Digital Solutions",
          location: "Remote",
          type: "Full-time",
          appliedDate: "2024-01-15",
          status: "interview",
          salary: "$95,000 - $115,000",
          interviewDate: "2024-01-25",
          interviewTime: "2:00 PM"
        },
        {
          id: 4,
          jobId: 4,
          jobTitle: "UI Developer",
          company: "Creative Studio",
          location: "Los Angeles, CA",
          type: "Contract",
          appliedDate: "2024-01-10",
          status: "rejected",
          salary: "$70,000 - $90,000",
          feedback: "Thank you for your interest. We've decided to move forward with other candidates."
        },
        {
          id: 5,
          jobId: 5,
          jobTitle: "Backend Developer",
          company: "Software Inc",
          location: "Remote",
          type: "Full-time",
          appliedDate: "2024-01-05",
          status: "accepted",
          salary: "$95,000 - $115,000"
        }
      ]
      setApplications(mockApplications)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        text: "Pending Review"
      },
      reviewed: {
        color: "bg-blue-100 text-blue-800",
        icon: Eye,
        text: "Reviewed"
      },
      interview: {
        color: "bg-purple-100 text-purple-800",
        icon: Calendar,
        text: "Interview Scheduled"
      },
      accepted: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        text: "Accepted"
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: XCircle,
        text: "Not Selected"
      }
    }
    return configs[status] || configs.pending
  }

  const getStatusCount = (status) => {
    if (status === 'all') return applications.length
    return applications.filter(app => app.status === status).length
  }

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter)

  const filters = [
    { value: 'all', label: 'All Applications', count: getStatusCount('all') },
    { value: 'pending', label: 'Pending', count: getStatusCount('pending') },
    { value: 'reviewed', label: 'Reviewed', count: getStatusCount('reviewed') },
    { value: 'interview', label: 'Interview', count: getStatusCount('interview') },
    { value: 'accepted', label: 'Accepted', count: getStatusCount('accepted') },
    { value: 'rejected', label: 'Rejected', count: getStatusCount('rejected') }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track the status of all your job applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {filters.map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            className={`px-4 py-2 text-sm font-medium transition ${
              filter === filterOption.value
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {filterOption.label}
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
              {filterOption.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600 mb-6">You haven't applied to any jobs in this category.</p>
          <Link
            to="/jobs"
            className="inline-block bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const StatusIcon = getStatusConfig(app.status).icon
            return (
              <div key={app.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link to={`/jobs/${app.jobId}`}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-yellow-600 mb-2">
                        {app.jobTitle}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-3">{app.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {app.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {app.type}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                    </div>

                    {app.interviewDate && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-800">
                          <strong>Interview Scheduled:</strong> {app.interviewDate} at {app.interviewTime}
                        </p>
                      </div>
                    )}

                    {app.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Feedback:</strong> {app.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${getStatusConfig(app.status).color}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">{getStatusConfig(app.status).text}</span>
                    </div>
                    <Link
                      to={`/jobs/${app.jobId}`}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      View Job Details →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Applications
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, BookmarkX } from 'lucide-react'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching saved jobs
    setTimeout(() => {
      const mockSavedJobs = [
        {
          id: 1,
          title: "Backend Developer",
          company: "Software Inc",
          location: "Remote",
          type: "Full-time",
          salary: "$90,000 - $110,000",
          description: "Looking for a Node.js expert to build scalable APIs."
        },
        {
          id: 2,
          title: "DevOps Engineer",
          company: "Cloud Systems",
          location: "San Francisco",
          type: "Full-time",
          salary: "$120,000 - $150,000",
          description: "Manage cloud infrastructure and CI/CD pipelines."
        },
        {
          id: 3,
          title: "Product Manager",
          company: "Innovation Labs",
          location: "New York",
          type: "Full-time",
          salary: "$130,000 - $160,000",
          description: "Lead product development and work with cross-functional teams."
        }
      ]
      setSavedJobs(mockSavedJobs)
      setLoading(false)
    }, 1000)
  }, [])

  const removeSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId))
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-600">Jobs you've saved for later</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BookmarkX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved jobs</h3>
          <p className="text-gray-600 mb-6">Save jobs you're interested in to review them later.</p>
          <Link
            to="/jobs"
            className="inline-block bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link to={`/jobs/${job.id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-yellow-600 mb-2">
                      {job.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.type}
                    </span>
                    <span className="flex items-center text-sm text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">{job.description}</p>
                </div>
                
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-yellow-600 transition whitespace-nowrap"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeSavedJob(job.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedJobs
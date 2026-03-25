import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Building, 
  Users, 
  Clock,
  Bookmark,
  Share2,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showApplyForm, setShowApplyForm] = useState(false)

  // Mock job data - In real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockJob = {
        id: parseInt(id),
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        type: "Full-time",
        salary: "$100,000 - $130,000",
        experience: "5+ years",
        postedAt: "2024-01-15",
        description: "We're looking for an experienced Frontend Developer to join our growing team. You'll be working with React, TypeScript, and modern web technologies to build amazing user experiences. You will collaborate with designers, product managers, and backend engineers to create responsive and performant applications.",
        requirements: [
          "5+ years of frontend development experience",
          "Expert in React and modern JavaScript (ES6+)",
          "Experience with TypeScript",
          "Strong CSS and responsive design skills",
          "Experience with state management (Redux/Zustand)",
          "Excellent problem-solving abilities"
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "Flexible working hours",
          "Remote work options",
          "Professional development budget ($2000/year)",
          "Paid time off and holidays",
          "401(k) matching"
        ],
        companyInfo: {
          name: "Tech Corp",
          website: "https://techcorp.com",
          size: "200-500 employees",
          founded: "2015",
          description: "Tech Corp is a leading technology company dedicated to building innovative solutions that make a difference. We're a team of passionate individuals who believe in collaboration, continuous learning, and delivering exceptional value to our customers."
        }
      }
      setJob(mockJob)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    // In real app, save to backend
  }

  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Job link copied to clipboard!')
  }

  const handleApply = () => {
    setShowApplyForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
        <Link to="/" className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
          Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-yellow-500 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600">{job.company}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveJob}
                  className={`p-2 rounded-lg transition ${
                    isSaved 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-500 hover:text-white'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button
                  onClick={handleShareJob}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-500 hover:text-white transition"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pb-4 border-b">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center text-green-600 font-semibold">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted {job.postedAt}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About {job.company}</h2>
            <div className="space-y-3">
              <p className="text-gray-700">{job.companyInfo.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-semibold text-gray-900">{job.companyInfo.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold text-gray-900">{job.companyInfo.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
                    {job.companyInfo.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Building className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{job.company}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{job.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium text-gray-900">{job.type}</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p className="font-medium text-gray-900">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="font-medium text-gray-900">{job.experience}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="font-medium text-gray-900">{job.postedAt}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full mt-6 bg-yellow-500 text-slate-900 py-3 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Simple Apply Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
            <p className="text-gray-600 mb-4">at {job.company}</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link</label>
                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="https://..." />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-slate-900 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetails
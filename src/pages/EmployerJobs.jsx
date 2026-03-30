// src/pages/EmployerJobs.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Plus, Eye, Users, Edit, Trash2, 
  X, CheckCircle, Clock, Search, MapPin, DollarSign
} from 'lucide-react';

const EmployerJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'employer') {
      navigate('/dashboard');
      return;
    }

    loadEmployerJobs();
  }, [user, navigate]);

  const loadEmployerJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const employerJobs = allJobs.filter(job => job.employerId === user.id);
    setJobs(employerJobs);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePostJob = () => {
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    const newJob = {
      id: Date.now(),
      title: formData.title,
      company: user.companyName || user.name,
      companyLogo: null,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      postedAt: new Date().toISOString(),
      employerId: user.id,
      applicationsCount: 0,
      status: 'active'
    };

    allJobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(allJobs));
    
    setJobs([...jobs, newJob]);
    setShowPostModal(false);
    setFormData({
      title: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: ''
    });
    
    alert('Job posted successfully!');
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = allJobs.filter(job => job.id !== jobId);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      setJobs(jobs.filter(job => job.id !== jobId));
      alert('Job deleted successfully!');
    }
  };

  const handleViewApplicants = (job) => {
    const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    const jobApplicants = allApplications.filter(app => app.jobId === job.id);
    setSelectedJob(job);
    setApplicants(jobApplicants);
    setShowApplicantsModal(true);
  };

  const handleUpdateApplicationStatus = (applicationId, newStatus) => {
    const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    const updatedApplications = allApplications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    // Update local state
    setApplicants(applicants.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    
    alert(`Application ${newStatus} successfully!`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'reviewed': return 'bg-blue-100 text-blue-700';
      case 'shortlisted': return 'bg-purple-100 text-purple-700';
      case 'interview': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'accepted': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
            <p className="text-gray-600">Post and manage your job listings</p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition font-medium"
          >
            <Plus className="h-5 w-5" />
            Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{jobs.length}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Jobs</h3>
            <p className="text-sm text-gray-400">Active listings</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0)}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Applicants</h3>
            <p className="text-sm text-gray-400">Across all jobs</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {jobs.reduce((sum, job) => sum + (job.views || 0), 0)}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Views</h3>
            <p className="text-sm text-gray-400">Job post views</p>
          </div>
        </div>

        {/* Job Listings */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-4">Start by posting your first job listing</p>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {job.status || 'Active'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {job.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" /> {job.salary || 'Negotiable'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                    <div className="mt-3 flex gap-4 text-sm">
                      <span className="text-blue-600">{job.applicationsCount || 0} applicants</span>
                      <span className="text-purple-600">{job.views || 0} views</span>
                      <span className="text-gray-500">Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <button
                      onClick={() => handleViewApplicants(job)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      View Applicants
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Remote, New York, NY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range (Optional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., $80,000 - $100,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements (One per line)
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g.,&#10;3+ years of React experience&#10;Strong JavaScript knowledge&#10;Experience with Tailwind CSS"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibilities (One per line)
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g.,&#10;Develop new user-facing features&#10;Build reusable components&#10;Optimize applications for performance"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePostJob}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-500 transition"
                  >
                    Post Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Applicants Modal */}
      {showApplicantsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Applicants for {selectedJob.title}</h2>
                  <p className="text-gray-600">{applicants.length} applicants total</p>
                </div>
                <button
                  onClick={() => setShowApplicantsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {applicants.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No applicants yet for this position</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicants.map(applicant => (
                    <div key={applicant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{applicant.applicantName}</h3>
                          <p className="text-sm text-gray-500">
                            Applied on {new Date(applicant.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={applicant.status}
                            onChange={(e) => handleUpdateApplicationStatus(applicant.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(applicant.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview">Interview</option>
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                          </select>
                        </div>
                      </div>
                      
                      {applicant.coverLetter && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                          <p className="text-sm text-gray-600">{applicant.coverLetter}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerJobs;
// src/pages/JobList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockJobs } from '../data/mockJobs';
import { Briefcase, MapPin, Clock, DollarSign, Search, Bookmark, CheckCircle } from 'lucide-react';

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Get current user
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Load jobs
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 500);

    // Load saved jobs
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(saved);

    // Load applied jobs
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const userApplications = applications.filter(app => app.applicantId === user?.id);
    setAppliedJobs(userApplications);
  }, [user?.id]);

  // Filter jobs
  useEffect(() => {
    let filtered = jobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter);
    }
    
    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, typeFilter, jobs]);

  const isJobSaved = (jobId) => {
    return savedJobs.some(job => job.id === jobId);
  };

  const isJobApplied = (jobId) => {
    return appliedJobs.some(app => app.jobId === jobId);
  };

  const handleSaveJob = (job) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'employee') {
      alert('Only job seekers can save jobs');
      return;
    }

    let updatedSavedJobs;
    if (isJobSaved(job.id)) {
      updatedSavedJobs = savedJobs.filter(j => j.id !== job.id);
      alert('Job removed from saved');
    } else {
      updatedSavedJobs = [...savedJobs, job];
      alert('Job saved successfully!');
    }
    
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };

  const handleApplyClick = (job) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'employee') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    if (isJobApplied(job.id)) {
      alert('You have already applied for this job');
      return;
    }

    // Navigate to job details page with apply modal
    navigate(`/jobs/${job.id}`, { state: { showApply: true } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover thousands of opportunities from top companies</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Job title or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 appearance-none bg-white"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">Found {filteredJobs.length} jobs</p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-yellow-600 cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                        {job.title}
                      </h2>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveJob(job)}
                        className={`p-2 rounded-lg transition ${
                          isJobSaved(job.id)
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                        }`}
                      >
                        <Bookmark className="h-5 w-5" fill={isJobSaved(job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {job.type}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> {job.salary}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[140px]">
                  {isJobApplied(job.id) ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-500 transition"
                    >
                      Apply Now
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
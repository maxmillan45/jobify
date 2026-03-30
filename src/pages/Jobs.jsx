import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Briefcase, MapPin, Clock, DollarSign, Search, 
  Bookmark, CheckCircle, Filter, X, ChevronDown,
  Code, Palette, Database, Cloud, Shield, BarChart, Headphones
} from 'lucide-react';

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  // Job categories
  const categories = [
    { id: 'development', name: 'Development', icon: Code, color: 'blue', count: 156 },
    { id: 'design', name: 'Design', icon: Palette, color: 'pink', count: 89 },
    { id: 'data', name: 'Data & Analytics', icon: BarChart, color: 'green', count: 67 },
    { id: 'cloud', name: 'Cloud & Infrastructure', icon: Cloud, color: 'purple', count: 54 },
    { id: 'security', name: 'Security', icon: Shield, color: 'red', count: 43 },
    { id: 'support', name: 'IT & Support', icon: Headphones, color: 'orange', count: 78 }
  ];

  useEffect(() => {
    loadJobs();
    loadUserData();

    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location]);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, typeFilter, selectedCategory, jobs]);

  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJobs(allJobs);
    setFilteredJobs(allJobs);
    setLoading(false);
  };

  const loadUserData = () => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(saved);
    
    if (user) {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const userApplications = applications.filter(app => app.applicantId === user.id);
      setAppliedJobs(userApplications);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

    if (selectedCategory) {
      filtered = filtered.filter(job => {
        const categoryMap = {
          development: ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Mobile', 'Developer', 'Engineer'],
          design: ['UI', 'UX', 'Designer', 'Graphic', 'Product Design'],
          data: ['Data', 'Analyst', 'Scientist', 'BI', 'Business Intelligence'],
          cloud: ['Cloud', 'AWS', 'Azure', 'DevOps', 'Infrastructure'],
          security: ['Security', 'Cybersecurity', 'Penetration', 'Compliance'],
          support: ['Support', 'Help Desk', 'IT Support', 'Technical Support']
        };
        const keywords = categoryMap[selectedCategory] || [];
        return keywords.some(keyword => 
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (job.description && job.description.toLowerCase().includes(keyword.toLowerCase()))
        );
      });
    }
    
    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setSelectedCategory('');
  };

  const isJobSaved = (jobId) => savedJobs.some(job => job.id === jobId);
  const isJobApplied = (jobId) => appliedJobs.some(app => app.jobId === jobId);

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

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      pink: 'bg-pink-100 text-pink-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-300 mb-8">Browse thousands of opportunities from top companies</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:shadow-md hover:scale-105'
                }`}
              >
                <category.icon className={`h-8 w-8 mx-auto mb-2 ${
                  selectedCategory === category.id ? 'text-slate-900' : `text-${category.color}-500`
                }`} />
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-gray-500">{category.count} jobs</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div className="w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              >
                <option value="">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Found <span className="font-semibold">{filteredJobs.length}</span> jobs</p>
          <p className="text-sm text-gray-500">Showing {filteredJobs.length} of {jobs.length} total</p>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1 hover:text-yellow-600">
                          {job.title}
                        </h2>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }}
                        className={`p-2 rounded-lg transition ${
                          isJobSaved(job.id) ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
                        }`}
                      >
                        <Bookmark className="h-5 w-5" fill={isJobSaved(job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {job.type}</span>
                      <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> {job.salary || 'Negotiable'}</span>
                    </div>
                    <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    {isJobApplied(job.id) ? (
                      <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`, { state: { showApply: true } })}
                        className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-500"
                      >
                        Apply Now
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
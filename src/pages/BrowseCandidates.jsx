// src/pages/BrowseCandidates.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  User, 
  MapPin, 
  Briefcase, 
  Star,
  MessageCircle,
  Bookmark,
  CheckCircle,
  X,
  ChevronDown
} from 'lucide-react';

const BrowseCandidates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    experience: '',
    jobType: '',
    location: '',
    skills: ''
  });

  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: '5 years',
      skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind'],
      rating: 4.8,
      avatar: null,
      available: true,
      salary: '$120k - $150k',
      jobTypes: ['Full-time', 'Remote']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Backend Engineer',
      location: 'New York, NY',
      experience: '3 years',
      skills: ['Node.js', 'Python', 'MongoDB', 'Express'],
      rating: 4.5,
      avatar: null,
      available: true,
      salary: '$100k - $130k',
      jobTypes: ['Full-time']
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      location: 'Remote',
      experience: '4 years',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      rating: 4.9,
      avatar: null,
      available: false,
      salary: '$110k - $140k',
      jobTypes: ['Full-time', 'Remote']
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      title: 'UI/UX Designer',
      location: 'Austin, TX',
      experience: '2 years',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      rating: 4.7,
      avatar: null,
      available: true,
      salary: '$80k - $100k',
      jobTypes: ['Full-time', 'Contract']
    },
    {
      id: 5,
      name: 'David Kim',
      title: 'DevOps Engineer',
      location: 'Seattle, WA',
      experience: '6 years',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      rating: 4.6,
      avatar: null,
      available: true,
      salary: '$130k - $160k',
      jobTypes: ['Full-time']
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExperience = !filters.experience || candidate.experience.includes(filters.experience);
    const matchesLocation = !filters.location || candidate.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSkills = !filters.skills || candidate.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()));
    
    return matchesSearch && matchesExperience && matchesLocation && matchesSkills;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      jobType: '',
      location: '',
      skills: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Candidates</h1>
            <p className="text-gray-600 mt-1">Find the perfect talent for your team</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, title, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters Toggle */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <p className="text-sm text-gray-600">{filteredCandidates.length} candidates found</p>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">All Experience</option>
                    <option value="2">2+ years</option>
                    <option value="3">3+ years</option>
                    <option value="5">5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={filters.skills}
                    onChange={handleFilterChange}
                    placeholder="e.g., React"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{candidate.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {candidate.experience} experience
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-600">{candidate.salary}</span>
                  {candidate.available && (
                    <span className="flex items-center text-xs text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Available
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                    Contact
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bookmark className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCandidates;
// src/pages/CompanyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase,
  Globe,
  Mail,
  Phone,
  ArrowLeft,
  AlertCircle,
  DollarSign,
  Clock,
  CheckCircle,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react';

// Note: LinkedIn and Twitter are not in lucide-react, so we'll use custom SVG or remove them
// If you want social icons, you can use simple SVG or remove them

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/companies/${id}`);
      const data = await response.json();
      
      if (data.success && data.company) {
        setCompany(data.company);
      } else {
        setError('Company not found');
      }
    } catch (err) {
      console.error('Error fetching company:', err);
      setError('Failed to load company details');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    setFollowing(!following);
    // Here you would call an API to follow/unfollow the company
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: company.name,
        text: `Check out ${company.name} on Jobify`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The company you are looking for does not exist.'}</p>
            <Link to="/companies" className="inline-flex items-center text-yellow-600 hover:text-yellow-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/companies" className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>

          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-32 relative">
              <button 
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Company Logo and Info */}
            <div className="px-6 pb-6">
              <div className="flex justify-between items-start -mt-12 mb-4">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  {company.logo ? (
                    <img src={company.logo} alt={company.name} className="h-20 w-20 rounded-full object-cover" />
                  ) : (
                    <div className="h-20 w-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-yellow-600" />
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                      following 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {following ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Following
                      </span>
                    ) : (
                      'Follow'
                    )}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-gray-600 mb-4">{company.industry}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>Founded {company.founded}</span>
                </div>
                {company.website && (
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-5 w-5 mr-2 text-yellow-500" />
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {company.website.replace('https://', '').replace('http://', '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-yellow-500" />
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{company.description}</p>
          </div>

          {/* Company Culture & Benefits (if available) */}
          {company.culture && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Our Culture</h2>
              <p className="text-gray-700 leading-relaxed">{company.culture}</p>
            </div>
          )}

          {company.benefits && company.benefits.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Open Positions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-yellow-500" />
              Open Positions
              {company.jobs && company.jobs.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-sm rounded-full">
                  {company.jobs.length} positions
                </span>
              )}
            </h2>
            
            {company.jobs && company.jobs.length > 0 ? (
              <div className="space-y-4">
                {company.jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-yellow-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Link to={`/jobs/${job.id}`} className="group">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 mb-2">
                            {job.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-4 mb-3">
                          <span className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary || `$${job.salaryMin} - $${job.salaryMax}`}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Posted {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills && job.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                          {job.skills && job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="ml-4 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No open positions at the moment</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for new opportunities</p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-yellow-500" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                    {company.email}
                  </a>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${company.phone}`} className="text-gray-700">
                    {company.phone}
                  </a>
                </div>
              )}
              {company.address && (
                <div className="flex items-center space-x-3 col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{company.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
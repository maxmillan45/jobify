// src/pages/JobDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Building2,
  Users,
  Clock,
  ArrowLeft,
  Bookmark,
  Share2,
  AlertCircle
} from 'lucide-react';
import { getJobById, applyForJob } from '../services/api';
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth(); // ✅ Use auth context
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicationError, setApplicationError] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const result = await getJobById(id);
      console.log('Job details response:', result);
      
      if (result.success && result.job) {
        setJob(result.job);
      } else {
        setError('Job not found');
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    // ✅ Use auth context instead of direct localStorage
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }

    // Check if user is a job seeker (not employer)
    const userRole = user?.userType || user?.role;
    if (userRole === 'employer') {
      setApplicationError('Employers cannot apply for jobs. Please register as a job seeker to apply.');
      return;
    }

    setApplying(true);
    setApplicationError('');

    try {
      const applicationData = {
        jobId: parseInt(id),
        coverLetter: "I am very interested in this position and believe my skills align perfectly with your requirements."
      };
      
      console.log('Sending application data:', applicationData);
      console.log('Current user:', user);
      console.log('Token exists:', !!localStorage.getItem('token'));
      
      const result = await applyForJob(applicationData);
      console.log('Application result:', result);
      
      if (result.success) {
        setApplicationSuccess(true);
        setTimeout(() => {
          setApplicationSuccess(false);
        }, 5000);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/applications');
        }, 2000);
      } else {
        setApplicationError(result.message || 'Failed to apply. Please try again.');
      }
    } catch (err) {
      console.error('Application error:', err);
      
      // Handle specific error messages
      if (err.message.includes('already applied')) {
        setApplicationError('You have already applied for this position.');
      } else if (err.message.includes('login') || err.message.includes('401')) {
        setApplicationError('Please login to apply for this job.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (err.message.includes('403')) {
        setApplicationError('You do not have permission to apply for jobs.');
      } else {
        setApplicationError(err.message || 'Failed to apply. Please try again.');
      }
    } finally {
      setApplying(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
            <Link to="/jobs" className="inline-flex items-center text-yellow-600 hover:text-yellow-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
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
          <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>

          {/* Success Message */}
          {applicationSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-800">Application submitted successfully!</p>
              </div>
              <Link to="/applications" className="text-green-600 hover:text-green-700 font-medium">
                View My Applications →
              </Link>
            </div>
          )}

          {/* Error Message */}
          {applicationError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{applicationError}</p>
            </div>
          )}

          {/* Not Logged In Message */}
          {!isAuthenticated && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-center">
                Please <Link to="/login" className="font-semibold underline">login</Link> to apply for this job
              </p>
            </div>
          )}

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center space-x-4 mb-4 flex-wrap gap-2">
                  <Link 
                    to={`/companies/${job.companyId || job.id}`} 
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Building2 className="h-4 w-4 mr-1" />
                    <span className="font-medium">{job.company}</span>
                  </Link>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mt-4">
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-semibold text-gray-900">
                  {job.salary || (job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax}` : 'Not specified')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-semibold text-gray-900">{job.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-semibold text-gray-900">{job.experience || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-semibold text-gray-900">
                  {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{job.description}</p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              </>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                <ul className="list-disc list-inside space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Skills Section */}
          {job.skills && job.skills.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button - Only show if authenticated */}
          {isAuthenticated && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {user?.userType === 'employer' && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm text-center">
                    You are logged in as an employer. Please register as a job seeker to apply for jobs.
                  </p>
                </div>
              )}
              <button
                onClick={handleApply}
                disabled={applying || user?.userType === 'employer'}
                className="w-full py-3 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? 'Submitting Application...' : 'Apply Now'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                By applying, you agree to our terms and conditions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
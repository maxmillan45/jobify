// src/pages/JobDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockJobs } from '../data/mockJobs';
import { 
  Briefcase, MapPin, Clock, DollarSign, Calendar, 
  CheckCircle, X, Bookmark, Users, Award, Code
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Load job
    const foundJob = mockJobs.find(j => j.id === parseInt(id));
    if (foundJob) {
      setJob(foundJob);
    }
    setLoading(false);

    // Check if job is saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.some(j => j.id === parseInt(id)));

    // Check if already applied
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const hasAppliedJob = applications.some(app => app.jobId === parseInt(id) && app.applicantId === user?.id);
    setHasApplied(hasAppliedJob);

    // Check if we should show apply modal from navigation state
    if (location.state?.showApply && !hasAppliedJob) {
      setShowApplyModal(true);
    }
  }, [id, user?.id, location.state]);

  const handleSaveJob = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      const updated = savedJobs.filter(j => j.id !== job.id);
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      setIsSaved(false);
      alert('Job removed from saved');
    } else {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
      alert('Job saved successfully!');
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'employee') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    if (hasApplied) {
      alert('You have already applied for this job');
      return;
    }

    setShowApplyModal(true);
  };

  const handleSubmitApplication = () => {
    if (!coverLetter.trim()) {
      alert('Please write a cover letter');
      return;
    }

    // Get existing applications
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    // Create new application
    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantId: user.id,
      applicantName: user.name,
      coverLetter: coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    setApplicationSubmitted(true);
    setHasApplied(true);
    
    setTimeout(() => {
      setShowApplyModal(false);
      setApplicationSubmitted(false);
      setCoverLetter('');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-4">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-yellow-600 transition flex items-center gap-2"
        >
          ← Back to Jobs
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-gray-500">
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" /> {job.location}
                </span>
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" /> {job.type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" /> {job.salary}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" /> Posted {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveJob}
                className={`p-3 rounded-lg transition ${
                  isSaved
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                }`}
              >
                <Bookmark className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-2 mb-6">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <Code className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          {hasApplied ? (
            <div className="text-center py-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-green-700 mb-1">Application Submitted!</h3>
              <p className="text-green-600">You have successfully applied for this position.</p>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="w-full py-4 bg-yellow-400 text-slate-900 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {applicationSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">Your application has been sent successfully.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={8}
                      placeholder="Tell us why you're the perfect fit for this position..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-2">
                      Briefly explain why you're interested and what makes you qualified.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowApplyModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitApplication}
                      className="flex-1 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-500 transition"
                    >
                      Submit Application
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
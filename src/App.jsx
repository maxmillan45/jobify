// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import SavedJobs from './pages/SavedJobs';
import EmployerJobs from './pages/EmployerJobs';
import Companies from './pages/Companies';
import Salaries from './pages/Salaries';
import CareerAdvice from './pages/CareerAdvice';
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import PostJob from './pages/PostJob';
import BrowseCandidates from './pages/BrowseCandidates';
import Pricing from './pages/Pricing';
import GoogleAuthCallback from './pages/GoogleAuthCallback';
import CompanyDetails from './pages/CompanyDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<JobList />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyDetails />} />
              <Route path="/salaries" element={<Salaries />} />
              <Route path="/career" element={<CareerAdvice />} />
              <Route path="/career-advice" element={<CareerAdvice />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              
              {/* Job Seeker Specific Routes */}
              <Route path="/applications" element={
                <ProtectedRoute allowedRoles={['job_seeker']}>
                  <Applications />
                </ProtectedRoute>
              } />
              
              <Route path="/saved-jobs" element={
                <ProtectedRoute allowedRoles={['job_seeker']}>
                  <SavedJobs />
                </ProtectedRoute>
              } />
              
              {/* Employee/Employer Specific Routes */}
              <Route path="/employer-jobs" element={
                <ProtectedRoute allowedRoles={['employee', 'employer']}>
                  <EmployerJobs />
                </ProtectedRoute>
              } />
              
              <Route path="/post-job" element={
                <ProtectedRoute allowedRoles={['employee', 'employer']}>
                  <PostJob />
                </ProtectedRoute>
              } />
              
              <Route path="/candidates" element={
                <ProtectedRoute allowedRoles={['employee', 'employer']}>
                  <BrowseCandidates />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
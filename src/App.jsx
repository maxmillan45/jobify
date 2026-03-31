// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/career" element={<CareerAdvice />} />
            <Route path="/career-advice" element={<CareerAdvice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/employer-jobs" element={<EmployerJobs />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/candidates" element={<BrowseCandidates />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
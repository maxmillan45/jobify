// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Jobify</h3>
            <p className="text-gray-400 text-sm">
              Find your dream job with thousands of opportunities from top companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/jobs" className="hover:text-yellow-400 transition">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-yellow-400 transition">Companies</Link></li>
              <li><Link to="/salaries" className="hover:text-yellow-400 transition">Salaries</Link></li>
              <li><Link to="/career" className="hover:text-yellow-400 transition">Career Advice</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-3">For Employers</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/post-job" className="hover:text-yellow-400 transition">Post a Job</Link></li>
              <li><Link to="/candidates" className="hover:text-yellow-400 transition">Browse Candidates</Link></li>
              <li><Link to="/pricing" className="hover:text-yellow-400 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: support@jobify.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: Silicon Valley, CA</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Jobify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
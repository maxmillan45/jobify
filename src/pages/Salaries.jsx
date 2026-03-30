import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, BarChart, Award, MapPin, Briefcase, Search } from 'lucide-react';

const Salaries = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJobs(allJobs);
    setLoading(false);
  };

  const jobRoles = [...new Set(jobs.map(job => {
    if (job.title.includes('Frontend')) return 'Frontend Developer';
    if (job.title.includes('Backend')) return 'Backend Developer';
    if (job.title.includes('Full Stack')) return 'Full Stack Developer';
    if (job.title.includes('DevOps')) return 'DevOps Engineer';
    if (job.title.includes('Data')) return 'Data Scientist';
    if (job.title.includes('UI') || job.title.includes('UX')) return 'UI/UX Designer';
    return job.title;
  }))].slice(0, 10);

  const locations = [...new Set(jobs.map(job => job.location))].slice(0, 10);

  const calculateSalary = () => {
    // Mock salary data based on role and location
    const salaries = {
      'Frontend Developer': { min: 70000, max: 120000, average: 95000 },
      'Backend Developer': { min: 80000, max: 130000, average: 105000 },
      'Full Stack Developer': { min: 85000, max: 140000, average: 112000 },
      'DevOps Engineer': { min: 90000, max: 150000, average: 120000 },
      'Data Scientist': { min: 85000, max: 145000, average: 115000 },
      'UI/UX Designer': { min: 60000, max: 110000, average: 85000 }
    };

    const locationMultiplier = {
      'Remote': 1.0,
      'New York, NY': 1.3,
      'San Francisco, CA': 1.4,
      'Austin, TX': 1.1,
      'Seattle, WA': 1.2,
      'Chicago, IL': 1.0
    };

    const baseSalary = salaries[selectedRole] || { min: 50000, max: 90000, average: 70000 };
    const multiplier = locationMultiplier[selectedLocation] || 1.0;

    setSalaryData({
      role: selectedRole,
      location: selectedLocation,
      min: Math.round(baseSalary.min * multiplier),
      max: Math.round(baseSalary.max * multiplier),
      average: Math.round(baseSalary.average * multiplier),
      entryLevel: Math.round(baseSalary.min * multiplier * 0.8),
      seniorLevel: Math.round(baseSalary.max * multiplier * 1.2)
    });
  };

  const popularRoles = [
    { title: 'Frontend Developer', salary: '$95,000', icon: Briefcase },
    { title: 'Backend Developer', salary: '$105,000', icon: Briefcase },
    { title: 'Full Stack Developer', salary: '$112,000', icon: Briefcase },
    { title: 'DevOps Engineer', salary: '$120,000', icon: Briefcase },
    { title: 'Data Scientist', salary: '$115,000', icon: BarChart },
    { title: 'UI/UX Designer', salary: '$85,000', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <DollarSign className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Salary Explorer</h1>
          <p className="text-xl text-gray-300 mb-8">Discover competitive salaries for tech roles across the country</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Salary Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select a role</option>
                {jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateSalary}
            disabled={!selectedRole || !selectedLocation}
            className="w-full py-3 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Salary
          </button>

          {salaryData && (
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Salary Range for {salaryData.role} in {salaryData.location}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Entry Level</p>
                  <p className="text-2xl font-bold text-gray-900">${salaryData.entryLevel.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">0-2 years experience</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Average</p>
                  <p className="text-3xl font-bold text-yellow-600">${salaryData.average.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">3-5 years experience</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Senior Level</p>
                  <p className="text-2xl font-bold text-gray-900">${salaryData.seniorLevel.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">6+ years experience</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-semibold text-gray-900">${salaryData.min.toLocaleString()} - ${salaryData.max.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popular Roles */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tech Roles & Salaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularRoles.map((role, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <role.icon className="h-10 w-10 text-yellow-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">{role.title}</h3>
              <p className="text-2xl font-bold text-yellow-600 mb-2">{role.salary}</p>
              <p className="text-sm text-gray-500">Average annual salary</p>
            </div>
          ))}
        </div>

        {/* Salary by Location */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary by Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <MapPin className="h-8 w-8 text-yellow-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">Highest Paying Cities</h3>
            <div className="space-y-3">
              {['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Boston, MA', 'Austin, TX'].map((city, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-700">{city}</span>
                  <span className="font-semibold text-gray-900">${(120000 - idx * 5000).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <TrendingUp className="h-8 w-8 text-yellow-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">Fastest Growing Roles</h3>
            <div className="space-y-3">
              {[
                { role: 'AI/ML Engineer', growth: '+45%' },
                { role: 'DevOps Engineer', growth: '+38%' },
                { role: 'Security Engineer', growth: '+35%' },
                { role: 'Data Scientist', growth: '+32%' },
                { role: 'Cloud Architect', growth: '+30%' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.role}</span>
                  <span className="text-green-600 font-semibold">{item.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salaries;
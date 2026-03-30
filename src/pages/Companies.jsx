import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Users, Briefcase, Star, Search, Filter, ChevronRight } from 'lucide-react';

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, industryFilter, companies]);

  const loadCompanies = () => {
    // Get unique companies from jobs
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const companyMap = new Map();
    
    allJobs.forEach(job => {
      if (!companyMap.has(job.company)) {
        companyMap.set(job.company, {
          id: job.employerId || Date.now(),
          name: job.company,
          location: job.location,
          industry: getIndustryFromJob(job.title),
          jobsPosted: 1,
          logo: null,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
          reviews: Math.floor(Math.random() * 100) + 10
        });
      } else {
        const existing = companyMap.get(job.company);
        existing.jobsPosted++;
        companyMap.set(job.company, existing);
      }
    });
    
    setCompanies(Array.from(companyMap.values()));
    setFilteredCompanies(Array.from(companyMap.values()));
    setLoading(false);
  };

  const getIndustryFromJob = (title) => {
    if (title.includes('Frontend') || title.includes('Backend') || title.includes('Full Stack')) return 'Technology';
    if (title.includes('Design') || title.includes('UI') || title.includes('UX')) return 'Design';
    if (title.includes('Data') || title.includes('Analyst')) return 'Data & Analytics';
    if (title.includes('Cloud') || title.includes('DevOps')) return 'Cloud Computing';
    if (title.includes('Security')) return 'Cybersecurity';
    return 'Technology';
  };

  const filterCompanies = () => {
    let filtered = [...companies];
    
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (industryFilter) {
      filtered = filtered.filter(company => company.industry === industryFilter);
    }
    
    setFilteredCompanies(filtered);
  };

  const industries = [...new Set(companies.map(c => c.industry))];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-400" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Companies Hiring Now</h1>
          <p className="text-xl text-gray-300 mb-8">Discover great companies and find your next career opportunity</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies by name or industry"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <Building className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{companies.length}</h3>
            <p className="text-gray-600">Companies Hiring</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Briefcase className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              {JSON.parse(localStorage.getItem('jobs') || '[]').length}
            </h3>
            <p className="text-gray-600">Open Positions</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Users className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
            <p className="text-gray-600">Active Job Seekers</p>
          </div>
        </div>

        {/* Industry Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filter by Industry:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIndustryFilter('')}
              className={`px-4 py-2 rounded-full text-sm transition ${
                industryFilter === '' 
                  ? 'bg-yellow-400 text-slate-900' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => setIndustryFilter(industry)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  industryFilter === industry 
                    ? 'bg-yellow-400 text-slate-900' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/companies/${company.id}`)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {renderStars(company.rating)}
                        <span className="ml-1">{company.rating}</span>
                        <span className="text-gray-400">({company.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {company.industry}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{company.jobsPosted} open positions</span>
                  </div>
                </div>
                
                <button className="w-full mt-2 py-2 border border-yellow-400 text-yellow-600 rounded-lg group-hover:bg-yellow-400 group-hover:text-white transition flex items-center justify-center gap-2">
                  View Jobs <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
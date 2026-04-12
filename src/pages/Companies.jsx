// src/pages/Companies.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Users, Briefcase } from 'lucide-react';

// Import API service
import { getCompanies } from '../services/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm]);

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      // Use the API service instead of direct fetch to localhost
      const result = await getCompanies();
      console.log('Companies API response:', result);
      
      // Handle different response structures
      let companiesData = [];
      if (result.success && result.companies) {
        companiesData = result.companies;
      } else if (result.companies) {
        companiesData = result.companies;
      } else if (Array.isArray(result)) {
        companiesData = result;
      } else if (result.data && Array.isArray(result.data)) {
        companiesData = result.data;
      }
      
      // Apply search filter locally
      let filteredCompanies = companiesData;
      if (searchTerm) {
        filteredCompanies = companiesData.filter(company => 
          company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setCompanies(filteredCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError(error.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Companies</h3>
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => fetchCompanies()}
                className="mt-4 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Top Companies</h1>
            <p className="text-gray-600 mt-2">Discover companies hiring now</p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search companies by name or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Companies Grid */}
          {companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id || company._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-3 rounded-lg">
                      <Building2 className="h-8 w-8 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-500">
                      {company.jobs?.length || 0} jobs
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{company.industry || 'Technology'}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {company.location || 'Remote / Worldwide'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {company.size || '11-50 employees'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {company.jobs?.length || 0} open positions
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description || 'No description available'}</p>
                  <Link
                    to={`/companies/${company.id || company._id}`}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium group"
                  >
                    View Company Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No companies found</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-yellow-600 hover:text-yellow-700"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
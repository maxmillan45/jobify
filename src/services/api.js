// src/services/api.js
// Change this line to use the deployed backend
const API_URL = 'https://jobify-backend-ten.vercel.app/api';

// Store token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Get token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls with better error handling
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    console.log(`Making ${method} request to: ${API_URL}${endpoint}`);
    if (data) console.log('Request data:', data);
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Try to parse response as JSON
    let result;
    try {
      result = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      throw new Error('Invalid response from server');
    }
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', result);
    
    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        // Only clear token and redirect for protected routes, not for login/register
        const isAuthRoute = endpoint.includes('/auth/login') || endpoint.includes('/auth/register');
        if (!isAuthRoute) {
          setAuthToken(null);
          localStorage.removeItem('user');
          throw new Error('Please login to continue');
        } else {
          // For login/register, just throw the error message
          throw new Error(result.message || 'Authentication failed');
        }
      }
      
      throw new Error(result.message || result.error || `HTTP error! status: ${response.status}`);
    }
    
    return result;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// Auth Services
export const register = async (userData) => {
  try {
    const result = await apiCall('/auth/register', 'POST', userData);
    
    if (result.token) {
      setAuthToken(result.token);
    }
    
    // Normalize user data if present
    if (result.user) {
      const normalizedUser = {
        ...result.user,
        role: result.user.role || result.user.user_type || result.user.userType || result.user.type,
        userType: result.user.userType || result.user.user_type || result.user.role || result.user.type,
        name: result.user.name || result.user.fullName || result.user.email?.split('@')[0] || 'User'
      };
      
      return {
        success: true,
        token: result.token,
        user: normalizedUser
      };
    }
    
    return {
      success: !!result.token,
      token: result.token,
      message: result.message
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      message: error.message || 'Registration failed'
    };
  }
};

export const login = async (credentials) => {
  try {
    const result = await apiCall('/auth/login', 'POST', credentials);
    
    console.log('Raw login response:', result);
    
    if (result.token) {
      setAuthToken(result.token);
    }
    
    // Normalize user data to ensure consistent field names
    if (result.user) {
      // Check for different possible role field names from backend
      const normalizedUser = {
        ...result.user,
        role: result.user.role || result.user.user_type || result.user.userType || result.user.type,
        userType: result.user.userType || result.user.user_type || result.user.role || result.user.type,
        name: result.user.name || result.user.fullName || result.user.email?.split('@')[0] || 'User'
      };
      
      // Log the role detection for debugging
      console.log('Normalized user:', normalizedUser);
      
      // Return with success property for AuthContext
      return {
        success: true,
        token: result.token,
        user: normalizedUser
      };
    }
    
    // If login successful but no user object
    if (result.token) {
      return {
        success: true,
        token: result.token,
        user: null
      };
    }
    
    // Login failed
    return {
      success: false,
      message: result.message || 'Login failed'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Login failed'
    };
  }
};

// Google Login with Firebase token
export const googleLogin = async (firebaseToken) => {
  try {
    const result = await apiCall('/auth/google', 'POST', { token: firebaseToken });
    
    console.log('Google login response:', result);
    
    if (result.token) {
      setAuthToken(result.token);
    }
    
    // Normalize user data
    if (result.user) {
      const normalizedUser = {
        ...result.user,
        role: result.user.role || result.user.user_type || result.user.userType || 'job_seeker',
        userType: result.user.userType || result.user.user_type || result.user.role || 'job_seeker',
        name: result.user.name || result.user.email?.split('@')[0] || 'User'
      };
      
      return {
        success: true,
        token: result.token,
        user: normalizedUser
      };
    }
    
    return {
      success: false,
      message: result.message || 'Google login failed'
    };
  } catch (error) {
    console.error('Google login error:', error);
    return {
      success: false,
      message: error.message || 'Google login failed'
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await apiCall('/auth/me');
    
    if (result.user) {
      const normalizedUser = {
        ...result.user,
        role: result.user.role || result.user.user_type || result.user.userType || result.user.type,
        userType: result.user.userType || result.user.user_type || result.user.role || result.user.type
      };
      
      return {
        success: true,
        user: normalizedUser
      };
    }
    
    return {
      success: false,
      message: 'User not found'
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Job Services
export const getJobs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/jobs${queryParams ? `?${queryParams}` : ''}`;
    const result = await apiCall(endpoint);
    
    // Handle different response structures
    if (result.success && result.jobs) {
      return result;
    } else if (result.jobs) {
      return { success: true, jobs: result.jobs, total: result.total || result.jobs.length };
    } else if (Array.isArray(result)) {
      return { success: true, jobs: result, total: result.length };
    } else {
      return { success: true, jobs: [], total: 0 };
    }
  } catch (error) {
    console.error('Get jobs error:', error);
    return { success: false, jobs: [], total: 0, error: error.message };
  }
};

export const getJobById = async (id) => {
  try {
    const result = await apiCall(`/jobs/${id}`);
    
    // Handle different response structures
    if (result.success && result.job) {
      return result;
    } else if (result.job) {
      return { success: true, job: result.job };
    } else {
      return { success: true, job: result };
    }
  } catch (error) {
    console.error('Get job by ID error:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  return await apiCall('/jobs', 'POST', jobData);
};

// Application Services
export const applyForJob = async (applicationData) => {
  try {
    // Make sure jobId is being sent correctly
    const payload = {
      jobId: parseInt(applicationData.jobId) || applicationData.jobId,
      coverLetter: applicationData.coverLetter || ''
    };
    
    console.log('Applying for job with payload:', payload);
    console.log('Auth token present:', !!getAuthToken());
    
    const result = await apiCall('/applications', 'POST', payload);
    console.log('Application response:', result);
    
    // Handle different response structures
    if (result.success === false) {
      throw new Error(result.message || 'Application failed');
    }
    
    return { success: true, ...result };
  } catch (error) {
    console.error('Apply for job error:', error);
    throw error;
  }
};

export const getMyApplications = async () => {
  try {
    const result = await apiCall('/applications/my-applications');
    return result;
  } catch (error) {
    console.error('Get my applications error:', error);
    throw error;
  }
};

// Employer Services
export const getEmployerJobs = async () => {
  try {
    const result = await apiCall('/jobs/employer/my-jobs');
    return result;
  } catch (error) {
    console.error('Get employer jobs error:', error);
    throw error;
  }
};

export const getJobApplicants = async (jobId) => {
  try {
    const result = await apiCall(`/jobs/${jobId}/applicants`);
    return result;
  } catch (error) {
    console.error('Get job applicants error:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const result = await apiCall(`/applications/${applicationId}/status`, 'PUT', { status });
    return result;
  } catch (error) {
    console.error('Update application status error:', error);
    throw error;
  }
};

// Company Services
export const getCompanies = async () => {
  try {
    const result = await apiCall('/companies');
    return result;
  } catch (error) {
    console.error('Get companies error:', error);
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    const result = await apiCall(`/companies/${id}`);
    return result;
  } catch (error) {
    console.error('Get company by ID error:', error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const result = await apiCall('/companies', 'POST', companyData);
    return result;
  } catch (error) {
    console.error('Create company error:', error);
    throw error;
  }
};

export const updateCompany = async (id, companyData) => {
  try {
    const result = await apiCall(`/companies/${id}`, 'PUT', companyData);
    return result;
  } catch (error) {
    console.error('Update company error:', error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    const result = await apiCall(`/companies/${id}`, 'DELETE');
    return result;
  } catch (error) {
    console.error('Delete company error:', error);
    throw error;
  }
};

export default {
  register,
  login,
  googleLogin,
  getCurrentUser,
  logout,
  getJobs,
  getJobById,
  createJob,
  applyForJob,
  getMyApplications,
  getEmployerJobs,
  getJobApplicants,
  updateApplicationStatus,
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
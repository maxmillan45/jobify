// src/services/api.js
const API_URL = 'http://localhost:5000/api';

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
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('API Response:', result);
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
    return result;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
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
        role: result.user.role || result.user.user_type || result.user.userType || result.user.type
      };
      
      // Log the role detection for debugging
      console.log('Normalized user role:', normalizedUser.role);
      console.log('Original user data:', result.user);
      
      // Return normalized user data
      return {
        ...result,
        user: normalizedUser
      };
    }
    
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await apiCall('/auth/me');
    
    if (result.user) {
      const normalizedUser = {
        ...result.user,
        role: result.user.role || result.user.user_type || result.user.userType || result.user.type
      };
      
      return {
        ...result,
        user: normalizedUser
      };
    }
    
    return result;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('user');
};

// Job Services
export const getJobs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/jobs${queryParams ? `?${queryParams}` : ''}`;
    return await apiCall(endpoint);
  } catch (error) {
    console.error('Get jobs error:', error);
    return { success: true, jobs: [], total: 0 };
  }
};

export const getJobById = async (id) => {
  return await apiCall(`/jobs/${id}`);
};

export const createJob = async (jobData) => {
  return await apiCall('/jobs', 'POST', jobData);
};

// Application Services
export const applyForJob = async (applicationData) => {
  return await apiCall('/applications', 'POST', applicationData);
};

export const getMyApplications = async () => {
  return await apiCall('/applications/my-applications');
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
  getJobs,
  getJobById,
  createJob,
  applyForJob,
  getMyApplications,
};
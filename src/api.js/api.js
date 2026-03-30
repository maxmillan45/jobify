import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const jobService = {
  getAllJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  searchJobs: (query) => api.get(`/jobs?q=${query}`),
  filterJobs: (filters) => {
    let url = '/jobs?'
    if (filters.location) url += `location=${filters.location}&`
    if (filters.type) url += `type=${filters.type}&`
    if (filters.search) url += `q=${filters.search}&`
    return api.get(url)
  }
}

export default api
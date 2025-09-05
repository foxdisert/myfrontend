import axios from 'axios'
import { API_CONFIG } from '../config/api'
import debugLogger from '../utils/debugLogger'

// Create axios instance
export const api = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api`,
  timeout: API_CONFIG.TIMEOUT.UPLOAD, // 5 minutes for large CSV uploads
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log all API requests for debugging
    debugLogger.logApiCall(config.method?.toUpperCase(), config.url, config.data);
    
    return config
  },
  (error) => {
    debugLogger.logError(error, 'Request interceptor error');
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    debugLogger.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log all errors for debugging
    debugLogger.logError(error, 'API Response Error');
    
    if (error.response?.status === 401) {
      // Token expired or invalid, clear token but don't redirect automatically
      // Let individual components handle the 401 error gracefully
      localStorage.removeItem('token')
      
      // Only redirect if we're on a protected route
      const protectedRoutes = ['/dashboard', '/admin']
      if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Request interceptor for additional processing (no logging)
api.interceptors.request.use(
  (config) => {
    // No logging to prevent exposing API endpoints
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Domain-related API calls
export const domainAPI = {
  // Check domain availability
  checkAvailability: async (domain) => {
    const response = await api.get(`/domains/check?domain=${encodeURIComponent(domain)}`)
    return response.data
  },

  // Get domain suggestions
  getSuggestions: async (query, limit = 10) => {
    const response = await api.get(`/domains/suggest?query=${encodeURIComponent(query)}&limit=${limit}`)
    return response.data
  },

  // Get domain estimation
  getEstimation: async (domain) => {
    const response = await api.post('/domains/estimate', { domain })
    return response.data
  },

  // Generate domain combinations
  generateCombinations: async (data) => {
    const response = await api.post('/domains/combine', data)
    return response.data
  },

  // Get public suggested domains
  getPublicSuggestions: async (limit = 6) => {
    const response = await api.get(`/domains/suggestions?limit=${limit}`)
    return response.data
  },

  // Get recent domain checks (for display purposes)
  getRecentChecks: async () => {
    // This is just for display - real data comes from userAPI.getChecks()
    return []
  }
}

// User-related API calls
export const userAPI = {
  // Get user's domain check history
  getCheckHistory: async (limit = 20, offset = 0) => {
    const response = await api.get(`/user/checks?limit=${limit}&offset=${offset}`)
    return response.data
  },

  // Get user's recent checks (alias for getCheckHistory)
  getChecks: async (limit = 20, offset = 0) => {
    return userAPI.getCheckHistory(limit, offset)
  },

  // Record a domain check
  recordCheck: async (checkData) => {
    const response = await api.post('/user/checks', checkData)
    return response.data
  },

  // Get user's favorites
  getFavorites: async () => {
    const response = await api.get('/user/favorites')
    return response.data
  },

  // Add domain to favorites
  addFavorite: async (domain) => {
    const response = await api.post('/user/favorites', { domain })
    return response.data
  },

  // Remove domain from favorites
  removeFavorite: async (id) => {
    const response = await api.delete(`/user/favorites/${id}`)
    return response.data
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile')
    return response.data
  },

  // Update user profile
  updateProfile: async (updates) => {
    const response = await api.put('/user/profile', updates)
    return response.data
  }
}

// Admin-related API calls
export const adminAPI = {
  // Upload CSV file
  uploadCSV: async (file) => {
    const formData = new FormData()
    formData.append('csv', file)
    
    const response = await api.post('/admin/suggestions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Upload CSV file with progress tracking
  uploadCSVWithProgress: async (file, onProgress) => {
    const formData = new FormData()
    formData.append('csv', file)
    
    // Simulate progress for now (since streaming is complex in browser)
    if (onProgress) {
      onProgress({
        type: 'progress',
        message: 'Uploading CSV file...',
        progress: 0,
        total: 20
      });
      
      setTimeout(() => {
        onProgress({
          type: 'progress',
          message: 'Fast CSV processing...',
          progress: 5,
          total: 20
        });
      }, 500);
      
      setTimeout(() => {
        onProgress({
          type: 'progress',
          message: 'Randomly selecting 20 domains...',
          progress: 10,
          total: 20
        });
      }, 1000);
      
      setTimeout(() => {
        onProgress({
          type: 'progress',
          message: 'Checking GoDaddy API (fast mode)...',
          progress: 15,
          total: 20
        });
      }, 1500);
      
      setTimeout(() => {
        onProgress({
          type: 'progress',
          message: 'Saving to database...',
          progress: 20,
          total: 20
        });
      }, 2000);
    }
    
    const response = await api.post('/admin/suggestions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    if (onProgress) {
      onProgress({
        type: 'complete',
        message: 'Upload complete!',
        progress: 20,
        total: 20
      });
    }
    
    return response.data
  },

  // Get all suggested domains
  getAllSuggestions: async (page = 1, limit = 50, search = '', sortBy = 'score', sortOrder = 'DESC') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      sortBy,
      sortOrder
    })
    
    const response = await api.get(`/admin/suggestions?${params}`)
    return response.data
  },

  // Get suggestions (alias for getAllSuggestions)
  getSuggestions: async (page = 1, limit = 50, search = '', sortBy = 'score', sortOrder = 'DESC') => {
    return adminAPI.getAllSuggestions(page, limit, search, sortBy, sortOrder)
  },

  // Create new suggestion
  createSuggestion: async (suggestionData) => {
    const response = await api.post('/admin/suggestions', suggestionData)
    return response.data
  },

  // Update suggested domain
  updateSuggestion: async (id, updates) => {
    const response = await api.put(`/admin/suggestions/${id}`, updates)
    return response.data
  },

  // Delete suggested domain
  deleteSuggestion: async (id) => {
    const response = await api.delete(`/admin/suggestions/${id}`)
    return response.data
  },

  // Upload suggestions CSV (alias for uploadCSV)
  uploadSuggestions: async (formData) => {
    return adminAPI.uploadCSV(formData.get('csv'))
  },

  // Get admin dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  // Get dashboard (alias for getDashboardStats)
  getDashboard: async () => {
    return adminAPI.getDashboardStats()
  },

  // Get all users
  getAllUsers: async (page = 1, limit = 50, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search
    })
    
    const response = await api.get(`/admin/users?${params}`)
    return response.data
  },

  // Get users (alias for getAllUsers)
  getUsers: async (page = 1, limit = 50, search = '') => {
    return adminAPI.getAllUsers(page, limit, search)
  },

  // Update user
  updateUser: async (id, updates) => {
    const response = await api.put(`/admin/users/${id}`, updates)
    return response.data
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },

  // Toggle user status (activate/suspend)
  toggleUserStatus: async (id, status) => {
    const response = await api.patch(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Bulk user operations
  bulkUserOperation: async (action, userIds, data = {}) => {
    const response = await api.post('/admin/users/bulk', {
      action,
      userIds,
      data
    });
    return response.data;
  },

  // Get user activity logs
  getUserActivity: async (id, page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await api.get(`/admin/users/${id}/activity?${params.toString()}`);
    return response.data;
  },

  // Get website configuration
  getWebsiteConfig: async () => {
    const response = await api.get('/admin/website-config');
    return response.data;
  },

  // Save website configuration
  saveWebsiteConfig: async (configData) => {
    const response = await api.post('/admin/website-config', configData);
    return response.data;
  },

  // Get SEO settings
  getSeoSettings: async () => {
    const response = await api.get('/admin/seo-settings');
    return response.data;
  },

  // Save SEO settings
  saveSeoSettings: async (settingsData) => {
    const response = await api.post('/admin/seo-settings', settingsData);
    return response.data;
  }
}

// Auth-related API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  }
}

export default api

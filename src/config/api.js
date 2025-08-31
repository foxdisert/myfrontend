// API Configuration
export const API_CONFIG = {
  // Backend URL - Update this when deploying to different environments
  BASE_URL: 'https://my-backend-r7gr.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile'
    },
    DOMAINS: {
      CHECK: '/api/domains/check',
      SUGGEST: '/api/domains/suggest',
      ESTIMATE: '/api/domains/estimate',
      COMBINE: '/api/domains/combine',
      SUGGESTIONS: '/api/domains/suggestions'
    },
    USER: {
      CHECKS: '/api/user/checks',
      FAVORITES: '/api/user/favorites'
    },
    ADMIN: {
      SUGGESTIONS: '/api/admin/suggestions',
      DASHBOARD: '/api/admin/dashboard',
      USERS: '/api/admin/users'
    },
    SEO: {
      META_TAGS: '/api/seo/meta-tags'
    }
  },
  
  // Timeout settings
  TIMEOUT: {
    DEFAULT: 30000, // 30 seconds
    UPLOAD: 300000, // 5 minutes for large CSV uploads
    DOMAIN_CHECK: 60000 // 1 minute for domain checks
  },
  
  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 15 * 60 * 1000 // 15 minutes
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get API endpoint
export const getEndpoint = (category, action) => {
  return API_CONFIG.ENDPOINTS[category]?.[action];
};

// Environment check
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// Log current configuration (development only)
if (isDevelopment()) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}

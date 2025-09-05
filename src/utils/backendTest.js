// Backend connection test utility
import { API_CONFIG } from '../config/api';

/**
 * Test backend connection
 * @returns {Promise<{success: boolean, message: string, details?: any}>}
 */
export const testBackendConnection = async () => {
  try {
    const startTime = Date.now();
    
    // Test health endpoint
    const healthResponse = await fetch(`${API_CONFIG.BASE_URL}/health`);
    const healthData = await healthResponse.json();
    
    const responseTime = Date.now() - startTime;
    
    if (healthResponse.ok) {
      return {
        success: true,
        message: '✅ Backend connection successful',
        details: {
          status: healthResponse.status,
          responseTime: `${responseTime}ms`,
          data: healthData,
          url: `${API_CONFIG.BASE_URL}/health`
        }
      };
    } else {
      return {
        success: false,
        message: `❌ Backend health check failed: ${healthResponse.status}`,
        details: {
          status: healthResponse.status,
          statusText: healthResponse.statusText,
          url: `${API_CONFIG.BASE_URL}/health`
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `❌ Backend connection failed: ${error.message}`,
      details: {
        error: error.message,
        url: API_CONFIG.BASE_URL,
        timestamp: new Date().toISOString()
      }
    };
  }
};

/**
 * Test specific API endpoint
 * @param {string} endpoint - API endpoint to test
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} body - Request body for POST/PUT requests
 * @returns {Promise<{success: boolean, message: string, details?: any}>}
 */
export const testApiEndpoint = async (endpoint, method = 'GET', body = null, token = null) => {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const startTime = Date.now();
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // Add authorization header if token provided
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const responseTime = Date.now() - startTime;
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = 'Unable to parse response';
    }
    
    if (response.ok) {
      return {
        success: true,
        message: `✅ ${method} ${endpoint} successful`,
        details: {
          status: response.status,
          responseTime: `${responseTime}ms`,
          data: responseData,
          url
        }
      };
    } else {
      return {
        success: false,
        message: `❌ ${method} ${endpoint} failed: ${response.status}`,
        details: {
          status: response.status,
          statusText: response.statusText,
          responseTime: `${responseTime}ms`,
          data: responseData,
          url
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `❌ ${method} ${endpoint} error: ${error.message}`,
      details: {
        error: error.message,
        url: `${API_CONFIG.BASE_URL}${endpoint}`,
        timestamp: new Date().toISOString()
      }
    };
  }
};

/**
 * Run comprehensive backend tests
 * @returns {Promise<Array>} Array of test results
 */
export const runBackendTests = async () => {
  const tests = [
    { name: 'Health Check', test: () => testBackendConnection() },
    { name: 'Auth Login Endpoint', test: () => testApiEndpoint('/api/auth/login', 'POST', { email: 'test@example.com', password: 'test123' }) },
    { name: 'Domains Suggestions', test: () => testApiEndpoint('/api/domains/suggestions?limit=1') },
    { name: 'SEO Meta Tags', test: () => testApiEndpoint('/api/seo/meta-tags') }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const result = await test.test();
      results.push({
        name: test.name,
        ...result
      });
    } catch (error) {
      results.push({
        name: test.name,
        success: false,
        message: `❌ Test failed: ${error.message}`,
        details: { error: error.message }
      });
    }
  }
  
  return results;
};

// Export for use in components
export default {
  testBackendConnection,
  testApiEndpoint,
  runBackendTests
};

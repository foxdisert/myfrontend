// Authentication utility functions

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get authentication token
 * @returns {string|null} The stored token or null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set authentication token
 * @param {string} token - The authentication token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if token is expired (basic check)
 * @returns {boolean} True if token appears to be expired
 */
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;
  
  try {
    // Basic JWT expiration check (if using JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp) {
      return Date.now() >= payload.exp * 1000;
    }
  } catch (error) {
    // If we can't parse the token, assume it's expired
    return true;
  }
  
  return false;
};

/**
 * Handle authentication errors gracefully
 * @param {Error} error - The error object
 * @param {Function} onAuthError - Callback for auth errors
 * @param {Function} onOtherError - Callback for other errors
 */
export const handleAuthError = (error, onAuthError, onOtherError) => {
  if (error.response?.status === 401) {
    // Authentication error
    removeToken();
    if (onAuthError) {
      onAuthError(error);
    }
  } else {
    // Other error
    if (onOtherError) {
      onOtherError(error);
    }
  }
};

/**
 * Redirect to login if not authenticated
 * @param {string} redirectUrl - URL to redirect to after login
 */
export const redirectToLogin = (redirectUrl = '/dashboard') => {
  localStorage.setItem('redirectAfterLogin', redirectUrl);
  window.location.href = '/login';
};

/**
 * Get redirect URL after login
 * @returns {string} The stored redirect URL or default
 */
export const getRedirectAfterLogin = () => {
  return localStorage.getItem('redirectAfterLogin') || '/dashboard';
};

/**
 * Clear redirect URL after login
 */
export const clearRedirectAfterLogin = () => {
  localStorage.removeItem('redirectAfterLogin');
};

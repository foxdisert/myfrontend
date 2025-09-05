// Debug logger to track down 404 errors
import { API_CONFIG } from '../config/api';

class DebugLogger {
  constructor() {
    this.logs = [];
    this.isEnabled = process.env.NODE_ENV === 'development' || true; // Always enable for debugging
  }

  log(message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.logs.push(logEntry);

    if (this.isEnabled) {
      console.log(`🔍 [DEBUG] ${message}`, data || '');
    }
  }

  logApiCall(method, url, data = null) {
    this.log(`API Call: ${method} ${url}`, {
      method,
      url,
      fullUrl: url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`,
      data,
      timestamp: new Date().toISOString()
    });
  }

  logError(error, context = '') {
    this.log(`Error: ${error.message}`, {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      },
      context,
      url: window.location.href
    });
  }

  logNavigation(from, to) {
    this.log(`Navigation: ${from} → ${to}`, {
      from,
      to,
      timestamp: new Date().toISOString()
    });
  }

  logPageLoad() {
    this.log(`Page Load: ${window.location.href}`, {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      referrer: document.referrer
    });
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Create global instance
const debugLogger = new DebugLogger();

// Log page loads automatically
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    debugLogger.logPageLoad();
  });

  // Log navigation changes
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      debugLogger.logNavigation(currentPath, window.location.pathname);
      currentPath = window.location.pathname;
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export default debugLogger;

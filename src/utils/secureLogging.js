// Sensitive data patterns to detect and sanitize
const sensitivePatterns = [
  /password/i,
  /token/i,
  /api[_-]?key/i,
  /secret/i,
  /authorization/i,
  /cookie/i,
  /session/i,
  /private/i,
  /confidential/i,
  /sensitive/i,
  /personal/i,
  /credit[_-]?card/i,
  /ssn/i,
  /phone/i,
  /address/i,
  /email/i
];

// Sensitive field names
const sensitiveFields = [
  'password',
  'token',
  'api_key',
  'secret',
  'authorization',
  'cookie',
  'session',
  'private',
  'confidential',
  'sensitive',
  'personal',
  'credit_card',
  'ssn',
  'phone',
  'address',
  'email'
];

// Sanitize object recursively
const sanitizeObject = (obj, depth = 0) => {
  if (depth > 10) return '[MAX_DEPTH_EXCEEDED]'; // Prevent infinite recursion
  
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'string') {
    // Check if string contains sensitive data patterns
    if (sensitivePatterns.some(pattern => pattern.test(obj))) {
      return '[SENSITIVE_DATA]';
    }
    return obj;
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, depth + 1));
  }
  
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      
      // Check if key contains sensitive field names
      if (sensitiveFields.some(field => lowerKey.includes(field)) ||
          sensitivePatterns.some(pattern => pattern.test(key))) {
        sanitized[key] = '[SENSITIVE_DATA]';
      } else {
        sanitized[key] = sanitizeObject(value, depth + 1);
      }
    }
    return sanitized;
  }
  
  return obj;
};

// Secure console wrapper
export const secureConsole = {
  log: (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    console.log(...sanitizedArgs);
  },
  
  error: (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    console.error(...sanitizedArgs);
  },
  
  warn: (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    console.warn(...sanitizedArgs);
  },
  
  info: (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    console.info(...sanitizedArgs);
  },
  
  // Special method for API responses
  apiResponse: (method, url, response) => {
    const sanitizedResponse = sanitizeObject(response);
    console.log(`🌐 ${method} ${url} - Response:`, sanitizedResponse);
  },
  
  // Special method for API errors
  apiError: (method, url, error) => {
    const sanitizedError = sanitizeObject(error);
    console.error(`❌ ${method} ${url} - Error:`, sanitizedError);
  }
};

// Override global console in production to prevent sensitive data logging
if (process.env.NODE_ENV === 'production') {
  const originalConsole = { ...console };
  
  console.log = (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    originalConsole.log(...sanitizedArgs);
  };
  
  console.error = (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    originalConsole.error(...sanitizedArgs);
  };
  
  console.warn = (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    originalConsole.warn(...sanitizedArgs);
  };
  
  console.info = (...args) => {
    const sanitizedArgs = args.map(arg => sanitizeObject(arg));
    originalConsole.info(...sanitizedArgs);
  };
}

export default secureConsole;

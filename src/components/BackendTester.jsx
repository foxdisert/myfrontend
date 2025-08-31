import { useState } from 'react';
import { testBackendConnection, testApiEndpoint, runBackendTests } from '../utils/backendTest';

const BackendTester = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const runSingleTest = async (testName, testFunction) => {
    setIsLoading(true);
    try {
      const result = await testFunction();
      setTestResults(prev => [...prev, { name: testName, ...result, timestamp: new Date().toISOString() }]);
    } catch (error) {
      setTestResults(prev => [...prev, { 
        name: testName, 
        success: false, 
        message: `❌ Test failed: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    try {
      const results = await runBackendTests();
      setTestResults(results.map(result => ({ ...result, timestamp: new Date().toISOString() })));
    } catch (error) {
      setTestResults([{ 
        name: 'All Tests', 
        success: false, 
        message: `❌ Tests failed: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Backend Connection Tester</h2>
      
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => runSingleTest('Health Check', testBackendConnection)}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Test Health Endpoint
          </button>
          
          <button
            onClick={() => runSingleTest('Auth Login', () => testApiEndpoint('/api/auth/login', 'POST', { email: 'test@example.com', password: 'test123' }))}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            Test Login Endpoint
          </button>
          
          <button
            onClick={() => runSingleTest('Domains Suggestions', () => testApiEndpoint('/api/domains/suggestions?limit=1'))}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            Test Domains API
          </button>
          
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
          >
            Run All Tests
          </button>
          
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Running tests...</p>
        </div>
      )}

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Test Results:</h3>
          {testResults.map((result, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.name}
                  </h4>
                  <p className={`text-sm ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                  {result.details && (
                    <div className="mt-2 text-xs text-gray-600">
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 What This Tests:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Health Check:</strong> Basic backend connectivity</li>
          <li>• <strong>Auth Login:</strong> Login endpoint availability and response</li>
          <li>• <strong>Domains API:</strong> Public API endpoints</li>
          <li>• <strong>All Tests:</strong> Comprehensive backend check</li>
        </ul>
      </div>
    </div>
  );
};

export default BackendTester;

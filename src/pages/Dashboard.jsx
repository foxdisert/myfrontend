import { useState, useEffect } from 'react';

import { 
  Search, 
  Heart, 
  Clock, 
  User, 
  Settings, 
  ExternalLink, 
  Trash2, 
  Eye,
  TrendingUp,
  Calendar,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import { secureConsole } from '../utils/secureLogging';
import { isAuthenticated as checkAuth } from '../utils/auth';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [recentChecks, setRecentChecks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Sample data for demonstration
  const sampleChecks = [
    {
      id: 1,
      domain: 'example.com',
      status: 'available',
      price: 12.99,
      currency: 'USD',
      period: 1,
      checked_at: new Date().toISOString()
    },
    {
      id: 2,
      domain: 'test.net',
      status: 'taken',
      price: null,
      currency: null,
      period: null,
      checked_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const sampleFavorites = [
    {
      id: 1,
      domain: 'awesome.io',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      domain: 'cool.tech',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  useEffect(() => {
    // Check authentication status
    if (checkAuth() && user) {
      setIsAuthenticated(true);
      fetchUserData();
    } else {
      setIsAuthenticated(false);
      // Use sample data for unauthenticated users
      setRecentChecks(sampleChecks);
      setFavorites(sampleFavorites);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      secureConsole.log('Fetching user data...');
      
      // Check if user is authenticated before making API calls
      if (!checkAuth() || !user) {
        secureConsole.log('User not authenticated, using sample data');
        setRecentChecks(sampleChecks);
        setFavorites(sampleFavorites);
        return;
      }
      
      const [checksResponse, favoritesResponse] = await Promise.all([
        userAPI.getChecks(),
        userAPI.getFavorites()
      ]);
      
      secureConsole.log('User data fetched successfully');
      
      // Use real data if available, otherwise use sample data
      const checks = checksResponse?.data || checksResponse || [];
      const favorites = favoritesResponse?.data || favoritesResponse || [];
      
      setRecentChecks(checks.length > 0 ? checks : sampleChecks);
      setFavorites(favorites.length > 0 ? favorites : sampleFavorites);
    } catch (error) {
      // Handle 401 errors gracefully (user not authenticated)
      if (error.response?.status === 401) {
        secureConsole.log('User not authenticated, using sample data');
        setRecentChecks(sampleChecks);
        setFavorites(sampleFavorites);
      } else {
        secureConsole.error('Error fetching user data:', error);
        // Use sample data on error to prevent crashes
        setRecentChecks(sampleChecks);
        setFavorites(sampleFavorites);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setEditingProfile(false);
    } catch (error) {
      secureConsole.error('Error updating profile:', error);
    }
  };

  const removeFavorite = async (domainId) => {
    try {
      await userAPI.removeFavorite(domainId);
      setFavorites(favorites.filter(fav => fav.id !== domainId));
    } catch (error) {
      secureConsole.error('Error removing favorite:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'taken':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'taken':
        return 'Taken';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
            
            {/* Authentication Status */}
            {!isAuthenticated && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Demo Mode
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>You're viewing sample data. <a href="/login" className="font-medium underline hover:text-yellow-600">Log in</a> to see your real data.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Checks</p>
                  <p className="text-2xl font-bold text-gray-900">{recentChecks.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Found</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {recentChecks.filter(check => check.status === 'available').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Data Notice */}
          {(recentChecks === sampleChecks || favorites === sampleFavorites) && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-800">
                <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
                <span className="text-sm">
                  Showing sample data. Start checking domains and adding favorites to see your real data here!
                </span>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('checks')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'checks'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Recent Checks
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'favorites'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentChecks.slice(0, 5).map((check) => (
                        <div key={check.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{check.domain}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                              {getStatusText(check.status)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(check.checked_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                        <Search className="h-6 w-6 text-blue-600 mb-2" />
                        <h4 className="font-medium text-gray-900">Check New Domain</h4>
                        <p className="text-sm text-gray-600">Search for domain availability</p>
                      </button>
                      <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                        <Heart className="h-6 w-6 text-red-500 mb-2" />
                        <h4 className="font-medium text-gray-900">View Favorites</h4>
                        <p className="text-sm text-gray-600">See your saved domains</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Checks Tab */}
              {activeTab === 'checks' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Domain Checks</h3>
                  {recentChecks.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Checked
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentChecks.map((check) => (
                            <tr key={check.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{check.domain}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                                  {getStatusText(check.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {check.price ? `$${(() => {
                                  const price = check.price;
                                  if (price > 1000) return (price / 10000).toFixed(2);
                                  return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
                                })()}` : 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(check.checked_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => window.open(`https://godaddy.com/domainsearch/find?domainToCheck=${check.domain}`, '_blank')}
                                  className="text-primary hover:text-primary-dark mr-3"
                                  title="Check availability"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => window.open(`https://whois.com/whois/${check.domain}`, '_blank')}
                                  className="text-gray-400 hover:text-gray-600"
                                  title="View WHOIS info"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No domain checks yet. Start by checking a domain!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Favorite Domains</h3>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite) => (
                        <div key={favorite.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-gray-900 break-all">{favorite.domain}</h4>
                            <button
                              onClick={() => removeFavorite(favorite.id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Remove from favorites"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="space-y-2 mb-4">
                            {favorite.notes && (
                              <p className="text-sm text-gray-600">{favorite.notes}</p>
                            )}
                            <p className="text-xs text-gray-500">
                              Added: {new Date(favorite.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.open(`https://godaddy.com/domainsearch/find?domainToCheck=${favorite.domain}`, '_blank')}
                              className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200"
                            >
                              Check Availability
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No favorite domains yet. Start saving domains you like!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                    <button
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200"
                    >
                      {editingProfile ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  {editingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900">{user?.name || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <p className="text-gray-900">{user?.email || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                        <p className="text-gray-900">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

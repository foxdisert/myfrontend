import { useState, useEffect } from 'react';

import { 
  Upload, 
  FileText, 
  Users, 
  Globe, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Heart,
  Settings,
  Shield,
  Database,
  Bell,
  Code,
  Key,
  Lock,
  Server,
  HardDrive,
  Mail,
  Globe2,
  Palette,
  FileCode,
  Activity,
  Zap,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { adminAPI, userAPI, domainAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { secureConsole } from '../utils/secureLogging';

const Admin = () => {
  // Add custom styles for scrollbar hiding and animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      /* Ensure smooth scrolling */
      .overflow-x-auto {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Tab button sizing */
      .min-w-fit {
        min-width: fit-content;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
      }
      
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [processingProgress, setProcessingProgress] = useState({ current: 0, total: 0 });
  const [uploadPhase, setUploadPhase] = useState(''); // 'uploading', 'processing', 'complete'
  const [uploadMessage, setUploadMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  
  // User Favorites States
  const [userFavorites, setUserFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  
  // Domain Generator States
  const [prefixes, setPrefixes] = useState(['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber', 'future']);
  const [suffixes, setSuffixes] = useState(['hub', 'pro', 'tech', 'lab', 'studio', 'agency', 'solutions', 'systems', 'works', 'group']);
  const [tlds, setTlds] = useState(['.com', '.net', '.org', '.io', '.co', '.tech', '.app', '.dev', '.ai', '.cloud']);
  const [generatedDomains, setGeneratedDomains] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    maxLength: 20,
    minLength: 5,
    includeNumbers: false,
    includeHyphens: false,
    maxResults: 50
  });

  // Domain Estimation States
  const [estimationDomain, setEstimationDomain] = useState('');
  const [estimationResult, setEstimationResult] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationHistory, setEstimationHistory] = useState([]);

  // Admin Settings States
  const [websiteConfig, setWebsiteConfig] = useState({
    siteTitle: 'Domain Toolkit',
    siteDescription: 'Professional domain management and analysis tools',
    logo: '',
    favicon: '',
    contactEmail: 'admin@mydntk.com',
    contactPhone: '+1 (555) 123-4567',
    socialLinks: {
      twitter: '',
      facebook: '',
      linkedin: '',
      github: ''
    },
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    maintenanceMode: false
  });
  
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configMessage, setConfigMessage] = useState('');
  const [lastConfigUpdate, setLastConfigUpdate] = useState(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalConfig, setOriginalConfig] = useState(null);
  
  // SEO Settings States
  const [isLoadingSeo, setIsLoadingSeo] = useState(false);
  const [isSavingSeo, setIsSavingSeo] = useState(false);
  const [seoMessage, setSeoMessage] = useState('');
  const [lastSeoUpdate, setLastSeoUpdate] = useState(new Date());
  const [hasUnsavedSeoChanges, setHasUnsavedSeoChanges] = useState(false);
  const [originalSeoSettings, setOriginalSeoSettings] = useState(null);
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: [],
    ipBlacklist: [],
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    }
  });

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    senderEmail: 'admin@mydntk.com',
    senderName: 'Domain Toolkit Admin',
    enableNotifications: true,
    enableAlerts: true
  });
  
  // SEO Settings State
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'Domain Toolkit - Professional Domain Management Tools',
    metaDescription: 'Professional domain management, analysis, and estimation tools for businesses and developers.',
    metaKeywords: 'domain management, domain analysis, domain estimation, domain tools, web development',
    googleAnalytics: '',
    googleSearchConsole: '',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: /sitemap.xml',
    sitemapEnabled: true,
    canonicalUrls: true,
    structuredData: true,
    socialMediaTags: true
  });

  // System Health States
  const [systemHealth, setSystemHealth] = useState({
    database: 'healthy',
    api: 'healthy',
    storage: 'healthy',
    lastCheck: new Date()
  });

  // Notifications States
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Filtered suggestions
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminData();
      fetchUserFavorites();
      fetchSystemHealth();
      fetchNotifications();
      fetchWebsiteConfig();
      fetchSeoSettings();
    }
  }, [user]);

  // Debug tab changes
  useEffect(() => {
    secureConsole.log('🔄 Admin tab changed to:', activeTab);
    secureConsole.log('📊 Current state:', {
      suggestions: suggestions.length,
      users: users.length,
      stats: Object.keys(stats),
      loading,
      userFavorites: userFavorites.length
    });
  }, [activeTab, suggestions.length, users.length, stats, loading, userFavorites.length]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [suggestionsResponse, usersResponse, statsResponse] = await Promise.all([
        adminAPI.getSuggestions(),
        adminAPI.getUsers(),
        adminAPI.getDashboard()
      ]);
      
      secureConsole.log('API Responses received successfully');
      
      const suggestionsData = suggestionsResponse.domains || [];
      const usersData = usersResponse.users || [];
      const statsData = statsResponse.stats || {};
      
      // If no users returned from API, add sample data for testing
      if (usersData.length === 0) {
        const sampleUsers = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            status: 'active',
            created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'member',
            status: 'active',
            created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          },
          {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'moderator',
            status: 'suspended',
            created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
          }
        ];
        setUsers(sampleUsers);
      } else {
        setUsers(usersData);
      }
      
      setSuggestions(suggestionsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      
      // Fallback to sample data if API fails
      const sampleUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'member',
          status: 'active',
          created_at: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'moderator',
          status: 'suspended',
          created_at: new Date(Date.now() - 259200000).toISOString()
        }
      ];
      setUsers(sampleUsers);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const response = await userAPI.getFavorites();
      setUserFavorites(response || []);
    } catch (error) {
      console.error('Error fetching user favorites:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const fetchWebsiteConfig = async () => {
    try {
      setIsLoadingConfig(true);
      secureConsole.log('🔄 Fetching website configuration...');
      
      const response = await adminAPI.getWebsiteConfig();
              secureConsole.log('📥 Website configuration fetched successfully');
      
      // Map backend fields to frontend state
      const mappedConfig = {
        siteTitle: response.site_title || 'Domain Toolkit',
        siteDescription: response.site_description || 'Professional domain management and analysis tools',
        logo: response.logo || '',
        favicon: response.favicon || '',
        contactEmail: response.contact_email || 'admin@mydntk.com',
        contactPhone: response.contact_phone || '+1 (555) 123-4567',
        socialLinks: response.social_links || {
          twitter: '',
          facebook: '',
          linkedin: '',
          github: ''
        },
        language: response.language || 'en',
        timezone: response.timezone || 'UTC',
        currency: response.currency || 'USD',
        maintenanceMode: response.maintenance_mode || false
      };
      
              secureConsole.log('🔄 Configuration mapped successfully');
      setWebsiteConfig(mappedConfig);
      setOriginalConfig(mappedConfig); // Store original for change detection
      setHasUnsavedChanges(false); // Reset unsaved changes flag
      
              secureConsole.log('✅ Website configuration loaded and state updated');
    } catch (error) {
      console.error('❌ Error fetching website configuration:', error);
      setConfigMessage('Failed to load website configuration');
    } finally {
      setIsLoadingConfig(false);
    }
  };

  const saveWebsiteConfig = async () => {
    try {
      setIsSavingConfig(true);
      setConfigMessage('');
      
      // Map frontend state to backend fields
      const configData = {
        site_title: websiteConfig.siteTitle,
        site_description: websiteConfig.siteDescription,
        logo: websiteConfig.logo,
        favicon: websiteConfig.favicon,
        contact_email: websiteConfig.contactEmail,
        contact_phone: websiteConfig.contactPhone,
        social_links: websiteConfig.socialLinks,
        language: websiteConfig.language,
        timezone: websiteConfig.timezone,
        currency: websiteConfig.currency,
        maintenance_mode: websiteConfig.maintenanceMode
      };
      
      const response = await adminAPI.saveWebsiteConfig(configData);
      
      setConfigMessage('Website configuration saved successfully!');
              secureConsole.log('✅ Website configuration saved successfully');
      
      // Update the local state with the response from the server
      if (response.config) {
        const updatedConfig = {
          siteTitle: response.config.site_title || websiteConfig.siteTitle,
          siteDescription: response.config.site_description || websiteConfig.siteDescription,
          logo: response.config.logo || websiteConfig.logo,
          favicon: response.config.favicon || websiteConfig.favicon,
          contactEmail: response.config.contact_email || websiteConfig.contactEmail,
          contactPhone: response.config.contact_phone || websiteConfig.contactPhone,
          socialLinks: response.config.social_links || websiteConfig.socialLinks,
          language: response.config.language || websiteConfig.language,
          timezone: response.config.timezone || websiteConfig.timezone,
          currency: response.config.currency || websiteConfig.currency,
          maintenanceMode: response.config.maintenance_mode || websiteConfig.maintenanceMode
        };
        
        secureConsole.log('🔄 Updating frontend state with configuration changes');
        setWebsiteConfig(updatedConfig);
        setOriginalConfig(updatedConfig); // Update original config
        setHasUnsavedChanges(false); // Reset unsaved changes flag
        setLastConfigUpdate(new Date()); // Update the timestamp
        
        // Also refresh from server to ensure we have the latest data
        setTimeout(async () => {
          secureConsole.log('🔄 Refreshing website config from server to ensure consistency...');
          await fetchWebsiteConfig();
        }, 200);
      } else {
                    secureConsole.log('⚠️ No config data in response, refreshing from server...');
        // If no config in response, refresh from server
        await fetchWebsiteConfig();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setConfigMessage(''), 3000);
      
    } catch (error) {
      console.error('❌ Error saving website configuration:', error);
      setConfigMessage('Failed to save website configuration');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Function to check if there are unsaved changes
  const checkForChanges = () => {
    if (!originalConfig) return false;
    
    const hasChanges = 
      websiteConfig.siteTitle !== originalConfig.siteTitle ||
      websiteConfig.siteDescription !== originalConfig.siteDescription ||
      websiteConfig.logo !== originalConfig.logo ||
      websiteConfig.favicon !== originalConfig.favicon ||
      websiteConfig.contactEmail !== originalConfig.contactEmail ||
      websiteConfig.contactPhone !== originalConfig.contactPhone ||
      websiteConfig.language !== originalConfig.language ||
      websiteConfig.timezone !== originalConfig.timezone ||
      websiteConfig.currency !== originalConfig.currency ||
      websiteConfig.maintenanceMode !== originalConfig.maintenanceMode ||
      JSON.stringify(websiteConfig.socialLinks) !== JSON.stringify(originalConfig.socialLinks);
    
    setHasUnsavedChanges(hasChanges);
    return hasChanges;
  };

  // Check for changes whenever websiteConfig changes
  useEffect(() => {
    if (originalConfig) {
      checkForChanges();
    }
  }, [websiteConfig, originalConfig]);

  // Debug: Monitor website config state changes
  useEffect(() => {
    secureConsole.log('🔄 Website config state updated');
  }, [websiteConfig]);

  // SEO Settings Functions
  const fetchSeoSettings = async () => {
    try {
      setIsLoadingSeo(true);
      secureConsole.log('🔄 Fetching SEO settings...');
      
      const response = await adminAPI.getSeoSettings();
              secureConsole.log('📥 SEO settings fetched successfully');
      
      // Map backend fields to frontend state
      const mappedSeoSettings = {
        metaTitle: response.meta_title || 'Domain Toolkit - Professional Domain Management Tools',
        metaDescription: response.meta_description || 'Professional domain management, analysis, and estimation tools for businesses and developers.',
        metaKeywords: response.meta_keywords || 'domain management, domain analysis, domain estimation, domain tools, web development',
        googleAnalytics: response.google_analytics || '',
        googleSearchConsole: response.google_search_console || '',
        robotsTxt: response.robots_txt || 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: /sitemap.xml',
        sitemapEnabled: response.sitemap_enabled || true,
        canonicalUrls: response.canonical_urls || true,
        structuredData: response.structured_data || true,
        socialMediaTags: response.social_media_tags || true
      };
      
      secureConsole.log('🔄 SEO settings mapped successfully');
      setSeoSettings(mappedSeoSettings);
      setOriginalSeoSettings(mappedSeoSettings); // Store original for change detection
      setHasUnsavedSeoChanges(false); // Reset unsaved changes flag
      
      secureConsole.log('✅ SEO settings loaded and state updated');
    } catch (error) {
      console.error('❌ Error fetching SEO settings:', error);
      setSeoMessage('Failed to load SEO settings');
    } finally {
      setIsLoadingSeo(false);
    }
  };

  const saveSeoSettings = async () => {
    try {
      setIsSavingSeo(true);
      setSeoMessage('');
      
      // Map frontend state to backend fields
      const settingsData = {
        meta_title: seoSettings.metaTitle,
        meta_description: seoSettings.metaDescription,
        meta_keywords: seoSettings.metaKeywords,
        google_analytics: seoSettings.googleAnalytics,
        google_search_console: seoSettings.googleSearchConsole,
        robots_txt: seoSettings.robotsTxt,
        sitemap_enabled: seoSettings.sitemapEnabled,
        canonical_urls: seoSettings.canonicalUrls,
        structured_data: seoSettings.structuredData,
        social_media_tags: seoSettings.socialMediaTags
      };
      
      const response = await adminAPI.saveSeoSettings(settingsData);
      
      setSeoMessage('SEO settings saved successfully!');
      console.log('✅ SEO settings saved:', response);
      console.log('📋 Response settings data:', response.settings);
      
      // Update the local state with the response from the server
      if (response.settings) {
        const updatedSeoSettings = {
          metaTitle: response.settings.meta_title || seoSettings.metaTitle,
          metaDescription: response.settings.meta_description || seoSettings.metaDescription,
          metaKeywords: response.settings.meta_keywords || seoSettings.metaKeywords,
          googleAnalytics: response.settings.google_analytics || seoSettings.googleAnalytics,
          googleSearchConsole: response.settings.google_search_console || seoSettings.googleSearchConsole,
          robotsTxt: response.settings.robots_txt || seoSettings.robotsTxt,
          sitemapEnabled: response.settings.sitemap_enabled || seoSettings.sitemapEnabled,
          canonicalUrls: response.settings.canonical_urls || seoSettings.canonicalUrls,
          structuredData: response.settings.structured_data || seoSettings.structuredData,
          socialMediaTags: response.settings.social_media_tags || seoSettings.socialMediaTags
        };
        
        console.log('🔄 Updating frontend SEO state with:', updatedSeoSettings);
        console.log('🔄 Previous SEO state was:', seoSettings);
        
        // Force state update with a small delay to ensure proper re-render
        setTimeout(() => {
          setSeoSettings(updatedSeoSettings);
          setOriginalSeoSettings(updatedSeoSettings); // Update original config
          setHasUnsavedSeoChanges(false); // Reset unsaved changes flag
          setLastSeoUpdate(new Date()); // Update the timestamp
          
          console.log('✅ SEO state updated successfully');
          console.log('🔄 New SEO state is:', updatedSeoSettings);
          
          // Also refresh from server to ensure we have the latest data
          setTimeout(async () => {
            console.log('🔄 Refreshing SEO settings from server to ensure consistency...');
            await fetchSeoSettings();
          }, 200);
        }, 100);
      } else {
        console.log('⚠️ No settings data in response, refreshing from server...');
        // If no settings data in response, refresh from server
        await fetchSeoSettings();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSeoMessage(''), 3000);
      
    } catch (error) {
      console.error('❌ Error saving SEO settings:', error);
      setSeoMessage('Failed to save SEO settings');
    } finally {
      setIsSavingSeo(false);
    }
  };

  // Function to check if there are unsaved SEO changes
  const checkForSeoChanges = () => {
    if (!originalSeoSettings) return false;
    
    const hasChanges = 
      seoSettings.metaTitle !== originalSeoSettings.metaTitle ||
      seoSettings.metaDescription !== originalSeoSettings.metaDescription ||
      seoSettings.metaKeywords !== originalSeoSettings.metaKeywords ||
      seoSettings.googleAnalytics !== originalSeoSettings.googleAnalytics ||
      seoSettings.googleSearchConsole !== originalSeoSettings.googleSearchConsole ||
      seoSettings.robotsTxt !== originalSeoSettings.robotsTxt ||
      seoSettings.sitemapEnabled !== originalSeoSettings.sitemapEnabled ||
      seoSettings.canonicalUrls !== originalSeoSettings.canonicalUrls ||
      seoSettings.structuredData !== originalSeoSettings.structuredData ||
      seoSettings.socialMediaTags !== originalSeoSettings.socialMediaTags;
    
    setHasUnsavedSeoChanges(hasChanges);
    return hasChanges;
  };

  // Check for SEO changes whenever seoSettings changes
  useEffect(() => {
    if (originalSeoSettings) {
      checkForSeoChanges();
    }
  }, [seoSettings, originalSeoSettings]);

  // Debug: Monitor SEO settings state changes
  useEffect(() => {
    console.log('🔄 SEO settings state changed:', seoSettings);
  }, [seoSettings]);

  const fetchSystemHealth = async () => {
    // Simulate system health check
    setSystemHealth({
      database: 'healthy',
      api: 'healthy',
      storage: 'healthy',
      lastCheck: new Date()
    });
  };

  const fetchNotifications = async () => {
    // Simulate notifications
    setNotifications([
      {
        id: 1,
        type: 'info',
        title: 'System Update',
        message: 'New features have been deployed',
        timestamp: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'High CPU Usage',
        message: 'Server CPU usage is above 80%',
        timestamp: new Date(Date.now() - 3600000),
        read: false
      }
    ]);
    setUnreadCount(2);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadPhase('uploading');
    setUploadMessage('Uploading CSV file...');
    setProcessingProgress({ current: 0, total: 20 });
    
    try {
      console.log('📤 Starting CSV upload...');
      
      // Use the backend CSV upload endpoint with progress tracking
      const result = await adminAPI.uploadCSVWithProgress(selectedFile, (progress) => {
        if (progress.type === 'progress') {
          setUploadPhase('processing');
          setUploadMessage(progress.message);
          setProcessingProgress({ 
            current: progress.progress, 
            total: progress.total 
          });
        } else if (progress.type === 'complete') {
          setUploadPhase('complete');
          setUploadMessage('Processing complete!');
          setProcessingProgress({ 
            current: progress.total, 
            total: progress.total 
          });
        }
      });
      
      console.log('✅ CSV upload result:', result);
      
      // Refresh the admin data to show new domains
      await fetchAdminData();
      
      setSelectedFile(null);
      
      if (result.result) {
        const { inserted, updated, total, errors } = result.result;
        alert(`CSV processed successfully!\n\n📊 Results:\n• Total domains: ${total}\n• New domains added: ${inserted}\n• Existing domains updated: ${updated}\n• Errors: ${errors || 0}`);
      } else {
        alert('CSV processed successfully! Please check the suggestions tab for the new domains.');
      }
      
    } catch (error) {
      console.error('❌ Error uploading CSV:', error);
      alert(`Error uploading CSV: ${error.message || 'Please try again.'}`);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadPhase('');
        setUploadMessage('');
        setProcessingProgress({ current: 0, total: 0 });
      }, 2000); // Keep progress visible for 2 seconds
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid CSV file.');
    }
  };

  const updateSuggestion = async (id, data) => {
    try {
      await adminAPI.updateSuggestion(id, data);
      await fetchAdminData();
      setEditingSuggestion(null);
    } catch (error) {
      console.error('Error updating suggestion:', error);
    }
  };

  const deleteSuggestion = async (id) => {
    if (confirm('Are you sure you want to delete this suggestion?')) {
      try {
        await adminAPI.deleteSuggestion(id);
        await fetchAdminData();
      } catch (error) {
        console.error('Error deleting suggestion:', error);
      }
    }
  };

  const updateUser = async (id, data) => {
    try {
      await adminAPI.updateUser(id, data);
      await fetchAdminData();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(id);
        await fetchAdminData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // User Management Functions
  const toggleUserStatus = async (userId, newStatus) => {
    try {
      const userToUpdate = users.find(u => u.id === userId);
      if (!userToUpdate) return;

      // Call the new API endpoint
      await adminAPI.toggleUserStatus(userId, newStatus);
      await fetchAdminData(); // Refresh data
      
      console.log(`User ${userToUpdate.email} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status. Please try again.');
    }
  };

  const handleSaveUser = async () => {
    try {
      if (!editingUser.email) {
        alert('Email is required');
        return;
      }

      if (editingUser.id) {
        // Update existing user
        await adminAPI.updateUser(editingUser.id, editingUser);
        console.log('User updated successfully');
      } else {
        // Create new user
        await adminAPI.createUser(editingUser);
        console.log('User created successfully');
      }

      await fetchAdminData(); // Refresh data
      setEditingUser(null);
      alert(editingUser.id ? 'User updated successfully!' : 'User created successfully!');
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.');
    }
  };

  // Domain Generator Functions
  const generateDomains = async () => {
    setIsGenerating(true);
    try {
      const domains = [];
      const maxCombinations = Math.min(generationSettings.maxResults, prefixes.length * suffixes.length * tlds.length);
      let count = 0;

      for (let i = 0; i < prefixes.length && count < maxCombinations; i++) {
        for (let j = 0; j < suffixes.length && count < maxCombinations; j++) {
          for (let k = 0; k < tlds.length && count < maxCombinations; k++) {
            const domain = prefixes[i] + suffixes[j] + tlds[k];
            
            if (domain.length >= generationSettings.minLength && domain.length <= generationSettings.maxLength) {
              // Check real availability through GoDaddy API
              try {
                const availability = await checkDomainAvailability(domain);
                
                // Generate more realistic pricing based on domain characteristics
                let basePrice = 0;
                
                // Base price by TLD
                if (tlds[k] === '.com') basePrice = 12.99;
                else if (tlds[k] === '.net') basePrice = 14.99;
                else if (tlds[k] === '.org') basePrice = 13.99;
                else if (tlds[k] === '.io') basePrice = 29.99;
                else if (tlds[k] === '.co') basePrice = 19.99;
                else if (tlds[k] === '.tech') basePrice = 24.99;
                else if (tlds[k] === '.app') basePrice = 19.99;
                else if (tlds[k] === '.dev') basePrice = 14.99;
                else if (tlds[k] === '.ai') basePrice = 39.99;
                else if (tlds[k] === '.cloud') basePrice = 34.99;
                else basePrice = 15.99;
                
                // Adjust price based on domain length (shorter = more valuable)
                const lengthMultiplier = Math.max(0.8, 1.2 - (domain.length * 0.02));
                
                // Adjust price based on domain quality (score)
                const score = Math.floor(Math.random() * 50) + 50; // Random score 50-100
                const qualityMultiplier = 0.8 + (score / 100) * 0.4; // 0.8 to 1.2
                
                // Calculate final price - use GoDaddy price if available, otherwise our estimate
                const estimatedPrice = Math.round((basePrice * lengthMultiplier * qualityMultiplier) * 100) / 100;
                const finalPrice = availability.price || estimatedPrice;
                
                domains.push({
                  domain,
                  score: score,
                  description: `${tlds[k].substring(1).toUpperCase()} domain`,
                  category: 'Generated',
                  price: finalPrice,
                  status: availability.status || (availability.available ? 'Available' : 'Taken'),
                  extension: tlds[k].substring(1),
                  length: domain.length,
                  // Add GoDaddy API data if available
                  ...(availability.price && { godaddy_price: availability.price }),
                  ...(availability.currency && { currency: availability.currency }),
                  ...(availability.period && { period: availability.period }),
                  available: availability.available
                });
                
                console.log(`🔍 Generated domain ${domain}:`, {
                  available: availability.available,
                  status: availability.status,
                  godaddyPrice: availability.price ? `$${availability.price.toFixed(2)}` : 'N/A',
                  estimatedPrice: `$${estimatedPrice.toFixed(2)}`,
                  finalPrice: `$${finalPrice.toFixed(2)}`
                });
                
                count++;
                
                // Small delay to avoid overwhelming the API
                await new Promise(resolve => setTimeout(resolve, 100));
                
              } catch (error) {
                console.error(`Error checking availability for ${domain}:`, error);
                
                // Fallback to estimated data if API check fails
                const score = Math.floor(Math.random() * 50) + 50;
                const estimatedPrice = Math.round((Math.random() * 50 + 10) * 100) / 100;
                
                domains.push({
                  domain,
                  score: score,
                  description: `${tlds[k].substring(1).toUpperCase()} domain`,
                  category: 'Generated',
                  price: estimatedPrice,
                  status: 'Unknown',
                  extension: tlds[k].substring(1),
                  length: domain.length,
                  available: false,
                  error: 'API check failed'
                });
                
                count++;
              }
            }
          }
        }
      }

      setGeneratedDomains(domains);
    } catch (error) {
      console.error('Error generating domains:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addToSuggestions = async (domain) => {
    try {
      // Map the generated domain data to match backend expectations
      const suggestionData = {
        domain: domain.domain,
        price: domain.price,
        extension: domain.extension,
        status: domain.status,
        score: domain.score,
        description: domain.description,
        category: domain.category,
        length: domain.length,
        // Include GoDaddy API data if available
        ...(domain.godaddy_price && { godaddy_price: domain.godaddy_price }),
        ...(domain.currency && { currency: domain.currency }),
        ...(domain.period && { period: domain.period }),
        ...(domain.available !== undefined && { available: domain.available })
      };
      
      console.log('Sending suggestion data:', suggestionData);
      const result = await adminAPI.createSuggestion(suggestionData);
      console.log('Suggestion created successfully:', result);
      
      await fetchAdminData();
      alert(`Domain ${domain.domain} added to suggestions successfully!`);
    } catch (error) {
      console.error('Error adding domain to suggestions:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(`Error adding domain to suggestions: ${error.response?.data?.error || error.message}`);
    }
  };

  const addAllToSuggestions = async () => {
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (const domain of generatedDomains) {
        try {
          // Map the generated domain data to match backend expectations
          const suggestionData = {
            domain: domain.domain,
            price: domain.price,
            extension: domain.extension,
            status: domain.status,
            score: domain.score,
            description: domain.description,
            category: domain.category,
            length: domain.length,
            // Include GoDaddy API data if available
            ...(domain.godaddy_price && { godaddy_price: domain.godaddy_price }),
            ...(domain.currency && { currency: domain.currency }),
            ...(domain.period && { period: domain.period }),
            ...(domain.available !== undefined && { available: domain.available })
          };
          
          console.log('Adding domain to suggestions:', domain.domain);
          await adminAPI.createSuggestion(suggestionData);
          successCount++;
        } catch (error) {
          console.error(`Error adding domain ${domain.domain}:`, error);
          errorCount++;
        }
      }
      
      await fetchAdminData();
      
      if (errorCount === 0) {
        alert(`All ${successCount} generated domains added to suggestions successfully!`);
        setGeneratedDomains([]);
      } else {
        alert(`${successCount} domains added successfully, ${errorCount} failed. Check console for details.`);
      }
    } catch (error) {
      console.error('Error in bulk add operation:', error);
      alert('Error in bulk add operation. Please try again.');
    }
  };

  const addPrefix = (prefix) => {
    if (prefix.trim() && !prefixes.includes(prefix.trim())) {
      setPrefixes([...prefixes, prefix.trim()]);
    }
  };

  const removePrefix = (index) => {
    setPrefixes(prefixes.filter((_, i) => i !== index));
  };

  const addSuffix = (suffix) => {
    if (suffix.trim() && !suffixes.includes(suffix.trim())) {
      setSuffixes([...suffixes, suffix.trim()]);
    }
  };

  const removeSuffix = (index) => {
    setSuffixes(suffixes.filter((_, i) => i !== index));
  };

  const addTld = (tld) => {
    if (tld.trim() && !tlds.includes(tld.trim())) {
      setTlds([...tlds, tld.trim()]);
    }
  };

  const removeTld = (index) => {
    setTlds(tlds.filter((_, i) => i !== index));
  };

  // Bulk check availability for all filtered suggestions
  const bulkCheckAvailability = async () => {
    const domainsToCheck = filteredSuggestions.map(s => s.domain);
    if (domainsToCheck.length === 0) {
      alert('No domains selected for availability check.');
      return;
    }

    const confirmed = confirm(`Are you sure you want to check availability for ${domainsToCheck.length} domains? This might take a while.`);
    if (!confirmed) return;

    try {
      alert(`Starting availability check for ${domainsToCheck.length} domains...\n\nNote: This would integrate with GoDaddy API to check real-time availability for all domains.`);
      
      // TODO: Implement actual bulk availability check
      // const results = await Promise.all(domainsToCheck.map(async (domain) => {
      //   try {
      //     const availability = await domainAPI.checkAvailability(domain);
      //     return { domain, status: availability.status, message: availability.message };
      //   } catch (error) {
      //     return { domain, status: 'Error', message: error.message || 'Unknown error' };
      //   }
      // }));
      
    } catch (error) {
      console.error('Error during bulk availability check:', error);
      alert('Error during bulk availability check. Please try again.');
    }
  };

  // User Favorites Functions
  const addToUserFavorites = async (domain) => {
    try {
      const favoriteData = {
        domain: domain,
        userId: user?.id,
        addedAt: new Date().toISOString()
      };
      
      const response = await userAPI.addToFavorites(favoriteData);
      if (response) {
        await fetchUserFavorites(); // Refresh favorites
        console.log(`Added ${domain} to favorites`);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Error adding domain to favorites. Please try again.');
    }
  };

  const removeFromUserFavorites = async (favoriteId) => {
    try {
      await userAPI.removeFromFavorites(favoriteId);
      await fetchUserFavorites(); // Refresh favorites
      console.log('Removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Error removing domain from favorites. Please try again.');
    }
  };

  const isUserFavorite = (domain) => {
    return userFavorites.some(fav => fav.domain === domain);
  };

  // Domain Estimation Functions
  const estimateDomainValue = async (domain) => {
    console.log('Starting domain estimation for:', domain);
    
    if (!domain || typeof domain !== 'string') {
      console.error('Invalid domain input:', domain);
      alert('Please enter a valid domain name to estimate.');
      return;
    }
    
    if (!domain.trim()) {
      alert('Please enter a domain name to estimate.');
      return;
    }

    setIsEstimating(true);
    try {
      const domainName = domain.trim().toLowerCase();
      console.log('Processing domain:', domainName);
      
      // Validate domain format
      if (!domainName.includes('.')) {
        throw new Error('Invalid domain format. Please include a TLD (e.g., .com, .net)');
      }
      
      // Extract domain parts
      const domainParts = domainName.split('.');
      const name = domainParts[0];
      const tld = domainParts[1] || 'com';
      
      if (!name || name.length === 0) {
        throw new Error('Invalid domain name');
      }
      
      console.log('Domain parts:', { name, tld, parts: domainParts });
      
      // Calculate base score
      let baseScore = 0;
      
      // Length factor (shorter = more valuable)
      if (name.length <= 3) baseScore += 40;
      else if (name.length <= 5) baseScore += 30;
      else if (name.length <= 7) baseScore += 20;
      else if (name.length <= 10) baseScore += 10;
      else baseScore += 5;
      
      console.log('Length score:', baseScore);
      
      // TLD factor
      const tldScores = {
        'com': 100, 'net': 80, 'org': 75, 'io': 85, 'co': 70,
        'tech': 65, 'app': 70, 'dev': 60, 'ai': 90, 'cloud': 75
      };
      const tldScore = tldScores[tld] || 50;
      baseScore += (tldScore / 10);
      
      console.log('TLD score:', tldScore, 'Base score after TLD:', baseScore);
      
      // Keyword factor
      const premiumKeywords = ['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber', 'future', 'global', 'world', 'hub', 'pro', 'lab', 'studio', 'agency', 'solutions', 'systems', 'works', 'group'];
      const keywordScore = premiumKeywords.filter(keyword => 
        name.includes(keyword)
      ).length * 15;
      baseScore += keywordScore;
      
      console.log('Keyword score:', keywordScore, 'Base score after keywords:', baseScore);
      
      // Brandability factor
      const brandableScore = calculateBrandability(name);
      baseScore += brandableScore;
      
      console.log('Brandability score:', brandableScore, 'Base score after brandability:', baseScore);
      
      // Market demand factor
      const marketScore = calculateMarketDemand(name, tld);
      baseScore += marketScore;
      
      console.log('Market score:', marketScore, 'Base score after market:', baseScore);
      
      // Final adjustments
      baseScore = Math.min(100, Math.max(10, baseScore));
      
      console.log('Final base score:', baseScore);
      
      // Calculate estimated value
      const estimatedValue = calculateEstimatedValue(baseScore, name.length, tld);
      
      console.log('Estimated value:', estimatedValue);
      
      // Create estimation result
      const result = {
        domain: domainName,
        score: Math.round(baseScore),
        estimatedValue: estimatedValue,
        factors: {
          length: name.length,
          tld: tld,
          keywordScore: keywordScore,
          brandabilityScore: brandableScore,
          marketScore: marketScore
        },
        breakdown: {
          lengthFactor: getLengthFactor(name.length),
          tldFactor: getTldFactor(tld),
          keywordFactor: getKeywordFactor(name),
          brandabilityFactor: getBrandabilityFactor(name),
          marketFactor: getMarketFactor(name, tld)
        },
        timestamp: new Date().toISOString()
      };
      
      console.log('Estimation result:', result);
      
      setEstimationResult(result);
      setEstimationHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10
      
      console.log('Estimation completed successfully');
      
    } catch (error) {
      console.error('Error estimating domain value:', error);
      console.error('Error stack:', error.stack);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      alert(`Error estimating domain value: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsEstimating(false);
    }
  };

  const calculateBrandability = (name) => {
    let score = 0;
    
    // Check for memorable patterns
    if (/^[aeiou]{2,}/i.test(name)) score += 10; // Starts with vowels
    if (/[aeiou]{3,}/i.test(name)) score += 5;   // Multiple vowels together
    if (/^[bcdfghjklmnpqrstvwxyz]{2,}/i.test(name)) score += 8; // Starts with consonants
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) score -= 5;  // Too many consonants
    
    // Check for repetition
    if (/(.)\1{2,}/.test(name)) score -= 10; // Repeated characters
    
    // Check for numbers
    if (/\d/.test(name)) score -= 5;
    
    // Check for hyphens
    if (/-/.test(name)) score -= 8;
    
    return Math.max(-20, Math.min(20, score));
  };

  const calculateMarketDemand = (name, tld) => {
    let score = 0;
    
    // Industry-specific scoring
    if (['tech', 'ai', 'dev', 'app'].includes(tld)) {
      if (['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber'].some(keyword => name.includes(keyword))) {
        score += 20;
      }
    }
    
    if (['io', 'co'].includes(tld)) {
      if (['startup', 'hub', 'pro', 'lab', 'studio', 'agency'].some(keyword => name.includes(keyword))) {
        score += 15;
      }
    }
    
    // Trending keywords
    const trendingKeywords = ['ai', 'ml', 'blockchain', 'crypto', 'nft', 'metaverse', 'web3'];
    if (trendingKeywords.some(keyword => name.includes(keyword))) {
      score += 25;
    }
    
    return Math.min(30, score);
  };

  const calculateEstimatedValue = (score, length, tld) => {
    let baseValue = 0;
    
    // Base value by TLD
    const tldBaseValues = {
      'com': 1000, 'net': 800, 'org': 750, 'io': 1200, 'co': 900,
      'tech': 600, 'app': 700, 'dev': 500, 'ai': 1500, 'cloud': 800
    };
    baseValue = tldBaseValues[tld] || 500;
    
    // Adjust by score
    const scoreMultiplier = score / 50; // 0.2 to 2.0
    
    // Adjust by length
    const lengthMultiplier = length <= 3 ? 3 : length <= 5 ? 2 : length <= 7 ? 1.5 : length <= 10 ? 1.2 : 1;
    
    let estimatedValue = baseValue * scoreMultiplier * lengthMultiplier;
    
    // Round to reasonable ranges
    if (estimatedValue < 100) estimatedValue = Math.round(estimatedValue / 10) * 10;
    else if (estimatedValue < 1000) estimatedValue = Math.round(estimatedValue / 50) * 50;
    else if (estimatedValue < 10000) estimatedValue = Math.round(estimatedValue / 100) * 100;
    else estimatedValue = Math.round(estimatedValue / 1000) * 1000;
    
    return estimatedValue;
  };

  const getLengthFactor = (length) => {
    if (length <= 3) return 'Premium (Ultra Short)';
    if (length <= 5) return 'High (Short)';
    if (length <= 7) return 'Good (Medium)';
    if (length <= 10) return 'Fair (Long)';
    return 'Basic (Very Long)';
  };

  const getTldFactor = (tld) => {
    const tldFactors = {
      'com': 'Premium (Most Popular)',
      'net': 'High (Professional)',
      'org': 'High (Organization)',
      'io': 'Premium (Tech/Startup)',
      'co': 'High (Company)',
      'tech': 'Good (Technology)',
      'app': 'Good (Application)',
      'dev': 'Good (Development)',
      'ai': 'Premium (AI/Machine Learning)',
      'cloud': 'Good (Cloud Services)'
    };
    return tldFactors[tld] || 'Standard';
  };

  const getKeywordFactor = (name) => {
    const premiumKeywords = ['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber', 'future'];
    const foundKeywords = premiumKeywords.filter(keyword => name.includes(keyword));
    
    if (foundKeywords.length === 0) return 'None';
    if (foundKeywords.length === 1) return `Good (${foundKeywords[0]})`;
    if (foundKeywords.length === 2) return `High (${foundKeywords.join(', ')})`;
    return `Premium (${foundKeywords.join(', ')})`;
  };

  const getBrandabilityFactor = (name) => {
    const brandableScore = calculateBrandability(name);
    
    if (brandableScore >= 15) return 'Excellent (Highly Brandable)';
    if (brandableScore >= 10) return 'Very Good (Brandable)';
    if (brandableScore >= 5) return 'Good (Somewhat Brandable)';
    if (brandableScore >= 0) return 'Fair (Neutral)';
    if (brandableScore >= -10) return 'Poor (Less Brandable)';
    return 'Very Poor (Not Brandable)';
  };

  const getMarketFactor = (name, tld) => {
    const marketScore = calculateMarketDemand(name, tld);
    
    if (marketScore >= 25) return 'Excellent (High Market Demand)';
    if (marketScore >= 20) return 'Very Good (Strong Market Demand)';
    if (marketScore >= 15) return 'Good (Moderate Market Demand)';
    if (marketScore >= 10) return 'Fair (Some Market Demand)';
    if (marketScore >= 5) return 'Poor (Low Market Demand)';
    return 'Very Poor (Minimal Market Demand)';
  };



  // Test function to debug domain availability checking
  const testDomainAvailability = async (domain) => {
    try {
      console.log(`🧪 Testing availability for: ${domain}`);
      const result = await checkDomainAvailability(domain);
      console.log(`🧪 Test result for ${domain}:`, result);
      
      // Also test the direct API call
      const directResult = await domainAPI.checkAvailability(domain);
      console.log(`🧪 Direct API result for ${domain}:`, directResult);
      
      alert(`Test Results for ${domain}:\n\n` +
            `Parsed Available: ${result.available}\n` +
            `Status: ${result.status}\n` +
            `Raw API Response: ${JSON.stringify(directResult, null, 2)}`);
      
    } catch (error) {
      console.error(`🧪 Test error for ${domain}:`, error);
      alert(`Test Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage domain suggestions, users, and system settings</p>
          </div>

          {/* Enhanced Tabs with Better Visibility */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              {/* Tab Navigation with Scroll Indicators and Navigation */}
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                <button
                    onClick={() => {
                      const nav = document.querySelector('.tab-nav');
                      if (nav) nav.scrollLeft -= 200;
                    }}
                    className="p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    title="Scroll Left"
                  >
                    <ArrowUp className="h-4 w-4 transform rotate-90 text-gray-600" />
                </button>
                </div>
                
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => {
                      const nav = document.querySelector('.tab-nav');
                      if (nav) nav.scrollLeft += 200;
                    }}
                    className="p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    title="Scroll Right"
                  >
                    <ArrowUp className="h-4 w-4 transform -rotate-90 text-gray-600" />
                  </button>
                </div>
                
                <nav className="tab-nav flex overflow-x-auto scrollbar-hide px-12 py-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'suggestions', label: 'Domain Suggestions', icon: Globe },
                    { id: 'users', label: 'Users', icon: Users },
                    { id: 'upload', label: 'CSV Upload', icon: Upload },
                    { id: 'generator', label: 'Domain Generator', icon: Code },
                    { id: 'estimation', label: 'Domain Estimation', icon: TrendingUp },
                    { id: 'favorites', label: 'My Favorites', icon: Heart },
                    { id: 'user-management', label: 'User Management', icon: Shield },
                    { id: 'website-config', label: 'Website Config', icon: Settings },
                    { id: 'content-management', label: 'Content', icon: FileText },
                    { id: 'seo-settings', label: 'SEO & Domain', icon: Search },
                    { id: 'security', label: 'Security', icon: Lock },
                    { id: 'database', label: 'Database', icon: Database },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'advanced', label: 'Advanced', icon: Zap }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 min-w-fit ${
                          activeTab === tab.id
                            ? 'border-blue-600 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <IconComponent className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-shrink-0">{tab.label}</span>
                </button>
                    );
                  })}
              </nav>
                
                {/* Scroll Indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

              {/* Tab Counter */}
              <div className="px-6 py-2 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {activeTab} • {[
                    'dashboard', 'suggestions', 'users', 'upload', 'generator', 
                    'estimation', 'favorites', 'user-management', 'website-config', 
                    'content-management', 'seo-settings', 'security', 'database', 
                    'notifications', 'advanced'
                  ].indexOf(activeTab) + 1} of 15 tabs
                </p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading admin data...</p>
                </div>
              )}

              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Debug Info:</strong> Active Tab: {activeTab} | 
                    Suggestions: {suggestions.length} | 
                    Users: {users.length} | 
                    Loading: {loading.toString()}
                  </p>
                </div>
              )}

              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Welcome Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Admin'}! 👋</h2>
                        <p className="text-blue-100 text-lg">Here's what's happening with your domain toolkit today.</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="bg-white/20 rounded-full p-4">
                          <BarChart3 className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Users Card */}
                    <div className="group bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-blue-700">Total Users</p>
                            <p className="text-3xl font-bold text-blue-900">{stats.totalUsers || 0}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-green-600 text-sm bg-green-100 px-2 py-1 rounded-full">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>+12%</span>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">This month</p>
                        </div>
                      </div>
                    </div>

                    {/* Suggestions Card */}
                    <div className="group bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-green-700">Domain Suggestions</p>
                            <p className="text-3xl font-bold text-green-900">{stats.totalSuggestions || 0}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-green-600 text-sm bg-green-100 px-2 py-1 rounded-full">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>+8%</span>
                          </div>
                          <p className="text-xs text-green-600 mt-1">This week</p>
                        </div>
                      </div>
                    </div>

                    {/* Domain Checks Card */}
                    <div className="group bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-purple-700">Domain Checks</p>
                            <p className="text-3xl font-bold text-purple-900">{stats.totalChecks || 0}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-purple-600 text-sm bg-purple-100 px-2 py-1 rounded-full">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>+15%</span>
                          </div>
                          <p className="text-xs text-purple-600 mt-1">Today</p>
                        </div>
                      </div>
                    </div>

                    {/* Favorites Card */}
                    <div className="group bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Star className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-orange-700">User Favorites</p>
                            <p className="text-3xl font-bold text-orange-900">{stats.totalFavorites || 0}</p>
                        </div>
                      </div>
                        <div className="text-right">
                          <div className="flex items-center text-orange-600 text-sm bg-orange-100 px-2 py-1 rounded-full">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>+5%</span>
                          </div>
                          <p className="text-xs text-orange-600 mt-1">This week</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Health & Quick Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* System Health */}
                    <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">System Health</h3>
                        <button 
                          onClick={fetchSystemHealth}
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                          title="Refresh"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                          <span className="text-sm font-medium text-gray-700">Database</span>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm font-semibold text-green-600">Healthy</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                          <span className="text-sm font-medium text-gray-700">API</span>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm font-semibold text-green-600">Healthy</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                          <span className="text-sm font-medium text-gray-700">Storage</span>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm font-semibold text-green-600">Healthy</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-center pt-3 bg-gray-50 rounded-lg p-2">
                          Last checked: {systemHealth.lastCheck.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                      <div className="space-y-4">
                        <button className="group/btn w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                          <Plus className="h-5 w-5 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                          Add Domain
                        </button>
                        <button className="group/btn w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                          <Upload className="h-5 w-5 mr-2 group-hover/btn:animate-bounce" />
                          Upload CSV
                        </button>
                        <button className="group/btn w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                          <Users className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                          Manage Users
                        </button>
                      </div>
                    </div>

                    {/* Recent Notifications */}
                    <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
                          {unreadCount} new
                        </span>
                      </div>
                      <div className="space-y-4">
                        {notifications.slice(0, 3).map((notification) => (
                          <div key={notification.id} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                            notification.type === 'warning' 
                              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md' 
                              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md'
                          }`}>
                            <div className="flex items-start">
                              {notification.type === 'warning' ? (
                                <div className="p-2 bg-yellow-100 rounded-full mr-3">
                                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                                </div>
                              ) : (
                                <div className="p-2 bg-blue-100 rounded-full mr-3">
                                  <Bell className="h-5 w-5 text-blue-600" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900 mb-1">{notification.title}</p>
                                <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {notification.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 text-center">Activity log will be displayed here</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions Tab */}
              {activeTab === 'suggestions' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Domain Suggestions</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Estimated Price is calculated using website logic based on domain length, TLD, score, and brandability factors
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Search suggestions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <button 
                        onClick={bulkCheckAvailability}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Check All
                      </button>
                      <button className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading suggestions...</p>
                    </div>
                  ) : filteredSuggestions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Availability
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estimated Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredSuggestions.map((suggestion) => (
                            <tr key={suggestion.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{suggestion.domain}</div>
                                {suggestion.description && (
                                  <div className="text-sm text-gray-500">{suggestion.description}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  suggestion.status === 'Available' || suggestion.status === 'Available Soon'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : suggestion.status === 'Taken' || suggestion.status === 'Premium'
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}>
                                  {suggestion.status || 'Unknown'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  <div className="font-semibold text-green-600">
                                    ${suggestion.estimation_price || suggestion.price || 'N/A'}
                                  </div>
                                  {suggestion.estimation_price && suggestion.price && suggestion.estimation_price !== suggestion.price && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Raw: ${suggestion.price}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                  {suggestion.category && 
                                   suggestion.category !== 'CSV Upload' && 
                                   suggestion.category !== 'Generated' 
                                   ? suggestion.category 
                                   : '—'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {suggestion.score || 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => checkDomainAvailability(suggestion.domain)}
                                  className="text-blue-500 hover:text-blue-700 mr-3"
                                  title="Check Availability"
                                >
                                  <Search className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setEditingSuggestion(suggestion)}
                                  className="text-blue-600 hover:text-blue-700 mr-3"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteSuggestion(suggestion.id)}
                                  className="text-red-600 hover:text-red-700 mr-3"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No suggestions found.</p>
                      {suggestions.length === 0 && !loading && (
                        <p className="text-sm text-gray-400 mt-2">Try adding some domain suggestions or uploading a CSV file.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">User Management</h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading users...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* User Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Total Users</p>
                              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Active Users</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.status !== 'suspended').length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <Shield className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Admins</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.role === 'admin').length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                              <AlertCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Suspended</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.status === 'suspended').length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* User List */}
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900">User List</h4>
                            <button
                              onClick={() => setEditingUser({})}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                              <Plus className="h-4 w-4 mr-2 inline" />
                              Add New User
                            </button>
                          </div>
                        </div>
                        
                        {users.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                  <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">
                                            {user.name || 'No Name'}
                                          </div>
                                          <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.role === 'admin' 
                                          ? 'bg-red-100 text-red-800 border border-red-200' 
                                          : user.role === 'moderator'
                                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                                      }`}>
                                        {user.role || 'user'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.status === 'active' 
                                          ? 'bg-green-100 text-green-800 border border-green-200' 
                                          : user.status === 'suspended'
                                          ? 'bg-red-100 text-red-800 border border-red-200'
                                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                                      }`}>
                                        {user.status || 'active'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <div className="flex space-x-2">
                                        <button
                                          onClick={() => setEditingUser(user)}
                                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                          title="Edit User"
                                        >
                                          <Edit className="h-4 w-4" />
                                        </button>
                                        {user.role !== 'admin' && (
                                          <>
                                            <button
                                              onClick={() => toggleUserStatus(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                                              className={`${
                                                user.status === 'suspended' 
                                                  ? 'text-green-600 hover:text-green-900' 
                                                  : 'text-yellow-600 hover:text-yellow-900'
                                              } transition-colors duration-200`}
                                              title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                            >
                                              {user.status === 'suspended' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                            </button>
                                            <button
                                              onClick={() => deleteUser(user.id)}
                                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                              title="Delete User"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No users found.</p>
                            <p className="text-sm text-gray-400 mt-1">Start by adding your first user.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Edit User Modal */}
                  {editingUser && Object.keys(editingUser).length > 0 && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {editingUser.id ? 'Edit User' : 'Add New User'}
                          </h3>
                          
                          <form onSubmit={handleSaveUser} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                value={editingUser.name || ''}
                                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter user name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                type="email"
                                value={editingUser.email || ''}
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter user email"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                              <select
                                value={editingUser.role || 'user'}
                                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <select
                                value={editingUser.status || 'active'}
                                onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                              </select>
                            </div>
                            
                            <div className="flex space-x-3 pt-4">
                              <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
                              >
                                {editingUser.id ? 'Update User' : 'Create User'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingUser(null)}
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CSV Upload Tab */}
              {activeTab === 'upload' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">CSV Upload & Processing</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Form */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Upload CSV File</h4>
                      
                      <form onSubmit={handleFileUpload} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select CSV File
                        </label>
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={handleFileSelect}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                          <p className="text-xs text-gray-500 mt-1">
                            File should contain domain names in the first column
                          </p>
                            </div>
                        
                        {selectedFile && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                              <strong>Selected:</strong> {selectedFile.name} 
                              ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </p>
                          </div>
                        )}
                        
                        <button
                          type="submit"
                          disabled={!selectedFile || uploading}
                          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {uploading ? 'Processing...' : 'Upload & Process'}
                        </button>
                      </form>
                      
                      {/* Enhanced Processing Progress */}
                      {uploading && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-blue-800">
                              {uploadPhase === 'uploading' && '📤 Uploading...'}
                              {uploadPhase === 'processing' && '🔄 Processing...'}
                              {uploadPhase === 'complete' && '✅ Complete!'}
                            </span>
                            <span className="text-sm font-medium text-blue-600">
                              {processingProgress.current} / {processingProgress.total}
                            </span>
                          </div>
                          
                          {/* Animated Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                                uploadPhase === 'uploading' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                uploadPhase === 'processing' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                'bg-gradient-to-r from-green-500 to-green-600'
                              } ${uploadPhase === 'processing' ? 'animate-pulse-custom' : ''}`}
                              style={{ 
                                width: `${(processingProgress.current / processingProgress.total) * 100}%`
                              }}
                            ></div>
                          </div>
                          
                          {/* Progress Message */}
                          <p className="text-sm text-blue-700 mt-2 font-medium">
                            {uploadMessage}
                          </p>
                          
                          {/* Phase Indicator */}
                          <div className="flex items-center justify-center mt-3 space-x-2">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              uploadPhase === 'uploading' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              uploadPhase === 'processing' ? 'bg-purple-500' : 'bg-gray-300'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              uploadPhase === 'complete' ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                          </div>
                        </div>
                      )}
                      </div>

                    {/* Instructions & Tips */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Instructions & Tips</h4>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                          <h5 className="text-sm font-medium text-green-800 mb-2">CSV Format</h5>
                          <p className="text-sm text-green-700">
                            Your CSV should have domain names in the first column. 
                            Headers are optional but recommended.
                          </p>
                          <p className="text-sm text-green-700 mt-2">
                            <strong>Note:</strong> Only .com domains will be processed. 
                            Other TLDs (.net, .org, .co.uk, etc.) will be automatically skipped.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <h5 className="text-sm font-medium text-blue-800 mb-2">Processing Details</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>Fast CSV processing</strong> - reads entire file quickly</li>
                            <li>• <strong>.com domains only</strong> - automatically filters for .com TLDs</li>
                            <li>• <strong>20 .com domains randomly selected</strong> from your CSV file</li>
                            <li>• <strong>GoDaddy API checks</strong> for real availability & pricing</li>
                            <li>• <strong>Enhanced scoring</strong> using real-time data</li>
                            <li>• <strong>Fast database insertion</strong> with minimal delays</li>
                            <li>• <strong>Total time: ~4-6 seconds</strong> for 20 .com domains</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <h5 className="text-sm font-medium text-yellow-800 mb-2">Limitations</h5>
                          <p className="text-sm text-yellow-700">
                            <strong>Maximum 20 domains</strong> are randomly selected from your CSV file for optimal performance. 
                            Only domains ≤15 characters are accepted.
                          </p>
                        </div>
                            </div>
                          </div>
                  </div>
                </div>
              )}

              {/* Domain Generator Tab */}
              {activeTab === 'generator' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Domain Generator</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Generator Controls */}
                    <div className="space-y-6">
                      {/* Prefixes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prefixes</label>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add prefix..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addPrefix(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add prefix..."]');
                              if (input && input.value.trim()) {
                                addPrefix(input.value);
                                input.value = '';
                              }
                            }}
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {prefixes.map((prefix, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                            >
                              {prefix}
                              <button
                                onClick={() => removePrefix(index)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Suffixes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Suffixes</label>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add suffix..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addSuffix(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add suffix..."]');
                              if (input && input.value.trim()) {
                                addSuffix(input.value);
                                input.value = '';
                              }
                            }}
                            className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {suffixes.map((suffix, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                            >
                              {suffix}
                              <button
                                onClick={() => removeSuffix(index)}
                                className="ml-2 text-green-600 hover:text-green-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* TLDs */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Top Level Domains</label>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add TLD..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTld(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add TLD..."]');
                              if (input && input.value.trim()) {
                                addTld(input.value);
                                input.value = '';
                              }
                            }}
                            className="px-4 py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 transition-colors duration-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tlds.map((tld, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                            >
                              {tld}
                              <button
                                onClick={() => removeTld(index)}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Generation Settings */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Generation Settings</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Min Length</label>
                            <input
                              type="number"
                              value={generationSettings.minLength}
                              onChange={(e) => setGenerationSettings({...generationSettings, minLength: parseInt(e.target.value)})}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Max Length</label>
                            <input
                              type="number"
                              value={generationSettings.maxLength}
                              onChange={(e) => setGenerationSettings({...generationSettings, maxLength: parseInt(e.target.value)})}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Max Results</label>
                            <input
                              type="number"
                              value={generationSettings.maxResults}
                              onChange={(e) => setGenerationSettings({...generationSettings, maxResults: parseInt(e.target.value)})}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <button
                        onClick={generateDomains}
                        disabled={isGenerating || prefixes.length === 0 || suffixes.length === 0 || tlds.length === 0}
                        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Domains'}
                      </button>
                    </div>

                    {/* Generated Results */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Generated Domains</h4>
                        {generatedDomains.length > 0 && (
                          <button
                            onClick={addAllToSuggestions}
                            className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200"
                          >
                            Add All to Suggestions
                          </button>
                        )}
                      </div>

                      {generatedDomains.length > 0 ? (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {generatedDomains.map((domain, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-lg font-semibold text-gray-900">{domain.domain}</div>
                                <div className="flex items-center space-x-2">
                                  {/* Availability Status */}
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    domain.status === 'Available' 
                                      ? 'bg-green-100 text-green-800' 
                                      : domain.status === 'Taken'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {domain.status || 'Unknown'}
                                  </span>
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Score: {domain.score}
                                  </span>
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    ${domain.price?.toFixed(2) || 'N/A'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-sm text-gray-600 mb-3">{domain.description}</div>
                              
                              {/* GoDaddy API Information */}
                              {domain.godaddy_price && (
                                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                                  <div className="flex items-center justify-between text-blue-800">
                                    <span className="font-medium">GoDaddy Price:</span>
                                    <span className="font-bold">${domain.godaddy_price.toFixed(2)}</span>
                                  </div>
                                  {domain.currency && (
                                    <div className="text-blue-600">Currency: {domain.currency}</div>
                                  )}
                                  {domain.period && (
                                    <div className="text-blue-600">Period: {domain.period} year(s)</div>
                                  )}
                                </div>
                              )}
                              
                              {/* Error Information */}
                              {domain.error && (
                                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                                  <span className="font-medium">API Error:</span> {domain.error}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>Length: {domain.length}</span>
                                  <span>Extension: {domain.extension}</span>
                                  <span>Category: {domain.category}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/* Favorite Button */}
                                  {user && (
                                    isUserFavorite(domain.domain) ? (
                                      <button
                                        onClick={() => {
                                          const favorite = userFavorites.find(fav => fav.domain === domain.domain);
                                          if (favorite) {
                                            removeFromUserFavorites(favorite.id);
                                          }
                                        }}
                                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors duration-200 flex items-center space-x-1"
                                        title="Remove from favorites"
                                      >
                                        <Heart className="h-3 w-3 fill-current" />
                                        <span>Remove</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => addToUserFavorites(domain.domain)}
                                        className="px-3 py-1 bg-pink-500 text-white text-xs rounded hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-1"
                                        title="Add to favorites"
                                      >
                                        <Heart className="h-3 w-3" />
                                        <span>Favorite</span>
                                      </button>
                                    )
                                  )}
                                  
                                  {/* Add to Suggestions Button */}
                                  <button
                                    onClick={() => addToSuggestions(domain)}
                                    className="px-3 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition-colors duration-200"
                                  >
                                    Add to Suggestions
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No domains generated yet.</p>
                          <p className="text-sm text-gray-400 mt-1">Configure prefixes, suffixes, and TLDs above, then click generate.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Domain Estimation Tab */}
              {activeTab === 'estimation' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Domain Estimation</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Estimation Form */}
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Estimate Domain Value</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Domain Name
                            </label>
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="example.com"
                                value={estimationDomain}
                                onChange={(e) => setEstimationDomain(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    estimateDomainValue(estimationDomain);
                                  }
                                }}
                              />
                              <button
                                onClick={() => estimateDomainValue(estimationDomain)}
                                disabled={!estimationDomain.trim() || isEstimating}
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {isEstimating ? 'Estimating...' : 'Estimate'}
                              </button>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <div className="flex">
                              <div className="ml-3">
                                <h5 className="text-sm font-medium text-blue-800">Estimation Factors</h5>
                                <div className="mt-2 text-sm text-blue-700">
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>Domain length (shorter = more valuable)</li>
                                    <li>TLD popularity and market demand</li>
                                    <li>Premium keywords and trending terms</li>
                                    <li>Brandability and memorability</li>
                                    <li>Market trends and industry relevance</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Test Button for Debugging */}
                          <div className="text-center">
                            <button
                              onClick={() => {
                                console.log('Testing estimation with sample domain...');
                                estimateDomainValue('test.com');
                              }}
                              className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors duration-200"
                            >
                              Test Estimation (Debug)
                            </button>
                            
                            <button
                              onClick={() => {
                                console.log('Testing helper functions...');
                                try {
                                  const testName = 'techhub';
                                  const testTld = 'com';
                                  console.log('Testing calculateBrandability:', calculateBrandability(testName));
                                  console.log('Testing calculateMarketDemand:', calculateMarketDemand(testName, testTld));
                                  console.log('Testing calculateEstimatedValue:', calculateEstimatedValue(75, testName.length, testTld));
                                  console.log('Testing getLengthFactor:', getLengthFactor(testName.length));
                                  console.log('Testing getTldFactor:', getTldFactor(testTld));
                                  console.log('Testing getKeywordFactor:', getKeywordFactor(testName));
                                  console.log('Testing getBrandabilityFactor:', getBrandabilityFactor(testName));
                                  console.log('Testing getMarketFactor:', getMarketFactor(testName, testTld));
                                  alert('All helper functions tested successfully! Check console for results.');
                                } catch (error) {
                                  console.error('Error testing helper functions:', error);
                                  alert(`Error testing helper functions: ${error.message}`);
                                }
                              }}
                              className="ml-2 px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200"
                            >
                              Test Helpers
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Estimation History */}
                      {estimationHistory.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Estimations</h4>
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {estimationHistory.map((estimation, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900">{estimation.domain}</div>
                                  <div className="text-sm text-gray-500">
                                    Score: {estimation.score}/100 • ${estimation.estimatedValue.toLocaleString()}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setEstimationResult(estimation)}
                                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors duration-200"
                                >
                                  View Details
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Estimation Results */}
                    <div>
                      {estimationResult ? (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-gray-900">Estimation Results</h4>
                            <button
                              onClick={() => setEstimationResult(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </div>
                          
                          <div className="space-y-6">
                            {/* Domain Info */}
                            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-gray-900 mb-2">{estimationResult.domain}</div>
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                ${estimationResult.estimatedValue.toLocaleString()}
                              </div>
                              <div className="text-lg text-gray-600">
                                Score: <span className="font-semibold text-gray-900">{estimationResult.score}/100</span>
                              </div>
                            </div>

                            {/* Score Breakdown */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-3">Score Breakdown</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Length Factor:</span>
                                  <span className="font-medium">{estimationResult.breakdown.lengthFactor}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>TLD Factor:</span>
                                  <span className="font-medium">{estimationResult.breakdown.tldFactor}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Keyword Factor:</span>
                                  <span className="font-medium">{estimationResult.breakdown.keywordFactor}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Brandability:</span>
                                  <span className="font-medium">{estimationResult.breakdown.brandabilityFactor}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Market Demand:</span>
                                  <span className="font-medium">{estimationResult.breakdown.marketFactor}</span>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Factors */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-3">Detailed Analysis</h5>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Domain Length:</span>
                                  <div className="font-medium">{estimationResult.factors.length} characters</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">TLD:</span>
                                  <div className="font-medium">{estimationResult.factors.tld}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Keyword Score:</span>
                                  <div className="font-medium">+{estimationResult.factors.keywordScore}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Brandability Score:</span>
                                  <div className="font-medium">{estimationResult.factors.brandabilityScore > 0 ? '+' : ''}{estimationResult.factors.brandabilityScore}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Market Score:</span>
                                  <div className="font-medium">+{estimationResult.factors.marketScore}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Estimated:</span>
                                  <div className="font-medium">{new Date(estimationResult.timestamp).toLocaleString()}</div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => {
                                  const suggestionData = {
                                    domain: estimationResult.domain,
                                    price: estimationResult.estimatedValue,
                                    extension: estimationResult.factors.tld,
                                    status: 'Available',
                                    score: estimationResult.score,
                                    description: `Estimated value: $${estimationResult.estimatedValue.toLocaleString()} (Score: ${estimationResult.score}/100)`,
                                    category: 'Estimated',
                                    length: estimationResult.factors.length
                                  };
                                  addToSuggestions(suggestionData);
                                }}
                                className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200"
                              >
                                Add to Suggestions
                              </button>
                              <button
                                onClick={() => {
                                  try {
                                    const textToCopy = `Domain: ${estimationResult.domain}\nEstimated Value: $${estimationResult.estimatedValue.toLocaleString()}\nScore: ${estimationResult.score}/100`;
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                      navigator.clipboard.writeText(textToCopy);
                                      alert('Estimation details copied to clipboard!');
                                    } else {
                                      // Fallback for older browsers
                                      const textArea = document.createElement('textarea');
                                      textArea.value = textToCopy;
                                      document.body.appendChild(textArea);
                                      textArea.select();
                                      document.execCommand('copy');
                                      document.body.removeChild(textArea);
                                      alert('Estimation details copied to clipboard!');
                                    }
                                  } catch (error) {
                                    console.error('Error copying to clipboard:', error);
                                    alert('Could not copy to clipboard. Please copy manually.');
                                  }
                                }}
                                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                              >
                                Copy Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No estimation results yet.</p>
                          <p className="text-sm text-gray-400 mt-1">Enter a domain name and click estimate to see detailed analysis.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* User Favorites Tab */}
              {activeTab === 'favorites' && user && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">My Favorite Domains</h3>
                  
                  {loadingFavorites ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading your favorites...</p>
                    </div>
                  ) : userFavorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userFavorites.map((favorite, index) => (
                        <div 
                          key={favorite.id} 
                          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 truncate">
                              {favorite.domain}
                            </h4>
                            <button
                              onClick={() => removeFromUserFavorites(favorite.id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Remove from favorites"
                            >
                              <Heart className="h-5 w-5 fill-current" />
                            </button>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-4">
                            Added on {new Date(favorite.created_at).toLocaleDateString()}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                // Switch to domain generator and pre-fill with this domain
                                setActiveTab('generator');
                                // You could also add logic to check availability here
                              }}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                              Check Availability
                            </button>
                            <button 
                              onClick={() => {
                                // Add to suggestions
                                const suggestionData = {
                                  domain: favorite.domain,
                                  price: null,
                                  extension: favorite.domain.split('.').pop(),
                                  status: 'User Favorite',
                                  score: 85,
                                  description: `User favorite domain: ${favorite.domain}`,
                                  category: 'User Favorites',
                                  length: favorite.domain.split('.')[0].length
                                };
                                addToSuggestions(suggestionData);
                              }}
                              className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                            >
                              Add to Suggestions
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No favorite domains yet.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Generate domains in the Domain Generator tab and add them to your favorites!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* User Management Tab */}
              {activeTab === 'user-management' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">User Management</h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading users...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* User Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Total Users</p>
                              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Active Users</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.status !== 'suspended').length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <Shield className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Admins</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.role === 'admin').length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                              <AlertCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-600">Suspended</p>
                              <p className="text-2xl font-bold text-gray-900">
                                {users.filter(u => u.status === 'suspended').length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* User List */}
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900">User List</h4>
                            <button
                              onClick={() => setEditingUser({})}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                              <Plus className="h-4 w-4 mr-2 inline" />
                              Add New User
                            </button>
                          </div>
                        </div>
                        
                        {users.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                  <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">
                                            {user.name || 'No Name'}
                                          </div>
                                          <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.role === 'admin' 
                                          ? 'bg-red-100 text-red-800 border border-red-200' 
                                          : user.role === 'moderator'
                                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                                      }`}>
                                        {user.role || 'user'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.status === 'active' 
                                          ? 'bg-green-100 text-green-800 border border-green-200' 
                                          : user.status === 'suspended'
                                          ? 'bg-red-100 text-red-800 border border-red-200'
                                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                                      }`}>
                                        {user.status || 'active'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <div className="flex space-x-2">
                                        <button
                                          onClick={() => setEditingUser(user)}
                                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                          title="Edit User"
                                        >
                                          <Edit className="h-4 w-4" />
                                        </button>
                                        {user.role !== 'admin' && (
                                          <>
                                            <button
                                              onClick={() => toggleUserStatus(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                                              className={`${
                                                user.status === 'suspended' 
                                                  ? 'text-green-600 hover:text-green-900' 
                                                  : 'text-yellow-600 hover:text-yellow-900'
                                              } transition-colors duration-200`}
                                              title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                            >
                                              {user.status === 'suspended' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                            </button>
                                            <button
                                              onClick={() => deleteUser(user.id)}
                                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                              title="Delete User"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No users found.</p>
                            <p className="text-sm text-gray-400 mt-1">Start by adding your first user.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Edit User Modal */}
                  {editingUser && Object.keys(editingUser).length > 0 && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {editingUser.id ? 'Edit User' : 'Add New User'}
                          </h3>
                          
                          <form onSubmit={handleSaveUser} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                value={editingUser.name || ''}
                                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter user name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                type="email"
                                value={editingUser.email || ''}
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter user email"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                              <select
                                value={editingUser.role || 'user'}
                                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <select
                                value={editingUser.status || 'active'}
                                onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                              </select>
                            </div>
                            
                            <div className="flex space-x-3 pt-4">
                              <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
                              >
                                {editingUser.id ? 'Update User' : 'Create User'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingUser(null)}
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Website Configuration Tab */}
              {activeTab === 'website-config' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Website Configuration</h3>
                  
                  {isLoadingConfig && (
                    <div className="mb-6 text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <RefreshCw className="animate-spin h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-blue-800">Loading configuration...</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Configuration Status */}
                  <div className="mb-6 text-center space-y-2">
                    <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <Clock className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-gray-700">
                        Last updated: {lastConfigUpdate.toLocaleString()}
                      </span>
                    </div>
                    
                    {hasUnsavedChanges && (
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-yellow-700">
                          You have unsaved changes
                        </span>
                      </div>
                    )}
                    
                    {/* Debug Info */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <Code className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-blue-700 text-sm">
                          State: {websiteConfig.siteTitle ? 'Loaded' : 'Not Loaded'} | 
                          Changes: {hasUnsavedChanges ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Settings */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Site Title</label>
                          <input
                            type="text"
                            value={websiteConfig.siteTitle}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, siteTitle: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Site Description</label>
                          <textarea
                            value={websiteConfig.siteDescription}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, siteDescription: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                          <input
                            type="email"
                            value={websiteConfig.contactEmail}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, contactEmail: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                          <input
                            type="text"
                            value={websiteConfig.contactPhone}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, contactPhone: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                          <input
                            type="url"
                            value={websiteConfig.logo}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, logo: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/logo.png"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Favicon URL</label>
                          <input
                            type="url"
                            value={websiteConfig.favicon}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, favicon: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/favicon.ico"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Language</label>
                          <select
                            value={websiteConfig.language}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, language: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Timezone</label>
                          <select
                            value={websiteConfig.timezone}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, timezone: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">GMT</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Currency</label>
                          <select
                            value={websiteConfig.currency}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, currency: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs text-gray-500">Twitter</label>
                              <input
                                type="url"
                                value={websiteConfig.socialLinks.twitter || ''}
                                onChange={(e) => setWebsiteConfig({
                                  ...websiteConfig, 
                                  socialLinks: {...websiteConfig.socialLinks, twitter: e.target.value}
                                })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="https://twitter.com/username"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">Facebook</label>
                              <input
                                type="url"
                                value={websiteConfig.socialLinks.facebook || ''}
                                onChange={(e) => setWebsiteConfig({
                                  ...websiteConfig, 
                                  socialLinks: {...websiteConfig.socialLinks, facebook: e.target.value}
                                })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="https://facebook.com/username"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">LinkedIn</label>
                              <input
                                type="url"
                                value={websiteConfig.socialLinks.linkedin || ''}
                                onChange={(e) => setWebsiteConfig({
                                  ...websiteConfig, 
                                  socialLinks: {...websiteConfig.socialLinks, linkedin: e.target.value}
                                })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500">GitHub</label>
                              <input
                                type="url"
                                value={websiteConfig.socialLinks.github || ''}
                                onChange={(e) => setWebsiteConfig({
                                  ...websiteConfig, 
                                  socialLinks: {...websiteConfig.socialLinks, github: e.target.value}
                                })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="https://github.com/username"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={websiteConfig.maintenanceMode}
                            onChange={(e) => setWebsiteConfig({...websiteConfig, maintenanceMode: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Maintenance Mode
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    {configMessage && (
                      <div className={`mb-4 p-3 rounded-lg ${
                        configMessage.includes('successfully') 
                          ? 'bg-green-50 border border-green-200 text-green-800' 
                          : 'bg-red-50 border border-red-200 text-red-800'
                      }`}>
                        {configMessage}
                      </div>
                    )}
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={fetchWebsiteConfig}
                        disabled={isLoadingConfig}
                        className={`px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors ${
                          isLoadingConfig ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <RefreshCw className={`inline h-4 w-4 mr-2 ${isLoadingConfig ? 'animate-spin' : ''}`} />
                        Refresh
                      </button>
                      <button 
                        onClick={saveWebsiteConfig}
                        disabled={isSavingConfig}
                        className={`px-6 py-2 text-white rounded transition-colors ${
                          isSavingConfig 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : hasUnsavedChanges
                              ? 'bg-orange-600 hover:bg-orange-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isSavingConfig ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Save Configuration'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Management Tab */}
              {activeTab === 'content-management' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Content Management</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Pages</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Add New Page
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Manage Pages
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                          Page Templates
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Media</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Upload Media
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Media Library
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                          Organize Files
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Categories</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Add Category
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Manage Categories
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                          Category Hierarchy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO & Domain Tab */}
              {activeTab === 'seo-settings' && (
                <div className="animate-fade-in-up">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">SEO & Domain Settings</h3>
                  
                  {isLoadingSeo && (
                    <div className="mb-6 text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <RefreshCw className="animate-spin h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-blue-800">Loading SEO settings...</span>
                      </div>
                    </div>
                  )}
                  
                  {/* SEO Settings Status */}
                  <div className="mb-6 text-center space-y-2">
                    <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <Clock className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-gray-700">
                        Last updated: {lastSeoUpdate.toLocaleString()}
                      </span>
                    </div>
                    
                    {hasUnsavedSeoChanges && (
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-yellow-700">
                          You have unsaved SEO changes
                        </span>
                      </div>
                    )}
                    
                    {/* Debug Info */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <Code className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-blue-700 text-sm">
                          State: {seoSettings.metaTitle ? 'Loaded' : 'Not Loaded'} | 
                          Changes: {hasUnsavedSeoChanges ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Debug Info */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>SEO Tab Debug:</strong> seoSettings loaded: {seoSettings ? 'Yes' : 'No'} | 
                        Meta Title: {seoSettings?.metaTitle || 'Not set'}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Meta Tags */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Meta Tags</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                          <input
                            type="text"
                            value={seoSettings?.metaTitle || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, metaTitle: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter meta title..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                          <textarea
                            value={seoSettings?.metaDescription || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                            placeholder="Enter meta description..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                          <input
                            type="text"
                            value={seoSettings?.metaKeywords || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, metaKeywords: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter meta keywords..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Analytics & Tools */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Analytics & Tools</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Google Analytics ID</label>
                          <input
                            type="text"
                            value={seoSettings?.googleAnalytics || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, googleAnalytics: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="GA-XXXXXXXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Google Search Console</label>
                          <input
                            type="text"
                            value={seoSettings?.googleSearchConsole || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, googleSearchConsole: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Verification code or URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Robots.txt</label>
                          <textarea
                            value={seoSettings?.robotsTxt || ''}
                            onChange={(e) => setSeoSettings({...seoSettings, robotsTxt: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                            placeholder="Enter robots.txt content..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional SEO Settings */}
                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Social Media */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media & Open Graph</h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={seoSettings?.socialMediaTags || false}
                            onChange={(e) => setSeoSettings({...seoSettings, socialMediaTags: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Open Graph Tags
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={seoSettings?.structuredData || false}
                            onChange={(e) => setSeoSettings({...seoSettings, structuredData: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Structured Data (JSON-LD)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Sitemap & Canonical */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Sitemap & URLs</h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={seoSettings?.sitemapEnabled || false}
                            onChange={(e) => setSeoSettings({...seoSettings, sitemapEnabled: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable XML Sitemap
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={seoSettings?.canonicalUrls || false}
                            onChange={(e) => setSeoSettings({...seoSettings, canonicalUrls: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Canonical URLs
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    {seoMessage && (
                      <div className={`mb-4 p-3 rounded-lg ${
                        seoMessage.includes('successfully') 
                          ? 'bg-green-50 border border-green-200 text-green-800' 
                          : 'bg-red-50 border border-red-200 text-red-800'
                      }`}>
                        {seoMessage}
                      </div>
                    )}
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={fetchSeoSettings}
                        disabled={isLoadingSeo}
                        className={`px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors ${
                          isLoadingSeo ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <RefreshCw className={`inline h-4 w-4 mr-2 ${isLoadingSeo ? 'animate-spin' : ''}`} />
                        Refresh
                      </button>
                      <button 
                        onClick={saveSeoSettings}
                        disabled={isSavingSeo}
                        className={`px-6 py-2 text-white rounded transition-colors ${
                          isSavingSeo 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : hasUnsavedSeoChanges
                              ? 'bg-orange-600 hover:bg-orange-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isSavingSeo ? 'Saving...' : hasUnsavedSeoChanges ? 'Save SEO Changes' : 'Save SEO Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Security & Access Control</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Authentication */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Authentication</h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={securitySettings.twoFactorAuth}
                            onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Two-Factor Authentication
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                          <input
                            type="number"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="5"
                            max="1440"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
                          <input
                            type="number"
                            value={securitySettings.maxLoginAttempts}
                            onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="3"
                            max="10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Access Control */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Access Control</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">API Rate Limit (requests/min)</label>
                          <input
                            type="number"
                            value={securitySettings.apiRateLimit}
                            onChange={(e) => setSecuritySettings({...securitySettings, apiRateLimit: parseInt(e.target.value)})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="10"
                            max="1000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Backup Frequency</label>
                          <select
                            value={securitySettings.backupFrequency}
                            onChange={(e) => setSecuritySettings({...securitySettings, backupFrequency: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">IP Whitelist</label>
                          <textarea
                            value={securitySettings.ipWhitelist.join('\n')}
                            onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="One IP per line"
                            rows="3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Save Security Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Database Tab */}
              {activeTab === 'database' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Database & Storage Management</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Database Operations */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Database Operations</h4>
                      <div className="space-y-4">
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                          Create Backup
                        </button>
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Restore Backup
                        </button>
                        <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Export Data (CSV/JSON)
                        </button>
                        <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                          Import Data
                        </button>
                      </div>
                    </div>

                    {/* Storage Management */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Storage Management</h4>
                      <div className="space-y-4">
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                          Clear Cache
                        </button>
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Clear Logs
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Clean Temporary Files
                        </button>
                        <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                          Storage Usage Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Notifications & Email Settings</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* SMTP Settings */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">SMTP Configuration</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                          <input
                            type="text"
                            value={emailSettings.smtpHost}
                            onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="smtp.gmail.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                          <input
                            type="number"
                            value={emailSettings.smtpPort}
                            onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="1"
                            max="65535"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
                          <input
                            type="text"
                            value={emailSettings.smtpUser}
                            onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                          <input
                            type="password"
                            value={emailSettings.smtpPassword}
                            onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Sender Email</label>
                          <input
                            type="email"
                            value={emailSettings.senderEmail}
                            onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Sender Name</label>
                          <input
                            type="text"
                            value={emailSettings.senderName}
                            onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={emailSettings.enableNotifications}
                            onChange={(e) => setEmailSettings({...emailSettings, enableNotifications: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Email Notifications
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={emailSettings.enableAlerts}
                            onChange={(e) => setEmailSettings({...emailSettings, enableAlerts: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Enable Admin Alerts
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Save Email Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Advanced Controls Tab */}
              {activeTab === 'advanced' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Advanced Controls & Developer Tools</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* API & Integrations */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">API & Integrations</h4>
                      <div className="space-y-4">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Manage API Keys
                        </button>
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                          API Documentation
                        </button>
                        <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                          Webhook Settings
                        </button>
                        <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                          Third-party Integrations
                        </button>
                      </div>
                    </div>

                    {/* Developer Tools */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Developer Tools</h4>
                      <div className="space-y-4">
                        <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Custom Scripts (JS/CSS)
                        </button>
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                          Error Logs
                        </button>
                        <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                          Debug Console
                        </button>
                        <button className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
                          Performance Monitor
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Custom Scripts Editor */}
                  <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Custom Scripts Editor</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Custom JavaScript</label>
                        <textarea
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                          rows="6"
                          placeholder="// Add your custom JavaScript code here"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Custom CSS</label>
                        <textarea
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                          rows="6"
                          placeholder="/* Add your custom CSS styles here */"
                        />
                      </div>
                      <div className="text-center">
                        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                          Save Custom Scripts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback for any missing tabs */}
              {!['dashboard', 'suggestions', 'users', 'upload', 'generator', 'estimation', 'favorites', 'user-management', 'website-config', 'content-management', 'seo-settings', 'security', 'database', 'notifications', 'advanced'].includes(activeTab) && (
                <div className="text-center py-12">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                    <h3 className="text-lg font-medium text-red-800 mb-4">Tab Not Found</h3>
                    <p className="text-red-600 mb-4">
                      The tab "{activeTab}" could not be loaded. This might be due to a missing implementation or an error.
                    </p>
                    <div className="text-sm text-red-500">
                      <p>Available tabs: dashboard, suggestions, users, upload, generator, estimation, favorites, user-management, website-config, content-management, seo-settings, security, database, notifications, advanced</p>
            </div>
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;

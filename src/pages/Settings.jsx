// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Globe,
  Save,
  Eye,
  EyeOff,
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Import API services
import { getCurrentUser, updateUser, changePassword, deleteAccount } from '../services/api';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Profile Settings
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: ''
  });

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    marketingEmails: false,
    weeklyNewsletter: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  // Appearance Settings (without dark mode)
  const [appearance, setAppearance] = useState({
    compactView: localStorage.getItem('compactView') === 'true',
    fontSize: localStorage.getItem('fontSize') || 'medium'
  });

  // Apply font size on mount and when it changes
  useEffect(() => {
    const root = document.documentElement;
    switch(appearance.fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
    localStorage.setItem('fontSize', appearance.fontSize);
  }, [appearance.fontSize]);

  // Apply compact view on mount and when it changes
  useEffect(() => {
    if (appearance.compactView) {
      document.documentElement.classList.add('compact-view');
    } else {
      document.documentElement.classList.remove('compact-view');
    }
    localStorage.setItem('compactView', appearance.compactView);
  }, [appearance.compactView]);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const result = await getCurrentUser();
      
      if (result.success && result.user) {
        setProfile({
          name: result.user.name || '',
          email: result.user.email || '',
          phone: result.user.phone || '',
          location: result.user.location || '',
          title: result.user.title || result.user.jobTitle || '',
          bio: result.user.bio || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setErrorMessage('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const result = await updateUser(profile);
      
      if (result.success) {
        setSuccessMessage('Profile updated successfully!');
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...storedUser, ...profile }));
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message || 'Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (result.success) {
        setSuccessMessage('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage(error.message || 'Failed to change password');
    }
  };

  const handleNotificationUpdate = (setting) => {
    const newSettings = { ...notifications, [setting]: !notifications[setting] };
    setNotifications(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    setSuccessMessage('Notification settings updated');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handlePrivacyUpdate = (setting, value) => {
    const newPrivacy = { ...privacy, [setting]: value };
    setPrivacy(newPrivacy);
    localStorage.setItem('privacySettings', JSON.stringify(newPrivacy));
    setSuccessMessage('Privacy settings updated');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleAppearanceUpdate = (setting, value) => {
    setAppearance(prev => ({ ...prev, [setting]: value }));
    setSuccessMessage('Appearance settings updated');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const result = await deleteAccount();
        if (result.success) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setErrorMessage(result.message || 'Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        setErrorMessage(error.message || 'Failed to delete account');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Globe }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 flex items-center space-x-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-yellow-400 text-yellow-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-500"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support for assistance.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({...profile, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows="4"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </form>
              )}

              {/* Password Settings */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                  >
                    Change Password
                  </button>
                </form>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationUpdate('emailNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.emailNotifications ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Get instant notifications on your device</p>
                    </div>
                    <button
                      onClick={() => handleNotificationUpdate('pushNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.pushNotifications ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Job Alerts</h3>
                      <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                    </div>
                    <button
                      onClick={() => handleNotificationUpdate('jobAlerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.jobAlerts ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.jobAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Application Updates</h3>
                      <p className="text-sm text-gray-500">Get updates when employers view your application</p>
                    </div>
                    <button
                      onClick={() => handleNotificationUpdate('applicationUpdates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.applicationUpdates ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.applicationUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="public">Public - Everyone can see</option>
                      <option value="private">Private - Only employers can see</option>
                      <option value="hidden">Hidden - Only you can see</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Show Email on Profile</h3>
                      <p className="text-sm text-gray-500">Display your email address to employers</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyUpdate('showEmail', !privacy.showEmail)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.showEmail ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Show Phone on Profile</h3>
                      <p className="text-sm text-gray-500">Display your phone number to employers</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyUpdate('showPhone', !privacy.showPhone)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.showPhone ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance Settings (Font Size and Compact View only) */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => handleAppearanceUpdate('fontSize', 'small')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all ${
                          appearance.fontSize === 'small' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-yellow-400'
                        }`}
                      >
                        <span className="text-sm">Small</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAppearanceUpdate('fontSize', 'medium')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all ${
                          appearance.fontSize === 'medium' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-yellow-400'
                        }`}
                      >
                        <span className="text-base">Medium</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAppearanceUpdate('fontSize', 'large')}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all ${
                          appearance.fontSize === 'large' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-yellow-400'
                        }`}
                      >
                        <span className="text-lg">Large</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Compact View</h3>
                      <p className="text-sm text-gray-500">Show more items per page with reduced spacing</p>
                    </div>
                    <button
                      onClick={() => handleAppearanceUpdate('compactView', !appearance.compactView)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearance.compactView ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearance.compactView ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
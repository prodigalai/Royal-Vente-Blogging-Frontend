import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Mail,
  Smartphone,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Passionate writer and technology enthusiast.',
      website: 'https://johndoe.com',
      location: 'San Francisco, CA'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      newFollowers: true,
      articleLikes: true,
      comments: true,
      mentions: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLocation: true,
      allowIndexing: true,
      twoFactorAuth: false
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      dateFormat: 'MM/DD/YYYY',
      autoSave: true,
      darkMode: theme === 'dark'
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'data', label: 'Data & Export', icon: Database }
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Show success message
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    // Implement data export
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      // Implement account deletion
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Change Avatar
                      </button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, name: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, email: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={settings.profile.website}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, website: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={settings.profile.location}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, location: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value }
                      }))}
                      rows={4}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
                    
                    
                    
                    {[
                      { key: 'emailNotifications', label: 'Email notifications', description: 'Receive notifications via email' },
                      { key: 'weeklyDigest', label: 'Weekly digest', description: 'Get a weekly summary of your activity' },
                      { key: 'newFollowers', label: 'New followers', description: 'When someone follows you' },
                      { key: 'articleLikes', label: 'Article likes', description: 'When someone likes your articles' },
                      { key: 'comments', label: 'Comments', description: 'When someone comments on your articles' },
                      { key: 'mentions', label: 'Mentions', description: 'When someone mentions you' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [item.key]: !prev.notifications[item.key as keyof typeof prev.notifications]
                            }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.notifications[item.key as keyof typeof settings.notifications]
                              ? 'bg-primary-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              settings.notifications[item.key as keyof typeof settings.notifications]
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Push Notifications</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Push notifications</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, pushNotifications: !prev.notifications.pushNotifications }
                        }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications.pushNotifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === 'privacy' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Profile visibility</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</p>
                        </div>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            privacy: { ...prev.privacy, profileVisibility: e.target.value }
                          }))}
                          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="public">Public</option>
                          <option value="followers">Followers only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      {[
                        { key: 'showEmail', label: 'Show email address', description: 'Display your email on your public profile' },
                        { key: 'showLocation', label: 'Show location', description: 'Display your location on your profile' },
                        { key: 'allowIndexing', label: 'Allow search engine indexing', description: 'Let search engines index your profile and articles' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                          <button
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                [item.key]: !prev.privacy[item.key as keyof typeof prev.privacy]
                              }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy[item.key as keyof typeof settings.privacy]
                                ? 'bg-primary-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                settings.privacy[item.key as keyof typeof settings.privacy]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Change password</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly</p>
                          </div>
                        </div>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Change
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Two-factor authentication</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            privacy: { ...prev.privacy, twoFactorAuth: !prev.privacy.twoFactorAuth }
                          }))}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            settings.privacy.twoFactorAuth
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        >
                          {settings.privacy.twoFactorAuth ? 'Enabled' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === 'preferences' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, language: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, timezone: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/New_York">Eastern Time</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, dateFormat: e.target.value }
                        }))}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dark mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme across the application</p>
                      </div>
                      <button
                        onClick={() => {
                          toggleTheme();
                          setSettings(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, darkMode: !prev.preferences.darkMode }
                          }));
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.preferences.darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Auto-save drafts</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save your work as you type</p>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, autoSave: !prev.preferences.autoSave }
                        }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.preferences.autoSave ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Export Settings */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Data & Export</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Your Data</h3>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">Download your data</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            Get a copy of all your articles, drafts, and account information in JSON format.
                          </p>
                          <button
                            onClick={handleExportData}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Request Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Deletion</h3>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-900 dark:text-red-100">Delete your account</p>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button
                            onClick={handleDeleteAccount}
                            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Changes are saved automatically
                </p>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
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
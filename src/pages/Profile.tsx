import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Shield, 
  Building2, 
  Settings,
  ChevronDown,
  Users,
  Crown,
  UserPlus,
  Globe,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrganizations, mockUsers } from '../utils/mockData';
import { format } from 'date-fns';

interface OrganizationManagementProps {
  isOpen: boolean;
  onToggle: () => void;
}

const OrganizationManagement: React.FC<OrganizationManagementProps> = ({ isOpen, onToggle }) => {
  const { user, organization, switchOrganization } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'settings'>('overview');

  const userOrganizations = mockOrganizations.filter(org =>
    org.ownerId === user?.id || org.members.some(member => member.userId === user?.id)
  );

  const currentOrgMembers = organization?.members || [];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">Organization Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {organization ? `Managing ${organization.name}` : 'Manage organizations'}
            </p>
          </div>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organization Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">RBAC & Team Management</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Organization Selector */}
      {userOrganizations.length > 1 && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Organization
          </label>
          <select
            value={organization?.id || ''}
            onChange={(e) => switchOrganization(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {userOrganizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </div>
      )}

      {organization && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: Globe },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  {organization.logo ? (
                    <img
                      src={organization.logo}
                      alt={organization.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{organization.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{organization.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>Created {format(new Date(organization.createdAt), 'MMM d, yyyy')}</span>
                      <span>•</span>
                      <span>{organization.members.length} members</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Your Role</span>
                    </div>
                    <p className="text-lg font-bold text-primary-800 dark:text-primary-200 mt-1 capitalize">
                      {organization.ownerId === user?.id ? 'Owner' : 'Member'}
                    </p>
                  </div>
                  <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                      <span className="text-sm font-medium text-accent-700 dark:text-accent-300">Members</span>
                    </div>
                    <p className="text-lg font-bold text-accent-800 dark:text-accent-200 mt-1">
                      {organization.members.length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h4>
                  {organization.ownerId === user?.id && (
                    <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <UserPlus className="w-4 h-4" />
                      <span>Invite Member</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {currentOrgMembers.map(member => (
                    <div key={member.userId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {member.user.avatar ? (
                          <img
                            src={member.user.avatar}
                            alt={member.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{member.user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          member.role === 'owner' 
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : member.role === 'admin'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organization Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Public Profile</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Make organization visible to public</p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Require Approval</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Admin approval required for new content</p>
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {organization.ownerId === user?.id && (
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-3">Danger Zone</h5>
                    <button className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      Delete Organization
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isOrgManagementOpen, setIsOrgManagementOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    // In a real app, this would update the user data
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              <button className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Change Avatar
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full capitalize">
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              {user.lastLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Login
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {format(new Date(user.lastLogin), 'MMMM d, yyyy \'at\' h:mm a')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Organization Management */}
      <OrganizationManagement
        isOpen={isOrgManagementOpen}
        onToggle={() => setIsOrgManagementOpen(!isOrgManagementOpen)}
      />

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of protection to your account</p>
              </div>
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Enabled</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
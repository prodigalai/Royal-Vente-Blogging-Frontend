import React, { useState, useEffect } from 'react';
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
  Lock,
  Edit2,
  CreditCard,
  CheckCircle2,
  XCircle,
  BadgeCheck,
  Star,
  Clock,
  FileText,
  Key
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

interface UserData {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bio: string;
  emailVerified: boolean;
  personalBlogSlug: string;
  systemRole: string;
  prodigalCredits: number;
  royalVenteCredits: number;
  orgMemberships: Array<{
    org: string;
    orgSlug: string;
    role: string;
    permissions: {
      content: {
        create: boolean;
        edit: boolean;
        publish: boolean;
        delete: boolean;
        moderate: boolean;
      };
      users: {
        manage: boolean;
        invite: boolean;
      };
      settings: {
        platform: boolean;
        organization: boolean;
      };
    };
    _id: string;
  }>;
  createdAt: string;
  verificationExpire: string;
  verificationToken: string;
}

const Profile: React.FC = () => {
  const { user, organization } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isOrgManagementOpen, setIsOrgManagementOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editedUser, setEditedUser] = useState({
    displayName: '',
    bio: '',
    avatarUrl: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUserData(data.user);
        setEditedUser({
          displayName: data.user.displayName,
          bio: data.user.bio,
          avatarUrl: data.user.avatarUrl,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUserData(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-90"></div>
          <div className="relative px-6 py-8 sm:px-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-white dark:bg-gray-800 p-1 shadow-xl">
                  {userData.avatarUrl ? (
                    <img
                      src={userData.avatarUrl}
                      alt={userData.displayName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  )}
                </div>
                {userData.emailVerified && (
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{userData.displayName}</h1>
                    <p className="text-primary-100 mt-1">@{userData.username}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    {isEditing ? <X className="h-5 w-5 mr-2" /> : <Edit className="h-5 w-5 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="flex items-center space-x-2 text-primary-100">
                    <Mail className="h-5 w-5" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-primary-100">
                    <Crown className="h-5 w-5" />
                    <span className="capitalize">{userData.systemRole}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-primary-100">
                    <Globe className="h-5 w-5" />
                    <span>{userData.personalBlogSlug}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About</h2>
              </div>
              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={editedUser.bio}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    {userData.bio || 'No bio added yet.'}
                  </p>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Information</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verification</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {userData.emailVerified ? 'Verified' : 'Not Verified'}
                        </p>
                      </div>
                    </div>
                    {userData.emailVerified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatDate(userData.createdAt)}
                      </p>
                    </div>
                  </div>
                  {!userData.emailVerified && (
                    <div className="flex items-center space-x-3">
                      <Key className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Verification Expires</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {formatDate(userData.verificationExpire)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Credits Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Credits</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Prodigal Credits</p>
                        <p className="text-3xl font-bold text-primary-700 dark:text-primary-300 mt-2">
                          {userData.prodigalCredits}
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 text-primary-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Royal Vente Credits</p>
                        <p className="text-3xl font-bold text-secondary-700 dark:text-secondary-300 mt-2">
                          {userData.royalVenteCredits}
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-secondary-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Organization Memberships */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Organizations</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {userData.orgMemberships.map((membership) => (
                    <div key={membership._id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{membership.orgSlug}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">Role: {membership.role}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Permissions</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(membership.permissions.content).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2 text-sm">
                                {value ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User Permissions</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(membership.permissions.users).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2 text-sm">
                                {value ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Settings Permissions</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(membership.permissions.settings).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2 text-sm">
                                {value ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                                <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}

        {/* Organization Management */}
        <OrganizationManagement
          isOpen={isOrgManagementOpen}
          onToggle={() => setIsOrgManagementOpen(!isOrgManagementOpen)}
        />
      </div>
    </div>
  );
};

export default Profile;
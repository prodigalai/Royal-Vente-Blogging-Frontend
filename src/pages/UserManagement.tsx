import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical, 
  Search, 
  Filter,
  Check,
  X,
  Clock,
  Send,
  Edit,
  Trash2,
  Crown,
  AlertTriangle,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  sentAt: string;
  sentBy: string;
  expiresAt: string;
  acceptedAt?: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastActive: string;
  articlesCount: number;
  permissions: string[];
}

const UserManagement: React.FC = () => {
  const { user, organization } = useAuth();
  const [activeTab, setActiveTab] = useState<'members' | 'invitations' | 'roles'>('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'author',
    message: ''
  });

  // Mock data for invitations
  const mockInvitations: Invitation[] = [
    {
      id: 'inv_1',
      email: 'john.doe@example.com',
      role: 'editor',
      status: 'pending',
      sentAt: '2024-12-20T10:00:00Z',
      sentBy: 'Sarah Johnson',
      expiresAt: '2024-12-27T10:00:00Z'
    },
    {
      id: 'inv_2',
      email: 'jane.smith@company.com',
      role: 'author',
      status: 'accepted',
      sentAt: '2024-12-18T14:30:00Z',
      sentBy: 'Sarah Johnson',
      expiresAt: '2024-12-25T14:30:00Z',
      acceptedAt: '2024-12-19T09:15:00Z'
    },
    {
      id: 'inv_3',
      email: 'bob.wilson@startup.io',
      role: 'admin',
      status: 'declined',
      sentAt: '2024-12-15T16:45:00Z',
      sentBy: 'System Administrator',
      expiresAt: '2024-12-22T16:45:00Z'
    },
    {
      id: 'inv_4',
      email: 'alice.brown@tech.com',
      role: 'author',
      status: 'expired',
      sentAt: '2024-12-10T11:20:00Z',
      sentBy: 'Sarah Johnson',
      expiresAt: '2024-12-17T11:20:00Z'
    }
  ];

  // Mock data for members
  const mockMembers: Member[] = [
    {
      id: 'member_1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-01-15T00:00:00Z',
      lastActive: '2024-12-20T09:30:00Z',
      articlesCount: 24,
      permissions: ['manage_users', 'create_articles', 'edit_articles', 'delete_articles']
    },
    {
      id: 'member_2',
      name: 'Michael Chen',
      email: 'michael@techcorp.com',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'editor',
      status: 'active',
      joinedAt: '2024-02-01T00:00:00Z',
      lastActive: '2024-12-20T08:45:00Z',
      articlesCount: 18,
      permissions: ['create_articles', 'edit_articles', 'manage_content']
    },
    {
      id: 'member_3',
      name: 'Emma Davis',
      email: 'emma@techcorp.com',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'author',
      status: 'active',
      joinedAt: '2024-02-15T00:00:00Z',
      lastActive: '2024-12-19T15:20:00Z',
      articlesCount: 12,
      permissions: ['create_articles', 'edit_own_articles']
    },
    {
      id: 'member_4',
      name: 'David Wilson',
      email: 'david@techcorp.com',
      role: 'author',
      status: 'inactive',
      joinedAt: '2024-03-01T00:00:00Z',
      lastActive: '2024-12-15T10:30:00Z',
      articlesCount: 8,
      permissions: ['create_articles', 'edit_own_articles']
    }
  ];

  const roles = [
    { id: 'owner', name: 'Owner', description: 'Full access to everything', color: 'text-yellow-600' },
    { id: 'admin', name: 'Admin', description: 'Manage users and content', color: 'text-purple-600' },
    { id: 'editor', name: 'Editor', description: 'Edit and manage content', color: 'text-blue-600' },
    { id: 'author', name: 'Author', description: 'Create and edit own content', color: 'text-green-600' },
    { id: 'reader', name: 'Reader', description: 'Read-only access', color: 'text-gray-600' }
  ];

  const handleSendInvitation = () => {
    console.log('Sending invitation:', inviteForm);
    setIsInviteModalOpen(false);
    setInviteForm({ email: '', role: 'author', message: '' });
  };

  const handleResendInvitation = (invitationId: string) => {
    console.log('Resending invitation:', invitationId);
  };

  const handleCancelInvitation = (invitationId: string) => {
    console.log('Canceling invitation:', invitationId);
  };

  const handleUpdateMemberRole = (memberId: string, newRole: string) => {
    console.log('Updating member role:', memberId, newRole);
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      console.log('Removing member:', memberId);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedMembers);
    setSelectedMembers([]);
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || member.role === selectedRole;
    const matchesStatus = !selectedStatus || member.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredInvitations = mockInvitations.filter(invitation => {
    const matchesSearch = invitation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || invitation.role === selectedRole;
    const matchesStatus = !selectedStatus || invitation.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      inactive: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
      suspended: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      accepted: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      declined: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      expired: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'admin': return <Shield className="w-4 h-4 text-purple-600" />;
      default: return <Users className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage team members, invitations, and permissions
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'members', label: 'Members', count: mockMembers.length },
            { id: 'invitations', label: 'Invitations', count: mockInvitations.filter(i => i.status === 'pending').length },
            { id: 'roles', label: 'Roles & Permissions', count: roles.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Status</option>
                {activeTab === 'members' ? (
                  <>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </>
                ) : (
                  <>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                    <option value="expired">Expired</option>
                  </>
                )}
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedMembers.length > 0 && activeTab === 'members' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedMembers.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('remove')}
                  className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, member.id]);
                        } else {
                          setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        {getRoleIcon(member.role)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Joined {format(new Date(member.joinedAt), 'MMM d, yyyy')}</span>
                        <span>•</span>
                        <span>{member.articlesCount} articles</span>
                        <span>•</span>
                        <span>Last active {format(new Date(member.lastActive), 'MMM d')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          member.role === 'owner' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          member.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                          member.role === 'editor' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </span>
                        {getStatusBadge(member.status)}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Invitations Tab */}
          {activeTab === 'invitations' && (
            <div className="space-y-4">
              {filteredInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gray-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{invitation.email}</h3>
                        {invitation.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                        {invitation.status === 'accepted' && <Check className="w-4 h-4 text-green-500" />}
                        {invitation.status === 'declined' && <X className="w-4 h-4 text-red-500" />}
                        {invitation.status === 'expired' && <AlertTriangle className="w-4 h-4 text-gray-500" />}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Invited as {invitation.role} by {invitation.sentBy}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Sent {format(new Date(invitation.sentAt), 'MMM d, yyyy')}</span>
                        <span>•</span>
                        <span>Expires {format(new Date(invitation.expiresAt), 'MMM d, yyyy')}</span>
                        {invitation.acceptedAt && (
                          <>
                            <span>•</span>
                            <span>Accepted {format(new Date(invitation.acceptedAt), 'MMM d, yyyy')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          invitation.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                          invitation.role === 'editor' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                          {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                        </span>
                        {getStatusBadge(invitation.status)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {invitation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleResendInvitation(invitation.id)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Resend invitation"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/invite/${invitation.id}`)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Copy invitation link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancelInvitation(invitation.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Cancel invitation"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {invitation.status === 'expired' && (
                        <button
                          onClick={() => handleResendInvitation(invitation.id)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Resend invitation"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getRoleIcon(role.id)}
                        <div>
                          <h3 className={`font-semibold ${role.color}`}>{role.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Permissions:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.id === 'owner' && ['Full Access'].map(permission => (
                          <span key={permission} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                        {role.id === 'admin' && ['Manage Users', 'Manage Content', 'View Analytics'].map(permission => (
                          <span key={permission} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                        {role.id === 'editor' && ['Edit Content', 'Manage Tags', 'View Analytics'].map(permission => (
                          <span key={permission} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                        {role.id === 'author' && ['Create Articles', 'Edit Own Articles'].map(permission => (
                          <span key={permission} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                        {role.id === 'reader' && ['Read Articles', 'Comment'].map(permission => (
                          <span key={permission} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Members:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {mockMembers.filter(m => m.role === role.id).length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Invite Team Member</h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {roles.filter(role => role.id !== 'owner').map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Add a personal message to the invitation..."
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleSendInvitation}
                disabled={!inviteForm.email.trim()}
                className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send Invitation</span>
              </button>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
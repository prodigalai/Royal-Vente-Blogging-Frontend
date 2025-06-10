import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  Users,
  Settings,
  FileText,
  BarChart3,
  UserPlus,
  Mail,
  Edit,
  Eye,
  Crown,
  UserMinus,
  ArrowLeft,
  Loader,
  ExternalLink,
  Search,
  Trash2,
  Clock,
  Copy,
  X,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import OrganizationModal from "../../components/OrganizationModal";
import Card from "../../components/ui/card";

interface Member {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    username?: string;
  };
  role: "owner" | "admin" | "editor" | "contributor" | "viewer";
  joinedAt: Date;
}

interface Organization {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  isPublic: boolean;
  isVerified: boolean;
  owner: {
    _id: string;
    username: string;
    email: string;
  };
  members: Member[];
  invitations: any[];
  settings: {
    contentModeration: Record<string, any>;
    memberInvites: boolean;
    defaultRole: string;
  };
  stats: {
    memberCount: number;
    postCount: number;
    followerCount: number;
  };
  tags: string[];
  employeeCount: string;
  __v: number;
}

interface PendingInvitation {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'contributor' | 'viewer';
  invitedBy: string;
  invitedAt: Date;
  status: 'pending' | 'expired';
}

const OrganizationManage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const passedOrg = location.state?.organization as Organization | undefined;

  const dummyUser = {
    id: "demo",
    name: "Demo User",
    email: "demo@example.com",
    avatar: "https://ui-avatars.com/api/?name=Demo+User",
  };

  const currentUser = user || dummyUser;

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "members" | "settings" | "analytics" | "roles"
  >("overview");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const roleIcons = {
    owner: Crown,
    admin: Crown,
    editor: Edit,
    contributor: UserPlus,
    viewer: Eye,
  };
  const roleColors = {
    owner:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
    admin: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    editor: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    contributor:
      "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
    viewer: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  };

  const roles = [
    { id: 'owner', name: 'Owner', description: 'Full access to everything', color: 'text-yellow-600' },
    { id: 'admin', name: 'Admin', description: 'Manage users and content', color: 'text-purple-600' },
    { id: 'editor', name: 'Editor', description: 'Edit and manage content', color: 'text-blue-600' },
    { id: 'author', name: 'Author', description: 'Create and edit own content', color: 'text-green-600' },
    { id: 'reader', name: 'Reader', description: 'Read-only access', color: 'text-gray-600' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'admin': return <Shield className="w-4 h-4 text-purple-600" />;
      default: return <Users className="w-4 h-4 text-blue-600" />;
    }
  };

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

 useEffect(() => {
  if (passedOrg) {
    const enhancedMembers = passedOrg.members.map((m: any) => {
      const isOwner = m.role === "owner";
      const user = isOwner
        ? {
            id: passedOrg.owner._id,
            name: passedOrg.owner.username,
            email: passedOrg.owner.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(passedOrg.owner.username)}`,
          }
        : m.user; // fallback to provided user for non-owners

      return {
        ...m,
        joinedAt: new Date(m.joinedAt ?? passedOrg.createdAt),
        user,
      };
    });

    setOrganization({
      ...passedOrg,
      members: enhancedMembers,
    });
  } else {
    setError("Organization not found.");
  }
  setLoading(false);
}, [passedOrg]);


  const handleRoleChange = (id: string, newRole: string) => {
    console.log(`Change role for ${id} to ${newRole}`);
  };

  const [pendingInvitations] = useState<PendingInvitation[]>([
    {
      id: '1',
      email: 'alice@example.com',
      role: 'editor',
      invitedBy: 'John Doe',
      invitedAt: new Date('2024-01-10'),
      status: 'pending'
    },
    {
      id: '2',
      email: 'bob@company.com',
      role: 'contributor',
      invitedBy: 'John Doe',
      invitedAt: new Date('2024-01-08'),
      status: 'pending'
    }
  ]);

  console.log("members:", organization);

  const filteredMembers =
    organization?.members.filter((m) => {
      const name = m.user?.name?.toLowerCase() || "";
      const email = m.user?.email?.toLowerCase() || "";
      const search = searchQuery.toLowerCase();
      const matchSearch = name.includes(search) || email.includes(search);
      const matchRole = roleFilter === "all" || m.role === roleFilter;
      return matchSearch && matchRole;
    }) ?? [];

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader className="animate-spin mx-auto" />
        Loading...
      </div>
    );
  }

  if (error || !organization) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  const currentMembership = organization.members.find(
    (m) => m.user.id === currentUser.id
  );
  const isAdmin =
    currentMembership && ["owner", "admin"].includes(currentMembership.role);

    console.log("Organization:", organization);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Link
            to="/user-dashboard"
            className="text-gray-500 hover:text-primary-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          {organization.logoUrl && (
            <img
              src={organization.logoUrl}
              alt={organization.name}
              className="w-12 h-12 rounded"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {organization.name}
            </h1>
            <p className="text-sm text-gray-500">Organization Management</p>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-600"
          >
            <UserPlus className="w-4 h-4 inline mr-1" /> Invite Member
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6">
        {[
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "members", label: "Members", icon: Users, count: organization.stats.memberCount },
          { key: "settings", label: "Settings", icon: Settings },
          { key: "roles", label: "Roles & Permissions", icon: Edit },
          { key: "analytics", label: "Analytics", icon: BarChart3 },
        ].map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === key
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
           <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
              {count !== undefined && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {count}
                </span>
              )}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Members"
            value={organization.stats.memberCount}
            icon={<Users className="w-6 h-6 text-emerald-600"/>}
            from="emerald"
          />
          <Card
            title="Articles"
            value={organization.stats.postCount}
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            from="blue"
          />
          <Card
            title="Followers"
            value={organization.stats.followerCount}
            icon={<UserPlus className="w-6 h-6 text-purple-600" />}
            from="purple"
          />
          <Card
            title="Pending Invites"
            value={organization.invitations.length}
            icon={<Mail className="w-6 h-6 text-orange-600" />}
            from="orange"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                    <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">New member joined</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Michael Rodriguez joined as Editor • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">New article published</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">"The Future of AI" by Sarah Chen • 5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">Invitation sent</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Invited alice@example.com as Editor • 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
      )}

      {/* Members */}
      {activeTab === "members" && (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="contributor">Contributor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              {/* {selectedMembers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedMembers.length} selected
                  </span>
                  <button
                    onClick={() => handleBulkAction('remove')}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              )} */}
            </div>

            {/* Pending Invitations */}
            {pendingInvitations.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Pending Invitations ({pendingInvitations.length})</span>
                </h3>
                <div className="space-y-3">
                  {pendingInvitations.map((invitation) => {
                    const RoleIcon = roleIcons[invitation.role];
                    return (
                      <div key={invitation.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                            <Mail className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{invitation.email}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs capitalize ${roleColors[invitation.role]}`}>
                                <RoleIcon className="w-3 h-3" />
                                <span>{invitation.role}</span>
                              </span>
                              <span>•</span>
                              <span>Invited by {invitation.invitedBy}</span>
                              <span>•</span>
                              {/* <span>{format(invitation.invitedAt, 'MMM d')}</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Organization Members ({filteredMembers.length})
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMembers.map((member) => {
                  const RoleIcon = roleIcons[member.role];
                  // const isSelected = selectedMembers.includes(member.id);
                  console.log("Member:", member);
                  
                  return (
                    <div
                      key={member.id}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            // checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // setSelectedMembers([...selectedMembers, member.id]);
                              } else {
                                // setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                              }
                            }}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                          />
                          
                          <img
                            src={member.user.avatar}
                            alt={member.user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {member.user.name}
                              </h4>
                              {member.role === 'admin' && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{member.user.email}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs capitalize ${roleColors[member.role]}`}>
                                <RoleIcon className="w-3 h-3" />
                                <span>{member.role}</span>
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {/* Joined {format(member.joinedAt, 'MMM d, yyyy')} */}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/profile/${member.user.username}`}
                            className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          
                          {/* {member.user.id !== user.id && ( */}
                            <>
                              <select
                                value={member.role}
                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                              >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="contributor">Contributor</option>
                                <option value="viewer">Viewer</option>
                              </select>
                              
                              <button
                                // onClick={() => handleRemoveMember(member.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                <UserMinus className="w-4 h-4" />
                              </button>
                            </>
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
      )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-white dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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

      {/* Settings */}
      {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Organization Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue={organization.name}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={organization.description}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Delete Organization</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Permanently delete this organization and all its data. This action cannot be undone.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Analytics */}
       {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Member Growth</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-2">+12%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Article Engagement</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">2.4k</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">total interactions</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Contributors</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  {organization.members.filter(m => m.role !== 'viewer').length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">this month</p>
              </div>
            </div>
          </div>
        )}

      {/* Invite Modal */}
      {organization && (
        <OrganizationModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          organization={{
            id: organization._id,
            name: organization.name,
            slug: organization.slug,
            logo: organization.logoUrl,
          }}
        />
      )}
    </div>
  );
};

export default OrganizationManage;

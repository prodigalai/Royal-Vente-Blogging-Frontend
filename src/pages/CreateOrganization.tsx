import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Upload, UserPlus, X, Mail, Shield, Edit, Eye, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface TeamMember {
  email: string;
  role: 'admin' | 'editor' | 'contributor' | 'viewer';
}

const api = axios.create({
  baseURL: 'https://royal-vente-blogging-system.onrender.com/api/v1',
});

const CreateOrganization: React.FC = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    isPublic: true,
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<TeamMember['role']>('contributor');

  if (!token) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to create an organization.</p>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTeamMember = () => {
    if (newMemberEmail.trim() && !teamMembers.some(member => member.email === newMemberEmail)) {
      setTeamMembers(prev => [...prev, { email: newMemberEmail.trim(), role: newMemberRole }]);
      setNewMemberEmail('');
    }
  };

  const removeTeamMember = (email: string) => {
    setTeamMembers(prev => prev.filter(member => member.email !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('Creating organization:', { ...formData, teamMembers });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    admin: Shield,
    editor: Edit,
    contributor: UserPlus,
    viewer: Eye,
  };

  const roleColors = {
    admin: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    editor: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    contributor: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
    viewer: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  };

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-xl">
              <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Create Organization
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Set up your organization and invite team members</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Basic Information</span>
              </h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="Describe your organization's mission and goals"
                />
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo URL (optional)
                </label>
                <div className="flex space-x-3">
                  <input
                    type="url"
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    placeholder="https://example.com/logo.png"
                  />
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                </div>
                {formData.logo && (
                  <div className="mt-3 flex items-center space-x-3">
                    <img
                      src={formData.logo}
                      alt="Organization logo preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Logo preview</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="isPublic" className="flex-1">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    Make this organization public
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Public organizations are visible to everyone and can be discovered by other users
                  </span>
                </label>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Members</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Invite team members to collaborate on your organization.</p>
              
              {/* Add Member Form */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as TeamMember['role'])}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="contributor">Contributor</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    disabled={!newMemberEmail.trim()}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Team Members List */}
              {teamMembers.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Invited Members ({teamMembers.length})</h3>
                  <div className="space-y-2">
                    {teamMembers.map((member, index) => {
                      const RoleIcon = roleIcons[member.role];
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <Mail className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <span className="text-gray-900 dark:text-white font-medium">{member.email}</span>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs rounded-full capitalize ${roleColors[member.role]}`}>
                                  <RoleIcon className="w-3 h-3" />
                                  <span>{member.role}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTeamMember(member.email)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Role Descriptions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-4 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Role Permissions</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <strong className="text-red-700 dark:text-red-300">Admin:</strong>
                        <p className="text-blue-700 dark:text-blue-300">Full control over organization, manage members and settings</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Edit className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-blue-700 dark:text-blue-300">Editor:</strong>
                        <p className="text-blue-700 dark:text-blue-300">Create and edit all articles, manage content</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <UserPlus className="w-4 h-4 text-emerald-600 mt-0.5" />
                      <div>
                        <strong className="text-emerald-700 dark:text-emerald-300">Contributor:</strong>
                        <p className="text-blue-700 dark:text-blue-300">Create and edit own articles</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Eye className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <strong className="text-gray-700 dark:text-gray-300">Viewer:</strong>
                        <p className="text-blue-700 dark:text-blue-300">View organization content only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Creating...' : 'Create Organization'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateOrganization;
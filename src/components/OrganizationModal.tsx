import React, { useState } from 'react';
import { X, Building2, Send } from 'lucide-react';
import api from '../utils/axios';

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
  };
}

const OrganizationModal: React.FC<OrganizationModalProps> = ({
  isOpen,
  onClose,
  organization,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const invitationData = {
      email,
      role,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/orgs/${organization.slug}/invitations`,
        invitationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (!data.success) {
        throw new Error(data.message || 'Failed to send invitation');
      }

      // Reset form
      setEmail('');
      setRole('member');
      setLoading(false);
      
      // Show success message
      alert('Invitation sent successfully!');
      
      // Close modal after successful invitation
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Invite Team Member
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Organization
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                {organization.logo ? (
                  <img
                    src={organization.logo}
                    alt={organization.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {organization.name}
                </span>
              </div>
              <button
                type="button"
                className="text-[#1495ff] dark:text-[#1495ff] hover:text-[#1495ff] dark:hover:text-[#1495ff] font-medium text-sm transition-colors"
              >
                Change
              </button>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1495ff] focus:border-[#1495ff] dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1495ff] focus:border-[#1495ff] dark:bg-gray-700 dark:text-white transition-colors appearance-none bg-white dark:bg-gray-700"
            >
              <option value="member">Member</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !email}
              className="flex-1 flex items-center justify-center space-x-2 bg-[#1495ff] dark:bg-[#1495ff] text-white px-6 py-3 rounded-lg hover:bg-[#1495ff] dark:hover:bg-[#1495ff] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Invite'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationModal;

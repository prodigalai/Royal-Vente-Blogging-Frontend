import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, BookOpen } from 'lucide-react';

// Organization Interface
interface Organization {
  _id: string;
  name: string;
  slug: string;
  description: string;
  owner: {
    _id: string;
    username: string;
    email: string;
  };
  stats: {
    memberCount: number;
    postCount: number;
    followerCount: number;
  };
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isPublic: boolean;
}

// Organization Card Component
const OrganizationCard: React.FC<{ organization: Organization }> = ({ organization }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Building2 className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{organization.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{organization.stats.postCount} Posts</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{organization.stats.memberCount} Members</span>
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {organization.description || 'No description available'}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/organization/${organization.slug}`}
          className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors"
        >
          View Details
        </Link>
        <span
          className={`text-sm font-semibold ${
            organization.isVerified ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {organization.isVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>
    </div>
  );
};

// Main Component for fetching and displaying organizations
const UserOrganizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage

      if (!token) {
        setError('No token found, please log in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://royal-vente-blogging-system.onrender.com/api/v1/orgs/created-by/68444842cfc48792570c4361', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Send the token as a Bearer token
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.success) {
          setOrganizations(data.data); // Assuming response contains 'data' key
        } else {
          setError('Failed to fetch organizations');
        }
      } catch (error) {
        setError('An error occurred while fetching organizations');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error if there was an issue with fetching data
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors p-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Your Organizations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizations.map((org) => (
          <OrganizationCard key={org._id} organization={org} />
        ))}
      </div>
    </div>
  );
};

export default UserOrganizations;

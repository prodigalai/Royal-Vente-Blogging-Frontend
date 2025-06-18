import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const OrganizationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Getting the slug from URL
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
          setError('No token found, please log in');
          setLoading(false);
          return;
        }

        const response = await fetch(`https://royal-vente-blogging-system.onrender.com/api/v1/orgs/${slug}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setOrganization(data.data); // Assuming response contains 'data' key
        } else {
          setError('Failed to fetch organization');
        }
      } catch (error) {
        setError('An error occurred while fetching the organization');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchOrganization();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back Button */}
      <Link
        to="/organizations"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
      >
        <Building2 className="w-5 h-5" />
        <span>Back to Organizations</span>
      </Link>

      {/* Organization Info */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Building2 className="w-10 h-10 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{organization.name}</h1>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
          <span className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{organization.stats.postCount} Posts</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{organization.stats.memberCount} Members</span>
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{organization.description || 'No description available'}</p>

        <div className="mt-4 flex items-center space-x-4">
          <span
            className={`text-sm font-semibold ${
              organization.isVerified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {organization.isVerified ? 'Verified' : 'Unverified'}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Created on: {new Date(organization.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;

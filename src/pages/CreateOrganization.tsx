import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Upload, UserPlus, X, Mail, Shield, Edit, Eye, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axios';

interface TeamMember {
  email: string;
  role: 'admin' | 'editor' | 'contributor' | 'viewer';
}

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      setFormData(prev => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setFormData(prev => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post(
        '/orgs',
        {
          name: formData.name,
          description: formData.description,
          // logo: formData.logo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error creating organization:', error);
      alert('Failed to create organization. Please check your inputs or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-600 dark:to-primary-700 rounded-xl">
            <Building2 className="w-6 h-6 text-[#fff] dark:text-[#fff]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Create Organization
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Set up your organization</p>
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                placeholder="Describe your organization's mission and goals"
              />
            </div>

            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo URL (optional)
              </label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
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
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
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

      {/* Modal for image upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Logo</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {/* Button to choose picture */}
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-600 transition-all duration-200"
              >
                Choose Picture
              </button>
              {/* Drag and drop area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 p-6 text-center rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700"
              >
                <p>Or drag and drop an image here</p>
              </div>
              {/* Hidden file input */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrganization;

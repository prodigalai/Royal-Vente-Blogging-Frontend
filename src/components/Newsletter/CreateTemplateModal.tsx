import React, { useState } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({ isOpen, onClose }) => {
  const { addTemplate } = useNewsletter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    preview: '',
    isPremium: false
  });

  const categories = [
    'Technology', 'Business', 'Design', 'News', 'Marketing', 
    'Education', 'Health', 'Finance', 'Travel', 'Food', 'Events', 
    'General', 'Sports', 'Culture', 'Real Estate', 'Gaming', 
    'Non-Profit', 'Fashion', 'Science'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTemplate({
      ...formData,
      uses: 0
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      category: 'General',
      preview: '',
      isPremium: false
    });

    onClose();
  };

  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    // For demo purposes, we'll use a placeholder
    const placeholderImages = [
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setFormData({ ...formData, preview: randomImage });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Template</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter template name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your template"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Preview Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview Image
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="url"
                    value={formData.preview}
                    onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex items-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    <span>Random</span>
                  </button>
                </div>
                
                {formData.preview && (
                  <div className="mt-3">
                    <img
                      src={formData.preview}
                      alt="Template preview"
                      className="w-full h-32 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Premium Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Premium Template</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mark this template as premium content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.isPremium}
                  onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
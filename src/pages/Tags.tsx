import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  TrendingUp,
  Hash,
  BookOpen,
  Eye
} from 'lucide-react';

interface TagData {
  id: string;
  name: string;
  description: string;
  articleCount: number;
  totalViews: number;
  color: string;
  createdAt: string;
}

const Tags: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  // Mock tags data
  const mockTags: TagData[] = [
    {
      id: 'tag_1',
      name: 'Technology',
      description: 'Articles about latest technology trends and innovations',
      articleCount: 24,
      totalViews: 15420,
      color: '#3B82F6',
      createdAt: '2024-01-15'
    },
    {
      id: 'tag_2',
      name: 'Design',
      description: 'UI/UX design principles and best practices',
      articleCount: 18,
      totalViews: 12350,
      color: '#8B5CF6',
      createdAt: '2024-02-01'
    },
    {
      id: 'tag_3',
      name: 'Programming',
      description: 'Coding tutorials and programming concepts',
      articleCount: 32,
      totalViews: 22100,
      color: '#10B981',
      createdAt: '2024-01-20'
    },
    {
      id: 'tag_4',
      name: 'Business',
      description: 'Business strategies and entrepreneurship',
      articleCount: 15,
      totalViews: 9800,
      color: '#F59E0B',
      createdAt: '2024-02-10'
    },
    {
      id: 'tag_5',
      name: 'AI',
      description: 'Artificial Intelligence and Machine Learning',
      articleCount: 21,
      totalViews: 18750,
      color: '#EF4444',
      createdAt: '2024-01-25'
    },
    {
      id: 'tag_6',
      name: 'Web Development',
      description: 'Frontend and backend web development',
      articleCount: 28,
      totalViews: 16900,
      color: '#06B6D4',
      createdAt: '2024-02-05'
    }
  ];

  const filteredTags = mockTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = () => {
    console.log('Creating tag:', newTag);
    setIsCreateModalOpen(false);
    setNewTag({ name: '', description: '', color: '#3B82F6' });
  };

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4',
    '#84CC16', '#F97316', '#EC4899', '#6366F1', '#14B8A6', '#F43F5E'
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tags</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize and manage your content tags
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Tag</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-[1.02] group"
          >
            <div className="p-6">
              {/* Tag Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tag.color}20` }}
                  >
                    <Hash className="w-5 h-5" style={{ color: tag.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tag.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created {new Date(tag.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {tag.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Articles</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {tag.articleCount}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Views</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {tag.totalViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Tags Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Tags</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {filteredTags
              .sort((a, b) => b.totalViews - a.totalViews)
              .slice(0, 10)
              .map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: `${tag.color}10`,
                    color: tag.color,
                    borderColor: `${tag.color}30`
                  }}
                >
                  <Hash className="w-3 h-3" />
                  <span>{tag.name}</span>
                  <span className="text-xs opacity-75">({tag.articleCount})</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Create Tag Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New Tag</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter tag name..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this tag represents..."
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewTag(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        newTag.color === color 
                          ? 'border-gray-900 dark:border-white scale-110' 
                          : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleCreateTag}
                disabled={!newTag.name.trim()}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Tag
              </button>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTags.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tags found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first tag to organize your content.'}
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create First Tag</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
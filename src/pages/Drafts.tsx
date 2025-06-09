import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

interface Draft {
  id: string;
  title: string;
  excerpt: string;
  lastModified: string;
  wordCount: number;
  tags: string[];
}

const Drafts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'modified' | 'created' | 'title'>('modified');
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);

  // Mock drafts data
  const mockDrafts: Draft[] = [
    {
      id: 'draft_1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      lastModified: '2024-12-20T14:30:00Z',
      wordCount: 1250,
      tags: ['Web Development', 'Technology', 'Future']
    },
    {
      id: 'draft_2',
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices and patterns for creating maintainable and scalable React applications...',
      lastModified: '2024-12-19T16:45:00Z',
      wordCount: 890,
      tags: ['React', 'JavaScript', 'Architecture']
    },
    {
      id: 'draft_3',
      title: 'Understanding TypeScript Generics',
      excerpt: 'A comprehensive guide to TypeScript generics and how to use them effectively...',
      lastModified: '2024-12-18T10:20:00Z',
      wordCount: 2100,
      tags: ['TypeScript', 'Programming', 'Tutorial']
    },
    {
      id: 'draft_4',
      title: 'CSS Grid vs Flexbox: When to Use What',
      excerpt: 'Comparing CSS Grid and Flexbox layout systems and their best use cases...',
      lastModified: '2024-12-17T09:15:00Z',
      wordCount: 750,
      tags: ['CSS', 'Layout', 'Design']
    }
  ];

  const filteredDrafts = mockDrafts
    .filter(draft => 
      draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
        default:
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
    });

  const toggleDraftSelection = (draftId: string) => {
    setSelectedDrafts(prev => 
      prev.includes(draftId) 
        ? prev.filter(id => id !== draftId)
        : [...prev, draftId]
    );
  };

  const handleBulkDelete = () => {
    console.log('Deleting drafts:', selectedDrafts);
    setSelectedDrafts([]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              My Drafts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue working on your unpublished articles
            </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            <FileText className="w-5 h-5" />
            <span>New Draft</span>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search drafts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'modified' | 'created' | 'title')}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="modified">Last Modified</option>
              <option value="created">Date Created</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedDrafts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDrafts.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {filteredDrafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={selectedDrafts.includes(draft.id)}
                    onChange={() => toggleDraftSelection(draft.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {draft.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {draft.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {draft.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Modified {format(new Date(draft.lastModified), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{format(new Date(draft.lastModified), 'h:mm a')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{draft.wordCount} words</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/edit/${draft.id}`}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrafts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No drafts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Start writing your first draft.'}
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
          >
            <FileText className="w-5 h-5" />
            <span>Create New Draft</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Drafts;
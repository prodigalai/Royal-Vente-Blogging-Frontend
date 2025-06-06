import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Heart, 
  Clock, 
  Search, 
  Filter, 
  Tag,
  User,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { mockArticles } from '../utils/mockData';
import { format } from 'date-fns';

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  // Get all unique tags
  const allTags = Array.from(new Set(mockArticles.flatMap(article => article.tags)));

  // Filter and sort articles
  const filteredArticles = mockArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return b.likes - a.likes;
        default:
          return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
      }
    });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blogs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover and explore our collection of Blogs
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>Write Blogs</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'trending')}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Viewed</option>
              <option value="trending">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-[1.02] group"
          >
            {article.coverImage && (
              <div className="aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(article.publishedAt!), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            <span>Write the first article</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Articles;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  BookOpen,
  Users,
  Building2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {mockArticles, mockOrganizations, mockTags } from '../data/mockData';
import ArticleCard from '../components/Article/ArticleCard';

const featuredArticle = mockArticles[0];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('featured');
  const [currentIndex, setCurrentIndex] = useState(0);
const featuredArticles = mockArticles.slice(0, 5); // or however many you want to rotate

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredArticles.length);
  }, 3000); // change slide every 5 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, [featuredArticles.length]);


  const otherArticles = mockArticles.slice(1);

  const getTabArticles = () => {
    switch (activeTab) {
      case 'recent':
        return [...mockArticles].sort((a, b) => {
          const dateA = new Date(a.publishedAt).getTime();
          const dateB = new Date(b.publishedAt).getTime();
          return dateB - dateA;
        });
      case 'trending':
        return [...mockArticles].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return mockArticles;
    }
  };

  return (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 w-full px-4 mt-5">
      {/* Main Content */}
      <div className="lg:col-span-4">
        {/* Featured Article */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Star className="w-5 h-5 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Story</h2>
          </div>
          <ArticleCard article={featuredArticles[currentIndex]} variant="featured" />
        </section>

        {/* Article Tabs */}
        <section>
          <div className="flex items-center space-x-6 mb-8 border-b border-gray-200 dark:border-gray-700">
            {[
              { key: 'featured', label: 'Featured', icon: Star },
              { key: 'recent', label: 'Recent', icon: Clock },
              { key: 'trending', label: 'Trending', icon: TrendingUp },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-200 ${
                  activeTab === key
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {getTabArticles().map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-3">
        <div className="sticky top-4 space-y-6 h-screen overflow-y-auto pb-8 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {/* Trending Topics */}
          <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600 w-full">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Topics</h3>
            </div>
            <div className="space-y-2">
              {mockTags.slice(0, 6).map((tag) => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block group p-2.5 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-600 font-medium transition-colors text-sm">
                      {tag.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      20M
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    10k followers
                  </p>
                </Link>
              ))}
            </div>
            <Link
              to="/tags"
              className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-600 font-medium mt-3 transition-colors text-sm"
            >
              <span>See all topics</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </section>

          {/* Featured Organizations */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Organizations</h3>
            </div>
            <div className="space-y-3">
              {mockOrganizations.slice(0, 3).map((org) => (
                <div key={org.id} className="group p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    {org.logo && (
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-600 transition-colors text-sm">
                        {org.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{org.articlesCount}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{org.members.length}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">
                    {org.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Reading Recommendation */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recommended for you</h3>
            <div className="space-y-3">
              {otherArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

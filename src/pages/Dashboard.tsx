import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  PenTool, 
  Eye, 
  Heart, 
  Clock, 
  ArrowRight,
  Star,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockArticles } from '../utils/mockData';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user, organization } = useAuth();

  const stats = [
    {
      name: 'Total Articles',
      value: '12',
      change: '+4.75%',
      changeType: 'positive',
      icon: BookOpen,
    },
    {
      name: 'Total Views',
      value: '2,760',
      change: '+12.02%',
      changeType: 'positive',
      icon: Eye,
    },
    {
      name: 'Total Likes',
      value: '105',
      change: '+8.15%',
      changeType: 'positive',
      icon: Heart,
    },
    {
      name: 'Reading Time',
      value: '24 min',
      change: 'avg',
      changeType: 'neutral',
      icon: Clock,
    },
  ];

  const recentArticles = mockArticles.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-primary-100 text-lg mb-4">
              Ready to create something amazing today?
            </p>
            {organization && (
              <div className="flex items-center space-x-2 text-primary-100">
                <span className="text-sm">Working with</span>
                <span className="font-semibold text-white">{organization.name}</span>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <Link
              to="/create"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-3 text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <PenTool className="w-5 h-5" />
                <span>Write Article</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-500' 
                    : stat.changeType === 'negative' 
                    ? 'text-red-500' 
                    : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative' 
                    ? 'text-red-600' 
                    : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {stat.changeType !== 'neutral' && 'from last month'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Articles</h2>
                <Link
                  to="/articles"
                  className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentArticles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {article.coverImage && (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(article.publishedAt!), 'MMM d')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/create"
                className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Write Article</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create new content</p>
                </div>
              </Link>
              
              <Link
                to="/drafts"
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">View Drafts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Continue writing</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Article published</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">New follower</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Draft saved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Great job!</h3>
                <p className="text-accent-100 text-sm">
                  Your articles are performing well this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Heart, 
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Star,
  Calendar,
  User as UserIcon,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockArticles } from '../utils/mockData';
import { format } from 'date-fns';

const staffPicks = [
  {
    id: 1,
    title: "Why ChatGPT Creates Scientific Citations — That Don't Exist",
    author: 'Sam Westreich, PhD',
    publication: 'Age of Awareness',
    daysAgo: 2,
    icon: '🟩',
  },
  {
    id: 2,
    title: 'How to—Finally—Change Your Name',
    author: 'Hilde Festerling',
    publication: 'The DIY Diaries',
    daysAgo: 2,
    icon: '🟫',
  },
  {
    id: 3,
    title: 'Want to just start writing? Join the "Write with Medium" June micro-challenge',
    author: 'Scott Lamb',
    publication: 'Just Start Writing',
    daysAgo: 3,
    icon: '🟨',
  },
];

const tabs = [
  { id: 'for-you', label: 'For you' },
  { id: 'following', label: 'Following' },
  { id: 'featured', label: 'Featured' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('for-you');
  const articles = mockArticles.slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="px-0 sm:px-0 lg:px-0 pt-8 w-full">
        {/* Tabs */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center space-x-8 mb-8 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-lg font-medium pb-3 transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">
          {/* Main Feed */}
          <div className="lg:col-span-8 px-8">
            {articles.map((article, idx) => (
              <React.Fragment key={article.id}>
                <div
                  className="flex flex-row items-start group py-8"
                >
                  {/* Article Info */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        by {article.author.displayName}
                      </span>
              </div>
                    <Link to={`/articles/${article.id}`} className="group/title">
                      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover/title:underline mb-1 leading-snug">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 dark:text-gray-500 mb-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{format(new Date(article.publishedAt!), 'MMM d')}</span>
                      </div>
                        <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                          <span>{article.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
                      </button>
                    </div>
                  </div>
                  {/* Article Image */}
                  {article.coverImage && (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-32 h-24 object-cover rounded-md ml-4 flex-shrink-0 self-center"
                    />
                  )}
                </div>
                {idx < articles.length - 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-800 mx-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block border-l border-gray-100 dark:border-gray-800 min-h-screen px-8">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Staff Picks</h3>
                <ul className="space-y-5">
                  {staffPicks.map((pick) => (
                    <li key={pick.id} className="flex items-start space-x-3">
                      <span className="w-8 h-8 rounded flex items-center justify-center text-xl">
                        {pick.icon}
                      </span>
                <div>
                        <p className="text-sm text-gray-900 dark:text-white font-semibold leading-tight">
                          {pick.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          In <span className="font-medium">{pick.publication}</span> by {pick.author}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{pick.daysAgo}d ago</span>
                </div>
              </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="#"
                  className="block text-primary-600 dark:text-primary-400 hover:underline text-sm mt-4"
                >
                  See the full list
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
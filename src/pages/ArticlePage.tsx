import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockArticles } from '../utils/mockData';
import { format } from 'date-fns';
import { ArrowLeft, User as UserIcon, Star } from 'lucide-react';

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

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockArticles.find(a => a.id === id);
  const [activeTab] = useState('for-you');

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h1>
          <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen w-full">
      {/* Sticky Tabs */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center space-x-8 mb-8 px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-lg font-medium pb-3 transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
            disabled
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">
        {/* Main Article Content */}
        <div className="lg:col-span-8 px-8">
          <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 object-cover rounded-xl mb-8"
            />
          )}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center space-x-3 mb-8">
            {article.author.avatarUrl ? (
              <img
                src={article.author.avatarUrl}
                alt={article.author.displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <p className="text-base font-medium text-gray-900 dark:text-white">{article.author.displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(article.publishedAt!), 'MMM d, yyyy')}</p>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
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
  );
};

export default ArticlePage; 
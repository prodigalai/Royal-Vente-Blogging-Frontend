import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPosts } from '../data/mockData';
import { format } from 'date-fns';
import { ArrowLeft, User as UserIcon, Star, Heart, MessageCircle, BookmarkPlus, Share2 } from 'lucide-react';
import MainLayout from '../components/Layout/MainLayout';

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
  const article = mockPosts.find(a => a.id === id);
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
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to stories</span>
        </Link>

        <article>
          {/* Title & Meta */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{article.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(article.createdAt), 'MMM d, yyyy')} · 8 min read</p>
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 py-4 border-y border-gray-200 dark:border-gray-700 mb-8">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Heart className="w-5 h-5" />
                <span>123</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>28</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <BookmarkPlus className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
            {article.content}
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-start space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {article.author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Software engineer passionate about AI and machine learning. Writing about tech trends and career advice.</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>12,500 followers</span>
                  <span>345 following</span>
                </div>
                <Link
                  to="/profile/1"
                  className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </MainLayout>
  );
};

export default ArticlePage; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  BookmarkPlus,
  Share2,
} from 'lucide-react';
import MainLayout from '../components/Layout/MainLayout';

const dummyArticle = {
  id: '2',
  title: 'Building a Successful Remote Team: Lessons from 5 Years of Distributed Work',
  subtitle: 'Practical strategies for managing, motivating, and scaling remote teams',
  author: {
    name: 'Alex Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    handle: 'alex_startup',
    bio: 'Entrepreneur and startup advisor. Sharing insights from building and scaling tech companies.',
    followers: 15600,
    following: 185,
  },
  date: 'Jan 12, 2024',
  readTime: '6 min read',
  tags: ['Startup', 'Career', 'Technology'],
  stats: {
    likes: 189,
    comments: 15,
  },
  coverImage:
    'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=80',
  content: `
    <p>After five years of building and managing remote teams, I've learned that successful distributed work isn't just about having the right tools—it's about creating the right culture.</p>

    <h2>Communication is Everything</h2>
    <p>Over-communication is better than under-communication in remote settings. We established clear communication protocols, regular check-ins, and made sure everyone felt heard and included.</p>

    <h2>Trust and Autonomy</h2>
    <p>Remote work thrives on trust. Instead of micromanaging, we focused on outcomes and results. This approach not only improved productivity but also job satisfaction across the team.</p>

    <h2>Building Connection</h2>
    <p>Regular virtual coffee chats, online team-building activities, and annual in-person retreats helped maintain team cohesion and company culture despite the physical distance.</p>

    <p>Remote work isn't going away. Companies that master it now will have a significant competitive advantage in attracting and retaining top talent.</p>
  `,
};

const ArticlePage = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to articles</span>
        </Link>

        {/* Title & Meta */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {dummyArticle.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {dummyArticle.subtitle}
          </p>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={dummyArticle.author.avatar}
              alt={dummyArticle.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {dummyArticle.author.name}{' '}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  @{dummyArticle.author.handle}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dummyArticle.date} · {dummyArticle.readTime}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {dummyArticle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
                fill={liked ? 'currentColor' : 'none'}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {dummyArticle.stats.likes + (liked ? 1 : 0)}
              </span>
            </button>

            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">
                {dummyArticle.stats.comments}
              </span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <BookmarkPlus
                className={`w-5 h-5 ${
                  bookmarked ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-300'
                }`}
                fill={bookmarked ? 'currentColor' : 'none'}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {bookmarked ? 'Saved' : 'Save'}
              </span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Share</span>
            </button>
          </div>
        </header>

        {/* Cover Image */}
        <div className="mb-8">
          <img
            src={dummyArticle.coverImage}
            alt={dummyArticle.title}
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: dummyArticle.content }}
        />

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-start gap-4">
            <img
              src={dummyArticle.author.avatar}
              alt={dummyArticle.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dummyArticle.author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{dummyArticle.author.bio}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{dummyArticle.author.followers.toLocaleString()} followers</span>
                <span>{dummyArticle.author.following.toLocaleString()} following</span>
              </div>
              <Link
                to={`/profile/${dummyArticle.author.handle}`}
                className="inline-block text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArticlePage;

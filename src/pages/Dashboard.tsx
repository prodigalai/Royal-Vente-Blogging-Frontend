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
  Tag as TagIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockArticles } from '../utils/mockData';
import { format } from 'date-fns';
import { mockPosts, mockTags, mockUsers } from '../data/mockData';

const trendingTopics = [
  { name: 'Technology', count: 12500, followers: 45000 },
  { name: 'Artificial Intelligence', count: 8900, followers: 32000 },
  { name: 'Startup', count: 7600, followers: 28000 },
  { name: 'Programming', count: 15200, followers: 41000 },
  { name: 'Design', count: 6800, followers: 25000 },
  { name: 'Career', count: 5400, followers: 19000 },
];

const featuredOrganizations = [
  {
    name: 'TechVenture Labs',
    members: 45,
    articles: 2,
    description: 'A leading technology incubator focused on AI and blockchain innovations.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Creative Writers Hub',
    members: 28,
    articles: 2,
    description: 'A community of writers sharing stories, tips, and creative inspiration.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const tabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'recent', label: 'Recent' },
  { id: 'trending', label: 'Trending' },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('featured');
  const featuredStory = mockPosts[0];
  const stories = mockPosts;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        {/* Featured Story */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400 text-xl">★</span> Featured Story
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/3 w-full aspect-[16/9] md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Featured"
                className="w-full h-full object-cover rounded-none md:rounded-l-2xl"
              />
            </div>
            <div className="p-8 flex flex-col justify-between md:w-1/3 w-full">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Technology</span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Artificial Intelligence</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 leading-tight">The Future of Artificial Intelligence in Software Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">Exploring how AI tools are transforming software development from code generation to automated testing and quality assurance.</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Chen" className="w-9 h-9 rounded-full border-2 border-white shadow" />
                <span className="font-medium">Sarah Chen</span>
                <span>·</span>
                <span>Jan 15, 2024</span>
                <span>·</span>
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
          {/* Main Feed */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-700 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-lg font-semibold pb-3 transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stories List */}
            <div className="space-y-10">
              {stories.map((story) => (
                <div key={story.id} className="flex flex-col md:flex-row gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={story.author.avatar} alt={story.author.name} className="w-8 h-8 rounded-full border-2 border-white shadow" />
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{story.author.name}</span>
                      <span className="text-xs text-gray-400">· {new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/articles/${story.id}`} className="group/title">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover/title:underline mb-1 leading-snug">
                        {story.title}
                      </h3>
                    </Link>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {story.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {story.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full shadow-sm">
                          <TagIcon className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 123</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 8</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 1.2k</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="md:w-48 w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                      alt={story.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 w-full">
            {/* Trending Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Trending Topics</h3>
              <ul className="space-y-4">
                {trendingTopics.map((topic) => (
                  <li key={topic.name} className="flex items-center justify-between">
                    <span className="text-base text-gray-700 dark:text-gray-200 font-medium">{topic.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{topic.count.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <Link to="#" className="block text-green-600 dark:text-green-400 hover:underline text-sm mt-6">See all topics <ArrowRight className="inline w-4 h-4" /></Link>
            </div>
            {/* Featured Organizations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Featured Organizations</h3>
              <ul className="space-y-6">
                {featuredOrganizations.map((org) => (
                  <li key={org.name} className="flex items-start gap-3">
                    <img src={org.avatar} alt={org.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow" />
                    <div>
                      <span className="text-base font-semibold text-gray-900 dark:text-white">{org.name}</span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{org.members} members · {org.articles} articles</div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{org.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
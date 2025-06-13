import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, BookText as TikTok, Plus, Settings, BarChart3, Calendar, Share2, Users, MessageCircle, Heart, Repeat, Eye, ExternalLink } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok';
  content: string;
  scheduledAt?: Date;
  status: 'draft' | 'scheduled' | 'published';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  createdAt: Date;
}

const SocialMediaTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'analytics' | 'settings'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const socialAccounts = [
    { platform: 'facebook', name: 'Facebook Page', connected: true, followers: 12500, icon: Facebook, color: 'text-blue-600' },
    { platform: 'twitter', name: 'Twitter Account', connected: true, followers: 8300, icon: Twitter, color: 'text-blue-400' },
    { platform: 'linkedin', name: 'LinkedIn Company', connected: true, followers: 5600, icon: Linkedin, color: 'text-blue-700' },
    { platform: 'instagram', name: 'Instagram Business', connected: false, followers: 0, icon: Instagram, color: 'text-pink-600' },
    { platform: 'youtube', name: 'YouTube Channel', connected: false, followers: 0, icon: Youtube, color: 'text-red-600' },
    { platform: 'tiktok', name: 'TikTok Account', connected: false, followers: 0, icon: TikTok, color: 'text-gray-900' },
  ];

  const recentPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'facebook',
      content: 'Check out our latest newsletter about AI trends in 2024! 🚀 #AI #Technology #Newsletter',
      status: 'published',
      engagement: { likes: 45, comments: 12, shares: 8, views: 1200 },
      createdAt: new Date('2024-01-20')
    },
    {
      id: '2',
      platform: 'twitter',
      content: 'New blog post is live! Discover the future of startup funding in our latest newsletter. Link in bio 📈',
      status: 'published',
      engagement: { likes: 23, comments: 5, shares: 15, views: 890 },
      createdAt: new Date('2024-01-19')
    },
    {
      id: '3',
      platform: 'linkedin',
      content: 'Excited to share insights from our weekly tech newsletter. What trends are you watching in 2024?',
      status: 'scheduled',
      scheduledAt: new Date('2024-01-25'),
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      createdAt: new Date('2024-01-18')
    }
  ];

  const getPlatformIcon = (platform: string) => {
    const account = socialAccounts.find(acc => acc.platform === platform);
    if (!account) return Share2;
    return account.icon;
  };

  const getPlatformColor = (platform: string) => {
    const account = socialAccounts.find(acc => acc.platform === platform);
    return account?.color || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Social Media Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'posts', label: 'Posts', icon: MessageCircle },
            { key: 'analytics', label: 'Analytics', icon: BarChart3 },
            { key: 'settings', label: 'Settings', icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
                activeTab === key
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Connected Accounts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Connected Accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <div key={account.platform} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${account.color}`} />
                        <span className="font-medium text-gray-900 dark:text-white">{account.name}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        account.connected 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {account.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    {account.connected ? (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {account.followers.toLocaleString()} followers
                      </div>
                    ) : (
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Connect Account
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.slice(0, 3).map((post) => {
                  const Icon = getPlatformIcon(post.platform);
                  return (
                    <div key={post.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-5 h-5 mt-1 ${getPlatformColor(post.platform)}`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white line-clamp-2">{post.content}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="capitalize">{post.status}</span>
                            <span>{post.createdAt.toLocaleDateString()}</span>
                            {post.status === 'published' && (
                              <span>{post.engagement.likes} likes</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Engagement Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Total Likes</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">1,234</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Comments</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">456</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Repeat className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Shares</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">789</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Total Reach</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">12.5K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Posts</h3>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentPosts.map((post) => {
                const Icon = getPlatformIcon(post.platform);
                return (
                  <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Icon className={`w-6 h-6 mt-1 ${getPlatformColor(post.platform)}`} />
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white mb-2">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="capitalize">{post.status}</span>
                            <span>{post.createdAt.toLocaleDateString()}</span>
                            {post.scheduledAt && (
                              <span>Scheduled for {post.scheduledAt.toLocaleDateString()}</span>
                            )}
                          </div>
                          {post.status === 'published' && (
                            <div className="flex items-center space-x-6 mt-3 text-sm">
                              <span className="flex items-center space-x-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span>{post.engagement.likes}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4 text-blue-500" />
                                <span>{post.engagement.comments}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Repeat className="w-4 h-4 text-green-500" />
                                <span>{post.engagement.shares}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4 text-purple-500" />
                                <span>{post.engagement.views}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Followers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">26.4K</p>
                  <p className="text-sm text-green-600">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8%</p>
                  <p className="text-sm text-green-600">+0.3% vs last month</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">89.2K</p>
                  <p className="text-sm text-green-600">+18% this month</p>
                </div>
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click-through Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3%</p>
                  <p className="text-sm text-green-600">+0.1% vs industry</p>
                </div>
                <ExternalLink className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Platform Performance</h3>
            <div className="space-y-4">
              {socialAccounts.filter(acc => acc.connected).map((account) => {
                const Icon = account.icon;
                return (
                  <div key={account.platform} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Icon className={`w-6 h-6 ${account.color}`} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{account.followers.toLocaleString()} followers</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">4.2%</p>
                        <p className="text-gray-500 dark:text-gray-400">Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">12.5K</p>
                        <p className="text-gray-500 dark:text-gray-400">Reach</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">234</p>
                        <p className="text-gray-500 dark:text-gray-400">Clicks</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Social Media Settings</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Auto-share Newsletter</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically share new newsletters on social media</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Cross-platform Posting</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Post to multiple platforms simultaneously</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Analytics Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track social media performance and engagement</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaTab;
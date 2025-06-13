import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Users, Send, BarChart3, Plus, Eye, Edit3, Trash2, 
  Calendar, TrendingUp, Filter, Search, MoreHorizontal,
  FileText, Settings, Target, Clock, CheckCircle, XCircle,
  Download, Upload, Copy, ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

interface Newsletter {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  isActive: boolean;
  createdAt: Date;
  lastSent?: Date;
}

interface Campaign {
  id: string;
  subject: string;
  newsletter: string;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  recipients: number;
  openRate?: number;
  clickRate?: number;
  sentAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
}

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'basic' | 'business' | 'creative' | 'newsletter';
  isCustom: boolean;
}

const Newsletter: React.FC = () => {

  const token = localStorage.getItem("token");
  
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'newsletters' | 'subscribers' | 'templates' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const newsletters: Newsletter[] = [
    {
      id: '1',
      name: 'Tech Weekly',
      description: 'Weekly insights on technology trends and innovations',
      subscribers: 2847,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      lastSent: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Startup Stories',
      description: 'Monthly stories from successful entrepreneurs',
      subscribers: 1523,
      isActive: true,
      createdAt: new Date('2024-02-01'),
      lastSent: new Date('2024-01-18')
    }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      subject: 'The Future of AI in 2024',
      newsletter: 'Tech Weekly',
      status: 'sent',
      recipients: 2847,
      openRate: 24.5,
      clickRate: 3.2,
      sentAt: new Date('2024-01-20'),
      createdAt: new Date('2024-01-19')
    },
    {
      id: '2',
      subject: 'Building a Unicorn: Lessons Learned',
      newsletter: 'Startup Stories',
      status: 'scheduled',
      recipients: 1523,
      scheduledAt: new Date('2024-01-25'),
      createdAt: new Date('2024-01-18')
    },
    {
      id: '3',
      subject: 'Weekly Tech Roundup #47',
      newsletter: 'Tech Weekly',
      status: 'draft',
      recipients: 0,
      createdAt: new Date('2024-01-21')
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Clean Newsletter',
      description: 'Simple and clean design perfect for any content',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      category: 'newsletter',
      isCustom: false
    },
    {
      id: '2',
      name: 'Business Update',
      description: 'Professional template for business communications',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      category: 'business',
      isCustom: false
    },
    {
      id: '3',
      name: 'Creative Digest',
      description: 'Colorful and engaging design for creative content',
      thumbnail: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      category: 'creative',
      isCustom: false
    }
  ];

  const totalSubscribers = newsletters.reduce((sum, newsletter) => sum + newsletter.subscribers, 0);
  const totalCampaigns = campaigns.length;
  const avgOpenRate = campaigns.filter(c => c.openRate).reduce((sum, c) => sum + (c.openRate || 0), 0) / campaigns.filter(c => c.openRate).length || 0;

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'sent': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'sending': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'scheduled': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'draft': return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'sent': return CheckCircle;
      case 'sending': return Send;
      case 'scheduled': return Clock;
      case 'draft': return FileText;
      default: return FileText;
    }
  };

  if (!token) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">Please log in to access newsletter features.</p>
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Newsletter Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your newsletters, campaigns, and subscribers
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              to="/newsletter/create-campaign"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </Link>
            <Link
              to="/newsletter/create"
              className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>New Newsletter</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'campaigns', label: 'Campaigns', icon: Send, count: campaigns.length },
            { key: 'newsletters', label: 'Newsletters', icon: Mail, count: newsletters.length },
            { key: 'subscribers', label: 'Subscribers', icon: Users, count: totalSubscribers },
            { key: 'templates', label: 'Templates', icon: FileText },
            { key: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === key
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
              {count !== undefined && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total Subscribers</p>
                    <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{totalSubscribers.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
                    <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">+12% from last month</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Campaigns Sent</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalCampaigns}</p>
                  </div>
                  <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-lg">
                    <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">3 this month</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Open Rate</p>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{avgOpenRate.toFixed(1)}%</p>
                  </div>
                  <div className="p-3 bg-purple-200 dark:bg-purple-800 rounded-lg">
                    <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">Above industry avg</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl shadow-sm border border-orange-200 dark:border-orange-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Active Newsletters</p>
                    <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{newsletters.filter(n => n.isActive).length}</p>
                  </div>
                  <div className="p-3 bg-orange-200 dark:bg-orange-800 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">All performing well</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Campaigns */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Campaigns</h3>
                  <Link to="/newsletter/campaigns" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => {
                    const StatusIcon = getStatusIcon(campaign.status);
                    return (
                      <div key={campaign.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className={`p-2 rounded-lg ${getStatusColor(campaign.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">{campaign.subject}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{campaign.newsletter}</span>
                            <span>•</span>
                            <span className="capitalize">{campaign.status}</span>
                            {campaign.sentAt && (
                              <>
                                <span>•</span>
                                <span>{format(campaign.sentAt, 'MMM d')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {campaign.openRate && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.openRate}%</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">open rate</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Newsletter Performance</h3>
                  <Link to="/newsletter/analytics" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View analytics
                  </Link>
                </div>
                <div className="space-y-4">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{newsletter.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {newsletter.subscribers.toLocaleString()} subscribers
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          newsletter.isActive 
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          {newsletter.isActive ? 'Active' : 'Inactive'}
                        </div>
                        {newsletter.lastSent && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Last sent {format(newsletter.lastSent, 'MMM d')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sent">Sent</option>
                  <option value="sending">Sending</option>
                </select>
              </div>

              <Link
                to="/newsletter/create-campaign"
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </Link>
            </div>

            {/* Campaigns List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Email Campaigns ({campaigns.length})
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {campaigns.map((campaign) => {
                  const StatusIcon = getStatusIcon(campaign.status);
                  return (
                    <div key={campaign.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${getStatusColor(campaign.status)}`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {campaign.subject}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <span>Newsletter: {campaign.newsletter}</span>
                              <span>•</span>
                              <span>Recipients: {campaign.recipients.toLocaleString()}</span>
                              {campaign.sentAt && (
                                <>
                                  <span>•</span>
                                  <span>Sent: {format(campaign.sentAt, 'MMM d, yyyy')}</span>
                                </>
                              )}
                              {campaign.scheduledAt && (
                                <>
                                  <span>•</span>
                                  <span>Scheduled: {format(campaign.scheduledAt, 'MMM d, yyyy')}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {campaign.openRate !== undefined && (
                            <div className="text-center">
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{campaign.openRate}%</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Open Rate</p>
                            </div>
                          )}
                          
                          {campaign.clickRate !== undefined && (
                            <div className="text-center">
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{campaign.clickRate}%</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Click Rate</p>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'newsletters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Newsletters</h2>
              <Link
                to="/newsletter/create"
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Newsletter</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                        {newsletter.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {newsletter.description}
                      </p>
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      newsletter.isActive 
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {newsletter.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{newsletter.subscribers.toLocaleString()} subscribers</span>
                    </span>
                    <span>Created {format(newsletter.createdAt, 'MMM d, yyyy')}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Manage
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscriber Management</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Subscriber management coming soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Advanced subscriber management features are being developed.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Templates</h2>
              <Link
                to="/newsletter/template/create"
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Template</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                        template.isCustom
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {template.isCustom ? 'Custom' : template.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                        Use Template
                      </button>
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Newsletter Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement Rate</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-2">{avgOpenRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average across all campaigns</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Rate</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">+12%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Subscriber growth this month</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Impact</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">$2,847</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generated this month</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Campaign Performance</h3>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Detailed analytics coming soon
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced analytics and reporting features are being developed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Newsletter;
import React, { useState } from 'react';
import { Users, CheckCircle, X, TrendingUp, Upload, Download, Search, Edit3, Trash2 } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';
import { Subscriber } from '../../types/newsletter';

const SubscribersTab: React.FC = () => {
  const { subscribers, deleteSubscriber } = useNewsletter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
  const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;
  const bouncedCount = subscribers.filter(s => s.status === 'bounced').length;

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subscriber.name && subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Subscriber['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'unsubscribed':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'bounced':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const handleDeleteSubscriber = (subscriberId: string) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      deleteSubscriber(subscriberId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscriber Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSubscribers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeSubscribers}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unsubscribed</p>
              <p className="text-2xl font-bold text-red-600">{unsubscribedCount}</p>
            </div>
            <X className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
              <p className="text-2xl font-bold text-blue-600">+12%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Subscriber Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Subscribers ({filteredSubscribers.length})
            </h3>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {subscriber.name ? subscriber.name.charAt(0).toUpperCase() : subscriber.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {subscriber.name || subscriber.email}
                      </p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status}
                      </span>
                    </div>
                    {subscriber.name && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{subscriber.email}</p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Joined {subscriber.subscribedAt.toLocaleDateString()}</span>
                      {subscriber.location && (
                        <>
                          <span>•</span>
                          <span>{subscriber.location}</span>
                        </>
                      )}
                    </div>
                    {subscriber.tags.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        {subscriber.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersTab;
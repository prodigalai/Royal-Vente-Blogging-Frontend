import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Copy, Edit3, Trash2, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';
import { Campaign } from '../../types/newsletter';

const CampaignsTab: React.FC = () => {
  const { campaigns, newsletters, deleteCampaign } = useNewsletter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNewsletter, setSelectedNewsletter] = useState('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNewsletter = selectedNewsletter === 'all' || campaign.newsletter === selectedNewsletter;
    return matchesSearch && matchesNewsletter;
  });

  const getCampaignIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'sent':
        return CheckCircle;
      case 'scheduled':
        return Clock;
      case 'sending':
        return RefreshCw;
      default:
        return Edit3;
    }
  };

  const getCampaignIconColor = (status: Campaign['status']) => {
    switch (status) {
      case 'sent':
        return 'text-green-600 dark:text-green-400';
      case 'scheduled':
        return 'text-blue-600 dark:text-blue-400';
      case 'sending':
        return 'text-yellow-600 dark:text-yellow-400 animate-spin';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCampaignBgColor = (status: Campaign['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 dark:bg-green-900';
      case 'scheduled':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'sending':
        return 'bg-yellow-100 dark:bg-yellow-900';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteCampaign(campaignId);
    }
  };

  return (
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
            value={selectedNewsletter}
            onChange={(e) => setSelectedNewsletter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Newsletters</option>
            {newsletters.map((newsletter) => (
              <option key={newsletter.id} value={newsletter.name}>
                {newsletter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Campaigns ({filteredCampaigns.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredCampaigns.map((campaign) => {
            const StatusIcon = getCampaignIcon(campaign.status);
            return (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getCampaignBgColor(campaign.status)}`}>
                      <StatusIcon className={`w-5 h-5 ${getCampaignIconColor(campaign.status)}`} />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {campaign.subject}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{campaign.newsletter}</span>
                        <span className="capitalize">{campaign.status}</span>
                        {campaign.sentAt && (
                          <span>Sent {campaign.sentAt.toLocaleDateString()}</span>
                        )}
                        {campaign.scheduledAt && (
                          <span>Scheduled for {campaign.scheduledAt.toLocaleDateString()}</span>
                        )}
                      </div>
                      {campaign.status === 'sent' && (
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="text-green-600 dark:text-green-400">
                            {campaign.opens} opens ({((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)
                          </span>
                          <span className="text-blue-600 dark:text-blue-400">
                            {campaign.clicks} clicks ({((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {campaign.recipients} recipients
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampaignsTab;
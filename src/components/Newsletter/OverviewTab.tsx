import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Target, Send, CheckCircle, Clock, RefreshCw, Edit3, TrendingUp, Calendar, Mail, Zap } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';
import { Campaign } from '../../types/newsletter';
import StatsCard from './StatsCard';

const OverviewTab: React.FC = () => {
  const { newsletters, campaigns, automations, subscribers } = useNewsletter();

  const totalSubscribers = newsletters.reduce((sum, newsletter) => sum + newsletter.subscribers, 0);
  const avgOpenRate = newsletters.reduce((sum, newsletter) => sum + newsletter.openRate, 0) / newsletters.length;
  const avgClickRate = newsletters.reduce((sum, newsletter) => sum + newsletter.clickRate, 0) / newsletters.length;
  const activeCampaigns = campaigns.filter(c => c.status !== 'draft').length;
  const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled').length;

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
        return 'text-green-600';
      case 'scheduled':
        return 'text-blue-600';
      case 'sending':
        return 'text-yellow-600 animate-spin';
      default:
        return 'text-gray-600';
    }
  };

  const getCampaignBgColor = (status: Campaign['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100';
      case 'scheduled':
        return 'bg-blue-100';
      case 'sending':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Welcome back! Ready to engage your audience?</h3>
            <p className="text-emerald-700">Create campaigns, manage subscribers, and track your newsletter performance.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/newsletter/create"
              className="flex items-center space-x-2 bg-white text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors border border-emerald-200"
            >
              <Mail className="w-4 h-4" />
              <span>New Newsletter</span>
            </Link>
            <Link
              to="/newsletter/create-campaign"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Create Campaign</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Subscribers"
          value={totalSubscribers.toLocaleString()}
          subtitle="+12% this month"
          icon={Users}
          colorClass="border-emerald-200"
          gradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
        />
        
        <StatsCard
          title="Avg Open Rate"
          value={`${avgOpenRate.toFixed(1)}%`}
          subtitle="+2.3% vs industry"
          icon={Eye}
          colorClass="border-blue-200"
          gradient="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        
        <StatsCard
          title="Avg Click Rate"
          value={`${avgClickRate.toFixed(1)}%`}       
          subtitle="+0.8% vs industry"
          icon={Target}
          colorClass="border-purple-200"
          gradient="bg-gradient-to-br from-purple-50 to-purple-100"
        />
        
        <StatsCard
          title="Active Campaigns"
          value={activeCampaigns}
          subtitle={`${scheduledCampaigns} scheduled`}
          icon={Send}
          colorClass="border-orange-200"
          gradient="bg-gradient-to-br from-orange-50 to-orange-100"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            <Link
              to="/newsletter/create-campaign"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
            >
              Create New
            </Link>
          </div>
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => {
              const StatusIcon = getCampaignIcon(campaign.status);
              return (
                <div key={campaign.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${getCampaignBgColor(campaign.status)}`}>
                    <StatusIcon className={`w-4 h-4 ${getCampaignIconColor(campaign.status)}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-1">{campaign.subject}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{campaign.newsletter}</span>
                      <span>•</span>
                      <span className="capitalize">{campaign.status}</span>
                      {campaign.status === 'sent' && (
                        <>
                          <span>•</span>
                          <span>{((campaign.opens / campaign.recipients) * 100).toFixed(1)}% open rate</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter Performance</h3>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {newsletter.logo && (
                  <img
                    src={newsletter.logo}
                    alt={newsletter.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{newsletter.name}</p>
                    {newsletter.isActive && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{newsletter.subscribers.toLocaleString()} subscribers</span>
                    <span>{newsletter.openRate}% open rate</span>
                    <span>{newsletter.clickRate}% click rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automations & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Automations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Automations</h3>
            <span className="text-emerald-600 font-medium text-sm">
              {automations.filter(a => a.status === 'active').length} running
            </span>
          </div>
          <div className="space-y-4">
            {automations.slice(0, 3).map((automation) => (
              <div key={automation.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  automation.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Zap className={`w-4 h-4 ${
                    automation.status === 'active' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{automation.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      automation.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {automation.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{automation.subscribers.toLocaleString()} subscribers</span>
                    <span>•</span>
                    <span>{automation.openRate}% open rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">This Week</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-900">3</p>
                <p className="text-sm text-blue-700">Campaigns sent</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Growth Rate</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-900">+12%</p>
                <p className="text-sm text-green-700">This month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">New Subscribers</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-900">245</p>
                <p className="text-sm text-purple-700">This week</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Avg Engagement</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-orange-900">4.2%</p>
                <p className="text-sm text-orange-700">Click rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
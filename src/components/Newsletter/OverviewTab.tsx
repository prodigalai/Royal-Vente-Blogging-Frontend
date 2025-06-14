// src/components/Newsletter/OverviewTab.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Eye,
  Target,
  Send,
  CheckCircle,
  Clock,
  RefreshCw,
  Edit3,
  TrendingUp,
  Calendar,
  Mail,
  Zap,
} from "lucide-react";
import { useNewsletter } from "../../contexts/NewsletterContext";
import { Campaign } from "../../types/newsletter";
import StatsCard from "./StatsCard";

const OverviewTab: React.FC = () => {
  const { newsletters, campaigns, automations, subscribers } = useNewsletter();

  const totalSubscribers = newsletters.reduce(
    (sum, n) => sum + n.subscribers,
    0
  );
  const avgOpenRate =
    newsletters.reduce((sum, n) => sum + n.openRate, 0) / newsletters.length;
  const avgClickRate =
    newsletters.reduce((sum, n) => sum + n.clickRate, 0) / newsletters.length;
  const activeCampaigns = campaigns.filter((c) => c.status !== "draft").length;
  const scheduledCampaigns = campaigns.filter(
    (c) => c.status === "scheduled"
  ).length;

  const getCampaignIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "sent":
        return CheckCircle;
      case "scheduled":
        return Clock;
      case "sending":
        return RefreshCw;
      default:
        return Edit3;
    }
  };

  const getCampaignIconColor = (status: Campaign["status"]) => {
    switch (status) {
      case "sent":
        return "text-teal-600";
      case "scheduled":
        return "text-blue-600";
      case "sending":
        return "text-yellow-600 animate-spin";
      default:
        return "text-gray-600";
    }
  };

  const getCampaignBgColor = (status: Campaign["status"]) => {
    switch (status) {
      case "sent":
        return "bg-teal-100";
      case "scheduled":
        return "bg-blue-100";
      case "sending":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-teal-900 mb-2">
              Welcome back! Ready to engage your audience?
            </h3>
            <p className="text-teal-700">
              Create campaigns, manage subscribers, and track your newsletter
              performance.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/newsletter/create"
              className="flex items-center space-x-2 bg-white text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors border border-teal-200"
            >
              <Mail className="w-4 h-4" />
              <span>New Newsletter</span>
            </Link>
            <Link
              to="/newsletter/create-campaign"
              className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
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
          colorClass="border-teal-200"
          gradient="bg-gradient-to-br from-teal-50 to-teal-100"
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
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Campaigns
            </h3>
            <Link
              to="/newsletter/create-campaign"
              className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
            >
              Create New
            </Link>
          </div>
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((c) => {
              const Icon = getCampaignIcon(c.status);
              return (
                <div
                  key={c.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${getCampaignBgColor(c.status)}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${getCampaignIconColor(c.status)}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-1">
                      {c.subject}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{c.newsletter}</span>
                      <span>•</span>
                      <span className="capitalize">{c.status}</span>
                      {c.status === "sent" && (
                        <>
                          <span>•</span>
                          <span>
                            {((c.opens / c.recipients) * 100).toFixed(1)}% open
                            rate
                          </span>
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
            <h3 className="text-lg font-semibold text-gray-900">
              Newsletter Performance
            </h3>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {newsletters.map((n) => (
              <div
                key={n.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {n.logo && (
                  <img
                    src={n.logo}
                    alt={n.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{n.name}</p>
                    {n.isActive && (
                      <span className="w-2 h-2 bg-teal-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{n.subscribers.toLocaleString()} subscribers</span>
                    <span>{n.openRate}% open rate</span>
                    <span>{n.clickRate}% click rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automations & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Automations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Automations
            </h3>
            <span className="text-teal-600 font-medium text-sm">
              {automations.filter((a) => a.status === "active").length} running
            </span>
          </div>
          <div className="space-y-4">
            {automations.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    a.status === "active" ? "bg-teal-100" : "bg-gray-100"
                  }`}
                >
                  <Zap
                    className={`w-4 h-4 ${
                      a.status === "active" ? "text-teal-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{a.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        a.status === "active"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{a.subscribers.toLocaleString()} subscribers</span>
                    <span>•</span>
                    <span>{a.openRate}% open rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Stats
          </h3>
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

            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <span className="font-medium text-teal-900">Growth Rate</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-teal-900">+12%</p>
                <p className="text-sm text-teal-700">This month</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">
                  New Subscribers
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-900">245</p>
                <p className="text-sm text-purple-700">This week</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">
                  Avg Engagement
                </span>
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

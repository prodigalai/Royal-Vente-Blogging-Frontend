import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Send,
  BarChart3,
  Settings,
  Users,
  Palette,
  Zap,
  TrendingUp,
  Share2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNewsletter } from "../../contexts/NewsletterContext";
import { TabType } from "../../types/newsletter";
import OverviewTab from "./OverviewTab";
import CampaignsTab from "./CampaignsTab";
import TemplatesTab from "./TemplatesTab";
import SubscribersTab from "./SubscribersTab";
import AutomationsTab from "./AutomationsTab";
import AnalyticsTab from "./AnalyticsTab";
import SettingsTab from "./SettingsTab";
import SocialMediaTab from "./SocialMediaTab";

const Newsletter: React.FC = () => {
  const { user } = useAuth();
  const { campaigns, templates, subscribers, automations } = useNewsletter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to access newsletter management.
        </p>
      </div>
    );
  }

  const totalSubscribers = subscribers.length;

  const tabs = [
    { key: "overview",      label: "Overview",       icon: BarChart3 },
    { key: "campaigns",     label: "Campaigns",      icon: Send,       count: campaigns.length },
    // { key: "templates",     label: "Templates",      icon: Palette,    count: templates.length },
    { key: "subscribers",   label: "Subscribers",    icon: Users,      count: totalSubscribers },
    { key: "automations",   label: "Automations",    icon: Zap,        count: automations.length },
    { key: "social-media",  label: "Social Media",   icon: Share2 },
    { key: "analytics",     label: "Analytics",      icon: TrendingUp },
    { key: "settings",      label: "Settings",       icon: Settings },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":      return <OverviewTab />;
      case "campaigns":     return <CampaignsTab />;
      case "templates":     return <TemplatesTab />;
      case "subscribers":   return <SubscribersTab />;
      case "automations":   return <AutomationsTab />;
      case "social-media":  return <SocialMediaTab />;
      case "analytics":     return <AnalyticsTab />;
      case "settings":      return <SettingsTab />;
      default:              return <OverviewTab />;
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Newsletter Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and analyze your email campaigns with advanced
            social media integration
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Link
            to="/newsletter/create"
            className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Newsletter</span>
          </Link>
          <Link
            to="/newsletter/create-campaign"
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-400 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Send className="w-4 h-4" />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === key
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
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

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Newsletter;

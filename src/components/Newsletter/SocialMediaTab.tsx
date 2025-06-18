// src/components/Newsletter/SocialMedia/SocialMediaTab.tsx
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  BookText as TikTok,
  Plus,
  Settings,
  BarChart3,
  Calendar,
  Share2,
  Users,
  MessageCircle,
  Heart,
  Repeat,
  Eye,
  ExternalLink,
} from "lucide-react";

interface SocialPost {
  id: string;
  platform:
    | "facebook"
    | "twitter"
    | "linkedin"
    | "instagram"
    | "youtube"
    | "tiktok";
  content: string;
  scheduledAt?: Date;
  status: "draft" | "scheduled" | "published";
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  createdAt: Date;
}

const SocialMediaTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "posts" | "analytics" | "settings"
  >("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const socialAccounts = [
    {
      platform: "facebook",
      name: "Facebook Page",
      connected: true,
      followers: 12500,
      icon: Facebook,
      color: "text-blue-600",
    },
    {
      platform: "twitter",
      name: "Twitter Account",
      connected: true,
      followers: 8300,
      icon: Twitter,
      color: "text-blue-400",
    },
    {
      platform: "linkedin",
      name: "LinkedIn Company",
      connected: true,
      followers: 5600,
      icon: Linkedin,
      color: "text-blue-700",
    },
    {
      platform: "instagram",
      name: "Instagram Business",
      connected: false,
      followers: 0,
      icon: Instagram,
      color: "text-pink-600",
    },
    {
      platform: "youtube",
      name: "YouTube Channel",
      connected: false,
      followers: 0,
      icon: Youtube,
      color: "text-red-600",
    },
    {
      platform: "tiktok",
      name: "TikTok Account",
      connected: false,
      followers: 0,
      icon: TikTok,
      color: "text-gray-900",
    },
  ];

  const recentPosts: SocialPost[] = [
    {
      id: "1",
      platform: "facebook",
      content:
        "Check out our latest newsletter about AI trends in 2024! 🚀 #AI #Technology #Newsletter",
      status: "published",
      engagement: { likes: 45, comments: 12, shares: 8, views: 1200 },
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "2",
      platform: "twitter",
      content:
        "New blog post is live! Discover the future of startup funding in our latest newsletter. Link in bio 📈",
      status: "published",
      engagement: { likes: 23, comments: 5, shares: 15, views: 890 },
      createdAt: new Date("2024-01-19"),
    },
    {
      id: "3",
      platform: "linkedin",
      content:
        "Excited to share insights from our weekly tech newsletter. What trends are you watching in 2024?",
      status: "scheduled",
      scheduledAt: new Date("2024-01-25"),
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      createdAt: new Date("2024-01-18"),
    },
  ];

  const getPlatformIcon = (platform: string) => {
    const account = socialAccounts.find((acc) => acc.platform === platform);
    return account?.icon || Share2;
  };

  const getPlatformColor = (platform: string) => {
    const account = socialAccounts.find((acc) => acc.platform === platform);
    return account?.color || "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social Media Dashboard</h2>
          <p className="text-gray-600">
            Manage your social accounts, posts, and insights in one place
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-6 border-b border-gray-200 pt-6">
        {[
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "posts", label: "Posts", icon: MessageCircle },
          { key: "analytics", label: "Analytics", icon: BarChart3 },
          { key: "settings", label: "Settings", icon: Settings },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
              activeTab === key
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>


      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Accounts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Connected Accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <div key={acc.platform} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${acc.color}`} />
                        <span className="font-medium">{acc.name}</span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          acc.connected
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {acc.connected ? "Connected" : "Not Connected"}
                      </span>
                    </div>
                    {acc.connected ? (
                      <div className="text-sm text-gray-600">
                        {acc.followers.toLocaleString()} followers
                      </div>
                    ) : (
                      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                        Connect Account
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent & Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.slice(0, 3).map((post) => {
                  const Icon = getPlatformIcon(post.platform);
                  return (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Icon
                          className={`w-5 h-5 mt-1 ${getPlatformColor(
                            post.platform
                          )}`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-2">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="capitalize">{post.status}</span>
                            <span>{post.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">
                Engagement Overview
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Heart,
                    label: "Total Likes",
                    value: 1234,
                    color: "text-red-500",
                  },
                  {
                    icon: MessageCircle,
                    label: "Comments",
                    value: 456,
                    color: "text-blue-500",
                  },
                  {
                    icon: Repeat,
                    label: "Shares",
                    value: 789,
                    color: "text-green-500",
                  },
                  {
                    icon: Eye,
                    label: "Total Reach",
                    value: "12.5K",
                    color: "text-purple-500",
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="font-medium">{label}</span>
                    </div>
                    <span className="text-lg font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      {activeTab === "posts" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">All Posts</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPosts.map((post) => {
              const Icon = getPlatformIcon(post.platform);
              return (
                <div
                  key={post.id}
                  className="p-6 hover:bg-gray-50 transition-colors flex justify-between"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <Icon
                      className={`w-6 h-6 mt-1 ${getPlatformColor(
                        post.platform
                      )}`}
                    />
                    <div>
                      <p className="text-gray-900 mb-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{post.status}</span>
                        <span>{post.createdAt.toLocaleDateString()}</span>
                        {post.scheduledAt && (
                          <span>
                            Scheduled for{" "}
                            {post.scheduledAt.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {post.status === "published" && (
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
                    <button className="p-2 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-gray-100">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Total Followers",
                value: "26.4K",
                icon: Users,
                color: "text-teal-600",
              },
              {
                label: "Engagement Rate",
                value: "4.8%",
                icon: Heart,
                color: "text-red-500",
              },
              {
                label: "Total Reach",
                value: "89.2K",
                icon: Eye,
                color: "text-purple-500",
              },
              {
                label: "Click-through Rate",
                value: "2.3%",
                icon: ExternalLink,
                color: "text-blue-600",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Platform Performance</h3>
            <div className="space-y-4">
              {socialAccounts
                .filter((a) => a.connected)
                .map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <div
                      key={acc.platform}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-6 h-6 ${acc.color}`} />
                        <div>
                          <p className="font-medium">{acc.name}</p>
                          <p className="text-sm text-gray-600">
                            {acc.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">4.2%</p>
                          <p className="text-gray-500">Engagement</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">12.5K</p>
                          <p className="text-gray-500">Reach</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">234</p>
                          <p className="text-gray-500">Clicks</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">
              Social Media Settings
            </h3>
            {[
              {
                label: "Auto-share Newsletter",
                desc: "Automatically share new newsletters on social media",
              },
              {
                label: "Cross-platform Posting",
                desc: "Post to multiple platforms simultaneously",
              },
              {
                label: "Analytics Tracking",
                desc: "Track social media performance and engagement",
              },
            ].map(({ label, desc }) => (
              <div
                key={label}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{label}</h4>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaTab;

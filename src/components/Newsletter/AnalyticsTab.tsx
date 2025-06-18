// src/components/Newsletter/Analytics/AnalyticsTab.tsx
import React, { useState } from "react";
import {
  Send,
  Eye,
  Target,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNewsletter } from "../../contexts/NewsletterContext";

const AnalyticsTab: React.FC = () => {
  const { campaigns, newsletters } = useNewsletter();
  const [dateRange, setDateRange] = useState<"7" | "30" | "90" | "365">("30");
  const [selectedMetric, setSelectedMetric] = useState<
    "opens" | "clicks" | "subscribers"
  >("opens");

  // Compute totals from sent campaigns
  const sentCampaigns = campaigns.filter((c) => c.status === "sent");
  const totalSent = sentCampaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalOpens = sentCampaigns.reduce((sum, c) => sum + c.opens, 0);
  const totalClicks = sentCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgOpenRate = totalSent ? (totalOpens / totalSent) * 100 : 0;
  const avgClickRate = totalSent ? (totalClicks / totalSent) * 100 : 0;
  const unsubscribeRate = 0.8;

  // Mock chart data
  const chartData = {
    opens: [
      { date: "2024-01-01", value: 245 },
      { date: "2024-01-02", value: 312 },
      { date: "2024-01-03", value: 189 },
      { date: "2024-01-04", value: 456 },
      { date: "2024-01-05", value: 378 },
      { date: "2024-01-06", value: 523 },
      { date: "2024-01-07", value: 445 },
    ],
    clicks: [
      { date: "2024-01-01", value: 45 },
      { date: "2024-01-02", value: 62 },
      { date: "2024-01-03", value: 38 },
      { date: "2024-01-04", value: 89 },
      { date: "2024-01-05", value: 76 },
      { date: "2024-01-06", value: 102 },
      { date: "2024-01-07", value: 87 },
    ],
    subscribers: [
      { date: "2024-01-01", value: 4200 },
      { date: "2024-01-02", value: 4245 },
      { date: "2024-01-03", value: 4189 },
      { date: "2024-01-04", value: 4356 },
      { date: "2024-01-05", value: 4378 },
      { date: "2024-01-06", value: 4423 },
      { date: "2024-01-07", value: 4445 },
    ],
  };

  // Color map for metrics (primary teal green)
  const colorMap: Record<string, string> = {
    opens: "#14b8a6", // Tailwind teal-500
    clicks: "#8b5cf6",
    subscribers: "#3b82f6",
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Track your newsletter performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSent.toLocaleString()}
              </p>
              <p className="text-sm text-teal-600">+15% vs last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {avgOpenRate.toFixed(1)}%
              </p>
              <p className="text-sm text-teal-600">+2.1% vs industry</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <Eye className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {avgClickRate.toFixed(1)}%
              </p>
              <p className="text-sm text-green-600">+0.5% vs industry</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Unsubscribe Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {unsubscribeRate}%
              </p>
              <p className="text-sm text-red-600">-0.2% vs last month</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Performance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Email Performance Trends
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="opens">Opens</option>
              <option value="clicks">Clicks</option>
              <option value="subscribers">Subscribers</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData[selectedMetric]}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colorMap[selectedMetric]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Subscriber Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Subscriber Growth
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData.subscribers}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colorMap.subscribers}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">+245</p>
              <p className="text-sm text-gray-600">New subscribers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">-12</p>
              <p className="text-sm text-gray-600">Unsubscribed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5.2%</p>
              <p className="text-sm text-gray-600">Growth rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Campaigns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Performing Campaigns
          </h3>
          <div className="space-y-4">
            {sentCampaigns
              .sort((a, b) => b.opens / b.recipients - a.opens / a.recipients)
              .slice(0, 5)
              .map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-bold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {campaign.subject}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {campaign.newsletter}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        {((campaign.opens / campaign.recipients) * 100).toFixed(
                          1
                        )}
                        %
                      </p>
                      <p className="text-gray-500">Open Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        {(
                          (campaign.clicks / campaign.recipients) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                      <p className="text-gray-500">Click Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        {campaign.recipients.toLocaleString()}
                      </p>
                      <p className="text-gray-500">Recipients</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Newsletter Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Newsletter Performance
          </h3>
          <div className="space-y-4">
            {newsletters.map((n) => (
              <div key={n.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  {n.logo && (
                    <img
                      src={n.logo}
                      alt={n.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{n.name}</p>
                    <p className="text-sm text-gray-500">
                      {n.subscribers.toLocaleString()} subscribers
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Open Rate</span>
                    <span className="font-medium">{n.openRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${n.openRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Click Rate</span>
                    <span className="font-medium">{n.clickRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${n.clickRate * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Heatmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Engagement Heatmap
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 p-2"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 28 }).map((_, i) => {
            const intensity = Math.random();
            const bgColor =
              intensity > 0.7
                ? "bg-teal-600"
                : intensity > 0.5
                ? "bg-teal-400"
                : intensity > 0.3
                ? "bg-teal-200"
                : "bg-gray-100";
            return (
              <div
                key={i}
                className={`h-8 rounded ${bgColor} hover:scale-110 transition-transform cursor-pointer`}
                title={`${Math.round(intensity * 100)}% engagement`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>Less engagement</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <div className="w-3 h-3 bg-teal-200 rounded"></div>
            <div className="w-3 h-3 bg-teal-400 rounded"></div>
            <div className="w-3 h-3 bg-teal-600 rounded"></div>
          </div>
          <span>More engagement</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;

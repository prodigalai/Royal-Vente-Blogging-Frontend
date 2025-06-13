import React, { useState } from 'react';
import { Send, Eye, Target, AlertCircle, BarChart3, TrendingUp, Users, Calendar, Download, Filter } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';

const AnalyticsTab: React.FC = () => {
  const { campaigns, newsletters } = useNewsletter();
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('opens');

  const sentCampaigns = campaigns.filter(c => c.status === 'sent');
  const totalSent = sentCampaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const totalOpens = sentCampaigns.reduce((sum, campaign) => sum + campaign.opens, 0);
  const totalClicks = sentCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  
  const avgOpenRate = totalSent > 0 ? (totalOpens / totalSent) * 100 : 0;
  const avgClickRate = totalSent > 0 ? (totalClicks / totalSent) * 100 : 0;
  const unsubscribeRate = 0.8;

  // Mock chart data
  const chartData = {
    opens: [
      { date: '2024-01-01', value: 245 },
      { date: '2024-01-02', value: 312 },
      { date: '2024-01-03', value: 189 },
      { date: '2024-01-04', value: 456 },
      { date: '2024-01-05', value: 378 },
      { date: '2024-01-06', value: 523 },
      { date: '2024-01-07', value: 445 }
    ],
    clicks: [
      { date: '2024-01-01', value: 45 },
      { date: '2024-01-02', value: 62 },
      { date: '2024-01-03', value: 38 },
      { date: '2024-01-04', value: 89 },
      { date: '2024-01-05', value: 76 },
      { date: '2024-01-06', value: 102 },
      { date: '2024-01-07', value: 87 }
    ],
    subscribers: [
      { date: '2024-01-01', value: 4200 },
      { date: '2024-01-02', value: 4245 },
      { date: '2024-01-03', value: 4189 },
      { date: '2024-01-04', value: 4356 },
      { date: '2024-01-05', value: 4378 },
      { date: '2024-01-06', value: 4423 },
      { date: '2024-01-07', value: 4445 }
    ]
  };

  const SimpleChart = ({ data, color, height = 120 }: { data: any[], color: string, height?: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;

    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1="0"
              y1={height * ratio}
              x2="100%"
              y2={height * ratio}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = height - ((point.value - minValue) / range) * height;
              return `${x}%,${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = height - ((point.value - minValue) / range) * height;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={y}
                r="4"
                fill={color}
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
          <span>{maxValue.toLocaleString()}</span>
          <span>{Math.round(minValue + range * 0.75).toLocaleString()}</span>
          <span>{Math.round(minValue + range * 0.5).toLocaleString()}</span>
          <span>{Math.round(minValue + range * 0.25).toLocaleString()}</span>
          <span>{minValue.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your newsletter performance and engagement metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
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
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">{totalSent.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% vs last month</p>
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
              <p className="text-2xl font-bold text-gray-900">{avgOpenRate.toFixed(1)}%</p>
              <p className="text-sm text-green-600">+2.1% vs industry</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">{avgClickRate.toFixed(1)}%</p>
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
              <p className="text-sm font-medium text-gray-600">Unsubscribe Rate</p>
              <p className="text-2xl font-bold text-gray-900">{unsubscribeRate}%</p>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Email Performance Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="opens">Opens</option>
              <option value="clicks">Clicks</option>
              <option value="subscribers">Subscribers</option>
            </select>
          </div>
          
          <div className="mb-4">
            <SimpleChart 
              data={chartData[selectedMetric as keyof typeof chartData]} 
              color={selectedMetric === 'opens' ? '#10b981' : selectedMetric === 'clicks' ? '#8b5cf6' : '#3b82f6'}
              height={200}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Subscriber Growth</h3>
          
          <div className="mb-4">
            <SimpleChart 
              data={chartData.subscribers} 
              color="#f59e0b"
              height={200}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">+245</p>
              <p className="text-sm text-gray-600">New subscribers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">-12</p>
              <p className="text-sm text-gray-600">Unsubscribed</p>
            </div>
            <div className="text-center">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Campaigns</h3>
          <div className="space-y-4">
            {sentCampaigns
              .sort((a, b) => (b.opens / b.recipients) - (a.opens / a.recipients))
              .slice(0, 5)
              .map((campaign, index) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.subject}</h4>
                    <p className="text-sm text-gray-500">{campaign.newsletter}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{((campaign.opens / campaign.recipients) * 100).toFixed(1)}%</p>
                    <p className="text-gray-500">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%</p>
                    <p className="text-gray-500">Click Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{campaign.recipients.toLocaleString()}</p>
                    <p className="text-gray-500">Recipients</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Newsletter Performance</h3>
          <div className="space-y-4">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  {newsletter.logo && (
                    <img
                      src={newsletter.logo}
                      alt={newsletter.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{newsletter.name}</p>
                    <p className="text-sm text-gray-500">{newsletter.subscribers.toLocaleString()} subscribers</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Open Rate</span>
                    <span className="font-medium">{newsletter.openRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${newsletter.openRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Click Rate</span>
                    <span className="font-medium">{newsletter.clickRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${newsletter.clickRate * 10}%` }}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Heatmap</h3>
        <div className="grid grid-cols-7 gap-2">
          {/* Days of week header */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
              {day}
            </div>
          ))}
          
          {/* Heatmap cells */}
          {Array.from({ length: 28 }, (_, i) => {
            const intensity = Math.random();
            const bgColor = intensity > 0.7 ? 'bg-emerald-600' : 
                           intensity > 0.5 ? 'bg-emerald-400' : 
                           intensity > 0.3 ? 'bg-emerald-200' : 'bg-gray-100';
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
            <div className="w-3 h-3 bg-emerald-200 rounded"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded"></div>
            <div className="w-3 h-3 bg-emerald-600 rounded"></div>
          </div>
          <span>More engagement</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
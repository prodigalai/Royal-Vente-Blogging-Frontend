import React, { useState } from 'react';
import { Plus, Mail, RefreshCw, Calendar, Play, Pause, BarChart3, Edit3, Trash2, Users, Target, Clock, CheckCircle, AlertCircle, Zap, Send, Eye, TrendingUp } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';

const AutomationsTab: React.FC = () => {
  const { automations, updateAutomation, deleteAutomation } = useNewsletter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);

  const handleToggleAutomation = (automationId: string, currentStatus: 'active' | 'paused') => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    updateAutomation(automationId, { status: newStatus });
  };

  const handleDeleteAutomation = (automationId: string) => {
    if (window.confirm('Are you sure you want to delete this automation?')) {
      deleteAutomation(automationId);
    }
  };

  const automationTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Series',
      description: 'Automatically welcome new subscribers with a series of onboarding emails.',
      icon: Mail,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      emails: 3,
      trigger: 'New Subscriber'
    },
    {
      id: 'reengagement',
      name: 'Re-engagement',
      description: 'Win back inactive subscribers with targeted re-engagement campaigns.',
      icon: RefreshCw,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      emails: 2,
      trigger: 'Inactive 30 days'
    },
    {
      id: 'birthday',
      name: 'Date-based',
      description: 'Send personalized emails based on birthdays, anniversaries, or custom dates.',
      icon: Calendar,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      emails: 1,
      trigger: 'Birthday'
    },
    {
      id: 'abandoned',
      name: 'Abandoned Cart',
      description: 'Recover lost sales with automated abandoned cart email sequences.',
      icon: Target,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      emails: 3,
      trigger: 'Cart Abandoned'
    },
    {
      id: 'drip',
      name: 'Drip Campaign',
      description: 'Nurture leads with a series of educational and promotional emails.',
      icon: Zap,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      emails: 5,
      trigger: 'Tag Added'
    },
    {
      id: 'winback',
      name: 'Win-back Campaign',
      description: 'Re-engage customers who haven\'t purchased in a while.',
      icon: TrendingUp,
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      emails: 4,
      trigger: 'No Purchase 90 days'
    }
  ];

  const CreateAutomationModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      trigger: '',
      emails: 1,
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Add automation logic here
      console.log('Creating automation:', formData);
      setShowCreateModal(false);
    };

    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Create New Automation</h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Automation Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter automation name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trigger *
                </label>
                <select
                  required
                  value={formData.trigger}
                  onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select trigger</option>
                  <option value="New Subscriber">New Subscriber</option>
                  <option value="Inactive 30 days">Inactive 30 days</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Cart Abandoned">Cart Abandoned</option>
                  <option value="Tag Added">Tag Added</option>
                  <option value="No Purchase 90 days">No Purchase 90 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Emails
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.emails}
                  onChange={(e) => setFormData({ ...formData, emails: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your automation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Automation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Automations</h2>
          <p className="text-gray-600">Set up automated email sequences to engage your subscribers</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Automations</p>
              <p className="text-2xl font-bold text-gray-900">{automations.filter(a => a.status === 'active').length}</p>
              <p className="text-sm text-green-600">+2 this month</p>
            </div>
            <Play className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{automations.reduce((sum, a) => sum + a.subscribers, 0).toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% this month</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{(automations.reduce((sum, a) => sum + a.openRate, 0) / automations.length).toFixed(1)}%</p>
              <p className="text-sm text-green-600">+3.2% vs campaigns</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">24.5K</p>
              <p className="text-sm text-green-600">+18% this month</p>
            </div>
            <Send className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Automation Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className={`${template.color} border rounded-xl p-6 hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className={`w-5 h-5 ${template.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{template.emails} emails</span>
                    <span>•</span>
                    <span>{template.trigger}</span>
                  </div>
                </div>
                <button className={`w-full ${template.buttonColor} text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium`}>
                  Create {template.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Automations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Active Automations ({automations.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {automations.map((automation) => (
            <div key={automation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    automation.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {automation.status === 'active' ? (
                      <Play className="w-5 h-5 text-green-600" />
                    ) : (
                      <Pause className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">
                        {automation.name}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        automation.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {automation.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Trigger: {automation.trigger}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{automation.subscribers.toLocaleString()} subscribers</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{automation.emails} emails</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{automation.openRate}% open rate</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Created {automation.createdAt.toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedAutomation(automation.id)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
                    title="View Analytics"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleToggleAutomation(automation.id, automation.status)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
                    title={automation.status === 'active' ? 'Pause' : 'Resume'}
                  >
                    {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => handleDeleteAutomation(automation.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Automation Performance Details */}
              {selectedAutomation === automation.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Send className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Emails Sent</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {(automation.subscribers * automation.emails).toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-700">Total emails delivered</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Opens</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">
                        {Math.round((automation.subscribers * automation.emails * automation.openRate) / 100).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-700">{automation.openRate}% open rate</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Clicks</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">
                        {Math.round((automation.subscribers * automation.emails * automation.openRate * 0.15) / 100).toLocaleString()}
                      </p>
                      <p className="text-sm text-purple-700">2.3% click rate</p>
                    </div>
                  </div>

                  {/* Performance Chart Placeholder */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Over Time</h4>
                    <div className="h-32 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Performance chart would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAutomation(null)}
                    className="mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Hide Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <CreateAutomationModal />
    </div>
  );
};

export default AutomationsTab;
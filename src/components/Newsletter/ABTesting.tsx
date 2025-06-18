import React, { useState } from 'react';
import { 
  TestTube, Users, Eye, Target, TrendingUp, Clock, 
  Play, Pause, CheckCircle, AlertCircle, Plus, Settings,
  Mail, Zap, BarChart3, Crown, Edit3, Trash2, Copy,
  Send,
  X
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  type: 'subject' | 'content' | 'send_time' | 'from_name';
  variants: {
    id: string;
    name: string;
    content: any;
    sent: number;
    opens: number;
    clicks: number;
    conversions: number;
  }[];
  audience: {
    total: number;
    splitPercentage: number;
    winnerPercentage: number;
  };
  testDuration: number; // hours
  startedAt?: Date;
  completedAt?: Date;
  winner?: string;
  confidence: number;
  newsletter: string;
}

interface ABTestingProps {
  tests: ABTest[];
  onCreateTest: (test: Omit<ABTest, 'id'>) => void;
  onStartTest: (id: string) => void;
  onPauseTest: (id: string) => void;
  onCompleteTest: (id: string, winnerId: string) => void;
  onDeleteTest: (id: string) => void;
}

const ABTesting: React.FC<ABTestingProps> = ({
  tests,
  onCreateTest,
  onStartTest,
  onPauseTest,
  onCompleteTest,
  onDeleteTest
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'results'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4 text-green-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const calculateWinRate = (variant: ABTest['variants'][0]) => {
    if (variant.sent === 0) return 0;
    return (variant.opens / variant.sent) * 100;
  };

  const TestCard: React.FC<{ test: ABTest }> = ({ test }) => {
    const totalSent = test.variants.reduce((sum, v) => sum + v.sent, 0);
    const totalOpens = test.variants.reduce((sum, v) => sum + v.opens, 0);
    const totalClicks = test.variants.reduce((sum, v) => sum + v.clicks, 0);
    const winningVariant = test.winner ? test.variants.find(v => v.id === test.winner) : null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{test.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                {test.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Testing: <span className="font-medium capitalize">{test.type.replace('_', ' ')}</span> • {test.newsletter}
            </p>
            {test.startedAt && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Started {test.startedAt.toLocaleDateString()} at {test.startedAt.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {test.status === 'draft' && (
              <button
                onClick={() => onStartTest(test.id)}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start Test</span>
              </button>
            )}
            {test.status === 'running' && (
              <button
                onClick={() => onPauseTest(test.id)}
                className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={() => setSelectedTest(test)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDeleteTest(test.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Test Progress */}
        {test.status === 'running' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Test Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {test.testDuration}h duration
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: test.startedAt 
                    ? `${Math.min(100, ((Date.now() - test.startedAt.getTime()) / (test.testDuration * 60 * 60 * 1000)) * 100)}%`
                    : '0%'
                }}
              />
            </div>
          </div>
        )}

        {/* Variants */}
        <div className="space-y-3">
          {test.variants.map((variant, index) => {
            const openRate = variant.sent > 0 ? (variant.opens / variant.sent) * 100 : 0;
            const clickRate = variant.sent > 0 ? (variant.clicks / variant.sent) * 100 : 0;
            const isWinner = test.winner === variant.id;

            return (
              <div key={variant.id} className={`p-4 rounded-lg border-2 transition-all ${
                isWinner 
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500' 
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{variant.name}</span>
                      {isWinner && <Crown className="w-4 h-4 text-yellow-500" />}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Variant {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  {test.status === 'completed' && (
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {test.confidence}% confidence
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Sent</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{variant.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Opens</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {variant.opens.toLocaleString()} ({openRate.toFixed(1)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Clicks</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {variant.clicks.toLocaleString()} ({clickRate.toFixed(1)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Conversions</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{variant.conversions.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Test Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Total Sent</p>
              <p className="font-semibold text-gray-900 dark:text-white">{totalSent.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Total Opens</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {totalOpens.toLocaleString()} ({totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : 0}%)
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Total Clicks</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {totalClicks.toLocaleString()} ({totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : 0}%)
              </p>
            </div>
          </div>
        </div>

        {/* Winner Selection for Completed Tests */}
        {test.status === 'completed' && winningVariant && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium text-green-900 dark:text-green-300">Test Winner</h4>
            </div>
            <p className="text-sm text-green-800 dark:text-green-300">
              {winningVariant.name} performed best with {calculateWinRate(winningVariant).toFixed(1)}% open rate
            </p>
            <div className="mt-3 flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Send className="w-4 h-4" />
                <span>Send to Remaining</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <Copy className="w-4 h-4" />
                <span>Use as Template</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CreateTestModal: React.FC = () => {
    const [testData, setTestData] = useState({
      name: '',
      type: 'subject' as ABTest['type'],
      newsletter: '',
      testDuration: 24,
      splitPercentage: 20,
      variants: [
        { name: 'Variant A', content: '' },
        { name: 'Variant B', content: '' }
      ]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newTest: Omit<ABTest, 'id'> = {
        name: testData.name,
        status: 'draft',
        type: testData.type,
        variants: testData.variants.map((variant, index) => ({
          id: `variant-${index}`,
          name: variant.name,
          content: variant.content,
          sent: 0,
          opens: 0,
          clicks: 0,
          conversions: 0
        })),
        audience: {
          total: 5000, // This would come from selected audience
          splitPercentage: testData.splitPercentage,
          winnerPercentage: 100 - testData.splitPercentage
        },
        testDuration: testData.testDuration,
        confidence: 0,
        newsletter: testData.newsletter
      };
      
      onCreateTest(newTest);
      setShowCreateModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create A/B Test</h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testData.name}
                onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Subject Line Test - Newsletter #1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Type
              </label>
              <select
                value={testData.type}
                onChange={(e) => setTestData({ ...testData, type: e.target.value as ABTest['type'] })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="subject">Subject Line</option>
                <option value="content">Email Content</option>
                <option value="send_time">Send Time</option>
                <option value="from_name">From Name</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Duration (hours)
                </label>
                <input
                  type="number"
                  value={testData.testDuration}
                  onChange={(e) => setTestData({ ...testData, testDuration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="1"
                  max="168"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Audience (%)
                </label>
                <input
                  type="number"
                  value={testData.splitPercentage}
                  onChange={(e) => setTestData({ ...testData, splitPercentage: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="10"
                  max="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Variants
              </label>
              <div className="space-y-4">
                {testData.variants.map((variant, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Variant {String.fromCharCode(65 + index)}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {testData.splitPercentage / 2}% of audience
                      </span>
                    </div>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => {
                        const newVariants = [...testData.variants];
                        newVariants[index].name = e.target.value;
                        setTestData({ ...testData, variants: newVariants });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2"
                      placeholder="Variant name"
                    />
                    <textarea
                      value={variant.content}
                      onChange={(e) => {
                        const newVariants = [...testData.variants];
                        newVariants[index].content = e.target.value;
                        setTestData({ ...testData, variants: newVariants });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={3}
                      placeholder={`Enter ${testData.type.replace('_', ' ')} for this variant`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Create Test
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">A/B Testing</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize your campaigns with data-driven testing
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <TestTube className="w-4 h-4" />
          <span>Create A/B Test</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tests.filter(t => t.status === 'running').length}
              </p>
            </div>
            <TestTube className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Tests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tests.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Improvement</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">+15.3%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tests.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="space-y-6">
        {tests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <TestTube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No A/B Tests Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first A/B test to start optimizing your email campaigns
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Test</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </div>

      {/* Create Test Modal */}
      {showCreateModal && <CreateTestModal />}

      {/* Test Details Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTest.name} - Detailed Results
              </h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <TestCard test={selectedTest} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABTesting;
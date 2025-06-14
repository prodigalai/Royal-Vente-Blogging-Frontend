import React, { useState } from 'react';
import { 
  Users, Plus, X, Filter, Eye, Save, Play, Pause,
  MapPin, Calendar, Mail, Tag, TrendingUp, Target,
  Database, Zap, Edit3, Trash2, Copy, Settings
} from 'lucide-react';

interface SegmentRule {
  id: string;
  field: string;
  operator: string;
  value: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
}

interface Segment {
  id: string;
  name: string;
  description: string;
  rules: SegmentRule[];
  logic: 'AND' | 'OR';
  subscriberCount: number;
  isActive: boolean;
  createdAt: Date;
  lastUpdated: Date;
  color: string;
}

interface SegmentBuilderProps {
  segments: Segment[];
  onCreateSegment: (segment: Omit<Segment, 'id' | 'subscriberCount' | 'createdAt' | 'lastUpdated'>) => void;
  onUpdateSegment: (id: string, updates: Partial<Segment>) => void;
  onDeleteSegment: (id: string) => void;
  onPreviewSegment: (rules: SegmentRule[], logic: 'AND' | 'OR') => Promise<number>;
}

const SegmentBuilder: React.FC<SegmentBuilderProps> = ({
  segments,
  onCreateSegment,
  onUpdateSegment,
  onDeleteSegment,
  onPreviewSegment
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const availableFields = [
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'tags', label: 'Tags', type: 'select' },
    { key: 'status', label: 'Status', type: 'select' },
    { key: 'subscribedAt', label: 'Subscribed Date', type: 'date' },
    { key: 'lastEngaged', label: 'Last Engaged', type: 'date' },
    { key: 'openRate', label: 'Open Rate', type: 'number' },
    { key: 'clickRate', label: 'Click Rate', type: 'number' },
    { key: 'source', label: 'Source', type: 'select' },
    { key: 'customField', label: 'Custom Field', type: 'text' }
  ];

  const operators = {
    text: ['equals', 'not_equals', 'contains', 'not_contains', 'starts_with', 'ends_with'],
    number: ['equals', 'not_equals', 'greater_than', 'less_than', 'greater_equal', 'less_equal'],
    date: ['equals', 'not_equals', 'after', 'before', 'between', 'in_last', 'not_in_last'],
    boolean: ['is_true', 'is_false'],
    select: ['equals', 'not_equals', 'in', 'not_in']
  };

  const operatorLabels = {
    equals: 'equals',
    not_equals: 'does not equal',
    contains: 'contains',
    not_contains: 'does not contain',
    starts_with: 'starts with',
    ends_with: 'ends with',
    greater_than: 'greater than',
    less_than: 'less than',
    greater_equal: 'greater than or equal',
    less_equal: 'less than or equal',
    after: 'after',
    before: 'before',
    between: 'between',
    in_last: 'in the last',
    not_in_last: 'not in the last',
    is_true: 'is true',
    is_false: 'is false',
    in: 'in',
    not_in: 'not in'
  };

  const segmentColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ];

  const getSegmentColor = (color: string) => {
    const colorMap = {
      '#3B82F6': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      '#10B981': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      '#F59E0B': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      '#EF4444': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800',
      '#8B5CF6': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      '#06B6D4': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      '#84CC16': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300 border-lime-200 dark:border-lime-800',
      '#F97316': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      '#EC4899': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 border-pink-200 dark:border-pink-800',
      '#6B7280': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['#6B7280'];
  };

  const SegmentCard: React.FC<{ segment: Segment }> = ({ segment }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: segment.color }}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{segment.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{segment.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              segment.isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
            }`}>
              {segment.isActive ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={() => setEditingSegment(segment)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteSegment(segment.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {segment.subscriberCount.toLocaleString()} subscribers
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Updated {segment.lastUpdated.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {segment.rules.length} rule{segment.rules.length !== 1 ? 's' : ''} ({segment.logic})
            </span>
          </div>
          <div className="space-y-2">
            {segment.rules.slice(0, 3).map((rule, index) => {
              const field = availableFields.find(f => f.key === rule.field);
              return (
                <div key={rule.id} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <span className="font-medium">{field?.label || rule.field}</span>
                  <span className="mx-2">{operatorLabels[rule.operator as keyof typeof operatorLabels]}</span>
                  <span className="font-medium">{rule.value}</span>
                </div>
              );
            })}
            {segment.rules.length > 3 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                +{segment.rules.length - 3} more rule{segment.rules.length - 3 !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Mail className="w-4 h-4" />
            <span>Send Campaign</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Eye className="w-4 h-4" />
            <span>View Subscribers</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Copy className="w-4 h-4" />
            <span>Duplicate</span>
          </button>
        </div>
      </div>
    );
  };

  const SegmentEditor: React.FC<{ 
    segment?: Segment;
    onSave: (segmentData: any) => void;
    onCancel: () => void;
  }> = ({ segment, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: segment?.name || '',
      description: segment?.description || '',
      rules: segment?.rules || [{ id: '1', field: 'email', operator: 'contains', value: '', type: 'text' }],
      logic: segment?.logic || 'AND' as 'AND' | 'OR',
      isActive: segment?.isActive ?? true,
      color: segment?.color || segmentColors[0]
    });

    const addRule = () => {
      const newRule: SegmentRule = {
        id: Date.now().toString(),
        field: 'email',
        operator: 'contains',
        value: '',
        type: 'text'
      };
      setFormData({
        ...formData,
        rules: [...formData.rules, newRule]
      });
    };

    const removeRule = (ruleId: string) => {
      setFormData({
        ...formData,
        rules: formData.rules.filter(r => r.id !== ruleId)
      });
    };

    const updateRule = (ruleId: string, updates: Partial<SegmentRule>) => {
      setFormData({
        ...formData,
        rules: formData.rules.map(r => r.id === ruleId ? { ...r, ...updates } : r)
      });
    };

    const handlePreview = async () => {
      setIsPreviewLoading(true);
      try {
        const count = await onPreviewSegment(formData.rules, formData.logic);
        setPreviewCount(count);
      } catch (error) {
        console.error('Error previewing segment:', error);
      } finally {
        setIsPreviewLoading(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {segment ? 'Edit Segment' : 'Create New Segment'}
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Segment Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Engaged Tech Subscribers"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex items-center space-x-2">
                  {segmentColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color ? 'border-gray-900 dark:border-white scale-110' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
                placeholder="Describe what this segment represents..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Segment Rules
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Match</span>
                    <select
                      value={formData.logic}
                      onChange={(e) => setFormData({ ...formData, logic: e.target.value as 'AND' | 'OR' })}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="AND">ALL</option>
                      <option value="OR">ANY</option>
                    </select>
                    <span className="text-sm text-gray-700 dark:text-gray-300">of these rules</span>
                  </div>
                  <button
                    type="button"
                    onClick={addRule}
                    className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Rule</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {formData.rules.map((rule, index) => {
                  const field = availableFields.find(f => f.key === rule.field);
                  const availableOperators = operators[field?.type as keyof typeof operators] || [];

                  return (
                    <div key={rule.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        {index > 0 && (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                              {formData.logic}
                            </span>
                          </div>
                        )}
                        
                        <select
                          value={rule.field}
                          onChange={(e) => {
                            const selectedField = availableFields.find(f => f.key === e.target.value);
                            updateRule(rule.id, { 
                              field: e.target.value, 
                              type: selectedField?.type as SegmentRule['type'],
                              operator: operators[selectedField?.type as keyof typeof operators]?.[0] || 'equals'
                            });
                          }}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {availableFields.map((field) => (
                            <option key={field.key} value={field.key}>
                              {field.label}
                            </option>
                          ))}
                        </select>

                        <select
                          value={rule.operator}
                          onChange={(e) => updateRule(rule.id, { operator: e.target.value })}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {availableOperators.map((op) => (
                            <option key={op} value={op}>
                              {operatorLabels[op as keyof typeof operatorLabels]}
                            </option>
                          ))}
                        </select>

                        <input
                          type={rule.type === 'number' ? 'number' : rule.type === 'date' ? 'date' : 'text'}
                          value={rule.value}
                          onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter value..."
                        />

                        <button
                          type="button"
                          onClick={() => removeRule(rule.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          disabled={formData.rules.length === 1}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-300">
                    Segment Preview
                  </span>
                  {previewCount !== null && (
                    <span className="text-blue-700 dark:text-blue-300">
                      ({previewCount.toLocaleString()} subscribers)
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={isPreviewLoading}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPreviewLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  <span>Preview</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active segment
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {segment ? 'Update Segment' : 'Create Segment'}
                </button>
              </div>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audience Segments</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create targeted segments for personalized campaigns
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Segment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Segments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{segments.length}</p>
            </div>
            <Target className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Segments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {segments.filter(s => s.isActive).length}
              </p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Segment Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {segments.length > 0 
                  ? Math.round(segments.reduce((sum, s) => sum + s.subscriberCount, 0) / segments.length).toLocaleString()
                  : '0'
                }
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {segments.reduce((sum, s) => sum + s.subscriberCount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Segments List */}
      <div className="space-y-6">
        {segments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Segments Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first audience segment to start sending targeted campaigns
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Segment</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {segments.map((segment) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <SegmentEditor
          onSave={(segmentData) => {
            onCreateSegment(segmentData);
            setShowCreateModal(false);
          }}
          onCancel={() => setShowCreateModal(false)}
        />
      )}

      {editingSegment && (
        <SegmentEditor
          segment={editingSegment}
          onSave={(segmentData) => {
            onUpdateSegment(editingSegment.id, segmentData);
            setEditingSegment(null);
          }}
          onCancel={() => setEditingSegment(null)}
        />
      )}
    </div>
  );
};

export default SegmentBuilder;
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Send, Eye, Share2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useNewsletter } from '../contexts/NewsletterContext';

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { newsletters, templates, addCampaign } = useNewsletter();
  
  const [formData, setFormData] = useState({
    subject: '',
    newsletter: '',
    content: '',
    template: 'modern-tech',
    scheduleType: 'now' as 'now' | 'later',
    scheduledAt: '',
    socialMedia: {
      shareOnFacebook: false,
      shareOnTwitter: false,
      shareOnLinkedin: false,
      shareOnInstagram: false,
      customMessage: ''
    },
    abTesting: {
      enabled: false,
      subjectB: '',
      percentage: 50
    },
    tracking: {
      utmSource: 'newsletter',
      utmMedium: 'email',
      utmCampaign: ''
    }
  });

  // Pre-select template if coming from template selection
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      setFormData(prev => ({ ...prev, template: templateId }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedNewsletter = newsletters.find(n => n.id === formData.newsletter);
    if (!selectedNewsletter) return;

    addCampaign({
      subject: formData.subject,
      newsletter: selectedNewsletter.name,
      status: formData.scheduleType === 'now' ? 'sending' : 'scheduled',
      scheduledAt: formData.scheduleType === 'later' ? new Date(formData.scheduledAt) : undefined,
      opens: 0,
      clicks: 0,
      recipients: selectedNewsletter.subscribers,
      template: formData.template
    });

    // Handle social media sharing
    if (formData.socialMedia.shareOnFacebook || 
        formData.socialMedia.shareOnTwitter || 
        formData.socialMedia.shareOnLinkedin || 
        formData.socialMedia.shareOnInstagram) {
      console.log('Social media sharing enabled:', formData.socialMedia);
    }

    navigate('/newsletter?tab=campaigns');
  };

  const selectedTemplate = templates.find(t => t.id === formData.template);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/newsletter')}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Campaign</h1>
          <p className="text-gray-600 dark:text-gray-400">Design and send your email campaign with advanced features</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Campaign Details</h3>
              
              <div className="space-y-6">
                {/* Newsletter Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Newsletter *
                  </label>
                  <select
                    required
                    value={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a newsletter</option>
                    {newsletters.map((newsletter) => (
                      <option key={newsletter.id} value={newsletter.id}>
                        {newsletter.name} ({newsletter.subscribers.toLocaleString()} subscribers)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter email subject line"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* A/B Testing */}
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">A/B Testing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Test different subject lines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.abTesting.enabled}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          abTesting: { ...formData.abTesting, enabled: e.target.checked }
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  
                  {formData.abTesting.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject Line B
                        </label>
                        <input
                          type="text"
                          value={formData.abTesting.subjectB}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            abTesting: { ...formData.abTesting, subjectB: e.target.value }
                          })}
                          placeholder="Alternative subject line"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Test Percentage: {formData.abTesting.percentage}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={formData.abTesting.percentage}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            abTesting: { ...formData.abTesting, percentage: parseInt(e.target.value) }
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {templates.slice(0, 4).map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setFormData({ ...formData, template: template.id })}
                        className={`cursor-pointer border-2 rounded-lg p-3 transition-all ${
                          formData.template === template.id
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Content
                  </label>
                  <textarea
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your email content here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Integration */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Social Media Integration</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.socialMedia.shareOnFacebook}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, shareOnFacebook: e.target.checked }
                      })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.socialMedia.shareOnTwitter}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, shareOnTwitter: e.target.checked }
                      })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">Twitter</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.socialMedia.shareOnLinkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, shareOnLinkedin: e.target.checked }
                      })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.socialMedia.shareOnInstagram}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, shareOnInstagram: e.target.checked }
                      })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <span className="text-sm font-medium">Instagram</span>
                  </label>
                </div>

                {(formData.socialMedia.shareOnFacebook || 
                  formData.socialMedia.shareOnTwitter || 
                  formData.socialMedia.shareOnLinkedin || 
                  formData.socialMedia.shareOnInstagram) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Social Media Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.socialMedia.customMessage}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, customMessage: e.target.value }
                      })}
                      placeholder="Custom message for social media posts..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* UTM Tracking */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">UTM Tracking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UTM Source
                  </label>
                  <input
                    type="text"
                    value={formData.tracking.utmSource}
                    onChange={(e) => setFormData({
                      ...formData,
                      tracking: { ...formData.tracking, utmSource: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UTM Medium
                  </label>
                  <input
                    type="text"
                    value={formData.tracking.utmMedium}
                    onChange={(e) => setFormData({
                      ...formData,
                      tracking: { ...formData.tracking, utmMedium: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UTM Campaign
                  </label>
                  <input
                    type="text"
                    value={formData.tracking.utmCampaign}
                    onChange={(e) => setFormData({
                      ...formData,
                      tracking: { ...formData.tracking, utmCampaign: e.target.value }
                    })}
                    placeholder="campaign-name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduling */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scheduling</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="now"
                      checked={formData.scheduleType === 'now'}
                      onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value as any })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-900 dark:text-white">Send immediately</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="later"
                      checked={formData.scheduleType === 'later'}
                      onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value as any })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-900 dark:text-white">Schedule for later</span>
                  </label>
                </div>

                {formData.scheduleType === 'later' && (
                  <div className="ml-6">
                    <input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview & Test</h3>
              
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Email</span>
                </button>
                
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Test</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Preview</span>
                </button>
              </div>
            </div>

            {/* Template Preview */}
            {selectedTemplate && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Selected Template</h3>
                <div className="space-y-3">
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTemplate.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Campaign Info */}
            {formData.newsletter && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 mb-4">Campaign Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-400">Newsletter:</span>
                    <span className="text-emerald-900 dark:text-emerald-300 font-medium">
                      {newsletters.find(n => n.id === formData.newsletter)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-400">Recipients:</span>
                    <span className="text-emerald-900 dark:text-emerald-300 font-medium">
                      {newsletters.find(n => n.id === formData.newsletter)?.subscribers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-400">Status:</span>
                    <span className="text-emerald-900 dark:text-emerald-300 font-medium">
                      {formData.scheduleType === 'now' ? 'Ready to send' : 'Scheduled'}
                    </span>
                  </div>
                  {formData.abTesting.enabled && (
                    <div className="flex justify-between">
                      <span className="text-emerald-700 dark:text-emerald-400">A/B Testing:</span>
                      <span className="text-emerald-900 dark:text-emerald-300 font-medium">Enabled</span>
                    </div>
                  )}
                  {(formData.socialMedia.shareOnFacebook || 
                    formData.socialMedia.shareOnTwitter || 
                    formData.socialMedia.shareOnLinkedin || 
                    formData.socialMedia.shareOnInstagram) && (
                    <div className="flex justify-between">
                      <span className="text-emerald-700 dark:text-emerald-400">Social Media:</span>
                      <span className="text-emerald-900 dark:text-emerald-300 font-medium">Enabled</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/newsletter')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {formData.scheduleType === 'now' ? (
              <>
                <Send className="w-4 h-4" />
                <span>Send Campaign</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Schedule Campaign</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
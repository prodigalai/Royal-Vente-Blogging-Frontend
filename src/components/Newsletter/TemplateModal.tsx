// src/components/Newsletter/TemplateModal.tsx
import React from 'react';
import { X, Star } from 'lucide-react';
import { Template } from '../../types/newsletter';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
  onUse: (template: Template) => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose, onUse }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {template.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {template.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                {template.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {template.uses.toLocaleString()} uses
              </span>
              {template.isPremium && (
                <span className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Premium</span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onUse(template)}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;

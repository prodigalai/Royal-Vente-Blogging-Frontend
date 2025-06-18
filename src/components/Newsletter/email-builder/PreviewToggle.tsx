import React from 'react';

interface PreviewToggleProps {
  view: 'desktop' | 'mobile';
  onToggle: (view: 'desktop' | 'mobile') => void;
}

const PreviewToggle: React.FC<PreviewToggleProps> = ({ view, onToggle }) => (
  <div className="flex space-x-2 mb-4">
    <button
      onClick={() => onToggle('desktop')}
      className={`px-3 py-1 rounded ${view === 'desktop' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
    >
      Desktop
    </button>
    <button
      onClick={() => onToggle('mobile')}
      className={`px-3 py-1 rounded ${view === 'mobile' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
    >
      Mobile
    </button>
  </div>
);

export default PreviewToggle;

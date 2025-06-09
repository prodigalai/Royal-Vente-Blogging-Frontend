import React, { useState } from 'react';
import { Plus, Type, Image, Quote, List, ListOrdered, Minus } from 'lucide-react';

interface SectionDividerProps {
  onInsert: (type: 'divider' | 'heading' | 'image' | 'quote' | 'list' | 'ordered-list') => void;
  position: { top: number; left: number };
  isVisible: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  onInsert,
  position,
  isVisible
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  const options = [
    { type: 'heading' as const, icon: Type, label: 'Heading' },
    { type: 'image' as const, icon: Image, label: 'Image' },
    { type: 'quote' as const, icon: Quote, label: 'Quote' },
    { type: 'list' as const, icon: List, label: 'Bullet List' },
    { type: 'ordered-list' as const, icon: ListOrdered, label: 'Numbered List' },
    { type: 'divider' as const, icon: Minus, label: 'Divider' },
  ];

  return (
    <div
      className="absolute z-20"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 border border-gray-300 rounded-full transition-colors shadow-sm"
          title="Insert content"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
        
        {isExpanded && (
          <div className="ml-2 flex items-center bg-white border border-gray-300 rounded-lg shadow-lg p-1">
            {options.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => {
                    onInsert(option.type);
                    setIsExpanded(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title={option.label}
                >
                  <IconComponent size={16} className="text-gray-600" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
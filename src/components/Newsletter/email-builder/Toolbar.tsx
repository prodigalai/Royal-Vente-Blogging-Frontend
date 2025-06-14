import React from 'react';
import { BlockType } from './BlockPalette';

interface ToolbarProps {
  selectedBlock?: { id: string; type: BlockType };
  onSettingsChange: (settings: Record<string, any>) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedBlock }) => {
  if (!selectedBlock) {
    return (
      <aside className="w-1/4 p-4 border-l text-gray-500">
        Select a block to edit its settings
      </aside>
    );
  }

  return (
    <aside className="w-1/4 p-4 border-l">
      <h2 className="font-semibold mb-2">Settings for &quot;{selectedBlock.type}&quot;</h2>
      {/* Example: for text block */}
      {selectedBlock.type === 'text' && (
        <>
          <label className="block mb-2">
            Content:
            <textarea
              className="w-full mt-1 p-2 border rounded"
              onChange={e => onSettingsChange({ content: e.target.value })}
            />
          </label>
        </>
      )}
      {/* Add forms for other block types here */}
    </aside>
  );
};

export default Toolbar;

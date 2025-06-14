import React from 'react';

export type BlockType = 'text' | 'image' | 'button' | 'divider';

interface BlockPaletteProps {
  onDragStart: (type: BlockType, e: React.DragEvent) => void;
}

const BlockPalette: React.FC<BlockPaletteProps> = ({ onDragStart }) => {
  const blocks: { type: BlockType; label: string }[] = [
    { type: 'text', label: 'Text' },
    { type: 'image', label: 'Image' },
    { type: 'button', label: 'Button' },
    { type: 'divider', label: 'Divider' },
  ];

  return (
    <aside className="w-1/4 p-4 border-r">
      <h2 className="font-semibold mb-2">Blocks</h2>
      <ul className="space-y-2">
        {blocks.map(({ type, label }) => (
          <li
            key={type}
            draggable
            onDragStart={e => onDragStart(type, e)}
            className="cursor-grab p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlockPalette;

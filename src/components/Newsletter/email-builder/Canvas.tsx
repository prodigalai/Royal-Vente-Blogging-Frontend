import React from 'react';

interface CanvasProps {
  /**
   * Array of blocks on the canvas. Each block has a unique id and type.
   * Defaults to an empty array if not provided.
   */
  blocks?: { id: string; type: string }[];
  /**
   * Called when a new block is dropped onto the canvas.
   */
  onDrop: (type: string) => void;
  /**
   * Called to remove a block by its id.
   */
  onRemove: (id: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({ blocks = [], onDrop, onRemove }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main
      className="flex-1 p-4 min-h-screen"
      onDrop={e => {
        const type = e.dataTransfer.getData('block/type');
        onDrop(type);
      }}
      onDragOver={handleDragOver}
    >
      {blocks.length === 0 && (
        <p className="text-gray-400">Drag blocks here to build your email...</p>
      )}
      <div className="space-y-4">
        {blocks.map(block => (
          <div key={block.id} className="relative p-4 border rounded">
            <button
              onClick={() => onRemove(block.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <p className="text-sm">[{block.type} block]</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Canvas;

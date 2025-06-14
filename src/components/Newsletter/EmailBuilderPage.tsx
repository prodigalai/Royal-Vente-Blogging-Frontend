import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Type, Image, Donut as Button, Divide as Divider, Save, Eye, 
  Smartphone, Monitor, Tablet, Undo, Redo, Settings, Plus, 
  Trash2, AlignLeft, AlignCenter, AlignRight, Bold, Italic, 
  Underline, Link, Palette,  Grid, Move, Copy, Edit3,
  ArrowLeft, Send, Download, Upload, Zap, Star, Crown,
  Code, Layers, MousePointer, RotateCcw, RotateCw, 
  PaintBucket, Sliders, ChevronDown, ChevronUp, X,
  GripVertical, MoreHorizontal, Maximize, Minimize,
  Layout
} from 'lucide-react';

interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'html' | 'columns' | 'social' | 'video';
  content: any;
  styles: any;
  animation?: {
    type: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'bounce' | 'pulse';
    duration: number;
    delay: number;
  };
}

interface EmailBuilderProps {
  onSave?: (content: EmailBlock[]) => void;
  onPreview?: (content: EmailBlock[]) => void;
  initialContent?: EmailBlock[];
}

const EmailBuilder: React.FC<EmailBuilderProps> = ({ 
  onSave, 
  onPreview, 
  initialContent = [] 
}) => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [blocks, setBlocks] = useState<EmailBlock[]>(initialContent);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState<EmailBlock[][]>([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [showCode, setShowCode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const blockComponents = [
    { 
      type: 'text', 
      icon: Type, 
      label: 'Text', 
      description: 'Add headings, paragraphs, and formatted text',
      category: 'Content'
    },
    { 
      type: 'image', 
      icon: Image, 
      label: 'Image', 
      description: 'Insert images with responsive sizing',
      category: 'Media'
    },
    { 
      type: 'button', 
      icon: Button, 
      label: 'Button', 
      description: 'Call-to-action buttons with hover effects',
      category: 'Interactive'
    },
    { 
      type: 'divider', 
      icon: Divider, 
      label: 'Divider', 
      description: 'Visual separators and lines',
      category: 'Layout'
    },
    { 
      type: 'spacer', 
      icon: Layout, 
      label: 'Spacer', 
      description: 'Add vertical spacing between elements',
      category: 'Layout'
    },
    { 
      type: 'columns', 
      icon: Grid, 
      label: 'Columns', 
      description: 'Multi-column layouts for complex designs',
      category: 'Layout'
    },
    { 
      type: 'social', 
      icon: Star, 
      label: 'Social', 
      description: 'Social media icons and links',
      category: 'Interactive'
    },
    { 
      type: 'video', 
      icon: Crown, 
      label: 'Video', 
      description: 'Embed videos with play buttons',
      category: 'Media',
      premium: true
    },
    { 
      type: 'html', 
      icon: Code, 
      label: 'HTML', 
      description: 'Custom HTML for advanced users',
      category: 'Advanced'
    }
  ];

  const templates = [
    {
      id: 'newsletter',
      name: 'Newsletter Template',
      preview: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: { text: 'Weekly Newsletter', tag: 'h1' },
          styles: { fontSize: '32px', color: '#1f2937', textAlign: 'center', marginBottom: '20px' }
        },
        {
          id: '2',
          type: 'image',
          content: { src: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600&h=300', alt: 'Newsletter header', width: '100%' },
          styles: { textAlign: 'center', marginBottom: '30px' }
        },
        {
          id: '3',
          type: 'text',
          content: { text: 'Welcome to our weekly newsletter! Here are the latest updates and insights from our team.', tag: 'p' },
          styles: { fontSize: '16px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px' }
        }
      ]
    },
    {
      id: 'promotional',
      name: 'Promotional Email',
      preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: { text: 'Special Offer!', tag: 'h1' },
          styles: { fontSize: '36px', color: '#dc2626', textAlign: 'center', marginBottom: '20px' }
        },
        {
          id: '2',
          type: 'text',
          content: { text: 'Get 50% off on all products this week only!', tag: 'p' },
          styles: { fontSize: '18px', color: '#374151', textAlign: 'center', marginBottom: '30px' }
        },
        {
          id: '3',
          type: 'button',
          content: { text: 'Shop Now', url: '#' },
          styles: { 
            backgroundColor: '#dc2626', 
            color: '#ffffff', 
            padding: '15px 30px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: 'bold'
          }
        }
      ]
    }
  ];

  const addToHistory = useCallback((newBlocks: EmailBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newBlocks)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  }, [history, historyIndex]);

  const addBlock = (type: string) => {
    const newBlock: EmailBlock = {
      id: Date.now().toString(),
      type: type as EmailBlock['type'],
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      animation: {
        type: 'fadeIn',
        duration: 300,
        delay: 0
      }
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    setSelectedBlock(newBlock.id);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Enter your text here...', tag: 'p' };
      case 'image':
        return { src: '', alt: '', width: '100%' };
      case 'button':
        return { text: 'Click Here', url: '#' };
      case 'divider':
        return { thickness: 1, color: '#e5e7eb' };
      case 'spacer':
        return { height: 40 };
      case 'columns':
        return { 
          columns: [
            { content: 'Column 1 content', width: '50%' },
            { content: 'Column 2 content', width: '50%' }
          ]
        };
      case 'social':
        return { 
          platforms: [
            { name: 'Facebook', url: '#', icon: 'facebook' },
            { name: 'Twitter', url: '#', icon: 'twitter' },
            { name: 'Instagram', url: '#', icon: 'instagram' }
          ]
        };
      case 'video':
        return { url: '', thumbnail: '', width: '100%' };
      case 'html':
        return { html: '<p>Custom HTML content</p>' };
      default:
        return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'text':
        return { 
          fontSize: '16px', 
          color: '#374151', 
          textAlign: 'left', 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: '1.6',
          marginBottom: '16px'
        };
      case 'image':
        return { 
          textAlign: 'center', 
          marginBottom: '20px',
          borderRadius: '8px'
        };
      case 'button':
        return { 
          backgroundColor: '#10b981', 
          color: '#ffffff', 
          padding: '12px 24px',
          borderRadius: '6px',
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '16px',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.2s ease'
        };
      case 'divider':
        return {
          marginTop: '20px',
          marginBottom: '20px'
        };
      case 'spacer':
        return {};
      case 'columns':
        return {
          display: 'flex',
          gap: '20px',
          marginBottom: '20px'
        };
      case 'social':
        return {
          textAlign: 'center',
          marginBottom: '20px'
        };
      case 'video':
        return {
          textAlign: 'center',
          marginBottom: '20px'
        };
      default:
        return {};
    }
  };

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...blocks];
    const draggedBlock = newBlocks[dragIndex];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, draggedBlock);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, addToHistory]);

  const updateBlock = (id: string, updates: Partial<EmailBlock>) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    setSelectedBlock(null);
  };

  const duplicateBlock = (id: string) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      const newBlock = { ...JSON.parse(JSON.stringify(block)), id: Date.now().toString() };
      const blockIndex = blocks.findIndex(b => b.id === id);
      const newBlocks = [...blocks];
      newBlocks.splice(blockIndex + 1, 0, newBlock);
      setBlocks(newBlocks);
      addToHistory(newBlocks);
    }
  };

  const loadTemplate = (template: any) => {
    const templateBlocks = template.blocks.map((block: any) => ({
      ...block,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setBlocks(templateBlocks);
    addToHistory(templateBlocks);
    setShowTemplates(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (onSave) {
        await onSave(blocks);
      }
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(blocks);
    }
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const getZoomStyle = () => ({
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top center',
    transition: 'transform 0.2s ease'
  });

  // const DraggableBlock: React.FC<{ block: EmailBlock; index: number }> = ({ block, index }) => {
  const DraggableBlock: React.FC<{ block: EmailBlock; index: number; selectedBlock: string | null; setSelectedBlock: (id: string | null) => void }> = ({ block, index, selectedBlock, setSelectedBlock }) => {
  
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        
        const canvas = document.getElementById("email-canvas");
        const sidebar = document.getElementById("block-settings");

        if (
          canvas &&
          !canvas.contains(event.target as Node) &&
          sidebar &&
          !sidebar.contains(event.target as Node)
        ) {
          setSelectedBlock(null);
        }


      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const [{ handlerId }, drop] = useDrop({
      accept: 'block',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: any, monitor) {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;
        
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
        
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
        
        moveBlock(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag({
      type: 'block',
      item: () => {
        setIsDragging(true);
        return { id: block.id, index };
      },
      end: () => {
        setIsDragging(false);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));

    return (
      <div
        ref={ref}
        data-handler-id={handlerId}
        style={{ opacity, cursor: 'move' }}
        className={`group relative border-2 border-dashed transition-all duration-200 ${
          selectedBlock === block.id 
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg' 
            : isDragging
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-transparent hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
        }`}
        // onClick={() => setSelectedBlock(block.id)}
        onClick={(e) => {
          e.stopPropagation(); 
          setSelectedBlock(block.id);
        }}

      >
        {/* Block Controls */}
        
        <div className={`flex items-center justify-between mb-2 transition-opacity duration-200 ${
          selectedBlock === block.id || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>

          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg px-2 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateBlock(block.id);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors rounded"
              title="Duplicate"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(block.id);
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors rounded"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div 
              className="p-1 text-gray-600 dark:text-gray-400 cursor-move rounded"
              title="Drag to reorder"
              ref={drag}
            >
              <GripVertical className="w-3 h-3" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg px-2 py-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
              {block.type}
            </span>
          </div>
        </div>
        
        <BlockRenderer block={block} />
      </div>
    );
  };

  const BlockRenderer: React.FC<{ block: EmailBlock }> = ({ block }) => {
    switch (block.type) {
      case 'text':
        return (
          <div style={block.styles} className="p-4">
            <div
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updateBlock(block.id, {
                  content: { ...block.content, text: e.currentTarget.textContent || '' }
                });
              }}
              style={{ outline: 'none', minHeight: '20px' }}
              className="focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 rounded"
            >
              {block.content.text}
            </div>
          </div>
        );
      
      case 'image':
      return (
        <div style={block.styles} className="p-4">
          <input
            type="file"
            accept="image/*"
            id={`file-upload-${block.id}`}
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updateBlock(block.id, {
                    content: {
                      ...block.content,
                      src: reader.result,
                      alt: file.name,
                    },
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          
          {block.content.src ? (
            <img
              src={block.content.src}
              alt={block.content.alt}
              style={{
                width: block.content.width,
                maxWidth: '100%',
                borderRadius: block.styles.borderRadius || '8px',
                cursor: 'pointer',
              }}
              className="transition-all duration-200 hover:shadow-lg"
              onClick={() => {
                document.getElementById(`file-upload-${block.id}`)?.click();
              }}
            />
          ) : (
            <div
              className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer"
              onClick={() => {
                document.getElementById(`file-upload-${block.id}`)?.click();
              }}
            >
              <div className="text-center">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">Click to add image</p>
              </div>
            </div>
          )}
        </div>
      );

      case 'button':
        return (
          <div style={block.styles} className="p-4">
            <a
              href={block.content.url}
              style={{
                backgroundColor: block.styles.backgroundColor,
                color: block.styles.color,
                padding: block.styles.padding,
                borderRadius: block.styles.borderRadius,
                fontSize: block.styles.fontSize,
                fontWeight: block.styles.fontWeight,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              className="hover:shadow-lg hover:transform hover:scale-105"
              onClick={(e) => e.preventDefault()}
            >
              {block.content.text}
            </a>
          </div>
        );
      case 'divider':
        return (
          <div className="p-4" style={block.styles}>
            <hr
              style={{
                height: `${block.content.thickness}px`,
                backgroundColor: block.content.color,
                border: 'none',
                margin: '0'
              }}
            />
          </div>
        );
      case 'spacer':
        return (
          <div
            style={{ height: `${block.content.height}px` }}
            className="relative"
          >
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 dark:border-gray-600 opacity-50 flex items-center justify-center">
              <span className="text-xs text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                {block.content.height}px spacer
              </span>
            </div>
          </div>
        );
      case 'columns':
        return (
          <div className="p-4">
            <div style={block.styles}>
              {block.content.columns.map((column: any, index: number) => (
                <div 
                  key={index} 
                  style={{ width: column.width }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded border-2 border-dashed border-gray-300 dark:border-gray-600"
                >
                  <div
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newColumns = [...block.content.columns];
                      newColumns[index].content = e.currentTarget.textContent || '';
                      updateBlock(block.id, {
                        content: { ...block.content, columns: newColumns }
                      });
                    }}
                    style={{ outline: 'none', minHeight: '40px' }}
                  >
                    {column.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'social':
        return (
          <div style={block.styles} className="p-4">
            <div className="flex items-center justify-center space-x-4">
              {block.content.platforms.map((platform: any, index: number) => (
                <a
                  key={index}
                  href={platform.url}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {platform.name.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        );
      case 'video':
        return (
          <div style={block.styles} className="p-4">
            {block.content.url ? (
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={block.content.thumbnail || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600&h=300'}
                  alt="Video thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-600">
                <div className="text-center">
                  <Crown className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <p className="text-purple-600 dark:text-purple-400 text-sm">Add video URL</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'html':
        return (
          <div
            className="p-4"
            dangerouslySetInnerHTML={{ __html: block.content.html }}
          />
        );
      default:
        return null;
    }
  };

  // Load template if templateId is provided
  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        loadTemplate(template);
      }
    }
  }, [templateId]);

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-[85vh] bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigate('/newsletter')}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Builder</h2>
              </div>
              
              {/* Toolbar */}
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={undo}
                  disabled={historyIndex === 0}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setShowTemplates(true)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Templates"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="View Code"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>

              {/* Preview Mode Selector */}
              {/* <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg overflow-hidden">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded text-sm transition-colors ${
                    previewMode === 'desktop' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Monitor className="w-[14px] h-4" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded text-sm transition-colors ${
                    previewMode === 'tablet' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Tablet className="w-[14px] h-4" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded text-sm transition-colors ${
                    previewMode === 'mobile' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Smartphone className="w-[14px] h-4" />
                  <span>Mobile</span>
                </button>
              </div> */}
            </div>

            {/* Components */}
            <div className="flex-1 overflow-y-auto px-6">
            
            <h3 className="sticky top-0 z-10 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white mb-4 py-2">
              Components
            </h3>

              
              {/* Group components by category */}
              {['Content', 'Media', 'Interactive', 'Layout', 'Advanced'].map(category => {
                const categoryComponents = blockComponents.filter(comp => comp.category === category);
                if (categoryComponents.length === 0) return null;
                
                return (
                  <div key={category} className="mb-6">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {categoryComponents.map((component) => (
                        <button
                          key={component.type}
                          onClick={() => addBlock(component.type)}
                          className="w-full flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-emerald-300 transition-all duration-200 text-left group"
                        >
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 transition-colors">
                            <component.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {component.label}
                              </span>
                              {component.premium && (
                                <Crown className="w-3 h-3 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {component.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Block Settings */}
            {selectedBlock && (
              <div id="block-settings" className="border-t border-gray-200 dark:border-gray-700 px-6 h-1/3 overflow-y-auto">
                
                <h3 className="sticky top-0 z-10 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white mb-4 p-2">
                  Block Settings
                </h3>
                <BlockSettings
                  block={blocks.find(b => b.id === selectedBlock)!}
                  onUpdate={(updates) => updateBlock(selectedBlock, updates)}
                />
              </div>
            )}
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col">
            {/* Top Toolbar */}
            
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Left: Zoom + Block Count */}
              <div className="flex items-center space-x-4 flex-1 lg:justify-start">
                <div className="flex items-center">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Zoom Out"
                  >
                    <Minimize className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Zoom In"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {blocks.length} block{blocks.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Center: Preview Mode Dropdown */}
              <div className="flex-1 flex justify-center">
                <div className="relative inline-block">
                  <select
                    value={previewMode}
                    onChange={(e) => setPreviewMode(e.target.value as 'desktop' | 'tablet' | 'mobile')}
                    className="text-sm font-medium px-4 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none shadow-sm"
                  >
                    <option value="desktop">Desktop</option>
                    <option value="tablet">Tablet</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center space-x-3 flex-1 lg:justify-end">
                <button
                  onClick={handlePreview}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  onClick={() => navigate('/newsletter/create-campaign')}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>

            </div>
          </div>



            {/* Canvas */}
            <div className="flex-1 overflow-auto p-8 bg-gray-100 dark:bg-gray-900">
              <div className="flex justify-center">
                <div
                  id="email-canvas"
                  style={{ 
                    width: getPreviewWidth(),
                    maxWidth: '100%',
                    backgroundColor: '#ffffff',
                    minHeight: '600px',
                    ...getZoomStyle()
                  }}
                  className="shadow-xl rounded-lg overflow-hidden"
                >
                  {/* {blocks.map((block, index) => (
                    <DraggableBlock key={block.id} block={block} index={index} />
                  ))} */}
                  {blocks.map((block, index) => (
                    <DraggableBlock 
                      key={block.id} 
                      block={block} 
                      index={index} 
                      selectedBlock={selectedBlock} 
                      setSelectedBlock={setSelectedBlock} 
                    />
                  ))}

                  
                  {blocks.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500 dark:text-gray-400">
                      <div className="w-18 h-18 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-emerald-900 dark:to-emerald-800 rounded-full flex items-center justify-center mb-3">
                        <Plus className="w-12 h-12 text-emerald-300 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Start Building Your Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                        Drag components from the sidebar to create beautiful, responsive emails that engage your audience.
                      </p>
                      <button
                        onClick={() => setShowTemplates(true)}
                        className="mt-6 flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Layers className="w-4 h-4" />
                        <span>Choose Template</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Template</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="group border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                      onClick={() => loadTemplate(template)}
                    >
                      <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                              Use Template
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.blocks.length} blocks
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </DndProvider>
  );
};

const BlockSettings: React.FC<{ 
  block: EmailBlock; 
  onUpdate: (updates: Partial<EmailBlock>) => void 
}> = ({ block, onUpdate }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  const updateStyles = (key: string, value: any) => {
    onUpdate({
      styles: { ...block.styles, [key]: value }
    });
  };

  switch (block.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Size
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={parseInt(block.styles.fontSize)}
              onChange={(e) => updateStyles('fontSize', `${e.target.value}px`)}
              className="w-full"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {block.styles.fontSize}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color
            </label>
            <input
              type="color"
              value={block.styles.color}
              onChange={(e) => updateStyles('color', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alignment
            </label>
            <div className="flex items-center space-x-2">
              {[
                { value: 'left', icon: AlignLeft },
                { value: 'center', icon: AlignCenter },
                { value: 'right', icon: AlignRight }
              ].map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateStyles('textAlign', value)}
                  className={`p-2 border border-gray-300 dark:border-gray-600 rounded ${
                    block.styles.textAlign === value ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-500' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Weight
            </label>
            <select
              value={block.styles.fontWeight || 'normal'}
              onChange={(e) => updateStyles('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
            >
              <option value="normal">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>
      );
      
    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={block.content.src}
              onChange={(e) => updateContent('src', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={block.content.alt}
              onChange={(e) => updateContent('alt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Border Radius
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={parseInt(block.styles.borderRadius) || 0}
              onChange={(e) => updateStyles('borderRadius', `${e.target.value}px`)}
              className="w-full"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {block.styles.borderRadius || '0px'}
            </div>
          </div>
        </div>
      );
      
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={block.content.text}
              onChange={(e) => updateContent('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Link URL
            </label>
            <input
              type="url"
              value={block.content.url}
              onChange={(e) => updateContent('url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={block.styles.backgroundColor}
              onChange={(e) => updateStyles('backgroundColor', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={block.styles.color}
              onChange={(e) => updateStyles('color', e.target.value)}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Border Radius
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={parseInt(block.styles.borderRadius) || 0}
              onChange={(e) => updateStyles('borderRadius', `${e.target.value}px`)}
              className="w-full"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {block.styles.borderRadius || '0px'}
            </div>
          </div>
        </div>
      );
      
    case 'spacer':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Height (px)
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={block.content.height}
              onChange={(e) => updateContent('height', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {block.content.height}px
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          <Settings className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No settings available for this block type</p>
        </div>
      );
  }
};

export default EmailBuilder;
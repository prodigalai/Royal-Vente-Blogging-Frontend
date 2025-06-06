import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  Send, 
  Image, 
  Tag, 
  X,
  Plus,
  ArrowLeft
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published'
  });
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'script', 'indent', 'direction',
    'color', 'background', 'align', 'link', 'image', 'video'
  ];

  const handleSave = async (status: 'draft' | 'published') => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Saving article:', { ...article, status });
    
    setIsSaving(false);
    
    if (status === 'published') {
      navigate('/articles');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !article.tags.includes(newTag.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/blogs')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isPreview ? 'Preview Blogs' : 'Create New Blogs'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            
            <button
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            
            <button
              onClick={() => handleSave('published')}
              disabled={isSaving || !article.title || !article.content}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-4 h-4" />
              <span>{isSaving ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {article.coverImage && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {article.title || 'Untitled Article'}
              </h1>
              
              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic">
                  {article.excerpt}
                </p>
              )}
              
              {/* Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-8">
            {/* Cover Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Cover Image URL
              </label>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="url"
                    value={article.coverImage}
                    onChange={(e) => setArticle(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg transition-colors">
                  <Image className="w-4 h-4" />
                  <span>Upload</span>
                </button>
              </div>
              {article.coverImage && (
                <div className="mt-4">
                  <img
                    src={article.coverImage}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Blog Title
              </label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter your article title..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Blog Excerpt
              </label>
              <textarea
                value={article.excerpt}
                onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Write a brief description of your article..."
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={addTag}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Article Content
              </label>
              <div className="prose-editor">
                <ReactQuill
                  theme="snow"
                  value={article.content}
                  onChange={(content) => setArticle(prev => ({ ...prev, content }))}
                  modules={modules}
                  formats={formats}
                  placeholder="Start writing your article..."
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateArticle;
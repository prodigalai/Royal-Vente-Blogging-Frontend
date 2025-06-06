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
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  User as UserIcon
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tooltip } from 'react-tooltip';

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    category: '',
    authorNames: [''],
    authorProfiles: [''],
    externalLinks: [{ title: '', url: '' }],
    imageBuffer: '',
    mimeType: '',
  });
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'color',
    'background',
    'align',
    'link',
    'image',
    'video',
  ];

  const handleSave = async (status: 'draft' | 'published') => {
    setIsSaving(true);
    // Build metadata object
    const metadata: any = {
      imageBuffer: blog.imageBuffer,
      mimeType: blog.mimeType,
      description: blog.excerpt,
      authorNames: blog.authorNames.filter(Boolean),
      authorProfiles: blog.authorProfiles.filter(Boolean),
      status,
      tags: blog.tags,
      category: blog.category,
      externalLinks: blog.externalLinks.filter(l => l.title && l.url),
    };
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Saving blog:', {
      title: blog.title,
      content: blog.content,
      metadata,
    });
    setIsSaving(false);
    if (status === 'published') {
      navigate('/blogs');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      setBlog((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlog((prev) => ({
          ...prev,
          imageBuffer: (reader.result as string).split(',')[1],
          mimeType: file.type,
          coverImage: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Advanced options handlers
  const handleAuthorNameChange = (idx: number, value: string) => {
    setBlog((prev) => {
      const arr = [...prev.authorNames];
      arr[idx] = value;
      return { ...prev, authorNames: arr };
    });
  };
  const handleAuthorProfileChange = (idx: number, value: string) => {
    setBlog((prev) => {
      const arr = [...prev.authorProfiles];
      arr[idx] = value;
      return { ...prev, authorProfiles: arr };
    });
  };
  const addAuthor = () => {
    setBlog((prev) => ({
      ...prev,
      authorNames: [...prev.authorNames, ''],
      authorProfiles: [...prev.authorProfiles, ''],
    }));
  };
  const removeAuthor = (idx: number) => {
    setBlog((prev) => {
      const names = prev.authorNames.filter((_, i) => i !== idx);
      const profiles = prev.authorProfiles.filter((_, i) => i !== idx);
      return { ...prev, authorNames: names, authorProfiles: profiles };
    });
  };
  const handleExternalLinkChange = (idx: number, field: 'title' | 'url', value: string) => {
    setBlog((prev) => {
      const arr = prev.externalLinks.map((l, i) =>
        i === idx ? { ...l, [field]: value } : l
      );
      return { ...prev, externalLinks: arr };
    });
  };
  const addExternalLink = () => {
    setBlog((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { title: '', url: '' }],
    }));
  };
  const removeExternalLink = (idx: number) => {
    setBlog((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-3 py-5 flex flex-col lg:flex-row gap-10">
        {/* Main Form */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blogs')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                aria-label="Back to blogs"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {isPreview ? 'Preview Blog' : 'Create New Blog'}
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
                {isSaving ? <span className="loader w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span> : <Save className="w-4 h-4" />}
                <span>Save Draft</span>
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={isSaving || !blog.title || !blog.content}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
              >
                {isSaving ? <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <Send className="w-4 h-4" />}
                <span>{isSaving ? 'Publishing...' : 'Publish'}</span>
              </button>
            </div>
          </div>
          {isPreview ? (
            /* Preview Mode */
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {blog.coverImage && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-10">
                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full shadow-sm"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic">
                    {blog.excerpt}
                  </p>
                )}
                {/* Content */}
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="space-y-8">
              {/* Cover Image */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-primary-500" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Cover Image</h2>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-full md:w-1/2 h-40 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Image className="w-8 h-8 text-primary-500 mb-2" />
                    <span className="text-xs text-primary-700 dark:text-primary-300">Drag & drop or click to upload</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="url"
                      value={blog.coverImage}
                      onChange={(e) => setBlog((prev) => ({ ...prev, coverImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {blog.coverImage && (
                      <div className="mt-4">
                        <img
                          src={blog.coverImage}
                          alt="Cover preview"
                          className="w-full h-40 object-cover rounded-lg shadow"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Title */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={blog.title}
                  onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your blog title..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              {/* Excerpt/Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Blog Description
                </label>
                <textarea
                  value={blog.excerpt}
                  onChange={(e) => setBlog((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Write a brief description of your blog..."
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full shadow-sm"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 transition-colors"
                        data-tooltip-id="remove-tag"
                        data-tooltip-content="Remove tag"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <Tooltip id="remove-tag" />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={addTag}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow"
                    data-tooltip-id="add-tag"
                    data-tooltip-content="Add tag"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                  <Tooltip id="add-tag" />
                </div>
              </div>
              {/* Content Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Blog Content
                </label>
                <div className="prose-editor">
                  <ReactQuill
                    theme="snow"
                    value={blog.content}
                    onChange={(content) => setBlog((prev) => ({ ...prev, content }))}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your blog..."
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Advanced Options Sidebar */}
        <div className="w-full lg:w-96 mt-10 lg:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 sticky top-24">
            <button
              className="flex items-center justify-between w-full text-left font-bold text-gray-900 dark:text-white mb-6 text-lg"
              onClick={() => setShowAdvanced((v) => !v)}
            >
              <span className="flex items-center gap-2"><ChevronDown className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} /> Advanced Options</span>
            </button>
            {showAdvanced && (
              <div className="space-y-8">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={blog.status}
                    onChange={(e) => setBlog((prev) => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={blog.category}
                    onChange={(e) => setBlog((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Enter category"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                {/* Authors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Authors</label>
                  {blog.authorNames.map((name, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
                        {name ? name[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => handleAuthorNameChange(idx, e.target.value)}
                        placeholder="Author name"
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="url"
                        value={blog.authorProfiles[idx] || ''}
                        onChange={(e) => handleAuthorProfileChange(idx, e.target.value)}
                        placeholder="Profile URL"
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {blog.authorNames.length > 1 && (
                        <button onClick={() => removeAuthor(idx)} className="text-red-500 hover:text-red-700" data-tooltip-id="remove-author" data-tooltip-content="Remove author"><X className="w-4 h-4" /></button>
                      )}
                      <Tooltip id="remove-author" />
                    </div>
                  ))}
                  <button onClick={addAuthor} className="flex items-center text-primary-600 hover:text-primary-800 text-sm mt-1"><Plus className="w-4 h-4 mr-1" /> Add Author</button>
                </div>
                {/* External Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">External Links</label>
                  {blog.externalLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-primary-500" />
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleExternalLinkChange(idx, 'title', e.target.value)}
                        placeholder="Link title"
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleExternalLinkChange(idx, 'url', e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {blog.externalLinks.length > 1 && (
                        <button onClick={() => removeExternalLink(idx)} className="text-red-500 hover:text-red-700" data-tooltip-id="remove-link" data-tooltip-content="Remove link"><X className="w-4 h-4" /></button>
                      )}
                      <Tooltip id="remove-link" />
                    </div>
                  ))}
                  <button onClick={addExternalLink} className="flex items-center text-primary-600 hover:text-primary-800 text-sm mt-1"><LinkIcon className="w-4 h-4 mr-1" /> Add Link</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

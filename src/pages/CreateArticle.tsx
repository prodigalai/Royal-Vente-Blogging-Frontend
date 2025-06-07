import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
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
  Link as LinkIcon,
  User as UserIcon,
  Upload,
  FileText,
  Settings,
  Sparkles,
  Calendar,
  Clock,
  BarChart3,
  Zap,
  Palette,
  Type,
  Layout,
  Globe
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    readingTime: 0,
    publishDate: '',
  });
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'seo'>('content');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

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
    try {
      setIsSaving(true);
      if (!blog.content) {
        alert('Description is required!');
        setIsSaving(false);
        return;
      }
      const payload = {
        imageBuffer: blog.imageBuffer,
        mimeType: blog.mimeType,
        title: blog.title,
        description: blog.content,
        authorNames: blog.authorNames.filter(Boolean),
        status,
        tags: blog.tags,
        category: blog.category,
        externalLinks: blog.externalLinks.filter(l => l.title && l.url),
      };
      console.log('Payload:', payload);
      const username = "ashwini";
      const token = localStorage.getItem('token');
      if (!username) throw new Error('Username not found');
      if (!token) throw new Error('Authentication token not found');
      const response = await api.post(`/blogs/personal/${username}/blogs`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Blog saved successfully:', response.data);
      if (status === 'published') {
        navigate('/articles');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSaving(false);
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
          coverImage: reader.result as string,
          imageBuffer: (reader.result as string).split(',')[1],
          mimeType: file.type,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  const estimatedReadingTime = Math.ceil(blog.content.replace(/<[^>]*>/g, '').split(' ').length / 200);
  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden transition-colors">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Modern floating header */}
      <div className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 shadow-xl shadow-black/5 rounded-2xl transition-colors">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/articles')}
                  className="group flex items-center justify-center w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-700 hover:from-slate-200 hover:to-slate-300 dark:hover:from-gray-700 dark:hover:to-gray-800 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Back to articles"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-gray-300 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 dark:from-violet-700 dark:via-purple-800 dark:to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-emerald-700 dark:to-emerald-800 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {isPreview ? 'Preview Mode' : 'Create Blog Post'}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
                      {isPreview ? 'Review your masterpiece' : 'Craft something amazing'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-xl">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">{estimatedReadingTime} min read</span>
                </div>
                
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isPreview 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                  } hover:scale-105`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreview ? 'Edit' : 'Preview'}</span>
                </button>
                
                <button
                  onClick={() => handleSave('draft')}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-sm"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save</span>
                </button>
                
                <button
                  onClick={() => handleSave('published')}
                  disabled={isSaving || !blog.title || !blog.content}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Publish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-8 relative">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {isPreview ? (
            /* Enhanced Preview Mode */
            <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/60 overflow-hidden">
              {blog.coverImage && (
                <div className="relative aspect-[2/1] overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-8 lg:p-12">
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-semibold rounded-full border border-violet-200/50 shadow-sm"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
                  {blog.title || 'Your Amazing Blog Title'}
                </h1>
                {blog.excerpt && (
                  <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed font-medium">
                    {blog.excerpt}
                  </p>
                )}
                <div className="flex items-center space-x-6 mb-8 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{estimatedReadingTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>{wordCount} words</span>
                  </div>
                </div>
                <div
                  className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:bg-gradient-to-r prose-headings:from-slate-900 prose-headings:to-slate-700 prose-headings:bg-clip-text prose-headings:text-transparent prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content || '<p class="text-slate-400 italic text-center py-12">Start writing to see your content here...</p>' }}
                />
              </div>
            </div>
          ) : (
            /* Enhanced Edit Mode */
            <div className="space-y-6">
              {/* Modern Tab Navigation */}
              <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 dark:border-gray-700/60">
                <div className="flex space-x-1">
                  {[
                    { id: 'content', label: 'Content', icon: Type },
                    { id: 'design', label: 'Design', icon: Palette },
                    { id: 'seo', label: 'SEO', icon: Globe },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Enhanced Cover Image Section */}
                  <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Image className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cover Image</h2>
                        <p className="text-sm text-slate-500 dark:text-gray-400">Make a stunning first impression</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <label className="group relative flex flex-col items-center justify-center h-56 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 bg-gradient-to-br from-slate-50 to-white">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-slate-700 dark:text-white">Upload Image</p>
                            <p className="text-sm text-slate-500 dark:text-gray-400">Drag & drop or click to browse</p>
                            <p className="text-xs text-slate-400 mt-1 dark:text-gray-500">Supports JPG, PNG, WebP</p>
                          </div>
                        </div>
                      </label>
                      <div className="space-y-4">
                        <input
                          type="url"
                          value={blog.coverImage}
                          onChange={(e) => setBlog((prev) => ({ ...prev, coverImage: e.target.value }))}
                          placeholder="Or paste an image URL..."
                          className="w-full border border-slate-200 dark:border-gray-700/60 rounded-xl px-4 py-4 bg-white/50 dark:bg-gray-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-gray-400 font-medium"
                        />
                        {blog.coverImage && (
                          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                            <img
                              src={blog.coverImage}
                              alt="Cover preview"
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Title Section */}
                  <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                    <label className="block text-lg font-bold text-slate-700 dark:text-white mb-4">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      value={blog.title}
                      onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Write an irresistible title..."
                      className="w-full border border-slate-200 dark:border-gray-700/60 rounded-xl px-6 py-5 bg-white/50 dark:bg-gray-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-gray-400"
                    />
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-gray-400">Character count: {blog.title.length}</span>
                      <span className={`font-medium ${blog.title.length > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {blog.title.length > 60 ? 'Consider shortening' : 'Good length'}
                      </span>
                    </div>
                  </div>

                
                  {/* Enhanced Tags Section */}
                  <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                    <label className="block text-lg font-bold text-slate-700 dark:text-white mb-4">
                      Tags
                    </label>
                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-6">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-semibold rounded-full border border-violet-200/50 hover:border-violet-300 transition-all shadow-sm"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-500 transition-colors ml-1 p-0.5 hover:bg-red-100 rounded-full"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a tag..."
                        className="flex-1 border border-slate-200 dark:border-gray-700/60 rounded-xl px-4 py-3 bg-white/50 dark:bg-gray-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-gray-400"
                      />
                      <button
                        onClick={addTag}
                        className="flex items-center space-x-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/25"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Content Editor */}
                  <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                    <label className="block text-lg font-bold text-slate-700 dark:text-white mb-4">
                      Blog Content
                    </label>
                    <div className="prose-editor rounded-xl overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all shadow-sm">
                      <ReactQuill
                        theme="snow"
                        value={blog.content}
                        onChange={(content) => setBlog((prev) => ({ ...prev, content }))}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your amazing blog post..."
                        style={{ minHeight: '500px' }}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-gray-400">
                      <span>Words: {wordCount}</span>
                      <span>Estimated reading time: {estimatedReadingTime} minutes</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Design Settings</h2>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Customize the visual appearance</p>
                    </div>
                  </div>
                  <div className="text-center py-12">
                    <Layout className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-gray-400">Design customization features coming soon!</p>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">SEO Optimization</h2>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Optimize for search engines</p>
                    </div>
                  </div>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-gray-400">SEO optimization tools coming soon!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Sidebar */}
        <div className="w-full xl:w-96">
          <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/60 p-8 sticky top-28">
            <button
              className="flex items-center justify-between w-full text-left mb-6 group"
              onClick={() => setShowAdvanced((v) => !v)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Advanced Settings</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Fine-tune your blog</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>

            {showAdvanced && (
              <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-3">Publication Status</label>
                  <select
                    value={blog.status}
                    onChange={(e) => setBlog((prev) => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="w-full border border-slate-200 dark:border-gray-700/60 rounded-xl px-4 py-3 bg-white/50 dark:bg-gray-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-3">Category</label>
                  <input
                    type="text"
                    value={blog.category}
                    onChange={(e) => setBlog((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Technology, Lifestyle, Business"
                    className="w-full border border-slate-200 dark:border-gray-700/60 rounded-xl px-4 py-3 bg-white/50 dark:bg-gray-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-gray-400"
                  />
                </div>

                {/* Authors */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-3">Authors</label>
                  <div className="space-y-3">
                    {blog.authorNames.map((name, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {name ? name[0].toUpperCase() : <UserIcon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handleAuthorNameChange(idx, e.target.value)}
                            placeholder="Author name"
                            className="w-full border border-slate-200 dark:border-gray-700/60 rounded-lg px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="url"
                            value={blog.authorProfiles[idx] || ''}
                            onChange={(e) => handleAuthorProfileChange(idx, e.target.value)}
                            placeholder="Profile URL"
                            className="w-full border border-slate-200 dark:border-gray-700/60 rounded-lg px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        {blog.authorNames.length > 1 && (
                          <button 
                            onClick={() => removeAuthor(idx)} 
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={addAuthor} 
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-3 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Author
                  </button>
                </div>

                {/* External Links */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-3">External Links</label>
                  <div className="space-y-3">
                    {blog.externalLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                        <LinkIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => handleExternalLinkChange(idx, 'title', e.target.value)}
                            placeholder="Link title"
                            className="w-full border border-slate-200 dark:border-gray-700/60 rounded-lg px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleExternalLinkChange(idx, 'url', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full border border-slate-200 dark:border-gray-700/60 rounded-lg px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        {blog.externalLinks.length > 1 && (
                          <button 
                            onClick={() => removeExternalLink(idx)} 
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={addExternalLink} 
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-3 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" /> Add Link
                  </button>
                </div>

                {/* Analytics Dashboard */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-semibold text-slate-700">Content Analytics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200/50">
                      <div className="text-2xl font-bold text-blue-900">{blog.title.length}</div>
                      <div className="text-sm text-blue-600 font-medium">Title chars</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200/50">
                      <div className="text-2xl font-bold text-emerald-900">{blog.tags.length}</div>
                      <div className="text-sm text-emerald-600 font-medium">Tags</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200/50">
                      <div className="text-2xl font-bold text-purple-900">{wordCount}</div>
                      <div className="text-sm text-purple-600 font-medium">Words</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200/50">
                      <div className="text-2xl font-bold text-amber-900">{estimatedReadingTime}</div>
                      <div className="text-sm text-amber-600 font-medium">Min read</div>
                    </div>
                  </div>
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
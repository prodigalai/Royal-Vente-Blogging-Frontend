//@ts-nocheck
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { EditorToolbar } from "./EditorToolbar"
import { ArticleHeader } from "./ArticleHeader"
import { RichTextEditor } from "./RichTextEditor"
import { AutoSaveIndicator } from "./AutoSaveIndicator"
import { PublishSidebar } from "./PublishSidebar"

interface Article {
  id: string
  title: string
  subtitle: string
  content: string
  isDraft: boolean
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  visibility?: "public" | "private"
}

interface PublishOptions {
  visibility: "public" | "private"
  scheduledDate?: Date
  tags: string[]
}

interface BlogEditorProps {
  initialArticle?: Partial<Article>
  onSave?: (article: Article) => Promise<void>
  onPublish?: (article: Article, options: PublishOptions) => Promise<void>
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ initialArticle, onSave, onPublish }) => {
  const [article, setArticle] = useState<Article>({
    id: initialArticle?.id || crypto.randomUUID(),
    title: initialArticle?.title || "",
    subtitle: initialArticle?.subtitle || "",
    content: initialArticle?.content || "",
    isDraft: initialArticle?.isDraft ?? true,
    createdAt: initialArticle?.createdAt || new Date(),
    updatedAt: new Date(),
    tags: initialArticle?.tags || [],
    visibility: initialArticle?.visibility || "public",
  })

  const [autoSaveStatus, setAutoSaveStatus] = useState<"saving" | "saved" | "error" | "idle">("idle")
  const [lastSaved, setLastSaved] = useState<Date>()
  const [isPublishSidebarOpen, setIsPublishSidebarOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const lastContentRef = useRef<string>("")

  const calculateReadingTime = useCallback((content: string) => {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, "") // Strip HTML tags
    const wordCount = textContent.split(/\s+/).filter((word) => word.length > 0).length
    return Math.ceil(wordCount / wordsPerMinute) || 1
  }, [])


  const saveArticle = useCallback(
    async (force = false) => {
      if (!onSave) return

      const currentContent = JSON.stringify({
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
      })

      if (!force && currentContent === lastContentRef.current) return

      setAutoSaveStatus("saving")
      try {
        await onSave(article)
        setAutoSaveStatus("saved")
        setLastSaved(new Date())
        lastContentRef.current = currentContent
      } catch (error) {
        setAutoSaveStatus("error")
        console.error("Auto-save failed:", error)
      }
    },
    [article, onSave],
  )

  const debouncedSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    setAutoSaveStatus("idle")

    autoSaveTimeoutRef.current = setTimeout(() => {
      if (article.title || article.subtitle || article.content) {
        saveArticle()
      }
    }, 3000) // Save after 3 seconds of inactivity
  }, [article.title, article.subtitle, article.content, saveArticle])

  // Auto-save when content changes
  useEffect(() => {
    debouncedSave()
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [debouncedSave])

  const handleTitleChange = useCallback((title: string) => {
    setArticle((prev) => ({ ...prev, title, updatedAt: new Date() }))
  }, [])

  const handleSubtitleChange = useCallback((subtitle: string) => {
    setArticle((prev) => ({ ...prev, subtitle, updatedAt: new Date() }))
  }, [])

  const handleContentChange = useCallback((content: string) => {
    setArticle((prev) => ({ ...prev, content, updatedAt: new Date() }))
  }, [])

  const handleManualSave = async () => {
    setIsSaving(true)
    try {
      await saveArticle(true)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async (options: PublishOptions) => {
    if (!onPublish) return

    try {
      const publishedArticle = {
        ...article,
        isDraft: false,
        updatedAt: new Date(),
        tags: options.tags,
        visibility: options.visibility,
      }
      await onPublish(publishedArticle, options)
      setArticle(publishedArticle)
      setIsPublishSidebarOpen(false)
    } catch (error) {
      console.error("Publish failed:", error)
    }
  }

  const handleSaveDraft = async () => {
    if (!onSave) return

    try {
      const draftArticle = { ...article, isDraft: true, updatedAt: new Date() }
      await onSave(draftArticle)
      setArticle(draftArticle)
      setIsPublishSidebarOpen(false)
    } catch (error) {
      console.error("Save draft failed:", error)
    }
  }

  const retryAutoSave = () => {
    if (autoSaveStatus === "error") {
      saveArticle(true)
    }
  }

  const canPublish = useMemo(() => {
    return article.title.trim() !== "" || article.content.trim() !== "";
  }, [article.title, article.content]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
             {/* Main Content Area - No double headers */}
       <div className="pt-8 pb-32 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Article Header */}
          <div className="mb-16">
            <ArticleHeader
              title={article.title}
              subtitle={article.subtitle}
              onTitleChange={handleTitleChange}
              onSubtitleChange={handleSubtitleChange}
            />
          </div>

          {/* Rich Text Editor */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:leading-8 prose-p:mb-6">
            <RichTextEditor content={article.content} onChange={handleContentChange} />
          </div>

          {/* Extra space for comfortable writing */}
          <div className="h-[80vh]"></div>
        </div>
      </div>

      {/* Floating Publish Button - Simple and Clean */}
      <div className="fixed top-20 right-6 z-40">
        <button
          onClick={() => setIsPublishSidebarOpen(true)}
          disabled={!canPublish}
          className={`bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-200 ${
            !canPublish ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          Publish
        </button>
      </div>

      {/* Auto Save Indicator */}
      <div className="fixed bottom-6 left-6 cursor-pointer z-40" onClick={retryAutoSave}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200/40 dark:border-gray-700/40">
          <AutoSaveIndicator status={autoSaveStatus} lastSaved={lastSaved} />
        </div>
      </div>

      {/* Publish Sidebar */}
      <PublishSidebar
        isOpen={isPublishSidebarOpen}
        onClose={() => setIsPublishSidebarOpen(false)}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        isDraft={article.isDraft}
        readingTime={calculateReadingTime(article.content)}
      />
    </div>
  )
}

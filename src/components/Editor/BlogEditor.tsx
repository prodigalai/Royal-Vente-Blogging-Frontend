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
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-4">
        <EditorToolbar
          onPublish={() => setIsPublishSidebarOpen(true)}
          onSave={handleManualSave}
          isDraft={article.isDraft}
          isSaving={isSaving}
          canPublish={canPublish}
          userImage="https://i.pravatar.cc/300"
        />

        <div className="py-8">
          <div className="max-w-2xl mx-auto">
            <ArticleHeader
              title={article.title}
              subtitle={article.subtitle}
              onTitleChange={handleTitleChange}
              onSubtitleChange={handleSubtitleChange}
            />

            <RichTextEditor content={article.content} onChange={handleContentChange} />
          </div>
        </div>

        <div className="fixed bottom-4 right-4 cursor-pointer" onClick={retryAutoSave}>
          <AutoSaveIndicator status={autoSaveStatus} lastSaved={lastSaved} />
        </div>
      </div>

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

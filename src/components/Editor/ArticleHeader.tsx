"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface ArticleHeaderProps {
  title: string
  subtitle: string
  onTitleChange: (title: string) => void
  onSubtitleChange: (subtitle: string) => void
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, subtitle, onTitleChange, onSubtitleChange }) => {
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const subtitleRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto"
    element.style.height = `${element.scrollHeight}px`
  }

  useEffect(() => {
    if (titleRef.current) {
      adjustHeight(titleRef.current)
    }
  }, [title])

  useEffect(() => {
    if (subtitleRef.current) {
      adjustHeight(subtitleRef.current)
    }
  }, [subtitle])

  return (
    <div className="space-y-8 mb-16" style={{ paddingLeft: "50px" }}>
      {/* Title Input - Massive and Bold */}
      <textarea
        ref={titleRef}
        value={title}
        onChange={(e) => {
          onTitleChange(e.target.value)
          adjustHeight(e.target)
        }}
        placeholder="Title"
        className="w-full text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white placeholder-gray-200 dark:placeholder-gray-700 border-none outline-none resize-none overflow-hidden bg-transparent leading-[0.9] tracking-tighter font-serif selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-200"
        rows={1}
        style={{
          fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif',
          minHeight: "80px",
          lineHeight: "0.9",
        }}
      />

      {/* Subtitle Input - Large and Elegant */}
      <textarea
        ref={subtitleRef}
        value={subtitle}
        onChange={(e) => {
          onSubtitleChange(e.target.value)
          adjustHeight(e.target)
        }}
        placeholder="Tell your story..."
        className="w-full text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-600 border-none outline-none resize-none overflow-hidden bg-transparent leading-relaxed font-light selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-200"
        rows={1}
        style={{
          fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif',
          lineHeight: "1.3",
        }}
      />
    </div>
  )
}

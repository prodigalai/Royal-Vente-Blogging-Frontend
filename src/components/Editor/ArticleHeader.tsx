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
    <div className="mb-8" style={{ paddingLeft: "50px", paddingRight: "20px" }}>
      <textarea
        ref={titleRef}
        value={title}
        onChange={(e) => {
          onTitleChange(e.target.value)
          adjustHeight(e.target)
        }}
        placeholder="Title"
        className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none resize-none overflow-hidden bg-transparent leading-tight"
        rows={1}
        style={{
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          minHeight: "60px",
        }}
      />

      <textarea
        ref={subtitleRef}
        value={subtitle}
        onChange={(e) => {
          onSubtitleChange(e.target.value)
          adjustHeight(e.target)
        }}
        placeholder="Subtitle (optional)"
        className="w-full text-xl md:text-2xl text-gray-600 placeholder-gray-400 border-none outline-none resize-none overflow-hidden bg-transparent mt-2 leading-relaxed"
        rows={1}
        style={{
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        }}
      />
    </div>
  )
}

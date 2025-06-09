"use client"

import type React from "react"
import { useState } from "react"
import { X, Globe, Lock, Eye, Calendar } from "lucide-react"

interface PublishSidebarProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (options: PublishOptions) => void
  onSaveDraft: () => void
  isDraft: boolean
  readingTime: number
}

interface PublishOptions {
  visibility: "public" | "private"
  scheduledDate?: Date
  tags: string[]
}

export const PublishSidebar: React.FC<PublishSidebarProps> = ({
  isOpen,
  onClose,
  onPublish,
  onSaveDraft,
  isDraft,
  readingTime,
}) => {
  const [visibility, setVisibility] = useState<"public" | "private">("public")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePublish = () => {
    const options: PublishOptions = {
      visibility,
      tags,
      scheduledDate: isScheduled && scheduledDate ? new Date(scheduledDate) : undefined,
    }
    onPublish(options)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Story preview</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Eye size={16} />
                <span>Preview</span>
              </div>
              <p className="text-sm text-gray-500">This is how your story will appear to readers.</p>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium">{readingTime} min read</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Publishing to:</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe size={16} />
              <span>Your profile</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Visibility:</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  className="text-green-600"
                />
                <Globe size={16} className="text-gray-500" />
                <span className="text-sm">Public (anyone can read)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                  className="text-green-600"
                />
                <Lock size={16} className="text-gray-500" />
                <span className="text-sm">Private (only you can read)</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="text-green-600"
              />
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm">Schedule for later</span>
            </label>
            {isScheduled && (
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                min={new Date().toISOString().slice(0, 16)}
              />
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePublish}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-full font-medium transition-colors"
            >
              {isDraft ? "Publish now" : "Update story"}
            </button>

            <button
              onClick={onSaveDraft}
              className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-full font-medium transition-colors"
            >
              Save as draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

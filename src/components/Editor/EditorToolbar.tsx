import React from "react"
import { Save, MoreHorizontal } from "lucide-react"

interface EditorToolbarProps {
  onPublish: () => void
  onSave?: () => void
  isDraft?: boolean
  isSaving?: boolean
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onPublish,
  onSave,
  isDraft,
  isSaving = false,
}) => {
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 sticky top-0 bg-white z-30">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Create Article</h1>
        {isDraft && (
          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            Draft
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 text-[#00ab6c] hover:bg-[#f0fdf8] rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </button>
        )}

        <button
          onClick={onPublish}
          className="bg-[#00ab6c] hover:bg-[#009f61] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {isDraft ? "Publish" : "Update"}
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}

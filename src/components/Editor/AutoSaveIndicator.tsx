import type React from "react"
import { Check, Clock, AlertCircle } from "lucide-react"

interface AutoSaveIndicatorProps {
  status: "saving" | "saved" | "error" | "idle"
  lastSaved?: Date
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status, lastSaved }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "saving":
        return <Clock size={16} className="animate-spin text-blue-600" />
      case "saved":
        return <Check size={16} className="text-green-600" />
      case "error":
        return <AlertCircle size={16} className="text-red-600" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "saving":
        return "Saving..."
      case "saved":
        return lastSaved ? `Saved ${formatTime(lastSaved)}` : "Saved"
      case "error":
        return "Save failed - Click to retry"
      default:
        return ""
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    if (minutes < 1) return "just now"
    if (minutes === 1) return "1 minute ago"
    if (minutes < 60) return `${minutes} minutes ago`

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (status === "idle") return null

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border">
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  )
}

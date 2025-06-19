//@ts-nocheck
import React from "react"
import { Link } from "react-router-dom"
import { PenTool, MoreHorizontal, Bell } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// interface EditorToolbarProps {
//   onPublish: () => void
//   isDraft?: boolean
//   canPublish?: boolean
// }
interface EditorToolbarProps {
  onPublish: () => void
  onSave?: () => void
  isDraft?: boolean
  isSaving?: boolean
  canPublish?: boolean
  userImage?: string 
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onPublish,
  isDraft,
  canPublish = false,
  userImage,
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
        setShowNotification(false);
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-transparent">
      {/* Left Side: Logo and Draft Status */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
          <div className="w-6 h-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
            <PenTool className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Royal Vente</span>
        </Link>

        {isDraft && (
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Draft</span>
          </div>
        )}
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center space-x-4">
        
        {/* Publish Button */}
        <button
          onClick={onPublish}
          disabled={!canPublish}
          className={`bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            !canPublish ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Publish
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {userImage ? (
            <img
              src={userImage}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center text-sm font-semibold">
              U
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

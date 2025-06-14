

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


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
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
    <div className="w-full flex items-center justify-between px-6 pb-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Left Side: Logo and Draft Label */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            Royal Vente
          </span>
        </Link>

        {isDraft && (
          <span className="text-sm text-gray-500">Draft</span>
        )}
      </div>

      {/* Right Side: Publish, Menu, Avatar */}
      <div className="flex items-center space-x-4 relative"
        ref={dropdownContainerRef}>
        
        <button
          onClick={onPublish}
          disabled={!canPublish}
          className={`bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-transform duration-200 ${
            canPublish ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Publish
        </button>

        <button onClick={() => {
        setShowMenu((prev) => !prev);
        setShowNotification(false);
        setShowUserDropdown(false);
      }}
          className=" hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute top-12 right-2 w-64 bg-white border rounded-none py-2 text-sm z-50"
          >
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">Share draft link</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">Share to X</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">Change featured image</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">Change title / subtitle</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">Change topics</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">See revision history</div>
            <div className="px-4 py-2 text-gray-400 cursor-not-allowed">More settings</div>
            <hr className="my-2" />
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hints and keyboard shortcuts</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">More help</div>
          </div>
        )}

        {/* Notification bell */}
        <button onClick={() => {
            setShowNotification((prev) => !prev);
            setShowMenu(false);
            setShowUserDropdown(false);
          }}
          className="relative pr-2 pt-2 pb-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} className="text-gray-600" />
          {/* Dummy dot indicator */}
          <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full"></span>
        </button>

        {/* Notifications popup */}
        {showNotification && (
          <div
            ref={notificationRef}
            className="absolute top-12  w-64 bg-white border rounded-none p-4 z-50"
          >
            <p className="text-sm text-gray-700">🔔 You have a new follower!</p>
          </div>
        )}

        <div className="relative">
  <button
    onClick={() => {
      setShowUserDropdown(prev => !prev);
      setShowMenu(false);
      setShowNotification(false);
    }}
    className="w-8 h-8 rounded-full overflow-hidden focus:outline-none"
  >
    {userImage ? (
      <img
        src={userImage}
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
        M
      </div>
    )}
  </button>

  {showUserDropdown && (
    <div
      ref={userDropdownRef}
      className="absolute -right-10 top-12 w-64 bg-white rounded-none border border-gray-300 z-50"
    >
      <div className="flex items-center space-x-3 p-6 border-b">
        {userImage ? (
          <img
            src={userImage}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            M
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">USER</p>
          <p className="text-xs text-gray-500">@useremail.com</p>
        </div>
      </div>

      <div className="flex flex-col text-sm">
        
        <div className="px-6 py-4  hover:bg-gray-100 cursor-pointer space-y-4 border-b">
          <div>Write</div>
        </div>
        <div className="px-6 py-4  hover:bg-gray-100 cursor-pointer space-y-4 border-b">
          <div>Profile</div>
          <div>Library</div>
          <div>Stories</div>
          <div>Stats</div>
        </div>
        <div className="px-6 py-4  hover:bg-gray-100 cursor-pointer space-y-4 border-b">
          <div>Settings</div>
          <div>Refine recommendations</div>
          <div>Manage publications</div>
          <div>Help</div>
        </div>
        <div className="px-6 py-4  hover:bg-gray-100 cursor-pointer space-y-4 border-b">
          <div>Apply to the Partner Program</div>
          <div className="text-green-600">Become a member</div>
          
        </div>
        <div className="px-6 py-4 text-red-600 hover:bg-gray-100 cursor-pointer">
          Sign out
        </div>
      </div>
    </div>
  )}
</div>


      </div>
    </div>
  )
}

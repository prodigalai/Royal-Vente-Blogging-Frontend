import React, { useState } from "react";
import {
  MoreHorizontal,
  Lock,
  Bookmark,
  MessageCircle,
  Heart as ClapIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// —————— Dummy user and content data ——————
const user = {
  name: "Ashwini Balasaheb Nargarboje",
  avatar: "https://i.pravatar.cc/100?u=ashwini",
  cover: "https://picsum.photos/seed/cover/1200/300",
  bio: "Full-stack developer passionate about creating interactive web experiences. Loves coffee, cats, and open-source.",
  followers: 124,
  following: 56,
};

const dummyLists = [
  {
    id: 1,
    name: "Reading list",
    count: 4,
    covers: [
      "https://picsum.photos/seed/rl1/100/100",
      "https://picsum.photos/seed/rl2/100/100",
      "https://picsum.photos/seed/rl3/100/100",
    ],
  },
  {
    id: 2,
    name: "Tech Reads",
    count: 8,
    covers: [
      "https://picsum.photos/seed/tr1/100/100",
      "https://picsum.photos/seed/tr2/100/100",
      "https://picsum.photos/seed/tr3/100/100",
    ],
  },
];

const dummyStories = [
  {
    id: 1,
    title: "31 Photos From September 11th That You Have Never Seen",
    author: "Jeremiah Warren",
    authorAvatar: "https://i.pravatar.cc/40?img=5",
    date: "Sep 10, 2012",
    claps: 53000,
    comments: 674,
    excerpt:
      "In 2001, digital cameras were a rare commodity. They were expensive, bulky and captured images that were inferior to the…",
    cover: "https://picsum.photos/seed/september11/400/200",
  },
  {
    id: 2,
    title: "Building a Real-time Candlestick Chart in React",
    author: "Jane Doe",
    authorAvatar: "https://i.pravatar.cc/40?img=2",
    date: "Jun 10, 2025",
    claps: 1200,
    comments: 45,
    excerpt:
      "Step-by-step guide to implement live-updating financial charts using ApexCharts and WebSockets.",
    cover: "https://picsum.photos/seed/chart/400/200",
  },
  {
    id: 3,
    title: "Implementing Secure ONDC API Signatures",
    author: "Alice Smith",
    authorAvatar: "https://i.pravatar.cc/40?img=3",
    date: "May 28, 2025",
    claps: 850,
    comments: 30,
    excerpt:
      "Learn to sign and verify Beckn-based payloads for ONDC integrations in Node.js.",
    cover: "https://picsum.photos/seed/ondc/400/200",
  },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Stories" | "Lists" | "About">(
    "Stories"
  );
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(user.bio);

  const copyProfileLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowMenu(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 lg:px-16">
      {/* Cover + Avatar */}
      <div className="relative">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-48 object-cover rounded-b-lg"
        />
        <div className="absolute -bottom-12 left-8">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mt-16 px-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h1>
          <div className="flex items-center space-x-6 mt-2 text-gray-600 dark:text-gray-400">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/profile/followers")}
            >
              {user.followers} followers
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/profile/following")}
            >
              {user.following} following
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu((s) => !s)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={copyProfileLink}
              >
                Copy link to profile
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowMenu(false)}
              >
                Edit profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 mt-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {["Stories", "Lists", "About"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap font-medium text-sm ${
                activeTab === tab
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="px-8 py-12 space-y-8">
        {activeTab === "Lists" && (
          <div className="grid gap-8 md:grid-cols-2">
            {dummyLists.map((list) => (
              <div
                key={list.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt="owner"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </span>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {list.name}
                </h2>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>{list.count} stories</span>
                  <Lock className="w-4 h-4 ml-2" />
                </div>
                <div className="flex -space-x-2 mt-4">
                  {list.covers.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`cover-${i}`}
                      className="w-12 h-12 object-cover rounded-lg border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Stories" && (
          <div className="space-y-6">
            {dummyStories.map((s) => (
              <div
                key={s.id}
                className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex-1 p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={s.authorAvatar}
                      alt={s.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {s.author}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    {s.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-500 mb-4">
                    <span>{s.date}</span>
                    <span>·</span>
                    <span>{s.claps.toLocaleString()} claps</span>
                    <span>·</span>
                    <span>{s.comments} comments</span>
                  </div>
                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <Bookmark className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                    <MessageCircle className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                    <ClapIcon className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                    <MoreHorizontal className="w-5 h-5 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                  </div>
                </div>
                <img
                  src={s.cover}
                  alt={s.title}
                  className="w-full md:w-48 h-40 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "About" && (
          <div className="max-w-2xl">
            {!isEditing ? (
              <>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {bioText}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 px-5 py-2 border border-primary-600 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors text-sm"
                >
                  Edit bio
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={6}
                  className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-primary-600 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

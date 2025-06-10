import React, { useState } from "react";
import { MoreHorizontal, Lock, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState("");

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col w-[65%]">
        <div className="flex items-center justify-between pt-8 w-full">
          {/* Left - Name and Navigation */}
          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-normal text-primary-800 mb-8 dark:text-white">
              Ahelinandy
            </h1>

            <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {[
                { key: "Home", label: "Home" },
                { key: "Lists", label: "Lists" },
                { key: "About", label: "About" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === key
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center - Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-6 h-6 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowMenu(false);
                  }}
                >
                  Copy link to profile
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  Design your profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="flex gap-16">
          {/* Main Content Area */}
          <div className="flex-1 max-w-2xl">
            {activeTab === "Home" && (
              <div>
                <div className="p-12 text-center">
                  <h3 className="text-xl font-normal text-black mb-4 dark:text-white">
                    Reading list
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <span className="text-sm">No stories</span>
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "About" && (
              <div>
                {!isEditing ? (
                  <div className="p-12 text-center">
                    <h2 className="text-2xl font-normal text-black mb-6 dark:text-white">
                      Tell the world about yourself
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
                      Here's where you can share more about yourself: your
                      history, work experience, accomplishments, interests,
                      dreams, and more. You can even add images and use rich
                      text to personalize your bio.
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 border border-primary-800 text-primary-900 rounded-full hover:bg-primary-800 hover:text-white transition-colors text-sm font-normal"
                    >
                      Get started
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Edit Mode Interface */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Image className="w-4 h-4" />
                        <span>Insert photo</span>
                      </button>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 border border-primary-800 text-primary-900 rounded-full hover:bg-primary-800 hover:text-white transition-colors text-sm font-normal"
                        >
                          Cancel
                        </button>
                        <button className="px-6 py-2 border hover:border-primary-800 hover:text-primary-900 hover:bg-transparent rounded-full bg-primary-800 text-white transition-colors text-sm font-normal">
                          Save
                        </button>
                      </div>
                    </div>

                    {/* Text Editor Area */}
                    <div className="min-h-96 border border-gray-200 rounded-lg p-6 bg-white">
                      <textarea
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                        placeholder="Tell your story..."
                        className="w-full h-full min-h-80 resize-none border-none outline-none text-base leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div className="flex items-center gap-8">
                  <div className="mt-16 cursor-pointer" onClick={() => navigate("/profile/following")}>
                    <p className="text-sm text-primary-800">1 followers</p>
                  </div>
                  <div className="mt-16 cursor-pointer" onClick={() => navigate("/profile/following")}>
                    <p className="text-sm text-primary-800">1 following</p>
                  </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Lists" && (
              <div className="p-12 text-center">
                <h3 className="text-xl font-normal text-black mb-4 dark:text-white">
                  Lists
                </h3>
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <span className="text-sm">No lists</span>
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Profile;

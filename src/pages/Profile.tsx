import React, { useState } from "react";
import {
  User,
  MoreHorizontal,
  Lock,
  Edit2,
  Home,
  FileText,
  Bookmark,
  Settings,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
      isActive
        ? "text-primary-800 border-primary-800"
        : "text-gray-500 border-transparent hover:text-primary-800 hover:border-primary-300"
    }`}
  >
    {label}
  </button>
);

interface StoryCardProps {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  claps: number;
  responses: number;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  excerpt,
  readTime,
  date,
  claps,
  responses,
}) => (
  <article className="py-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer group">
    <div className="flex justify-between items-start gap-8">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime} read</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{claps}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{responses}</span>
            </div>
            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
    </div>
  </article>
);

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const mockStories = [
    {
      title: "The Art of Minimalist Design in Modern Web Development",
      excerpt:
        "Exploring how less can be more when it comes to creating beautiful, functional user interfaces that truly serve their purpose...",
      readTime: "5 min",
      date: "Dec 8",
      claps: 234,
      responses: 12,
    },
    {
      title: "Understanding React Patterns for Better Code Organization",
      excerpt:
        "A deep dive into composition patterns, custom hooks, and architectural decisions that lead to maintainable React applications...",
      readTime: "8 min",
      date: "Dec 5",
      claps: 189,
      responses: 8,
    },
    {
      title: "The Philosophy of User-Centered Design",
      excerpt:
        "Why putting users first isn't just a buzzword, but a fundamental approach that transforms how we think about digital products...",
      readTime: "6 min",
      date: "Dec 1",
      claps: 312,
      responses: 24,
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary-700">Ahelinandy</h1>
              <nav className="hidden md:flex space-x-1">
                <Tab
                  label="Home"
                  isActive={activeTab === "Home"}
                  onClick={() => setActiveTab("Home")}
                />
                <Tab
                  label="About"
                  isActive={activeTab === "About"}
                  onClick={() => setActiveTab("About")}
                />
                <Tab
                  label="Stories"
                  isActive={activeTab === "Stories"}
                  onClick={() => setActiveTab("Stories")}
                />
              </nav>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setShowProfileMenu(false);
                    }}
                  >
                    Copy link to profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                    onClick={() => {
                      alert(
                        "Navigate to design profile (functionality pending)"
                      );
                      setShowProfileMenu(false);
                    }}
                  >
                    Design your profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {activeTab === "Home" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    
                      <p className="text-gray-500">Reading List</p>
                    
                  </div>
                </div>

                <div className="space-y-0">
                  {mockStories.map((story, index) => (
                    <StoryCard key={index} {...story} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "About" && (
              <div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    A passionate writer and designer focused on creating
                    meaningful digital experiences. I write about design,
                    technology, and the intersection of human behavior with
                    digital products.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    When I'm not writing, you can find me exploring new design
                    patterns, reading about psychology, or experimenting with
                    creative coding projects.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {[
                      "Design",
                      "Technology",
                      "User Experience",
                      "React",
                      "Web Development",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Stories" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  
                  <span className="text-sm text-gray-500">
                    {mockStories.length} stories
                  </span>
                </div>
                <div className="space-y-0">
                  {mockStories.map((story, index) => (
                    <StoryCard key={index} {...story} />
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 xl:w-96">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 sticky top-24">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Ahelinandy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Ahelinandy
                </h3>
                <p className="text-gray-500 text-sm mb-4">Writer & Designer</p>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mb-4">
                  Follow
                </button>

                <button className="flex items-center justify-center w-full text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors" onClick={() => navigate("/settings")}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit profile
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Followers</span>
                  <span className="font-medium text-gray-900">1.2K</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Following</span>
                  <span className="font-medium text-gray-900">324</span>
                </div>
              </div>
            </div>

            
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;

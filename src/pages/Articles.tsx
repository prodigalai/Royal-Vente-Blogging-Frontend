







import React, { useState, useEffect } from "react";
import { BookOpen, Clock, Eye, Heart } from "lucide-react";
import ArticleCard from "../components/Article/ArticleCard";

interface Article {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  views_count: number;
  likes: number;
  readTime: number;
}

// Mock data representing the user's own posts
const yourPosts: Article[] = [
  {
    _id: "a1",
    title: "How I Built My First React App",
    description:
      "A step-by-step walkthrough of my journey building a React application from scratch.",
    imageUrl: "https://picsum.photos/seed/your1/400/240",
    tags: ["React", "JavaScript"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views_count: 150,
    likes: 25,
    readTime: 4,
  },
  {
    _id: "a2",
    title: "Understanding TypeScript Generics",
    description:
      "An in-depth look at how generics work in TypeScript and why you’d use them.",
    imageUrl: "https://picsum.photos/seed/your2/400/240",
    tags: ["TypeScript", "Typing"],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views_count: 98,
    likes: 12,
    readTime: 6,
  },
  {
    _id: "a3",
    title: "Deploying Your Node.js App to Production",
    description:
      "Best practices for deploying and scaling a Node.js application in the cloud.",
    imageUrl: "https://picsum.photos/seed/your3/400/240",
    tags: ["Node.js", "Deployment"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views_count: 84,
    likes: 18,
    readTime: 5,
  },
];

// Helper to format date
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const UserActivity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "popular" | "topLiked">(
    "all"
  );
  const [filtered, setFiltered] = useState<Article[]>(yourPosts);

  useEffect(() => {
    let list = yourPosts.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
    if (activeTab === "recent") {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (activeTab === "popular") {
      list = [...list].sort((a, b) => b.views_count - a.views_count);
    } else if (activeTab === "topLiked") {
      list = [...list].sort((a, b) => b.likes - a.likes);
    }
    setFiltered(list);
  }, [searchTerm, activeTab]);

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8 font-sans text-gray-800">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Your Activity</h1>
        <p className="text-gray-600">Review and manage the posts you’ve created.</p>
      </header>

      {/* Search & Create */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none"
            placeholder="Search your posts…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center space-x-2 bg-[#005CEF] hover:bg-[#004BB5] text-white font-semibold px-5 py-2 rounded-full transition">
          <BookOpen className="w-5 h-5" />
          <span>Write a New Post</span>
        </button>
      </div>

      {/* Tabs */}
      <nav className="flex space-x-6 border-b pb-3 text-gray-600">
        {[
          { key: "all", label: "All Posts" },
          { key: "recent", label: "Recent" },
          { key: "popular", label: "Top Views" },
          { key: "topLiked", label: "Top Liked" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`pb-2 transition ${
              activeTab === key
                ? "border-b-2 border-[#005CEF] text-[#005CEF] font-semibold"
                : "hover:text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Posts List */}
      <ul className="space-y-8">
        {filtered.length === 0 ? (
          <li className="text-center text-gray-500 py-16">No posts match your search.</li>
        ) : (
          filtered.map((post) => (
            <li
              key={post._id}
              className="flex flex-col md:flex-row gap-4 hover:bg-gray-50 p-4 rounded-lg transition"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full md:w-44 h-28 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold hover:underline cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-2 mt-1">{post.description}</p>
                </div>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mt-3 gap-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views_count} reads</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes} likes</span>
                  </span>
                  <span>· {post.readTime} min read</span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserActivity;

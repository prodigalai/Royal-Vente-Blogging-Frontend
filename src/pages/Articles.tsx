import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Clock,
  User,
  BookOpen,
} from "lucide-react";
import api from "../utils/axios";
import { format } from "date-fns";

interface Article {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  author?: {
    displayName: string;
    avatarUrl?: string;
  };
  createdAt: string;
  views_count: number;
  likes?: number;
  readTime?: number;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/blogs/new", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // pull the `blogs` array out of the response
        setArticles(res.data.blogs);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading…</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try writing your first article.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
        >
          <BookOpen className="w-5 h-5" />
          <span>Write the first article</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
         Blogs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover and explore our collection of articles
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>Write Article</span>
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-[1.02] group"
          >
            {/* {article.imageUrl && ( */}
              <div className="aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={"https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            {/* )} */}

            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                  >
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.description}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                {article.author?.avatarUrl ? (
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {article.author?.displayName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(
                      new Date(article.createdAt),
                      "MMM d, yyyy"
                    )}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes || 0}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime || 1} min read</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Articles;

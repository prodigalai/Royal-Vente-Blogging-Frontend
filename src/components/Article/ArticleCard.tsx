import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, BookOpen, Clock } from "lucide-react";
import { Article } from "../../types";
import { format } from "date-fns";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
}) => {
  if (!article) return null;

  const [coverError, setCoverError] = useState(false);
  const fallbackCover =
    "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600";

  const formatDate = (date: string | Date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return "Invalid date";
    return format(parsedDate, "MMM d, yyyy");
  };

  const renderAvatar = () => {
    const [imageError, setImageError] = useState(false);
    const avatarUrl = article.author.avatarUrl;
    const displayName = article.author.displayName || "Anonymous";
    const initial = displayName.charAt(0).toUpperCase();

    if (!avatarUrl || imageError) {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-sm">
          {initial}
        </div>
      );
    }

    return (
      <img
        src={avatarUrl}
        alt={displayName}
        onError={() => setImageError(true)}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
      />
    );
  };

  if (variant === "featured") {
    return (
      <article className="group cursor-pointer">
        <Link to={`/article/${article.id}`}>
          <div className="relative overflow-hidden rounded-lg mb-4">
            <img
              src={coverError ? fallbackCover : article.coverImage}
                alt={article.title}
                onError={() => setCoverError(true)}
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                {article.excerpt}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${article.author.username}`}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {renderAvatar()}
            <span className="text-sm font-medium text-gray-700">
              {article.author.displayName}
            </span>
          </Link>

          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <span>{formatDate(article.publishedAt)}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group overflow-hidden">
        <div className="flex space-x-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/profile/${article.author.username}`;
                }}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
              >
                {renderAvatar()}
                <span className="text-xs text-gray-600 truncate">
                  {article.author.displayName}
                </span>
              </button>
              <span className="text-gray-400 flex-shrink-0">·</span>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <Link to={`/article/${article.id}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors mb-1 line-clamp-2 text-sm leading-tight">
                {article.title}
              </h3>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-3 text-gray-500 text-xs flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{article.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}min</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-wrap justify-end min-w-0">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full truncate max-w-16"
                    title={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
    <article className="group">
      <div className="flex items-center space-x-2 mb-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/profile/${article.author.username}`;
          }}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          {renderAvatar()}
          <span className="text-sm text-gray-600">
            {article.author.displayName}
          </span>
        </button>
        <span className="text-gray-400">·</span>
        <span className="text-sm text-gray-500">
          {formatDate(article.publishedAt)}
        </span>
      </div>

      <Link to={`/blogs/${article.id}`}>
        <div className="flex space-x-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
              {article.title}
            </h2>

            {article.subtitle && (
              <p className="text-gray-600 mb-3 line-clamp-2">
                {article.subtitle}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{article.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {article.coverImage && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
              <img
                src={coverError ? fallbackCover : article.coverImage}
                alt={article.title}
                onError={() => setCoverError(true)}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
    <div className="border-b border-gray-200 my-2 w-[80%]"/>
</>
  );
};

export default ArticleCard;

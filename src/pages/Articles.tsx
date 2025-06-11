import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  TrendingUp,
  Clock,
  Star,
  Tag,
} from "lucide-react";
import api from "../utils/axios";
import ArticleCard from "../components/Article/ArticleCard";

interface Article {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  author?: {
    displayName: string;
    avatarUrl?: string;
    username?: string;
  };
  createdAt: string;
  views_count: number;
  likes?: number;
  readTime?: number;
}

const transformArticle = (apiArticle: Article) => ({
  id: apiArticle._id,
  title: apiArticle.title,
  excerpt: apiArticle.description,
  subtitle: apiArticle.description,
  coverImage:
    apiArticle.imageUrl ||
    "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=800",
  tags: apiArticle.tags,
  author: {
    displayName: apiArticle.author?.displayName || "Anonymous",
    avatarUrl: apiArticle.author?.avatarUrl || "",
    username:
      apiArticle.author?.username ||
      apiArticle.author?.displayName?.toLowerCase().replace(/\s+/g, "") ||
      "anonymous",
  },
  publishedAt: apiArticle.createdAt,
  likes: apiArticle.likes || 0,
  comments: Math.floor(Math.random() * 20),
  readTime:
    apiArticle.readTime || Math.ceil(apiArticle.description.length / 200) || 5,
  views: apiArticle.views_count,
});

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "recent" | "trending" | "featured"
  >("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/blogs/new", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mockArticles: Article[] = [
          {
            _id: "1",
            title: "The Future of AI: Opportunities & Challenges",
            description:
              "Explore how AI is shaping the world, from healthcare to automation.",
            imageUrl:
              "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
            tags: ["AI", "Technology", "Future"],
            author: {
              displayName: "Jane Doe",
              avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
              username: "janedoe",
            },
            createdAt: new Date().toISOString(),
            views_count: 540,
            likes: 120,
            readTime: 6,
          },
          {
            _id: "2",
            title: "10 Tips for Better Remote Work",
            description:
              "Boost your productivity and work-life balance with these remote work strategies.",
            imageUrl:
              "https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg",
            tags: ["Productivity", "Remote Work", "Lifestyle"],
            author: {
              displayName: "John Smith",
              avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
              username: "johnsmith",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 2
            ).toISOString(),
            views_count: 720,
            likes: 200,
            readTime: 5,
          },
          {
            _id: "3",
            title: "Understanding JavaScript Closures",
            description:
              "A deep dive into closures in JavaScript and how to use them effectively.",
            imageUrl: "",
            tags: ["JavaScript", "Programming", "Web Development"],
            author: {
              displayName: "Alex Johnson",
              avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 5
            ).toISOString(),
            views_count: 1300,
            likes: 350,
            readTime: 7,
          },
          {
            _id: "4",
            title: "Mastering CSS Grid in 2024",
            description:
              "A complete guide to modern layout techniques using CSS Grid.",
            imageUrl:
              "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
            tags: ["CSS", "Web Design", "Frontend"],
            author: {
              displayName: "Emily Stone",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 10
            ).toISOString(),
            views_count: 940,
            likes: 180,
            readTime: 6,
          },
        ];
        setArticles(mockArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Get all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags))
  ).slice(0, 20);

  // Filter and sort articles
  const getFilteredArticles = () => {
    let filtered = articles.filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => article.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    switch (activeTab) {
      case "recent":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "trending":
        return filtered.sort(
          (a, b) => (b.views_count || 0) - (a.views_count || 0)
        );
      case "featured":
        return filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return filtered;
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
    setActiveTab("all");
  };

  useEffect(() => {
    if (!articles.length) return;

    const interval = setInterval(() => {
      setFeaturedIndex(
        (prevIndex) => (prevIndex + 1) % getFilteredArticles().length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [articles, activeTab, searchTerm, selectedTags]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Discovering amazing blogs...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No blogs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Be the first to share your thoughts and start writing blogs for
              the community.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Write Your First blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredArticles = getFilteredArticles();
  const featuredArticle = filteredArticles[0];

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Discover Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore insights, stories, and knowledge from our community
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Write Blog</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Article (only in list view) */}
          {filteredArticles.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-5 h-5 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Featured Blogs
                </h2>
              </div>
              <ArticleCard
                article={transformArticle(
                  filteredArticles[featuredIndex % filteredArticles.length]
                )}
                variant="featured"
              />
            </section>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-6 mb-8 border-b border-gray-200 dark:border-gray-700">
            {[
              { key: "all", label: "All Blogs", icon: BookOpen },
              { key: "recent", label: "Recent", icon: Clock },
              { key: "trending", label: "Trending", icon: TrendingUp },
              { key: "featured", label: "Featured", icon: Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-200 ${
                  activeTab === key
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Articles Grid/List */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary-600 hover:text-blue-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article._id}
                  article={transformArticle(article)}
                />
              ))}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Articles
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {articles.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Active Tags
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {allTags.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Views
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {articles
                      .reduce(
                        (sum, article) => sum + (article.views_count || 0),
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* featured Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Featured Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Articles
                </h3>
              </div>
              <div className="space-y-4">
                {articles.slice(0, 3).map((article) => (
                  <div key={article._id} className="group">
                    <Link to={`/article/${article._id}`} className="block">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {article.author?.displayName || "Anonymous"} •{" "}
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;

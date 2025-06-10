import React, { useState, useEffect } from "react";
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

interface SkeletonCardProps {
  variant?: 'default' | 'featured' | 'sidebar';
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="animate-pulse relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
        {/* Featured image placeholder */}
        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
        
        {/* Featured content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {/* Tags placeholder */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="h-6 w-14 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          
          {/* Title placeholder */}
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-3" />
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/5 mb-4" />
          
          {/* Excerpt placeholder */}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-4" />
          
          {/* Author and stats placeholder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
      
      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        {/* Tags placeholder */}
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
        
        {/* Title placeholder */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
        </div>
        
        {/* Excerpt placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        
        {/* Author and meta placeholder */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarSkeleton: React.FC = () => {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Stats skeleton */}
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Tags skeleton */}
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full"
              style={{ width: `${Math.random() * 40 + 40}px` }}
            />
          ))}
        </div>
      </div>

      {/* Recent articles skeleton */}
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


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
        
        // Mock articles for demonstration
        const mockArticles: Article[] = [
          {
            _id: "1",
            title: "The Future of AI: Opportunities & Challenges",
            description:
              "Explore how AI is shaping the world, from healthcare to automation, and discover the incredible opportunities and challenges that lie ahead.",
            imageUrl:
              "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["AI", "Technology", "Future"],
            author: {
              displayName: "Jane Doe",
              avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
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
              "Boost your productivity and work-life balance with these proven remote work strategies that successful professionals swear by.",
            imageUrl:
              "https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["Productivity", "Remote Work", "Lifestyle"],
            author: {
              displayName: "John Smith",
              avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
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
              "A deep dive into closures in JavaScript and how to use them effectively in your code. Master this fundamental concept with practical examples.",
            imageUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["JavaScript", "Programming", "Web Development"],
            author: {
              displayName: "Alex Johnson",
              avatarUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
              username: "alexjohnson",
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
              "A complete guide to modern layout techniques using CSS Grid. Learn how to create responsive, flexible layouts with ease.",
            imageUrl:
              "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["CSS", "Web Design", "Frontend"],
            author: {
              displayName: "Emily Stone",
              avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
              username: "emilystone",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 10
            ).toISOString(),
            views_count: 940,
            likes: 180,
            readTime: 6,
          },
          {
            _id: "5",
            title: "Building Scalable React Applications",
            description:
              "Learn the best practices for building large-scale React applications that are maintainable, performant, and scalable.",
            imageUrl:
              "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["React", "JavaScript", "Architecture"],
            author: {
              displayName: "Michael Chen",
              avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
              username: "michaelchen",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 7
            ).toISOString(),
            views_count: 890,
            likes: 245,
            readTime: 8,
          },
          {
            _id: "6",
            title: "The Art of API Design",
            description:
              "Discover the principles of designing clean, intuitive APIs that developers love to use. From REST to GraphQL and beyond.",
            imageUrl:
              "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
            tags: ["API", "Backend", "Design"],
            author: {
              displayName: "Sarah Wilson",
              avatarUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
              username: "sarahwilson",
            },
            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 12
            ).toISOString(),
            views_count: 650,
            likes: 156,
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
    }, 5000);

    return () => clearInterval(interval);
  }, [articles, activeTab, searchTerm, selectedTags]);

  if (loading) {
    return (
      
        <div>
          {/* Header skeleton */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96" />
              </div>
              <div className="mt-6 lg:mt-0 animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-32" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content skeleton */}
            <div className="lg:col-span-3">
              {/* Featured article skeleton */}
              <SkeletonCard variant="featured" />
              
              {/* Navigation tabs skeleton */}
              <div className="flex items-center space-x-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse pb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  </div>
                ))}
              </div>
              
              {/* Article cards skeleton */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
            
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <SidebarSkeleton />
            </div>
          </div>
        </div>
      
    );
  }

  if (articles.length === 0) {
    return (
      
        <div>
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No blogs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Be the first to share your thoughts and start writing blogs for
              the community.
            </p>
            <button className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
              <BookOpen className="w-5 h-5" />
              <span>Write Your First Blog</span>
            </button>
          </div>
        </div>
      
    );
  }

  const filteredArticles = getFilteredArticles();

  return (
    
      <div>
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                Discover Blogs
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore insights, stories, and knowledge from our community
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <button className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
                <BookOpen className="w-5 h-5" />
                <span>Write Blog</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {filteredArticles.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-blue-600" />
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
                      ? "border-blue-600 text-blue-600"
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
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {filteredArticles.map((article) => (
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

              {/* Featured Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-blue-600" />
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
                          ? "bg-blue-600 text-white"
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
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Articles
                  </h3>
                </div>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article) => (
                    <div key={article._id} className="group">
                      <div className="block cursor-pointer">
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {article.author?.displayName || "Anonymous"} •{" "}
                          {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Articles;
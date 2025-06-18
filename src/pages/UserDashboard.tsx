import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  FileText,
  Building2,
  Users,
  TrendingUp,
  Edit3,
  Eye,
  Trash2,
  BarChart3,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { mockPosts } from "../data/mockData";
import { format } from "date-fns";
import api from "../utils/axios";
import OrganizationModal from "../components/OrganizationModal.tsx";
import Card from "../components/ui/card.tsx";

const UserDashboard = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const token = localStorage.getItem("token");
  const [userOrgs, setUserOrgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy user fallback for demo/development
  const dummyUser = {
    id: "demo",
    name: "Demo User",
    email: "demo@example.com",
    avatar: "https://ui-avatars.com/api/?name=Demo+User",
    role: "admin",
    status: "active",
    lastLogin: new Date().toISOString(),
  };

  const user = (authUser || dummyUser) as any;

  // Show loading until we have a user or token
  if (!token) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading your dashboard…</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await api.get(`/orgs/created-by/${authUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserOrgs(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load organizations");
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [authUser._id, token]);

  // Filter posts and organizations for this user
  const userBlogs = mockPosts.filter(
    (post) => post.author && post.author.id === user.id
  );

  const drafts = userBlogs.filter((post) => post.status === "draft");
  const published = userBlogs.filter((post) => post.status === "published");
  const totalViews = userBlogs.reduce(
    (sum, post) => sum + (post.likes ?? 0) * 15,
    0
  );
  const totalLikes = userBlogs.reduce(
    (sum, post) => sum + (post.likes ?? 0),
    0
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrg(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Welcome back, {user.displayName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your content and track your progress
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Link
            to="/create"
            className="flex items-center space-x-2 bg-primary-600 dark:bg-primary-600 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog</span>
          </Link>
          <Link
            to="/create-organization"
            className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <Building2 className="w-4 h-4" />
            <span>New Organization</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {[
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "blogs", label: "Blogs", icon: FileText },
          { key: "organizations", label: "Organizations", icon: Building2 },
          { key: "analytics", label: "Analytics", icon: TrendingUp },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
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

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Published"
              value={published.length}
              icon={<FileText className="w-6 h-6 text-emerald-600" />}
              from="emerald"
            />
            <Card
              title="Drafts"
              value={drafts.length}
              icon={<Edit3 className="w-6 h-6 text-blue-600" />}
              from="blue"
            />
            <Card
              title="Total Views"
              value={totalViews.toLocaleString()}
              icon={<Eye className="w-6 h-6 text-purple-600" />}
              from="purple"
            />
            <Card
              title="Organizations"
              value={userOrgs?.data?.length || 0}
              icon={<Building2 className="w-6 h-6 text-orange-600" />}
              from="orange"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentBlogs title="Recent Blogs" posts={published} />
            <QuickActions />
          </div>
        </div>
      )}

      {/* Blogs Tab */}
      {activeTab === "blogs" && (
        <div className="space-y-6">
          {drafts.length > 0 && (
            <Section title="Recent Drafts" items={drafts} draft />
          )}
          <Section title="Published Blogs" items={published} draft={false} />
        </div>
      )}

      {/* Organizations Tab */}
      {activeTab === "organizations" && (
        <>
          {loading ? (
            <OrgSkeleton />
          ) : (
            <OrgSection orgs={userOrgs?.data || []} userId={user.id} />
          )}
        </>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <Analytics
          totalLikes={totalLikes}
          avgReadTime={
            Math.round(
              userBlogs.reduce((sum, b) => sum + b.readTime, 0) /
                (userBlogs.length || 1)
            ) + " min"
          }
          pubRate={`${Math.round(published.length / 4)} /month`}
        />
      )}

      {/* Organization Modal */}
      {selectedOrg && (
        <OrganizationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          organization={selectedOrg}
        />
      )}
    </div>
  );
};

/** Reusable components below **/

const RecentBlogs = ({ title, posts }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h3>
    <div className="space-y-4">
      {posts.slice(0, 3).map((post) => (
        <div
          key={post.id}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
              {post.title}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>
                {format(new Date(post.updatedAt ?? post.createdAt), "MMM d")}
              </span>
              <span className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{post.likes ?? 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{post.comments ?? 0}</span>
              </span>
            </div>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Quick Actions
    </h3>
    <div className="space-y-3">
      {[
        {
          to: "/write",
          icon: <Plus className="w-4 h-4 text-primary-600 dark:text-primary-600" />,
          title: "Write New Blog",
          subtitle: "Share your thoughts with the world",
        },
        {
          to: "/create-organization",
          icon: (
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          ),
          title: "Create Organization",
          subtitle: "Collaborate with your team",
        },
      ].map(({ to, icon, title, subtitle }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-primary-600 dark:hover:bg-primary-600/20 transition-all"
        >
          <div className="p-2 bg-primary-600 dark:bg-primary-600/90 rounded-lg">
            {icon}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const Section = ({ title, items, draft }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    {items.length > 0 ? (
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title || (draft ? "Untitled Draft" : "")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {draft
                    ? `Last edited ${format(
                        new Date(item.updatedAt ?? item.createdAt),
                        "MMM d, yyyy"
                      )}`
                    : `Published ${format(
                        new Date(item.createdAt),
                        "MMM d, yyyy"
                      )} • ${item.readTime ?? 5} min read`}
                </p>
                {draft && item.excerpt && (
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
                {!draft && (
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes ?? 0} likes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.comments ?? 0} comments</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{(item.likes ?? 0) * 15} views</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to={draft ? `/write?draft=${item.id}` : `/blog/${item.id}`}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={draft ? "Edit" : "View"}
                >
                  {draft ? (
                    <Edit3 className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Link>
                {draft && (
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {draft ? "No drafts yet" : "No published blogs yet"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {draft
            ? "Start a new draft."
            : "Start writing and share your ideas with the world."}
        </p>
        <Link
          to="/write"
          className="inline-flex items-center space-x-2 bg-primary-600 dark:bg-primary-600 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>{draft ? "New Draft" : "Write your first blog"}</span>
        </Link>
      </div>
    )}
  </div>
);

type OrgSectionProps = {
  orgs: Array<any>;
  userId: string;
};

const OrgSection = ({ orgs, userId }: OrgSectionProps) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      My Organizations
    </h2>
    {orgs?.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map((org) => {
          interface OrgMember {
            user: {
              id: string;
              name: string;
              email?: string;
              avatar?: string;
            };
            role: string;
          }

          interface Organization {
            id: string;
            name: string;
            logo?: string;
            description?: string;
            articlesCount: number;
            members: OrgMember[];
          }

          const userMembership: OrgMember | undefined = (
            org as Organization
          ).members.find((orgs: OrgMember) => orgs.user.id === userId);

          return (
            <div
              key={org._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-4">
                {org.logo && (
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {org.name}
                  </h3>
                  <span className="px-2 py-1 bg-primary-600 dark:bg-primary-600 text-[#fff] dark:text-[#fff] text-xs rounded-full capitalize">
                    {userMembership?.role}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {org.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{org.articlesCount} articles</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{org.members.length} members</span>
                </span>
              </div>

              {userMembership?.role === "owner" && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/admin/organization/${org._id}/manage`}
                    state={{ organization: org }}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-2 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 text-sm justify-center flex w-full"
                  >
                    Manage
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No organizations yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create or join an organization to collaborate with others.
        </p>
        <Link
          to="/create-organization"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105"
        >
          <Building2 className="w-4 h-4" />
          <span>Create an organization</span>
        </Link>
      </div>
    )}
  </div>
);

const Analytics = ({ totalLikes, avgReadTime, pubRate }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Metric
        title="Total Engagement"
        value={totalLikes}
        icon={<TrendingUp className="w-5 h-5 text-primary-600" />}
        change="+12% from last month"
      />
      <Metric
        title="Average Read Time"
        value={avgReadTime}
        icon={<Clock className="w-5 h-5 text-blue-600" />}
        change="+5% from last month"
      />
      <Metric
        title="Publishing Rate"
        value={pubRate}
        icon={<Calendar className="w-5 h-5 text-purple-600" />}
        change="Consistent pace"
      />
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Top Performing Blogs
      </h3>
      <div className="space-y-4">
        {mockPosts
          .filter((p) => p.status === "published")
          .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
          .slice(0, 5)
          .map((post, i) => (
            <div
              key={post.id}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 dark:bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">#{i + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes ?? 0}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{(post.likes ?? 0) * 15}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments ?? 0}</span>
                  </span>
                </div>
              </div>
              <Link
                to={`/blog/${post.id}`}
                className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const Metric = ({ title, value, icon, change }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-primary-600 mb-2">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{change}</p>
  </div>
);

const OrgSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="space-y-2 flex-1">
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-1/4 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
        <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="flex items-center justify-between">
          <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default UserDashboard;

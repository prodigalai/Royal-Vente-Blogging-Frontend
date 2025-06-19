import React, { useState, useRef, useEffect } from "react";
import { Search, X, MoreVertical, Bell, BellOff, UserX, Building2, Users, Hash } from "lucide-react";

type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  verified?: boolean;
  followersCount: number;
  isFollowing: boolean;
  emailNotifications: boolean;
  lastActive?: string;
};

type Publication = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  followersCount: number;
  isFollowing: boolean;
  emailNotifications: boolean;
  category: string;
};

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Enrique Dans",
    username: "enriquedans",
    bio: "Professor of Innovation at IE Business School and blogger on the social and business implications of technological innovation",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    followersCount: 47200,
    isFollowing: true,
    emailNotifications: true,
    lastActive: "2 days ago",
  },
  {
    id: "2",
    name: "F. Perry Wilson, MD",
    username: "fperrywilson",
    bio: "Associate Professor of Medicine and Public Health at Yale. Physician-scientist interested in kidney disease, clinical trials, and medical AI.",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
    followersCount: 23800,
    isFollowing: true,
    emailNotifications: false,
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Michael Ryaboy",
    username: "michaelryaboy",
    bio: "Developer Advocate at KDB.AI. Former Netflix, Twitter. Building the future of real-time analytics and machine learning.",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    followersCount: 8950,
    isFollowing: true,
    emailNotifications: true,
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    name: "Medium Staff",
    username: "medium",
    bio: "Official account for news and updates from Medium. Stories about our platform, new features, and the writers who call Medium home.",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
    followersCount: 156000,
    isFollowing: true,
    emailNotifications: true,
    lastActive: "5 hours ago",
  },
];

const samplePublications: Publication[] = [
  {
    id: "1",
    name: "Better Programming",
    description: "Advice for programmers. Programming tutorials and development tips.",
    logoUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    followersCount: 185000,
    isFollowing: true,
    emailNotifications: true,
    category: "Technology",
  },
  {
    id: "2",
    name: "The Startup",
    description: "Medium's largest active publication, followed by +771K people. Follow to join our community.",
    logoUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    followersCount: 771000,
    isFollowing: true,
    emailNotifications: false,
    category: "Business",
  },
];

const FollowDetailPage: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("People");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(sampleUsers);
  const [publications, setPublications] = useState(samplePublications);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUnfollow = (id: string, type: 'user' | 'publication') => {
    if (type === 'user') {
      setUsers(prev => prev.filter(user => user.id !== id));
    } else {
      setPublications(prev => prev.filter(pub => pub.id !== id));
    }
    setOpenDropdown(null);
  };

  const handleToggleNotifications = (id: string, type: 'user' | 'publication') => {
    if (type === 'user') {
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, emailNotifications: !user.emailNotifications } : user
      ));
    } else {
      setPublications(prev => prev.map(pub => 
        pub.id === id ? { ...pub, emailNotifications: !pub.emailNotifications } : pub
      ));
    }
    setOpenDropdown(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPublications = publications.filter(pub =>
    pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFollowing = users.length + publications.length;

  const formatFollowersCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const UserCard = ({ user }: { user: User }) => (
    <div className="flex items-start justify-between py-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 dark:text-white text-base truncate">
              {user.name}
            </h3>
            {user.verified && (
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {user.bio}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {formatFollowersCount(user.followersCount)} followers
            </span>
            <span>Last active {user.lastActive}</span>
          </div>
        </div>
      </div>

      <div className="relative ml-4" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
        >
          Following
          <MoreVertical size={16} />
        </button>

        {openDropdown === user.id && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg z-10 py-2">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleToggleNotifications(user.id, 'user')}
            >
              {user.emailNotifications ? (
                <>
                  <BellOff size={16} className="text-gray-600" />
                  <span>Turn off email notifications</span>
                </>
              ) : (
                <>
                  <Bell size={16} className="text-gray-600" />
                  <span>Turn on email notifications</span>
                </>
              )}
            </button>
            <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2 my-1" />
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={() => handleUnfollow(user.id, 'user')}
            >
              <UserX size={16} />
              <span>Unfollow {user.name}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const PublicationCard = ({ publication }: { publication: Publication }) => (
    <div className="flex items-start justify-between py-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <img
          src={publication.logoUrl}
          alt={publication.name}
          className="w-14 h-14 rounded object-cover ring-2 ring-gray-100 dark:ring-gray-800"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white text-base mb-1 truncate">
            {publication.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {publication.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {formatFollowersCount(publication.followersCount)} followers
            </span>
            <span className="flex items-center gap-1">
              <Hash size={12} />
              {publication.category}
            </span>
          </div>
        </div>
      </div>

      <div className="relative ml-4" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenDropdown(openDropdown === publication.id ? null : publication.id)}
        >
          Following
          <MoreVertical size={16} />
        </button>

        {openDropdown === publication.id && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg z-10 py-2">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleToggleNotifications(publication.id, 'publication')}
            >
              {publication.emailNotifications ? (
                <>
                  <BellOff size={16} className="text-gray-600" />
                  <span>Turn off email notifications</span>
                </>
              ) : (
                <>
                  <Bell size={16} className="text-gray-600" />
                  <span>Turn on email notifications</span>
                </>
              )}
            </button>
            <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2 my-1" />
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={() => handleUnfollow(publication.id, 'publication')}
            >
              <Building2 size={16} />
              <span>Unfollow {publication.name}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-normal text-gray-900 dark:text-white mb-2">
          {totalFollowing} following
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Writers and publications you follow
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search people and publications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: "People", label: "People", count: filteredUsers.length },
          { key: "Publications", label: "Publications", count: filteredPublications.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-all ${
              activeTab === key
                ? "border-green-600 text-green-600 dark:border-green-500 dark:text-green-500"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <span className="font-medium">{label}</span>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "People" && (
              <>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {searchQuery ? "No people found" : "No people followed"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery 
                        ? "Try adjusting your search terms." 
                        : "Start following writers to see them here."
                      }
                    </p>
                  </div>
                ) : (
                  <div>
                    {filteredUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "Publications" && (
              <>
                {filteredPublications.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {searchQuery ? "No publications found" : "No publications followed"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery 
                        ? "Try adjusting your search terms." 
                        : "Start following publications to see them here."
                      }
                    </p>
                  </div>
                ) : (
                  <div>
                    {filteredPublications.map((publication) => (
                      <PublicationCard key={publication.id} publication={publication} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowDetailPage;

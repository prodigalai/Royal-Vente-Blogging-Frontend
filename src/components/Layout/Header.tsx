// src/components/Header.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  PenTool,
  BarChart3,
  Bell,
  Bookmark,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useSite } from "../../contexts/SiteContext";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

const Header: React.FC = () => {
  const { user, organization, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { site, setSite } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);

  const switchSite = (newSite: "blog" | "newsletter") => {
    setSite(newSite);
    setIsSiteMenuOpen(false);
    // Navigate to the home of the selected site:
    navigate(newSite === "blog" ? "/home" : "/newsletter");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Site Switcher */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsSiteMenuOpen(o => !o)}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {site === "blog"
                    ? "Royal Vente Blog"
                    : "Royal Vente Newsletter"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              {isSiteMenuOpen && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                  <button
                    onClick={() => switchSite("blog")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      site === "blog"
                        ? "font-semibold text-primary-600"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Royal Vente Blog
                  </button>
                  <button
                    onClick={() => switchSite("newsletter")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      site === "newsletter"
                        ? "font-semibold text-primary-600"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Royal Vente Newsletter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Draft indicator for create page */}
          {location.pathname === "/create" && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-200 dark:border-amber-800">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Draft</span>
            </div>
          )}

          {/* Search (hidden on xs) */}
          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <div
              className={`relative transition-all duration-200 ${
                isSearchFocused ? "scale-105" : ""
              }`}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white dark:focus:bg-gray-700 transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right-hand actions */}
          <div className="flex items-center space-x-4">
            {/* Write button */}
            {site === "blog" ? (
              <Link
                to="/create"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-700 transition-colors"
              >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
              </Link>
            ) : (
              <Link
                to="/newsletter/create"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-700 transition-colors"
              >
                <PenTool className="w-4 h-4" />
                <span>Create</span>
              </Link>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all hover:scale-105"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-700 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </Link>

            {/* Organization */}
            {organization && (
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {organization.name}
                </span>
              </div>
            )}

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(o => !o)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.systemRole?.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-scale-in">
                  {/* Profile header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          user?.emailVerified
                            ? "text-primary-600 border-primary-600"
                            : "text-red-600 border-red-600"
                        )}
                      >
                        {user?.emailVerified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary-600/20 text-primary-600 rounded-full capitalize">
                      {user?.systemRole?.replace("_", " ")}
                    </span>
                  </div>

                  {/* Menu links */}
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/create-organization"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Create Organization</span>
                  </Link>
                  {site === "blog" && (
                    <Link
                      to="/library"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>My Library</span>
                    </Link>
                  )}
                  <Link
                    to="/user-dashboard"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>My Dashboard</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

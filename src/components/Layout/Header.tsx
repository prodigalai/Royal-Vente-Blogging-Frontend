import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Home,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, organization, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Royal Vente
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
           
             
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700 transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Link
                to="/create"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
              </Link>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all hover:scale-105"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Organization Info */}
            {organization && (
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{organization.name}</span>
              </div>
            )}

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-scale-in">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full capitalize">
                      {user?.role.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
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
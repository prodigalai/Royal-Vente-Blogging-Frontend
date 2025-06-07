import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  PenTool,
  Users,
  Settings,
  BarChart3,
  Building2,
  Shield,
  FileText,
  Tag,
  LogOut
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { hasPermission } from '../../utils/permissions';

const Sidebar: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const token = localStorage.getItem('token');

  const navigation = [
    { name: 'Home', href: '/home', icon: Home, requiresPermission: false },
    { name: 'My Dashboard', href: '/user-dashboard', icon: BarChart3, requiresPermission: false },

    { name: 'Blogs', href: '/articles', icon: BookOpen, requiresPermission: false },
    { name: 'Create Blogs', href: '/create', icon: PenTool, requiresPermission: false },
    { name: 'Drafts', href: '/drafts', icon: FileText, requiresPermission: false },
    { name: 'Users', href: '/admin/users', icon: Users, requiresPermission: false  },
    { name: 'Orgs', href: '/admin/organizations', icon: Building2, requiresPermission: false },
    { name: 'Sys', href: '/admin/settings', icon: Settings, requiresPermission: false },
    { name: 'Sec', href: '/admin/security', icon: Shield, requiresPermission: false },
  ];



  const shouldShowNavItem = (item: any) => {
    if (!token) return false;
    if (!item.requiresPermission) return true;
    return hasPermission(user, item.requiresPermission.resource, item.requiresPermission.action);
  };

  const isActive = (href: string) => location.pathname === href;

  if (!token) return null;

  return (
    <div className="h-screen w-16 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between items-center py-4 fixed left-0 top-0 z-40 transition-colors">
      {/* Logo */}
      <div className="mb-4">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Y</span>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2 items-center mt-2 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          if (!shouldShowNavItem(item)) return null;
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[8px] mt-0.5 hidden group-hover:block text-center whitespace-nowrap">{item.name}</span>
              {/* Enhanced Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900/95 dark:bg-gray-800/95 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-x-0 translate-x-2 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm border border-gray-700/50">
                {item.name}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/95 dark:bg-gray-800/95 transform rotate-45 border-l border-b border-gray-700/50"></div>
              </div>
            </Link>
          );
        })}
      </nav>
      {/* User Role Badge & Logout */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:scale-105 transform duration-200">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {/* Enhanced Tooltip */}
          <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900/95 dark:bg-gray-800/95 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-x-0 translate-x-2 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm border border-gray-700/50">
            {user?.systemRole || 'User'} Role
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/95 dark:bg-gray-800/95 transform rotate-45 border-l border-b border-gray-700/50"></div>
          </div>
        </div>
        <div className="relative group">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 transform">
            <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          {/* Enhanced Tooltip */}
          <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900/95 dark:bg-gray-800/95 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-x-0 translate-x-2 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm border border-gray-700/50">
            Logout
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/95 dark:bg-gray-800/95 transform rotate-45 border-l border-b border-gray-700/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
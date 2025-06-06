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
    { name: 'Dashboard', href: '/dashboard', icon: Home, requiresPermission: false },
    { name: 'Articles', href: '/articles', icon: BookOpen, requiresPermission: false },
    { name: 'Write', href: '/create', icon: PenTool, requiresPermission: false },
    { name: 'Drafts', href: '/drafts', icon: FileText, requiresPermission: false },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, requiresPermission: false },
    { name: 'Tags', href: '/tags', icon: Tag, requiresPermission: false },
  ];

  const adminNavigation = [
    { name: 'Users', href: '/admin/users', icon: Users, requiresPermission: false },
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
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Y</span>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-4 items-center mt-2">
        {navigation.map((item) => {
          if (!shouldShowNavItem(item)) return null;
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                active
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={item.name}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[9px] mt-1 hidden group-hover:block text-center whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
        {/* Admin Section */}
        {adminNavigation.some(item => shouldShowNavItem(item)) && (
          <>
            <div className="h-4" />
            {adminNavigation.map((item) => {
              if (!shouldShowNavItem(item)) return null;
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title={item.name}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[9px] mt-1 hidden group-hover:block text-center whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>
      {/* User Role Badge & Logout */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center transition-colors" title={user?.systemRole || 'User'}>
          <Shield className="w-5 h-5 text-white" />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" title="Logout">
          <LogOut className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
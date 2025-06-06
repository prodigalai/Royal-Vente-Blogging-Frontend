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
  Tag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/permissions';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      requiresPermission: false,
    },
    {
      name: 'Blogs',
      href: '/blogs',
      icon: BookOpen,
      requiresPermission: false,
    },
    {
      name: 'Write Blogs',
      href: '/create',
      icon: PenTool,
      requiresPermission: { resource: 'articles', action: 'create' },
    },
    {
      name: 'My Drafts',
      href: '/drafts',
      icon: FileText,
      requiresPermission: { resource: 'articles', action: 'create' },
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      requiresPermission: { resource: 'articles', action: 'read' },
    },
    {
      name: 'Saved Blogs',
      href: '/saved',
      icon: Tag,
      requiresPermission: false,
    },
  ];

  const adminNavigation = [
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      requiresPermission: { resource: 'users', action: 'read' },
    },
    {
      name: 'Organizations',
      href: '/admin/organizations',
      icon: Building2,
      requiresPermission: { resource: 'organizations', action: 'read' },
    },
    {
      name: 'System Settings',
      href: '/admin/settings',
      icon: Settings,
      requiresPermission: { resource: 'settings', action: 'manage' },
    },
    {
      name: 'Security',
      href: '/admin/security',
      icon: Shield,
      requiresPermission: { resource: 'settings', action: 'manage' },
    },
  ];

  const shouldShowNavItem = (item: any) => {
    if (!item.requiresPermission) return true;
    return hasPermission(user, item.requiresPermission.resource, item.requiresPermission.action);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="flex-1 px-4 py-6">
        {/* Main Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            if (!shouldShowNavItem(item)) return null;
            
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin Section */}
        {adminNavigation.some(item => shouldShowNavItem(item)) && (
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Administration
            </h3>
            <nav className="space-y-2">
              {adminNavigation.map((item) => {
                if (!shouldShowNavItem(item)) return null;
                
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-500'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* User Role Badge */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Access Level</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  PenTool,
  FileText,
  Newspaper,
  LogOut,
  ChevronDown,
  Mail,
  LayoutList,
} from "lucide-react";
import { useSite } from "../../contexts/SiteContext";

const navItems = {
  blog: [
    { name: "Home", href: "/blog/home", icon: Home },
    { name: "All Posts", href: "/blog", icon: BookOpen },
    { name: "Create Post", href: "/blog/create", icon: PenTool },
    { name: "Drafts", href: "/blog/drafts", icon: FileText },
  ],
  newsletter: [
    { name: "All Newsletters", href: "/newsletter", icon: Newspaper },
    { name: "Email Builder", href: "email-builder", icon: Mail },
    { name: "Templates", href: "temlplets", icon: LayoutList },
    { name: "Create Newsletter", href: "/newsletter/create", icon: PenTool },
  ],
} as const;

const Sidebar: React.FC = () => {
  const { site, setSite } = useSite();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);

  const switchSite = (newSite: "blog" | "newsletter") => {
    setSite(newSite);
    setIsSiteMenuOpen(false);
    navigate(newSite === "blog" ? "/blog/home" : "/newsletter");
  };

  const navigation = navItems[site];
  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-16 flex flex-col justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800">
      {/* Logo + Site Switcher */}
      <div className="flex flex-col items-center mt-4 relative">
        <button
          onClick={() => setIsSiteMenuOpen((o) => !o)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {isSiteMenuOpen && (
          <div className="absolute left-full top-0 ml-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
            <button
              onClick={() => switchSite("blog")}
              className={`w-full text-left px-4 py-2 text-sm ${
                site === "blog"
                  ? "font-semibold text-primary-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Royal Vente Blog
            </button>
            <button
              onClick={() => switchSite("newsletter")}
              className={`w-full text-left px-4 py-2 text-sm ${
                site === "newsletter"
                  ? "font-semibold text-primary-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Royal Vente Newsletter
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center mt-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-primary-600 text-white"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="flex flex-col items-center mb-4">
        <Link
          to="/logout"
          className="group flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-red-600" />
          <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Sign out
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarType = "help" | "profile";

interface RightSidebarProps {
  type: SidebarType;
  username?: string;
  profileImgUrl?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  type,
  username = "User",
  profileImgUrl,
}) => {
  const navigate = useNavigate();

  const footerLinks = [
    { key: "Help", label: "Home" },
    { key: "Status", label: "Lists" },
    { key: "About", label: "About" },
    { key: "Careers", label: "Careers" },
    { key: "Press", label: "Press" },
    { key: "Blog", label: "Blog" },
    { key: "Privacy", label: "Privacy" },
    { key: "Rules", label: "Rules" },
    { key: "Terms", label: "Terms" },
  ];

  return (
    <div className="fixed top-12 right-0 w-[35rem] py-16 pl-6 min-h-screen border-l border-gray-200 bg-white flex flex-col justify-between dark:bg-gray-900 dark:border-gray-700">
      {/* Content Section */}
      <div className="mb-6">
        {type === "help" ? (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
              Suggested help articles
            </h3>
            <div className="space-y-3">
              {[
                "Sign in or sign up to Medium",
                "Your profile page",
                "Writing and publishing your first story",
                "About Medium's distribution system",
                "Get started with the Partner Program",
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
              <img
                src={
                  profileImgUrl ||
                  "https://via.placeholder.com/100?text=Profile"
                }
                alt={username}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-normal text-gray-900 mb-2 dark:text-white">
              {username}
            </h3>
            <button
              className="text-sm text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => navigate("/settings")}
            >
              Edit profile
            </button>
          </>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex flex-wrap">
        {footerLinks.map(({ key, label }) => (
          <a
            href="#"
            key={key}
            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-2 mr-4"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;

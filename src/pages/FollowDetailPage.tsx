import React, { useState, useRef, useEffect } from "react";

type User = {
  name: string;
  title: string;
  avatarUrl: string;
  verified?: boolean;
};

const sampleUsers: User[] = [
  {
    name: "Enrique Dans",
    title: "Professor of Innovation at IE Business School and blogger...",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "F. Perry Wilson, MD",
    title: "Associate Professor of Medicine and Public Health at Yale...",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
  },
  {
    name: "Michael Ryaboy",
    title: "Developer Advocate at KDB.AI...",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Medium Staff",
    title: "Official account for news and updates from Medium.",
    avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const FollowDetailPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("People");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[80%]">
      <h1 className="text-4xl font-normal text-primary-800 mb-8 dark:text-white">
        4 following
      </h1>

      <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {[
          { key: "People", label: "People" },
          { key: "Publications", label: "Publications" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
              activeTab === key
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {sampleUsers.map((user, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b relative"
        >
          {/* User Info */}
          <div className="flex items-start gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-sm">{user.name}</h3>
                {user.verified && (
                  <span className="text-blue-500 text-xs">✔️</span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{user.title}</p>
            </div>
          </div>

          {/* Dropdown Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-sm px-4 py-1 border rounded-md hover:bg-gray-100"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              Following <span className="ml-1">▼</span>
            </button>

            {openIndex === index && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                <ul className="text-sm">
                  <li
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      console.log("Notifications on");
                      setOpenIndex(null);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {" "}
                      Email notifications on
                    </span>
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      console.log("Notifications off");
                      setOpenIndex(null);
                    }}
                  >
                    Email notifications off
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      console.log(`Unfollowed ${user.name}`);
                      setOpenIndex(null);
                    }}
                  >
                    Unfollow
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowDetailPage;

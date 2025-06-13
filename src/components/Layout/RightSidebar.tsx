import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarType = "help" | "profile";

// interface RightSidebarProps {
//   type: SidebarType;
//   username?: string;
//   profileImgUrl?: string;
// }
interface RightSidebarProps {
  type: SidebarType;
  username?: string;
  profileImgUrl?: string;
  bio?: string;
  followers?: number;
  following?: number;
  joined?: string;
  followingList?: { name: string; avatar: string }[];
}


const RightSidebar: React.FC<RightSidebarProps> = ({
  type,
  username = "User",
  profileImgUrl,
  bio,
  followers,
  following,
  joined,
  followingList,

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
    <div className="fixed top-12 right-0 w-[30rem] py-16 pl-6 min-h-screen border-l border-gray-200 bg-white flex flex-col justify-between dark:bg-gray-900 dark:border-gray-700">
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
  <div className="flex flex-col items-start text-left px-4">
  {/* Profile image */}
  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border border-gray-300 dark:border-gray-600">
    <img
      src={profileImgUrl || "https://i.pravatar.cc/100?u=guest"}
      alt={username}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Username */}
  <h3 className="text-xl font-semibold font-sans text-gray-900 dark:text-white">{username}</h3>

  {/* Follower count */}
  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
    {followers !== undefined ? `${followers.toLocaleString()} followers` : "1.2K followers"}
  </p>

  {/* Bio */}
  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
    {bio || "Passionate storyteller and lifelong learner. ✨"}
  </p>

  {/* Joined Date */}
  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
    Joined {joined || "March 2023"}
  </p>

  <button
    className="mt-4 px-5 py-1.5 text-sm font-semibold bg-black text-white rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
  >
    Follow
  </button>

  {/* Edit Profile Button */}
  {/* <button
    className="mt-4 px-4 py-1 text-sm border border-primary-600 text-primary-600 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
    onClick={() => navigate("/settings")}
  >
    Edit profile
  </button> */}

  {/* Following List */}
  {type === "profile" && followingList?.length > 0 && (
    <div className="mt-8 w-full">
      <h4 className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-3">
        Following
      </h4>
      <ul className="space-y-3">
        {followingList.map((person, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm text-gray-800 dark:text-gray-100">
                {person.name}
              </span>
            </div>
            {/* Three-dot icon (you can replace this with an actual icon if needed) */}
            <span className="text-gray-400">•••</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-800 font-semibold hover:underline cursor-pointer">
        See all ({following})
      </p>
    </div>
  )}
</div>


</>

        )}
      </div>

      {/* Footer Section */}
      {/* <div className="flex flex-wrap">
        {footerLinks.map(({ key, label }) => (
          <a
            href="#"
            key={key}
            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-2 mr-4"
          >
            {label}
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default RightSidebar;

import React, { useState, useEffect } from "react";
import {
  User,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import ProfileModal from "../components/Modal/ProfileUpdate";

interface UserData {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  bio: string;
  emailVerified: boolean;
  personalBlogSlug: string;
  systemRole: string;
  prodigalCredits: number;
  royalVenteCredits: number;
  orgMemberships: Array<{
    org: string;
    orgSlug: string;
    role: string;
    permissions: {
      content: {
        create: boolean;
        edit: boolean;
        publish: boolean;
        delete: boolean;
        moderate: boolean;
      };
      users: {
        manage: boolean;
        invite: boolean;
      };
      settings: {
        platform: boolean;
        organization: boolean;
      };
    };
    _id: string;
  }>;
  createdAt: string;
  verificationExpire: string;
  verificationToken: string;
}

const Settings: React.FC = () => {
  // const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      displayName: "",
      email: "",
      bio: "",
      avatarUrl: "",
      personalBlogSlug: "",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      newFollowers: true,
      articleLikes: true,
      comments: true,
      mentions: false,
      digestFrequency: "daily",
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      allowIndexing: true,
      twoFactorAuth: false,
    },
    publishing: {
      allowPrivateNotes: true,
      enableTipping: false,
      allowEmailReplies: true,
      replyToEmail: "",
    },
  });

  const tabs = [
    { id: "account", label: "Account" },
    { id: "publishing", label: "Publishing" },
    { id: "notifications", label: "Notifications" },
    { id: "membership", label: "Membership and payment" },
    { id: "security", label: "Security and apps" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://royal-vente-blogging-system.onrender.com/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data.user);
        setSettings((prev) => ({
          ...prev,
          profile: {
            displayName: data.user.displayName,
            email: data.user.email,
            bio: data.user.bio,
            avatarUrl: data.user.avatarUrl,
            personalBlogSlug: data.user.personalBlogSlug,
          },
          publishing: {
            ...prev.publishing,
            replyToEmail: data.user.email,
          },
        }));
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          "https://royal-vente-blogging-system.onrender.com/api/v1/users/me",
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete account");
        }

        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("Failed to delete account");
      }
    }
  };

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  const SettingRow = ({
    title,
    description,
    children,
    onClick,
  }: {
    title: string;
    description?: string;
    children?: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div
      className={`flex items-center justify-between py-6 border-b border-gray-100 last:border-b-0 ${
        onClick ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="text-gray-900 font-medium">{title}</div>
        {description && (
          <div className="text-gray-600 text-sm mt-1">{description}</div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {children}
        {onClick && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-[90%]">
        <h1 className="text-3xl font-bold text-primary-700 mb-6">Settings</h1>

        {/* Tab Navigation */}

        <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}

        <div>
          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-0">
              <SettingRow
                title="Email address"
                children={
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">
                      {settings.profile.email}
                    </span>
                    {userData?.emailVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                }
              />

              <SettingRow
                title="Username and subdomain"
                children={
                  <span className="text-gray-600">@{userData?.username}</span>
                }
              />

              <SettingRow
                title="Profile information"
                description="Edit your photo, name, pronouns, short bio, etc."
                children={
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">
                      {settings.profile.displayName}
                    </span>
                    {settings.profile.avatarUrl ? (
                      <img
                        src={settings.profile.avatarUrl}
                        alt={settings.profile.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                }
                onClick={() => {
                  setIsmodalOpen(true);
                }}
              />

              <SettingRow
                title="Profile design"
                description="Customize the appearance of your profile."
                onClick={() => {}}
              />

              <SettingRow
                title="Custom domain"
                description="Upgrade to a Medium Membership to redirect your profile URL to a domain like yourdomain.com."
                children={<span className="text-gray-600">None</span>}
                onClick={() => {}}
              />

              <SettingRow
                title="Partner Program"
                description="You are not enrolled in the Partner Program."
                onClick={() => {}}
              />

              <SettingRow
                title="Your Medium Digest frequency"
                description="Adjust how often you see a new Digest."
                children={
                  <select
                    value={settings.notifications.digestFrequency}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          digestFrequency: e.target.value,
                        },
                      }))
                    }
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                }
              />

              <SettingRow
                title="Refine recommendations"
                description="Adjust recommendations by updating what you're following and more."
                onClick={() => {}}
              />

              <SettingRow
                title="Muted writers and publications"
                onClick={() => {}}
              />

              <SettingRow title="Blocked users" onClick={() => {}} />

              <div className="pt-8 border-t border-gray-200 mt-8">
                <div
                  className="text-red-600 cursor-pointer hover:text-red-700 font-medium"
                  onClick={handleDeleteAccount}
                >
                  Deactivate account
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Deactivating will suspend your account until you sign back in.
                </p>
              </div>

              <div className="pt-4">
                <div
                  className="text-red-600 cursor-pointer hover:text-red-700 font-medium"
                  onClick={handleDeleteAccount}
                >
                  Delete account
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Permanently delete your account and all of your content.
                </p>
              </div>
            </div>
          )}

          {/* Publishing Tab */}
          {activeTab === "publishing" && (
            <div className="space-y-0">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Manage publications
                </h2>
              </div>

              <SettingRow
                title="Allow readers to leave private notes on your stories"
                description="Private notes are visible to you and (if left in a publication) all Editors of the publication."
                children={
                  <ToggleSwitch
                    checked={settings.publishing.allowPrivateNotes}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        publishing: {
                          ...prev.publishing,
                          allowPrivateNotes: !prev.publishing.allowPrivateNotes,
                        },
                      }))
                    }
                  />
                }
              />

              <SettingRow
                title="Manage tipping on your stories"
                description="Readers can send you tips through the third-party platform of your choice."
                children={<span className="text-gray-600">Disabled</span>}
              />

              <div className="pt-8 border-t border-gray-200 mt-8">
                <SettingRow
                  title="Allow email replies"
                  description="Let readers reply to your stories directly from their email."
                  children={
                    <ToggleSwitch
                      checked={settings.publishing.allowEmailReplies}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          publishing: {
                            ...prev.publishing,
                            allowEmailReplies:
                              !prev.publishing.allowEmailReplies,
                          },
                        }))
                      }
                    />
                  }
                />

                <SettingRow
                  title="'Reply To' email address"
                  description="Shown to your subscribers when they reply."
                  children={
                    <span className="text-gray-600">
                      {settings.publishing.replyToEmail}
                    </span>
                  }
                />

                <SettingRow
                  title="Import email subscribers"
                  description="Upload a CSV or TXT file containing up to 25,000 email addresses."
                  onClick={() => {}}
                />
              </div>

              <div className="pt-8 border-t border-gray-200 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Promote email subscriptions
                </h3>

                <SettingRow
                  title="Share your subscribe page"
                  description="This page allows readers to subscribe to you via email."
                  children={
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">
                        https://medium.com/subscrib...
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  }
                  onClick={() => {}}
                />

                <SettingRow
                  title="Customize your subscription promotion message"
                  description="This is the message on your subscribe and profile pages."
                  children={
                    <span className="text-gray-600">
                      Get an email whenever Aheli...
                    </span>
                  }
                />

                <SettingRow
                  title="Display a subscription promotion message"
                  description="A message will display after the second story on your profile."
                  children={
                    <ToggleSwitch checked={false} onChange={() => {}} />
                  }
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-0">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Email notifications
                </h2>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Story recommendations
                </h3>

                <SettingRow
                  title="New Medium Digest"
                  description="The best stories on Medium personalized based on your interests, as well as outstanding stories selected by our editors."
                  children={
                    <ToggleSwitch
                      checked={settings.notifications.weeklyDigest}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            weeklyDigest: !prev.notifications.weeklyDigest,
                          },
                        }))
                      }
                    />
                  }
                />

                <SettingRow
                  title="Recommended reading"
                  description="Featured stories, columns, and collections that we think you'll enjoy based on your reading history."
                  children={
                    <ToggleSwitch
                      checked={settings.notifications.emailNotifications}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            emailNotifications:
                              !prev.notifications.emailNotifications,
                          },
                        }))
                      }
                    />
                  }
                />
              </div>

              <div className="mb-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  From writers and publications
                </h3>

                <SettingRow
                  title="New stories added to lists you've saved"
                  children={<ToggleSwitch checked={true} onChange={() => {}} />}
                />

                <SettingRow
                  title="Manage subscriptions"
                  children={
                    <span className="text-gray-600">Michael Ryaboy</span>
                  }
                />
              </div>

              <div className="mb-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Social activity
                </h3>

                <SettingRow
                  title="When someone follows you or highlights the same passage in a story"
                  children={
                    <ToggleSwitch
                      checked={settings.notifications.newFollowers}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            newFollowers: !prev.notifications.newFollowers,
                          },
                        }))
                      }
                    />
                  }
                />

                <SettingRow
                  title="When someone mentions you in their story"
                  children={
                    <select
                      value="in-network"
                      onChange={() => {}}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      <option value="in-network">In network</option>
                      <option value="everyone">Everyone</option>
                      <option value="no-one">No one</option>
                    </select>
                  }
                />
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  For writers
                </h3>

                <SettingRow
                  title="Notifications on your published stories"
                  children={
                    <ToggleSwitch
                      checked={settings.notifications.articleLikes}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            articleLikes: !prev.notifications.articleLikes,
                          },
                        }))
                      }
                    />
                  }
                />

                <SettingRow
                  title="Notifications on your lists"
                  children={
                    <ToggleSwitch
                      checked={settings.notifications.comments}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            comments: !prev.notifications.comments,
                          },
                        }))
                      }
                    />
                  }
                />

                <SettingRow
                  title="From editors about featuring your stories"
                  children={<ToggleSwitch checked={true} onChange={() => {}} />}
                />
              </div>
            </div>
          )}

          {/* Membership Tab */}
          {activeTab === "membership" && (
            <div className="space-y-0">
              <SettingRow
                title="Upgrade to a Medium Membership"
                description="Subscribe for unlimited access to the smartest writers and biggest ideas on Medium."
                onClick={() => {}}
              />
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-0">
              <SettingRow title="Change password" onClick={() => {}} />

              <SettingRow
                title="Two-factor authentication"
                description="Add an extra layer of security to your account."
                children={
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      settings.privacy.twoFactorAuth
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {settings.privacy.twoFactorAuth ? "Enabled" : "Not enabled"}
                  </span>
                }
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      twoFactorAuth: !prev.privacy.twoFactorAuth,
                    },
                  }))
                }
              />

              <SettingRow
                title="Connected accounts"
                description="Manage your connected social media accounts."
                onClick={() => {}}
              />

              <SettingRow
                title="Active sessions"
                description="See where you're logged in and manage your active sessions."
                onClick={() => {}}
              />
            </div>
          )}
        </div>
      </div>
      

      {isModalOpen && (
        <>
          <ProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsmodalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Settings;

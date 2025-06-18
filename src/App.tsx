import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./components/Layout/MainLayout";
import { UserLayout } from "./components/Layout/UserLayout";
import { SettingsLayout } from "./components/Layout/SettingsLayout";
import { UserDetailsLayout } from "./components/Layout/UserDetailsLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PublicArticles from "./pages/PublicArticles";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Dashboard";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import CreateArticle from "./pages/CreateArticle";
import Drafts from "./pages/Drafts";
import Analytics from "./pages/Analytics";
import Tags from "./pages/Tags";

import Profile from "./pages/Profile";
import FollowDetailPage from "./pages/FollowDetailPage";

import { NotificationsPage } from "./pages/Notifications";
import { LibraryPage } from "./pages/LibraryPage";

import Settings from "./pages/Settings";

import UserManagement from "./pages/UserManagement";
import OrganizationManage from "./pages/admin/OrganizationManage";
import CreateOrganization from "./pages/CreateOrganization";
import UserDashboard from "./pages/UserDashboard";
import CreateNewsletter from "./pages/CreateNewsletter";
import CreateCampaign from "./pages/CreateCampaign";
import { NewsletterProvider } from "./contexts/NewsletterContext";
import Newsletter from "./components/Newsletter/Newsletter";
import CapabilitiesPage from "./components/Newsletter/CapabilitiesPage";
import { SiteProvider } from "./contexts/SiteContext";
import EmailBuilderPage from "./components/Newsletter/EmailBuilderPage";
import TemplatesTab from "./components/Newsletter/TemplatesTab";
import SubscriberManagement from "./components/Newsletter/SubscriberManagement";
import SocialMediaTab from "./components/Newsletter/SocialMediaTab";
import AnalyticsTab from "./components/Newsletter/AnalyticsTab";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <Routes>
      {/** Public **/}
      <Route path="/" element={<LandingPage />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="public/articles" element={<PublicArticles />} />

      {/** Auth **/}
      <Route
        path="login"
        element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="register"
        element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
      />

      {/** All Protected under MainLayout **/}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" index element={<Home />} />

        <Route path="blogs">
          <Route index element={<Articles />} />
          <Route path=":id" element={<ArticlePage />} />
        </Route>

        <Route path="create" element={<CreateArticle />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/newsletter/create" element={<CreateNewsletter />} />
        <Route path="/newsletter/social" element={<SocialMediaTab />} />
        <Route path="/newsletter/analytics" element={<AnalyticsTab />} />
        <Route path="email-builder" element={< EmailBuilderPage />} />

        <Route path="temlplets" element={<TemplatesTab />} />


        <Route
          path="/newsletter/create-campaign"
          element={<CreateCampaign />}
        />
        <Route path="analytics" element={<Analytics />} />
        <Route path="tags" element={<Tags />} />

        <Route path="create-organization" element={<CreateOrganization />} />

        {/** Admin sub-section **/}
        <Route path="admin">
          <Route path="users" element={<UserManagement />} />
          <Route
            path="organization/:orgId/manage"
            element={<OrganizationManage />}
          />
          {/** default to /admin/users */}
          <Route index element={<Navigate to="users" replace />} />
        </Route>

        {/** Newsletter routes **/}
      </Route>

      {/** User-specific area under UserLayout **/}
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="user-dashboard" element={<UserDashboard />} />
      </Route>

      {/** Profile details under its own layout **/}
      <Route
        path="profile/*"
        element={
          <ProtectedRoute>
            <UserDetailsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
        <Route path="following" element={<FollowDetailPage />} />
        <Route path=":username" element={<Profile />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      {/** Settings under SettingsLayout **/}
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <SettingsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Settings />} />
      </Route>

      {/** Fallback **/}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NewsletterProvider>
            <SiteProvider>
              <AuthProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
                    <AppRoutes />
                  </div>
                </Router>
              </AuthProvider>
            </SiteProvider>
          </NewsletterProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import CreateArticle from './pages/CreateArticle';
import Drafts from './pages/Drafts';
import Analytics from './pages/Analytics';
import Tags from './pages/Tags';
import Settings from './pages/Settings';
import PublicArticles from './pages/PublicArticles';
import About from './pages/About';
import Contact from './pages/Contact';
import Organizations from './pages/Organizations';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/public/articles" element={<PublicArticles />} />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>
      <Route
        path="/admin/organizations"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Organizations />} />
      </Route>
      
      <Route
        path="/blogs"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Articles />} />
      </Route>
      
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CreateArticle />} />
      </Route>
      
      <Route
        path="/drafts"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Drafts />} />
      </Route>
      
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Analytics />} />
      </Route>
      
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Tags />} />
      </Route>
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
      </Route>
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Settings />} />
      </Route>

      {/* Admin Routes - Coming Soon */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel - Coming Soon</h1></div>} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/\" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Dashboard';
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
import ArticlePage from './pages/ArticlePage'; // Ensure you import your ArticlePage component
import UserManagement from './pages/UserManagement';
import UserDashboard from './pages/UserDashboard';
import CreateOrganization from './pages/CreateOrganization';
import OrganizationManage from './pages/admin/OrganizationManage';
import OrganizationPage from './pages/OrganizationPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return <>{children}</>;
  }
  return <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const token = localStorage.getItem('token');

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
        element={token ? <Navigate to="/home" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={token ? <Navigate to="/home" /> : <Register />} 
      />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
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
        <Route path=":id" element={<ArticlePage />} />  {/* Add the dynamic route for ArticlePage */}
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
        path="/tags"
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
  path="/organization/:slug"
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<OrganizationPage />} /> {/* Add the new OrganizationPage component */}
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

      <Route path='/create-organization' element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<CreateOrganization />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        
        <Route path="users" element={<UserManagement />} />
        <Route path="organization/:orgId/manage" element={<OrganizationManage />} />
        <Route path="settings" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1></div>} />
        <Route path="security" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h1></div>} />
        <Route index element={<Navigate to="/admin/users" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
                <AppRoutes />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

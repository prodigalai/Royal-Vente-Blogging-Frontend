import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContextType, User, Organization, RegisterData } from '../types';
import { setCredentials, logout as logoutAction, updateUser as updateUserAction } from '../store/slices/authSlice';
import { RootState } from '../store';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [organization, setOrganization] = React.useState<Organization | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.data && data.data.token) {
        dispatch(setCredentials({
          user: data.data.user,
          token: data.data.token
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    setOrganization(null);
    localStorage.removeItem('token');
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.data && data.data.token) {
        dispatch(setCredentials({
          user: data.data.user,
          token: data.data.token
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  const switchOrganization = async (organizationId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/organizations/${organizationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const orgData = await response.json();
        setOrganization(orgData);
      }
    } catch (error) {
      console.error('Error switching organization:', error);
    }
  };

  const value = {
    user,
    organization,
    isAuthenticated,
    login,
    logout,
    register,
    switchOrganization,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
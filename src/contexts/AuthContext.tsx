import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContextType, User, Organization, RegisterData } from '../types';
import { setCredentials, logout as logoutAction, updateUser as updateUserAction } from '../store/slices/authSlice';
import { RootState } from '../store';
import api from '../utils/axios';

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
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      if (!data.success || !data.data || !data.data.token) {
        throw new Error(data.message || 'Login failed');
      }
      dispatch(setCredentials({
        user: data.data.user,
        token: data.data.token
      }));
    } catch (error: any) {
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
      const response = await api.post('/auth/register', userData);
      const data = response.data;
      if (!data.success || !data.data || !data.data.token) {
        throw new Error(data.message || 'Registration failed');
      }
      dispatch(setCredentials({
        user: data.data.user,
        token: data.data.token
      }));
    } catch (error: any) {
      throw error;
    }
  };

  const switchOrganization = async (organizationId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/organizations/${organizationId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 200) {
        setOrganization(response.data);
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
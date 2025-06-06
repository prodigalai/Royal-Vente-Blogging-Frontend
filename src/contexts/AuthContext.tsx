import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, Organization, RegisterData } from '../types';
import { mockUsers, mockOrganizations, mockOrganizationMembers } from '../utils/mockData';

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
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedOrg = localStorage.getItem('currentOrganization');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      
      if (savedOrg) {
        setOrganization(JSON.parse(savedOrg));
      } else if (userData.organizationId) {
        const userOrg = mockOrganizations.find(org => org.id === userData.organizationId);
        if (userOrg) {
          setOrganization(userOrg);
          localStorage.setItem('currentOrganization', JSON.stringify(userOrg));
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    
    if (foundUser.organizationId) {
      const userOrg = mockOrganizations.find(org => org.id === foundUser.organizationId);
      if (userOrg) {
        setOrganization(userOrg);
        localStorage.setItem('currentOrganization', JSON.stringify(userOrg));
      }
    }
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentOrganization');
  };

  const register = async (userData: RegisterData) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: userData.role || 'author',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const switchOrganization = (organizationId: string) => {
    const org = mockOrganizations.find(o => o.id === organizationId);
    if (org) {
      setOrganization(org);
      localStorage.setItem('currentOrganization', JSON.stringify(org));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      organization,
      isAuthenticated,
      login,
      logout,
      register,
      switchOrganization,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
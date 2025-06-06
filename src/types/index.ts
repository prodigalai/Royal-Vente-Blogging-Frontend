export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  personalBlogSlug?: string;
  systemRole?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Organization {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrganizationMember {
  userId: string;
  role: OrganizationRole;
  joinedAt: string;
  user: User;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  author: User;
  organizationId?: string;
  organization?: Organization;
  tags: string[];
  status: ArticleStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  readTime: number;
}

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'reader';

export type OrganizationRole = 'owner' | 'admin' | 'editor' | 'member';

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface RolePermissions {
  [key: string]: Permission[];
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  switchOrganization: (organizationId: string) => void;
}

export interface RegisterData {
  type: 'individual' | 'organization';
  username: string;
  displayName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  personalBlogSlug?: string;
  organizationName?: string;
  organizationSlug?: string;
}
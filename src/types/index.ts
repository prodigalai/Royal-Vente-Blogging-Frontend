export interface User {
  name: string | number | readonly string[] | undefined;
  id: string;
  username: string;
  displayName: string;
  emailVerified?: boolean;
  email: string;
  avatarUrl?: string;
  personalBlogSlug?: string;
  systemRole?: string;
  createdAt?: string;
  updatedAt?: string;
  organizationId?: string;
  lastLogin?: string;
  bio?: string;
  followers?: number;
  following?: number;
  joinedDate?: Date;
}


export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  createdAt: Date;
  members: OrganizationMember[];
  articlesCount: number;
  isPublic: boolean;
  ownerId?: string;
}

export interface OrganizationMember {
  id: string;
  role: OrganizationRole;
  user: User;
  joinedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  organization?: Organization;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readTime: number;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  isLiked: boolean;
  isPublished: boolean;
  views: number;
  isDraft: boolean;
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  followerCount: number;
  articleCount: number;
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
import { Organization, Article } from "../types";

// Mock data for development and testing
export const mockUsers = [
  {
    id: '1',
    _id: '1',
    name: 'John Doe',
    username: 'johndoe',
    displayName: 'John Doe',
    email: 'john@example.com',
    emailVerified: true,
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    status: 'active',
    lastLogin: '2024-03-20T10:00:00Z'
  },
  {
    id: '2',
    _id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    displayName: 'Jane Smith',
    email: 'jane@example.com',
    emailVerified: false,
    role: 'editor',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    status: 'active',
    lastLogin: '2024-03-19T15:30:00Z'
  },
  {
    id: '3',
    _id: '3',
    name: 'Emily Brown',
    username: 'emilybrown',
    displayName: 'Emily Brown',
    email: 'emily@example.com',
    emailVerified: true,
    role: 'contributor',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Brown',
    status: 'active',
    lastLogin: '2024-03-18T09:00:00Z'
  }
];

export const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    content: 'This is a sample post about React...',
    author: mockUsers[0],
    status: 'published',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    tags: ['react', 'javascript', 'web-development']
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    content: 'This is a sample post about TypeScript...',
    author: mockUsers[1],
    status: 'draft',
    createdAt: '2024-03-19T15:30:00Z',
    updatedAt: '2024-03-19T15:30:00Z',
    tags: ['typescript', 'javascript', 'programming']
  }
];


export const mockCategories = [
  {
    id: '1',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Articles about web development technologies and practices'
  },
  {
    id: '2',
    name: 'Programming',
    slug: 'programming',
    description: 'General programming topics and best practices'
  }
];

export const mockTags = [
  {
    id: '1',
    name: 'react',
    slug: 'react',
    count: 5
  },
  {
    id: '2',
    name: 'typescript',
    slug: 'typescript',
    count: 3
  },
  {
    id: '3',
    name: 'javascript',
    slug: 'javascript',
    count: 8
  }
];

export const mockComments = [
  {
    id: '1',
    postId: '1',
    author: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson'
    },
    content: 'Great article! Very helpful.',
    createdAt: '2024-03-20T11:00:00Z',
    status: 'approved'
  },
  {
    id: '2',
    postId: '1',
    author: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson'
    },
    content: 'Thanks for sharing this knowledge!',
    createdAt: '2024-03-20T12:00:00Z',
    status: 'pending'
  }
];









import { Organization, Article, OrganizationMember } from "../types";

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

export const mockOrganizations: Organization[] = [
  {
    id: 'org_1',
    name: 'TechCorp Solutions',
    description: 'Leading technology solutions provider',
    createdAt: '2024-01-01T00:00:00Z',
    ownerId: 'user_1',
    members: [],
    logo: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'org_2',
    name: 'Creative Studio',
    description: 'Digital creative agency',
    createdAt: '2024-01-15T00:00:00Z',
    ownerId: 'user_3',
    members: [],
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
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

export const mockOrganizationMembers: OrganizationMember[] = [
  {
    userId: 'user_1',
    role: 'owner',
    joinedAt: '2024-01-01T00:00:00Z',
    user: mockUsers[0]
  },
  {
    userId: 'user_2',
    role: 'admin',
    joinedAt: '2024-01-15T00:00:00Z',
    user: mockUsers[1]
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

export const mockArticles: Article[] = [
  {
    id: 'article_1',
    title: 'The Future of Artificial Intelligence in Business',
    content: `# The Future of Artificial Intelligence in Business

Artificial Intelligence is revolutionizing the way businesses operate across industries. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.

## Key Areas of Impact

### 1. Customer Service
AI-powered chatbots and virtual assistants are transforming customer support, providing 24/7 availability and instant responses to common queries.

### 2. Data Analytics
Machine learning algorithms can process vast amounts of data to identify patterns and trends that would be impossible for humans to detect manually.

### 3. Process Automation
Robotic Process Automation (RPA) is streamlining repetitive tasks, allowing human workers to focus on more strategic activities.

## Challenges and Considerations

While AI offers tremendous opportunities, businesses must also consider:
- Data privacy and security concerns
- The need for skilled AI professionals
- Ethical implications of AI decision-making
- Integration challenges with existing systems

The future belongs to organizations that can successfully harness the power of AI while addressing these challenges responsibly.`,
    excerpt: 'Exploring how AI is transforming modern business operations and the challenges organizations face in implementation.',
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    authorId: 'user_1',
    author: mockUsers[0],
    organizationId: 'org_1',
    tags: ['AI', 'Business', 'Technology', 'Innovation'],
    status: 'published',
    publishedAt: '2024-12-15T10:00:00Z',
    createdAt: '2024-12-14T15:30:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
    likes: 42,
    views: 1250,
    readTime: 5
  },
  {
    id: 'article_2',
    title: 'Design Thinking: A Human-Centered Approach to Innovation',
    content: `# Design Thinking: A Human-Centered Approach to Innovation

Design thinking is more than just a methodology—it's a mindset that puts human needs at the center of the innovation process. This approach has been adopted by leading companies worldwide to create products and services that truly resonate with users.

## The Five Stages of Design Thinking

### 1. Empathize
Understanding the user's needs, thoughts, emotions, and motivations through observation and engagement.

### 2. Define
Synthesizing observations to define the core problems that need to be addressed.

### 3. Ideate
Brainstorming creative solutions and thinking outside the box to address the defined problems.

### 4. Prototype
Building scaled-down versions of the product or specific features to investigate the problem solutions.

### 5. Test
Testing the complete product using the best solutions identified during the prototyping phase.

## Why Design Thinking Matters

In today's competitive landscape, companies that prioritize user experience gain significant advantages:
- Higher customer satisfaction and loyalty
- Reduced development costs through early problem identification
- Increased innovation and creative problem-solving
- Better team collaboration and communication

Design thinking encourages teams to challenge assumptions, embrace failure as a learning opportunity, and iterate quickly to find the best solutions.`,
    excerpt: 'Understanding the design thinking methodology and how it drives human-centered innovation in modern organizations.',
    coverImage: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200',
    authorId: 'user_3',
    author: mockUsers[2],
    organizationId: 'org_2',
    tags: ['Design', 'Innovation', 'UX', 'Methodology'],
    status: 'published',
    publishedAt: '2024-12-18T14:20:00Z',
    createdAt: '2024-12-17T11:45:00Z',
    updatedAt: '2024-12-18T14:20:00Z',
    likes: 28,
    views: 890,
    readTime: 4
  },
  {
    id: 'article_3',
    title: 'Sustainable Technology: Building a Greener Future',
    content: `# Sustainable Technology: Building a Greener Future

As climate change concerns grow, the technology sector is increasingly focusing on sustainability. From renewable energy solutions to eco-friendly manufacturing processes, tech companies are leading the charge toward a more sustainable future.

## Green Computing Initiatives

### Energy-Efficient Data Centers
Modern data centers are implementing innovative cooling systems, renewable energy sources, and optimized server configurations to reduce their carbon footprint.

### Cloud Computing Benefits
Cloud services help organizations reduce their environmental impact by:
- Maximizing server utilization
- Reducing physical infrastructure needs
- Enabling remote work capabilities
- Optimizing resource allocation

## Emerging Sustainable Technologies

### 1. Solar and Wind Integration
Advanced software systems are making renewable energy more efficient and cost-effective.

### 2. Smart Grid Technology
AI-powered grid management systems optimize energy distribution and reduce waste.

### 3. Circular Economy Platforms
Digital platforms are facilitating product sharing, recycling, and sustainable consumption patterns.

The future of technology lies in balancing innovation with environmental responsibility, creating solutions that benefit both business and the planet.`,
    excerpt: 'Exploring how technology companies are embracing sustainability and contributing to environmental conservation efforts.',
    coverImage: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1200',
    authorId: 'user_2',
    author: mockUsers[1],
    organizationId: 'org_1',
    tags: ['Sustainability', 'Technology', 'Green Tech', 'Environment'],
    status: 'published',
    publishedAt: '2024-12-19T09:15:00Z',
    createdAt: '2024-12-18T16:30:00Z',
    updatedAt: '2024-12-19T09:15:00Z',
    likes: 35,
    views: 620,
    readTime: 3
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
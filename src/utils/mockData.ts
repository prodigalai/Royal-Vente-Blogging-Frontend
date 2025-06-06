import { User, Organization, Article, OrganizationMember } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user_1',
    email: 'admin@royalvente.com',
    name: 'System Administrator',
    role: 'super_admin',
    organizationId: 'org_1',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-20T10:00:00Z',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'user_2',
    email: 'editor@techcorp.com',
    name: 'Sarah Johnson',
    role: 'editor',
    organizationId: 'org_1',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-12-20T09:30:00Z',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'user_3',
    email: 'author@creativestudio.com',
    name: 'Michael Chen',
    role: 'author',
    organizationId: 'org_2',
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-12-20T08:45:00Z',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'user_4',
    email: 'reader@example.com',
    name: 'Emma Davis',
    role: 'reader',
    createdAt: '2024-02-15T00:00:00Z',
    lastLogin: '2024-12-20T07:20:00Z',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
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

// Update organizations with member data
mockOrganizations[0].members = mockOrganizationMembers.filter(m => 
  ['user_1', 'user_2'].includes(m.userId)
);
mockOrganizations[1].members = mockOrganizationMembers.filter(m => 
  m.userId === 'user_3'
);
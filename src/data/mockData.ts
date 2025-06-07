// Mock data for development and testing
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    status: 'active',
    lastLogin: '2024-03-20T10:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'editor',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    status: 'active',
    lastLogin: '2024-03-19T15:30:00Z'
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




export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechVenture Labs',
    description: 'A leading technology incubator focused on AI and blockchain innovations.',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    createdAt: new Date('2023-01-15'),
    members: [
      {
        id: '1',
        user: mockUsers[0],
        role: 'admin',
        joinedAt: new Date('2023-01-15'),
      },
      {
        id: '2',
        user: mockUsers[1],
        role: 'editor',
        joinedAt: new Date('2023-02-01'),
      },
    ],
    articlesCount: 45,
    isPublic: true,
  },
  {
    id: '2',
    name: 'Creative Writers Hub',
    description: 'A community of writers sharing stories, tips, and creative inspiration.',
    logo: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    createdAt: new Date('2023-03-10'),
    members: [
      {
        id: '3',
        user: mockUsers[1],
        role: 'admin',
        joinedAt: new Date('2023-03-10'),
      },
      {
        id: '4',
        user: mockUsers[2],
        role: 'contributor',
        joinedAt: new Date('2023-03-15'),
      },
    ],
    articlesCount: 28,
    isPublic: true,
  },
];



export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Software Development',
    subtitle: 'How AI is transforming the way we write, test, and deploy code',
    content: `
      <p>Artificial Intelligence is revolutionizing software development in ways we never imagined just a few years ago. From automated code generation to intelligent testing, AI tools are becoming indispensable for modern developers.</p>
      
      <h2>Code Generation and Completion</h2>
      <p>Tools like GitHub Copilot and Tabnine are changing how we write code. These AI-powered assistants can suggest entire functions, help with boilerplate code, and even explain complex algorithms in natural language.</p>
      
      <h2>Automated Testing</h2>
      <p>AI is making testing more efficient by automatically generating test cases, identifying edge cases that human testers might miss, and even predicting which parts of the codebase are most likely to contain bugs.</p>
      
      <h2>Code Review and Quality Assurance</h2>
      <p>Machine learning models can now analyze code for potential security vulnerabilities, performance issues, and adherence to coding standards, making code review processes more thorough and consistent.</p>
      
      <p>The integration of AI into our development workflows is not just a trend—it's the future of how we build software.</p>
    `,
    excerpt: 'Exploring how AI tools are transforming software development from code generation to automated testing and quality assurance.',
    coverImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    author: mockUsers[0],
    organization: mockOrganizations[0],
    tags: ['Technology', 'Artificial Intelligence', 'Programming'],
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    readTime: 8,
    likes: 342,
    comments: 28,
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    isDraft: false,
  },
  {
    id: '2',
    title: 'Building a Successful Remote Team: Lessons from 5 Years of Distributed Work',
    subtitle: 'Practical strategies for managing, motivating, and scaling remote teams',
    content: `
      <p>After five years of building and managing remote teams, I've learned that successful distributed work isn't just about having the right tools—it's about creating the right culture.</p>
      
      <h2>Communication is Everything</h2>
      <p>Over-communication is better than under-communication in remote settings. We established clear communication protocols, regular check-ins, and made sure everyone felt heard and included.</p>
      
      <h2>Trust and Autonomy</h2>
      <p>Remote work thrives on trust. Instead of micromanaging, we focused on outcomes and results. This approach not only improved productivity but also job satisfaction across the team.</p>
      
      <h2>Building Connection</h2>
      <p>Regular virtual coffee chats, online team-building activities, and annual in-person retreats helped maintain team cohesion and company culture despite the physical distance.</p>
      
      <p>Remote work isn't going away. Companies that master it now will have a significant competitive advantage in attracting and retaining top talent.</p>
    `,
    excerpt: 'Five years of lessons learned from building and scaling successful remote teams in the modern workplace.',
    coverImage: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    author: mockUsers[2],
    tags: ['Startup', 'Career', 'Technology'],
    publishedAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    readTime: 6,
    likes: 189,
    comments: 15,
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    isDraft: false,
  },
  {
    id: '3',
    title: 'The Art of Technical Writing: Making Complex Ideas Accessible',
    subtitle: 'Why clear communication is a developer\'s superpower',
    content: `
      <p>Technical writing isn't just about documentation—it's about making complex ideas accessible to diverse audiences. As developers, our ability to communicate clearly can make or break our projects.</p>
      
      <h2>Know Your Audience</h2>
      <p>The same concept needs to be explained differently to a fellow developer, a product manager, and a CEO. Understanding your audience is the first step to effective technical communication.</p>
      
      <h2>Structure and Clarity</h2>
      <p>Good technical writing follows a clear structure: start with the problem, explain your approach, and conclude with results and next steps. Use headers, bullet points, and visual aids to break up dense content.</p>
      
      <h2>The Power of Examples</h2>
      <p>Abstract concepts become concrete through examples. Code snippets, diagrams, and real-world scenarios help readers understand and apply your ideas.</p>
      
      <p>Investing in your technical writing skills will pay dividends throughout your career, opening doors to leadership roles and new opportunities.</p>
    `,
    excerpt: 'Mastering technical writing to make complex development concepts accessible to any audience.',
    coverImage: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    author: mockUsers[1],
    organization: mockOrganizations[1],
    tags: ['Programming', 'Career', 'Design'],
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    readTime: 5,
    likes: 156,
    comments: 12,
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    isDraft: false,
  },
  {
    id: '4',
    title: 'Designing for Accessibility: Beyond Compliance',
    subtitle: 'Creating truly inclusive digital experiences',
    content: `
      <p>Accessibility isn't just about meeting WCAG guidelines—it's about creating digital experiences that work for everyone, regardless of their abilities or circumstances.</p>
      
      <h2>The Business Case for Accessibility</h2>
      <p>Accessible design doesn't just help people with disabilities; it improves usability for everyone. Features like captions, clear navigation, and high contrast designs benefit all users.</p>
      
      <h2>Start with Empathy</h2>
      <p>Understanding the diverse ways people interact with technology is crucial. From screen readers to voice commands, there are many ways to navigate digital interfaces.</p>
      
      <h2>Testing and Iteration</h2>
      <p>Accessibility testing should be part of your regular development process. Automated tools are helpful, but nothing replaces testing with real users who have disabilities.</p>
      
      <p>When we design with accessibility in mind from the start, we create better products for everyone.</p>
    `,
    excerpt: 'Going beyond compliance to create truly inclusive digital experiences through thoughtful accessibility design.',
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    author: mockUsers[0],
    tags: ['Design', 'Technology', 'Career'],
    publishedAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    readTime: 7,
    likes: 203,
    comments: 18,
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    isDraft: false,
  },
];
import { Newsletter, Campaign, Template, Subscriber, Automation } from '../types/newsletter';

export const mockNewsletters: Newsletter[] = [
  {
    id: '1',
    name: 'Tech Weekly',
    description: 'Weekly technology insights and trends',
    logo: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    subscribers: 2847,
    openRate: 24.5,
    clickRate: 3.2,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    categories: ['Technology', 'Business'],
    frequency: 'weekly'
  },
  {
    id: '2',
    name: 'Startup Stories',
    description: 'Inspiring stories from the startup world',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    subscribers: 1523,
    openRate: 31.8,
    clickRate: 4.7,
    isActive: true,
    createdAt: new Date('2024-02-01'),
    categories: ['Startup', 'Entrepreneurship'],
    frequency: 'monthly'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    subject: 'The Future of AI in 2024',
    newsletter: 'Tech Weekly',
    status: 'sent',
    sentAt: new Date('2024-01-20'),
    opens: 698,
    clicks: 91,
    recipients: 2847,
    template: 'modern-tech'
  },
  {
    id: '2',
    subject: 'Weekly Startup Roundup',
    newsletter: 'Startup Stories',
    status: 'scheduled',
    scheduledAt: new Date('2024-01-25'),
    opens: 0,
    clicks: 0,
    recipients: 1523,
    template: 'startup-digest'
  },
  {
    id: '3',
    subject: 'Breaking: New Tech Trends',
    newsletter: 'Tech Weekly',
    status: 'draft',
    opens: 0,
    clicks: 0,
    recipients: 2847,
    template: 'news-alert'
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Modern Tech Newsletter',
    category: 'Technology',
    preview: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Clean, modern design perfect for tech content',
    isPremium: false,
    uses: 1247
  },
  {
    id: '2',
    name: 'Startup Digest',
    category: 'Business',
    preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Professional layout for business updates',
    isPremium: false,
    uses: 892
  },
  {
    id: '3',
    name: 'Creative Portfolio',
    category: 'Design',
    preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Showcase your creative work beautifully',
    isPremium: true,
    uses: 634
  },
  {
    id: '4',
    name: 'News Alert',
    category: 'News',
    preview: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Breaking news and urgent updates',
    isPremium: false,
    uses: 445
  },
  {
    id: '5',
    name: 'E-commerce Promo',
    category: 'Marketing',
    preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Perfect for product promotions and sales',
    isPremium: true,
    uses: 723
  },
  {
    id: '6',
    name: 'Educational Content',
    category: 'Education',
    preview: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    description: 'Ideal for courses and educational content',
    isPremium: false,
    uses: 356
  }
];

export const mockSubscribers: Subscriber[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    status: 'active',
    subscribedAt: new Date('2024-01-10'),
    tags: ['tech', 'startup'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    name: 'Jane Smith',
    status: 'active',
    subscribedAt: new Date('2024-01-15'),
    tags: ['business'],
    location: 'New York, NY'
  },
  {
    id: '3',
    email: 'mike.wilson@email.com',
    name: 'Mike Wilson',
    status: 'unsubscribed',
    subscribedAt: new Date('2024-01-05'),
    tags: ['tech'],
    location: 'Austin, TX'
  }
];

export const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Welcome Series',
    trigger: 'New Subscriber',
    status: 'active',
    subscribers: 2847,
    emails: 3,
    openRate: 45.2,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Re-engagement Campaign',
    trigger: 'Inactive 30 days',
    status: 'active',
    subscribers: 234,
    emails: 2,
    openRate: 28.7,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Birthday Wishes',
    trigger: 'Birthday',
    status: 'paused',
    subscribers: 1523,
    emails: 1,
    openRate: 67.3,
    createdAt: new Date('2024-01-15')
  }
];
export interface Newsletter {
  id: string;
  name: string;
  description: string;
  logo?: string;
  subscribers: number;
  openRate: number;
  clickRate: number;
  isActive: boolean;
  createdAt: Date;
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
}

export interface Campaign {
  id: string;
  subject: string;
  newsletter: string;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  scheduledAt?: Date;
  sentAt?: Date;
  opens: number;
  clicks: number;
  recipients: number;
  template: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  description: string;
  isPremium: boolean;
  uses: number;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: Date;
  tags: string[];
  location?: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused';
  subscribers: number;
  emails: number;
  openRate: number;
  createdAt: Date;
}

export type TabType = 'overview' | 'campaigns' | 'templates' | 'subscribers' | 'automations' | 'social-media' | 'analytics' | 'settings';
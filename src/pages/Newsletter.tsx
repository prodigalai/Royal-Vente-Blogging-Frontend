import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Mail,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Send,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Download,
  Upload,
  Filter,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Target,
  Zap,
  Archive,
  Star,
  Globe,
  Lock,
  MoreHorizontal,
  FileText,
  Image,
  Palette,
  Code,
  RefreshCw,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Newsletter {
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
  frequency: "daily" | "weekly" | "monthly" | "custom";
}

interface Campaign {
  id: string;
  subject: string;
  newsletter: string;
  status: "draft" | "scheduled" | "sent" | "sending";
  scheduledAt?: Date;
  sentAt?: Date;
  opens: number;
  clicks: number;
  recipients: number;
  template: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  description: string;
  isPremium: boolean;
  uses: number;
}

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed" | "bounced";
  subscribedAt: Date;
  tags: string[];
  location?: string;
}

interface Automation {
  id: string;
  name: string;
  trigger: string;
  status: "active" | "paused";
  subscribers: number;
  emails: number;
  openRate: number;
  createdAt: Date;
}

const Newsletter: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "campaigns"
    | "templates"
    | "subscribers"
    | "automations"
    | "analytics"
    | "settings"
  >("overview");
  const [selectedNewsletter, setSelectedNewsletter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  // Mock data
  const newsletters: Newsletter[] = [
    {
      id: "1",
      name: "Tech Weekly",
      description: "Weekly technology insights and trends",
      logo: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      subscribers: 2847,
      openRate: 24.5,
      clickRate: 3.2,
      isActive: true,
      createdAt: new Date("2024-01-15"),
      categories: ["Technology", "Business"],
      frequency: "weekly",
    },
    {
      id: "2",
      name: "Startup Stories",
      description: "Inspiring stories from the startup world",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      subscribers: 1523,
      openRate: 31.8,
      clickRate: 4.7,
      isActive: true,
      createdAt: new Date("2024-02-01"),
      categories: ["Startup", "Entrepreneurship"],
      frequency: "monthly",
    },
  ];

  const campaigns: Campaign[] = [
    {
      id: "1",
      subject: "The Future of AI in 2024",
      newsletter: "Tech Weekly",
      status: "sent",
      sentAt: new Date("2024-01-20"),
      opens: 698,
      clicks: 91,
      recipients: 2847,
      template: "modern-tech",
    },
    {
      id: "2",
      subject: "Weekly Startup Roundup",
      newsletter: "Startup Stories",
      status: "scheduled",
      scheduledAt: new Date("2024-01-25"),
      opens: 0,
      clicks: 0,
      recipients: 1523,
      template: "startup-digest",
    },
    {
      id: "3",
      subject: "Breaking: New Tech Trends",
      newsletter: "Tech Weekly",
      status: "draft",
      opens: 0,
      clicks: 0,
      recipients: 2847,
      template: "news-alert",
    },
  ];

  const templates: Template[] = [
    {
      id: "1",
      name: "Modern Tech Newsletter",
      category: "Technology",
      preview:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Clean, modern design perfect for tech content",
      isPremium: false,
      uses: 1247,
    },
    {
      id: "2",
      name: "Startup Digest",
      category: "Business",
      preview:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Professional layout for business updates",
      isPremium: false,
      uses: 892,
    },
    {
      id: "3",
      name: "Creative Portfolio",
      category: "Design",
      preview:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Showcase your creative work beautifully",
      isPremium: true,
      uses: 634,
    },
    {
      id: "4",
      name: "News Alert",
      category: "News",
      preview:
        "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Breaking news and urgent updates",
      isPremium: false,
      uses: 445,
    },
    {
      id: "5",
      name: "E-commerce Promo",
      category: "Marketing",
      preview:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Perfect for product promotions and sales",
      isPremium: true,
      uses: 723,
    },
    {
      id: "6",
      name: "Educational Content",
      category: "Education",
      preview:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Ideal for courses and educational content",
      isPremium: false,
      uses: 356,
    },
    {
      id: "7",
      name: "Health & Wellness",
      category: "Health",
      preview:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Calming design for health content",
      isPremium: true,
      uses: 289,
    },
    {
      id: "8",
      name: "Finance Report",
      category: "Finance",
      preview:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Professional financial newsletter template",
      isPremium: false,
      uses: 512,
    },
    {
      id: "9",
      name: "Travel Guide",
      category: "Travel",
      preview:
        "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Beautiful travel and destination content",
      isPremium: true,
      uses: 178,
    },
    {
      id: "10",
      name: "Food & Recipe",
      category: "Food",
      preview:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Appetizing design for food content",
      isPremium: false,
      uses: 423,
    },
    {
      id: "11",
      name: "Event Invitation",
      category: "Events",
      preview:
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Elegant event and invitation template",
      isPremium: true,
      uses: 267,
    },
    {
      id: "12",
      name: "Minimalist Clean",
      category: "General",
      preview:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Simple, clean design for any content",
      isPremium: false,
      uses: 834,
    },
    {
      id: "13",
      name: "Corporate Update",
      category: "Business",
      preview:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Professional corporate communications",
      isPremium: true,
      uses: 445,
    },
    {
      id: "14",
      name: "Sports Newsletter",
      category: "Sports",
      preview:
        "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Dynamic sports and fitness content",
      isPremium: false,
      uses: 312,
    },
    {
      id: "15",
      name: "Art & Culture",
      category: "Culture",
      preview:
        "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Artistic and cultural content showcase",
      isPremium: true,
      uses: 189,
    },
    {
      id: "16",
      name: "Real Estate",
      category: "Real Estate",
      preview:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Property listings and real estate news",
      isPremium: false,
      uses: 234,
    },
    {
      id: "17",
      name: "Gaming Newsletter",
      category: "Gaming",
      preview:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Gaming news and reviews template",
      isPremium: true,
      uses: 567,
    },
    {
      id: "18",
      name: "Non-Profit Impact",
      category: "Non-Profit",
      preview:
        "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Showcase your mission and impact",
      isPremium: false,
      uses: 156,
    },
    {
      id: "19",
      name: "Fashion Trends",
      category: "Fashion",
      preview:
        "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Stylish fashion and lifestyle content",
      isPremium: true,
      uses: 389,
    },
    {
      id: "20",
      name: "Science & Research",
      category: "Science",
      preview:
        "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
      description: "Scientific research and discoveries",
      isPremium: false,
      uses: 278,
    },
  ];

  const subscribers: Subscriber[] = [
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      status: "active",
      subscribedAt: new Date("2024-01-10"),
      tags: ["tech", "startup"],
      location: "San Francisco, CA",
    },
    {
      id: "2",
      email: "jane.smith@company.com",
      name: "Jane Smith",
      status: "active",
      subscribedAt: new Date("2024-01-15"),
      tags: ["business"],
      location: "New York, NY",
    },
    {
      id: "3",
      email: "mike.wilson@email.com",
      name: "Mike Wilson",
      status: "unsubscribed",
      subscribedAt: new Date("2024-01-05"),
      tags: ["tech"],
      location: "Austin, TX",
    },
  ];

  const automations: Automation[] = [
    {
      id: "1",
      name: "Welcome Series",
      trigger: "New Subscriber",
      status: "active",
      subscribers: 2847,
      emails: 3,
      openRate: 45.2,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Re-engagement Campaign",
      trigger: "Inactive 30 days",
      status: "active",
      subscribers: 234,
      emails: 2,
      openRate: 28.7,
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "3",
      name: "Birthday Wishes",
      trigger: "Birthday",
      status: "paused",
      subscribers: 1523,
      emails: 1,
      openRate: 67.3,
      createdAt: new Date("2024-01-15"),
    },
  ];

  const templateCategories = [
    "All",
    "Technology",
    "Business",
    "Design",
    "News",
    "Marketing",
    "Education",
    "Health",
    "Finance",
    "Travel",
    "Food",
    "Events",
    "General",
    "Sports",
    "Culture",
    "Real Estate",
    "Gaming",
    "Non-Profit",
    "Fashion",
    "Science",
  ];

  const [selectedTemplateCategory, setSelectedTemplateCategory] =
    useState("All");

  const filteredTemplates = templates.filter(
    (template) =>
      selectedTemplateCategory === "All" ||
      template.category === selectedTemplateCategory
  );

  const totalSubscribers = newsletters.reduce(
    (sum, newsletter) => sum + newsletter.subscribers,
    0
  );
  const avgOpenRate =
    newsletters.reduce((sum, newsletter) => sum + newsletter.openRate, 0) /
    newsletters.length;
  const avgClickRate =
    newsletters.reduce((sum, newsletter) => sum + newsletter.clickRate, 0) /
    newsletters.length;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to access newsletter management.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
    </div>
  );
};

export default Newsletter;

// src/components/CapabilitiesPage.tsx

import React from "react";
import {
  UserCheck,
  GitBranch,
  Shield,
  Grid,
  Activity,
  Link2,
  Repeat,
  Zap,
  Users,
  Code,
} from "lucide-react";

const features = [
  {
    title: "Segmentation & Personalization",
    description:
      "Dynamic audience segments, tag-based rules, merge tags & liquid templating for fully personalized campaigns.",
    icon: UserCheck,
    color: "from-teal-500 to-teal-300",
  },
  {
    title: "A/B (Split) Testing",
    description:
      "Test subject lines, content variations, send times & auto-select the winner based on your KPIs.",
    icon: GitBranch,
    color: "from-purple-500 to-purple-300",
  },
  {
    title: "Deliverability & Compliance",
    description:
      "Built-in spam score checks, bounce handling, GDPR/CCPA toggles & one-click unsubscribe flows.",
    icon: Shield,
    color: "from-blue-500 to-blue-300",
  },
  {
    title: "Drag-&-Drop Email Builder",
    description:
      "Block-based editor with live and mobile previews, pre-built blocks (hero, columns, CTAs, footers).",
    icon: Grid,
    color: "from-green-500 to-green-300",
  },
  {
    title: "Advanced Analytics",
    description:
      "Heatmaps of clicks, cohort analysis, ROI tracking via UTM parameters, and exportable reports.",
    icon: Activity,
    color: "from-orange-500 to-orange-300",
  },
  {
    title: "Integrations & API",
    description:
      "One-click connectors for CRMs & e-commerce, webhooks & REST API for full data sync.",
    icon: Link2,
    color: "from-indigo-500 to-indigo-300",
  },
  {
    title: "Subscriber Lifecycle",
    description:
      "Automated win-back, re-engagement & sunset workflows triggered by subscriber inactivity.",
    icon: Repeat,
    color: "from-pink-500 to-pink-300",
  },
  {
    title: "AI & Accessibility",
    description:
      "AI-driven subject-line suggestions, copy helpers, accessibility contrast checks & alt-text prompts.",
    icon: Zap,
    color: "from-yellow-500 to-yellow-300",
  },
  {
    title: "Team Collaboration",
    description:
      "Roles & permissions, in-app proofing, comments & approval workflows across drafts and templates.",
    icon: Users,
    color: "from-red-500 to-red-300",
  },
  {
    title: "Transactional Emails",
    description:
      "Unified marketing & transactional sending (order confirmations, password resets) with full analytics.",
    icon: Code,
    color: "from-gray-700 to-gray-500",
  },
];

const CapabilitiesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Platform Capabilities</h1>
        <p className="text-gray-600">
          Everything you need to run engaging, compliant, and data-driven email campaigns.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ title, description, icon: Icon, color }) => (
          <div
            key={title}
            className={`border rounded-xl shadow-sm overflow-hidden transform hover:scale-[1.02] transition p-6 bg-gradient-to-br ${color}`}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-white rounded-full inline-flex">
                <Icon className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="text-white/90">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapabilitiesPage;

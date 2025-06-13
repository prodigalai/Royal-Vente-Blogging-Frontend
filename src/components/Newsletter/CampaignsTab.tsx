// src/components/Newsletter/CampaignsTab.tsx
import React, { useState, FormEvent } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";
import { useNewsletter } from "../../contexts/NewsletterContext";
import { Campaign } from "../../types/newsletter";

const CampaignsTab: React.FC = () => {
  const {
    campaigns,
    newsletters,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  } = useNewsletter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNewsletter, setSelectedNewsletter] = useState<"all" | string>(
    "all"
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);

  const [form, setForm] = useState({
    subject: "",
    newsletterId: "",
    scheduledAt: "",
  });

  const resetForm = () =>
    setForm({ subject: "", newsletterId: "", scheduledAt: "" });

  const filtered = campaigns.filter((c) => {
    const matchesSearch = c.subject
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesNews =
      selectedNewsletter === "all" || c.newsletter === selectedNewsletter;
    return matchesSearch && matchesNews;
  });

  const getIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "sent":
        return CheckCircle;
      case "scheduled":
        return Clock;
      case "sending":
        return RefreshCw;
      default:
        return Edit3;
    }
  };
  const getIconColor = (status: Campaign["status"]) =>
    ({
      sent: "text-green-600 dark:text-green-400",
      scheduled: "text-blue-600 dark:text-blue-400",
      sending: "text-yellow-600 dark:text-yellow-400 animate-spin",
      draft: "text-gray-600 dark:text-gray-400",
    }[status]);
  const getBgColor = (status: Campaign["status"]) =>
    ({
      sent: "bg-green-100 dark:bg-green-900",
      scheduled: "bg-blue-100 dark:bg-blue-900",
      sending: "bg-yellow-100 dark:bg-yellow-900",
      draft: "bg-gray-100 dark:bg-gray-700",
    }[status]);

  const openCreate = () => {
    resetForm();
    setShowCreateModal(true);
  };
  const openEdit = (c: Campaign) => {
    setEditingCampaign(c);
    setForm({
      subject: c.subject,
      newsletterId: newsletters.find((n) => n.name === c.newsletter)?.id || "",
      scheduledAt: c.scheduledAt?.toISOString().slice(0, 16) || "",
    });
  };
  const openView = (c: Campaign) => setViewingCampaign(c);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure to delete?")) deleteCampaign(id);
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    createCampaign({
      subject: form.subject,
      newsletter:
        newsletters.find((n) => n.id === form.newsletterId)?.name || "",
      status: "scheduled",
      scheduledAt: new Date(form.scheduledAt),
      recipients:
        newsletters.find((n) => n.id === form.newsletterId)?.subscribers || 0,
      opens: 0,
      clicks: 0,
      template: "",
    });
    setShowCreateModal(false);
    resetForm();
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    updateCampaign(editingCampaign.id, {
      subject: form.subject,
      newsletter:
        newsletters.find((n) => n.id === form.newsletterId)?.name ||
        editingCampaign.newsletter,
      scheduledAt: new Date(form.scheduledAt),
    });
    setEditingCampaign(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={openCreate}
            className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="pl-10 py-2 pr-4 border rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={selectedNewsletter}
            onChange={(e) => setSelectedNewsletter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Newsletters</option>
            {newsletters.map((n) => (
              <option key={n.id} value={n.name}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 text-teal-600" />
            <span className="text-teal-600">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4 text-teal-600" />
            <span className="text-teal-600">Filter</span>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            All Campaigns ({filtered.length})
          </h3>
        </div>
        <div className="divide-y">
          {filtered.map((c) => {
            const Icon = getIcon(c.status);
            return (
              <div
                key={c.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getBgColor(c.status)}`}>
                      <Icon className={`w-5 h-5 ${getIconColor(c.status)}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{c.subject}</h4>
                      <div className="flex space-x-3 text-sm text-gray-500">
                        <span>{c.newsletter}</span>
                        <span className="capitalize">{c.status}</span>
                        {c.scheduledAt && (
                          <span>
                            Scheduled {c.scheduledAt.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openView(c)}
                      className="p-2 hover:text-teal-600 rounded-lg"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => duplicateCampaign(c.id)}
                      className="p-2 hover:text-teal-600 rounded-lg"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => openEdit(c)}
                      className="p-2 hover:text-teal-600 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Campaign</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block mb-1">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Newsletter</label>
                <select
                  value={form.newsletterId}
                  onChange={(e) =>
                    setForm({ ...form, newsletterId: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select...</option>
                  {newsletters.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Schedule</label>
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) =>
                    setForm({ ...form, scheduledAt: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button className="w-full bg-teal-600 text-white py-2 rounded">
                Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Campaign</h3>
              <button onClick={() => setEditingCampaign(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block mb-1">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Newsletter</label>
                <select
                  value={form.newsletterId}
                  onChange={(e) =>
                    setForm({ ...form, newsletterId: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {newsletters.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Schedule</label>
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) =>
                    setForm({ ...form, scheduledAt: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button className="w-full bg-teal-600 text-white py-2 rounded">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Campaign Details</h3>
              <button onClick={() => setViewingCampaign(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p>
              <strong>Subject:</strong> {viewingCampaign.subject}
            </p>
            <p>
              <strong>Newsletter:</strong> {viewingCampaign.newsletter}
            </p>
            {viewingCampaign.scheduledAt && (
              <p>
                <strong>Scheduled:</strong>{" "}
                {viewingCampaign.scheduledAt.toLocaleString()}
              </p>
            )}
            <p>
              <strong>Status:</strong> {viewingCampaign.status}
            </p>
            <p>
              <strong>Recipients:</strong>{" "}
              {viewingCampaign.recipients.toLocaleString()}
            </p>
            <p>
              <strong>Opens:</strong> {viewingCampaign.opens}
            </p>
            <p>
              <strong>Clicks:</strong> {viewingCampaign.clicks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsTab;

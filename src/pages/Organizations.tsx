"use client"

import type React from "react"
import { useState } from "react"
import { Building2, Users, Plus, Crown, UserCheck, X, Send, MoreHorizontal } from "lucide-react"

// Types
interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: "owner" | "admin" | "member"
}

interface Organization {
  id: string
  name: string
  description: string
  role: "owner" | "admin" | "member"
  memberCount: number
  createdAt: string
  avatar?: string
  teamMembers: TeamMember[]
}

interface Invitation {
  id: string
  email: string
  organizationId: string
  status: "pending" | "accepted" | "declined"
  sentAt: string
  role: "admin" | "member"
}

const Organizations: React.FC = () => {
  const [organizations] = useState<Organization[]>([
    {
      id: "1",
      name: "Tech Innovators",
      description: "Building the future of technology",
      role: "owner",
      memberCount: 12,
      createdAt: "2024-01-15",
      teamMembers: [
        {
          id: "1",
          name: "John Doe",
          email: "john@techinnovators.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "owner",
        },
        {
          id: "2",
          name: "Sarah Wilson",
          email: "sarah@techinnovators.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike@techinnovators.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        {
          id: "4",
          name: "Emily Davis",
          email: "emily@techinnovators.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        {
          id: "5",
          name: "Alex Chen",
          email: "alex@techinnovators.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
      ],
    },
    {
      id: "2",
      name: "Design Studio",
      description: "Creative design solutions",
      role: "admin",
      memberCount: 8,
      createdAt: "2024-02-20",
      teamMembers: [
        {
          id: "6",
          name: "Lisa Park",
          email: "lisa@designstudio.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "owner",
        },
        {
          id: "7",
          name: "David Kim",
          email: "david@designstudio.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        {
          id: "8",
          name: "Anna Rodriguez",
          email: "anna@designstudio.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        {
          id: "9",
          name: "Tom Brown",
          email: "tom@designstudio.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
      ],
    },
    {
      id: "3",
      name: "Marketing Hub",
      description: "Digital marketing excellence",
      role: "member",
      memberCount: 15,
      createdAt: "2024-03-10",
      teamMembers: [
        {
          id: "10",
          name: "Rachel Green",
          email: "rachel@marketinghub.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "owner",
        },
        {
          id: "11",
          name: "James Wilson",
          email: "james@marketinghub.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        {
          id: "12",
          name: "Sophie Turner",
          email: "sophie@marketinghub.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
      ],
    },
  ])

  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedOrgId, setSelectedOrgId] = useState<string>("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member")
  const [searchTerm, setSearchTerm] = useState("")

  const handleInvite = () => {
    if (!inviteEmail || !selectedOrgId) return

    const newInvitation: Invitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      organizationId: selectedOrgId,
      status: "pending",
      sentAt: new Date().toISOString().split("T")[0],
      role: inviteRole,
    }

    setInvitations([...invitations, newInvitation])
    setInviteEmail("")
    setInviteRole("member")
    setShowInviteModal(false)

    // Show success message (you can implement toast notification here)
    alert(`Invitation sent to ${inviteEmail}`)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "admin":
        return <UserCheck className="w-4 h-4 text-blue-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderTeamAvatars = (teamMembers: TeamMember[]) => {
    const displayMembers = teamMembers.slice(0, 4)
    const remainingCount = Math.max(0, teamMembers.length - 4)

    return (
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {displayMembers.map((member, index) => (
            <div key={member.id} className="relative group" style={{ zIndex: displayMembers.length - index }}>
              <img
                src={member.avatar }
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 hover:scale-110 transition-transform cursor-pointer"
                title={`${member.name} (${member.role})`}
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">+{remainingCount}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organizations</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your organizations and team members</p>
          </div>
          <button
            onClick={() => {
              setSelectedOrgId("")
              setShowInviteModal(true)
            }}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>

       
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrganizations.map((org) => (
          <div
            key={org.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            {/* Organization Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{org.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {getRoleIcon(org.role)}
                <span className="text-gray-600 dark:text-gray-400 capitalize">{org.role}</span>
              </div>
            </div>

            {/* Organization Stats */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{org.memberCount} members</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Created {new Date(org.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Team Members Section */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </h4>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                {renderTeamAvatars(org.teamMembers)}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {org.teamMembers.length} of {org.memberCount}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {org.role !== "member" && (
             <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSelectedOrgId(org.id)
                  setShowInviteModal(true)
                }}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Invite</span>
              </button>
            </div>
            )}

           
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Organization Selection - Only shown if not pre-selected */}
              {!selectedOrgId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization
                  </label>
                  <select
                    value={selectedOrgId}
                    onChange={(e) => setSelectedOrgId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select organization</option>
                    {organizations
                      .filter((org) => org.role === "owner" || org.role === "admin")
                      .map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Selected Organization Display - Only shown if pre-selected */}
              {selectedOrgId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization
                  </label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {organizations.find((org) => org.id === selectedOrgId)?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrgId("")}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as "admin" | "member")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail || !selectedOrgId}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Organizations

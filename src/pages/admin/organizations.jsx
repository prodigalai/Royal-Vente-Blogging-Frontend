import React, { useState } from 'react';

const Organizations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [invitations, setInvitations] = useState([
    { id: 1, organization: 'Org 4', role: 'Member' },
    { id: 2, organization: 'Org 5', role: 'Viewer' },
  ]);

  const handleCreateOrg = () => {
    // In a real app, you would call an API here
    console.log('Creating organization:', newOrgName);
    setIsModalOpen(false);
    setNewOrgName('');
  };

  const handleAcceptInvitation = (invitationId) => {
    // In a real app, you would call an API here
    console.log('Accepting invitation:', invitationId);
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
  };

  // Mock data for organizations
  const organizations = [
    { id: 1, name: 'Org 1', role: 'Admin' },
    { id: 2, name: 'Org 2', role: 'Member' },
    { id: 3, name: 'Org 3', role: 'Viewer' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Organization
      </button>

      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id}>
              <td className="border p-2">{org.id}</td>
              <td className="border p-2">{org.name}</td>
              <td className="border p-2">{org.role}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4">Pending Invitations</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Organization</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation) => (
            <tr key={invitation.id}>
              <td className="border p-2">{invitation.organization}</td>
              <td className="border p-2">{invitation.role}</td>
              <td className="border p-2">
                <button
                  className="text-green-500"
                  onClick={() => handleAcceptInvitation(invitation.id)}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Organization Name"
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreateOrg}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations; 
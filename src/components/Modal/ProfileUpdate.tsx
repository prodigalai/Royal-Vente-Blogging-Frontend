import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          &times;
        </button>

        <h2 className="text-xl font-semibold text-primary-800 mb-6">Profile information</h2>

        {/* Photo Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex gap-4 text-sm">
            <button className="text-green-600 hover:underline">Update</button>
            <button className="text-red-600 hover:underline">Remove</button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
        </p>

        {/* Input Fields */}
        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-700 mb-1">Name*</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Ahelinandy"
            defaultValue="Ahelinandy"
          />
          <div className="text-xs text-right text-gray-400">10/50</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-700 mb-1">Pronouns</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Add..."
          />
          <div className="text-xs text-right text-gray-400">0/4</div>
        </div>

        <div className="mb-6">
          <label className="block font-medium text-sm text-gray-700 mb-1">Short bio</label>
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm"
            rows={3}
            placeholder="Write a short bio..."
          ></textarea>
          <div className="text-xs text-right text-gray-400">0/160</div>
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="text-sm text-gray-700 font-medium">About Page</div>
          <p className="text-sm text-gray-500">
            Personalize with images and more to paint more of a vivid portrait of yourself than your ‘Short bio.’
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-green-600 text-green-700 rounded-full text-sm hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary-800 text-white rounded-full text-sm hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

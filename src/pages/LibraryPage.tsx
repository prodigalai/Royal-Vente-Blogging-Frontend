import { Plus, Bookmark, X } from 'lucide-react';
import { useState } from 'react';

export function LibraryPage() {
  
const [activeTab, setActiveTab] = useState("lists");
  const tabs = [
    { id: "lists", label: "Your lists" },
    { id: "saved", label: "Saved lists" },
    { id: "highlights", label: "Highlights" },
    { id: "history", label: "Reading history" },
    
  ];

  return (
    <div className='w-[90%]'>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-700">Your library</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New list</span>
        </button>
      </div>
    <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
      

      {/* Promotional Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 mb-8 text-white relative overflow-hidden">
        <button className="absolute top-4 right-4 text-white hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center justify-between">
          <div className="max-w-sm">
            <h2 className="text-xl font-bold mb-2">
              Create a list to easily organize and share stories
            </h2>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Start a list
            </button>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Reading List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">AB</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reading list</h3>
                <p className="text-sm text-gray-600">Ashwini Balasaheb Nagargojer</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2 flex items-center">
            <span>2 stories</span>
            <span className="mx-2">•</span>
            <span className="text-gray-400">🔒</span>
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Coffee and workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Workspace setup" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
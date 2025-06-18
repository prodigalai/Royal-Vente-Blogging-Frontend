import React from 'react';

export function NotificationsPage() {

    const [activeTab, setActiveTab] = React.useState('All');
  const notifications = [
    {
      id: 1,
      type: 'follow',
      user: {
        name: 'SUNIL BHAVLAL SARSANDE',
        avatar: 'S',
        bgColor: 'bg-purple-500'
      },
      action: 'followed you',
      date: 'Mar 22, 2022'
    },
    {
      id: 2,
      type: 'follow',
      user: {
        name: 'Abu Raghib Umar',
        avatar: 'R',
        bgColor: 'bg-orange-500'
      },
      action: 'followed you',
      date: 'Feb 27, 2022'
    }
  ];

  return (
    <div className='w-[80%]'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-6">Notifications</h1>
        <div className="flex items-center space-x-8 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {[
                { key: "All", label: "All" },
                { key: "Responses", label: "Responses" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === key
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
        
      </div>

      <div className="space-y-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-10 h-10 ${notification.user.bgColor} rounded-full flex items-center justify-center text-white font-medium`}>
              {notification.user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{notification.user.name}</span>
                <span className="text-gray-600">{notification.action}</span>
              </div>
              <p className="text-sm text-gray-500">{notification.date}</p>
            </div>
          </div>
        ))}
        
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-6">
          Older notifications
        </button>
      </div>
    </div>
  );
}
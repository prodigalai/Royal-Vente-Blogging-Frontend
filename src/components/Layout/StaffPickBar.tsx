import { Star, Bookmark } from 'lucide-react';

export function StaffPickBar() {
  const picks = [
    {
      id: 1,
      category: "Age of Awareness",
      author: "Sam Westreich, PhD",
      title: "Why ChatGPT Creates Scientific Citations—That Don't Exist",
      time: "4d ago",
      categoryColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      category: "The DIY Diaries",
      author: "Hilde Festerling",
      title: "How to—Finally—Change Your Name",
      time: "5d ago",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      category: "Just Start Writing",
      author: "Scott Lamb",
      title: "Want to just start writing? Join the \"Write with Medium\" June micro-challenge",
      time: "6d ago",
      categoryColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  const recommendedTopics = [
    'Programming',
    'Self Improvement',
    'Data Science',
    'Writing',
    'Relationships',
    'Technology',
    'Politics'
  ];

  const whoToFollow = [
    {
      id: 1,
      name: 'Nir Zicherman',
      description: 'CEO of Oboe (http://oboe.fyi). Former...',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Just Start Writing',
      description: 'A little experiment: Join us in June for a 4-week...',
      avatar: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isPublication: true
    },
    {
      id: 3,
      name: 'Grant H Brenner MD DFAPA',
      description: 'Psychiatrist, Psychoanalyst,...',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="absolute top-0 right-0  py-8 pl-6 border-l border-gray-200 bg-white overflow-auto dark:bg-gray-900 dark:border-gray-700">
      <div className="space-y-12">
        {/* Staff Picks Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6 dark:text-white">
            Staff Picks
          </h2>
          <div className="space-y-6">
            {picks.map((pick) => (
              <div key={pick.id} className="group cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-gray-100">
                    <span className="text-xs font-medium text-gray-600">
                      {pick.category.split(' ')[0].substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pick.categoryColor}`}>
                        {pick.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">
                      in {pick.category} by {pick.author}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300 line-clamp-2 leading-tight">
                      {pick.title}
                    </h3>
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="mr-3">{pick.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm text-green-600 hover:text-green-700 font-medium">
            See the full list
          </button>
        </div>

        {/* Recommended Topics Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6 dark:text-white">
            Recommended topics
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {recommendedTopics.map((topic, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {topic}
              </button>
            ))}
          </div>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            See more topics
          </button>
        </div>

        {/* Who to Follow Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6 dark:text-white">
            Who to follow
          </h2>
          <div className="space-y-6">
            {whoToFollow.map((person) => (
              <div key={person.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {person.name}
                    </h3>
                    {person.isPublication && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Publication</p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {person.description}
                    </p>
                  </div>
                </div>
                <button className="ml-4 px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm text-green-600 hover:text-green-700 font-medium">
            See more suggestions
          </button>
        </div>

        {/* Reading List Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
            Reading list
          </h2>
          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
            <Bookmark className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">
              Click the <Bookmark className="h-4 w-4 inline mx-1" /> on any story to easily add it to your reading list or a custom list that you can share.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Help</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Status</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Careers</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Press</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Blog</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Rules</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Text to speech</a>
          </div>
        </div>
      </div>
    </div>
  );
}
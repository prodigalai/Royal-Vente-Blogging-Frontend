import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MessageCircle, Heart, MoreHorizontal, Reply, Flag, Bold, Italic, Link as LinkIcon, Send, User } from 'lucide-react';
import { format } from 'date-fns';

interface Response {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isFollowing?: boolean;
  };
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  replies?: Response[];
  isHighlighted?: boolean;
}

interface ResponsesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  totalResponses: number;
}

const ResponsesDrawer: React.FC<ResponsesDrawerProps> = ({
  isOpen,
  onClose,
  articleTitle,
  totalResponses
}) => {
  const [newResponse, setNewResponse] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-relevant'>('most-relevant');

  // Mock responses data
  const [responses, setResponses] = useState<Response[]>([
    {
      id: '1',
      content: 'Which DB are you using? It\'s interesting that the engine couldn\'t optimize for this itself since the same info is known in both queries (modern optimizers detect the identical AVG() and only calculates it once)...\n\nThere is however a potentially...',
      author: {
        id: '1',
        name: 'Lars Nordin',
        username: 'lars_nordin',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        isFollowing: false
      },
      createdAt: new Date('2024-04-28'),
      likes: 12,
      isLiked: false,
      isHighlighted: true,
      replies: [
        {
          id: '1-1',
          content: 'Great point about modern optimizers! I\'m using PostgreSQL 14. You\'re right that it should detect this, but in my case the subquery was more complex...',
          author: {
            id: '2',
            name: 'Analyst Uttam',
            username: 'analyst_uttam',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
          },
          createdAt: new Date('2024-04-28'),
          likes: 5,
          isLiked: true
        }
      ]
    },
    {
      id: '2',
      content: 'This is exactly what I needed! I\'ve been struggling with similar query performance issues. The CTE approach is brilliant. Thank you for sharing this insight.',
      author: {
        id: '3',
        name: 'Sarah Chen',
        username: 'sarah_chen',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        isFollowing: true
      },
      createdAt: new Date('2024-04-27'),
      likes: 8,
      isLiked: false
    },
    {
      id: '3',
      content: 'Have you considered using window functions instead? They might give you even better performance in some cases.',
      author: {
        id: '4',
        name: 'Mike Rodriguez',
        username: 'mike_rodriguez',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      createdAt: new Date('2024-04-26'),
      likes: 3,
      isLiked: false
    }
  ]);

  const handleLikeResponse = (responseId: string, isReply: boolean = false, parentId?: string) => {
    setResponses(prev => prev.map(response => {
      if (isReply && response.id === parentId) {
        return {
          ...response,
          replies: response.replies?.map(reply => 
            reply.id === responseId 
              ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
              : reply
          )
        };
      } else if (response.id === responseId) {
        return {
          ...response,
          isLiked: !response.isLiked,
          likes: response.isLiked ? response.likes - 1 : response.likes + 1
        };
      }
      return response;
    }));
  };

  const handleSubmitResponse = () => {
    if (!newResponse.trim()) return;
    
    const response: Response = {
      id: Date.now().toString(),
      content: newResponse,
      author: {
        id: 'current-user',
        name: 'John Doe',
        username: 'john_doe',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };
    
    setResponses(prev => [response, ...prev]);
    setNewResponse('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return;
    
    const reply: Response = {
      id: `${parentId}-${Date.now()}`,
      content: replyText,
      author: {
        id: 'current-user',
        name: 'John Doe',
        username: 'john_doe',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };
    
    setResponses(prev => prev.map(response => 
      response.id === parentId 
        ? { ...response, replies: [...(response.replies || []), reply] }
        : response
    ));
    
    setReplyText('');
    setReplyingTo(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Responses ({totalResponses})
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                {articleTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="most-relevant">Most relevant</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {/* Write Response */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-start space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleSubmitResponse}
                  disabled={!newResponse.trim()}
                  className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3 h-3" />
                  <span>Respond</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Responses List */}
        <div className="flex-1 overflow-y-auto">
          {responses.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {responses.map((response) => (
                <div key={response.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {/* Main Response */}
                  <div className="flex items-start space-x-3">
                    <Link to={`/profile/${response.author.username}`}>
                      <img
                        src={response.author.avatar}
                        alt={response.author.name}
                        className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link 
                          to={`/profile/${response.author.username}`}
                          className="font-medium text-gray-900 dark:text-white text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {response.author.name}
                        </Link>
                        {response.author.isFollowing && (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400">Following</span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(response.createdAt, 'MMM d')}
                        </span>
                        {response.isHighlighted && (
                          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                            Highlighted
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                        {response.content}
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeResponse(response.id)}
                          className={`flex items-center space-x-1 text-xs transition-colors ${
                            response.isLiked 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${response.isLiked ? 'fill-current' : ''}`} />
                          <span>{response.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setReplyingTo(replyingTo === response.id ? null : response.id)}
                          className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                        
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Reply Form */}
                      {replyingTo === response.id && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          <div className="flex items-start space-x-2">
                            <img
                              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                              alt="Your avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${response.author.name}...`}
                                rows={2}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs resize-none"
                              />
                              <div className="flex items-center justify-end space-x-2 mt-1">
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSubmitReply(response.id)}
                                  disabled={!replyText.trim()}
                                  className="bg-emerald-600 text-white px-2 py-1 rounded text-xs hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies */}
                      {response.replies && response.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                          {response.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-2">
                              <Link to={`/profile/${reply.author.username}`}>
                                <img
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  className="w-6 h-6 rounded-full object-cover hover:opacity-80 transition-opacity"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Link 
                                    to={`/profile/${reply.author.username}`}
                                    className="font-medium text-gray-900 dark:text-white text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                  >
                                    {reply.author.name}
                                  </Link>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {format(reply.createdAt, 'MMM d')}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-2">
                                  {reply.content}
                                </p>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleLikeResponse(reply.id, true, response.id)}
                                    className={`flex items-center space-x-1 text-xs transition-colors ${
                                      reply.isLiked 
                                        ? 'text-red-600 dark:text-red-400' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                                    }`}
                                  >
                                    <Heart className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                    <span>{reply.likes}</span>
                                  </button>
                                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No responses yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                Be the first to share your thoughts on this article.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResponsesDrawer;
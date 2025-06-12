import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  BookmarkPlus,
  Share2,
  X,
  MoreHorizontal,
  Reply,
  Bold,
  Italic,
  Send as SendIcon,
} from "lucide-react";
import { format } from "date-fns";

const dummyArticle = {
  id: "2",
  title:
    "Building a Successful Remote Team: Lessons from 5 Years of Distributed Work",
  subtitle:
    "Practical strategies for managing, motivating, and scaling remote teams",
  author: {
    name: "Alex Thompson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    handle: "alex_startup",
    bio: "Entrepreneur and startup advisor. Sharing insights from building and scaling tech companies.",
    followers: 15600,
    following: 185,
  },
  date: "Jan 12, 2024",
  readTime: "6 min read",
  tags: ["Startup", "Career", "Technology"],
  stats: {
    likes: 189,
    comments: 15,
  },
  coverImage:
    "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=80",
  content: `
    <p>After five years of building and managing remote teams...<p>
    <h2>Communication is Everything</h2>
    <p>Over-communication is better than under-communication...<p>
    <h2>Trust and Autonomy</h2>
    <p>Remote work thrives on trust...<p>
    <h2>Building Connection</h2>
    <p>Regular virtual coffee chats...<p>
    <p>Remote work isn't going away...<p>
  `,
};

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

const ArticlePage: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newResponse, setNewResponse] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "most-relevant">(
    "most-relevant"
  );

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


  const handleLikeResponse = (
    responseId: string,
    isReply = false,
    parentId?: string
  ) => {
    setResponses((prev) =>
      prev.map((r) => {
        if (isReply && r.id === parentId) {
          return {
            ...r,
            replies: r.replies?.map((rep) =>
              rep.id === responseId
                ? {
                    ...rep,
                    isLiked: !rep.isLiked,
                    likes: rep.isLiked ? rep.likes - 1 : rep.likes + 1,
                  }
                : rep
            ),
          };
        } else if (r.id === responseId) {
          return {
            ...r,
            isLiked: !r.isLiked,
            likes: r.isLiked ? r.likes - 1 : r.likes + 1,
          };
        }
        return r;
      })
    );
  };

  const handleSubmitResponse = () => {
    if (!newResponse.trim()) return;
    const resp: Response = {
      id: Date.now().toString(),
      content: newResponse,
      author: {
        id: "me",
        name: "You",
        username: "you",
        avatar: "",
        isFollowing: false,
      },
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
    };
    setResponses([resp, ...responses]);
    setNewResponse("");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return;
    const rep: Response = {
      id: `${parentId}-${Date.now()}`,
      content: replyText,
      author: { id: "me", name: "You", username: "you", avatar: "" },
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
    };
    setResponses(
      responses.map((r) =>
        r.id === parentId ? { ...r, replies: [...(r.replies || []), rep] } : r
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/blogs"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to articles</span>
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{dummyArticle.title}</h1>
        <p className="text-lg mb-4">{dummyArticle.subtitle}</p>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={dummyArticle.author.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              {dummyArticle.author.name}{" "}
              <span className="text-gray-500">
                @{dummyArticle.author.handle}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              {dummyArticle.date} · {dummyArticle.readTime}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {dummyArticle.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-b py-4 mb-8">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100"
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-600"}`}
              fill={liked ? "currentColor" : "none"}
            />
            <span>{dummyArticle.stats.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{dummyArticle.stats.comments}</span>
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100"
          >
            <BookmarkPlus
              className={`w-5 h-5 ${
                bookmarked ? "text-yellow-500" : "text-gray-600"
              }`}
              fill={bookmarked ? "currentColor" : "none"}
            />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </header>

      <div className="mb-8">
        <img
          src={dummyArticle.coverImage}
          alt=""
          className="w-1000 h-200 object-cover rounded-2xl"
        />
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: dummyArticle.content }}
      />

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-4">
          <img
            src={dummyArticle.author.avatar}
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {dummyArticle.author.name}
            </h3>
            <p className="mb-3">{dummyArticle.author.bio}</p>
            <div className="flex gap-4 text-sm text-gray-500 mb-4">
              <span>
                {dummyArticle.author.followers.toLocaleString()} followers
              </span>
              <span>
                {dummyArticle.author.following.toLocaleString()} following
              </span>
            </div>
            <Link
              to={`/profile/${dummyArticle.author.handle}`}
              className="text-emerald-600 hover:underline"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>

      {/* Inline Responses Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5" />
                <div>
                  <h2 className="font-semibold">
                    Responses ({dummyArticle.stats.comments})
                  </h2>
                  <p className="text-sm text-gray-500 truncate max-w-xs">
                    {dummyArticle.title}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-b">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="most-relevant">Most relevant</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-start space-x-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    rows={3}
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                  />
                  <div className="flex items-center justify-end mt-2">
                    <div className="flex space-x-2">
                      <button>
                        <Bold className="w-4 h-4" />
                      </button>
                      <button>
                        <Italic className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleSubmitResponse}
                      disabled={!newResponse.trim()}
                      className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm disabled:opacity-50"
                    >
                      <SendIcon className="w-3 h-3" />
                      <span>Respond</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {responses.length ? (
                responses.map((r) => (
                  <div key={r.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <img
                        src={r.author.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">
                            {r.author.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(r.createdAt, "MMM d")}
                          </span>
                          {r.isHighlighted && (
                            <span className="text-xs bg-yellow-100 px-2 py-1 rounded-full">
                              Highlighted
                            </span>
                          )}
                        </div>
                        <p className="text-sm mb-3 whitespace-pre-wrap">
                          {r.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <button
                            onClick={() => handleLikeResponse(r.id)}
                            className={
                              r.isLiked ? "text-red-600" : "text-gray-500"
                            }
                          >
                            <Heart className="w-4 h-4" />
                            <span>{r.likes}</span>
                          </button>
                          <button
                            onClick={() =>
                              setReplyingTo(replyingTo === r.id ? null : r.id)
                            }
                            className="text-gray-500"
                          >
                            <Reply className="w-4 h-4" />
                            <span>Reply</span>
                          </button>
                          <button className="text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        {replyingTo === r.id && (
                          <div className="mt-3 pl-4 border-l">
                            <div className="flex items-start space-x-2">
                              <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt=""
                                className="w-6 h-6 rounded-full"
                              />
                              <div className="flex-1">
                                <textarea
                                  rows={2}
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder={`Reply to ${r.author.name}...`}
                                  className="w-full px-2 py-1 border rounded text-xs resize-none"
                                />
                                <div className="flex justify-end space-x-2 mt-1">
                                  <button
                                    onClick={() => setReplyingTo(null)}
                                    className="text-xs text-gray-500"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSubmitReply(r.id)}
                                    disabled={!replyText.trim()}
                                    className="bg-emerald-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {r.replies?.length > 0 && (
                          <div className="mt-3 pl-4 border-l space-y-3">
                            {r.replies.map((rep) => (
                              <div
                                key={rep.id}
                                className="flex items-start space-x-2"
                              >
                                {" "}
                                <img
                                  src={rep.author.avatar}
                                  alt=""
                                  className="w-6 h-6 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-xs">
                                      {rep.author.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {format(rep.createdAt, "MMM d")}
                                    </span>
                                  </div>
                                  <p className="text-xs mb-2">{rep.content}</p>
                                  <div className="flex items-center space-x-3 text-xs">
                                    <button
                                      onClick={() =>
                                        handleLikeResponse(rep.id, true, r.id)
                                      }
                                      className={
                                        rep.isLiked
                                          ? "text-red-600"
                                          : "text-gray-500"
                                      }
                                    >
                                      <Heart className="w-3 h-3" />
                                      <span>{rep.likes}</span>
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No responses yet</h3>
                  <p className="text-sm">
                    Be the first to share your thoughts on this article.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticlePage;

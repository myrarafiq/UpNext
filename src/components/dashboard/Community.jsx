import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, MessageSquare, Users, TrendingUp, Plus, Search } from 'lucide-react';

const Community = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock community data
  const discussions = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      title: 'Just completed my first React project! 🎉',
      content: 'After 3 weeks of learning React, I finally built a weather app. The state management was tricky but I got it working! Happy to share tips with anyone struggling.',
      category: 'Success Story',
      likes: 24,
      replies: 12,
      timeAgo: '2 hours ago',
      tags: ['React', 'Frontend', 'Beginner']
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      avatar: 'MR',
      title: 'Need help with async/await in JavaScript',
      content: 'I\'m stuck on understanding how async/await works with API calls. Can someone explain it in simple terms?',
      category: 'Question',
      likes: 8,
      replies: 15,
      timeAgo: '5 hours ago',
      tags: ['JavaScript', 'Async', 'Help Needed']
    },
    {
      id: 3,
      author: 'Emily Watson',
      avatar: 'EW',
      title: 'Looking for study buddy for Machine Learning',
      content: 'Starting Andrew Ng\'s ML course next week. Anyone want to team up and learn together? Would be great to have someone to discuss concepts with.',
      category: 'Study Group',
      likes: 18,
      replies: 7,
      timeAgo: '1 day ago',
      tags: ['Machine Learning', 'Study Group']
    },
    {
      id: 4,
      author: 'David Kim',
      avatar: 'DK',
      title: 'My journey from tutorial hell to first job offer',
      content: 'Six months ago I was stuck in tutorial hell. Today I got my first job offer as a junior developer! Here\'s what worked for me...',
      category: 'Inspiration',
      likes: 156,
      replies: 42,
      timeAgo: '2 days ago',
      tags: ['Career', 'Inspiration', 'Job Search']
    },
    {
      id: 5,
      author: 'Lisa Park',
      avatar: 'LP',
      title: 'Best resources for learning Python data structures?',
      content: 'I\'ve been learning Python but data structures are confusing. What resources helped you understand them better?',
      category: 'Question',
      likes: 12,
      replies: 20,
      timeAgo: '3 days ago',
      tags: ['Python', 'Data Structures', 'Resources']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: MessageCircle },
    { id: 'questions', name: 'Questions', icon: MessageSquare },
    { id: 'success', name: 'Success Stories', icon: TrendingUp },
    { id: 'study', name: 'Study Groups', icon: Users }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Question': 'bg-blue-100 text-blue-700',
      'Success Story': 'bg-green-100 text-green-700',
      'Study Group': 'bg-purple-100 text-purple-700',
      'Inspiration': 'bg-yellow-100 text-yellow-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community</h2>
            <p className="text-gray-600">
              Connect with fellow learners, share progress, and get help when you need it.
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2,547</div>
              <div className="text-xs text-gray-600">Active Members</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-xs text-gray-600">Discussions</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">8,956</div>
              <div className="text-xs text-gray-600">Helpful Replies</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">342</div>
              <div className="text-xs text-gray-600">Active Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      selectedFilter === category.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h4 className="font-bold text-gray-900 mb-2">🎯 Community Guidelines</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Be respectful and supportive</li>
              <li>• Share knowledge freely</li>
              <li>• No spam or self-promotion</li>
              <li>• Help others grow</li>
            </ul>
          </div>
        </div>

        {/* Discussion Feed */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="card">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Discussions */}
          {discussions.map((discussion) => (
            <div key={discussion.id} className="card hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {discussion.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{discussion.author}</span>
                        <span className="text-sm text-gray-500">• {discussion.timeAgo}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                          {discussion.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{discussion.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{discussion.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      {discussion.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      {discussion.replies} replies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Placeholder for more */}
          <div className="card text-center py-8 bg-gray-50">
            <p className="text-gray-600">More discussions coming soon!</p>
            <p className="text-sm text-gray-500 mt-2">This is a prototype feature for the hackathon demo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;


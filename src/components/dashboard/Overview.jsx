import React from 'react';
import { TrendingUp, Target, BookOpen, Zap, CheckCircle2, Clock, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Overview = () => {
  const { userData, roadmap, completedTasks, projects, jobReadinessScore } = useApp();

  const inProgressTasks = roadmap.filter(t => t.status === 'in-progress');
  const pendingTasks = roadmap.filter(t => t.status === 'pending');
  const recentCompletions = completedTasks.slice(-3);

  const stats = [
    {
      label: 'Job Readiness',
      value: `${jobReadinessScore}%`,
      icon: Target,
      color: 'bg-green-500',
      change: '+12% this week'
    },
    {
      label: 'Skills Completed',
      value: completedTasks.length,
      icon: CheckCircle2,
      color: 'bg-blue-500',
      change: `${roadmap.length - completedTasks.length} remaining`
    },
    {
      label: 'Active Projects',
      value: projects.filter(p => p.status !== 'completed').length,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: `${projects.filter(p => p.status === 'completed').length} completed`
    },
    {
      label: 'Current Streak',
      value: '7 days',
      icon: Zap,
      color: 'bg-orange-500',
      change: 'Keep it up!'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {userData.name || 'there'}! 👋</h2>
            <p className="text-primary-100 text-lg">
              You're on track to become a {userData.targetJob || 'professional developer'}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Award className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Current Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* In Progress */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Currently Working On</h3>
          </div>
          
          <div className="space-y-3">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <div key={task.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">{task.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                  <div className="flex items-center gap-2 text-xs text-blue-600">
                    <Clock className="w-4 h-4" />
                    {task.duration}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No active tasks. Start a new one from your roadmap!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Completions */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent Completions</h3>
          </div>
          
          <div className="space-y-3">
            {recentCompletions.length > 0 ? (
              recentCompletions.map((task) => (
                <div key={task.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{task.title}</div>
                      <div className="text-xs text-gray-500">
                        Completed {new Date(task.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < task.understanding ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Complete your first task to see it here!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all text-left">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <div className="font-semibold text-gray-900">Continue Learning</div>
            <div className="text-sm text-gray-600">Jump to next task</div>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all text-left">
            <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
            <div className="font-semibold text-gray-900">Start New Project</div>
            <div className="text-sm text-gray-600">Build something real</div>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all text-left">
            <Award className="w-8 h-8 text-green-600 mb-2" />
            <div className="font-semibold text-gray-900">View Portfolio</div>
            <div className="text-sm text-gray-600">See your progress</div>
          </button>
        </div>
      </div>

      {/* Progress Message */}
      {jobReadinessScore > 0 && (
        <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">You're making great progress!</h4>
              <p className="text-gray-700">
                {jobReadinessScore < 30 && "Keep going! Every task brings you closer to your goal."}
                {jobReadinessScore >= 30 && jobReadinessScore < 60 && "You're building momentum! Your skills are developing nicely."}
                {jobReadinessScore >= 60 && jobReadinessScore < 90 && "Excellent work! You're well on your way to job-readiness."}
                {jobReadinessScore >= 90 && "Amazing! You're nearly job-ready. Time to polish that portfolio!"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;


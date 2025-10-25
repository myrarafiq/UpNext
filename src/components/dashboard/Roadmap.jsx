import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink, Star, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ReflectionModal from './ReflectionModal';

const Roadmap = () => {
  const { roadmap, updateTaskStatus, userData } = useApp();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showReflection, setShowReflection] = useState(false);

  const handleTaskClick = (task) => {
    if (task.status === 'completed') return;
    setSelectedTask(task);
  };

  const handleStartTask = (task) => {
    updateTaskStatus(task.id, 'in-progress');
    setSelectedTask({ ...task, status: 'in-progress' });
  };

  const handleCompleteTask = () => {
    setShowReflection(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming': 'bg-blue-100 text-blue-700 border-blue-200',
      'Frontend': 'bg-purple-100 text-purple-700 border-purple-200',
      'Backend': 'bg-green-100 text-green-700 border-green-200',
      'AI/ML': 'bg-pink-100 text-pink-700 border-pink-200',
      'Data Science': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Tools': 'bg-gray-100 text-gray-700 border-gray-200',
      'DevOps': 'bg-orange-100 text-orange-700 border-orange-200',
      'Quality': 'bg-teal-100 text-teal-700 border-teal-200',
      'Architecture': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'General': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || colors['General'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Learning Roadmap to {userData.targetJob}
            </h2>
            <p className="text-gray-600">
              Complete each milestone to unlock the next. The AI adapts based on your progress.
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary-600">
              {roadmap.filter(t => t.status === 'completed').length}/{roadmap.length}
            </div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roadmap List */}
        <div className="lg:col-span-2 space-y-4">
          {roadmap.map((task, index) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in-progress';
            const isPending = task.status === 'pending';
            const isOptional = task.status === 'optional';

            return (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className={`card cursor-pointer transition-all hover:shadow-lg ${
                  isCompleted ? 'bg-green-50 border-green-200' : ''
                } ${isInProgress ? 'border-2 border-primary-600' : ''} ${
                  task.isAdded ? 'border-l-4 border-l-yellow-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : isInProgress ? (
                      <Clock className="w-8 h-8 text-primary-600 animate-pulse" />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {task.title}
                          {isOptional && (
                            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                              Optional
                            </span>
                          )}
                          {task.isAdded && (
                            <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                              AI Added
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {task.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs bg-white border border-gray-300 px-3 py-1 rounded-full hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          {resource}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Duration: {task.duration}
                      </div>
                      {isInProgress && !isCompleted && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteTask();
                          }}
                          className="text-sm btn-primary py-1 px-4"
                        >
                          Mark Complete
                        </button>
                      )}
                      {isPending && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartTask(task);
                          }}
                          className="text-sm btn-secondary py-1 px-4"
                        >
                          Start Learning
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="card bg-gradient-to-br from-primary-600 to-purple-600 text-white">
            <h3 className="text-lg font-bold mb-4">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completed</span>
                  <span>{roadmap.filter(t => t.status === 'completed').length} tasks</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{
                      width: `${(roadmap.filter(t => t.status === 'completed').length / roadmap.length) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>In Progress</span>
                  <span>{roadmap.filter(t => t.status === 'in-progress').length} tasks</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Remaining</span>
                  <span>{roadmap.filter(t => t.status === 'pending' || t.status === 'optional').length} tasks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Learning Tips</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Take notes as you learn</li>
                  <li>• Build mini-projects for each skill</li>
                  <li>• Ask for help when stuck</li>
                  <li>• Review completed topics regularly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Adaptation Info */}
          <div className="card bg-purple-50 border-purple-200">
            <div className="flex items-start gap-3">
              <Plus className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">AI Adaptation</h4>
                <p className="text-sm text-gray-700">
                  Your roadmap adapts based on your feedback. If you struggle, we add reinforcement. 
                  If you excel, we add advanced challenges!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection Modal */}
      {showReflection && selectedTask && (
        <ReflectionModal
          task={selectedTask}
          onClose={() => {
            setShowReflection(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Roadmap;


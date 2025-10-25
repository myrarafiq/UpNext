import React, { useState } from 'react';
import { FolderGit2, Github, ExternalLink, Play, CheckCircle2, Clock, Plus, Code } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateProjectIdeas } from '../../utils/aiEngine';

const Projects = () => {
  const { projects, completedTasks, generateProject } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');

  const getStatusColor = (status) => {
    const colors = {
      'not-started': 'bg-gray-100 text-gray-700 border-gray-300',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
      'completed': 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[status] || colors['not-started'];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'in-progress':
        return <Clock className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  const handleCreateProject = () => {
    if (selectedSkill) {
      generateProject(selectedSkill);
      setShowCreateModal(false);
      setSelectedSkill('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
            <p className="text-gray-600">
              Build real-world projects to showcase your skills and build your portfolio.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <Code className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)} flex items-center gap-1`}>
                  {getStatusIcon(project.status)}
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Github className="w-4 h-4" />
                  <span className="font-medium">GitHub Repository</span>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  {project.githubUrl}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Project Milestones</div>
                  <div className="space-y-2">
                    {['Setup & Planning', 'Core Features', 'Testing & Polish', 'Deployment'].map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          project.status === 'completed' || (project.status === 'in-progress' && idx === 0)
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {(project.status === 'completed' || (project.status === 'in-progress' && idx === 0)) && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-gray-700">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.status === 'not-started' && (
                    <button className="btn-primary flex-1 text-sm py-2">
                      Start Project
                    </button>
                  )}
                  {project.status === 'in-progress' && (
                    <>
                      <button className="btn-primary flex-1 text-sm py-2">
                        Continue Working
                      </button>
                      <button className="btn-secondary flex-1 text-sm py-2">
                        Mark Complete
                      </button>
                    </>
                  )}
                  {project.status === 'completed' && (
                    <button className="btn-secondary w-full text-sm py-2 flex items-center justify-center gap-2">
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderGit2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
          <p className="text-gray-600 mb-6">
            Start building real-world projects to showcase your skills and grow your portfolio.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Your First Project
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Project</h2>
            <p className="text-gray-600 mb-6">
              Select a skill you've learned to create a project around it.
            </p>

            <div className="space-y-3 mb-6">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedSkill(task.title)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedSkill === task.title
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{task.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                    {selectedSkill === task.title && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-700 mb-2">Suggested Projects:</div>
                        <div className="space-y-1">
                          {generateProjectIdeas(task.title).map((idea, idx) => (
                            <div key={idx} className="text-sm text-primary-600">• {idea}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Complete some tasks in your roadmap first!</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedSkill('');
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!selectedSkill}
                className={`btn-primary flex-1 ${!selectedSkill ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;


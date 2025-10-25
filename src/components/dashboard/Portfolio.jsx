import React from 'react';
import { Award, Trophy, Star, TrendingUp, CheckCircle2, Code, BookOpen, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Portfolio = () => {
  const { userData, completedTasks, projects, jobReadinessScore } = useApp();

  const skills = completedTasks.map(task => ({
    name: task.title,
    category: task.category,
    understanding: task.understanding,
    completedAt: task.completedAt
  }));

  const getCategorySkills = (category) => {
    return skills.filter(s => s.category === category);
  };

  const categories = [...new Set(skills.map(s => s.category))];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Completed your first learning task',
      earned: completedTasks.length >= 1,
      icon: Star
    },
    {
      title: 'Quick Learner',
      description: 'Completed 5 tasks',
      earned: completedTasks.length >= 5,
      icon: TrendingUp
    },
    {
      title: 'Project Builder',
      description: 'Created your first project',
      earned: projects.length >= 1,
      icon: Code
    },
    {
      title: 'Dedicated',
      description: 'Maintained a 7-day streak',
      earned: true,
      icon: Trophy
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{userData.name}'s Portfolio</h2>
            <p className="text-primary-100 text-lg">
              Aspiring {userData.targetJob} • {userData.currentLevel} Level
            </p>
          </div>
          <div className="text-center bg-white bg-opacity-20 rounded-2xl p-6">
            <div className="text-5xl font-bold mb-2">{jobReadinessScore}%</div>
            <div className="text-sm font-medium">Job Ready</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedTasks.length}</div>
              <div className="text-xs text-gray-600">Skills Mastered</div>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
              <div className="text-xs text-gray-600">Projects Built</div>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {achievements.filter(a => a.earned).length}
              </div>
              <div className="text-xs text-gray-600">Achievements</div>
            </div>
          </div>
        </div>

        <div className="card bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-xs text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Skills Breakdown</h3>
        
        {categories.length > 0 ? (
          <div className="space-y-6">
            {categories.map((category) => {
              const categorySkills = getCategorySkills(category);
              const avgUnderstanding = categorySkills.reduce((acc, s) => acc + s.understanding, 0) / categorySkills.length;
              
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{category}</h4>
                    <span className="text-sm text-gray-600">{categorySkills.length} skills</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Proficiency</span>
                      <span className="font-medium text-gray-900">{Math.round(avgUnderstanding * 20)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${avgUnderstanding * 20}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700 flex items-center gap-2"
                      >
                        {skill.name}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < skill.understanding ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>Complete tasks to build your skill portfolio!</p>
          </div>
        )}
      </div>

      {/* Projects Showcase */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Project Showcase</h3>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <Code className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.skill}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  {project.status.replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>No projects yet. Start building to grow your portfolio!</p>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 mb-1">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                    {achievement.earned && (
                      <div className="mt-2 text-xs text-green-600 font-medium">✓ Unlocked</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Job Readiness Analysis */}
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Job Readiness Analysis</h3>
            {jobReadinessScore < 30 && (
              <p className="text-gray-700">
                You're just getting started! Keep completing tasks and building projects to increase your job readiness. 
                Focus on building a strong foundation in the fundamentals.
              </p>
            )}
            {jobReadinessScore >= 30 && jobReadinessScore < 60 && (
              <p className="text-gray-700">
                Great progress! You're building a solid skill set. Continue working on projects and 
                consider contributing to open source to gain real-world experience.
              </p>
            )}
            {jobReadinessScore >= 60 && jobReadinessScore < 90 && (
              <p className="text-gray-700">
                Excellent work! You're well-prepared for entry-level positions. Start applying to jobs, 
                polish your portfolio, and practice technical interviews.
              </p>
            )}
            {jobReadinessScore >= 90 && (
              <p className="text-gray-700">
                Outstanding! You're job-ready. Your portfolio demonstrates strong skills across multiple areas. 
                Start applying confidently and consider mentoring others!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;


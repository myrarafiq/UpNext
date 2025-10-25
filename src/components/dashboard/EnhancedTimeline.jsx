import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, BookOpen, GitBranch, Award, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { weeklyProgress } from '../../data/aishaJourney';

const EnhancedTimeline = () => {
  const [expandedWeek, setExpandedWeek] = useState(6);

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">Learning Timeline</h1>
        <p className="text-gray-600">Your 6-week journey to becoming a Data Analyst</p>
      </div>

      {/* Progress Overview */}
      <div className="card-gradient mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Overall Progress</h2>
          <span className="text-3xl font-bold text-gradient">92%</span>
        </div>
        <div className="progress-bar h-4">
          <div className="progress-fill" style={{ width: '92%' }}></div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>Week 1</span>
          <span className="font-semibold text-indigo-600">Week 6 - Job Ready! 🎯</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {weeklyProgress.map((week) => {
          const isExpanded = expandedWeek === week.week;
          const isCompleted = week.week < 6 || week.milestone;
          
          return (
            <div
              key={week.week}
              className={`card hover:shadow-2xl transition-all duration-300 ${
                isExpanded ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {/* Week Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleWeek(week.week)}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Week Number Badge */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shadow-md ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : week.week}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">Week {week.week}</h3>
                      {week.milestone && (
                        <span className="badge badge-success animate-pulse-glow">
                          🎉 {week.milestone}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{week.date}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mr-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{week.jobReadiness}%</div>
                    <div className="text-xs text-gray-500">Job Ready</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{week.coursesCompleted.length}</div>
                    <div className="text-xs text-gray-500">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{week.projectsCreated.length}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                </div>

                {/* Expand Icon */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
                </button>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 animate-slide-in">
                  {/* AI Nudge */}
                  {week.aiNudge && (
                    <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-xl p-4 border border-indigo-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">AI Insight</h4>
                          <p className="text-sm text-gray-700">{week.aiNudge}</p>
                          {week.aiAdjustment && (
                            <p className="text-xs text-indigo-600 mt-2 italic">→ {week.aiAdjustment}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Courses */}
                  {week.coursesCompleted.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        Courses Completed
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {week.coursesCompleted.map((course) => (
                          <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-800 mb-1">{course.title}</h5>
                                <p className="text-sm text-gray-600">{course.platform} • {course.instructor}</p>
                              </div>
                              <span className="text-2xl">{course.logo}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-xs">
                              <span className="badge badge-primary">{course.duration}</span>
                              <span className="badge badge-success">Score: {course.performance}%</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {course.skillsGained.map((skill, idx) => (
                                <span key={idx} className="badge badge-cyan">{skill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {week.projectsCreated.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-green-600" />
                        Projects Created
                      </h4>
                      <div className="space-y-4">
                        {week.projectsCreated.map((project) => (
                          <div key={project.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className="font-bold text-gray-800">{project.title}</h5>
                                  {project.aiScaffolded && (
                                    <span className="badge bg-purple-100 text-purple-700">🤖 AI Scaffolded</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                              </div>
                            </div>
                            
                            {/* Progress */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-bold text-green-600">{project.progress}%</span>
                              </div>
                              <div className="progress-bar">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="badge bg-gray-100 text-gray-700">{tech}</span>
                              ))}
                            </div>

                            {/* Highlights */}
                            {project.highlights && (
                              <div className="space-y-1">
                                {project.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mentor Sessions */}
                  {week.mentorSessions && week.mentorSessions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        Mentor Sessions
                      </h4>
                      {week.mentorSessions.map((session) => (
                        <div key={session.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-xl font-bold">
                              {session.mentorName[0]}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-800">{session.mentorName}</h5>
                              <p className="text-sm text-gray-600 mb-2">{session.mentorTitle}</p>
                              <p className="text-sm text-gray-700 italic">"{session.feedback}"</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {session.nextSteps.map((step, idx) => (
                                  <span key={idx} className="badge badge-warning">{step}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Week Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{week.studyHours}</div>
                      <div className="text-xs text-gray-600">Study Hours</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{week.tasksCompleted}</div>
                      <div className="text-xs text-gray-600">Tasks Done</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{week.streak}</div>
                      <div className="text-xs text-gray-600">Day Streak 🔥</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedTimeline;


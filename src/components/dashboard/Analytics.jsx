import React, { useState } from 'react';
import { TrendingUp, Award, BookOpen, GitBranch, Target, Calendar, Zap, Star } from 'lucide-react';
import { 
  aishaProfile, 
  weeklyProgress, 
  skillProgressionOverTime,
  jobReadinessOverTime 
} from '../../data/aishaJourney';

const Analytics = () => {
  const [selectedWeek, setSelectedWeek] = useState(6); // Show week 6 by default
  const currentWeek = weeklyProgress[selectedWeek - 1];
  const latestSkills = skillProgressionOverTime[selectedWeek];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your progress and skill development over time</p>
        </div>
        
        {/* Week Selector */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-md">
          <span className="text-sm font-medium text-gray-600 px-2">Week:</span>
          {[1, 2, 3, 4, 5, 6].map(week => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedWeek === week
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {week}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card stat-card-cyan animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-cyan-100 rounded-xl">
              <Target className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-3xl font-bold text-cyan-600">
              {currentWeek.jobReadiness}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Job Readiness</h3>
          <p className="text-xs text-green-600 mt-1">
            +{currentWeek.jobReadiness - (weeklyProgress[selectedWeek - 2]?.jobReadiness || 30)}% from last week
          </p>
        </div>

        <div className="stat-card stat-card-indigo animate-slide-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-3xl font-bold text-indigo-600">
              {currentWeek.coursesCompleted.length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Courses This Week</h3>
          <p className="text-xs text-gray-500 mt-1">
            {weeklyProgress.slice(0, selectedWeek).reduce((acc, w) => acc + w.coursesCompleted.length, 0)} total
          </p>
        </div>

        <div className="stat-card stat-card-green animate-slide-in" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <GitBranch className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-green-600">
              {currentWeek.projectsCreated.length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Projects This Week</h3>
          <p className="text-xs text-gray-500 mt-1">
            {weeklyProgress.slice(0, selectedWeek).reduce((acc, w) => acc + w.projectsCreated.length, 0)} total
          </p>
        </div>

        <div className="stat-card border-l-4 border-yellow-500 animate-slide-in" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-yellow-600">
              {currentWeek.streak}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Day Streak</h3>
          <p className="text-xs text-gray-500 mt-1">
            {currentWeek.studyHours}hrs study time
          </p>
        </div>
      </div>

      {/* Job Readiness Over Time */}
      <div className="card-elevated animate-slide-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Job Readiness Progress</h2>
            <p className="text-sm text-gray-600">Your journey to becoming job-ready</p>
          </div>
        </div>
        
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 800 250" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val) => (
              <g key={val}>
                <line
                  x1="60"
                  y1={220 - (val * 2)}
                  x2="780"
                  y2={220 - (val * 2)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <text
                  x="30"
                  y={225 - (val * 2)}
                  fontSize="12"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {val}%
                </text>
              </g>
            ))}
            
            {/* Area under the curve */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <path
              d={`M 60 220 ${jobReadinessOverTime.slice(0, selectedWeek + 1).map((point, i) => {
                const x = 60 + (i * (720 / selectedWeek));
                const y = 220 - (point.score * 2);
                return `L ${x} ${y}`;
              }).join(' ')} L ${60 + (selectedWeek * (720 / 6))} 220 Z`}
              fill="url(#areaGradient)"
            />
            
            {/* Line */}
            <path
              d={`M ${jobReadinessOverTime.slice(0, selectedWeek + 1).map((point, i) => {
                const x = 60 + (i * (720 / selectedWeek));
                const y = 220 - (point.score * 2);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            
            {/* Points */}
            {jobReadinessOverTime.slice(0, selectedWeek + 1).map((point, i) => {
              const x = 60 + (i * (720 / selectedWeek));
              const y = 220 - (point.score * 2);
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="white"
                    stroke={i === selectedWeek ? "#6366f1" : "#06b6d4"}
                    strokeWidth="3"
                  />
                  {i === selectedWeek && (
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="10"
                        to="15"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <text
                    x={x}
                    y="245"
                    fontSize="11"
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    W{point.week}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded"></div>
            <span className="text-gray-600">Progress Trend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>
            <span className="text-gray-600">Current Week</span>
          </div>
        </div>
      </div>

      {/* Skills Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Star className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Skill Proficiency</h2>
              <p className="text-sm text-gray-600">Current skill levels</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.entries(latestSkills).filter(([key]) => key !== 'week').map(([skill, value]) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill}</span>
                  <span className="text-sm font-bold text-indigo-600">{value}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Week Summary */}
        <div className="card-gradient animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white rounded-xl shadow-md">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Week {selectedWeek} Summary</h2>
              <p className="text-sm text-gray-600">{currentWeek.date}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* AI Nudge */}
            {currentWeek.aiNudge && (
              <div className="bg-white rounded-xl p-4 border-l-4 border-cyan-500 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">AI Insight</h3>
                    <p className="text-sm text-gray-700">{currentWeek.aiNudge}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Achievements */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Week Achievements
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-bold text-green-600">{currentWeek.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Study Hours</span>
                  <span className="font-bold text-indigo-600">{currentWeek.studyHours}hrs</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-yellow-600">{currentWeek.streak} days 🔥</span>
                </div>
              </div>
            </div>
            
            {/* AI Recommendations */}
            {currentWeek.aiRecommendations && currentWeek.aiRecommendations.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">AI Recommendations</h3>
                <div className="space-y-2">
                  {currentWeek.aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-indigo-500 mt-1">→</span>
                      <div>
                        <p className="font-medium text-gray-800">{rec.title}</p>
                        <p className="text-xs text-gray-600">{rec.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Milestone Badge */}
      {currentWeek.milestone && (
        <div className="card-navy text-center py-8 animate-pulse-glow">
          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">🎉 Milestone Achieved!</h2>
          <p className="text-xl text-cyan-300">{currentWeek.milestone}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;


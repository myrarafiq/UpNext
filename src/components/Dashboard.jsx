import React, { useState } from 'react';
import { LayoutDashboard, Map, FolderGit2, Trophy, Users, Bell, LogOut, Menu, X } from 'lucide-react';
import Overview from './dashboard/Overview';
import Roadmap from './dashboard/Roadmap';
import Projects from './dashboard/Projects';
import Portfolio from './dashboard/Portfolio';
import Community from './dashboard/Community';
import Reminders from './dashboard/Reminders';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userData, reminders } = useApp();

  const navigation = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'roadmap', name: 'My Roadmap', icon: Map },
    { id: 'projects', name: 'Projects', icon: FolderGit2 },
    { id: 'portfolio', name: 'Portfolio', icon: Trophy },
    { id: 'community', name: 'Community', icon: Users },
  ];

  const handleReset = () => {
    if (confirm('Are you sure you want to reset and start over? This will clear all your progress.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'roadmap':
        return <Roadmap />;
      case 'projects':
        return <Projects />;
      case 'portfolio':
        return <Portfolio />;
      case 'community':
        return <Community />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UN</span>
              </div>
              <span className="font-bold text-xl text-gray-900">UpNext</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{userData.name}</div>
                <div className="text-sm text-gray-500 truncate">{userData.targetJob}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={!sidebarOpen ? item.name : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleReset}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all`}
            title={!sidebarOpen ? 'Reset Progress' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Reset Progress</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {navigation.find(n => n.id === activeTab)?.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === 'overview' && 'Track your progress and see what\'s next'}
              {activeTab === 'roadmap' && 'Your personalized learning journey'}
              {activeTab === 'projects' && 'Build real-world projects'}
              {activeTab === 'portfolio' && 'Showcase your achievements'}
              {activeTab === 'community' && 'Connect with other learners'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Reminders Bell */}
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {reminders.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {reminders.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {renderContent()}
        </div>

        {/* Reminders Popup */}
        {reminders.length > 0 && activeTab === 'overview' && (
          <div className="fixed bottom-8 right-8 w-96 z-50">
            <Reminders />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


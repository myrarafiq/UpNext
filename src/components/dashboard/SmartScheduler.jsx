import React, { useState } from 'react';
import { Calendar, Clock, Bell, Smartphone, Mail, MessageSquare, Zap, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SmartScheduler = () => {
  const { userData, roadmap, schedulePreferences, updateSchedulePreferences, notifications } = useApp();
  const [preferences, setPreferences] = useState(schedulePreferences || {
    availability: {
      monday: { enabled: true, start: '09:00', end: '17:00' },
      tuesday: { enabled: true, start: '09:00', end: '17:00' },
      wednesday: { enabled: true, start: '09:00', end: '17:00' },
      thursday: { enabled: true, start: '09:00', end: '17:00' },
      friday: { enabled: true, start: '09:00', end: '17:00' },
      saturday: { enabled: false, start: '10:00', end: '14:00' },
      sunday: { enabled: false, start: '10:00', end: '14:00' }
    },
    learningPace: 'moderate',
    notificationChannels: {
      email: true,
      sms: false,
      push: true,
      inApp: true
    },
    reminderTiming: {
      beforeTask: 30, // minutes
      dailySummary: '20:00',
      weeklyReview: 'Sunday 18:00'
    },
    calendarSync: {
      google: false,
      outlook: false
    }
  });

  const handleSavePreferences = () => {
    updateSchedulePreferences(preferences);
    alert('Schedule preferences updated! AI will adapt your timeline accordingly.');
  };

  const handleConnectCalendar = (type) => {
    // Mock calendar integration
    setPreferences({
      ...preferences,
      calendarSync: {
        ...preferences.calendarSync,
        [type]: !preferences.calendarSync[type]
      }
    });
    alert(`${type === 'google' ? 'Google' : 'Outlook'} Calendar integration ${preferences.calendarSync[type] ? 'disconnected' : 'connected'}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Scheduler</h2>
            <p className="text-gray-600">
              AI-powered scheduling that adapts to your availability and learning pace.
            </p>
          </div>
          <button onClick={handleSavePreferences} className="btn-primary flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Save Preferences
          </button>
        </div>
      </div>

      {/* AI Schedule Summary */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <Zap className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Your AI-Generated Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-primary-100">Optimal Study Time</div>
                <div className="font-bold text-lg">2.5 hours/day</div>
              </div>
              <div>
                <div className="text-primary-100">Estimated Completion</div>
                <div className="font-bold text-lg">12 weeks</div>
              </div>
              <div>
                <div className="text-primary-100">Next Milestone</div>
                <div className="font-bold text-lg">3 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Availability */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Availability</h3>
        <div className="space-y-3">
          {Object.entries(preferences.availability).map(([day, settings]) => (
            <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => setPreferences({
                  ...preferences,
                  availability: {
                    ...preferences.availability,
                    [day]: { ...settings, enabled: e.target.checked }
                  }
                })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <div className="w-24 font-semibold text-gray-900 capitalize">{day}</div>
              <div className="flex-1 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <input
                    type="time"
                    value={settings.start}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      availability: {
                        ...preferences.availability,
                        [day]: { ...settings, start: e.target.value }
                      }
                    })}
                    disabled={!settings.enabled}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={settings.end}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      availability: {
                        ...preferences.availability,
                        [day]: { ...settings, end: e.target.value }
                      }
                    })}
                    disabled={!settings.enabled}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Pace */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Pace</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'relaxed', label: 'Relaxed', desc: '1-2 hours/day', color: 'green' },
            { value: 'moderate', label: 'Moderate', desc: '2-4 hours/day', color: 'blue' },
            { value: 'intensive', label: 'Intensive', desc: '4+ hours/day', color: 'purple' }
          ].map((pace) => (
            <button
              key={pace.value}
              onClick={() => setPreferences({ ...preferences, learningPace: pace.value })}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                preferences.learningPace === pace.value
                  ? `border-${pace.color}-600 bg-${pace.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-gray-900 mb-1">{pace.label}</div>
              <div className="text-sm text-gray-600">{pace.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">Daily summaries & updates</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.notificationChannels.email}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notificationChannels: {
                    ...preferences.notificationChannels,
                    email: e.target.checked
                  }
                })}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">SMS</div>
                  <div className="text-sm text-gray-600">Important reminders only</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.notificationChannels.sms}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notificationChannels: {
                    ...preferences.notificationChannels,
                    sms: e.target.checked
                  }
                })}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900">Push Notifications</div>
                  <div className="text-sm text-gray-600">Real-time task reminders</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.notificationChannels.push}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notificationChannels: {
                    ...preferences.notificationChannels,
                    push: e.target.checked
                  }
                })}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-900">In-App</div>
                  <div className="text-sm text-gray-600">Dashboard notifications</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.notificationChannels.inApp}
                onChange={(e) => setPreferences({
                  ...preferences,
                  notificationChannels: {
                    ...preferences.notificationChannels,
                    inApp: e.target.checked
                  }
                })}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Integration */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Calendar Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border-2 transition-all ${
            preferences.calendarSync.google
              ? 'bg-blue-50 border-blue-600'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-gray-900">Google Calendar</div>
                  <div className="text-sm text-gray-600">
                    {preferences.calendarSync.google ? 'Connected' : 'Not connected'}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleConnectCalendar('google')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                preferences.calendarSync.google
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {preferences.calendarSync.google ? 'Disconnect' : 'Connect Google'}
            </button>
          </div>

          <div className={`p-4 rounded-lg border-2 transition-all ${
            preferences.calendarSync.outlook
              ? 'bg-blue-50 border-blue-600'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-gray-900">Outlook Calendar</div>
                  <div className="text-sm text-gray-600">
                    {preferences.calendarSync.outlook ? 'Connected' : 'Not connected'}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleConnectCalendar('outlook')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                preferences.calendarSync.outlook
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {preferences.calendarSync.outlook ? 'Disconnect' : 'Connect Outlook'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {notifications && notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <Bell className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{notification.title}</div>
                  <div className="text-sm text-gray-600">{notification.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{notification.timestamp}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p>No notifications yet. We'll notify you when it's time to learn!</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Schedule Insights */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">AI Scheduling Insights</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Based on your availability, you can complete {roadmap.length} tasks in ~{Math.ceil(roadmap.length / 7)} weeks</li>
              <li>• Your most productive time is {preferences.availability.monday.start} - {preferences.availability.monday.end}</li>
              <li>• We'll send reminders {preferences.reminderTiming.beforeTask} minutes before each session</li>
              <li>• Daily summary delivered at {preferences.reminderTiming.dailySummary}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartScheduler;


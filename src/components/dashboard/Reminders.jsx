import React from 'react';
import { Bell, X, Clock, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Reminders = () => {
  const { reminders, dismissReminder } = useApp();

  if (reminders.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-3 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        <span className="font-semibold">Learning Reminders</span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {reminder.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(reminder.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissReminder(reminder.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Sync with Calendar
        </button>
        <button
          onClick={() => reminders.forEach(r => dismissReminder(r.id))}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};

export default Reminders;


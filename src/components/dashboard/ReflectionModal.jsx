import React, { useState } from 'react';
import { X, ThumbsUp, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ReflectionModal = ({ task, onClose }) => {
  const { completeTask, generateProject } = useApp();
  const [understanding, setUnderstanding] = useState(3);
  const [notes, setNotes] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    completeTask(task.id, understanding);
    
    // Generate a project if understanding is good
    if (understanding >= 3) {
      generateProject(task.title);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (showFeedback) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Great Job! 🎉</h2>
          <p className="text-gray-600 mb-4">Your roadmap has been updated based on your feedback.</p>
          {understanding >= 3 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-900 font-medium">
                A new project has been created to help you practice {task.title}!
              </p>
            </div>
          )}
          {understanding <= 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-medium">
                We've added a reinforcement task to help strengthen your understanding!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How did it go?</h2>
            <p className="text-gray-600">Help us adapt your learning journey</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Task Info */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        {/* Understanding Rating */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            How well do you understand {task.title}?
          </label>
          
          <div className="space-y-3">
            {[
              { value: 5, label: 'Expert Level', desc: 'I could teach this to others', color: 'green' },
              { value: 4, label: 'Very Comfortable', desc: 'I can apply this confidently', color: 'blue' },
              { value: 3, label: 'Comfortable', desc: 'I understand the core concepts', color: 'yellow' },
              { value: 2, label: 'Struggling', desc: 'I need more practice', color: 'orange' },
              { value: 1, label: 'Lost', desc: 'I need to revisit this', color: 'red' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setUnderstanding(option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  understanding === option.value
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < option.value ? `bg-${option.color}-500` : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Notes */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Any notes or reflections? (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field min-h-[100px]"
            placeholder="What did you learn? What was challenging? Any key takeaways?"
          />
        </div>

        {/* Prediction */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div className="text-sm">
              <div className="font-semibold text-purple-900 mb-1">What happens next:</div>
              <div className="text-purple-800">
                {understanding <= 2 && "We'll add a reinforcement project to help you practice more."}
                {understanding === 3 && "Great! You'll move to the next topic in your roadmap."}
                {understanding >= 4 && "Excellent! We'll add an advanced challenge and create a portfolio project."}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary flex-1">
            Complete & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionModal;


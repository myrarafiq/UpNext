import React, { useState } from 'react';
import { Rocket, Target, Brain, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Onboarding = ({ onComplete }) => {
  const { initializeUserData } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    targetJob: '',
    currentLevel: '',
    skills: []
  });

  const jobOptions = ['Data Scientist', 'Full Stack Developer', 'Software Engineer', 'ML Engineer', 'Backend Developer', 'Frontend Developer'];
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      initializeUserData(formData);
      onComplete();
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim() !== '';
    if (step === 2) return formData.targetJob !== '';
    if (step === 3) return formData.currentLevel !== '';
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full text-2xl font-bold mb-4 shadow-lg">
            <Rocket className="w-8 h-8" />
            UpNext
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your AI Copilot for Job-Ready Skills
          </h1>
          <p className="text-xl text-gray-600">
            Escape tutorial hell. Build real projects. Get hired.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 ${s < step ? 'bg-primary-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="card">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Let's get to know you</h2>
                  <p className="text-gray-600">What should we call you?</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Alex Johnson"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">What's your dream job?</h2>
                  <p className="text-gray-600">We'll build a roadmap to get you there</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {jobOptions.map((job) => (
                  <button
                    key={job}
                    onClick={() => handleChange('targetJob', job)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.targetJob === job
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{job}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Where are you now?</h2>
                  <p className="text-gray-600">Select your current skill level</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {levelOptions.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleChange('currentLevel', level)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.currentLevel === level
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{level}</div>
                    <div className="text-sm text-gray-600">
                      {level === 'Beginner' && 'Just starting out or learning the basics'}
                      {level === 'Intermediate' && 'Have some experience and basic projects'}
                      {level === 'Advanced' && 'Experienced with multiple projects and concepts'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`ml-auto btn-primary flex items-center gap-2 ${
                !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {step === 3 ? 'Start Learning' : 'Continue'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;


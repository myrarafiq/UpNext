import React, { useState } from 'react';
import { FileText, Download, Eye, Sparkles, Linkedin, Github, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateATSOptimizedCV, analyzeCV } from '../../utils/cvEngine';

const CVGenerator = () => {
  const { userData, completedTasks, projects, cvData, updateCVData, linkedInData, githubData } = useApp();
  const [cvAnalysis, setCvAnalysis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateCV = async () => {
    setIsGenerating(true);
    
    // Simulate AI CV generation
    setTimeout(() => {
      const newCV = generateATSOptimizedCV({
        userData,
        completedTasks,
        projects,
        linkedInData,
        githubData
      });
      
      updateCVData(newCV);
      const analysis = analyzeCV(newCV);
      setCvAnalysis(analysis);
      setIsGenerating(false);
    }, 2000);
  };

  const handleImportLinkedIn = () => {
    // Mock LinkedIn import - in production, use LinkedIn API
    alert('LinkedIn import will connect to your profile and pull experience, education, and skills. This is a prototype feature.');
  };

  const handleImportGitHub = () => {
    // Mock GitHub import - in production, use GitHub API
    alert('GitHub import will pull your repositories, contributions, and coding activity. This is a prototype feature.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI CV Generator</h2>
            <p className="text-gray-600">
              Generate an ATS-optimized, job-ready CV based on your skills, projects, and experience.
            </p>
          </div>
          <button
            onClick={handleGenerateCV}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate CV
              </>
            )}
          </button>
        </div>
      </div>

      {/* Import Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Linkedin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Import from LinkedIn</h3>
              <p className="text-sm text-gray-700 mb-4">
                Pull your experience, education, and skills automatically
              </p>
              <button
                onClick={handleImportLinkedIn}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Connect LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">Import from GitHub</h3>
              <p className="text-sm text-gray-300 mb-4">
                Showcase your repositories and coding contributions
              </p>
              <button
                onClick={handleImportGitHub}
                className="text-sm bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                Connect GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Analysis */}
      {cvAnalysis && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">CV Analysis</h3>
          
          {/* ATS Score */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">ATS Compatibility Score</div>
                <div className="text-4xl font-bold text-green-600">{cvAnalysis.atsScore}%</div>
              </div>
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${cvAnalysis.atsScore}%` }}
              />
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {cvAnalysis.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Suggested Improvements
              </h4>
              <ul className="space-y-2">
                {cvAnalysis.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CV Preview */}
      {cvData && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Your CV</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide' : 'Preview'}
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          {showPreview && (
            <div className="bg-white border-2 border-gray-300 rounded-lg p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
              {/* CV Header */}
              <div className="border-b-2 border-gray-300 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{cvData.name}</h1>
                <div className="text-gray-700">{cvData.title}</div>
                <div className="text-sm text-gray-600 mt-2">
                  {cvData.email} | {cvData.phone} | {cvData.location}
                </div>
                {cvData.linkedin && (
                  <div className="text-sm text-blue-600 mt-1">
                    LinkedIn: {cvData.linkedin} | GitHub: {cvData.github}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm text-gray-700">{cvData.summary}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  TECHNICAL SKILLS
                </h2>
                <div className="text-sm text-gray-700">
                  <strong>Languages & Tools:</strong> {cvData.skills.join(', ')}
                </div>
              </div>

              {/* Experience (Projects) */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  PROJECTS
                </h2>
                {cvData.projects.map((project, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="font-bold text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-600 mb-1">{project.technologies}</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li key={i}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  EDUCATION & CERTIFICATIONS
                </h2>
                {cvData.education.map((edu, idx) => (
                  <div key={idx} className="text-sm text-gray-700 mb-2">
                    <div className="font-bold">{edu.degree}</div>
                    <div>{edu.institution} | {edu.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Tips */}
      <div className="card bg-purple-50 border-purple-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">AI CV Optimization Tips</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Use action verbs (Built, Developed, Implemented, Designed)</li>
              <li>• Quantify achievements (Improved performance by 30%, Built 5+ projects)</li>
              <li>• Include relevant keywords from job descriptions</li>
              <li>• Keep formatting simple for ATS compatibility</li>
              <li>• Update CV as you complete more projects and courses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;


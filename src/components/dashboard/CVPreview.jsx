import React from 'react';
import { Download, Mail, Phone, MapPin, Linkedin, Github, Globe, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { finalCV } from '../../data/aishaJourney';

const CVPreview = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Your Job-Ready CV</h1>
          <p className="text-gray-600">ATS-optimized resume ready for applications</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>

      {/* ATS Score */}
      <div className="card-navy">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">ATS Compatibility Score</h2>
            <p className="text-cyan-300">Your CV is highly optimized for Applicant Tracking Systems</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center relative">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#atsGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - finalCV.atsScore / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{finalCV.atsScore}</span>
                <span className="text-sm text-cyan-300">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="card-elevated">
        {/* Header Section */}
        <div className="pb-6 border-b-2 border-indigo-500">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{finalCV.personalInfo.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {finalCV.personalInfo.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {finalCV.personalInfo.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {finalCV.personalInfo.location}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-600 font-medium">
            <a href="#" className="flex items-center gap-2 hover:text-indigo-700">
              <Linkedin className="w-4 h-4" />
              {finalCV.personalInfo.linkedin}
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-indigo-700">
              <Github className="w-4 h-4" />
              {finalCV.personalInfo.github}
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-indigo-700">
              <Globe className="w-4 h-4" />
              {finalCV.personalInfo.portfolio}
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{finalCV.summary}</p>
        </div>

        {/* Skills */}
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {finalCV.skills.technical.map((skill, idx) => (
                  <span key={idx} className="badge badge-primary">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {finalCV.skills.tools.map((tool, idx) => (
                  <span key={idx} className="badge badge-cyan">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="space-y-4">
            {finalCV.projects.map((project, idx) => (
              <div key={idx} className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View →
                  </a>
                </div>
                <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIdx) => (
                    <span key={techIdx} className="badge bg-white text-gray-700">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-2">
            {finalCV.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          {finalCV.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{edu.year}</p>
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generated Date */}
        <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          Generated by UpNext AI • {finalCV.generatedDate}
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-gradient p-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">ATS Optimized</h3>
          <p className="text-sm text-gray-600">Keywords matched to job descriptions</p>
        </div>
        <div className="card-gradient p-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Achievement Focused</h3>
          <p className="text-sm text-gray-600">Quantified impact and results</p>
        </div>
        <div className="card-gradient p-4">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Auto-Updated</h3>
          <p className="text-sm text-gray-600">Syncs with your learning progress</p>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;


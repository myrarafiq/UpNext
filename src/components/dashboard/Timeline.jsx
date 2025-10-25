import React, { useState } from 'react';
import { Calendar, Clock, Award, BookOpen, Code, CheckCircle2, Circle, Upload, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Timeline = () => {
  const { roadmap, completedTasks, projects, certificates, uploadCertificate } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateData, setCertificateData] = useState({
    name: '',
    issuer: '',
    completionDate: '',
    credentialId: ''
  });

  // Generate timeline events from all sources
  const timelineEvents = generateTimelineEvents(roadmap, completedTasks, projects, certificates);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleCertificateSubmit = () => {
    if (!selectedFile || !certificateData.name || !certificateData.issuer) {
      alert('Please fill in all required fields and upload a certificate');
      return;
    }

    uploadCertificate({
      ...certificateData,
      fileName: selectedFile.name,
      uploadDate: new Date(),
      verified: false // Will be verified by AI
    });

    // Reset form
    setSelectedFile(null);
    setCertificateData({ name: '', issuer: '', completionDate: '', credentialId: '' });
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Timeline</h2>
            <p className="text-gray-600">
              Your complete learning journey with milestones, courses, projects, and certifications.
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Certificate
          </button>
        </div>
      </div>

      {/* Timeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedTasks.length}</div>
              <div className="text-xs text-gray-600">Courses Completed</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
              <div className="text-xs text-gray-600">Projects Built</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{certificates?.length || 0}</div>
              <div className="text-xs text-gray-600">Certificates Earned</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{roadmap.filter(t => t.status === 'pending').length}</div>
              <div className="text-xs text-gray-600">Upcoming Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Visual Timeline</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-purple-600 to-green-600" />
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-20">
                {/* Timeline Dot */}
                <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white ${
                  event.status === 'completed' ? 'bg-green-600' :
                  event.status === 'in-progress' ? 'bg-blue-600' :
                  'bg-gray-400'
                }`} />
                
                {/* Event Card */}
                <div className={`card ${
                  event.status === 'completed' ? 'bg-green-50 border-green-200' :
                  event.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      event.type === 'course' ? 'bg-blue-600' :
                      event.type === 'project' ? 'bg-purple-600' :
                      event.type === 'certificate' ? 'bg-green-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {event.type === 'course' && <BookOpen className="w-6 h-6" />}
                      {event.type === 'project' && <Code className="w-6 h-6" />}
                      {event.type === 'certificate' && <Award className="w-6 h-6" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.status === 'completed' && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          {event.status === 'in-progress' && (
                            <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                          )}
                          {event.status === 'pending' && (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        {event.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.duration}
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'completed' ? 'bg-green-200 text-green-800' :
                          event.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {event.status.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Certificate Details */}
                      {event.type === 'certificate' && event.credentialId && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1">Credential ID</div>
                          <div className="text-sm font-mono text-gray-900">{event.credentialId}</div>
                          {event.verified && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified by AI
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Certificate</h2>
                <p className="text-gray-600">Add your course completion certificates to your timeline</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Certificate PDF *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="certificate-upload"
                  />
                  <label
                    htmlFor="certificate-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : 'Click to upload PDF certificate'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Certificate Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Machine Learning Specialization"
                  value={certificateData.name}
                  onChange={(e) => setCertificateData({ ...certificateData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Coursera, Udemy, edX"
                  value={certificateData.issuer}
                  onChange={(e) => setCertificateData({ ...certificateData, issuer: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={certificateData.completionDate}
                    onChange={(e) => setCertificateData({ ...certificateData, completionDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Credential ID (Optional)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Certificate ID"
                    value={certificateData.credentialId}
                    onChange={(e) => setCertificateData({ ...certificateData, credentialId: e.target.value })}
                  />
                </div>
              </div>

              {/* AI Verification Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="text-sm text-purple-900">
                    <strong>AI Verification:</strong> Once uploaded, our AI will analyze your certificate
                    for authenticity, extract metadata, and automatically update your CV and timeline.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCertificateSubmit}
                className="btn-primary flex-1"
              >
                Upload Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to generate timeline events
const generateTimelineEvents = (roadmap, completedTasks, projects, certificates = []) => {
  const events = [];

  // Add completed tasks as course events
  completedTasks.forEach(task => {
    events.push({
      type: 'course',
      title: task.title,
      description: task.description,
      date: new Date(task.completedAt).toLocaleDateString(),
      status: 'completed',
      duration: task.duration
    });
  });

  // Add in-progress tasks
  roadmap.filter(t => t.status === 'in-progress').forEach(task => {
    events.push({
      type: 'course',
      title: task.title,
      description: task.description,
      date: 'In Progress',
      status: 'in-progress',
      duration: task.duration
    });
  });

  // Add pending tasks (future)
  roadmap.filter(t => t.status === 'pending').slice(0, 3).forEach(task => {
    events.push({
      type: 'course',
      title: task.title,
      description: task.description,
      date: 'Upcoming',
      status: 'pending',
      duration: task.duration
    });
  });

  // Add projects
  projects.forEach(project => {
    events.push({
      type: 'project',
      title: project.name,
      description: project.description,
      date: new Date(project.createdAt).toLocaleDateString(),
      status: project.status
    });
  });

  // Add certificates
  certificates.forEach(cert => {
    events.push({
      type: 'certificate',
      title: cert.name,
      description: `Issued by ${cert.issuer}`,
      date: new Date(cert.completionDate).toLocaleDateString(),
      status: 'completed',
      credentialId: cert.credentialId,
      verified: cert.verified
    });
  });

  // Sort by date (completed first, then in-progress, then pending)
  return events.sort((a, b) => {
    const statusOrder = { completed: 0, 'in-progress': 1, pending: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
};

export default Timeline;


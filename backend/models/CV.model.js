import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  content: {
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
      summary: String
    },
    experience: [{
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      achievements: [String],
      technologies: [String],
      source: { type: String, enum: ['linkedin', 'manual', 'ai_generated'] }
    }],
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      gpa: String,
      achievements: [String],
      source: { type: String, enum: ['linkedin', 'manual', 'ai_generated'] }
    }],
    skills: [{
      category: String, // e.g., 'Programming Languages', 'Frameworks'
      items: [String],
      verified: Boolean
    }],
    projects: [{
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      },
      title: String,
      description: String,
      technologies: [String],
      githubUrl: String,
      liveUrl: String,
      highlights: [String]
    }],
    certifications: [{
      certificateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
      },
      name: String,
      issuer: String,
      issueDate: Date,
      expiryDate: Date,
      credentialId: String,
      credentialUrl: String
    }],
    languages: [{
      name: String,
      proficiency: String // e.g., 'Native', 'Fluent', 'Intermediate'
    }],
    volunteering: [{
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }]
  },
  atsOptimization: {
    score: { type: Number, default: 0, min: 0, max: 100 },
    keywords: [String],
    suggestions: [String],
    lastOptimized: Date
  },
  aiGenerated: {
    sections: [String], // which sections were AI-generated
    lastGenerated: Date,
    model: String,
    prompt: String
  },
  formats: {
    pdf: String, // URL or path to PDF
    docx: String, // URL or path to DOCX
    json: Object // structured JSON format
  },
  analytics: {
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    lastDownloaded: Date,
    lastViewed: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Indexes
cvSchema.index({ userId: 1, isActive: 1 });
cvSchema.index({ targetRole: 1 });
cvSchema.index({ 'atsOptimization.score': -1 });

export default mongoose.model('CV', cvSchema);


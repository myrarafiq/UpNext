import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  platform: String,
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  certificateUrl: String, // uploaded file URL
  skills: [String],
  verification: {
    verified: { type: Boolean, default: false },
    verifiedAt: Date,
    verificationMethod: String, // 'manual', 'api', 'blockchain'
    issuerVerified: Boolean
  },
  metadata: {
    fileType: String,
    fileSize: Number,
    uploadedAt: Date
  },
  linkedToCV: {
    type: Boolean,
    default: false
  },
  linkedTimeline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeline'
  },
  aiMetadata: {
    relevanceScore: Number,
    skillsExtracted: [String],
    issuerReputation: String // 'high', 'medium', 'low'
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
certificateSchema.index({ userId: 1 });
certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ skills: 1 });

export default mongoose.model('Certificate', certificateSchema);


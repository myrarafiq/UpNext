import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['udemy', 'coursera', 'youtube', 'edx', 'linkedin_learning', 'pluralsight', 'other'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  instructor: String,
  duration: Number, // in hours
  description: String,
  skills: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'paused'],
    default: 'not_started'
  },
  progress: {
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    completedLectures: { type: Number, default: 0 },
    totalLectures: Number,
    lastWatchedDate: Date,
    timeSpent: { type: Number, default: 0 } // in minutes
  },
  certificate: {
    earned: { type: Boolean, default: false },
    issueDate: Date,
    certificateUrl: String,
    certificateId: String,
    credentialId: String,
    verified: { type: Boolean, default: false }
  },
  schedule: {
    plannedStartDate: Date,
    targetEndDate: Date,
    actualEndDate: Date,
    weeklyHours: Number
  },
  linkedTimeline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeline'
  },
  aiMetadata: {
    relevanceScore: Number, // 0-100
    recommendedBy: String, // 'planner', 'recommender', 'user'
    reasoning: String
  },
  notes: String,
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
courseSchema.index({ userId: 1, status: 1 });
courseSchema.index({ skills: 1 });

export default mongoose.model('Course', courseSchema);


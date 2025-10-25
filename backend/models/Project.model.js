import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tech', 'non_tech'],
    required: true
  },
  category: {
    type: String,
    enum: ['web_dev', 'mobile_dev', 'data_science', 'ml_ai', 'design', 'research', 'volunteering', 'professional', 'other'],
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'on_hold'],
    default: 'planning'
  },
  github: {
    repoUrl: String,
    repoName: String,
    branch: String,
    commits: Number,
    lastCommitDate: Date,
    stars: Number,
    forks: Number,
    languages: [String],
    scaffolded: { type: Boolean, default: false }
  },
  skills: [String],
  technologies: [String],
  milestones: [{
    title: String,
    description: String,
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    dueDate: Date,
    completedDate: Date
  }],
  progress: {
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    completedMilestones: { type: Number, default: 0 },
    totalMilestones: Number,
    timeSpent: { type: Number, default: 0 } // in hours
  },
  timeline: {
    startDate: Date,
    targetEndDate: Date,
    actualEndDate: Date
  },
  linkedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  linkedTimeline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeline'
  },
  portfolio: {
    featured: { type: Boolean, default: false },
    demoUrl: String,
    screenshots: [String],
    documentation: String,
    testimonials: [String]
  },
  aiMetadata: {
    suggestedBy: String,
    complexity: { type: String, enum: ['simple', 'moderate', 'complex', 'advanced'] },
    learningValue: Number, // 0-100
    portfolioImpact: Number // 0-100
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
projectSchema.index({ userId: 1, status: 1 });
projectSchema.index({ skills: 1 });
projectSchema.index({ type: 1, category: 1 });

export default mongoose.model('Project', projectSchema);


import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['course', 'project', 'certificate', 'mentor', 'custom'],
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'blocked'],
    default: 'not_started'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  startDate: Date,
  targetDate: Date,
  completedDate: Date,
  estimatedHours: Number,
  actualHours: Number,
  linkedResources: [{
    type: { type: String }, // 'course', 'project', 'certificate'
    id: mongoose.Schema.Types.ObjectId
  }],
  dependencies: [{
    milestoneId: mongoose.Schema.Types.ObjectId,
    type: { type: String, enum: ['prerequisite', 'related'] }
  }],
  aiSuggested: {
    type: Boolean,
    default: false
  },
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const timelineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  careerGoal: {
    targetRole: String,
    targetCompany: String,
    targetSalary: Number,
    timeframe: String, // e.g., '6 months', '1 year'
    motivations: [String]
  },
  milestones: [milestoneSchema],
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  estimatedCompletion: Date,
  lastReviewDate: Date,
  nextReviewDate: Date,
  isActive: {
    type: Boolean,
    default: true
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
timelineSchema.index({ userId: 1 });
timelineSchema.index({ 'milestones.status': 1 });

export default mongoose.model('Timeline', timelineSchema);


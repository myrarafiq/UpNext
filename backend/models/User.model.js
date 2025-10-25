import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    location: String,
    bio: String,
    avatar: String,
    targetRole: String,
    yearsOfExperience: Number,
    currentRole: String,
    currentCompany: String
  },
  integrations: {
    github: {
      connected: { type: Boolean, default: false },
      username: String,
      accessToken: String,
      repos: [String]
    },
    linkedin: {
      connected: { type: Boolean, default: false },
      profileUrl: String,
      accessToken: String,
      experiences: [Object],
      education: [Object]
    },
    calendar: {
      connected: { type: Boolean, default: false },
      provider: String, // 'google', 'outlook'
      accessToken: String,
      refreshToken: String
    }
  },
  preferences: {
    studyHoursPerWeek: { type: Number, default: 10 },
    preferredStudyTimes: [String], // e.g., ['morning', 'evening']
    notificationChannels: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    timezone: { type: String, default: 'UTC' }
  },
  skillGraph: {
    currentSkills: [{
      name: String,
      level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
      verifiedBy: [String], // certificate IDs, project IDs
      lastUpdated: Date
    }],
    targetSkills: [{
      name: String,
      priority: { type: String, enum: ['low', 'medium', 'high'] },
      dependencies: [String] // skill names
    }]
  },
  gamification: {
    totalPoints: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{
      name: String,
      earnedAt: Date,
      icon: String
    }],
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActive: Date
    }
  },
  onboarded: {
    type: Boolean,
    default: false
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
userSchema.index({ email: 1 });
userSchema.index({ 'integrations.github.username': 1 });

export default mongoose.model('User', userSchema);


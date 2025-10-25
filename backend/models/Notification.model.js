import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['reminder', 'achievement', 'deadline', 'recommendation', 'mentor', 'milestone', 'system'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  channels: {
    email: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    sms: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    push: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    inApp: {
      read: { type: Boolean, default: false },
      readAt: Date
    }
  },
  linkedResource: {
    type: String, // 'course', 'project', 'milestone', 'mentor'
    id: mongoose.Schema.Types.ObjectId
  },
  scheduledFor: Date,
  action: {
    type: String,
    text: String,
    url: String
  },
  metadata: {
    agentGenerated: Boolean,
    agentType: String, // 'reminder', 'evaluator', 'recommender'
    context: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Indexes
notificationSchema.index({ userId: 1, 'channels.inApp.read': 1 });
notificationSchema.index({ scheduledFor: 1 });
notificationSchema.index({ type: 1, priority: 1 });

export default mongoose.model('Notification', notificationSchema);


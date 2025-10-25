import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import Notification from '../../models/Notification.model.js';
import Timeline from '../../models/Timeline.model.js';
import Course from '../../models/Course.model.js';
import Project from '../../models/Project.model.js';

class ReminderAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'ReminderAgent';
  }

  /**
   * Schedule smart reminders based on timeline and user preferences
   */
  async scheduleReminders(userId, data) {
    const { context } = data;
    
    const timeline = context?.timeline || await Timeline.findOne({ userId, isActive: true });
    const courses = context?.courses || await Course.find({ userId, status: 'in_progress' });
    const projects = context?.projects || await Project.find({ userId, status: 'in_progress' });

    if (!timeline) {
      return { success: false, message: 'No active timeline found' };
    }

    try {
      const reminders = [];

      // Milestone reminders
      for (const milestone of timeline.milestones) {
        if (milestone.status === 'not_started' || milestone.status === 'in_progress') {
          const daysUntilDue = this.getDaysUntil(milestone.targetDate);
          
          if (daysUntilDue <= 7 && daysUntilDue > 0) {
            reminders.push({
              userId,
              type: 'deadline',
              priority: daysUntilDue <= 2 ? 'high' : 'medium',
              title: `Milestone Due Soon: ${milestone.title}`,
              message: `Your milestone "${milestone.title}" is due in ${daysUntilDue} days. You have ${milestone.estimatedHours || 0} hours estimated.`,
              scheduledFor: new Date(),
              linkedResource: {
                type: 'milestone',
                id: milestone._id
              },
              metadata: {
                agentGenerated: true,
                agentType: 'reminder'
              }
            });
          }
        }
      }

      // Course progress reminders
      for (const course of courses) {
        const daysSinceLastActivity = this.getDaysSince(course.progress?.lastWatchedDate);
        
        if (daysSinceLastActivity >= 3) {
          reminders.push({
            userId,
            type: 'reminder',
            priority: 'medium',
            title: `Continue Learning: ${course.title}`,
            message: `It's been ${daysSinceLastActivity} days since you worked on "${course.title}". Keep your momentum going!`,
            scheduledFor: new Date(),
            linkedResource: {
              type: 'course',
              id: course._id
            },
            action: {
              type: 'open_course',
              text: 'Resume Course',
              url: course.url
            },
            metadata: {
              agentGenerated: true,
              agentType: 'reminder'
            }
          });
        }
      }

      // Project progress reminders
      for (const project of projects) {
        const incompleteMilestones = project.milestones?.filter(m => m.status !== 'done') || [];
        
        if (incompleteMilestones.length > 0) {
          reminders.push({
            userId,
            type: 'reminder',
            priority: 'medium',
            title: `Project Update: ${project.title}`,
            message: `You have ${incompleteMilestones.length} milestone(s) pending in "${project.title}". Next up: ${incompleteMilestones[0].title}`,
            scheduledFor: new Date(),
            linkedResource: {
              type: 'project',
              id: project._id
            },
            metadata: {
              agentGenerated: true,
              agentType: 'reminder'
            }
          });
        }
      }

      // Save reminders to database
      if (reminders.length > 0) {
        await Notification.insertMany(reminders);
      }

      console.log(`✅ ${this.name}: Scheduled ${reminders.length} reminders`);

      return {
        success: true,
        count: reminders.length,
        reminders
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error scheduling reminders:`, error);
      throw error;
    }
  }

  /**
   * Generate personalized, motivational notification content
   */
  async generateMotivationalMessage(userId, context) {
    const systemPrompt = `You are an encouraging AI coach. Generate short, motivational messages 
    that inspire users to stay on track with their learning journey. Be positive, specific, and actionable.`;

    const userPrompt = `Generate a motivational message for:
    
    Context: ${context.situation}
    Recent Achievement: ${context.achievement || 'None yet'}
    Current Goal: ${context.goal}
    
    Keep it under 2 sentences. Make it personal and encouraging.`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      return response.content.trim();
    } catch (error) {
      console.error(`❌ ${this.name}: Error generating motivational message:`, error);
      return 'Keep up the great work on your learning journey!';
    }
  }

  /**
   * Helper methods
   */
  getDaysUntil(targetDate) {
    if (!targetDate) return Infinity;
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysSince(date) {
    if (!date) return Infinity;
    const now = new Date();
    const past = new Date(date);
    const diffTime = now - past;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
}

export default ReminderAgent;


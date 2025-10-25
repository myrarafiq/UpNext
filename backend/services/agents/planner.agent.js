import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import Timeline from '../../models/Timeline.model.js';
import User from '../../models/User.model.js';

class PlannerAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'PlannerAgent';
  }

  /**
   * Generate a comprehensive career timeline with milestones
   */
  async generateTimeline(userId, data) {
    const { careerGoal, context } = data;
    
    const user = context?.user || await User.findById(userId);
    
    const systemPrompt = `You are an expert career planning AI agent. Your role is to create comprehensive, 
    achievable career timelines that guide users from their current state to their career goals.
    
    Consider:
    - User's current skills and experience
    - Target role requirements
    - Industry standards and best practices
    - Realistic timeframes based on user's availability
    - Logical skill dependencies and progressions
    - Mix of courses, projects, and certifications
    
    Generate a structured timeline with specific, actionable milestones.`;

    const userPrompt = `Create a career development timeline for:
    
    Target Role: ${careerGoal.targetRole}
    Timeframe: ${careerGoal.timeframe || '6 months'}
    
    Current Skills: ${user.skillGraph?.currentSkills?.map(s => s.name).join(', ') || 'None listed'}
    Current Role: ${user.profile?.currentRole || 'Entry level'}
    Study Time Available: ${user.preferences?.studyHoursPerWeek || 10} hours/week
    
    Generate a JSON timeline with milestones including:
    - Courses to take (with platforms)
    - Projects to build (tech and non-tech)
    - Certifications to pursue
    - Estimated hours and target dates
    - Dependencies between milestones
    
    Format as JSON array of milestones.`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      // Parse AI response
      const content = response.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const milestones = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

      // Create or update timeline
      let timeline = await Timeline.findOne({ userId, isActive: true });
      
      if (!timeline) {
        timeline = new Timeline({
          userId,
          careerGoal,
          milestones: []
        });
      }

      // Transform AI-generated milestones to schema format
      timeline.milestones = milestones.map((m, index) => ({
        title: m.title,
        type: m.type || 'custom',
        description: m.description,
        status: 'not_started',
        priority: m.priority || 'medium',
        startDate: this.calculateStartDate(index, user.preferences?.studyHoursPerWeek),
        targetDate: this.calculateTargetDate(index, m.estimatedHours, user.preferences?.studyHoursPerWeek),
        estimatedHours: m.estimatedHours,
        dependencies: m.dependencies || [],
        aiSuggested: true
      }));

      timeline.overallProgress = 0;
      timeline.estimatedCompletion = this.calculateOverallCompletion(timeline.milestones);
      
      await timeline.save();

      console.log(`✅ ${this.name}: Generated timeline with ${timeline.milestones.length} milestones`);

      return {
        success: true,
        timeline,
        message: `Created career timeline with ${timeline.milestones.length} milestones`
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error generating timeline:`, error);
      throw error;
    }
  }

  /**
   * Update timeline based on user progress
   */
  async updateTimeline(userId, updates) {
    const timeline = await Timeline.findOne({ userId, isActive: true });
    
    if (!timeline) {
      throw new Error('No active timeline found');
    }

    // Update milestones
    if (updates.milestoneId) {
      const milestone = timeline.milestones.id(updates.milestoneId);
      if (milestone) {
        Object.assign(milestone, updates.changes);
        
        // Recalculate overall progress
        timeline.overallProgress = this.calculateProgress(timeline.milestones);
      }
    }

    await timeline.save();
    
    return {
      success: true,
      timeline
    };
  }

  /**
   * Helper methods
   */
  calculateStartDate(index, hoursPerWeek) {
    const weeksFromNow = Math.floor((index * 2) / (hoursPerWeek / 5));
    const date = new Date();
    date.setDate(date.getDate() + (weeksFromNow * 7));
    return date;
  }

  calculateTargetDate(index, estimatedHours, hoursPerWeek) {
    const startDate = this.calculateStartDate(index, hoursPerWeek);
    const weeksNeeded = Math.ceil(estimatedHours / hoursPerWeek);
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + (weeksNeeded * 7));
    return targetDate;
  }

  calculateOverallCompletion(milestones) {
    if (!milestones.length) return new Date();
    
    const lastMilestone = milestones[milestones.length - 1];
    return lastMilestone.targetDate;
  }

  calculateProgress(milestones) {
    if (!milestones.length) return 0;
    
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  }
}

export default PlannerAgent;


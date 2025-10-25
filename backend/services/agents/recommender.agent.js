import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import User from '../../models/User.model.js';
import Course from '../../models/Course.model.js';
import Project from '../../models/Project.model.js';

class RecommenderAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'RecommenderAgent';
  }

  /**
   * Recommend next steps based on current progress
   */
  async recommendNextSteps(userId, data) {
    const { context } = data;
    
    const user = context?.user || await User.findById(userId);
    const courses = context?.courses || await Course.find({ userId });
    const projects = context?.projects || await Project.find({ userId });

    const systemPrompt = `You are a career development advisor AI. Recommend the most impactful next steps 
    for the user's career journey. Prioritize actions that fill skill gaps and advance toward their goals.`;

    const userPrompt = `Recommend next steps for:
    
    Target Role: ${user.profile?.targetRole}
    Current Skills: ${user.skillGraph?.currentSkills?.map(s => s.name).join(', ')}
    Target Skills: ${user.skillGraph?.targetSkills?.map(s => s.name).join(', ')}
    
    Completed Courses: ${courses.filter(c => c.status === 'completed').length}
    Active Courses: ${courses.filter(c => c.status === 'in_progress').length}
    Completed Projects: ${projects.filter(p => p.status === 'completed').length}
    
    Available Time: ${user.preferences?.studyHoursPerWeek} hours/week
    
    Return JSON with:
    - priorityActions (array with action, reason, estimatedImpact)
    - suggestedCourses (array with title, platform, url if available, reason)
    - suggestedProjects (array with title, type, skills, reason)
    - optionalMentorship (boolean and when to seek it)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      console.log(`✅ ${this.name}: Generated ${recommendations.priorityActions?.length || 0} priority actions`);

      return {
        success: true,
        recommendations,
        timestamp: new Date()
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error generating recommendations:`, error);
      throw error;
    }
  }

  /**
   * Suggest specific courses based on skills gap
   */
  async suggestCourses(userId, data) {
    const { targetSkills, difficulty = 'intermediate' } = data;
    
    const user = await User.findById(userId);
    const currentSkills = user.skillGraph?.currentSkills?.map(s => s.name) || [];

    const systemPrompt = `You are an expert course recommender. Suggest high-quality, credible courses 
    from platforms like Udemy, Coursera, edX, LinkedIn Learning, and YouTube.`;

    const userPrompt = `Suggest courses for:
    
    Target Skills: ${targetSkills.join(', ')}
    Current Skills: ${currentSkills.join(', ')}
    Preferred Difficulty: ${difficulty}
    Available Time: ${user.preferences?.studyHoursPerWeek} hours/week
    
    Return JSON array of courses with:
    - title
    - platform
    - instructor (if known)
    - estimatedDuration (hours)
    - difficulty
    - skills (array)
    - why (reason for recommendation)
    - url (if you know a specific course)
    
    Prioritize courses with verifiable certificates.`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const suggestedCourses = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

      return {
        success: true,
        courses: suggestedCourses,
        count: suggestedCourses.length
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error suggesting courses:`, error);
      throw error;
    }
  }

  /**
   * Suggest project ideas based on learning stage
   */
  async suggestProjects(userId, data) {
    const { skills, type = 'tech', complexity = 'moderate' } = data;
    
    const user = await User.findById(userId);

    const systemPrompt = `You are a project idea generator. Suggest practical, portfolio-worthy projects 
    that demonstrate skills and provide real learning value.`;

    const userPrompt = `Suggest ${type} projects for:
    
    Skills to Practice: ${skills.join(', ')}
    Complexity Level: ${complexity}
    Target Role: ${user.profile?.targetRole}
    
    Return JSON array with:
    - title
    - description
    - type (tech/non_tech)
    - category
    - skills (array)
    - technologies (array if tech project)
    - estimatedHours
    - learningOutcomes (array)
    - portfolioValue (high/medium/low)
    - milestones (array of key tasks)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const suggestedProjects = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

      return {
        success: true,
        projects: suggestedProjects,
        count: suggestedProjects.length
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error suggesting projects:`, error);
      throw error;
    }
  }

  /**
   * Recommend when and how to engage with mentors
   */
  async recommendMentorship(userId, data) {
    const { currentProgress, milestones } = data;
    
    const systemPrompt = `You are a mentorship advisor. Identify optimal moments for mentor interactions 
    that maximize learning and career growth.`;

    const userPrompt = `Analyze mentorship needs:
    
    Current Progress: ${currentProgress}%
    Upcoming Milestones: ${JSON.stringify(milestones)}
    
    Return JSON with:
    - shouldSeekMentor (boolean)
    - reason
    - suggestedTopics (array)
    - optimalTiming
    - expectedValue`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const mentorshipAdvice = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        success: true,
        mentorshipAdvice
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error recommending mentorship:`, error);
      throw error;
    }
  }
}

export default RecommenderAgent;


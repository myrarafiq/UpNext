import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import User from '../../models/User.model.js';
import Course from '../../models/Course.model.js';
import Project from '../../models/Project.model.js';
import Certificate from '../../models/Certificate.model.js';

class EvaluatorAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'EvaluatorAgent';
  }

  /**
   * Evaluate user's overall progress toward career goals
   */
  async evaluateProgress(userId, data) {
    const { context } = data;
    
    const user = context?.user || await User.findById(userId);
    const courses = context?.courses || await Course.find({ userId });
    const projects = context?.projects || await Project.find({ userId });
    const certificates = context?.certificates || await Certificate.find({ userId });

    const systemPrompt = `You are an expert career progress evaluator. Analyze user's learning journey 
    and provide constructive feedback on their progress, strengths, areas for improvement, and recommendations.
    
    Be encouraging but honest. Focus on actionable insights.`;

    const userPrompt = `Evaluate progress for user working toward: ${user.profile?.targetRole || 'career goals'}
    
    Courses:
    - Total: ${courses.length}
    - Completed: ${courses.filter(c => c.status === 'completed').length}
    - In Progress: ${courses.filter(c => c.status === 'in_progress').length}
    
    Projects:
    - Total: ${projects.length}
    - Completed: ${projects.filter(p => p.status === 'completed').length}
    - In Progress: ${projects.filter(p => p.status === 'in_progress').length}
    
    Certificates: ${certificates.filter(c => c.verification.verified).length} verified
    
    Current Skills: ${user.skillGraph?.currentSkills?.map(s => `${s.name} (${s.level})`).join(', ')}
    Target Skills: ${user.skillGraph?.targetSkills?.map(s => s.name).join(', ')}
    
    Provide evaluation as JSON with:
    - overallScore (0-100)
    - strengths (array)
    - areasForImprovement (array)
    - recommendations (array)
    - timelineAdherence (on track/behind/ahead)
    - skillsMastery (object with skill: percentage)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const evaluation = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      console.log(`✅ ${this.name}: Evaluated progress - Score: ${evaluation.overallScore}`);

      return {
        success: true,
        evaluation,
        timestamp: new Date()
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error evaluating progress:`, error);
      throw error;
    }
  }

  /**
   * Analyze skills gap between current and target
   */
  async analyzeSkillsGap(userId, data) {
    const user = await User.findById(userId);
    
    const currentSkills = user.skillGraph?.currentSkills?.map(s => s.name) || [];
    const targetSkills = user.skillGraph?.targetSkills?.map(s => s.name) || [];
    
    const systemPrompt = `You are a skills gap analyzer. Identify missing skills, their priorities, 
    learning paths, and dependencies.`;

    const userPrompt = `Analyze skills gap:
    
    Current Skills: ${currentSkills.join(', ')}
    Target Skills: ${targetSkills.join(', ')}
    Target Role: ${user.profile?.targetRole}
    
    Return JSON with:
    - missingSkills (array with name, priority, estimatedLearningTime)
    - learningPath (ordered array showing skill acquisition sequence)
    - dependencies (which skills need others first)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const gapAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        success: true,
        gapAnalysis,
        currentSkills,
        targetSkills
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error analyzing skills gap:`, error);
      throw error;
    }
  }

  /**
   * Validate and provide feedback on project quality
   */
  async evaluateProject(userId, projectId) {
    const Project = (await import('../../models/Project.model.js')).default;
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    const systemPrompt = `You are a project quality evaluator. Assess the project's learning value, 
    portfolio impact, and provide constructive feedback.`;

    const userPrompt = `Evaluate this project:
    
    Title: ${project.title}
    Type: ${project.type}
    Category: ${project.category}
    Technologies: ${project.technologies?.join(', ')}
    Status: ${project.status}
    Progress: ${project.progress?.percentage}%
    GitHub: ${project.github?.repoUrl || 'Not linked'}
    
    Provide JSON with:
    - qualityScore (0-100)
    - learningValue (0-100)
    - portfolioImpact (0-100)
    - strengths (array)
    - improvements (array)
    - nextSteps (array)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const evaluation = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      // Update project with AI metadata
      project.aiMetadata = {
        ...project.aiMetadata,
        learningValue: evaluation.learningValue,
        portfolioImpact: evaluation.portfolioImpact
      };
      await project.save();

      return {
        success: true,
        evaluation,
        project
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error evaluating project:`, error);
      throw error;
    }
  }
}

export default EvaluatorAgent;


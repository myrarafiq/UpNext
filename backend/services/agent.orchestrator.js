import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import PlannerAgent from './agents/planner.agent.js';
import EvaluatorAgent from './agents/evaluator.agent.js';
import RecommenderAgent from './agents/recommender.agent.js';
import ReminderAgent from './agents/reminder.agent.js';
import GitHubProjectAgent from './agents/github.project.agent.js';
import CVGeneratorAgent from './agents/cv.generator.agent.js';

class AgentOrchestrator {
  constructor() {
    this.llm = null;
    this.agents = {};
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize LLM
      this.llm = new ChatOpenAI({
        modelName: 'gpt-4o',
        temperature: 0.7,
        openAIApiKey: process.env.OPENAI_API_KEY
      });

      // Initialize specialized agents
      this.agents = {
        planner: new PlannerAgent(this.llm),
        evaluator: new EvaluatorAgent(this.llm),
        recommender: new RecommenderAgent(this.llm),
        reminder: new ReminderAgent(this.llm),
        github: new GitHubProjectAgent(this.llm),
        cvGenerator: new CVGeneratorAgent(this.llm)
      };

      this.initialized = true;
      console.log('✅ Agent orchestrator initialized with 6 specialized agents');
    } catch (error) {
      console.error('❌ Failed to initialize agent orchestrator:', error);
      throw error;
    }
  }

  /**
   * Main reasoning layer - decides which agents to invoke
   */
  async orchestrate(task, context) {
    if (!this.initialized) {
      await this.initialize();
    }

    const { type, userId, data } = task;
    
    console.log(`🤖 Orchestrating task: ${type} for user: ${userId}`);

    try {
      switch (type) {
        case 'generate_timeline':
          return await this.agents.planner.generateTimeline(userId, data);

        case 'evaluate_progress':
          return await this.agents.evaluator.evaluateProgress(userId, data);

        case 'recommend_next_steps':
          return await this.agents.recommender.recommendNextSteps(userId, data);

        case 'schedule_reminders':
          return await this.agents.reminder.scheduleReminders(userId, data);

        case 'scaffold_project':
          return await this.agents.github.scaffoldProject(userId, data);

        case 'generate_cv':
          return await this.agents.cvGenerator.generateCV(userId, data);

        case 'update_cv':
          return await this.agents.cvGenerator.updateCV(userId, data);

        case 'optimize_cv_ats':
          return await this.agents.cvGenerator.optimizeForATS(userId, data);

        case 'analyze_skills_gap':
          return await this.agents.evaluator.analyzeSkillsGap(userId, data);

        case 'suggest_courses':
          return await this.agents.recommender.suggestCourses(userId, data);

        case 'suggest_projects':
          return await this.agents.recommender.suggestProjects(userId, data);

        default:
          throw new Error(`Unknown task type: ${type}`);
      }
    } catch (error) {
      console.error(`❌ Error orchestrating task ${type}:`, error);
      throw error;
    }
  }

  /**
   * Multi-agent collaboration for complex tasks
   */
  async collaborativeReasoning(userId, goal) {
    const context = await this.gatherUserContext(userId);
    
    // Step 1: Planner creates roadmap
    const timeline = await this.agents.planner.generateTimeline(userId, {
      careerGoal: goal,
      context
    });

    // Step 2: Recommender suggests resources
    const recommendations = await this.agents.recommender.recommendNextSteps(userId, {
      timeline,
      context
    });

    // Step 3: Evaluator validates plan
    const evaluation = await this.agents.evaluator.evaluateProgress(userId, {
      timeline,
      recommendations,
      context
    });

    // Step 4: Reminder agent schedules notifications
    const reminders = await this.agents.reminder.scheduleReminders(userId, {
      timeline,
      context
    });

    return {
      timeline,
      recommendations,
      evaluation,
      reminders
    };
  }

  /**
   * Gather comprehensive user context for agents
   */
  async gatherUserContext(userId) {
    // Import models dynamically to avoid circular dependencies
    const User = (await import('../models/User.model.js')).default;
    const Timeline = (await import('../models/Timeline.model.js')).default;
    const Course = (await import('../models/Course.model.js')).default;
    const Project = (await import('../models/Project.model.js')).default;
    const Certificate = (await import('../models/Certificate.model.js')).default;

    const [user, timeline, courses, projects, certificates] = await Promise.all([
      User.findById(userId),
      Timeline.findOne({ userId, isActive: true }),
      Course.find({ userId }),
      Project.find({ userId }),
      Certificate.find({ userId })
    ]);

    return {
      user,
      timeline,
      courses,
      projects,
      certificates,
      currentSkills: user?.skillGraph?.currentSkills || [],
      targetSkills: user?.skillGraph?.targetSkills || [],
      preferences: user?.preferences || {}
    };
  }

  getAgent(agentName) {
    return this.agents[agentName];
  }
}

// Singleton instance
const orchestrator = new AgentOrchestrator();

export const initializeAgents = async () => {
  await orchestrator.initialize();
};

export const orchestrate = async (task, context) => {
  return await orchestrator.orchestrate(task, context);
};

export const collaborativeReasoning = async (userId, goal) => {
  return await orchestrator.collaborativeReasoning(userId, goal);
};

export default orchestrator;


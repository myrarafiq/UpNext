import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import CV from '../../models/CV.model.js';
import User from '../../models/User.model.js';
import Project from '../../models/Project.model.js';
import Certificate from '../../models/Certificate.model.js';
import Course from '../../models/Course.model.js';

class CVGeneratorAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'CVGeneratorAgent';
  }

  /**
   * Generate a complete, ATS-optimized CV
   */
  async generateCV(userId, data) {
    const { targetRole } = data;
    
    // Gather all user data
    const user = await User.findById(userId);
    const projects = await Project.find({ userId, status: 'completed' });
    const certificates = await Certificate.find({ userId, 'verification.verified': true });
    const courses = await Course.find({ userId, status: 'completed' });

    const systemPrompt = `You are an expert CV writer and ATS optimization specialist. Generate a 
    compelling, ATS-friendly CV that highlights achievements, uses action verbs, and quantifies impact.
    
    Follow best practices:
    - Use strong action verbs
    - Quantify achievements where possible
    - Optimize for ATS keywords based on target role
    - Keep descriptions clear and impactful
    - Highlight relevant skills and technologies`;

    const userPrompt = `Generate a comprehensive CV for:
    
    Target Role: ${targetRole}
    
    Personal Info:
    - Name: ${user.profile?.firstName} ${user.profile?.lastName}
    - Email: ${user.email}
    - Location: ${user.profile?.location}
    - Current Role: ${user.profile?.currentRole}
    - Current Company: ${user.profile?.currentCompany}
    
    Skills: ${user.skillGraph?.currentSkills?.map(s => s.name).join(', ')}
    
    LinkedIn Experience: ${JSON.stringify(user.integrations?.linkedin?.experiences || [])}
    LinkedIn Education: ${JSON.stringify(user.integrations?.linkedin?.education || [])}
    
    Completed Projects: ${projects.map(p => `${p.title} (${p.technologies?.join(', ')})`).join('; ')}
    
    Certificates: ${certificates.map(c => `${c.title} from ${c.issuer}`).join('; ')}
    
    Return comprehensive JSON with complete CV structure including:
    - personalInfo (enhanced from provided data)
    - summary (compelling 2-3 sentence professional summary)
    - experience (array with detailed achievements)
    - education
    - skills (categorized)
    - projects (detailed with highlights)
    - certifications
    - atsKeywords (array of relevant keywords for ${targetRole})`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const cvContent = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      // Create CV in database
      const cv = new CV({
        userId,
        targetRole,
        content: cvContent,
        atsOptimization: {
          keywords: cvContent.atsKeywords || [],
          lastOptimized: new Date()
        },
        aiGenerated: {
          sections: ['summary', 'experience', 'skills'],
          lastGenerated: new Date(),
          model: 'gpt-4o'
        },
        isActive: true
      });

      await cv.save();

      // Calculate ATS score
      const atsScore = await this.calculateATSScore(cv);
      cv.atsOptimization.score = atsScore.score;
      cv.atsOptimization.suggestions = atsScore.suggestions;
      await cv.save();

      console.log(`✅ ${this.name}: Generated CV with ATS score ${atsScore.score}`);

      return {
        success: true,
        cv,
        atsScore: atsScore.score
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error generating CV:`, error);
      throw error;
    }
  }

  /**
   * Update existing CV with new information
   */
  async updateCV(userId, data) {
    const { cvId, updates } = data;
    
    const cv = await CV.findOne({ _id: cvId, userId });
    
    if (!cv) {
      throw new Error('CV not found');
    }

    // Merge updates
    Object.keys(updates).forEach(section => {
      if (cv.content[section]) {
        cv.content[section] = {
          ...cv.content[section],
          ...updates[section]
        };
      }
    });

    cv.updatedAt = new Date();
    
    // Recalculate ATS score
    const atsScore = await this.calculateATSScore(cv);
    cv.atsOptimization.score = atsScore.score;
    cv.atsOptimization.suggestions = atsScore.suggestions;
    cv.atsOptimization.lastOptimized = new Date();

    await cv.save();

    return {
      success: true,
      cv,
      atsScore: atsScore.score
    };
  }

  /**
   * Optimize CV for ATS
   */
  async optimizeForATS(userId, data) {
    const { cvId, jobDescription } = data;
    
    const cv = await CV.findOne({ _id: cvId, userId });
    
    if (!cv) {
      throw new Error('CV not found');
    }

    const systemPrompt = `You are an ATS optimization expert. Analyze the CV against the job description 
    and provide specific recommendations to improve ATS compatibility and keyword matching.`;

    const userPrompt = `Optimize CV for ATS:
    
    Target Role: ${cv.targetRole}
    Current ATS Score: ${cv.atsOptimization?.score || 0}
    
    ${jobDescription ? `Job Description:\n${jobDescription}\n\n` : ''}
    
    Current CV Summary: ${cv.content?.summary}
    Current Skills: ${cv.content?.skills?.map(s => s.items).flat().join(', ')}
    
    Return JSON with:
    - score (0-100)
    - matchedKeywords (array)
    - missingKeywords (array)
    - suggestions (array of specific improvements)
    - optimizedSummary (improved version)
    - additionalSkills (array of relevant skills to add)`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const optimization = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      cv.atsOptimization = {
        score: optimization.score || cv.atsOptimization.score,
        keywords: [...new Set([...(cv.atsOptimization.keywords || []), ...(optimization.matchedKeywords || [])])],
        suggestions: optimization.suggestions || [],
        lastOptimized: new Date()
      };

      await cv.save();

      return {
        success: true,
        optimization,
        cv
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error optimizing for ATS:`, error);
      throw error;
    }
  }

  /**
   * Calculate ATS score based on CV content
   */
  async calculateATSScore(cv) {
    let score = 0;
    const suggestions = [];

    // Check for complete sections
    if (cv.content?.personalInfo?.fullName) score += 10;
    if (cv.content?.personalInfo?.email) score += 5;
    if (cv.content?.personalInfo?.phone) score += 5;
    
    if (cv.content?.summary && cv.content.summary.length > 50) score += 15;
    else suggestions.push('Add a compelling professional summary (2-3 sentences)');

    if (cv.content?.experience && cv.content.experience.length > 0) score += 20;
    else suggestions.push('Add work experience with quantified achievements');

    if (cv.content?.skills && cv.content.skills.length > 0) score += 15;
    else suggestions.push('List relevant technical and soft skills');

    if (cv.content?.projects && cv.content.projects.length > 0) score += 15;
    else suggestions.push('Include portfolio projects with technologies used');

    if (cv.content?.certifications && cv.content.certifications.length > 0) score += 10;
    else suggestions.push('Add relevant certifications to strengthen your profile');

    if (cv.content?.education && cv.content.education.length > 0) score += 10;
    else suggestions.push('Include educational background');

    // Check for ATS-friendly formatting
    const hasKeywords = cv.atsOptimization?.keywords && cv.atsOptimization.keywords.length > 5;
    if (hasKeywords) score += 10;
    else suggestions.push('Include more role-specific keywords');

    return {
      score: Math.min(score, 100),
      suggestions
    };
  }
}

export default CVGeneratorAgent;


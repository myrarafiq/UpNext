import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { Octokit } from '@octokit/rest';
import Project from '../../models/Project.model.js';
import User from '../../models/User.model.js';

class GitHubProjectAgent {
  constructor(llm) {
    this.llm = llm;
    this.name = 'GitHubProjectAgent';
  }

  /**
   * Scaffold a new GitHub project repository with starter code and milestones
   */
  async scaffoldProject(userId, data) {
    const { projectId, projectTitle, technologies, description } = data;
    
    const user = await User.findById(userId);
    
    if (!user.integrations?.github?.accessToken) {
      return {
        success: false,
        message: 'GitHub not connected. Please connect your GitHub account first.'
      };
    }

    try {
      const octokit = new Octokit({
        auth: user.integrations.github.accessToken
      });

      // Generate project structure using AI
      const scaffoldPlan = await this.generateScaffoldPlan(projectTitle, technologies, description);

      // Create repository
      const repoName = this.sanitizeRepoName(projectTitle);
      const repo = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: description || `Project: ${projectTitle}`,
        private: false,
        auto_init: true
      });

      // Create README.md
      await octokit.repos.createOrUpdateFileContents({
        owner: user.integrations.github.username,
        repo: repoName,
        path: 'README.md',
        message: 'Initial commit: Project scaffold',
        content: Buffer.from(scaffoldPlan.readme).toString('base64')
      });

      // Create project structure files
      for (const file of scaffoldPlan.files) {
        await octokit.repos.createOrUpdateFileContents({
          owner: user.integrations.github.username,
          repo: repoName,
          path: file.path,
          message: `Add ${file.path}`,
          content: Buffer.from(file.content).toString('base64')
        });
      }

      // Create GitHub Issues for milestones
      for (const milestone of scaffoldPlan.milestones) {
        await octokit.issues.create({
          owner: user.integrations.github.username,
          repo: repoName,
          title: milestone.title,
          body: milestone.description,
          labels: ['milestone', 'ai-generated']
        });
      }

      // Update project in database
      if (projectId) {
        const project = await Project.findById(projectId);
        project.github = {
          repoUrl: repo.data.html_url,
          repoName: repoName,
          branch: 'main',
          scaffolded: true
        };
        project.milestones = scaffoldPlan.milestones.map(m => ({
          title: m.title,
          description: m.description,
          status: 'todo'
        }));
        await project.save();
      }

      console.log(`✅ ${this.name}: Scaffolded project "${projectTitle}" at ${repo.data.html_url}`);

      return {
        success: true,
        repoUrl: repo.data.html_url,
        repoName: repoName,
        milestones: scaffoldPlan.milestones.length
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error scaffolding project:`, error);
      
      if (error.status === 401) {
        return {
          success: false,
          message: 'GitHub token expired. Please reconnect your GitHub account.'
        };
      }
      
      throw error;
    }
  }

  /**
   * Generate scaffold plan using AI
   */
  async generateScaffoldPlan(projectTitle, technologies, description) {
    const systemPrompt = `You are an expert software architect. Generate a complete project scaffold 
    including README, starter files, folder structure, and milestone tasks.`;

    const userPrompt = `Generate a project scaffold for:
    
    Title: ${projectTitle}
    Technologies: ${technologies.join(', ')}
    Description: ${description}
    
    Return JSON with:
    - readme (markdown content with setup instructions, features, tech stack)
    - files (array with path, content for starter files like .gitignore, package.json, main code files)
    - milestones (array with title, description, estimatedHours for GitHub issues)
    
    Include practical starter code and clear next steps.`;

    try {
      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
      ]);

      const content = response.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const plan = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        readme: plan.readme || `# ${projectTitle}\n\n${description}`,
        files: plan.files || [],
        milestones: plan.milestones || []
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error generating scaffold plan:`, error);
      // Return basic scaffold
      return {
        readme: `# ${projectTitle}\n\n${description}\n\n## Technologies\n${technologies.join(', ')}`,
        files: [],
        milestones: []
      };
    }
  }

  /**
   * Sync GitHub repository data
   */
  async syncGitHubRepo(userId, repoName) {
    const user = await User.findById(userId);
    
    if (!user.integrations?.github?.accessToken) {
      throw new Error('GitHub not connected');
    }

    try {
      const octokit = new Octokit({
        auth: user.integrations.github.accessToken
      });

      const owner = user.integrations.github.username;
      
      // Get repo data
      const repo = await octokit.repos.get({ owner, repo: repoName });
      
      // Get commits
      const commits = await octokit.repos.listCommits({ owner, repo: repoName });
      
      // Get languages
      const languages = await octokit.repos.listLanguages({ owner, repo: repoName });

      return {
        stars: repo.data.stargazers_count,
        forks: repo.data.forks_count,
        commits: commits.data.length,
        lastCommitDate: commits.data[0]?.commit?.author?.date,
        languages: Object.keys(languages.data)
      };
    } catch (error) {
      console.error(`❌ ${this.name}: Error syncing GitHub repo:`, error);
      throw error;
    }
  }

  /**
   * Helper methods
   */
  sanitizeRepoName(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100);
  }
}

export default GitHubProjectAgent;


/**
 * API client for backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(email, password, firstName, lastName) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  logout() {
    this.setToken(null);
  }

  // User
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(updates) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updateSkills(currentSkills, targetSkills) {
    return this.request('/users/skills', {
      method: 'PUT',
      body: JSON.stringify({ currentSkills, targetSkills }),
    });
  }

  async getGamification() {
    return this.request('/users/gamification');
  }

  async updateStreak() {
    return this.request('/users/gamification/streak', { method: 'POST' });
  }

  // Timeline
  async generateTimeline(careerGoal) {
    return this.request('/timeline/generate', {
      method: 'POST',
      body: JSON.stringify({ careerGoal }),
    });
  }

  async getTimeline() {
    return this.request('/timeline');
  }

  async updateMilestone(milestoneId, updates) {
    return this.request(`/timeline/milestone/${milestoneId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async addMilestone(milestone) {
    return this.request('/timeline/milestone', {
      method: 'POST',
      body: JSON.stringify(milestone),
    });
  }

  // Projects
  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async getProjects(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/projects?${params}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async updateProject(id, updates) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async scaffoldProject(id) {
    return this.request(`/projects/${id}/scaffold`, { method: 'POST' });
  }

  async updateProjectMilestone(projectId, milestoneIndex, updates) {
    return this.request(`/projects/${projectId}/milestone/${milestoneIndex}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Courses
  async createCourse(courseData) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async getCourses(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/courses?${params}`);
  }

  async updateCourseProgress(id, progress) {
    return this.request(`/courses/${id}/progress`, {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  }

  async uploadCourseCertificate(id, certificateData) {
    return this.request(`/courses/${id}/certificate`, {
      method: 'POST',
      body: JSON.stringify(certificateData),
    });
  }

  async suggestCourses(targetSkills, difficulty) {
    return this.request('/courses/suggest', {
      method: 'POST',
      body: JSON.stringify({ targetSkills, difficulty }),
    });
  }

  // CV
  async generateCV(targetRole) {
    return this.request('/cv/generate', {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    });
  }

  async getCVs() {
    return this.request('/cv');
  }

  async getCV(id) {
    return this.request(`/cv/${id}`);
  }

  async updateCV(id, updates) {
    return this.request(`/cv/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ updates }),
    });
  }

  async optimizeCV(id, jobDescription) {
    return this.request(`/cv/${id}/optimize`, {
      method: 'POST',
      body: JSON.stringify({ jobDescription }),
    });
  }

  // Agents
  async evaluateProgress() {
    return this.request('/agents/evaluate', { method: 'POST' });
  }

  async getRecommendations() {
    return this.request('/agents/recommend', { method: 'POST' });
  }

  async analyzeSkillsGap() {
    return this.request('/agents/skills-gap', { method: 'POST' });
  }

  async suggestProjects(skills, type, complexity) {
    return this.request('/agents/suggest-projects', {
      method: 'POST',
      body: JSON.stringify({ skills, type, complexity }),
    });
  }

  async collaborativeReasoning(goal) {
    return this.request('/agents/collaborate', {
      method: 'POST',
      body: JSON.stringify({ goal }),
    });
  }

  // Notifications
  async getNotifications(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/notifications?${params}`);
  }

  async getUnreadCount() {
    return this.request('/notifications/unread-count');
  }

  async markAsRead(id) {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }

  async markAllAsRead() {
    return this.request('/notifications/read-all', { method: 'PUT' });
  }

  // Mentors
  async getMentorshipRecommendations(currentProgress, milestones) {
    return this.request('/mentors/recommend', {
      method: 'POST',
      body: JSON.stringify({ currentProgress, milestones }),
    });
  }

  async scheduleMentorSession(sessionData) {
    return this.request('/mentors/schedule', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getMentorSuggestions() {
    return this.request('/mentors/suggestions');
  }

  // OAuth
  async getGitHubAuthUrl() {
    return this.request('/auth/github/url');
  }

  async handleGitHubCallback(code, userId) {
    return this.request('/auth/github/callback', {
      method: 'POST',
      body: JSON.stringify({ code, userId }),
    });
  }

  async getLinkedInAuthUrl() {
    return this.request('/auth/linkedin/url');
  }

  async handleLinkedInCallback(code, userId) {
    return this.request('/auth/linkedin/callback', {
      method: 'POST',
      body: JSON.stringify({ code, userId }),
    });
  }

  async getGoogleAuthUrl() {
    return this.request('/auth/google/url');
  }

  async handleGoogleCallback(code, userId) {
    return this.request('/auth/google/callback', {
      method: 'POST',
      body: JSON.stringify({ code, userId }),
    });
  }
}

// Export singleton instance
export const api = new APIClient();
export default api;


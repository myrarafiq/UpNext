// AI Engine for generating and adapting roadmaps

const jobRoadmaps = {
  'Data Scientist': {
    beginner: [
      { skill: 'Python Basics', resources: ['Python for Everybody (Coursera)', 'Automate the Boring Stuff'], duration: '2 weeks' },
      { skill: 'Statistics & Probability', resources: ['Khan Academy Statistics', 'StatQuest YouTube'], duration: '2 weeks' },
      { skill: 'Pandas & NumPy', resources: ['Kaggle Learn', 'DataCamp Pandas'], duration: '1 week' },
      { skill: 'Data Visualization', resources: ['Matplotlib Tutorial', 'Seaborn Guide'], duration: '1 week' },
      { skill: 'SQL Basics', resources: ['SQLBolt', 'Mode SQL Tutorial'], duration: '1 week' },
      { skill: 'Basic Machine Learning', resources: ['Andrew Ng ML Course', 'Scikit-learn Docs'], duration: '3 weeks' },
    ],
    intermediate: [
      { skill: 'Advanced Python', resources: ['Real Python', 'Python Design Patterns'], duration: '2 weeks' },
      { skill: 'Machine Learning Algorithms', resources: ['Hands-On ML Book', 'Fast.ai'], duration: '3 weeks' },
      { skill: 'Deep Learning Basics', resources: ['Deep Learning Specialization', 'PyTorch Tutorials'], duration: '3 weeks' },
      { skill: 'Feature Engineering', resources: ['Kaggle Feature Engineering', 'Applied ML'], duration: '2 weeks' },
      { skill: 'Model Deployment', resources: ['Flask API Tutorial', 'Docker Basics'], duration: '2 weeks' },
    ],
    advanced: [
      { skill: 'Advanced Deep Learning', resources: ['Fast.ai Part 2', 'Papers with Code'], duration: '4 weeks' },
      { skill: 'MLOps', resources: ['MLflow', 'Kubeflow'], duration: '3 weeks' },
      { skill: 'Big Data Tools', resources: ['Spark Tutorial', 'Hadoop Basics'], duration: '3 weeks' },
      { skill: 'Research Papers', resources: ['arXiv', 'Distill.pub'], duration: 'Ongoing' },
    ]
  },
  'Full Stack Developer': {
    beginner: [
      { skill: 'HTML & CSS', resources: ['freeCodeCamp', 'MDN Web Docs'], duration: '2 weeks' },
      { skill: 'JavaScript Basics', resources: ['JavaScript.info', 'Eloquent JavaScript'], duration: '3 weeks' },
      { skill: 'Git & GitHub', resources: ['Git Handbook', 'GitHub Learning Lab'], duration: '1 week' },
      { skill: 'React Basics', resources: ['React Docs', 'React Tutorial'], duration: '2 weeks' },
      { skill: 'Node.js & Express', resources: ['Node.js Docs', 'Express Tutorial'], duration: '2 weeks' },
      { skill: 'Database Basics', resources: ['MongoDB University', 'PostgreSQL Tutorial'], duration: '2 weeks' },
    ],
    intermediate: [
      { skill: 'Advanced React', resources: ['React Patterns', 'State Management'], duration: '2 weeks' },
      { skill: 'RESTful APIs', resources: ['REST API Design', 'API Best Practices'], duration: '2 weeks' },
      { skill: 'Authentication', resources: ['JWT Tutorial', 'OAuth Guide'], duration: '1 week' },
      { skill: 'Testing', resources: ['Jest Docs', 'Testing Library'], duration: '2 weeks' },
      { skill: 'Deployment', resources: ['Vercel', 'Heroku', 'AWS Basics'], duration: '2 weeks' },
    ],
    advanced: [
      { skill: 'Microservices', resources: ['Microservices Pattern', 'Docker & Kubernetes'], duration: '4 weeks' },
      { skill: 'System Design', resources: ['System Design Primer', 'Designing Data-Intensive Apps'], duration: '4 weeks' },
      { skill: 'Performance Optimization', resources: ['Web Performance', 'Chrome DevTools'], duration: '2 weeks' },
      { skill: 'CI/CD', resources: ['GitHub Actions', 'Jenkins'], duration: '2 weeks' },
    ]
  },
  'Software Engineer': {
    beginner: [
      { skill: 'Programming Fundamentals', resources: ['CS50', 'Programming Basics'], duration: '3 weeks' },
      { skill: 'Data Structures', resources: ['Algorithms Course', 'LeetCode Easy'], duration: '3 weeks' },
      { skill: 'Object-Oriented Programming', resources: ['OOP Principles', 'Design Basics'], duration: '2 weeks' },
      { skill: 'Version Control', resources: ['Git Tutorial', 'GitHub Workflow'], duration: '1 week' },
      { skill: 'Basic Web Development', resources: ['Web Dev Basics', 'HTTP Protocol'], duration: '2 weeks' },
    ],
    intermediate: [
      { skill: 'Algorithms', resources: ['CLRS Book', 'LeetCode Medium'], duration: '4 weeks' },
      { skill: 'System Design Basics', resources: ['Scalability', 'Database Design'], duration: '3 weeks' },
      { skill: 'Testing & Debugging', resources: ['Unit Testing', 'Debugging Techniques'], duration: '2 weeks' },
      { skill: 'APIs & Microservices', resources: ['API Design', 'Microservices'], duration: '3 weeks' },
      { skill: 'Cloud Platforms', resources: ['AWS/GCP/Azure Basics'], duration: '2 weeks' },
    ],
    advanced: [
      { skill: 'Advanced Algorithms', resources: ['Competitive Programming', 'LeetCode Hard'], duration: '4 weeks' },
      { skill: 'Distributed Systems', resources: ['MIT 6.824', 'Distributed Computing'], duration: '6 weeks' },
      { skill: 'Security', resources: ['OWASP', 'Security Best Practices'], duration: '3 weeks' },
      { skill: 'Performance Engineering', resources: ['Profiling', 'Optimization'], duration: '3 weeks' },
    ]
  }
};

export const generateRoadmap = (targetJob, currentLevel) => {
  const jobData = jobRoadmaps[targetJob] || jobRoadmaps['Software Engineer'];
  const levelData = jobData[currentLevel.toLowerCase()] || jobData.beginner;

  return levelData.map((item, index) => ({
    id: `task-${Date.now()}-${index}`,
    title: item.skill,
    description: `Master ${item.skill} to advance your career as a ${targetJob}`,
    resources: item.resources,
    duration: item.duration,
    status: index === 0 ? 'in-progress' : 'pending',
    type: 'learning',
    category: determineCategory(item.skill)
  }));
};

export const adaptRoadmap = (currentRoadmap, completedTaskId, understanding) => {
  const taskIndex = currentRoadmap.findIndex(t => t.id === completedTaskId);
  if (taskIndex === -1) return currentRoadmap;

  const completedTask = currentRoadmap[taskIndex];
  let newRoadmap = [...currentRoadmap];

  // Mark task as completed
  newRoadmap[taskIndex] = { ...completedTask, status: 'completed' };

  // If understanding is low, add a reinforcement task
  if (understanding <= 2) {
    const reinforcementTask = {
      id: `task-${Date.now()}-reinforcement`,
      title: `Practice: ${completedTask.title}`,
      description: `Additional practice project to reinforce ${completedTask.title}`,
      resources: [`${completedTask.title} Practice Problems`, 'Mini Project Ideas'],
      duration: '1 week',
      status: 'pending',
      type: 'reinforcement',
      category: completedTask.category,
      isAdded: true
    };
    
    // Insert after the completed task
    newRoadmap.splice(taskIndex + 1, 0, reinforcementTask);
  }

  // Set next task to in-progress
  const nextPendingIndex = newRoadmap.findIndex(t => t.status === 'pending');
  if (nextPendingIndex !== -1) {
    newRoadmap[nextPendingIndex] = { ...newRoadmap[nextPendingIndex], status: 'in-progress' };
  }

  // If understanding is high (4-5), optionally suggest advanced topics
  if (understanding >= 4 && taskIndex < newRoadmap.length - 1) {
    // Add an advanced challenge
    const advancedTask = {
      id: `task-${Date.now()}-advanced`,
      title: `Advanced: ${completedTask.title}`,
      description: `Take your ${completedTask.title} skills to the next level`,
      resources: ['Advanced tutorials', 'Expert-level projects'],
      duration: '2 weeks',
      status: 'optional',
      type: 'advanced',
      category: completedTask.category,
      isAdded: true
    };
    
    // Add to the end of similar category tasks
    const lastSimilarIndex = newRoadmap.reduce((lastIndex, task, index) => {
      return task.category === completedTask.category ? index : lastIndex;
    }, taskIndex);
    
    newRoadmap.splice(lastSimilarIndex + 1, 0, advancedTask);
  }

  return newRoadmap;
};

const determineCategory = (skill) => {
  const categories = {
    'Python': 'Programming',
    'JavaScript': 'Programming',
    'HTML': 'Frontend',
    'CSS': 'Frontend',
    'React': 'Frontend',
    'Node': 'Backend',
    'Express': 'Backend',
    'Database': 'Backend',
    'SQL': 'Backend',
    'MongoDB': 'Backend',
    'Machine Learning': 'AI/ML',
    'Deep Learning': 'AI/ML',
    'Data': 'Data Science',
    'Statistics': 'Data Science',
    'Git': 'Tools',
    'Docker': 'DevOps',
    'Testing': 'Quality',
    'API': 'Backend',
    'System Design': 'Architecture'
  };

  for (const [key, category] of Object.entries(categories)) {
    if (skill.includes(key)) return category;
  }
  
  return 'General';
};

export const generateProjectIdeas = (skill, level) => {
  const projects = {
    'Python Basics': [
      'CLI Todo List App',
      'Password Generator',
      'Web Scraper for News Headlines',
      'Expense Tracker'
    ],
    'React Basics': [
      'Weather Dashboard',
      'Task Management App',
      'Recipe Finder',
      'Movie Search App'
    ],
    'Machine Learning': [
      'House Price Predictor',
      'Customer Churn Analysis',
      'Sentiment Analysis Tool',
      'Image Classifier'
    ],
    'Node.js & Express': [
      'RESTful Blog API',
      'Authentication System',
      'Real-time Chat App',
      'E-commerce Backend'
    ]
  };

  return projects[skill] || ['Custom Project in ' + skill];
};


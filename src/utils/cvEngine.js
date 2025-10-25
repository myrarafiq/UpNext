// AI CV Generation Engine

export const generateATSOptimizedCV = ({ userData, completedTasks, projects, linkedInData, githubData }) => {
  // Extract skills from completed tasks
  const skills = completedTasks.map(task => task.title);
  
  // Generate professional summary
  const summary = generateProfessionalSummary(userData, completedTasks, projects);
  
  // Format projects for CV
  const formattedProjects = projects.map(project => ({
    name: project.name,
    technologies: project.skill,
    achievements: [
      `Developed ${project.name} to demonstrate ${project.skill} proficiency`,
      `Implemented modern development practices and best practices`,
      `Created comprehensive documentation and project structure`
    ]
  }));

  // Generate education section
  const education = [
    {
      degree: `${userData.currentLevel} Level - ${userData.targetJob} Track`,
      institution: 'UpNext Career Development Program',
      date: new Date().getFullYear()
    }
  ];

  // Add completed certifications
  completedTasks.forEach(task => {
    if (task.understanding >= 4) {
      education.push({
        degree: `${task.title} Certification`,
        institution: 'Self-paced learning',
        date: new Date(task.completedAt).getFullYear()
      });
    }
  });

  return {
    name: userData.name,
    title: `Aspiring ${userData.targetJob}`,
    email: 'your.email@example.com',
    phone: '(555) 123-4567',
    location: 'Your City, State',
    linkedin: linkedInData?.url || 'linkedin.com/in/yourprofile',
    github: githubData?.url || 'github.com/yourusername',
    summary,
    skills: [...new Set(skills)], // Remove duplicates
    projects: formattedProjects,
    education
  };
};

const generateProfessionalSummary = (userData, completedTasks, projects) => {
  const skillCount = completedTasks.length;
  const projectCount = projects.length;
  
  return `Motivated ${userData.currentLevel.toLowerCase()}-level ${userData.targetJob} with hands-on experience in ${skillCount} technical skills and ${projectCount} completed projects. Demonstrated ability to learn quickly, adapt to new technologies, and deliver practical solutions. Strong foundation in modern development practices with a commitment to continuous learning and professional growth. Seeking opportunities to apply technical skills in a dynamic environment.`;
};

export const analyzeCV = (cvData) => {
  // Calculate ATS score based on various factors
  let score = 60; // Base score
  
  // Check for key components
  if (cvData.summary && cvData.summary.length > 100) score += 10;
  if (cvData.skills && cvData.skills.length >= 5) score += 10;
  if (cvData.projects && cvData.projects.length >= 2) score += 10;
  if (cvData.linkedin) score += 5;
  if (cvData.github) score += 5;
  
  const strengths = [];
  const improvements = [];
  
  // Analyze strengths
  if (cvData.skills.length >= 8) {
    strengths.push('Strong technical skill set with diverse experience');
  }
  if (cvData.projects.length >= 3) {
    strengths.push('Multiple completed projects demonstrating practical experience');
  }
  if (cvData.summary.length >= 150) {
    strengths.push('Comprehensive professional summary');
  }
  if (cvData.linkedin && cvData.github) {
    strengths.push('Complete online presence with LinkedIn and GitHub profiles');
  }
  
  // Suggest improvements
  if (cvData.skills.length < 5) {
    improvements.push('Add more technical skills to strengthen your profile');
  }
  if (cvData.projects.length < 3) {
    improvements.push('Complete more projects to showcase diverse capabilities');
  }
  if (!cvData.linkedin || !cvData.github) {
    improvements.push('Link your LinkedIn and GitHub profiles for better visibility');
  }
  if (cvData.summary.length < 100) {
    improvements.push('Expand your professional summary with more specific achievements');
  }
  
  // Default suggestions if everything looks good
  if (improvements.length === 0) {
    improvements.push('Consider adding quantifiable metrics to project descriptions');
    improvements.push('Include any relevant certifications or courses');
    improvements.push('Tailor your CV for specific job applications');
  }
  
  if (strengths.length === 0) {
    strengths.push('Solid foundation with room for growth');
    strengths.push('Clear career direction as ' + cvData.title);
  }
  
  return {
    atsScore: Math.min(score, 98), // Cap at 98%
    strengths,
    improvements
  };
};

export const optimizeForJob = (cvData, jobDescription) => {
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // Analyze CV against job requirements
  const matchingSkills = cvData.skills.filter(skill => 
    keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
  );
  
  return {
    matchPercentage: (matchingSkills.length / keywords.length) * 100,
    matchingSkills,
    missingSkills: keywords.filter(keyword => 
      !cvData.skills.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
    ),
    suggestions: generateJobMatchSuggestions(matchingSkills, keywords)
  };
};

const extractKeywords = (jobDescription) => {
  // Simple keyword extraction - in production, use NLP
  const commonSkills = [
    'python', 'javascript', 'react', 'node', 'sql', 'mongodb',
    'machine learning', 'data science', 'aws', 'docker', 'kubernetes',
    'git', 'agile', 'api', 'testing', 'ci/cd'
  ];
  
  return commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill)
  );
};

const generateJobMatchSuggestions = (matchingSkills, allKeywords) => {
  const matchRate = matchingSkills.length / allKeywords.length;
  
  if (matchRate >= 0.7) {
    return [
      'Excellent match! Highlight these skills prominently in your CV',
      'Consider adding specific examples of how you\'ve used these skills'
    ];
  } else if (matchRate >= 0.4) {
    return [
      'Good foundation, but consider learning the missing skills',
      'Emphasize transferable skills and willingness to learn'
    ];
  } else {
    return [
      'This role may require additional skill development',
      'Focus on building projects in the missing skill areas',
      'Consider entry-level or junior positions as stepping stones'
    ];
  }
};


/**
 * Aisha's 6-Week Learning Journey Simulation
 * Student aspiring to become a Data Analyst at Google
 */

export const aishaProfile = {
  name: "Aisha Rahman",
  targetRole: "Data Analyst",
  targetCompany: "Google",
  currentLevel: "intermediate",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  email: "aisha.rahman@email.com",
  location: "Toronto, Canada",
  currentSkills: [
    { name: "Python", level: 65, category: "Programming" },
    { name: "Excel", level: 80, category: "Tools" },
    { name: "Basic SQL", level: 55, category: "Database" },
  ],
  targetSkills: [
    "Advanced SQL",
    "Data Visualization",
    "Statistical Analysis",
    "Machine Learning Basics",
    "Tableau",
    "Power BI"
  ],
  preferences: {
    studyHoursPerWeek: 15,
    preferredTimes: ["evening", "weekend"],
    notificationChannels: ["email", "push"]
  }
};

export const weeklyProgress = [
  // Week 1
  {
    week: 1,
    date: "Dec 1-7, 2024",
    jobReadiness: 35,
    coursesCompleted: [
      {
        id: "c1",
        title: "SQL for Data Analysis",
        platform: "Coursera",
        instructor: "UC Davis",
        duration: "12 hours",
        completionDate: "Dec 5, 2024",
        performance: 92,
        skillsGained: ["SQL Queries", "Data Filtering", "Joins"],
        certificateUrl: "https://coursera.org/cert/abc123",
        logo: "🎓"
      }
    ],
    projectsCreated: [
      {
        id: "p1",
        title: "Coffee Shop Sales Analysis",
        description: "SQL-based analysis of retail sales data with complex queries and aggregations",
        type: "tech",
        category: "data_analysis",
        technologies: ["SQL", "PostgreSQL"],
        progress: 100,
        githubUrl: "https://github.com/aisha/coffee-sales-sql",
        status: "completed",
        aiScaffolded: true,
        completedDate: "Dec 7, 2024",
        highlights: [
          "Analyzed 10k+ transactions",
          "Created 15+ complex queries",
          "Generated insights on peak hours"
        ]
      }
    ],
    aiRecommendations: [
      {
        type: "course",
        title: "Data Visualization with Python",
        platform: "Udemy",
        reason: "Build on SQL skills with visualization",
        priority: "high"
      }
    ],
    aiNudge: "Great start, Aisha! Your SQL skills improved by 25%. Let's add visualization next!",
    studyHours: 16,
    tasksCompleted: 12,
    streak: 7
  },
  
  // Week 2
  {
    week: 2,
    date: "Dec 8-14, 2024",
    jobReadiness: 45,
    coursesCompleted: [
      {
        id: "c2",
        title: "Data Visualization with Matplotlib & Seaborn",
        platform: "Udemy",
        instructor: "Jose Portilla",
        duration: "8 hours",
        completionDate: "Dec 12, 2024",
        performance: 88,
        skillsGained: ["Matplotlib", "Seaborn", "Data Viz Best Practices"],
        certificateUrl: "https://udemy.com/cert/xyz789",
        logo: "📊"
      }
    ],
    projectsCreated: [
      {
        id: "p2",
        title: "COVID-19 Trends Dashboard",
        description: "Interactive visualizations of global COVID-19 data using Python libraries",
        type: "tech",
        category: "data_visualization",
        technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        progress: 85,
        githubUrl: "https://github.com/aisha/covid-dashboard",
        status: "in_progress",
        aiScaffolded: true,
        highlights: [
          "10+ interactive charts",
          "Time-series analysis",
          "Regional comparisons"
        ]
      }
    ],
    aiRecommendations: [
      {
        type: "course",
        title: "Statistics for Data Science",
        platform: "Coursera",
        reason: "Essential for data analysis roles at top companies",
        priority: "high"
      },
      {
        type: "project",
        title: "Customer Segmentation Analysis",
        reason: "Apply stats and clustering techniques",
        priority: "medium"
      }
    ],
    aiNudge: "You're 85% done with your COVID dashboard. Finish it this weekend to boost your portfolio!",
    studyHours: 14,
    tasksCompleted: 10,
    streak: 13,
    aiAdjustment: "Performance strong - added advanced statistics module"
  },
  
  // Week 3
  {
    week: 3,
    date: "Dec 15-21, 2024",
    jobReadiness: 58,
    coursesCompleted: [
      {
        id: "c3",
        title: "Statistics for Data Science and Business Analysis",
        platform: "Udemy",
        instructor: "365 Careers",
        duration: "10 hours",
        completionDate: "Dec 18, 2024",
        performance: 95,
        skillsGained: ["Hypothesis Testing", "Regression", "Probability"],
        certificateUrl: "https://udemy.com/cert/stat123",
        logo: "📈"
      },
      {
        id: "c4",
        title: "Excel to Python for Data Analysis",
        platform: "YouTube",
        instructor: "freeCodeCamp",
        duration: "4 hours",
        completionDate: "Dec 20, 2024",
        performance: 90,
        skillsGained: ["Pandas", "Data Manipulation", "Excel Automation"],
        logo: "🐍"
      }
    ],
    projectsCreated: [
      {
        id: "p3",
        title: "E-commerce Customer Segmentation",
        description: "K-means clustering analysis to identify customer segments and behaviors",
        type: "tech",
        category: "machine_learning",
        technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
        progress: 70,
        githubUrl: "https://github.com/aisha/customer-segmentation",
        status: "in_progress",
        aiScaffolded: true,
        highlights: [
          "Analyzed 5k customer records",
          "Identified 4 distinct segments",
          "Created recommendation system"
        ]
      }
    ],
    aiRecommendations: [
      {
        type: "course",
        title: "Tableau Desktop Specialist",
        platform: "Coursera",
        reason: "Tableau is required for most Data Analyst roles",
        priority: "critical"
      }
    ],
    aiNudge: "Impressive progress! You're ahead of schedule. Ready for Tableau?",
    studyHours: 18,
    tasksCompleted: 15,
    streak: 20,
    aiAdjustment: "Excellent performance - unlocking advanced ML module early"
  },
  
  // Week 4
  {
    week: 4,
    date: "Dec 22-28, 2024",
    jobReadiness: 70,
    coursesCompleted: [
      {
        id: "c5",
        title: "Tableau for Data Visualization",
        platform: "Coursera",
        instructor: "UC Davis",
        duration: "15 hours",
        completionDate: "Dec 26, 2024",
        performance: 91,
        skillsGained: ["Tableau Desktop", "Dashboards", "Interactive Viz"],
        certificateUrl: "https://coursera.org/cert/tableau456",
        logo: "📊"
      }
    ],
    projectsCreated: [
      {
        id: "p4",
        title: "Financial Performance Dashboard",
        description: "Interactive Tableau dashboard tracking KPIs for a fictional fintech company",
        type: "tech",
        category: "business_intelligence",
        technologies: ["Tableau", "SQL", "Excel"],
        progress: 100,
        githubUrl: "https://github.com/aisha/fintech-dashboard",
        status: "completed",
        aiScaffolded: true,
        completedDate: "Dec 28, 2024",
        highlights: [
          "15+ interactive visualizations",
          "Real-time KPI tracking",
          "Executive summary view"
        ]
      }
    ],
    aiRecommendations: [
      {
        type: "course",
        title: "Google Data Analytics Professional Certificate",
        platform: "Coursera",
        reason: "Google credential highly valued for target company",
        priority: "critical"
      },
      {
        type: "project",
        title: "A/B Testing Analysis",
        reason: "Common interview case study at Google",
        priority: "high"
      }
    ],
    aiNudge: "You're 70% job-ready! Time to get Google-certified 🎯",
    studyHours: 20,
    tasksCompleted: 18,
    streak: 27,
    cvUpdated: true,
    aiAdjustment: "Adding Google-specific preparation modules"
  },
  
  // Week 5
  {
    week: 5,
    date: "Dec 29 - Jan 4, 2025",
    jobReadiness: 82,
    coursesCompleted: [
      {
        id: "c6",
        title: "Google Data Analytics Certificate (Part 1-3)",
        platform: "Coursera",
        instructor: "Google",
        duration: "20 hours",
        completionDate: "Jan 3, 2025",
        performance: 94,
        skillsGained: ["Data Cleaning", "Analysis Process", "R Programming"],
        certificateUrl: "https://coursera.org/cert/google-analytics",
        logo: "🔍"
      }
    ],
    projectsCreated: [
      {
        id: "p5",
        title: "A/B Testing for Product Features",
        description: "Statistical analysis of A/B test results for a mobile app feature launch",
        type: "tech",
        category: "experimentation",
        technologies: ["Python", "SciPy", "Pandas", "Statistical Testing"],
        progress: 100,
        githubUrl: "https://github.com/aisha/ab-testing-analysis",
        status: "completed",
        aiScaffolded: true,
        completedDate: "Jan 4, 2025",
        highlights: [
          "Analyzed 50k user interactions",
          "Hypothesis testing with 95% confidence",
          "Actionable recommendations"
        ]
      },
      {
        id: "p6",
        title: "Bike Share Data Analysis (Google Capstone)",
        description: "Comprehensive analysis of bike-sharing data as part of Google certification",
        type: "tech",
        category: "capstone",
        technologies: ["R", "ggplot2", "dplyr", "Tableau"],
        progress: 60,
        githubUrl: "https://github.com/aisha/bikeshare-capstone",
        status: "in_progress",
        aiScaffolded: true,
        highlights: [
          "Real-world dataset analysis",
          "Business recommendations",
          "Interactive visualizations"
        ]
      }
    ],
    aiRecommendations: [
      {
        type: "mentorship",
        title: "Book session with Data Analyst at Google",
        reason: "Get insider tips for application and interviews",
        priority: "critical"
      },
      {
        type: "course",
        title: "SQL Interview Questions",
        platform: "LeetCode",
        reason: "Prepare for technical interviews",
        priority: "high"
      }
    ],
    aiNudge: "You're crushing it! 82% ready. Time to connect with a Google mentor 🚀",
    studyHours: 22,
    tasksCompleted: 21,
    streak: 34,
    cvUpdated: true,
    aiAdjustment: "Activating interview prep mode"
  },
  
  // Week 6
  {
    week: 6,
    date: "Jan 5-11, 2025",
    jobReadiness: 92,
    coursesCompleted: [
      {
        id: "c7",
        title: "SQL Practice - 50 Interview Questions",
        platform: "LeetCode",
        instructor: "LeetCode",
        duration: "12 hours",
        completionDate: "Jan 8, 2025",
        performance: 88,
        skillsGained: ["Advanced SQL", "Query Optimization", "Window Functions"],
        logo: "💻"
      },
      {
        id: "c8",
        title: "Data Analytics Interview Prep",
        platform: "YouTube",
        instructor: "Data Interview Pro",
        duration: "6 hours",
        completionDate: "Jan 10, 2025",
        performance: 96,
        skillsGained: ["Case Studies", "Behavioral Questions", "Technical Communication"],
        logo: "🎤"
      }
    ],
    projectsCreated: [
      {
        id: "p7",
        title: "Personal Portfolio Website",
        description: "Professional portfolio showcasing all data analytics projects with interactive demos",
        type: "tech",
        category: "portfolio",
        technologies: ["React", "D3.js", "GitHub Pages"],
        progress: 100,
        githubUrl: "https://github.com/aisha/portfolio",
        liveUrl: "https://aisha-analytics.dev",
        status: "completed",
        aiScaffolded: true,
        completedDate: "Jan 11, 2025",
        highlights: [
          "Interactive project showcases",
          "Resume download",
          "Contact form with analytics"
        ]
      }
    ],
    mentorSessions: [
      {
        id: "m1",
        mentorName: "Sarah Chen",
        mentorTitle: "Senior Data Analyst at Google",
        date: "Jan 9, 2025",
        duration: "45 min",
        topics: ["Resume review", "Interview tips", "Google culture"],
        feedback: "Strong portfolio! Focus on storytelling in interviews.",
        nextSteps: ["Apply to Google", "Practice case studies", "Network on LinkedIn"]
      }
    ],
    aiRecommendations: [
      {
        type: "action",
        title: "Apply to Google Data Analyst positions",
        reason: "You're 92% ready - it's time!",
        priority: "critical"
      },
      {
        type: "action",
        title: "Update LinkedIn profile",
        reason: "Showcase new skills and certifications",
        priority: "high"
      }
    ],
    aiNudge: "🎉 Aisha, you're job-ready! Your CV scored 94% on ATS. Time to apply!",
    studyHours: 18,
    tasksCompleted: 16,
    streak: 41,
    cvUpdated: true,
    cvATSScore: 94,
    aiAdjustment: "Mission accomplished! Transitioning to job search mode",
    milestone: "READY TO APPLY"
  }
];

export const skillProgressionOverTime = [
  { week: 0, Python: 65, SQL: 55, Excel: 80, DataViz: 40, Statistics: 30, Tableau: 0, MachineLearning: 20 },
  { week: 1, Python: 68, SQL: 75, Excel: 82, DataViz: 45, Statistics: 32, Tableau: 0, MachineLearning: 22 },
  { week: 2, Python: 72, SQL: 78, Excel: 83, DataViz: 70, Statistics: 35, Tableau: 0, MachineLearning: 25 },
  { week: 3, Python: 78, SQL: 80, Excel: 85, DataViz: 75, Statistics: 65, Tableau: 0, MachineLearning: 45 },
  { week: 4, Python: 80, SQL: 82, Excel: 86, DataViz: 80, Statistics: 68, Tableau: 70, MachineLearning: 50 },
  { week: 5, Python: 85, SQL: 88, Excel: 88, DataViz: 85, Statistics: 75, Tableau: 80, MachineLearning: 60 },
  { week: 6, Python: 88, SQL: 92, Excel: 90, DataViz: 88, Statistics: 80, Tableau: 85, MachineLearning: 65 }
];

export const jobReadinessOverTime = [
  { week: 0, score: 30, label: "Starting" },
  { week: 1, score: 35, label: "Building Foundation" },
  { week: 2, score: 45, label: "Growing Skills" },
  { week: 3, score: 58, label: "Accelerating" },
  { week: 4, score: 70, label: "Advanced Learner" },
  { week: 5, score: 82, label: "Nearly Ready" },
  { week: 6, score: 92, label: "Job Ready!" }
];

export const finalCV = {
  personalInfo: {
    name: "Aisha Rahman",
    email: "aisha.rahman@email.com",
    phone: "+1 (416) 555-0123",
    location: "Toronto, ON",
    linkedin: "linkedin.com/in/aisharahman",
    github: "github.com/aisha",
    portfolio: "aisha-analytics.dev"
  },
  summary: "Data Analyst with hands-on experience in SQL, Python, Tableau, and statistical analysis. Completed 8 industry-recognized certifications including Google Data Analytics. Proven ability to transform complex datasets into actionable insights through 7 portfolio projects. Seeking to leverage analytical skills and passion for data storytelling at Google.",
  skills: {
    technical: ["Python (Pandas, NumPy, Scikit-learn)", "SQL (PostgreSQL, MySQL)", "Tableau", "Excel (Advanced)", "R", "Statistical Analysis", "Machine Learning", "Data Visualization"],
    tools: ["Git/GitHub", "Jupyter Notebooks", "Google Analytics", "Power BI"],
    soft: ["Data Storytelling", "Problem Solving", "Communication", "Collaboration"]
  },
  certifications: [
    "Google Data Analytics Professional Certificate (Coursera, 2025)",
    "SQL for Data Analysis (UC Davis, 2024)",
    "Statistics for Data Science (Udemy, 2024)",
    "Tableau Desktop Specialist (Coursera, 2024)",
    "Data Visualization with Python (Udemy, 2024)"
  ],
  projects: [
    {
      title: "Personal Portfolio Website",
      description: "Built interactive portfolio showcasing 7 data analytics projects with live demos using React and D3.js",
      technologies: ["React", "D3.js", "GitHub Pages"],
      link: "aisha-analytics.dev"
    },
    {
      title: "A/B Testing Analysis",
      description: "Conducted statistical analysis of 50k user interactions to evaluate product feature effectiveness with 95% confidence intervals",
      technologies: ["Python", "SciPy", "Pandas"],
      link: "github.com/aisha/ab-testing-analysis"
    },
    {
      title: "Financial Performance Dashboard",
      description: "Created interactive Tableau dashboard tracking 15+ KPIs for fintech company with real-time data integration",
      technologies: ["Tableau", "SQL", "Excel"],
      link: "github.com/aisha/fintech-dashboard"
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Applied K-means clustering to identify 4 customer segments from 5k records, resulting in targeted recommendations",
      technologies: ["Python", "Scikit-learn", "Matplotlib"],
      link: "github.com/aisha/customer-segmentation"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Economics",
      school: "University of Toronto",
      year: "2023",
      gpa: "3.7/4.0"
    }
  ],
  atsScore: 94,
  generatedDate: "January 11, 2025"
};


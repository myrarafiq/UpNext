import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateRoadmap, adaptRoadmap } from '../utils/aiEngine';
import { agenticAI } from '../utils/agenticAI';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    targetJob: '',
    currentLevel: '',
    skills: []
  });
  
  const [roadmap, setRoadmap] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [jobReadinessScore, setJobReadinessScore] = useState(0);
  
  // New state for enhanced features
  const [cvData, setCvData] = useState(null);
  const [linkedInData, setLinkedInData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [schedulePreferences, setSchedulePreferences] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [mentorSessions, setMentorSessions] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('upnext_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure userData has all required fields
        const loadedUserData = parsed.userData || {};
        setUserData({
          name: loadedUserData.name || '',
          targetJob: loadedUserData.targetJob || '',
          currentLevel: loadedUserData.currentLevel || '',
          skills: loadedUserData.skills || []
        });
        setRoadmap(parsed.roadmap || []);
        setCompletedTasks(parsed.completedTasks || []);
        setProjects(parsed.projects || []);
        setReminders(parsed.reminders || []);
        setJobReadinessScore(parsed.jobReadinessScore || 0);
        // Load new features
        setCvData(parsed.cvData || null);
        setLinkedInData(parsed.linkedInData || null);
        setGithubData(parsed.githubData || null);
        setCertificates(parsed.certificates || []);
        setSchedulePreferences(parsed.schedulePreferences || null);
        setNotifications(parsed.notifications || []);
        setMentorSessions(parsed.mentorSessions || []);
      } catch (error) {
        console.error('Error loading saved data:', error);
        // Clear corrupted data
        localStorage.removeItem('upnext_data');
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      userData,
      roadmap,
      completedTasks,
      projects,
      reminders,
      jobReadinessScore,
      cvData,
      linkedInData,
      githubData,
      certificates,
      schedulePreferences,
      notifications,
      mentorSessions
    };
    localStorage.setItem('upnext_data', JSON.stringify(dataToSave));
  }, [userData, roadmap, completedTasks, projects, reminders, jobReadinessScore, 
      cvData, linkedInData, githubData, certificates, schedulePreferences, notifications, mentorSessions]);

  const initializeUserData = (data) => {
    setUserData(data);
    const initialRoadmap = generateRoadmap(data.targetJob, data.currentLevel);
    setRoadmap(initialRoadmap);
    calculateJobReadiness([], initialRoadmap);
    
    // Initialize agentic AI
    agenticAI.initialize(data, initialRoadmap, [], [], []);
  };

  const completeTask = (taskId, understanding) => {
    const task = roadmap.find(t => t.id === taskId);
    if (!task) return;

    const completedTask = { ...task, completedAt: new Date(), understanding };
    setCompletedTasks([...completedTasks, completedTask]);

    // Adapt roadmap based on understanding
    const adaptedRoadmap = adaptRoadmap(roadmap, taskId, understanding);
    setRoadmap(adaptedRoadmap);

    // Update job readiness score
    calculateJobReadiness([...completedTasks, completedTask], adaptedRoadmap);

    // Create reminder for next task
    createReminder(adaptedRoadmap);
  };

  const generateProject = (skill) => {
    const newProject = {
      id: `project-${Date.now()}`,
      skill,
      name: `${skill} Portfolio Project`,
      description: `Build a real-world project to demonstrate your ${skill} skills`,
      githubUrl: `https://github.com/your-username/${skill.toLowerCase().replace(/\s+/g, '-')}-project`,
      status: 'not-started',
      createdAt: new Date()
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const calculateJobReadiness = (completed, remaining) => {
    const totalTasks = completed.length + remaining.length;
    const score = totalTasks > 0 ? Math.round((completed.length / totalTasks) * 100) : 0;
    setJobReadinessScore(score);
  };

  const createReminder = (currentRoadmap) => {
    const nextTask = currentRoadmap.find(t => t.status === 'pending');
    if (nextTask) {
      const reminder = {
        id: `reminder-${Date.now()}`,
        message: `Time to work on: ${nextTask.title}`,
        taskId: nextTask.id,
        createdAt: new Date()
      };
      setReminders([...reminders, reminder]);
    }
  };

  const dismissReminder = (reminderId) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
  };

  const updateTaskStatus = (taskId, status) => {
    setRoadmap(roadmap.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  // New functions for enhanced features
  const updateCVData = (newCVData) => {
    setCvData(newCVData);
  };

  const uploadCertificate = (certificate) => {
    setCertificates([...certificates, certificate]);
    // Add notification
    addNotification({
      title: 'Certificate Uploaded',
      message: `${certificate.name} has been added to your timeline`,
      timestamp: new Date().toLocaleString()
    });
  };

  const updateSchedulePreferences = (prefs) => {
    setSchedulePreferences(prefs);
  };

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications].slice(0, 20)); // Keep last 20
  };

  const bookMentorSession = (session) => {
    setMentorSessions([...mentorSessions, session]);
    addNotification({
      title: 'Mentor Session Booked',
      message: `Session with ${session.mentor.name} scheduled`,
      timestamp: new Date().toLocaleString()
    });
  };

  const value = {
    userData,
    roadmap,
    completedTasks,
    projects,
    reminders,
    jobReadinessScore,
    cvData,
    linkedInData,
    githubData,
    certificates,
    schedulePreferences,
    notifications,
    mentorSessions,
    initializeUserData,
    completeTask,
    generateProject,
    dismissReminder,
    updateTaskStatus,
    updateCVData,
    uploadCertificate,
    updateSchedulePreferences,
    addNotification,
    bookMentorSession
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


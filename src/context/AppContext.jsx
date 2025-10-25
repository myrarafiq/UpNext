import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateRoadmap, adaptRoadmap } from '../utils/aiEngine';

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

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('upnext_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed.userData || userData);
      setRoadmap(parsed.roadmap || []);
      setCompletedTasks(parsed.completedTasks || []);
      setProjects(parsed.projects || []);
      setReminders(parsed.reminders || []);
      setJobReadinessScore(parsed.jobReadinessScore || 0);
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
      jobReadinessScore
    };
    localStorage.setItem('upnext_data', JSON.stringify(dataToSave));
  }, [userData, roadmap, completedTasks, projects, reminders, jobReadinessScore]);

  const initializeUserData = (data) => {
    setUserData(data);
    const initialRoadmap = generateRoadmap(data.targetJob, data.currentLevel);
    setRoadmap(initialRoadmap);
    calculateJobReadiness([], initialRoadmap);
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

  const value = {
    userData,
    roadmap,
    completedTasks,
    projects,
    reminders,
    jobReadinessScore,
    initializeUserData,
    completeTask,
    generateProject,
    dismissReminder,
    updateTaskStatus
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


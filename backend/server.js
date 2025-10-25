import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cvRoutes from './routes/cv.routes.js';
import timelineRoutes from './routes/timeline.routes.js';
import projectRoutes from './routes/project.routes.js';
import courseRoutes from './routes/course.routes.js';
import agentRoutes from './routes/agent.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import mentorRoutes from './routes/mentor.routes.js';

// Import services
import { initializeAgents } from './services/agent.orchestrator.js';
import { scheduleNotifications } from './services/notification.scheduler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/mentors', mentorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/upnext');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize agents and schedulers
const initializeServices = async () => {
  try {
    await initializeAgents();
    console.log('✅ Agent orchestration system initialized');
    
    // Schedule notification checks every 5 minutes
    cron.schedule('*/5 * * * *', () => {
      scheduleNotifications();
    });
    console.log('✅ Notification scheduler started');
  } catch (error) {
    console.error('❌ Service initialization error:', error);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  await initializeServices();
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

export default app;


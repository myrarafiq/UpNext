import express from 'express';
import Course from '../models/Course.model.js';
import Certificate from '../models/Certificate.model.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate } from '../services/agent.orchestrator.js';

const router = express.Router();
router.use(authenticate);

/**
 * Create new course
 */
router.post('/', async (req, res) => {
  try {
    const course = new Course({
      userId: req.userId,
      ...req.body
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all user courses
 */
router.get('/', async (req, res) => {
  try {
    const { status, platform } = req.query;
    const filter = { userId: req.userId };
    
    if (status) filter.status = status;
    if (platform) filter.platform = platform;
    
    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get specific course
 */
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, userId: req.userId });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update course
 */
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update course progress
 */
router.put('/:id/progress', async (req, res) => {
  try {
    const { percentage, completedLectures, timeSpent } = req.body;
    
    const course = await Course.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    if (percentage !== undefined) course.progress.percentage = percentage;
    if (completedLectures !== undefined) course.progress.completedLectures = completedLectures;
    if (timeSpent !== undefined) course.progress.timeSpent += timeSpent;
    
    course.progress.lastWatchedDate = new Date();
    
    // Update status based on progress
    if (percentage >= 100) {
      course.status = 'completed';
      course.schedule.actualEndDate = new Date();
    } else if (percentage > 0) {
      course.status = 'in_progress';
    }
    
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Upload course certificate
 */
router.post('/:id/certificate', async (req, res) => {
  try {
    const { certificateUrl, certificateId, credentialId, issueDate } = req.body;
    
    const course = await Course.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Update course certificate info
    course.certificate = {
      earned: true,
      issueDate: issueDate || new Date(),
      certificateUrl,
      certificateId,
      credentialId,
      verified: false
    };
    
    await course.save();
    
    // Create certificate record
    const certificate = new Certificate({
      userId: req.userId,
      courseId: course._id,
      title: course.title,
      issuer: course.instructor || course.platform,
      platform: course.platform,
      issueDate: issueDate || new Date(),
      certificateUrl,
      credentialId,
      skills: course.skills,
      linkedToCV: false
    });
    
    await certificate.save();
    
    res.json({ course, certificate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get AI course suggestions
 */
router.post('/suggest', async (req, res) => {
  try {
    const { targetSkills, difficulty } = req.body;
    
    const result = await orchestrate({
      type: 'suggest_courses',
      userId: req.userId,
      data: { targetSkills, difficulty }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete course
 */
router.delete('/:id', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


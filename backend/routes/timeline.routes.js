import express from 'express';
import Timeline from '../models/Timeline.model.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate } from '../services/agent.orchestrator.js';

const router = express.Router();
router.use(authenticate);

/**
 * Generate timeline from career goal
 */
router.post('/generate', async (req, res) => {
  try {
    const { careerGoal } = req.body;
    
    const result = await orchestrate({
      type: 'generate_timeline',
      userId: req.userId,
      data: { careerGoal, context: {} }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user's active timeline
 */
router.get('/', async (req, res) => {
  try {
    const timeline = await Timeline.findOne({ userId: req.userId, isActive: true });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all user timelines
 */
router.get('/all', async (req, res) => {
  try {
    const timelines = await Timeline.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(timelines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update timeline milestone
 */
router.put('/milestone/:milestoneId', async (req, res) => {
  try {
    const { status, progress, actualHours } = req.body;
    
    const timeline = await Timeline.findOne({ userId: req.userId, isActive: true });
    if (!timeline) {
      return res.status(404).json({ error: 'No active timeline found' });
    }
    
    const milestone = timeline.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    if (status) milestone.status = status;
    if (progress !== undefined) milestone.completionPercentage = progress;
    if (actualHours !== undefined) milestone.actualHours = actualHours;
    
    if (status === 'completed') {
      milestone.completedDate = new Date();
    }
    
    // Recalculate overall progress
    const completedMilestones = timeline.milestones.filter(m => m.status === 'completed').length;
    timeline.overallProgress = Math.round((completedMilestones / timeline.milestones.length) * 100);
    
    await timeline.save();
    
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Add custom milestone
 */
router.post('/milestone', async (req, res) => {
  try {
    const timeline = await Timeline.findOne({ userId: req.userId, isActive: true });
    if (!timeline) {
      return res.status(404).json({ error: 'No active timeline found' });
    }
    
    timeline.milestones.push(req.body);
    await timeline.save();
    
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete milestone
 */
router.delete('/milestone/:milestoneId', async (req, res) => {
  try {
    const timeline = await Timeline.findOne({ userId: req.userId, isActive: true });
    if (!timeline) {
      return res.status(404).json({ error: 'No active timeline found' });
    }
    
    timeline.milestones.pull(req.params.milestoneId);
    await timeline.save();
    
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


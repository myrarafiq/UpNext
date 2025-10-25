import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate, collaborativeReasoning } from '../services/agent.orchestrator.js';

const router = express.Router();
router.use(authenticate);

/**
 * Trigger AI agent task
 */
router.post('/orchestrate', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    const result = await orchestrate({
      type,
      userId: req.userId,
      data
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Evaluate progress
 */
router.post('/evaluate', async (req, res) => {
  try {
    const result = await orchestrate({
      type: 'evaluate_progress',
      userId: req.userId,
      data: { context: {} }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get recommendations
 */
router.post('/recommend', async (req, res) => {
  try {
    const result = await orchestrate({
      type: 'recommend_next_steps',
      userId: req.userId,
      data: { context: {} }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Analyze skills gap
 */
router.post('/skills-gap', async (req, res) => {
  try {
    const result = await orchestrate({
      type: 'analyze_skills_gap',
      userId: req.userId,
      data: {}
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Suggest projects
 */
router.post('/suggest-projects', async (req, res) => {
  try {
    const { skills, type, complexity } = req.body;
    
    const result = await orchestrate({
      type: 'suggest_projects',
      userId: req.userId,
      data: { skills, type, complexity }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Multi-agent collaborative reasoning
 */
router.post('/collaborate', async (req, res) => {
  try {
    const { goal } = req.body;
    
    const result = await collaborativeReasoning(req.userId, goal);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


import express from 'express';
import CV from '../models/CV.model.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate } from '../services/agent.orchestrator.js';

const router = express.Router();
router.use(authenticate);

/**
 * Generate new CV
 */
router.post('/generate', async (req, res) => {
  try {
    const { targetRole } = req.body;
    
    const result = await orchestrate({
      type: 'generate_cv',
      userId: req.userId,
      data: { targetRole }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user's CVs
 */
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get specific CV
 */
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, userId: req.userId });
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update CV
 */
router.put('/:id', async (req, res) => {
  try {
    const { updates } = req.body;
    
    const result = await orchestrate({
      type: 'update_cv',
      userId: req.userId,
      data: { cvId: req.params.id, updates }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Optimize CV for ATS
 */
router.post('/:id/optimize', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    
    const result = await orchestrate({
      type: 'optimize_cv_ats',
      userId: req.userId,
      data: { cvId: req.params.id, jobDescription }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete CV
 */
router.delete('/:id', async (req, res) => {
  try {
    await CV.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


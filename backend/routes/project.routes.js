import express from 'express';
import Project from '../models/Project.model.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate } from '../services/agent.orchestrator.js';

const router = express.Router();
router.use(authenticate);

/**
 * Create new project
 */
router.post('/', async (req, res) => {
  try {
    const project = new Project({
      userId: req.userId,
      ...req.body
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all user projects
 */
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = { userId: req.userId };
    
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get specific project
 */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update project
 */
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Scaffold project on GitHub
 */
router.post('/:id/scaffold', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const result = await orchestrate({
      type: 'scaffold_project',
      userId: req.userId,
      data: {
        projectId: project._id,
        projectTitle: project.title,
        technologies: project.technologies || [],
        description: project.description
      }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update project milestone
 */
router.put('/:id/milestone/:milestoneIndex', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const milestone = project.milestones[req.params.milestoneIndex];
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    Object.assign(milestone, req.body);
    
    if (req.body.status === 'done') {
      milestone.completedDate = new Date();
    }
    
    // Recalculate progress
    const completedMilestones = project.milestones.filter(m => m.status === 'done').length;
    project.progress.completedMilestones = completedMilestones;
    project.progress.percentage = project.milestones.length > 0 
      ? Math.round((completedMilestones / project.milestones.length) * 100)
      : 0;
    
    if (project.progress.percentage === 100) {
      project.status = 'completed';
      project.timeline.actualEndDate = new Date();
    }
    
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete project
 */
router.delete('/:id', async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


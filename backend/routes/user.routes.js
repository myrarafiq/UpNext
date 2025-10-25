import express from 'express';
import User from '../models/User.model.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * Get user profile
 */
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update user profile
 */
router.put('/profile', async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findById(req.userId);
    
    if (updates.profile) {
      user.profile = { ...user.profile, ...updates.profile };
    }
    
    if (updates.preferences) {
      user.preferences = { ...user.preferences, ...updates.preferences };
    }
    
    if (updates.onboarded !== undefined) {
      user.onboarded = updates.onboarded;
    }
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update skill graph
 */
router.put('/skills', async (req, res) => {
  try {
    const { currentSkills, targetSkills } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (currentSkills) {
      user.skillGraph.currentSkills = currentSkills;
    }
    
    if (targetSkills) {
      user.skillGraph.targetSkills = targetSkills;
    }
    
    await user.save();
    
    res.json(user.skillGraph);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get gamification stats
 */
router.get('/gamification', async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('gamification');
    res.json(user.gamification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Award badge
 */
router.post('/gamification/badge', async (req, res) => {
  try {
    const { name, icon } = req.body;
    
    const user = await User.findById(req.userId);
    user.gamification.badges.push({
      name,
      icon,
      earnedAt: new Date()
    });
    user.gamification.totalPoints += 100; // Award points for badge
    
    await user.save();
    
    res.json(user.gamification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update streak
 */
router.post('/gamification/streak', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const today = new Date();
    const lastActive = user.gamification.streak.lastActive;
    
    if (lastActive) {
      const diffDays = Math.floor((today - new Date(lastActive)) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day - increment streak
        user.gamification.streak.current += 1;
        if (user.gamification.streak.current > user.gamification.streak.longest) {
          user.gamification.streak.longest = user.gamification.streak.current;
        }
      } else if (diffDays > 1) {
        // Streak broken - reset
        user.gamification.streak.current = 1;
      }
    } else {
      user.gamification.streak.current = 1;
    }
    
    user.gamification.streak.lastActive = today;
    await user.save();
    
    res.json(user.gamification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


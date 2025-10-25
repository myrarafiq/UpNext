import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { orchestrate } from '../services/agent.orchestrator.js';
import { createCalendarEvent } from '../services/integrations/calendar.service.js';
import User from '../models/User.model.js';

const router = express.Router();
router.use(authenticate);

/**
 * Get mentorship recommendations
 */
router.post('/recommend', async (req, res) => {
  try {
    const { currentProgress, milestones } = req.body;
    
    // This would integrate with the recommender agent
    const result = await orchestrate({
      type: 'recommend_next_steps',
      userId: req.userId,
      data: { context: { currentProgress, milestones } }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Schedule mentor session
 */
router.post('/schedule', async (req, res) => {
  try {
    const { mentorName, topic, startTime, endTime, description } = req.body;
    
    const user = await User.findById(req.userId);
    
    // Create calendar event if calendar is connected
    if (user.integrations?.calendar?.connected) {
      const event = await createCalendarEvent(
        user.integrations.calendar.accessToken,
        user.integrations.calendar.refreshToken,
        {
          title: `Mentor Session: ${topic} with ${mentorName}`,
          description: description,
          startTime: startTime,
          endTime: endTime,
          timezone: user.preferences?.timezone || 'UTC'
        }
      );
      
      res.json({
        success: true,
        calendarEvent: event
      });
    } else {
      // Just return success without calendar integration
      res.json({
        success: true,
        message: 'Mentor session scheduled (calendar not connected)',
        session: {
          mentorName,
          topic,
          startTime,
          endTime
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get mentor session suggestions
 */
router.get('/suggestions', async (req, res) => {
  try {
    // This would integrate with AI to suggest optimal mentor interaction points
    const suggestions = [
      {
        timing: 'Now',
        reason: 'Portfolio review recommended after completing 3 projects',
        suggestedTopics: ['Portfolio feedback', 'Project selection', 'Code review']
      },
      {
        timing: 'After next certification',
        reason: 'Career strategy discussion recommended',
        suggestedTopics: ['Job search strategy', 'Resume review', 'Interview prep']
      }
    ];
    
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


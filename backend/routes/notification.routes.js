import express from 'express';
import Notification from '../models/Notification.model.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { createNotification } from '../services/notification.scheduler.js';

const router = express.Router();
router.use(authenticate);

/**
 * Get user notifications
 */
router.get('/', async (req, res) => {
  try {
    const { type, unreadOnly } = req.query;
    const filter = { userId: req.userId };
    
    if (type) filter.type = type;
    if (unreadOnly === 'true') filter['channels.inApp.read'] = false;
    
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get unread count
 */
router.get('/unread-count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.userId,
      'channels.inApp.read': false
    });
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Mark notification as read
 */
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    notification.channels.inApp.read = true;
    notification.channels.inApp.readAt = new Date();
    
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Mark all as read
 */
router.put('/read-all', async (req, res) => {
  try {
    await Notification.updateMany(
      {
        userId: req.userId,
        'channels.inApp.read': false
      },
      {
        $set: {
          'channels.inApp.read': true,
          'channels.inApp.readAt': new Date()
        }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create custom notification
 */
router.post('/', async (req, res) => {
  try {
    const notification = await createNotification({
      userId: req.userId,
      ...req.body,
      scheduledFor: req.body.scheduledFor || new Date()
    });
    
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete notification
 */
router.delete('/:id', async (req, res) => {
  try {
    await Notification.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


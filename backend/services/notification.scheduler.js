import Notification from '../models/Notification.model.js';
import User from '../models/User.model.js';
import { sendEmail } from './integrations/email.service.js';
import { sendSMS } from './integrations/sms.service.js';
import { sendPushNotification } from './integrations/push.service.js';

/**
 * Process and send scheduled notifications
 */
export const scheduleNotifications = async () => {
  try {
    const now = new Date();
    
    // Find notifications that are due
    const dueNotifications = await Notification.find({
      scheduledFor: { $lte: now },
      $or: [
        { 'channels.email.sent': false },
        { 'channels.sms.sent': false },
        { 'channels.push.sent': false }
      ]
    }).populate('userId');

    console.log(`📬 Processing ${dueNotifications.length} due notifications`);

    for (const notification of dueNotifications) {
      await sendNotification(notification);
    }

    return {
      success: true,
      processed: dueNotifications.length
    };
  } catch (error) {
    console.error('❌ Error scheduling notifications:', error);
    throw error;
  }
};

/**
 * Send notification through enabled channels
 */
export const sendNotification = async (notification) => {
  const user = await User.findById(notification.userId);
  
  if (!user) {
    console.error(`User not found for notification ${notification._id}`);
    return;
  }

  const preferences = user.preferences?.notificationChannels || {};

  // Send email
  if (preferences.email && !notification.channels.email.sent) {
    try {
      await sendEmail({
        to: user.email,
        subject: notification.title,
        text: notification.message,
        html: formatEmailHTML(notification)
      });
      
      notification.channels.email.sent = true;
      notification.channels.email.sentAt = new Date();
    } catch (error) {
      notification.channels.email.error = error.message;
      console.error(`❌ Failed to send email for notification ${notification._id}:`, error);
    }
  }

  // Send SMS
  if (preferences.sms && user.profile?.phone && !notification.channels.sms.sent) {
    try {
      await sendSMS({
        to: user.profile.phone,
        message: `${notification.title}: ${notification.message}`
      });
      
      notification.channels.sms.sent = true;
      notification.channels.sms.sentAt = new Date();
    } catch (error) {
      notification.channels.sms.error = error.message;
      console.error(`❌ Failed to send SMS for notification ${notification._id}:`, error);
    }
  }

  // Send push notification
  if (preferences.push && !notification.channels.push.sent) {
    try {
      await sendPushNotification({
        userId: user._id,
        title: notification.title,
        body: notification.message,
        data: {
          type: notification.type,
          resourceId: notification.linkedResource?.id
        }
      });
      
      notification.channels.push.sent = true;
      notification.channels.push.sentAt = new Date();
    } catch (error) {
      notification.channels.push.error = error.message;
      console.error(`❌ Failed to send push notification ${notification._id}:`, error);
    }
  }

  await notification.save();
};

/**
 * Create and schedule a new notification
 */
export const createNotification = async (data) => {
  const notification = new Notification(data);
  await notification.save();
  
  // If scheduled for now or past, send immediately
  if (new Date(notification.scheduledFor) <= new Date()) {
    await sendNotification(notification);
  }
  
  return notification;
};

/**
 * Format notification as HTML email
 */
function formatEmailHTML(notification) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${notification.title}</h2>
        </div>
        <div class="content">
          <p>${notification.message}</p>
          ${notification.action?.url ? `<a href="${notification.action.url}" class="button">${notification.action.text || 'Take Action'}</a>` : ''}
        </div>
        <div class="footer">
          <p>UpNext - Your AI Career Navigator</p>
          <p>Manage your notification preferences in your account settings</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default {
  scheduleNotifications,
  sendNotification,
  createNotification
};


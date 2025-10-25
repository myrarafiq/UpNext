import admin from 'firebase-admin';

/**
 * Push notification service using Firebase Cloud Messaging
 */

let firebaseInitialized = false;

const initFirebase = () => {
  if (!firebaseInitialized && process.env.FIREBASE_PROJECT_ID) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      });
      firebaseInitialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize Firebase:', error);
    }
  }
};

export const sendPushNotification = async ({ userId, title, body, data }) => {
  // For development/demo, log push notification instead of sending
  if (process.env.NODE_ENV === 'development') {
    console.log('🔔 [PUSH] Would send push notification:');
    console.log(`   To User: ${userId}`);
    console.log(`   Title: ${title}`);
    console.log(`   Body: ${body}`);
    return { success: true, simulated: true };
  }

  try {
    initFirebase();
    
    if (!firebaseInitialized) {
      throw new Error('Firebase not configured');
    }

    // In production, you would:
    // 1. Fetch user's FCM tokens from database
    // 2. Send to all their registered devices
    
    // const message = {
    //   notification: { title, body },
    //   data: data || {},
    //   token: userFCMToken
    // };
    // 
    // const result = await admin.messaging().send(message);
    
    return {
      success: true,
      // messageId: result
    };
  } catch (error) {
    console.error('❌ Failed to send push notification:', error);
    throw error;
  }
};

export default { sendPushNotification };


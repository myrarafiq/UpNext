import twilio from 'twilio';

/**
 * SMS service using Twilio
 */

let twilioClient = null;

const initTwilio = () => {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
};

export const sendSMS = async ({ to, message }) => {
  // For development/demo, log SMS instead of sending
  if (process.env.NODE_ENV === 'development') {
    console.log('📱 [SMS] Would send SMS:');
    console.log(`   To: ${to}`);
    console.log(`   Message: ${message}`);
    return { success: true, simulated: true };
  }

  try {
    initTwilio();
    
    if (!twilioClient) {
      throw new Error('Twilio not configured');
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    return {
      success: true,
      messageId: result.sid
    };
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
    throw error;
  }
};

export default { sendSMS };


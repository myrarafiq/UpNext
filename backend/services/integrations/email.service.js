/**
 * Email service for sending notifications
 * Note: In production, integrate with services like SendGrid, AWS SES, or Nodemailer
 */

export const sendEmail = async ({ to, subject, text, html }) => {
  // For development/demo, log email instead of sending
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 [EMAIL] Would send email:');
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message: ${text}`);
    return { success: true, simulated: true };
  }

  // TODO: Implement actual email service (SendGrid, AWS SES, etc.)
  // Example with SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({ to, from: 'noreply@upnext.com', subject, text, html });
  
  return { success: true };
};

export default { sendEmail };


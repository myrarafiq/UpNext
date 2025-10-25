import { google } from 'googleapis';

/**
 * Google Calendar integration service
 */

export const getGoogleAuthUrl = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar.events'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
};

export const exchangeGoogleCode = async (code) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    };
  } catch (error) {
    console.error('❌ Failed to exchange Google code:', error);
    throw error;
  }
};

export const createCalendarEvent = async (accessToken, refreshToken, event) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: event.startTime,
          timeZone: event.timezone || 'UTC'
        },
        end: {
          dateTime: event.endTime,
          timeZone: event.timezone || 'UTC'
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 30 }
          ]
        }
      }
    });

    return {
      success: true,
      eventId: response.data.id,
      eventUrl: response.data.htmlLink
    };
  } catch (error) {
    console.error('❌ Failed to create calendar event:', error);
    throw error;
  }
};

export const getUpcomingEvents = async (accessToken, refreshToken) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime'
    });

    return response.data.items || [];
  } catch (error) {
    console.error('❌ Failed to get calendar events:', error);
    throw error;
  }
};

export default {
  getGoogleAuthUrl,
  exchangeGoogleCode,
  createCalendarEvent,
  getUpcomingEvents
};


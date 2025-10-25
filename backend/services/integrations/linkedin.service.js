import axios from 'axios';

/**
 * LinkedIn OAuth and API integration service
 */

export const getLinkedInAuthUrl = () => {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_CALLBACK_URL;
  const scope = 'r_liteprofile r_emailaddress';
  
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};

export const exchangeLinkedInCode = async (code) => {
  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('❌ Failed to exchange LinkedIn code:', error);
    throw error;
  }
};

export const getLinkedInProfile = async (accessToken) => {
  try {
    // Get basic profile
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Get email
    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const profile = profileResponse.data;
    const email = emailResponse.data.elements?.[0]?.['handle~']?.emailAddress;

    return {
      firstName: profile.localizedFirstName,
      lastName: profile.localizedLastName,
      email: email,
      profileUrl: `https://www.linkedin.com/in/${profile.vanityName || profile.id}`
    };
  } catch (error) {
    console.error('❌ Failed to get LinkedIn profile:', error);
    throw error;
  }
};

// Note: LinkedIn deprecated their positions API. 
// For full profile scraping, consider third-party services like:
// - Proxycurl
// - ScrapIn
// - RapidAPI LinkedIn scrapers

export const parseLinkedInExperience = (profileData) => {
  // This would parse experience data if available from API or scraping service
  // For now, return empty array and prompt user to manually add
  return [];
};

export default {
  getLinkedInAuthUrl,
  exchangeLinkedInCode,
  getLinkedInProfile,
  parseLinkedInExperience
};


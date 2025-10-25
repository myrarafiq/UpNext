import { Octokit } from '@octokit/rest';

/**
 * GitHub OAuth and API integration service
 */

export const getGitHubAuthUrl = () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  const scope = 'user,repo,read:org';
  
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};

export const exchangeGitHubCode = async (code) => {
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('❌ Failed to exchange GitHub code:', error);
    throw error;
  }
};

export const getGitHubUser = async (accessToken) => {
  try {
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.users.getAuthenticated();
    
    return {
      username: data.login,
      name: data.name,
      email: data.email,
      avatarUrl: data.avatar_url,
      profileUrl: data.html_url
    };
  } catch (error) {
    console.error('❌ Failed to get GitHub user:', error);
    throw error;
  }
};

export const getGitHubRepos = async (accessToken, username) => {
  try {
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100
    });
    
    return data.map(repo => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at
    }));
  } catch (error) {
    console.error('❌ Failed to get GitHub repos:', error);
    throw error;
  }
};

export default {
  getGitHubAuthUrl,
  exchangeGitHubCode,
  getGitHubUser,
  getGitHubRepos
};


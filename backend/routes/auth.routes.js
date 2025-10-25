import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import * as githubService from '../services/integrations/github.service.js';
import * as linkedinService from '../services/integrations/linkedin.service.js';
import * as calendarService from '../services/integrations/calendar.service.js';

const router = express.Router();

/**
 * Register new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      profile: { firstName, lastName }
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        onboarded: user.onboarded
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GitHub OAuth - Get auth URL
 */
router.get('/github/url', (req, res) => {
  const authUrl = githubService.getGitHubAuthUrl();
  res.json({ authUrl });
});

/**
 * GitHub OAuth - Callback
 */
router.post('/github/callback', async (req, res) => {
  try {
    const { code, userId } = req.body;

    const accessToken = await githubService.exchangeGitHubCode(code);
    const githubUser = await githubService.getGitHubUser(accessToken);
    const repos = await githubService.getGitHubRepos(accessToken, githubUser.username);

    // Update user
    const user = await User.findById(userId);
    user.integrations.github = {
      connected: true,
      username: githubUser.username,
      accessToken: accessToken,
      repos: repos.map(r => r.name)
    };
    await user.save();

    res.json({ success: true, githubUser, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LinkedIn OAuth - Get auth URL
 */
router.get('/linkedin/url', (req, res) => {
  const authUrl = linkedinService.getLinkedInAuthUrl();
  res.json({ authUrl });
});

/**
 * LinkedIn OAuth - Callback
 */
router.post('/linkedin/callback', async (req, res) => {
  try {
    const { code, userId } = req.body;

    const accessToken = await linkedinService.exchangeLinkedInCode(code);
    const profile = await linkedinService.getLinkedInProfile(accessToken);

    // Update user
    const user = await User.findById(userId);
    user.integrations.linkedin = {
      connected: true,
      profileUrl: profile.profileUrl,
      accessToken: accessToken
    };
    
    // Update profile if not set
    if (!user.profile.firstName) user.profile.firstName = profile.firstName;
    if (!user.profile.lastName) user.profile.lastName = profile.lastName;
    
    await user.save();

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Google Calendar OAuth - Get auth URL
 */
router.get('/google/url', (req, res) => {
  const authUrl = calendarService.getGoogleAuthUrl();
  res.json({ authUrl });
});

/**
 * Google Calendar OAuth - Callback
 */
router.post('/google/callback', async (req, res) => {
  try {
    const { code, userId } = req.body;

    const tokens = await calendarService.exchangeGoogleCode(code);

    // Update user
    const user = await User.findById(userId);
    user.integrations.calendar = {
      connected: true,
      provider: 'google',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


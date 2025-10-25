# Backend Setup Guide

This guide will help you set up and run the UpNext backend with all its Agentic AI features.

## Prerequisites

1. **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
2. **MongoDB** - Install locally or use [MongoDB Atlas](https://www.mongodb.com/atlas/database) (free tier available)
3. **OpenAI API Key** - Get from [platform.openai.com](https://platform.openai.com/api-keys)

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file and add at minimum:

```env
# Required
PORT=3001
MONGODB_URI=mongodb://localhost:27017/upnext
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_random_secret_string_change_this
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas/database)
2. Create a cluster
3. Get connection string and add to `.env` as `MONGODB_URI`

### 4. Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
✅ Agent orchestration system initialized
✅ Notification scheduler started
🚀 Backend server running on http://localhost:3001
```

### 5. Update Frontend Configuration

In the main project directory:

```bash
# Create frontend .env file
cp .env.example .env
```

The `.env` should contain:
```env
VITE_API_URL=http://localhost:3001/api
```

## Testing the Backend

### Health Check

```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

### Register a User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## Optional Integrations

### GitHub Integration

1. Go to [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)
2. Create new OAuth App:
   - Application name: `UpNext Local`
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:3001/api/auth/github/callback`
3. Add to `.env`:
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
```

### LinkedIn Integration

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create an app
3. Add OAuth 2.0 redirect URL: `http://localhost:3001/api/auth/linkedin/callback`
4. Add to `.env`:
```env
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3001/api/auth/linkedin/callback
```

### Google Calendar Integration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Calendar API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:3001/api/auth/google/callback`
5. Add to `.env`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
```

### Twilio (SMS Notifications)

1. Sign up at [twilio.com](https://www.twilio.com/)
2. Get your Account SID, Auth Token, and phone number
3. Add to `.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Firebase (Push Notifications)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Download service account JSON
4. Add to `.env`:
```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

## Development Workflow

1. **Start MongoDB** (if local)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `npm run dev` (in main directory)
4. **Access app**: http://localhost:5173

## Troubleshooting

### MongoDB Connection Error

**Problem**: `MongoNetworkError: connect ECONNREFUSED`

**Solution**:
- Check if MongoDB is running: `mongod --version`
- Start MongoDB service (see step 3 above)
- Or use MongoDB Atlas cloud database

### OpenAI API Errors

**Problem**: `401 Unauthorized` or `Invalid API key`

**Solution**:
- Verify your API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Make sure it's correctly added to `.env`
- Check you have credits/billing set up on OpenAI

### Port Already in Use

**Problem**: `EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env to 3002 or another port
```

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solution**:
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check `VITE_API_URL` in frontend `.env` points to backend

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas or managed MongoDB
3. Set up proper domain and HTTPS
4. Update CORS settings for your domain
5. Use environment variables for all secrets
6. Consider using Redis for better job queue performance
7. Set up monitoring (PM2, New Relic, DataDog)

### Example Production .env

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/upnext
OPENAI_API_KEY=sk-...
JWT_SECRET=very_strong_random_secret
FRONTEND_URL=https://yourdomain.com
```

## Support

For issues or questions:
1. Check the `backend/README.md` for API documentation
2. Review error logs in the console
3. Ensure all required environment variables are set

## Next Steps

Once backend is running:
1. Complete onboarding in the frontend
2. Try generating a timeline with AI
3. Connect GitHub for project management
4. Generate your AI-powered CV
5. Track courses and earn badges

Enjoy building your career with UpNext! 🚀


# 🚀 UpNext Backend - 5 Minute Quickstart

Get your AI-powered career platform running in 5 minutes!

## Step 1: Install MongoDB (if not installed)

Choose one:

### Option A: MongoDB Atlas (Cloud - Easiest!)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas/database)
2. Sign up (free tier available)
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Option B: Local MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```


**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## Step 2: Get OpenAI API Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

## Step 3: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.template .env
```

## Step 4: Configure Environment

Edit `backend/.env`:

```env
# Required - Fill these in:
MONGODB_URI=mongodb://localhost:27017/upnext    # Or your Atlas connection string
OPENAI_API_KEY=sk-...your_actual_key_here...
JWT_SECRET=any_random_string_here_like_keyboard_mashing_12345

# These are fine as-is:
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**That's it for minimum setup!** Optional integrations (GitHub, LinkedIn, etc.) can be added later.

## Step 5: Start Everything

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✅ Agent orchestration system initialized
✅ Notification scheduler started
🚀 Backend server running on http://localhost:3001
```

### Terminal 2 - Frontend:
```bash
# From project root
npm run dev
```

You should see:
```
VITE v5.4.21  ready in 372 ms
➜  Local:   http://localhost:5173/UpNext/
```

## Step 6: Test It!

Open your browser to [http://localhost:5173/UpNext/](http://localhost:5173/UpNext/)

### Quick Backend Test:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Should return: {"status":"ok","timestamp":"..."}
```

## 🎉 You're Done!

Your AI-powered career platform is now running with:

- ✅ 6 specialized AI agents
- ✅ Timeline generation
- ✅ CV optimization
- ✅ Course tracking
- ✅ Project management
- ✅ Smart notifications

## Common Issues & Fixes

### "MongoDB connection error"

**Fix:**
- If using local MongoDB: `brew services start mongodb-community` (macOS)
- If using Atlas: Check your connection string and network access settings

### "Invalid OpenAI API key"

**Fix:**
- Verify your API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Make sure it's in `.env` as `OPENAI_API_KEY=sk-...`
- Check you have credits/billing set up

### "Port 3001 already in use"

**Fix:**
```bash
# Kill the process
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env to 3002
```

### "Cannot connect to backend"

**Fix:**
- Make sure backend is running (`npm run dev` in backend folder)
- Check backend console for errors
- Verify `VITE_API_URL` in frontend `.env` is `http://localhost:3001/api`

## Next Steps

### 1. Try AI Features

- Complete onboarding
- Generate a timeline
- Create a CV with AI
- Get course recommendations

### 2. Add Optional Integrations

Follow `BACKEND_SETUP.md` to add:
- GitHub (project scaffolding)
- LinkedIn (profile import)
- Google Calendar (scheduling)
- Twilio (SMS notifications)
- Firebase (push notifications)

### 3. Explore the Docs

- `COMPLETE_IMPLEMENTATION_SUMMARY.md` - Full feature overview
- `INTEGRATION_GUIDE.md` - Frontend-backend integration
- `backend/README.md` - Complete API documentation
- `BACKEND_SETUP.md` - Detailed setup guide

## Need Help?

1. Check the documentation files listed above
2. Look at the backend console for error messages
3. Verify all required environment variables are set
4. Make sure MongoDB and backend are both running

## Quick Commands Reference

```bash
# Start backend (from backend folder)
npm run dev

# Start frontend (from project root)
npm run dev

# Check if MongoDB is running (macOS)
brew services list | grep mongodb

# Test backend health
curl http://localhost:3001/health

# View backend logs
# Just look at the terminal where you ran 'npm run dev'
```

## What You Can Do Now

1. **Generate Career Timelines** - AI creates personalized roadmaps
2. **Build Your CV** - AI-powered, ATS-optimized resume generation
3. **Track Courses** - Link Udemy, Coursera, YouTube courses
4. **Manage Projects** - Tech and non-tech project portfolio
5. **Upload Certificates** - Track verified credentials
6. **Get Recommendations** - AI suggests next courses and projects
7. **Smart Notifications** - Context-aware reminders
8. **Analyze Progress** - AI evaluates your career journey

---

**Congratulations! You're all set! 🎊**

Start building your career with AI! 🚀


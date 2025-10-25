

# Frontend-Backend Integration Guide

## Overview

The UpNext application now supports **both local-only mode and full backend integration**. The frontend will automatically detect if the backend is available and adapt accordingly.

## Architecture

### Dual-Mode Operation

1. **Backend Mode** (when backend is running):
   - Full AI-powered features
   - Real-time data synchronization
   - Multi-device support
   - Advanced analytics
   - GitHub/LinkedIn integrations

2. **Local Mode** (when backend is unavailable):
   - All core features still work
   - Data stored in localStorage
   - Limited AI features (uses client-side logic)
   - Single-device experience

## Using the API Client

### Basic Usage

The API client is available throughout the app via the context:

```jsx
import { useApp } from './context/AppContext';

function MyComponent() {
  const { api, backendAvailable } = useApp();
  
  // Check if backend is available
  if (backendAvailable) {
    // Use backend features
    const result = await api.generateCV('Software Engineer');
  } else {
    // Fallback to local features
    console.log('Backend not available, using local mode');
  }
}
```

### Authentication

```jsx
const { login, register, logout, isAuthenticated, user } = useApp();

// Register
const result = await register(
  'user@example.com',
  'password123',
  'John',
  'Doe'
);

// Login
const result = await login('user@example.com', 'password123');

// Logout
logout();

// Check auth status
if (isAuthenticated) {
  console.log('User:', user);
}
```

### Timeline Management

```jsx
const { api } = useApp();

// Generate AI timeline
const result = await api.generateTimeline({
  targetRole: 'Data Scientist',
  timeframe: '6 months'
});

// Get timeline
const timeline = await api.getTimeline();

// Update milestone
await api.updateMilestone(milestoneId, {
  status: 'completed',
  progress: 100
});
```

### Project Management

```jsx
// Create project
const project = await api.createProject({
  title: 'E-commerce Platform',
  type: 'tech',
  category: 'web_dev',
  technologies: ['React', 'Node.js', 'MongoDB']
});

// Get projects
const projects = await api.getProjects({ status: 'in_progress' });

// Scaffold on GitHub
const result = await api.scaffoldProject(projectId);
```

### Course Tracking

```jsx
// Add course
const course = await api.createCourse({
  title: 'Machine Learning Specialization',
  platform: 'coursera',
  url: 'https://coursera.org/...',
  skills: ['Machine Learning', 'Python']
});

// Update progress
await api.updateCourseProgress(courseId, {
  percentage: 50,
  completedLectures: 15
});

// Get AI course suggestions
const suggestions = await api.suggestCourses(
  ['React', 'TypeScript'],
  'intermediate'
);
```

### CV Generation

```jsx
// Generate CV with AI
const { cv, atsScore } = await api.generateCV('Full Stack Developer');

// Get all CVs
const cvs = await api.getCVs();

// Optimize for specific job
const optimization = await api.optimizeCV(cvId, jobDescription);
```

### AI Agents

```jsx
// Evaluate progress
const evaluation = await api.evaluateProgress();

// Get personalized recommendations
const recommendations = await api.getRecommendations();

// Analyze skills gap
const gapAnalysis = await api.analyzeSkillsGap();

// Get project suggestions
const projectIdeas = await api.suggestProjects(
  ['Python', 'Data Science'],
  'tech',
  'moderate'
);
```

### Notifications

```jsx
// Get notifications
const notifications = await api.getNotifications({ unreadOnly: true });

// Get unread count
const { count } = await api.getUnreadCount();

// Mark as read
await api.markAsRead(notificationId);

// Mark all as read
await api.markAllAsRead();
```

## Component Integration Examples

### Dashboard Component

```jsx
import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { api, backendAvailable, loading } = useApp();
  const [timeline, setTimeline] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (backendAvailable) {
        try {
          const [timelineData, projectData] = await Promise.all([
            api.getTimeline(),
            api.getProjects()
          ]);
          
          setTimeline(timelineData);
          setProjects(projectData);
        } catch (error) {
          console.error('Failed to load data:', error);
        }
      }
    }
    
    if (!loading) {
      loadData();
    }
  }, [loading, backendAvailable]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!backendAvailable && (
        <div className="alert">
          Running in local mode. Start the backend for full AI features.
        </div>
      )}
      
      {/* Your dashboard content */}
    </div>
  );
}
```

### CV Generator Component

```jsx
function CVGenerator() {
  const { api, backendAvailable } = useApp();
  const [generating, setGenerating] = useState(false);
  const [cv, setCV] = useState(null);

  async function handleGenerate(targetRole) {
    if (!backendAvailable) {
      alert('Backend required for CV generation. Please start the backend.');
      return;
    }

    setGenerating(true);
    try {
      const result = await api.generateCV(targetRole);
      setCV(result.cv);
      alert(`CV generated with ATS score: ${result.atsScore}%`);
    } catch (error) {
      alert('Failed to generate CV: ' + error.message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div>
      <button 
        onClick={() => handleGenerate('Software Engineer')}
        disabled={!backendAvailable || generating}
      >
        {generating ? 'Generating...' : 'Generate CV'}
      </button>
      
      {!backendAvailable && (
        <p>Backend required for this feature</p>
      )}
    </div>
  );
}
```

## Error Handling

Always wrap API calls in try-catch:

```jsx
try {
  const result = await api.someFunction();
  // Handle success
} catch (error) {
  if (error.message.includes('Invalid token')) {
    // Token expired - prompt re-login
    logout();
  } else if (error.message.includes('Network')) {
    // Backend unavailable
    alert('Cannot connect to backend. Some features may be unavailable.');
  } else {
    // Other errors
    alert('An error occurred: ' + error.message);
  }
}
```

## Testing Backend Integration

### 1. Test Health Check

```javascript
fetch('http://localhost:3001/health')
  .then(res => res.json())
  .then(data => console.log('Backend status:', data));
```

### 2. Test Authentication

```javascript
import api from './utils/api';

// Register
const result = await api.register(
  'test@example.com',
  'password123',
  'Test',
  'User'
);

console.log('Registered:', result);
```

### 3. Test AI Features

```javascript
// Generate timeline
const timeline = await api.generateTimeline({
  targetRole: 'Frontend Developer',
  timeframe: '3 months'
});

console.log('Timeline:', timeline);
```

## Environment Setup

### Development

1. Create `.env` in project root:
```env
VITE_API_URL=http://localhost:3001/api
```

2. Start both servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### Production

1. Set production API URL:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

2. Build and deploy:
```bash
npm run build
```

## Gradual Migration Strategy

You can migrate features one at a time:

1. **Phase 1**: Keep using local storage for everything
2. **Phase 2**: Add authentication, sync user profile
3. **Phase 3**: Move timeline to backend
4. **Phase 4**: Integrate AI features (CV generation, recommendations)
5. **Phase 5**: Add advanced features (GitHub scaffold, notifications)

## Troubleshooting

### Backend Not Detected

Check console for:
```
Backend not available, using local storage mode
```

Solutions:
- Verify backend is running on correct port
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend

### Authentication Issues

If getting 401 errors:
- Token may have expired - re-login
- Check token is being sent in headers
- Verify `JWT_SECRET` matches in backend

### CORS Errors

Add to backend `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

Restart backend after changes.

## Next Steps

1. Review `backend/README.md` for API documentation
2. See `BACKEND_SETUP.md` for backend setup
3. Start with basic features then add AI gradually
4. Test in local mode before deploying backend

Happy coding! 🚀


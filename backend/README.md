# UpNext Backend - Agentic AI Career Navigator

Backend API for the UpNext career development platform powered by Agentic AI.

## Features

- **Agentic AI Orchestration**: Multi-agent system with specialized agents
  - Planner Agent: Generates career timelines
  - Evaluator Agent: Assesses progress and skills
  - Recommender Agent: Suggests courses and projects
  - Reminder Agent: Schedules notifications
  - GitHub Project Agent: Scaffolds projects
  - CV Generator Agent: Creates ATS-optimized CVs

- **External Integrations**:
  - GitHub OAuth & API
  - LinkedIn OAuth
  - Google Calendar API
  - Twilio SMS notifications
  - Firebase push notifications

- **Core Functionality**:
  - User authentication & profiles
  - Dynamic timeline management
  - Course tracking & progress
  - Project management
  - Certificate verification
  - CV generation & optimization
  - Smart notifications

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-4, LangChain
- **Authentication**: JWT
- **APIs**: GitHub, LinkedIn, Google Calendar
- **Notifications**: Twilio, Firebase

## Setup

### Prerequisites

- Node.js 16+
- MongoDB
- OpenAI API key

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Environment Variables

See `.env.example` for all required environment variables.

### Required:
- `OPENAI_API_KEY`: Your OpenAI API key
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token signing

### Optional (for full functionality):
- GitHub OAuth credentials
- LinkedIn OAuth credentials
- Google Calendar API credentials
- Twilio credentials (SMS)
- Firebase credentials (push notifications)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/github/url` - Get GitHub OAuth URL
- `POST /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/linkedin/url` - Get LinkedIn OAuth URL
- `POST /api/auth/linkedin/callback` - LinkedIn OAuth callback

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/skills` - Update skill graph
- `GET /api/users/gamification` - Get gamification stats

### Timeline
- `POST /api/timeline/generate` - Generate AI timeline
- `GET /api/timeline` - Get active timeline
- `PUT /api/timeline/milestone/:id` - Update milestone
- `POST /api/timeline/milestone` - Add custom milestone

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/scaffold` - Scaffold on GitHub

### Courses
- `POST /api/courses` - Add course
- `GET /api/courses` - Get all courses
- `PUT /api/courses/:id/progress` - Update progress
- `POST /api/courses/:id/certificate` - Upload certificate
- `POST /api/courses/suggest` - Get AI suggestions

### CV
- `POST /api/cv/generate` - Generate CV with AI
- `GET /api/cv` - Get all CVs
- `GET /api/cv/:id` - Get specific CV
- `PUT /api/cv/:id` - Update CV
- `POST /api/cv/:id/optimize` - Optimize for ATS

### Agents
- `POST /api/agents/evaluate` - Evaluate progress
- `POST /api/agents/recommend` - Get recommendations
- `POST /api/agents/skills-gap` - Analyze skills gap
- `POST /api/agents/suggest-projects` - Get project suggestions
- `POST /api/agents/collaborate` - Multi-agent reasoning

### Notifications
- `GET /api/notifications` - Get notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Mentors
- `POST /api/mentors/recommend` - Get mentorship recommendations
- `POST /api/mentors/schedule` - Schedule mentor session
- `GET /api/mentors/suggestions` - Get session suggestions

## Architecture

```
backend/
├── models/           # Mongoose schemas
├── routes/           # API endpoints
├── services/         # Business logic
│   ├── agents/      # AI agents
│   └── integrations/# External APIs
├── middleware/       # Auth, validation
└── server.js        # Entry point
```

## Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB
3. Set up proper API keys
4. Enable HTTPS
5. Configure CORS for your domain
6. Set up monitoring and logging

## License

MIT


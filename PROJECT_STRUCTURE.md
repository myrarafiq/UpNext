# 📁 UpNext - Project Structure

```
UpNext/
├── 📄 README.md                        # Main project documentation
├── 📄 DEMO_GUIDE.md                    # Hackathon demo walkthrough
├── 📄 FEATURES.md                      # Complete feature list
├── 📄 PROJECT_STRUCTURE.md             # This file
├── 📄 package.json                     # Dependencies and scripts
├── 📄 vite.config.js                   # Vite configuration
├── 📄 tailwind.config.js               # Tailwind CSS configuration
├── 📄 postcss.config.js                # PostCSS configuration
├── 📄 .gitignore                       # Git ignore rules
├── 📄 index.html                       # HTML entry point
│
├── 📁 public/                          # Static assets
│   └── logo.svg                        # UpNext logo
│
└── 📁 src/                             # Source code
    ├── 📄 main.jsx                     # React entry point
    ├── 📄 App.jsx                      # Main app component
    ├── 📄 index.css                    # Global styles + Tailwind
    │
    ├── 📁 components/                  # React components
    │   ├── 📄 Onboarding.jsx          # Multi-step onboarding flow
    │   ├── 📄 Dashboard.jsx           # Main dashboard with sidebar
    │   │
    │   └── 📁 dashboard/              # Dashboard sub-components
    │       ├── 📄 Overview.jsx        # Dashboard home page
    │       ├── 📄 Roadmap.jsx         # Learning roadmap view
    │       ├── 📄 ReflectionModal.jsx # Task completion feedback
    │       ├── 📄 Projects.jsx        # Project management
    │       ├── 📄 Portfolio.jsx       # Skills showcase
    │       ├── 📄 Community.jsx       # Discussion board
    │       └── 📄 Reminders.jsx       # Reminder popup
    │
    ├── 📁 context/                    # State management
    │   └── 📄 AppContext.jsx          # Global app state (Context API)
    │
    └── 📁 utils/                      # Utility functions
        └── 📄 aiEngine.js             # AI roadmap generation & adaptation
```

---

## 📦 Key Files Explained

### Configuration Files

**`package.json`**
- Project dependencies (React, Vite, Tailwind, Lucide)
- Build scripts (`dev`, `build`, `preview`)
- Project metadata

**`vite.config.js`**
- Vite build tool configuration
- React plugin setup
- Development server settings

**`tailwind.config.js`**
- Tailwind CSS customization
- Custom color palette (primary blues & purples)
- Theme extensions

**`index.html`**
- HTML template
- App title and favicon
- React root mount point

---

### Source Code

#### Core Application

**`src/main.jsx`**
```javascript
// React entry point
// Renders App component into #root
```

**`src/App.jsx`**
```javascript
// Main app wrapper
// Handles onboarding vs dashboard state
// Wraps everything in AppProvider
```

**`src/index.css`**
```css
/* Tailwind directives */
/* Custom component classes */
/* Global styles */
```

---

#### Components

**`src/components/Onboarding.jsx`**
- 3-step onboarding flow
- Name → Career Goal → Skill Level
- Form validation
- Beautiful gradient UI
- Initializes user data

**`src/components/Dashboard.jsx`**
- Main layout with sidebar
- Navigation between views
- Top bar with notifications
- Responsive design
- Reset progress functionality

**`src/components/dashboard/Overview.jsx`**
- Stats cards (readiness, skills, projects, streak)
- Current tasks display
- Recent completions
- Quick actions
- Motivational messages

**`src/components/dashboard/Roadmap.jsx`**
- Learning path visualization
- Task cards with resources
- Start/Complete actions
- Progress tracking
- Category filtering
- Tips sidebar

**`src/components/dashboard/ReflectionModal.jsx`**
- Post-completion feedback
- Understanding rating (1-5)
- Optional notes
- AI adaptation preview
- Celebratory animations

**`src/components/dashboard/Projects.jsx`**
- Project cards with GitHub links
- Create new project flow
- Milestone tracking
- Status management (not-started/in-progress/completed)
- Project ideas generation

**`src/components/dashboard/Portfolio.jsx`**
- Job readiness score display
- Skills breakdown by category
- Proficiency visualization
- Project showcase
- Achievement system
- Personalized feedback

**`src/components/dashboard/Community.jsx`**
- Discussion board UI
- Category filters
- Mock community posts
- Likes and replies
- Search functionality
- Community stats

**`src/components/dashboard/Reminders.jsx`**
- Floating reminder widget
- Task notifications
- Dismiss functionality
- Calendar sync UI

---

#### State Management

**`src/context/AppContext.jsx`**

**State:**
- `userData`: User profile (name, job, level, skills)
- `roadmap`: Learning tasks array
- `completedTasks`: Finished tasks history
- `projects`: Generated projects
- `reminders`: Active reminders
- `jobReadinessScore`: Progress percentage

**Actions:**
- `initializeUserData()`: Set user info and generate roadmap
- `completeTask()`: Mark task done, trigger AI adaptation
- `generateProject()`: Create portfolio project
- `updateTaskStatus()`: Change task state
- `dismissReminder()`: Remove reminder
- `calculateJobReadiness()`: Update score

**Persistence:**
- Auto-saves to localStorage on every change
- Loads saved data on app start
- Survives page refreshes

---

#### AI Engine

**`src/utils/aiEngine.js`**

**Functions:**

1. `generateRoadmap(targetJob, currentLevel)`
   - Returns personalized learning path
   - Job-specific content
   - Level-appropriate tasks
   - Includes resources, duration, categories

2. `adaptRoadmap(currentRoadmap, completedTaskId, understanding)`
   - Modifies roadmap based on user feedback
   - Low score (1-2): Adds reinforcement
   - High score (4-5): Adds advanced challenge
   - Updates task statuses
   - Returns new roadmap array

3. `generateProjectIdeas(skill, level)`
   - Returns project suggestions for a skill
   - Skill-specific ideas
   - Difficulty-appropriate

**Data:**
- `jobRoadmaps`: Object with learning paths for:
  - Data Scientist
  - Full Stack Developer
  - Software Engineer
  - (3 difficulty levels each)

---

## 🎨 Styling System

### Tailwind Classes

**Custom Components** (defined in `index.css`):
- `.btn-primary`: Blue gradient buttons
- `.btn-secondary`: Outlined buttons
- `.card`: White background cards
- `.input-field`: Form inputs

**Color Palette:**
- Primary: Blue shades (`primary-50` to `primary-900`)
- Accent: Purple, green, orange for variety
- Status colors: Blue (in-progress), green (completed), gray (pending)

**Gradients:**
- Hero sections: Blue to purple
- Buttons: Primary to purple
- Cards: Subtle background gradients

---

## 🔄 Data Flow

1. **User Onboarding**
   ```
   User Input → initializeUserData() → generateRoadmap() → State Update → Dashboard
   ```

2. **Task Completion**
   ```
   User Completes Task → Reflection Modal → Rating (1-5) → completeTask()
   → adaptRoadmap() → AI Adds Tasks → generateProject() → State Update
   ```

3. **State Persistence**
   ```
   Any State Change → useEffect Hook → localStorage.setItem()
   Page Load → useEffect Hook → localStorage.getItem() → Set State
   ```

---

## 🚀 Build & Deploy

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
```

### Production Build
```bash
npm run build       # Creates optimized dist/ folder
npm run preview     # Preview production build
```

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Railway**: Connect repo and deploy

---

## 📊 Data Models

### User Data
```javascript
{
  name: string,
  targetJob: string,
  currentLevel: string,
  skills: array
}
```

### Task Object
```javascript
{
  id: string,
  title: string,
  description: string,
  resources: array[string],
  duration: string,
  status: 'pending' | 'in-progress' | 'completed' | 'optional',
  type: 'learning' | 'reinforcement' | 'advanced',
  category: string,
  isAdded: boolean (optional)
}
```

### Project Object
```javascript
{
  id: string,
  skill: string,
  name: string,
  description: string,
  githubUrl: string,
  status: 'not-started' | 'in-progress' | 'completed',
  createdAt: Date
}
```

### Reminder Object
```javascript
{
  id: string,
  message: string,
  taskId: string,
  createdAt: Date
}
```

---

## 🎯 Entry Points for Customization

### Add New Job Role:
1. Edit `src/utils/aiEngine.js`
2. Add to `jobRoadmaps` object
3. Define beginner/intermediate/advanced paths
4. Update `Onboarding.jsx` job options

### Change Color Scheme:
1. Edit `tailwind.config.js`
2. Update `primary` color values
3. Optionally update gradient classes in components

### Add New Feature:
1. Create component in `src/components/dashboard/`
2. Add route in `Dashboard.jsx`
3. Update navigation array
4. Add context actions if needed

### Modify AI Logic:
1. Edit `src/utils/aiEngine.js`
2. Update `adaptRoadmap()` function
3. Adjust thresholds and conditions
4. Add new task types

---

## 🐛 Debugging Tips

**Check State:**
```javascript
// In browser console
JSON.parse(localStorage.getItem('upnext_data'))
```

**Reset App:**
```javascript
// In browser console
localStorage.clear()
location.reload()
```

**View Context:**
```javascript
// Add to any component
console.log(useApp())
```

---

## 📝 Code Style

- **React**: Functional components with hooks
- **Props**: Destructured in function params
- **State**: Context API for global, useState for local
- **Styling**: Tailwind utility classes (no CSS modules)
- **Icons**: Lucide React components
- **Naming**: camelCase for JS, PascalCase for components

---

This structure is designed for:
- ✅ Easy navigation and understanding
- ✅ Scalability (add features without refactoring)
- ✅ Maintainability (clear separation of concerns)
- ✅ Demo-friendly (everything works together seamlessly)

Happy hacking! 🚀


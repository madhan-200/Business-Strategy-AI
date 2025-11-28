# StratAI - AGI Business Strategy Engine 🧠⚡

**The World's First AI-Powered Autonomous Chief Strategy Officer**

StratAI is not just a dashboard; it's an **AGI-driven engine** that acts as a digital co-founder for your business. It continuously analyzes market trends, competitor moves, and your business data to generate, update, and optimize your business strategy in real-time.

![StratAI Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## 🚀 Key Features

### 🧠 AGI Strategy Core
- **Autonomous Generation**: Generates comprehensive business strategies from scratch using Google's Gemini 1.5 Pro.
- **Real-time Adaptation**: Continuously updates strategies based on new data and market shifts.
- **Deep Analysis**: Analyzes target audience, pain points, and value propositions with human-level depth.

### 📅 Intelligent Content Engine
- **30-Day Content Calendar**: Automatically generates a month's worth of social media content tailored to your strategy.
- **Multi-Platform Support**: Creates content for LinkedIn, Twitter, Instagram, and more.
- **Sales Funnel Integration**: Aligns every piece of content with specific stages of your sales funnel (Awareness -> Conversion).

### 📊 Growth Mission Control
- **Growth Score**: A proprietary AI metric (0-100) that predicts your business's market viability.
- **Visual Projections**: Interactive charts showing projected revenue and user growth.
- **KPI Tracking**: AI-recommended Key Performance Indicators to keep you on track.

### 🛡️ Enterprise-Grade Architecture
- **Secure Authentication**: Powered by Firebase Auth.
- **Scalable Database**: Serverless PostgreSQL via Neon Tech.
- **Modern UI**: Futuristic, glassmorphism-inspired interface built with React 19 and Tailwind CSS.

---

## 🔐 Authentication Features

StratAI includes a complete authentication system with Firebase:

- **Email/Password Authentication**: Secure user registration and login
- **Google OAuth**: One-click sign-in with Google accounts
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Sign-Out Functionality**: Secure logout with session cleanup

### Sign-Out Demo

![Sign-out demonstration](./signout_demo.webp)

*Complete sign-out flow demonstration*

![Login page after sign-out](./signout_screenshot.png)

*Users are redirected to the login page after signing out*

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **State Management**: React Context API
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js + TypeScript
- **AI Model**: Google Gemini 1.5 Pro (via `@google/genai`)
- **Database**: PostgreSQL (Neon Tech Serverless)
- **Auth**: Firebase Admin SDK
- **Scheduling**: Node-cron (for weekly autonomous updates)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Google Cloud Project (for Gemini API)
- A Firebase Project
- A Neon Tech Database

### 1. Clone the Repository
```bash
git clone https://github.com/madhan-200/Business-Strategy-AI.git
cd Business-Strategy-AI
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
# Copy the example and fill in your keys
cp .env.example .env
```

**Required Environment Variables (`backend/.env`):**
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_neon_postgres_connection_string
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
```

**Database Migration:**
```bash
# Run the migration script to set up tables
npx ts-node src/scripts/migrate.ts
```

**Start the Server:**
```bash
npm run dev
```

### 3. Frontend Setup
```bash
# Open a new terminal
cd .. 
npm install

# Create .env.local file
cp .env.local.example .env.local
```

**Required Environment Variables (`.env.local`):**
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
# ... other firebase config
```

**Start the Client:**
```bash
npm run dev
```

Visit `http://localhost:3000` to launch the AGI Engine! 🚀

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**MADHANKUMAR S**
- 📧 Email: [madhankumars8012@gmail.com](mailto:madhankumars8012@gmail.com)
- 🐙 GitHub: [@madhan-200](https://github.com/madhan-200)
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### POST /api/strategy/generate
Generate a new business strategy.

**Request:**
```json
{
  "name": "My Business",
  "industry": "Technology",
  "niche": "SaaS",
  "audience": "Small business owners",
  "goals": "Increase revenue by 50%",
  "challenges": "Limited marketing budget"
}
```

**Response:** Complete strategy object with AI insights

### GET /api/strategy/:id
Retrieve a strategy by ID.

### GET /health
Health check endpoint.

## 📊 Database Schema

- **users**: User accounts (prepared for auth)
- **businesses**: Business profiles
- **strategies**: Generated strategies with JSONB fields

See `backend/schema.sql` for complete schema.

## 🎨 UI Components

- **Dashboard**: Growth metrics, charts, executive summary
- **Strategy View**: Detailed strategy breakdown
- **Calendar View**: 30-day content calendar
- **Onboarding**: Business profile input form

## 🔐 Security Notes

- API key is stored server-side only
- CORS enabled for local development
- PostgreSQL with parameterized queries (SQL injection protection)
- Environment variables for sensitive data

## 🚧 Roadmap

- [x] User authentication (Firebase)
- [ ] PDF export functionality
- [ ] Subscription/payment integration
- [ ] Weekly auto-update cron jobs
- [ ] Admin panel
- [ ] Multi-user support
- [ ] Email notifications
- [ ] Analytics dashboard

## 📝 Development

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

### Code Structure

- Frontend uses React functional components with hooks
- Backend follows MVC pattern
- TypeScript for type safety across the stack
- Shared types between frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ for entrepreneurs and business owners

---

**Note**: This is a full-stack application. Both frontend and backend must be running for full functionality.

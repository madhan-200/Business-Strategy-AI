# Database & Firebase Setup Guide

## Option 1: Cloud Database (Recommended - Easiest)

### Using Supabase (Free PostgreSQL Database)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up with GitHub or Email
   - Click "New Project"

2. **Project Setup**
   - Organization: Create new or select existing
   - Project Name: `stratai`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

3. **Get Database URL**
   - Go to Project Settings → Database
   - Find "Connection string" → "URI"
   - Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)

4. **Run Schema**
   - Go to SQL Editor in Supabase dashboard
   - Click "New query"
   - Copy and paste the entire contents of `backend/schema.sql`
   - Click "Run" or press Ctrl+Enter

5. **Update Backend .env**
   - Open `backend/.env`
   - Replace `DATABASE_URL` with your Supabase connection string

---

## Option 2: Local PostgreSQL Installation

### Windows Installation

1. **Download PostgreSQL**
   - Visit: https://www.postgresql.org/download/windows/
   - Download the installer (latest version)
   - Run the installer

2. **Installation Steps**
   - Default port: 5432
   - Set a password for postgres user (remember this!)
   - Install pgAdmin 4 (GUI tool)

3. **Create Database**
   ```bash
   # Open Command Prompt or PowerShell
   # Navigate to PostgreSQL bin folder (usually C:\Program Files\PostgreSQL\16\bin)
   
   # Create database
   createdb -U postgres stratai
   
   # Run schema
   psql -U postgres -d stratai -f "C:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\schema.sql"
   ```

4. **Update Backend .env**
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/stratai
   ```

---

## Firebase Setup

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Project name: `stratai` or `stratai-production`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click "Get started"
3. Enable **Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google Sign-In**:
   - Click "Google"
   - Toggle "Enable"
   - Select support email
   - Click "Save"

### 3. Get Frontend Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **Web** icon (`</>`)
4. App nickname: `stratai-web`
5. Click "Register app"
6. Copy the `firebaseConfig` object

7. **Update Frontend .env.local**:
   Create/edit `c:/AGI_PROJECT/stratai---dynamic-business-strategy-engine/.env.local`:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=stratai-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=stratai-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=stratai-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

### 4. Get Backend Service Account

1. In Firebase Console, go to **Project Settings → Service Accounts**
2. Click "Generate new private key"
3. Click "Generate key" (downloads a JSON file)
4. Save the file as `firebase-service-account.json` in `backend/` folder

5. **Update Backend .env**:
   Add this line:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
   ```

---

## Quick Start Commands

After completing setup above:

```bash
# Install dependencies (if not done)
npm install
cd backend && npm install && cd ..

# Start Backend (Terminal 1)
cd backend
npm run dev

# Start Frontend (Terminal 2)
npm run dev
```

Visit: http://localhost:5173

---

## Verification Checklist

- [ ] Database created and schema loaded
- [ ] Backend .env has correct DATABASE_URL
- [ ] Firebase project created
- [ ] Email/Password auth enabled in Firebase
- [ ] Google Sign-In enabled in Firebase
- [ ] Frontend .env.local has Firebase config
- [ ] Backend has firebase-service-account.json
- [ ] Backend server starts without errors
- [ ] Frontend loads without errors
- [ ] Can create an account
- [ ] Can generate a strategy

---

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL format
- Verify database exists: `psql -U postgres -l`
- Check PostgreSQL is running

### Firebase Auth Error
- Verify all Firebase config values are correct
- Check Firebase console for enabled auth methods
- Ensure service account JSON is in correct location

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Vite will auto-increment port (5174, 5175, etc.)

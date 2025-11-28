# 🚀 StratAI - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] **Option A: Supabase (Recommended)**
  - [ ] Create account at https://supabase.com
  - [ ] Create new project named "stratai"
  - [ ] Copy connection string from Settings → Database
  - [ ] Update `backend/.env` with `DATABASE_URL`
  - [ ] Run schema in SQL Editor (copy from `backend/schema.sql`)
  
- [ ] **Option B: Local PostgreSQL**
  - [ ] Install PostgreSQL from https://www.postgresql.org/download/
  - [ ] Create database: `createdb stratai`
  - [ ] Run schema: `psql -d stratai -f backend/schema.sql`
  - [ ] Update `backend/.env` with local connection string

### 2. Firebase Setup
- [ ] Create project at https://console.firebase.google.com
- [ ] Enable Authentication → Email/Password
- [ ] Enable Authentication → Google Sign-In
- [ ] Get Web Config (Project Settings → Your apps → Web)
- [ ] Update `.env.local` with Firebase config
- [ ] Download Service Account JSON (Project Settings → Service Accounts)
- [ ] Save as `backend/firebase-service-account.json`
- [ ] Update `backend/.env` with `GOOGLE_APPLICATION_CREDENTIALS`

### 3. Environment Variables

**Backend** (`backend/.env`):
```
PORT=5000
GEMINI_API_KEY=AIzaSyC1DS4RcwMOvRhYgE7669FPFnWbyH_uVsI ✅
DATABASE_URL=postgresql://... ⚠️
NODE_ENV=development
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json ⚠️
```

**Frontend** (`.env.local`):
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=... ⚠️
VITE_FIREBASE_AUTH_DOMAIN=... ⚠️
VITE_FIREBASE_PROJECT_ID=... ⚠️
VITE_FIREBASE_STORAGE_BUCKET=... ⚠️
VITE_FIREBASE_MESSAGING_SENDER_ID=... ⚠️
VITE_FIREBASE_APP_ID=... ⚠️
```

### 4. Dependencies
- [ ] Run `npm install` in root directory
- [ ] Run `npm install` in backend directory

### 5. Testing
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `npm run dev`
- [ ] Visit http://localhost:5173
- [ ] Create test account
- [ ] Generate test strategy
- [ ] Export PDF
- [ ] Check database for saved data

---

## 🎯 Quick Start (Automated)

Run the automated setup script:

```powershell
.\setup.ps1
```

This will guide you through:
1. Database selection (Supabase or Local)
2. Firebase configuration
3. Environment variable setup

---

## 🔧 Manual Setup Steps

### Step 1: Database (Supabase - Easiest)

1. Go to https://supabase.com → Sign up
2. Create new project:
   - Name: `stratai`
   - Password: (create strong password)
   - Region: (closest to you)
3. Wait 2 minutes for setup
4. Go to Settings → Database → Connection String → URI
5. Copy the connection string
6. Open `backend/.env` and update:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
7. Go to SQL Editor → New Query
8. Copy entire contents of `backend/schema.sql`
9. Paste and click "Run"

### Step 2: Firebase

1. Go to https://console.firebase.google.com
2. Click "Add project" → Name: `stratai`
3. Go to Build → Authentication → Get started
4. Enable "Email/Password" provider
5. Enable "Google" provider
6. Go to Project Settings (gear icon)
7. Scroll to "Your apps" → Click Web icon (`</>`)
8. Register app: `stratai-web`
9. Copy the `firebaseConfig` values
10. Create `.env.local` in root:
    ```
    VITE_API_URL=http://localhost:5000
    VITE_FIREBASE_API_KEY=AIza...
    VITE_FIREBASE_AUTH_DOMAIN=stratai-xxx.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=stratai-xxx
    VITE_FIREBASE_STORAGE_BUCKET=stratai-xxx.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
    VITE_FIREBASE_APP_ID=1:123456789:web:abc
    ```
11. Go to Project Settings → Service Accounts
12. Click "Generate new private key"
13. Save file as `backend/firebase-service-account.json`

### Step 3: Install & Run

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Visit: http://localhost:5173

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Backend starts without errors on port 5000
2. ✅ Frontend loads on port 5173
3. ✅ You can create an account (check Firebase Console → Authentication)
4. ✅ You can generate a strategy (check Supabase → Table Editor → strategies)
5. ✅ PDF export downloads successfully
6. ✅ No console errors in browser DevTools

---

## 🐛 Troubleshooting

### "Database connection failed"
- Verify `DATABASE_URL` in `backend/.env`
- Check Supabase project is running
- Ensure schema was executed successfully

### "Firebase auth error"
- Verify all Firebase config values in `.env.local`
- Check Email/Password is enabled in Firebase Console
- Ensure `firebase-service-account.json` exists in backend/

### "Port already in use"
- Change `PORT` in `backend/.env` to 5001
- Frontend will auto-increment (5174, 5175, etc.)

### "Module not found"
- Run `npm install` in both root and backend directories
- Delete `node_modules` and reinstall if needed

---

## 📞 Need Help?

Check the detailed guides:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Comprehensive setup instructions
- [README.md](./README.md) - Project overview
- [backend/README.md](./backend/README.md) - API documentation

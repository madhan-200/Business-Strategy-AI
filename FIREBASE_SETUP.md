# 🔥 Firebase Configuration - Step-by-Step Guide

## Part 1: Create Firebase Project

### Step 1: Create a New Project
1. In your Firebase Console (already open), click the **"Get started by setting up a Firebase project"** card
   - OR click **"Add project"** if you see that button
2. Enter project name: **`stratai`**
3. Click **"Continue"**
4. **Disable** Google Analytics (optional, not needed for now)
5. Click **"Create project"**
6. Wait ~30 seconds for project creation
7. Click **"Continue"** when ready

---

## Part 2: Enable Authentication

### Step 2: Enable Email/Password Authentication
1. In the left sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"** button
3. Click on **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Step 3: Enable Google Sign-In
1. Still in Authentication, click **"Sign-in method"** tab
2. Click on **"Google"** provider
3. Toggle **"Enable"** to ON
4. Select your support email from dropdown
5. Click **"Save"**

---

## Part 3: Get Web App Configuration

### Step 4: Register Web App
1. Click the **gear icon** (⚙️) next to "Project Overview" in the left sidebar
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Enter app nickname: **`stratai-web`**
6. **DO NOT** check "Also set up Firebase Hosting"
7. Click **"Register app"**

### Step 5: Copy Configuration Values
You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "stratai-xxxxx.firebaseapp.com",
  projectId: "stratai-xxxxx",
  storageBucket: "stratai-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 6: Fill Your .env.local File

Copy each value from Firebase to your `.env.local`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=AIzaSyC...                    ← Copy from apiKey
VITE_FIREBASE_AUTH_DOMAIN=stratai-xxxxx.firebaseapp.com    ← Copy from authDomain
VITE_FIREBASE_PROJECT_ID=stratai-xxxxx              ← Copy from projectId
VITE_FIREBASE_STORAGE_BUCKET=stratai-xxxxx.appspot.com     ← Copy from storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789         ← Copy from messagingSenderId
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456   ← Copy from appId
```

**IMPORTANT**: 
- Keep `VITE_API_URL=http://localhost:5000` as is
- Replace ONLY the values after the `=` sign
- Do NOT include quotes around the values
- Do NOT include spaces

---

## Part 4: Get Service Account (Backend)

### Step 7: Download Service Account JSON
1. Still in **Project Settings**, click the **"Service accounts"** tab
2. Click **"Generate new private key"** button
3. Click **"Generate key"** in the popup
4. A JSON file will download (e.g., `stratai-xxxxx-firebase-adminsdk-xxxxx.json`)
5. **Move this file** to: `c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\`
6. **Rename it** to: `firebase-service-account.json`

---

## ✅ Verification

After completing all steps, you should have:

1. ✅ Firebase project named "stratai" created
2. ✅ Email/Password authentication enabled
3. ✅ Google Sign-In enabled
4. ✅ Web app registered as "stratai-web"
5. ✅ `.env.local` file filled with all 7 values
6. ✅ `backend/firebase-service-account.json` file saved

---

## 🎯 Example of Completed .env.local

Here's what your completed file should look like (with your actual values):

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=AIzaSyC1DS4RcwMOvRhYgE7669FPFnWbyH_uVsI
VITE_FIREBASE_AUTH_DOMAIN=stratai-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=stratai-12345
VITE_FIREBASE_STORAGE_BUCKET=stratai-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321
VITE_FIREBASE_APP_ID=1:987654321:web:abc123def456
```

---

## 📸 Visual Guide

Look for these screens in Firebase Console:

1. **Project Creation**: Big blue "Create project" button
2. **Authentication**: Left sidebar → Build → Authentication
3. **Project Settings**: Gear icon ⚙️ → Project settings
4. **Web App**: Scroll to "Your apps" → Click `</>` icon
5. **Service Account**: Project Settings → Service accounts tab

---

## ❓ Troubleshooting

**Can't find "Add project" button?**
- You might be on the wrong page
- Try going directly to: https://console.firebase.google.com/u/0/

**Don't see the config values?**
- After registering the web app, scroll down
- Look for the code snippet with `firebaseConfig`
- You can also find it later in Project Settings → General → Your apps

**Service account download not working?**
- Make sure you clicked "Generate new private key"
- Check your Downloads folder
- The file should be a `.json` file

---

## 🚀 Next Step

After filling `.env.local` and saving the service account JSON, you're ready to run the app!

```bash
# Install dependencies (if not done)
npm install
cd backend && npm install && cd ..

# Start backend
cd backend
npm run dev

# In another terminal, start frontend
npm run dev
```

# 🔑 Firebase Service Account - Download Guide

## Current Status
✅ You're at the confirmation dialog screen!

![Confirmation Dialog](file:///C:/Users/rockm/.gemini/antigravity/brain/b53a50a1-45c5-4c8a-ae0d-d0db55cf2f00/generate_key_confirmation_1764232092039.png)

---

## 📥 Step-by-Step Instructions

### Step 1: Click "Generate key" Button
In the dialog box that's currently open in your browser:
1. Click the blue **"Generate key"** button
2. Your browser will automatically download a JSON file

### Step 2: Locate the Downloaded File
The file will be downloaded to your default Downloads folder:
- File name will look like: `stratai-62039-firebase-adminsdk-xxxxx-xxxxxxxxx.json`
- Location: `C:\Users\rockm\Downloads\`

### Step 3: Move the File to Backend Folder
You have two options:

**Option A: Using File Explorer (Easiest)**
1. Open File Explorer
2. Go to your Downloads folder
3. Find the file starting with `stratai-62039-firebase-adminsdk-`
4. **Cut** the file (Ctrl+X)
5. Navigate to: `C:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\`
6. **Paste** the file (Ctrl+V)
7. **Rename** it to: `firebase-service-account.json`

**Option B: Using PowerShell (Quick)**
Run this command in PowerShell:
```powershell
# Find the downloaded file
$sourceFile = Get-ChildItem "$env:USERPROFILE\Downloads\stratai-*.json" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

# Move and rename it
Move-Item $sourceFile.FullName "c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\firebase-service-account.json"
```

---

## ✅ Verification

After moving the file, verify it's in the right place:

```powershell
Test-Path "c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\firebase-service-account.json"
```

Should return: `True`

---

## 🎯 What This File Does

This JSON file contains credentials that allow your **backend server** to:
- Verify user authentication tokens
- Manage Firebase users
- Access Firebase services securely

**IMPORTANT**: 
- ⚠️ Never commit this file to Git (it's already in `.gitignore`)
- ⚠️ Never share this file publicly
- ⚠️ Keep it secure - it has admin access to your Firebase project

---

## 📋 Next Steps

After the service account is in place:

1. ✅ Check `.env.local` has all Firebase values
2. ✅ Check `backend/.env` has:
   - `GEMINI_API_KEY`
   - `DATABASE_URL`
   - `GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json`

3. Install dependencies:
```bash
npm install
cd backend && npm install && cd ..
```

4. Start the app:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

---

## 🐛 Troubleshooting

**File not downloading?**
- Check if popup blocker is enabled
- Try clicking "Generate key" again
- Check Downloads folder manually

**Can't find the file?**
- Search for `*.json` in Downloads folder
- Look for files modified in the last few minutes
- File name starts with `stratai-`

**File already exists error?**
- Delete the old `firebase-service-account.json` in backend folder
- Try moving the new file again

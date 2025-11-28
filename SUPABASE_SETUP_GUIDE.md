# 🗄️ Supabase Database Setup - Complete Guide

## Current Status
You're on the Supabase homepage:

![Supabase Homepage](file:///C:/Users/rockm/.gemini/antigravity/brain/b53a50a1-45c5-4c8a-ae0d-d0db55cf2f00/supabase_login_page_1764233424147.png)

---

## 📋 Step-by-Step Instructions

### **Step 1: Sign Up / Sign In**

1. Click **"Start your project"** button (green button on the homepage)
   - OR click **"Sign in"** if you already have an account

2. **Sign up with**:
   - **GitHub** (recommended - fastest)
   - OR **Email** (you'll need to verify)

3. After signing in, you'll see the Supabase Dashboard

---

### **Step 2: Create New Project**

1. Click **"New Project"** button
2. Fill in the details:
   - **Organization**: Select or create one
   - **Name**: `stratai`
   - **Database Password**: Create a strong password
     - ⚠️ **IMPORTANT**: Save this password! You'll need it for the connection string
     - Example: `MyStr0ngP@ssw0rd123!`
   - **Region**: Choose closest to your location
     - For India: `Southeast Asia (Singapore)`
     - For US: `East US (North Virginia)`
   - **Pricing Plan**: Free (default)

3. Click **"Create new project"**
4. **Wait ~2 minutes** for project to be created (you'll see a progress indicator)

---

### **Step 3: Get Connection String**

Once your project is ready:

1. **Click the Settings icon** (⚙️ gear icon) in the left sidebar
2. **Click "Database"** in the settings menu
3. **Scroll down** to find **"Connection string"** section
4. **Click on "URI"** tab (not "Connection pooling")
5. You'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Copy this string**
7. **Replace `[YOUR-PASSWORD]`** with the password you created in Step 2

**Example:**
```
Before: postgresql://postgres:[YOUR-PASSWORD]@db.abc123.supabase.co:5432/postgres
After:  postgresql://postgres:MyStr0ngP@ssw0rd123!@db.abc123.supabase.co:5432/postgres
```

---

### **Step 4: Update Backend .env**

1. Open `c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\.env`
2. Find the line: `DATABASE_URL=postgresql://...`
3. Replace it with your Supabase connection string
4. Save the file

**Example `.env` file:**
```env
PORT=5000
GEMINI_API_KEY=AIzaSyC1DS4RcwMOvRhYgE7669FPFnWbyH_uVsI
DATABASE_URL=postgresql://postgres:MyStr0ngP@ssw0rd123!@db.abc123.supabase.co:5432/postgres
NODE_ENV=development
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
```

---

### **Step 5: Run Database Schema**

1. In Supabase Dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. Open `c:\AGI_PROJECT\stratai---dynamic-business-strategy-engine\backend\schema.sql`
4. **Copy the entire contents** of that file
5. **Paste** it into the Supabase SQL Editor
6. Click **"Run"** button (or press `Ctrl+Enter`)
7. You should see: **"Success. No rows returned"**

---

## ✅ Verification

After completing all steps, verify:

1. **Database tables created**:
   - In Supabase, go to **Table Editor**
   - You should see 3 tables: `users`, `businesses`, `strategies`

2. **Connection string works**:
   ```powershell
   # Test connection (optional)
   cd backend
   npm install
   node -e "const {Pool} = require('pg'); const pool = new Pool({connectionString: process.env.DATABASE_URL}); pool.query('SELECT NOW()').then(r => console.log('✅ Connected!', r.rows[0])).catch(e => console.error('❌ Error:', e.message));"
   ```

---

## 🚀 After Database Setup

Once database is configured, you're ready to launch!

```bash
# From project root
npm install
cd backend && npm install && cd ..

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

Visit: **http://localhost:5173**

---

## 🐛 Troubleshooting

**Can't find connection string?**
- Make sure you're in Settings → Database
- Look for "Connection string" section
- Click "URI" tab (not "Connection pooling")

**Connection string has `[YOUR-PASSWORD]`?**
- Replace it with the password you set when creating the project
- If you forgot it, you can reset it in Settings → Database → Reset database password

**Schema fails to run?**
- Make sure you copied the ENTIRE schema.sql file
- Check for any error messages in the SQL Editor
- Try running it again

**Tables not showing?**
- Refresh the Table Editor page
- Check SQL Editor for any error messages

---

## 📞 Need Help?

If you get stuck:
1. Take a screenshot of where you are
2. Tell me what step you're on
3. I'll help you through it!

**You're on the final step!** 🎉

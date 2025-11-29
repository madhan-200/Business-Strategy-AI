# 🚀 Full Stack Automatic Deployment Guide

Your code is now pushed to GitHub! This enables **Automatic Deployment** (CI/CD).
Whenever you push changes to GitHub, your live site will update automatically.

## 🔗 Repository
**URL:** https://github.com/madhan-200/Business-Strategy-AI

---

## Part 1: Frontend Deployment (Netlify)

1.  **Go to:** [app.netlify.com](https://app.netlify.com)
2.  **Click:** "Add new site" → "Import from an existing project"
3.  **Choose:** "GitHub"
4.  **Select Repo:** `madhan-200/Business-Strategy-AI`
5.  **Settings (Auto-detected):**
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
6.  **Click:** "Deploy Site"

✅ **Result:** Your frontend will be live at `https://random-name.netlify.app`

---

## Part 2: Backend Deployment (Render)

1.  **Go to:** [dashboard.render.com](https://dashboard.render.com)
2.  **Click:** "New +" → "Web Service"
3.  **Connect:** GitHub account
4.  **Select Repo:** `madhan-200/Business-Strategy-AI`
5.  **Settings:**
    - **Name:** `stratai-backend`
    - **Root Directory:** `backend` (Important!)
    - **Environment:** `Node`
    - **Build Command:** `npm install && npm run build`
    - **Start Command:** `npm start`
6.  **Environment Variables (Advanced):**
    - Add `DATABASE_URL`, `GEMINI_API_KEY`, etc. from your `.env` file.
7.  **Click:** "Create Web Service"

✅ **Result:** Your backend will be live at `https://stratai-backend.onrender.com`

---

## Part 3: Connect Them

1.  Copy your **Backend URL** from Render.
2.  Go to **Netlify** → Site Settings → Environment Variables.
3.  Add new variable:
    - Key: `VITE_API_URL`
    - Value: `https://stratai-backend.onrender.com` (Your actual URL)
4.  Go to **Deploys** → "Trigger deploy" → "Clear cache and deploy site".

🎉 **Done!** Your full stack app is now live and will auto-update on every git push.

# Deploying StratAI to Netlify

This guide explains how to deploy the StratAI frontend to Netlify.

## ⚠️ Important Note About Backend

StratAI is a full-stack application. Deploying **only** the frontend to Netlify means the user interface will be live, but it **will not function** (login, signup, strategy generation) until the backend is also deployed to a service like Render, Railway, or Heroku.

Currently, the frontend is configured to connect to `http://localhost:5000`. You will need to update this after deploying the backend.

## Option 1: Drag & Drop (Easiest)

1.  **Build the project locally:**
    ```bash
    npm run build
    ```
    This creates a `dist` folder in your project directory.

2.  **Log in to Netlify:**
    Go to [app.netlify.com](https://app.netlify.com) and log in.

3.  **Deploy:**
    - Go to the "Sites" tab.
    - Drag and drop the `dist` folder onto the area that says "Drag and drop your site folder here".
    - Netlify will upload and deploy your site instantly.

## Option 2: Netlify CLI (Command Line)

If you have `netlify-cli` installed:

1.  **Login:**
    ```bash
    npx netlify login
    ```

2.  **Deploy:**
    ```bash
    npx netlify deploy --prod
    ```
    - **Publish directory:** `dist`
    - **Build command:** `npm run build`

## Post-Deployment Configuration

Once deployed, you need to configure the environment variables in Netlify if you want to change them from the defaults (though for a static build, they are baked in at build time).

**To update the backend URL:**
1.  Deploy your backend (e.g., to Render).
2.  Update `.env.local` in your local project:
    ```
    VITE_API_URL=https://your-backend-url.onrender.com
    ```
    (Replace with your actual backend URL)
3.  Re-run `npm run build`.
4.  Re-deploy to Netlify.

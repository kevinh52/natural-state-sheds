# Cloudflare Pages Deployment Guide

## Prerequisites ✅
- GitHub repository created: `https://github.com/kevinh52/natural-state-sheds`
- Code pushed to GitHub
- Cloudflare account (free)

## Step-by-Step Deployment

### 1. Access Cloudflare Dashboard
1. Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. Sign in to your Cloudflare account (create one if needed)

### 2. Create Pages Project
1. Click **"Pages"** in the left sidebar
2. Click **"Create a project"**
3. Select **"Connect to Git"**

### 3. Connect GitHub Repository
1. Click **"Connect to Git"**
2. Authorize Cloudflare to access your GitHub account
3. Select your repository: `kevinh52/natural-state-sheds`
4. Click **"Install and authorize"**

### 4. Configure Build Settings
Fill in the following settings:

- **Project name**: `natural-state-sheds` (or your preferred name)
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (leave empty)

### 5. Environment Variables (Optional)
No environment variables needed for this project.

### 6. Deploy
1. Click **"Save and Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)

### 7. Access Your Website
Once deployment is complete, you'll get a URL like:
`https://natural-state-sheds.pages.dev`

## Custom Domain (Optional)
1. In your Pages project dashboard, go to **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `naturalstatesheds.com`)
4. Follow the DNS configuration instructions

## Updating Your Website
To update your website:
1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Cloudflare Pages will automatically rebuild and deploy

## Troubleshooting
- If build fails, check the build logs in the Cloudflare Pages dashboard
- Make sure all dependencies are in `package.json`
- Verify the build output directory is set to `out`

## Your Repository URL
`https://github.com/kevinh52/natural-state-sheds` 
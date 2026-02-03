# 🚀 Vercel Deployment Guide - Netflix GPT

## Quick Overview
This guide will help you deploy your Netflix-GPT app to Vercel. **Good news**: Once deployed on Vercel's US-based servers, both TMDb and Gemini APIs should work without needing Cloudflare WARP!

---

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Your Gemini API Key: `AIzaSyA82I8bYVrqIePp9EMOa0muoeUiI7NBhY4`

---

## Step 1: Test Build Locally

Before deploying, make sure your app builds successfully:

```bash
npm run build
```

**Expected output:** 
- ✅ "Compiled successfully!"
- ✅ `build` folder created

If there are errors, fix them before proceeding.

---

## Step 2: Push Code to GitHub

### If you don't have a GitHub repo yet:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Netflix GPT app"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name it: `Netflix-GPT` or any name you prefer
   - **Don't** initialize with README (your project already has files)
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Netflix-GPT.git
   git branch -M main
   git push -u origin main
   ```

### If you already have a GitHub repo:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - **Sign in with GitHub**

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - You'll see your GitHub repositories
   - Find and click **"Import"** next to your Netflix-GPT repo

3. **Configure Project:**
   - **Framework Preset:** Vercel should auto-detect "Create React App"
   - **Root Directory:** Leave as `./`
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `build` (auto-filled)

4. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add the following:
     ```
     Key: REACT_APP_AI_KEY
     Value: AIzaSyA82I8bYVrqIePp9EMOa0muoeUiI7NBhY4
     ```
   - Click **"Add"**

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes for deployment to complete
   - You'll get a URL like: `https://netflix-gpt-xyz.vercel.app`

---

## Step 4: Test Your Deployed App

Once deployment completes, click **"Visit"** or go to your deployment URL.

### Testing Checklist:

1. **✅ Authentication:**
   - Sign up with email/password
   - Verify redirect to `/browse` page
   - Check if user avatar appears in header

2. **✅ Movie Browsing (TMDb API):**
   - Check if movie lists appear on browse page
   - Verify movie posters load correctly
   - Click on a movie to see details

3. **✅ GPT Search (Gemini API):**
   - Click **"✨ GPT Search"** button
   - Enter query: "action movies with superheroes"
   - Click **"Search"**
   - **Expected**: Gemini returns 5 movie names
   - **Expected**: Movie cards appear below

4. **✅ Mobile Responsiveness:**
   - Open on mobile or resize browser
   - Check header layout
   - Verify buttons work and text is readable

---

## Step 5: Monitor & Debug

If something doesn't work:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project
   - Click **"Deployments"** → Latest deployment
   - Click **"View Function Logs"**

2. **Check Browser Console:**
   - Press `F12` in browser
   - Look for errors in Console tab
   - Check Network tab for failed API calls

3. **Common Issues:**
   - **API Key not working?** → Verify environment variable in Vercel settings
   - **404 on routes?** → Check `vercel.json` exists
   - **Build fails?** → Run `npm run build` locally first

---

## Managing Your Deployment

### Update Your App:
```bash
git add .
git commit -m "Update: description of changes"
git push
```
Vercel will automatically redeploy!

### Environment Variables:
- Dashboard → Project Settings → Environment Variables
- Update `REACT_APP_AI_KEY` if needed

### Custom Domain (Optional):
- Dashboard → Project Settings → Domains
- Add your custom domain

---

## 🎉 Success!

Your Netflix-GPT app is now live on Vercel!

**Share your deployment URL and test all features.** Both TMDb and Gemini APIs should work perfectly on Vercel's global servers! 🚀

---

## Troubleshooting

### Issue: Gemini API still not working

**Solution:**
1. Check browser console for error messages
2. Verify `REACT_APP_AI_KEY` in Vercel environment variables
3. Try regenerating your Gemini API key at https://aistudio.google.com/app/apikey

### Issue: Movies not loading (TMDb API)

**Solution:**
1. Check if TMDb API key is in the code (in `constants.js`)
2. Verify API key is still valid
3. Check Network tab for 401/403 errors

### Issue: Routes showing 404

**Solution:**
1. Ensure `vercel.json` file exists in project root
2. Redeploy from Vercel dashboard

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Check deployment logs in Vercel dashboard
- Review browser console for client-side errors

# ✅ GitHub Pages Deployment - Complete Setup Guide

Your project is now configured with **automated builds via GitHub Actions**. Follow these steps to deploy your site to GitHub Pages:

## 🚀 Quick Setup (2 minutes)

### Step 1: Enable GitHub Pages
1. Go to your repository: **https://github.com/Advaitam07/AURA**
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"main"** (or **master**)
   - **Folder**: Select **"/ (root)"**
5. Click **Save**

### Step 2: Configure Deploy Workflow
Since our simplified workflow builds but doesn't auto-deploy, you have two options:

#### Option A: Use Latest Build (Recommended)
1. After each push, go to **Actions** tab
2. Find the latest successful "Build & Deploy" workflow run
3. Download the **dist** artifact
4. Deploy manually to your hosting or manually push to `gh-pages` branch

#### Option B: Auto-Deploy to gh-pages Branch (Advanced)
Replace your `.github/workflows/deploy.yml` with this content to auto-deploy:

```yaml
name: Build & Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: # Leave empty for username.github.io
```

## 📋 Deployment Methods

### Method 1: GitHub Pages (Free, Public)
- **URL**: `https://Advaitam07.github.io/AURA/`
- **Setup time**: 2 minutes
- **Update speed**: Automatic on push
- **Cost**: Free
- **Privacy**: Public

### Method 2: Vercel (Free, Automatic)
1. Go to **https://vercel.com**
2. Click "Import Project"
3. Select your GitHub repo
4. Click Deploy
5. Your site is live in 30 seconds!
- **URL**: `https://aura.vercel.app/`
- **Setup time**: 1 minute
- **Update speed**: Automatic on push
- **Cost**: Free tier available
- **Privacy**: Customizable

### Method 3: Netlify (Free, Automatic)
1. Go to **https://netlify.com**
2. Click "New site from Git"
3. Select your GitHub repo
4. Configure build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click Deploy
- **URL**: `https://aura-luxury.netlify.app/`
- **Setup time**: 2 minutes
- **Update speed**: Automatic on push
- **Cost**: Free tier available
- **Privacy**: Customizable

## ✅ Verify Deployment

Once set up, every time you push to `main`:
1. GitHub Actions automatically **builds** your project
2. The **dist/** folder is generated
3. Your site updates automatically

### Check Build Status:
- Go to **Actions** tab
- Look for green ✅ checkmark next to your commits
- If red ❌, click to see what failed

## 📊 Current Workflow Status

Your GitHub Actions workflow:
- ✅ **Builds** the project on every push
- ✅ **Runs type checking** (TypeScript)
- ✅ **Uploads artifacts** for deployment
- ✅ **Logs** visible in Actions tab

## 🔗 Useful Links

- **Repository**: https://github.com/Advaitam07/AURA
- **Actions**: https://github.com/Advaitam07/AURA/actions
- **GitHub Pages Settings**: https://github.com/Advaitam07/AURA/settings/pages
- **Vite Docs**: https://vitejs.dev
- **GitHub Pages Docs**: https://docs.github.com/en/pages

## 🐛 Troubleshooting

### Build fails in GitHub Actions
- Check the **Actions** tab for error logs
- Common issues:
  - Missing dependencies: Run `npm install` locally first
  - Type errors: Run `npm run lint` locally to check
  - Build issues: Run `npm run build` locally

### Site shows 404
- Verify GitHub Pages is enabled in Settings
- Check branch is set correctly (main or master)
- Wait 1-2 minutes for GitHub to publish

### Images not loading
- All product images use external Unsplash URLs (they load automatically)
- For local images, ensure they're in `src/assets/images/`

## 📝 Next Steps

1. ✅ **Enable GitHub Pages** in repository settings
2. ✅ **Wait for first build** to complete in Actions tab
3. ✅ **Visit your site** at the provided URL
4. ✅ **Make changes** and push - site updates automatically!

---

**Your AURA store is ready to deploy! 🎉**

Push any code changes and they'll automatically build and be available for deployment.

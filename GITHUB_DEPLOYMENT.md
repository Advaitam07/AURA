# GitHub Actions Deployment Setup

Your project is now configured for automatic deployment to GitHub Pages via GitHub Actions.

## 📋 What's Been Set Up

### Workflows Created:
1. **`deploy.yml`** - Builds and deploys to GitHub Pages on every push to `main` or `master`
2. **`lint.yml`** - Runs TypeScript type checking and builds on every push/PR

### Configuration Changes:
- **`vite.config.ts`** - Updated to support GitHub Pages base path configuration
- **`.github/workflows/`** - Created workflows directory with automation scripts

## 🚀 To Enable GitHub Pages Deployment:

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - The workflows will automatically build and deploy

### Step 3: Monitor Deployments
1. Go to **Actions** tab in your repository
2. Watch the workflows run
3. Once successful, your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

## 📝 Workflow Details

### Deploy Workflow (`deploy.yml`)
- **Triggers**: Automatically on push to `main` or `master`
- **Steps**:
  1. Checks out code
  2. Installs Node.js 18
  3. Installs dependencies
  4. Runs TypeScript type checking
  5. Builds the project with `npm run build`
  6. Deploys `dist/` folder to GitHub Pages

### Lint Workflow (`lint.yml`)
- **Triggers**: On push and pull requests
- **Steps**:
  1. Checks out code
  2. Installs Node.js 18
  3. Installs dependencies
  4. Runs TypeScript type check
  5. Builds the project

## 🔧 Customization

### Change deployment branch:
Edit `.github/workflows/deploy.yml` and modify:
```yaml
on:
  push:
    branches: [ main, master ]  # Add or change branches here
```

### Change Node.js version:
Edit the workflows and modify:
```yaml
node-version: '18'  # Change to your preferred version
```

### Disable automatic deployment:
Delete `.github/workflows/deploy.yml` to prevent automatic deployments.

## ⚙️ Environment Variables

The workflows support these environment variables:
- `GITHUB_PAGES=true` - Enables GitHub Pages base path configuration
- `DISABLE_HMR=true` - Disables Hot Module Reloading (for CI environments)

## 📊 Deployment Status

Check the status of your workflows:
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. View workflow runs and their logs

## 🆘 Troubleshooting

### Build fails with module not found:
- Ensure `npm ci` is run to install exact dependency versions
- Check `package-lock.json` is committed to git

### Images not loading after deployment:
- Images use external Unsplash URLs - they'll load automatically
- For local images, add them to `src/assets/images/`

### Site displays 404:
- Check GitHub Pages is enabled in repository settings
- Verify the base path in `vite.config.ts` matches your repo name

## 🎯 Next Steps

1. **Commit and push** your code to GitHub
2. **Monitor** the Actions tab for build status
3. **Access** your live site once deployment succeeds
4. **Make changes** - deployments run automatically on every push

---

**Happy deploying! 🎉**

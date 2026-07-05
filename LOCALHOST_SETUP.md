# AURA Store - Localhost Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will start on **http://localhost:3000**

### 3. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Development Commands

- **`npm run dev`** - Start the development server with hot module reloading (HMR)
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run TypeScript type checking
- **`npm run clean`** - Remove dist folder and build artifacts

## Environment Variables

The `.env.local` file contains local development configuration:
```
VITE_APP_NAME=AURA Store
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
```

To use custom values, edit `.env.local` and restart the dev server.

## Features

- ✅ Hot Module Reloading (HMR) enabled
- ✅ Tailwind CSS with Vite integration
- ✅ React 19 with TypeScript
- ✅ Vite dev server on port 3000
- ✅ All interfaces accessible (0.0.0.0)

## Troubleshooting

### Port 3000 already in use
If port 3000 is in use, you can modify the dev script in `package.json`:
```bash
"dev": "vite --port=3001 --host=0.0.0.0"
```

### Hot reload not working
The HMR is controlled by the `DISABLE_HMR` environment variable. To enable:
```bash
$env:DISABLE_HMR='false'; npm run dev
```

### Clear cache
```bash
npm run clean
npm install
npm run dev
```

---

**Happy coding! 🚀**

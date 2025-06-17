# Running OTT Product Images Locally

This guide explains how to run the OTT Product Images Manager locally without Vercel.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What's Different from Vercel

- **Local API**: Instead of Vercel serverless functions, we use Express.js server
- **Local Storage**: Data is saved to a local `data.json` file instead of cloud storage
- **No Build Step**: The server serves static files directly

## Available Scripts

- `npm run dev` - Start local development server
- `npm start` - Start local development server (same as dev)
- `npm run vercel-dev` - Run with Vercel (if you want to go back)
- `npm run deploy` - Deploy to Vercel

## Local Development Features

- ✅ Hot reload (restart server to see changes)
- ✅ Local data persistence (saved to `data.json`)
- ✅ Same API endpoints as Vercel version
- ✅ Serves all static assets (images, CSS, JS)

## API Endpoints

- `GET /api/get-data` - Retrieve saved product data
- `POST /api/save-data` - Save product data

## Troubleshooting

- **Port 3000 in use?** Set a different port: `PORT=3001 npm run dev`
- **Changes not showing?** Restart the server with `npm run dev`
- **Data not saving?** Check that `data.json` is created in the project root

## Going Back to Vercel

If you want to deploy to Vercel again:
```bash
npm run deploy
```

The original Vercel functions are still in the `api/` folder and will work as before.

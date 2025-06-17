# Database Connection Error Fix

## Problem
Error on Vercel: `Save data error: Error: connect ECONNREFUSED 127.0.0.1:5432`

## Root Cause
The application is trying to connect to a local PostgreSQL database (127.0.0.1:5432), but Vercel serverless functions don't have access to local databases.

## Solution

### Step 1: Set Environment Variable in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new environment variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgres://neondb_owner:npg_N0xrORBH3dbY@ep-solitary-shape-a4ownmga-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environments**: Select all (Production, Preview, Development)

### Step 2: Redeploy

After setting the environment variable, redeploy your application:

```bash
vercel --prod
```

Or use the deployment script:

```bash
./deploy.sh
```

### Step 3: Verify

Test your API endpoint:
- `https://your-app.vercel.app/api/save-data`
- `https://your-app.vercel.app/api/get-data`

## Alternative: Using Vercel CLI

```bash
# Set environment variable
vercel env add DATABASE_URL

# When prompted, paste:
postgres://neondb_owner:npg_N0xrORBH3dbY@ep-solitary-shape-a4ownmga-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

# Deploy
vercel --prod
```

## Files Updated
- ✅ `.env.example` - Updated with Neon database credentials
- ✅ `.env` - Created for local development
- ✅ `DEPLOYMENT.md` - Added database setup instructions
- ✅ `deploy.sh` - Enhanced with environment variable checks

## What This Fixes
- ❌ `ECONNREFUSED 127.0.0.1:5432` → ✅ Connects to Neon PostgreSQL
- ❌ Local database dependency → ✅ Cloud database
- ❌ Manual environment setup → ✅ Automated deployment script

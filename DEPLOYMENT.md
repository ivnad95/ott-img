# Deployment Guide

## Current Setup Status ✅
Your project is now configured to work in both environments:
- 🚀 **Local Development**: Express.js server with local data storage
- ☁️ **Vercel Production**: Serverless functions with same API endpoints

## Quick Vercel Deployment

Your app is now ready for Vercel deployment! Here's how to deploy it:

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ivnad95/product-images-ott)

### Option 2: Manual Deployment

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Environment Variables Setup

### For Database Connection

Before deploying, you need to configure your database environment variables in Vercel:

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings > Environment Variables**
4. **Add the following environment variable**:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgres://neondb_owner:npg_N0xrORBH3dbY@ep-solitary-shape-a4ownmga-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`

### Alternative: Using Vercel CLI

You can also set environment variables using the Vercel CLI:

```bash
vercel env add DATABASE_URL
# When prompted, paste your database URL
```

### Database Setup (Neon PostgreSQL)

Your app is configured to use Neon PostgreSQL. The database credentials are:
- **Host**: ep-solitary-shape-a4ownmga-pooler.us-east-1.aws.neon.tech
- **Database**: neondb
- **User**: neondb_owner
- **Password**: npg_N0xrORBH3dbY

The application will automatically create the required table (`product_data`) on first use.

### Option 3: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import the `product-images-ott` repository
4. Vercel will automatically deploy it

## Features Available After Deployment

✅ **Mobile-responsive product image gallery**  
✅ **Product categorization** (New/Current)  
✅ **Inventory management** (Size inputs XXS-XXXL)  
✅ **Auto-save functionality** (server-side)
✅ **Serverless API endpoints**  
✅ **Modern glassmorphism UI**  

## Data Persistence

- **Production**: Data saved to PostgreSQL when `DATABASE_URL` is provided
- **API Endpoints**: Ready for database integration
- **Future**: Can easily integrate with:
  - Vercel KV
  - MongoDB Atlas
  - Supabase
  - PlanetScale

## Live URL Structure

After deployment, your app will be available at:
- Production: `https://product-images-ott.vercel.app`
- API endpoints: 
  - `https://product-images-ott.vercel.app/api/save-data`
  - `https://product-images-ott.vercel.app/api/get-data`

## Development

To run locally:
```bash
npm install
npm run dev
```

Your app will be available at `http://localhost:3000`

## Troubleshooting

### Database Connection Issues

If you get errors like `ECONNREFUSED 127.0.0.1:5432`, it means:

1. **Environment variable not set**: Make sure `DATABASE_URL` is configured in Vercel
2. **Wrong database URL**: Verify the database URL is correct in your environment variables
3. **Database not accessible**: Check if your Neon database is running and accessible

### Common Error Messages

- `Error: connect ECONNREFUSED 127.0.0.1:5432`: Database URL not configured
- `Error: getaddrinfo ENOTFOUND`: Invalid database host
- `Error: password authentication failed`: Wrong credentials

### How to Fix

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add or update the `DATABASE_URL` variable
3. Redeploy your application

## Notes

- All product images are included in the repository
- Serverless functions handle API requests
- Zero configuration needed for Vercel deployment 

## Deployment Script

You can use the deployment script to deploy your app:
```bash
./deploy.sh
```

This script will handle the deployment process for you, ensuring that your app is deployed successfully. 
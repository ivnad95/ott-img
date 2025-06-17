#!/bin/bash

echo "🚀 Starting OTT Product Images deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in to Vercel
echo "🔑 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login:"
    vercel login
fi

# Check if DATABASE_URL environment variable is set
echo "🗄️  Checking database configuration..."
if ! vercel env ls | grep -q "DATABASE_URL"; then
    echo "⚠️  DATABASE_URL not found in Vercel environment variables."
    echo "🔧 Setting up DATABASE_URL..."
    echo "Please paste your database URL when prompted:"
    vercel env add DATABASE_URL
fi

# Deploy to production
echo "📦 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your Vercel domain" 

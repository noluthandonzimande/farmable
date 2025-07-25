#!/bin/bash

echo "🚀 Starting Netlify build process..."

# Navigate to frontend directory
cd farming-app

echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️ Building React application..."
npm run build

echo "✅ Build completed successfully!"

# List build directory contents for verification
echo "📁 Build directory contents:"
ls -la build/

echo "🎉 Ready for deployment!"
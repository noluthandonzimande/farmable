#!/bin/bash

echo "🚀 Starting Netlify build process..."

# Navigate to frontend directory
cd farming-app

echo "📦 Installing frontend dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "🏗️ Building React application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build directory contents:"
    ls -la build/
    echo "🎉 Ready for deployment!"
else
    echo "❌ Build failed - build directory not found"
    exit 1
fi
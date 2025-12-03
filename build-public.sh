#!/bin/bash

# Build script that excludes admin pages from the static export

echo "🔧 Preparing build without admin pages..."

# Move admin folder outside app directory temporarily
if [ -d "app/admin" ]; then
  echo "📦 Moving admin folder outside app directory..."
  mv app/admin admin-backup
fi

# Run the build
echo "🏗️  Building Next.js project..."
npm run build

BUILD_EXIT_CODE=$?

# Move admin folder back
if [ -d "admin-backup" ]; then
  echo "♻️  Restoring admin folder..."
  mv admin-backup app/admin
fi

# Copy server configuration files to output directory
if [ $BUILD_EXIT_CODE -eq 0 ]; then
  echo "📋 Copying server configuration files..."
  
  # Copy _redirects for Netlify
  if [ -f "public/_redirects" ]; then
    cp public/_redirects out/_redirects
    echo "  ✓ Copied _redirects for Netlify"
  fi
  
  # Copy .htaccess for Apache
  if [ -f "public/.htaccess" ]; then
    cp public/.htaccess out/.htaccess
    echo "  ✓ Copied .htaccess for Apache"
  fi
  
  echo "✅ Build complete! Admin pages excluded from /out directory"
  echo "ℹ️  Admin pages are still available in development mode (npm run dev)"
  echo "📝 Server configuration files copied to /out directory"
else
  echo "❌ Build failed with exit code $BUILD_EXIT_CODE"
  exit $BUILD_EXIT_CODE
fi


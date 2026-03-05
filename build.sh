#!/bin/bash
set -e

echo "Building Smart AI Healthcare Application..."

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Install Python dependencies
echo "Installing Python dependencies..."
cd app
pip install -r requirements.txt
cd ..

echo "Build completed successfully!"
echo "Frontend built to: frontend/dist"
echo "To start the application:"
echo "  cd app && uvicorn main:app --reload"

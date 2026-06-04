#!/bin/bash

# SentiAnalyze Development Startup Script
# Starts both Flask backend and Next.js frontend

echo "🚀 Starting SentiAnalyze Development Environment..."
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+"
    exit 1
fi

# Check if Node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Start Flask Backend
echo "📦 Starting Flask Backend..."
python3 app.py &
FLASK_PID=$!

# Wait for Flask to start
sleep 3

# Start Next.js Frontend
echo "🎨 Starting Next.js Frontend..."
cd web
npm run dev &
NEXT_PID=$!

echo ""
echo "✅ Development environment started!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle cleanup
trap cleanup EXIT INT TERM

cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $FLASK_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    wait $FLASK_PID 2>/dev/null
    wait $NEXT_PID 2>/dev/null
    echo "✅ Servers stopped"
}

wait

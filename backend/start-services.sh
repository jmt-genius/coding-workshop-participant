#!/bin/bash

# Set environment variables for postgres database
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_USER=postgres
export POSTGRES_PASS=postgres123
export POSTGRES_NAME=postgres
export IS_LOCAL=true

echo "Starting backend services with postgres database..."
echo "Database: $POSTGRES_NAME"
echo "Host: $POSTGRES_HOST:$POSTGRES_PORT"

# Start all services in background
echo "Starting employees service..."
cd employees-service && python function.py &
EMP_PID=$!

echo "Starting projects service..."
cd ../projects-service && python function.py &
PROJ_PID=$!

echo "Starting teams service..."
cd ../teams-service && python function.py &
TEAM_PID=$!

echo "Starting auth service..."
cd ../auth-service && python function.py &
AUTH_PID=$!

echo "Starting analytics service..."
cd ../analytics-service && python function.py &
ANALYTICS_PID=$!

echo "Starting logs service..."
cd ../logs-service && python function.py &
LOGS_PID=$!

echo "Starting meetings service..."
cd ../meetings-service && python function.py &
MEETINGS_PID=$!

echo "All services started!"
echo "Employees PID: $EMP_PID"
echo "Projects PID: $PROJ_PID" 
echo "Teams PID: $TEAM_PID"
echo "Auth PID: $AUTH_PID"
echo "Analytics PID: $ANALYTICS_PID"
echo "Logs PID: $LOGS_PID"
echo "Meetings PID: $MEETINGS_PID"

# Function to kill all services
cleanup() {
    echo "Stopping all services..."
    kill $EMP_PID $PROJ_PID $TEAM_PID $AUTH_PID $ANALYTICS_PID $LOGS_PID $MEETINGS_PID 2>/dev/null
    exit
}

# Trap Ctrl+C to cleanup
trap cleanup INT

# Wait for all processes
wait

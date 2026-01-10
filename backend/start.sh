#!/bin/bash

# Start script for the backend server

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Create uploads directory if it doesn't exist
mkdir -p ../public/uploads

# Run the server
python main.py

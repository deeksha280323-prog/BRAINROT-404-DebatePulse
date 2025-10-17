#!/bin/bash

echo "🎤 Starting DebatePulse..."
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "❌ Python is not installed or not in PATH"
        echo "Please install Python from https://python.org"
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

# Check if Streamlit is installed
$PYTHON_CMD -c "import streamlit" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "📦 Installing Streamlit and dependencies..."
    $PYTHON_CMD -m pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install requirements"
        exit 1
    fi
fi

echo "✅ Dependencies ready!"
echo ""
echo "🌐 Opening DebatePulse in your browser..."
echo "💡 Press Ctrl+C to stop the application"
echo "================================================"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run Streamlit with specific path
$PYTHON_CMD -m streamlit run "$SCRIPT_DIR/app.py" --server.port 8501 --server.address 0.0.0.0

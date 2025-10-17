@echo off
echo 🎤 Starting DebatePulse...
echo ================================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Check if Streamlit is installed
python -c "import streamlit" >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Streamlit and dependencies...
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Failed to install requirements
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready!
echo.
echo 🌐 Opening DebatePulse in your browser...
echo 💡 Press Ctrl+C to stop the application
echo ================================================

REM Run Streamlit with specific path
python -m streamlit run "%~dp0app.py" --server.port 8501 --server.address 0.0.0.0

pause

#!/usr/bin/env python3
"""
DebatePulse - AI-Powered Debate Analysis Platform
Run this script to start the Streamlit application
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def run_streamlit():
    """Run the Streamlit application"""
    print("🚀 Starting DebatePulse...")
    try:
        # Get the absolute path to the app.py file
        app_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app.py")
        print(f"📁 Running from: {app_path}")
        
        subprocess.run([
            sys.executable, 
            "-m", "streamlit", 
            "run", app_path, 
            "--server.port", "8501", 
            "--server.address", "0.0.0.0"
        ])
    except KeyboardInterrupt:
        print("\n👋 Shutting down DebatePulse...")
    except Exception as e:
        print(f"❌ Error running Streamlit: {e}")

def main():
    """Main function"""
    print("🎤 Welcome to DebatePulse!")
    print("=" * 50)
    
    # Check if requirements.txt exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        return
    
    # Install requirements
    if not install_requirements():
        return
    
    print("\n" + "=" * 50)
    print("🌐 The application will open in your browser at:")
    print("   http://localhost:8501")
    print("\n💡 Press Ctrl+C to stop the application")
    print("=" * 50)
    
    # Run Streamlit
    run_streamlit()

if __name__ == "__main__":
    main()

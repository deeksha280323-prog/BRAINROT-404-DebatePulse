'use client'

import { useState } from 'react'
import { Menu, X, Mic, MicOff } from 'lucide-react'

// Figma: Top Navigation Bar
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // TODO: Implement actual recording functionality
    console.log('Recording toggled:', !isRecording)
  }

  return (
    <nav className="bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-secondary-900">
                DebatePulse
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#home"
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#debates"
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Debates
              </a>
              <a
                href="#analysis"
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Analysis
              </a>
              <a
                href="#about"
                className="text-secondary-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </a>
            </div>
          </div>

          {/* Recording Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Recording Button */}
            <button
              onClick={toggleRecording}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isRecording
                  ? 'bg-accent-600 text-white shadow-medium'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Record
                </>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary-700 hover:text-primary-600 p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-secondary-100">
              <a
                href="#home"
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#debates"
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Debates
              </a>
              <a
                href="#analysis"
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Analysis
              </a>
              <a
                href="#about"
                className="text-secondary-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

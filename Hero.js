'use client'

import { useState } from 'react'
import { Play, Upload, Mic, TrendingUp, Users, BarChart3 } from 'lucide-react'

// Figma: Hero/Header Section
export default function Hero() {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // TODO: Implement file upload functionality
    setTimeout(() => setIsUploading(false), 2000)
  }

  return (
    <section className="gradient-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                Analyze Debates with
                <span className="text-gradient block">AI-Powered Insights</span>
              </h1>
              <p className="text-xl text-secondary-600 leading-relaxed max-w-2xl">
                Transform any debate into actionable insights with real-time sentiment analysis, 
                intelligent transcription, and interactive voting systems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                aria-label="Upload debate file"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload Debate</span>
                  </>
                )}
              </button>
              
              <button className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <Mic className="w-5 h-5" />
                <span>Record Live</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">1,247</div>
                <div className="text-sm text-secondary-600">Debates Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">89%</div>
                <div className="text-sm text-secondary-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success-600">15K+</div>
                <div className="text-sm text-secondary-600">Active Users</div>
              </div>
            </div>
          </div>

          {/* Right Column - Demo Interface */}
          <div className="relative">
            <div className="card max-w-lg mx-auto lg:mx-0">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-secondary-700">Live Analysis</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-secondary-900">Climate Change Debate</div>
                    <div className="text-sm text-secondary-600">Dr. Sarah Chen vs Prof. Rodriguez</div>
                  </div>
                </div>

                {/* Demo Sentiment Chart */}
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-secondary-700">Sentiment Analysis</span>
                    <span className="text-xs text-secondary-500">Real-time</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-success-200 rounded-full h-2">
                      <div className="bg-success-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex-1 bg-accent-200 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex-1 bg-secondary-200 rounded-full h-2">
                      <div className="bg-secondary-400 h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-secondary-600 mt-2">
                    <span>Positive</span>
                    <span>Negative</span>
                    <span>Neutral</span>
                  </div>
                </div>

                {/* Demo Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-primary-600">62%</div>
                    <div className="text-xs text-secondary-600">Agree</div>
                  </div>
                  <div className="text-center p-3 bg-accent-50 rounded-lg">
                    <Users className="w-6 h-6 text-accent-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-accent-600">1,247</div>
                    <div className="text-xs text-secondary-600">Votes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center animate-pulse-slow">
              <BarChart3 className="w-8 h-8 text-primary-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center animate-pulse-slow">
              <Mic className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

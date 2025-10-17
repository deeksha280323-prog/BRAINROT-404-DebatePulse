'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DebateUpload from '../components/DebateUpload'
import TranscriptPanel from '../components/TranscriptPanel'
import SummaryCard from '../components/SummaryCard'
import SentimentChart from '../components/SentimentChart'
import VotingPanel from '../components/VotingPanel'
import Timeline from '../components/Timeline'
import Footer from '../components/Footer'

// Figma: Main Page Layout
export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'upload', 'transcript', 'summary', 'sentiment', 'voting', 'timeline']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">DebatePulse</h2>
          <p className="text-secondary-600">Loading AI-powered debate analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section id="hero" className="gradient-bg">
          <Hero />
        </section>

        {/* Upload Section */}
        <section id="upload" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DebateUpload />
          </div>
        </section>

        {/* Main Analysis Dashboard */}
        <section id="analysis" className="py-20 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Live Debate Analysis
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Real-time insights powered by advanced AI technology
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Transcript Panel */}
              <div id="transcript">
                <TranscriptPanel />
              </div>

              {/* Summary Card */}
              <div id="summary">
                <SummaryCard />
              </div>
            </div>

            {/* Sentiment Chart */}
            <div id="sentiment" className="mb-16">
              <SentimentChart />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Voting Panel */}
              <div id="voting">
                <VotingPanel />
              </div>

              {/* Timeline */}
              <div id="timeline">
                <Timeline />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Everything you need to analyze and understand debates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Real-time Analysis
                </h3>
                <p className="text-secondary-600">
                  Get instant sentiment analysis and key insights as the debate unfolds
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Live Transcription
                </h3>
                <p className="text-secondary-600">
                  Accurate, real-time speech-to-text with speaker identification
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Interactive Voting
                </h3>
                <p className="text-secondary-600">
                  Engage your audience with real-time polls and voting systems
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

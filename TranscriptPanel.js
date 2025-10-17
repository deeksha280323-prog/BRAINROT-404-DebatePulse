'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Search, Filter, Download } from 'lucide-react'
import { transcriptData } from '../utils/mockData'

// Figma: Transcript Panel Component
export default function TranscriptPanel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSentiment, setFilterSentiment] = useState('all')
  const [isMuted, setIsMuted] = useState(false)
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const audioRef = useRef(null)

  const filteredTranscript = transcriptData.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSentiment = filterSentiment === 'all' || item.sentiment === filterSentiment
    return matchesSearch && matchesSentiment
  })

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'negative':
        return 'text-accent-600 bg-accent-50 border-accent-200'
      case 'neutral':
        return 'text-secondary-600 bg-secondary-50 border-secondary-200'
      default:
        return 'text-secondary-600 bg-secondary-50 border-secondary-200'
    }
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊'
      case 'negative':
        return '😞'
      case 'neutral':
        return '😐'
      default:
        return '😐'
    }
  }

  const togglePlayPause = () => {
    // TODO: Implement actual audio playback
    setIsPlaying(!isPlaying)
    console.log('Toggle playback:', !isPlaying)
  }

  const handleTimeSeek = (timestamp) => {
    // TODO: Implement time seeking functionality
    setCurrentTime(parseInt(timestamp.split(':')[0]) * 60 + parseInt(timestamp.split(':')[1]))
    console.log('Seek to:', timestamp)
  }

  const exportTranscript = () => {
    // TODO: Implement transcript export functionality
    const transcriptText = transcriptData
      .map(item => `[${item.timestamp}] ${item.speaker}: ${item.text}`)
      .join('\n\n')
    
    const blob = new Blob([transcriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'debate-transcript.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Debate Transcript
          </h2>
          <p className="text-secondary-600">
            Real-time transcription with sentiment analysis
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayPause}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            aria-label={isPlaying ? 'Pause playback' : 'Play transcript'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={exportTranscript}
            className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            aria-label="Export transcript"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <select
          value={filterSentiment}
          onChange={(e) => setFilterSentiment(e.target.value)}
          className="input-field w-full sm:w-48"
          aria-label="Filter by sentiment"
        >
          <option value="all">All Sentiments</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
          <span>Progress</span>
          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 45:32</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / (45 * 60 + 32)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Transcript Content */}
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {filteredTranscript.length === 0 ? (
          <div className="text-center py-12 text-secondary-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
            <p>No transcript entries found matching your search criteria.</p>
          </div>
        ) : (
          filteredTranscript.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-soft cursor-pointer ${
                selectedSpeaker === item.speaker
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-secondary-200 bg-white'
              }`}
              onClick={() => {
                setSelectedSpeaker(item.speaker)
                handleTimeSeek(item.timestamp)
              }}
            >
              <div className="flex items-start space-x-4">
                {/* Timestamp */}
                <button
                  className="flex-shrink-0 text-sm font-mono text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTimeSeek(item.timestamp)
                  }}
                >
                  {item.timestamp}
                </button>

                {/* Speaker and Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-secondary-900">
                      {item.speaker}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(
                        item.sentiment
                      )}`}
                    >
                      <span className="mr-1">{getSentimentIcon(item.sentiment)}</span>
                      {item.sentiment}
                    </span>
                    <span className="text-xs text-secondary-500">
                      {Math.round(item.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <p className="text-secondary-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-secondary-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-secondary-900">
              {transcriptData.length}
            </div>
            <div className="text-sm text-secondary-600">Total Entries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-600">
              {transcriptData.filter(item => item.sentiment === 'positive').length}
            </div>
            <div className="text-sm text-secondary-600">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600">
              {transcriptData.filter(item => item.sentiment === 'negative').length}
            </div>
            <div className="text-sm text-secondary-600">Negative</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600">
              {transcriptData.filter(item => item.sentiment === 'neutral').length}
            </div>
            <div className="text-sm text-secondary-600">Neutral</div>
          </div>
        </div>
      </div>
    </div>
  )
}

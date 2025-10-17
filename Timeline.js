'use client'

import { useState } from 'react'
import { Play, Pause, Clock, Mic, Users, MessageSquare, CheckCircle, Circle } from 'lucide-react'
import { timelineData } from '../utils/mockData'

// Figma: Timeline Component
export default function Timeline() {
  const [currentTime, setCurrentTime] = useState('05:30')
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const getEventIcon = (type) => {
    switch (type) {
      case 'milestone':
        return <CheckCircle className="w-5 h-5 text-primary-600" />
      case 'speech':
        return <Mic className="w-5 h-5 text-accent-600" />
      case 'interaction':
        return <Users className="w-5 h-5 text-success-600" />
      default:
        return <Circle className="w-5 h-5 text-secondary-400" />
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'milestone':
        return 'border-primary-200 bg-primary-50'
      case 'speech':
        return 'border-accent-200 bg-accent-50'
      case 'interaction':
        return 'border-success-200 bg-success-50'
      default:
        return 'border-secondary-200 bg-secondary-50'
    }
  }

  const getEventTextColor = (type) => {
    switch (type) {
      case 'milestone':
        return 'text-primary-800'
      case 'speech':
        return 'text-accent-800'
      case 'interaction':
        return 'text-success-800'
      default:
        return 'text-secondary-800'
    }
  }

  const handleTimeSeek = (timestamp) => {
    setCurrentTime(timestamp)
    // TODO: Implement actual time seeking functionality
    console.log('Seek to:', timestamp)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implement actual playback control
    console.log('Toggle playback:', !isPlaying)
  }

  const formatDuration = (startTime, endTime) => {
    // TODO: Calculate actual duration between events
    return '2:30'
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Debate Timeline
          </h2>
          <p className="text-secondary-600">
            Key moments and events throughout the debate
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-secondary-600">
            <Clock className="w-4 h-4" />
            <span>Current: {currentTime}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary-200"></div>

        {/* Timeline Events */}
        <div className="space-y-8">
          {timelineData.map((event, index) => {
            const isSelected = selectedEvent === event.id
            const isCurrent = currentTime === event.time
            const nextEvent = timelineData[index + 1]
            const duration = nextEvent ? formatDuration(event.time, nextEvent.time) : null

            return (
              <div
                key={event.id}
                className={`relative flex items-start space-x-6 p-4 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary-50 border-2 border-primary-200'
                    : isCurrent
                    ? 'bg-accent-50 border-2 border-accent-200'
                    : 'hover:bg-secondary-50 border-2 border-transparent'
                }`}
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    isCurrent
                      ? 'border-accent-500 bg-accent-100'
                      : isSelected
                      ? 'border-primary-500 bg-primary-100'
                      : 'border-secondary-300 bg-white'
                  }`}>
                    {getEventIcon(event.type)}
                  </div>
                  
                  {/* Duration Badge */}
                  {duration && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-secondary-100 text-secondary-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {duration}
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${getEventTextColor(event.type)}`}>
                      {event.event}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTimeSeek(event.time)
                      }}
                      className="text-sm font-mono text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      {event.time}
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'milestone'
                        ? 'bg-primary-100 text-primary-700'
                        : event.type === 'speech'
                        ? 'bg-accent-100 text-accent-700'
                        : 'bg-success-100 text-success-700'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                  </div>

                  {/* Event Details */}
                  {isSelected && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-secondary-200">
                      <h4 className="font-medium text-secondary-900 mb-2">
                        Event Details
                      </h4>
                      <p className="text-sm text-secondary-600 mb-3">
                        {/* TODO: Add detailed event information */}
                        This is where detailed information about the event would be displayed.
                        It could include speaker notes, key points discussed, audience reactions,
                        or any other relevant context for this moment in the debate.
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-secondary-500">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>2 speakers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>5 comments</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Time Indicator */}
                {isCurrent && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 bg-accent-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline Summary */}
      <div className="mt-8 p-6 bg-secondary-50 rounded-lg border border-secondary-200">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Timeline Summary
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {timelineData.length}
            </div>
            <div className="text-sm text-secondary-600">Total Events</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">
              {timelineData.filter(e => e.type === 'speech').length}
            </div>
            <div className="text-sm text-secondary-600">Speeches</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {timelineData.filter(e => e.type === 'interaction').length}
            </div>
            <div className="text-sm text-secondary-600">Interactions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">
              {timelineData.filter(e => e.type === 'milestone').length}
            </div>
            <div className="text-sm text-secondary-600">Milestones</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button className="btn-secondary flex-1">
          Export Timeline
        </button>
        <button className="btn-primary flex-1">
          Add Custom Event
        </button>
      </div>
    </div>
  )
}

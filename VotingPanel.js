'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown, Users, Clock, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react'
import { votingData } from '../utils/mockData'

// Figma: Voting Panel Component
export default function VotingPanel() {
  const [userVote, setUserVote] = useState(votingData.userVote)
  const [isVoting, setIsVoting] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVote = async (optionId) => {
    if (hasVoted || timeRemaining <= 0) return

    setIsVoting(true)
    
    // TODO: Replace with actual voting API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      setUserVote(optionId)
      setHasVoted(true)
      
      // Update local voting data
      const updatedOptions = votingData.options.map(option => {
        if (option.id === optionId) {
          return { ...option, votes: option.votes + 1 }
        }
        return option
      })
      
      console.log('Vote submitted:', optionId)
    } catch (error) {
      console.error('Voting failed:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const getVotePercentage = (votes) => {
    const total = votingData.options.reduce((sum, option) => sum + option.votes, 0)
    return Math.round((votes / total) * 100)
  }

  const getWinningOption = () => {
    return votingData.options.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    )
  }

  const isVotingOpen = timeRemaining > 0 && !hasVoted
  const winningOption = getWinningOption()

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Live Voting
          </h2>
          <p className="text-secondary-600">
            Cast your vote and see real-time results
          </p>
        </div>

        {/* Voting Status */}
        <div className="flex items-center space-x-4">
          {isVotingOpen ? (
            <div className="flex items-center space-x-2 text-primary-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatTime(timeRemaining)} remaining
              </span>
            </div>
          ) : hasVoted ? (
            <div className="flex items-center space-x-2 text-success-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Vote Submitted</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-accent-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Voting Closed</span>
            </div>
          )}
        </div>
      </div>

      {/* Voting Question */}
      <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          {votingData.question}
        </h3>
        <div className="flex items-center space-x-4 text-sm text-secondary-600">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{votingData.totalVotes.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span>Live results</span>
          </div>
        </div>
      </div>

      {/* Voting Options */}
      <div className="space-y-4 mb-8">
        {votingData.options.map((option, index) => {
          const percentage = getVotePercentage(option.votes)
          const isSelected = userVote === option.id
          const isWinning = option.id === winningOption.id
          
          return (
            <div
              key={option.id}
              className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : isWinning && hasVoted
                  ? 'border-success-300 bg-success-50'
                  : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-secondary-50'
              } ${!isVotingOpen ? 'opacity-75' : 'cursor-pointer'}`}
              onClick={() => isVotingOpen && handleVote(option.id)}
            >
              {/* Option Content */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    isSelected
                      ? 'bg-primary-600 text-white'
                      : isWinning && hasVoted
                      ? 'bg-success-600 text-white'
                      : 'bg-secondary-200 text-secondary-700'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-secondary-900">
                      {option.label}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-secondary-600">
                        {option.votes.toLocaleString()} votes
                      </span>
                      <span className="text-sm font-semibold text-primary-600">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vote Button */}
                {isVotingOpen && (
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-primary-100 hover:text-primary-700'
                    }`}
                    disabled={isVoting}
                  >
                    {isVoting && isSelected ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : isSelected ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                    <span>{isSelected ? 'Voted' : 'Vote'}</span>
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isSelected
                        ? 'bg-primary-600'
                        : isWinning && hasVoted
                        ? 'bg-success-500'
                        : 'bg-secondary-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Winning Badge */}
              {isWinning && hasVoted && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 px-2 py-1 bg-success-100 text-success-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Leading</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Results Summary */}
      {hasVoted && (
        <div className="p-6 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Voting Results
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {votingData.totalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-secondary-600">Total Votes</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">
                {winningOption.percentage}%
              </div>
              <div className="text-sm text-secondary-600">Leading Option</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-secondary-600">Time Remaining</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button className="btn-secondary flex-1">
          Share Results
        </button>
        <button className="btn-primary flex-1">
          View Detailed Analysis
        </button>
      </div>
    </div>
  )
}

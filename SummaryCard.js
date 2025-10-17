'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Users, Target, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { summaryData } from '../utils/mockData'

// Figma: Summary Card Component
export default function SummaryCard() {
  const [expandedPoint, setExpandedPoint] = useState(null)

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-success-600" />
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-accent-600" />
      case 'mixed':
        return <Target className="w-5 h-5 text-primary-600" />
      default:
        return <Info className="w-5 h-5 text-secondary-600" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'negative':
        return 'text-accent-600 bg-accent-50 border-accent-200'
      case 'mixed':
        return 'text-primary-600 bg-primary-50 border-primary-200'
      default:
        return 'text-secondary-600 bg-secondary-50 border-secondary-200'
    }
  }

  const getSpeakingTimeColor = (percentage) => {
    if (percentage >= 60) return 'text-accent-600'
    if (percentage >= 40) return 'text-primary-600'
    return 'text-success-600'
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Debate Summary
          </h2>
          <p className="text-secondary-600">
            AI-generated insights and key takeaways
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getSentimentIcon(summaryData.sentiment.overall)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(summaryData.sentiment.overall)}`}>
            {summaryData.sentiment.overall.charAt(0).toUpperCase() + summaryData.sentiment.overall.slice(1)} Sentiment
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Key Points */}
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary-600" />
            Key Discussion Points
          </h3>
          <div className="space-y-3">
            {summaryData.keyPoints.map((point, index) => (
              <div
                key={index}
                className="p-4 bg-secondary-50 rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-secondary-700 leading-relaxed">
                      {point}
                    </p>
                    {expandedPoint === index && (
                      <div className="mt-3 p-3 bg-white rounded border border-secondary-200">
                        <p className="text-sm text-secondary-600">
                          {/* TODO: Add detailed analysis for each key point */}
                          Detailed analysis and supporting evidence would be displayed here.
                          This would include specific quotes, data points, and contextual information.
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedPoint(expandedPoint === index ? null : index)}
                      className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      {expandedPoint === index ? 'Show Less' : 'Learn More'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis & Stats */}
        <div className="space-y-6">
          {/* Overall Sentiment */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              Sentiment Breakdown
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">Positive</span>
                  <span className="text-sm font-semibold text-success-600">
                    {summaryData.sentiment.positive}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-success-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${summaryData.sentiment.positive}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">Negative</span>
                  <span className="text-sm font-semibold text-accent-600">
                    {summaryData.sentiment.negative}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${summaryData.sentiment.negative}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">Neutral</span>
                  <span className="text-sm font-semibold text-secondary-600">
                    {summaryData.sentiment.neutral}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-secondary-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${summaryData.sentiment.neutral}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Speaking Time Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-600" />
              Speaking Time
            </h3>
            <div className="space-y-3">
              {Object.entries(summaryData.speakingTime).map(([speaker, percentage]) => (
                <div key={speaker}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-secondary-700">
                      {speaker}
                    </span>
                    <span className={`text-sm font-semibold ${getSpeakingTimeColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        percentage >= 50 ? 'bg-primary-500' : 'bg-accent-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success-600" />
                <span className="text-sm font-medium text-success-800">Agreements</span>
              </div>
              <div className="text-2xl font-bold text-success-600">3</div>
              <div className="text-xs text-success-600">Key points aligned</div>
            </div>

            <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-accent-600" />
                <span className="text-sm font-medium text-accent-800">Disagreements</span>
              </div>
              <div className="text-2xl font-bold text-accent-600">2</div>
              <div className="text-xs text-accent-600">Major conflicts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-secondary-200">
        <button className="btn-primary flex-1">
          Generate Full Report
        </button>
        <button className="btn-secondary flex-1">
          Share Summary
        </button>
        <button className="btn-secondary flex-1">
          Export Data
        </button>
      </div>
    </div>
  )
}

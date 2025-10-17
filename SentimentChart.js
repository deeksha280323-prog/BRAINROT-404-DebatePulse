'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts'
import { TrendingUp, TrendingDown, Activity, BarChart3, PieChart } from 'lucide-react'
import { sentimentData } from '../utils/mockData'

// Figma: Sentiment Chart Component
export default function SentimentChart() {
  const [chartType, setChartType] = useState('line')
  const [isAnimating, setIsAnimating] = useState(true)
  const [hoveredData, setHoveredData] = useState(null)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // TODO: Replace with actual real-time data fetching
      console.log('Updating sentiment data...')
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-strong border border-secondary-200">
          <p className="font-semibold text-secondary-900 mb-2">Time: {label}</p>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-sm text-secondary-700">
                Positive: <span className="font-semibold text-success-600">{payload[0]?.value}%</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
              <span className="text-sm text-secondary-700">
                Negative: <span className="font-semibold text-accent-600">{payload[1]?.value}%</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-400 rounded-full"></div>
              <span className="text-sm text-secondary-700">
                Neutral: <span className="font-semibold text-secondary-600">{payload[2]?.value}%</span>
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                animationDuration={isAnimating ? 1000 : 0}
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                animationDuration={isAnimating ? 1000 : 0}
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#64748b', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#64748b', strokeWidth: 2 }}
                animationDuration={isAnimating ? 1000 : 0}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#64748b"
                fill="#64748b"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="positive" fill="#22c55e" radius={[2, 2, 0, 0]} />
              <Bar dataKey="negative" fill="#ef4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="neutral" fill="#64748b" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const getOverallTrend = () => {
    const first = sentimentData[0]
    const last = sentimentData[sentimentData.length - 1]
    const positiveChange = last.positive - first.positive
    const negativeChange = last.negative - first.negative
    
    if (positiveChange > negativeChange) {
      return { direction: 'up', value: positiveChange, color: 'success' }
    } else {
      return { direction: 'down', value: negativeChange, color: 'accent' }
    }
  }

  const trend = getOverallTrend()

  return (
    <div className="card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Sentiment Analysis
          </h2>
          <p className="text-secondary-600">
            Real-time sentiment tracking throughout the debate
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-secondary-700 mr-2">View:</span>
          <div className="flex bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-all duration-200 ${
                chartType === 'line'
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-secondary-600 hover:text-primary-600'
              }`}
              aria-label="Line chart view"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded-md transition-all duration-200 ${
                chartType === 'area'
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-secondary-600 hover:text-primary-600'
              }`}
              aria-label="Area chart view"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-all duration-200 ${
                chartType === 'bar'
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-secondary-600 hover:text-primary-600'
              }`}
              aria-label="Bar chart view"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-5 h-5 text-success-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-accent-600" />
            )}
            <div>
              <div className="text-sm font-medium text-secondary-700">
                Overall Trend
              </div>
              <div className={`text-lg font-bold ${
                trend.color === 'success' ? 'text-success-600' : 'text-accent-600'
              }`}>
                {trend.direction === 'up' ? '+' : ''}{trend.value}%
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-secondary-600">Current Sentiment</div>
            <div className="text-lg font-semibold text-secondary-900">
              {sentimentData[sentimentData.length - 1].positive}% Positive
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        {renderChart()}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success-500 rounded-full"></div>
          <span className="text-sm font-medium text-secondary-700">Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
          <span className="text-sm font-medium text-secondary-700">Negative</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-secondary-400 rounded-full"></div>
          <span className="text-sm font-medium text-secondary-700">Neutral</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="text-2xl font-bold text-success-600">
            {Math.max(...sentimentData.map(d => d.positive))}%
          </div>
          <div className="text-sm text-success-700">Peak Positive</div>
        </div>
        <div className="text-center p-4 bg-accent-50 rounded-lg border border-accent-200">
          <div className="text-2xl font-bold text-accent-600">
            {Math.max(...sentimentData.map(d => d.negative))}%
          </div>
          <div className="text-sm text-accent-700">Peak Negative</div>
        </div>
        <div className="text-center p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="text-2xl font-bold text-primary-600">
            {sentimentData.length}
          </div>
          <div className="text-sm text-primary-700">Data Points</div>
        </div>
        <div className="text-center p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <div className="text-2xl font-bold text-secondary-600">
            {Math.round(sentimentData.reduce((acc, d) => acc + d.positive, 0) / sentimentData.length)}%
          </div>
          <div className="text-sm text-secondary-700">Avg Positive</div>
        </div>
      </div>

      {/* Animation Toggle */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-sm text-secondary-600 hover:text-primary-600 transition-colors duration-200"
        >
          {isAnimating ? 'Disable' : 'Enable'} Animation
        </button>
      </div>
    </div>
  )
}

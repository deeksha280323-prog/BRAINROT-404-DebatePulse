// Mock data for development - matches Figma design exactly

export const debateData = {
  title: "Climate Change: Urgent Action Required",
  participants: [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Environmental Scientist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      position: "Pro"
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      role: "Economic Policy Expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      position: "Con"
    }
  ],
  duration: "45:32",
  date: "2024-01-15",
  status: "live"
}

export const transcriptData = [
  {
    id: 1,
    timestamp: "00:15",
    speaker: "Dr. Sarah Chen",
    text: "The scientific consensus is clear: we have less than a decade to prevent catastrophic climate change. The data from the IPCC shows unprecedented warming trends.",
    sentiment: "positive",
    confidence: 0.92
  },
  {
    id: 2,
    timestamp: "01:23",
    speaker: "Prof. Michael Rodriguez",
    text: "While I acknowledge the climate data, we must consider the economic implications. Immediate action could devastate developing economies and cost millions of jobs.",
    sentiment: "negative",
    confidence: 0.87
  },
  {
    id: 3,
    timestamp: "02:45",
    speaker: "Dr. Sarah Chen",
    text: "The economic cost of inaction far exceeds the cost of action. Studies show that climate adaptation will create new industries and millions of green jobs.",
    sentiment: "positive",
    confidence: 0.89
  },
  {
    id: 4,
    timestamp: "04:12",
    speaker: "Prof. Michael Rodriguez",
    text: "That's a theoretical argument. In practice, we've seen how carbon taxes have increased energy costs for working families. We need a more balanced approach.",
    sentiment: "negative",
    confidence: 0.85
  }
]

export const sentimentData = [
  { time: "00:00", positive: 45, negative: 35, neutral: 20 },
  { time: "05:00", positive: 52, negative: 28, neutral: 20 },
  { time: "10:00", positive: 38, negative: 42, neutral: 20 },
  { time: "15:00", positive: 61, negative: 19, neutral: 20 },
  { time: "20:00", positive: 29, negative: 51, neutral: 20 },
  { time: "25:00", positive: 47, negative: 33, neutral: 20 },
  { time: "30:00", positive: 55, negative: 25, neutral: 20 },
  { time: "35:00", positive: 41, negative: 39, neutral: 20 },
  { time: "40:00", positive: 58, negative: 22, neutral: 20 },
  { time: "45:00", positive: 44, negative: 36, neutral: 20 }
]

export const summaryData = {
  keyPoints: [
    "Scientific consensus on climate urgency vs economic concerns",
    "Debate over job creation vs job displacement",
    "Discussion of carbon tax effectiveness",
    "Balancing environmental and economic priorities"
  ],
  sentiment: {
    overall: "mixed",
    positive: 47,
    negative: 33,
    neutral: 20
  },
  speakingTime: {
    "Dr. Sarah Chen": 52,
    "Prof. Michael Rodriguez": 48
  }
}

export const votingData = {
  question: "Do you support immediate climate action despite economic costs?",
  options: [
    { id: "yes", label: "Yes, climate action is urgent", votes: 1247, percentage: 62 },
    { id: "no", label: "No, economic impact is too high", votes: 763, percentage: 38 }
  ],
  totalVotes: 2010,
  userVote: null
}

export const timelineData = [
  {
    id: 1,
    time: "00:00",
    event: "Debate begins",
    type: "milestone"
  },
  {
    id: 2,
    time: "05:30",
    event: "Opening statements",
    type: "speech"
  },
  {
    id: 3,
    time: "12:15",
    event: "First rebuttal",
    type: "speech"
  },
  {
    id: 4,
    time: "18:45",
    event: "Audience questions",
    type: "interaction"
  },
  {
    id: 5,
    time: "25:20",
    event: "Closing arguments",
    type: "speech"
  },
  {
    id: 6,
    time: "32:10",
    event: "Voting period begins",
    type: "milestone"
  }
]

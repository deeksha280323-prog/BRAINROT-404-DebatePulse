# DebatePulse - AI-Powered Debate Analysis Platform

A modern, responsive React frontend for analyzing debates with real-time sentiment analysis, intelligent transcription, and interactive voting systems.

## 🚀 Features

- **Real-time Analysis**: Live sentiment tracking and key insights
- **Intelligent Transcription**: Accurate speech-to-text with speaker identification
- **Interactive Voting**: Real-time polls and audience engagement
- **Timeline Visualization**: Key moments and event tracking
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Accessibility**: WCAG compliant with ARIA attributes
- **Modern UI**: Built with TailwindCSS and Lucide React icons

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
debatepulse/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.js          # Root layout component
│   └── page.js            # Main page component
├── components/            # Reusable React components
│   ├── Navbar.js          # Navigation bar
│   ├── Hero.js            # Hero/header section
│   ├── DebateUpload.js    # File upload component
│   ├── TranscriptPanel.js # Live transcript display
│   ├── SummaryCard.js     # AI-generated summary
│   ├── SentimentChart.js  # Real-time sentiment visualization
│   ├── VotingPanel.js     # Interactive voting system
│   ├── Timeline.js        # Debate timeline
│   └── Footer.js          # Footer component
├── utils/                 # Utility functions and data
│   └── mockData.js        # Mock data for development
├── __tests__/             # Unit tests
│   ├── DebateUpload.test.js
│   └── VotingPanel.test.js
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # TailwindCSS configuration
├── next.config.js         # Next.js configuration
├── jest.config.js         # Jest testing configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd debatepulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Gray scale (#f8fafc to #0f172a)
- **Accent**: Red (#ef4444)
- **Success**: Green (#22c55e)

### Typography
- **Headings**: Poppins (600-800 weight)
- **Body**: Inter (300-800 weight)

### Components
All components follow a consistent design pattern with:
- Soft shadows and rounded corners
- Hover and focus states
- Responsive breakpoints
- Accessibility attributes

## 🧪 Testing

The project includes comprehensive unit tests using Jest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Coverage
- **DebateUpload**: File upload, drag & drop, progress tracking
- **VotingPanel**: Vote submission, real-time updates, accessibility

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All components adapt their layout and functionality based on screen size.

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**
- **ARIA attributes** for interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** mode support
- **Focus indicators** for all interactive elements

## 🔌 Backend Integration

### API Endpoints (TODO)

The frontend is designed to integrate with the following backend endpoints:

#### File Upload
```javascript
POST /api/upload
Content-Type: multipart/form-data

Response: {
  fileId: string,
  status: 'processing' | 'completed' | 'error',
  transcript?: string
}
```

#### Sentiment Analysis
```javascript
GET /api/sentiment/{debateId}
Response: {
  sentiment: {
    positive: number,
    negative: number,
    neutral: number
  },
  timeline: Array<{
    timestamp: string,
    sentiment: 'positive' | 'negative' | 'neutral',
    confidence: number
  }>
}
```

#### Voting System
```javascript
POST /api/vote
{
  debateId: string,
  optionId: string,
  userId?: string
}

Response: {
  success: boolean,
  totalVotes: number,
  results: Array<{
    optionId: string,
    votes: number,
    percentage: number
  }>
}
```

#### Real-time Updates
```javascript
WebSocket: /ws/debate/{debateId}
Events: {
  'transcript-update': { text: string, speaker: string, timestamp: string },
  'sentiment-update': { sentiment: object, timestamp: string },
  'vote-update': { results: object }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Deploy** automatically on push to main

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use `next export` for static deployment
- **AWS Amplify**: Direct GitHub integration
- **Docker**: Use the included Dockerfile

## 🔧 Customization

### Adding New Components

1. Create component in `components/` directory
2. Follow existing naming conventions
3. Include proper TypeScript types
4. Add unit tests
5. Update this README

### Styling

- Use TailwindCSS utility classes
- Follow the established design system
- Add custom styles in `app/globals.css`
- Update `tailwind.config.js` for new tokens

### Mock Data

Update `utils/mockData.js` to modify:
- Debate information
- Transcript data
- Sentiment analysis results
- Voting data
- Timeline events

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for better debates**

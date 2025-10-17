import './globals.css'

export const metadata = {
  title: 'DebatePulse - AI-Powered Debate Analysis',
  description: 'Analyze debates with AI-powered sentiment analysis, real-time transcription, and interactive voting',
  keywords: 'debate, analysis, AI, sentiment, transcription, voting',
  authors: [{ name: 'DebatePulse Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VotingPanel from '../components/VotingPanel'

// Mock the voting data
jest.mock('../utils/mockData', () => ({
  votingData: {
    question: "Do you support immediate climate action despite economic costs?",
    options: [
      { id: "yes", label: "Yes, climate action is urgent", votes: 1247, percentage: 62 },
      { id: "no", label: "No, economic impact is too high", votes: 763, percentage: 38 }
    ],
    totalVotes: 2010,
    userVote: null
  }
}))

describe('VotingPanel Component', () => {
  beforeEach(() => {
    // Mock console.log to avoid test output noise
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    console.log.mockRestore()
  })

  test('renders voting interface correctly', () => {
    render(<VotingPanel />)
    
    expect(screen.getByText('Live Voting')).toBeInTheDocument()
    expect(screen.getByText(/Cast your vote and see real-time results/)).toBeInTheDocument()
    expect(screen.getByText('Do you support immediate climate action despite economic costs?')).toBeInTheDocument()
  })

  test('displays voting options with correct data', () => {
    render(<VotingPanel />)
    
    expect(screen.getByText('Yes, climate action is urgent')).toBeInTheDocument()
    expect(screen.getByText('No, economic impact is too high')).toBeInTheDocument()
    expect(screen.getByText('1,247 votes')).toBeInTheDocument()
    expect(screen.getByText('763 votes')).toBeInTheDocument()
    expect(screen.getByText('62%')).toBeInTheDocument()
    expect(screen.getByText('38%')).toBeInTheDocument()
  })

  test('shows voting status and time remaining', () => {
    render(<VotingPanel />)
    
    expect(screen.getByText(/remaining/)).toBeInTheDocument()
    expect(screen.getByText('2,010 votes')).toBeInTheDocument()
  })

  test('handles vote selection', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    await user.click(yesButton)
    
    // Check that vote was submitted
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Vote submitted:', 'yes')
    })
  })

  test('disables voting after time expires', async () => {
    // Mock timer to immediately expire
    jest.useFakeTimers()
    
    render(<VotingPanel />)
    
    // Fast-forward time to expire voting
    jest.advanceTimersByTime(300000) // 5 minutes
    
    await waitFor(() => {
      expect(screen.getByText('Voting Closed')).toBeInTheDocument()
    })
    
    jest.useRealTimers()
  })

  test('shows vote submitted status after voting', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    await user.click(yesButton)
    
    await waitFor(() => {
      expect(screen.getByText('Vote Submitted')).toBeInTheDocument()
    })
  })

  test('displays progress bars correctly', () => {
    render(<VotingPanel />)
    
    const progressBars = screen.getAllByRole('progressbar', { hidden: true })
    expect(progressBars).toHaveLength(2) // One for each option
    
    // Check that progress bars have correct width styles
    const yesProgressBar = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('[style*="width: 62%"]')
    const noProgressBar = screen.getByText('No, economic impact is too high').closest('div').querySelector('[style*="width: 38%"]')
    
    expect(yesProgressBar).toBeInTheDocument()
    expect(noProgressBar).toBeInTheDocument()
  })

  test('shows winning option when voting is complete', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    await user.click(yesButton)
    
    await waitFor(() => {
      expect(screen.getByText('Leading')).toBeInTheDocument()
    })
  })

  test('displays voting results summary', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    await user.click(yesButton)
    
    await waitFor(() => {
      expect(screen.getByText('Voting Results')).toBeInTheDocument()
      expect(screen.getByText('2,010')).toBeInTheDocument() // Total votes
      expect(screen.getByText('62%')).toBeInTheDocument() // Leading option
    })
  })

  test('handles multiple vote attempts gracefully', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    // Vote once
    await user.click(yesButton)
    
    await waitFor(() => {
      expect(screen.getByText('Vote Submitted')).toBeInTheDocument()
    })
    
    // Try to vote again - should not work
    const noButton = screen.getByText('No, economic impact is too high').closest('div').querySelector('button')
    await user.click(noButton)
    
    // Should still show vote submitted status
    expect(screen.getByText('Vote Submitted')).toBeInTheDocument()
  })

  test('has proper accessibility attributes', () => {
    render(<VotingPanel />)
    
    const voteButtons = screen.getAllByRole('button')
    const voteButtonsWithVoteText = voteButtons.filter(button => 
      button.textContent?.includes('Vote') || button.textContent?.includes('Voted')
    )
    
    expect(voteButtonsWithVoteText.length).toBeGreaterThan(0)
    
    // Check that voting options are clickable
    const votingOptions = screen.getAllByText(/Yes, climate action|No, economic impact/)
    expect(votingOptions).toHaveLength(2)
  })

  test('formats time remaining correctly', () => {
    render(<VotingPanel />)
    
    // Should show time in MM:SS format
    const timeElement = screen.getByText(/\d+:\d+/)
    expect(timeElement).toBeInTheDocument()
  })

  test('shows loading state during vote submission', async () => {
    const user = userEvent.setup()
    render(<VotingPanel />)
    
    const yesButton = screen.getByText('Yes, climate action is urgent').closest('div').querySelector('button')
    
    await user.click(yesButton)
    
    // Should show loading spinner
    expect(screen.getByRole('button', { name: /Vote/ })).toBeDisabled()
  })
})

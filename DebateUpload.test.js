import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DebateUpload from '../components/DebateUpload'

// Mock file for testing
const createMockFile = (name, type, size) => {
  const file = new File(['test content'], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('DebateUpload Component', () => {
  beforeEach(() => {
    // Mock console.log to avoid test output noise
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    console.log.mockRestore()
  })

  test('renders upload interface correctly', () => {
    render(<DebateUpload />)
    
    expect(screen.getByText('Upload Your Debate')).toBeInTheDocument()
    expect(screen.getByText(/Upload audio, video, or transcript files/)).toBeInTheDocument()
    expect(screen.getByText('Choose Files')).toBeInTheDocument()
  })

  test('handles file selection via input', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFile = createMockFile('test.mp3', 'audio/mpeg', 1024)
    
    await user.upload(fileInput, mockFile)
    
    expect(screen.getByText('test.mp3')).toBeInTheDocument()
    expect(screen.getByText('1 KB')).toBeInTheDocument()
  })

  test('handles drag and drop functionality', async () => {
    render(<DebateUpload />)
    
    const dropZone = screen.getByText('Drop files here or click to browse')
    const mockFile = createMockFile('test.mp4', 'video/mp4', 2048)
    
    // Simulate drag events
    fireEvent.dragEnter(dropZone, {
      dataTransfer: {
        files: [mockFile]
      }
    })
    
    expect(dropZone.closest('div')).toHaveClass('border-primary-500', 'bg-primary-50')
    
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [mockFile]
      }
    })
    
    await waitFor(() => {
      expect(screen.getByText('test.mp4')).toBeInTheDocument()
    })
  })

  test('displays file upload progress', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFile = createMockFile('test.wav', 'audio/wav', 1024)
    
    await user.upload(fileInput, mockFile)
    
    // Check for upload progress elements
    expect(screen.getByText('Uploading...')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('allows file removal', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFile = createMockFile('test.txt', 'text/plain', 512)
    
    await user.upload(fileInput, mockFile)
    
    // Wait for upload to complete
    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const removeButton = screen.getByLabelText('Remove test.txt')
    await user.click(removeButton)
    
    expect(screen.queryByText('test.txt')).not.toBeInTheDocument()
  })

  test('shows action buttons when files are uploaded', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFile = createMockFile('test.mp3', 'audio/mpeg', 1024)
    
    await user.upload(fileInput, mockFile)
    
    // Wait for upload to complete
    await waitFor(() => {
      expect(screen.getByText('Start Analysis')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByText('Clear All')).toBeInTheDocument()
  })

  test('handles multiple file uploads', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFiles = [
      createMockFile('test1.mp3', 'audio/mpeg', 1024),
      createMockFile('test2.mp4', 'video/mp4', 2048),
      createMockFile('test3.txt', 'text/plain', 512)
    ]
    
    await user.upload(fileInput, mockFiles)
    
    await waitFor(() => {
      expect(screen.getByText('test1.mp3')).toBeInTheDocument()
      expect(screen.getByText('test2.mp4')).toBeInTheDocument()
      expect(screen.getByText('test3.txt')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByText('Uploaded Files (3)')).toBeInTheDocument()
  })

  test('formats file sizes correctly', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    
    // Test different file sizes
    const smallFile = createMockFile('small.txt', 'text/plain', 500)
    const mediumFile = createMockFile('medium.mp3', 'audio/mpeg', 1024 * 1024) // 1MB
    const largeFile = createMockFile('large.mp4', 'video/mp4', 1024 * 1024 * 5) // 5MB
    
    await user.upload(fileInput, [smallFile, mediumFile, largeFile])
    
    await waitFor(() => {
      expect(screen.getByText('500 Bytes')).toBeInTheDocument()
      expect(screen.getByText('1 MB')).toBeInTheDocument()
      expect(screen.getByText('5 MB')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('disables start analysis button when files are uploading', async () => {
    const user = userEvent.setup()
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    const mockFile = createMockFile('test.mp3', 'audio/mpeg', 1024)
    
    await user.upload(fileInput, mockFile)
    
    // Check that start analysis button is disabled during upload
    const startButton = screen.getByText('Start Analysis')
    expect(startButton).toBeDisabled()
  })

  test('has proper accessibility attributes', () => {
    render(<DebateUpload />)
    
    const fileInput = screen.getByLabelText('Upload debate files')
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('multiple')
    expect(fileInput).toHaveAttribute('accept', 'audio/*,video/*,.txt,.doc,.docx')
  })
})

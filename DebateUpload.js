'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Mic, Video, X, CheckCircle, AlertCircle } from 'lucide-react'

// Figma: Debate Upload Component
export default function DebateUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files) => {
    const fileArray = Array.from(files)
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload process
    for (const fileObj of newFiles) {
      await simulateUpload(fileObj)
    }
  }

  const simulateUpload = async (fileObj) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // TODO: Replace with actual upload API call
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'completed' }
                : f
            )
          )
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (type) => {
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />
    if (type.startsWith('audio/')) return <Mic className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          Upload Your Debate
        </h2>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Upload audio, video, or transcript files to get started with AI-powered analysis. 
          We support MP3, MP4, WAV, and text formats.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-secondary-300 hover:border-primary-400 hover:bg-secondary-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,video/*,.txt,.doc,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload debate files"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-primary-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-secondary-600 mb-4">
              Supports audio, video, and text files up to 500MB
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
            disabled={isUploading}
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary-700">Uploading...</span>
            <span className="text-sm text-secondary-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-primary-600">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <div className="font-medium text-secondary-900">{file.name}</div>
                    <div className="text-sm text-secondary-600">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {file.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  )}
                  {file.status === 'pending' && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-accent-600" />
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-secondary-400 hover:text-accent-600 transition-colors duration-200"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {uploadedFiles.length > 0 && (
        <div className="flex justify-center space-x-4 mt-8">
          <button className="btn-secondary">
            Clear All
          </button>
          <button 
            className="btn-primary"
            disabled={uploadedFiles.some(f => f.status !== 'completed')}
          >
            Start Analysis
          </button>
        </div>
      )}
    </div>
  )
}

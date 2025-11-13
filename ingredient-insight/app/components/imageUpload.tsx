'use client'

import React, { useState } from 'react'
import { createWorker } from 'tesseract.js'
import { AnalysisReport } from '@/app/lib/types'
import AnalysisReportComponent from './analysisReport'

const ImageUpload: React.FC = () => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [ocrText, setOcrText] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleFile = async (file: File) => {
    setError(null)
    setReport(null)
    setOcrText('')
    setSelectedImage(file)

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }
  }

  const readImageText = async () => {
    if (!selectedImage) return
    setOcrLoading(true)
    setReport(null)
    setError(null)
    try {
      const worker = await createWorker('eng', 1, {
        logger: m => console.log(m),
      })
      const { data: { text } } = await worker.recognize(selectedImage)
      const cleaned = text.trim()
      setOcrText(cleaned)
      await handleAnalyze(cleaned)
      await worker.terminate()
    } catch (err: any) {
      setError('Error occurred during OCR processing.')
      console.error(err)
    } finally {
      setOcrLoading(false)
    }
  }

  const handleAnalyze = async (textParam?: string) => {
    const textToSend = ((textParam ?? ocrText) || '').toString()
    if (!textToSend.trim()) {
      setError('Please extract text from the image first.')
      return
    }

    setLoading(true)
    setReport(null)
    setError(null)

    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSend }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Analysis failed')
      }

      const data: AnalysisReport = await res.json()
      setReport(data)
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }
  
  const resetAll = () => {
    setSelectedImage(null)
    setOcrText('')
    setError(null)
    setReport(null)
    setLoading(false)
    setOcrLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl">
      {!selectedImage ? (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragActive
              ? 'border-green-600 bg-green-100'
              : 'border-green-500 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:border-green-600 dark:hover:border-green-500 dark:hover:bg-green-900/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-green-800 dark:text-green-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-black dark:text-black">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-black dark:text-black">PNG or JPG recommended</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      ) : null}

      {error && (
        <div className="w-full mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-700 font-medium">Error</p>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={resetAll}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="w-full mt-6 p-6 bg-white dark:bg-gray-800 border border-green-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">📸 Image Preview</h2>
          <div className="flex flex-col gap-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded preview"
              className="w-full max-h-96 object-contain rounded-lg border border-gray-300"
            />
            
            <div className="flex gap-2">
              <button
                onClick={readImageText}
                disabled={ocrLoading || loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                {ocrLoading ? 'Reading Text...' : '🔍 Analyze Contents'}
              </button>
              <button
                onClick={resetAll}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Start Over
              </button>
            </div>

            {ocrText && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 rounded-lg animate-fadeIn">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">✅ Extracted Text</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{ocrText}</p>
                <button
                  onClick={() => handleAnalyze()}
                  disabled={loading || ocrLoading}
                  className="w-full px-4 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold text-lg"
                >
                  🧪 Analyze Extracted Text
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fadeIn">
          <p className="text-yellow-700 font-medium flex items-center gap-2">
            <span className="animate-spin">⚙️</span> Analyzing extracted text...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg animate-fadeIn">
          <p className="text-red-700 font-semibold mb-3">❌ Error</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={resetAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {report && (
        <AnalysisReportComponent report={report} onReset={resetAll} />
      )}
    </div>
  )
}

export default ImageUpload

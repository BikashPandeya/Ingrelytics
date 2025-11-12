'use client'

import React, { useState } from 'react'
import { AnalysisReport } from '@/app/lib/types'

const ImageUpload: React.FC = () => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  const handleFile = async (file: File) => {
    setError(null)
    setReport(null)

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze image')
      }

      const data = await response.json()
      setReport(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the image.')
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

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl">
      {!report ? (
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
            <p className="text-xs text-black dark:text-black">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            {loading && <p className="text-sm text-green-600 mt-2">Analyzing image...</p>}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
            disabled={loading}
            accept="image/*"
          />
        </label>
      ) : null}

      {error && (
        <div className="w-full mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-700 font-medium">Error</p>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null)
              setReport(null)
            }}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {report && (
        <div className="w-full mt-6 p-6 bg-white dark:bg-gray-800 border border-green-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">Analysis Report</h2>
          <div className="space-y-4">
            {report.allergens && report.allergens.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 mb-2">⚠️ Allergens Detected</h3>
                <ul className="list-disc list-inside text-red-500 text-sm">
                  {report.allergens.map((allergen, i) => (
                    <li key={i}>{allergen}</li>
                  ))}
                </ul>
              </div>
            )}
            {report.nutritional_summary && (
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">📊 Nutritional Summary</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{report.nutritional_summary}</p>
              </div>
            )}
            {report.ingredients && report.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">🧪 Key Ingredients</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                  {report.ingredients.slice(0, 5).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => {
                setReport(null)
                setError(null)
              }}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Upload Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload


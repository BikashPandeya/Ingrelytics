'use client'

import React from 'react'
import { AnalysisReport } from '@/app/lib/types'

// Safety Progress Bar Component
const SafetyProgressBar: React.FC<{ score: number }> = ({ score }) => {
  const barWidth = Math.min(100, Math.max(0, score))
  const barColor =
    score >= 7.5 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-500' : 'bg-red-500'
  const barRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${barWidth}%`
    }
  }, [barWidth])

  return (
    <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
      <div
        ref={barRef}
        className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
      />
    </div>
  )
}

interface AnalysisReportProps {
  report: AnalysisReport
  onReset: () => void
}

const AnalysisReportComponent: React.FC<AnalysisReportProps> = ({ report, onReset }) => {
  // Get color based on safety score
  const getSafetyColor = (score: number) => {
    if (score >= 75) return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-200 text-green-800' }
    if (score >= 50) return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-200 text-yellow-800' }
    return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-200 text-red-800' }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const safetyColor = getSafetyColor(report.safetyScore)

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header with Safety Score */}
      <div className={`p-6 rounded-lg border-2 ${safetyColor.bg} ${safetyColor.border}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${safetyColor.text}`}>Ingredient Analysis Report</h2>
          <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-full ${safetyColor.badge} text-2xl font-bold`}>
            {report.safetyScore}
          </div>
        </div>
        {/* Progress Bar Container */}
        <SafetyProgressBar score={report.safetyScore} />
        <p className={`mt-3 text-sm font-medium ${safetyColor.text}`}>
          {report.safetyScore >= 7.5
            ? '✅ Safe & Healthy'
            : report.safetyScore >= 5
              ? '⚠️ Contains Some Concerns'
              : '❌ Multiple Health Concerns'}
        </p>
      </div>

      {/* Summary Section */}
      <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-xl">📋</span> Summary
        </h3>
        <p className="text-gray-700 leading-relaxed">{report.summary}</p>
      </div>

      {/* Transcribed Text Section */}
      {report.transcribedText && (
        <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🔍</span> Extracted Ingredients
          </h3>
          <div className="bg-white p-4 rounded border border-blue-200">
            <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{report.transcribedText}</p>
          </div>
        </div>
      )}

      {/* Harmful Ingredients Section */}
      {report.harmfulIngredients && report.harmfulIngredients.length > 0 && (
        <div className="p-6 bg-red-50 border-2 border-red-300 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span> Harmful Ingredients ({report.harmfulIngredients.length})
          </h3>
          <div className="space-y-3">
            {report.harmfulIngredients.map((ingredient, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border-2 border-red-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-base">{ingredient.name}</h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRiskColor(ingredient.risk)}`}>
                    {ingredient.risk} Risk
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{ingredient.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Healthier Alternatives Section */}
      {report.healthierAlternatives && report.healthierAlternatives.length > 0 && (
        <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span> Healthier Alternatives ({report.healthierAlternatives.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.healthierAlternatives.map((alternative, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border-2 border-green-200 hover:shadow-lg transition-shadow flex items-center gap-3"
              >
                <span className="text-2xl">✅</span>
                <span className="text-gray-700 font-medium">{alternative}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
        >
          <span>📸</span> Analyze Another Product
        </button>
        <button
          onClick={() => {
            const jsonString = JSON.stringify(report, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'ingredient-analysis.json'
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <span>💾</span> Download Report
        </button>
      </div>
    </div>
  )
}

export default AnalysisReportComponent

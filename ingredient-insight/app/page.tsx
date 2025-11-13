'use client'

import React, { useEffect, useState } from 'react'
// import Footer from "@/app/components/footer";
import ImageUpload from '@/app/components/imageUpload'

const HeroSection = ({ onLearn, onScan }: any) => (
  <section  id="hero-section" className="snap-start h-screen relative bg-[url('/hero-bg.jpg')] bg-cover bg-center">
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg">
        Discover What&apos;s Inside Your Products 🌿
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
        AI-powered analysis of ingredients for health, ethics, and safety.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={onScan} className="rounded-full bg-green-600 text-white px-8 py-4 shadow-lg hover:scale-105 transition">
          🟢 Scan Now
        </button>
        <button onClick={onLearn} className="rounded-full bg-green-100 text-green-800 px-8 py-4 shadow-lg hover:scale-105 transition">
          🟩 Learn More
        </button>
      </div>
    </div>
  </section>
)

const StepsCarousel = () => {
  const slides = [
    { i: '📸', t: 'Upload or Scan Ingredients', d: 'Take a photo or upload an image. Our OCR extracts ingredients instantly.' },
    { i: '🧠', t: 'AI Analyzes & Explains', d: 'Our AI checks for allergens, chemicals, and ethics with detailed insights.' },
    { i: '⭐', t: 'View Safety Rating', d: 'Get a health safety score and better alternatives instantly.' },
    { i: '💾', t: 'Save & Share Results', d: 'Save analyses, share with friends, or track your history.' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="teach-section" className="snap-start h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-green-50 p-6">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">How It Works</h2>
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-3xl">
        <div className="text-7xl mb-4">{slides[idx].i}</div>
        <h3 className="text-3xl font-bold mb-2 text-green-700">{slides[idx].t}</h3>
        <p className="text-lg text-gray-600">{slides[idx].d}</p>
      </div>
      <div className="flex gap-2 mt-8">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? 'bg-green-600 w-8' : 'bg-gray-300'}`} />
        ))}
      </div>
    </section>
  )
}

const WhySection = () => {
  const slides = [
    { i: '💡', t: 'Instant AI Insights', d: 'Analyze any product in seconds with smart ingredient understanding.' },
    { i: '📊', t: 'Smart Rating System', d: 'Each ingredient is scored based on research and safety factors.' },
    { i: '👁️', t: 'Transparency Matters', d: 'Make informed, ethical, and sustainable choices.' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="snap-start h-screen flex flex-col justify-center bg-gradient-to-b from-green-50 to-white text-center px-6">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">Why IngredientInsight?</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {slides.map((s, i) => (
          <div key={i} className={`p-8 rounded-2xl transition-all duration-500 ${i === idx ? 'bg-green-600 text-white scale-105' : 'bg-white shadow-md text-gray-700 opacity-80'}`}>
            <div className="text-6xl mb-4">{s.i}</div>
            <h3 className="text-2xl font-bold mb-2">{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? 'bg-green-600 w-8' : 'bg-gray-300'}`} />
        ))}
      </div>
    </section>
  )
}

const ScanSection = () => {
  const [filters, setFilters] = useState({ allergen: false, vegan: false, clean: false, eco: false })
  const toggle = (k: string) => setFilters(f => ({ ...f, [k]: !f[k as keyof typeof f] }))
  return (
    <section id="scan" className="snap-start min-h-screen bg-white flex flex-col items-center py-16 px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Scan Your Product</h2>
      <p className="text-gray-600 mb-8">Upload a photo, paste ingredients, or scan with camera.</p>
      <ImageUpload />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {['🚫 Allergen-Free', '🌿 Vegan', '💧 Clean', '♻️ Sustainable'].map((t, i) => {
          const key = ['allergen', 'vegan', 'clean', 'eco'][i]
          return (
            <button key={t} onClick={() => toggle(key)} className={`px-4 py-2 rounded-full font-semibold border transition ${filters[key as keyof typeof filters] ? 'bg-green-600 text-white' : 'border-green-400 text-green-700 hover:bg-green-100'}`}>
              {t}
            </button>
          )
        })}
      </div>
      <br />
      {/* <Footer /> */}
    </section>
  )
}

export default function Page() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) setTimeout(() => scrollTo(hash), 100)
  }, [])
  return (
    <div className="bg-gradient-to-b from-green-50 to-white text-gray-900 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <HeroSection onLearn={() => scrollTo('teach')} onScan={() => scrollTo('scan')} />
      <WhySection />
      <StepsCarousel />
      <ScanSection />
      
    </div>
  )
}

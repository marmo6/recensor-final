'use client'

import { useState } from 'react'

// Mock products generator (inline)
function generateProducts(query: string) {
  return [
    {
      id: '1',
      title: `${query} - Premium Quality Edition`,
      price: '$29.99',
      rating: 4.3,
      reviewCount: 1247,
      trustScore: calculateTrustScore(4.3, 1247)
    },
    {
      id: '2', 
      title: `Best ${query} for Budget Buyers`,
      price: '$19.99',
      rating: 3.8,
      reviewCount: 892,
      trustScore: calculateTrustScore(3.8, 892)
    },
    {
      id: '3',
      title: `Professional ${query} Deluxe Kit`,
      price: '$89.99', 
      rating: 4.7,
      reviewCount: 2156,
      trustScore: calculateTrustScore(4.7, 2156)
    }
  ]
}

// Trust score algorithm (inline)
function calculateTrustScore(rating: number, reviewCount: number): number {
  const ratingScore = rating >= 4.5 ? 90 : rating >= 4.0 ? 75 : rating >= 3.5 ? 60 : 40
  const volumeScore = reviewCount >= 1000 ? 95 : reviewCount >= 500 ? 85 : reviewCount >= 100 ? 75 : 50
  const overall = Math.round(ratingScore * 0.6 + volumeScore * 0.4)
  return Math.max(20, Math.min(100, overall))
}

// Trust score color helper
function getTrustColor(score: number) {
  if (score >= 80) return '#10b981' // green
  if (score >= 60) return '#f59e0b' // yellow  
  return '#ef4444' // red
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setShowResults(false)
    
    // Simulate API call
    setTimeout(() => {
      const products = generateProducts(searchQuery)
      setSearchResults(products)
      setShowResults(true)
      setLoading(false)
    }, 1000)
  }

  const popularSearches = ['iPhone 15', 'Nike Air Max', 'Samsung TV', 'MacBook Pro', 'AirPods']

  const quickSearch = (query: string) => {
    setSearchQuery(query)
    setLoading(true)
    setShowResults(false)
    setTimeout(() => {
      const products = generateProducts(query)
      setSearchResults(products)
      setShowResults(true)
      setLoading(false)
    }, 1000)
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2563eb'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem'
    },
    hero: {
      textAlign: 'center' as const
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#111827'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#6b7280',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem'
    },
    searchForm: {
      maxWidth: '600px',
      margin: '0 auto 2rem',
      position: 'relative' as const
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1.5rem',
      fontSize: '1.1rem',
      border: '2px solid #d1d5db',
      borderRadius: '50px',
      outline: 'none',
      paddingRight: '120px'
    },
    searchButton: {
      position: 'absolute' as const,
      right: '8px',
      top: '8px',
      bottom: '8px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '0 1.5rem',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    popularTags: {
      textAlign: 'center' as const,
      marginBottom: '3rem'
    },
    tag: {
      display: 'inline-block',
      margin: '0.25rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    resultsContainer: {
      marginTop: '3rem'
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    productCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    trustBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    productTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#111827'
    },
    productMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    price: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb'
    },
    rating: {
      fontSize: '0.9rem',
      color: '#6b7280'
    },
    trustBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '0.5rem'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  }

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>Recensor</div>
          <button style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.title}>
            Stop Buying Based on <span style={{color: '#ef4444'}}>Fake Reviews</span>
          </h1>
          <p style={styles.subtitle}>
            Get AI-powered trust scores for any product. See what people really think before you buy.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"

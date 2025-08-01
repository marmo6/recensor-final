'use client'

import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const mockResults = [
      {
        id: 1,
        title: `${searchQuery} - Premium Quality`,
        price: '$29.99',
        trustScore: 85,
        rating: 4.3,
        reviews: 1247
      },
      {
        id: 2,
        title: `Best ${searchQuery} Budget Option`,
        price: '$19.99',
        trustScore: 72,
        rating: 3.8,
        reviews: 892
      }
    ]
    
    setResults(mockResults)
    setShowResults(true)
  }

  return (
    <div style={{ backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#2563eb', fontSize: '2rem', margin: 0 }}>Recensor</h1>
          <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
            Get Started
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Stop Buying Based on <span style={{ color: '#ef4444' }}>Fake Reviews</span>
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Get AI-powered trust scores for any product
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '0.5rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any product..."
              style={{ 
                flex: 1, 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit"
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick searches */}
        <div style={{ marginBottom: '2rem' }}>
          {['iPhone 15', 'Nike Air Max', 'MacBook Pro'].map(term => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term)
                const mockResults = [{
                  id: 1,
                  title: `${term} - Premium Quality`,
                  price: '$29.99',
                  trustScore: 85,
                  rating: 4.3,
                  reviews: 1247
                }]
                setResults(mockResults)
                setShowResults(true)
              }}
              style={{
                margin: '0.25rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        {showResults && (
          <div>
            <h3>Results for "{searchQuery}"</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {results.map(product => (
                <div key={product.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                    Trust Score: {product.trustScore}/100
                  </div>
                  <h4>{product.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>{product.price}</span>
                    <span>⭐ {product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

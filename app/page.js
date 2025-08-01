'use client'

import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Mock results
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
      },
      {
        id: 3,
        title: `Professional ${searchQuery} Kit`,
        price: '$89.99',
        trustScore: 91,
        rating: 4.7,
        reviews: 2156
      }
    ]
    
    setResults(mockResults)
    setShowResults(true)
  }

  return (
    <html lang="en">
      <head>
        <title>Recensor - Trust Intelligence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f9ff' }}>
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
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>Try: </p>
            {['iPhone 15', 'Nike Air Max', 'MacBook Pro'].map(term => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term)
                  handleSearch({ preventDefault: () => {} })
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
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Results for "{searchQuery}"
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1rem',
                textAlign: 'left'
              }}>
                {results.map(product => (
                  <div key={product.id} style={{ 
                    backgroundColor: 'white', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}>
                    <div style={{ 
                      backgroundColor: product.trustScore >= 80 ? '#dcfce7' : '#fef3c7',
                      color: product.trustScore >= 80 ? '#166534' : '#92400e',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}>
                      Trust Score: {product.trustScore}/100
                    </div>
                    
                    <h4 style={{ margin: '0.5rem 0' }}>{product.title}</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>
                        {product.price}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>
                        ⭐ {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div style={{ 
                      width: '100%', 
                      height: '4px', 
                      backgroundColor: '#e5e7eb', 
                      borderRadius: '2px',
                      marginTop: '0.5rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${product.trustScore}%`, 
                        height: '100%', 
                        backgroundColor: product.trustScore >= 80 ? '#10b981' : '#f59e0b'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {!showResults && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                <h3>Trust Score</h3>
                <p style={{ color: '#666' }}>AI analyzes reviews for authenticity</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                <h3>Real Reviews</h3>
                <p style={{ color: '#666' }}>Filter out fake reviews</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <h3>Instant Results</h3>
                <p style={{ color: '#666' }}>Get scores in seconds</p>
              </div>
            </div>
          )}
        </main>
      </body>
    </html>
  )
}

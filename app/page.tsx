'use client'

import { useState } from 'react'

// Mock products generator
function generateProducts(query: string) {
  return [
    {
      id: '1',
      title: `${query} - Premium Quality Edition`,
      price: '$29.99',
      rating: 4.3,
      reviewCount: 1247,
      trustScore: 85
    },
    {
      id: '2', 
      title: `Best ${query} for Budget Buyers`,
      price: '$19.99',
      rating: 3.8,
      reviewCount: 892,
      trustScore: 72
    },
    {
      id: '3',
      title: `Professional ${query} Deluxe Kit`,
      price: '$89.99', 
      rating: 4.7,
      reviewCount: 2156,
      trustScore: 91
    }
  ]
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#2563eb'
          }}>
            Recensor
          </div>
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
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#111827'
          }}>
            Stop Buying Based on <span style={{color: '#ef4444'}}>Fake Reviews</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Get AI-powered trust scores for any product. See what people really think before you buy.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} style={{
            maxWidth: '600px',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any product... (e.g., iPhone 15, Nike Air Max)"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                border: '2px solid #d1d5db',
                borderRadius: '50px',
                outline: 'none',
                paddingRight: '120px'
              }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{
                position: 'absolute',
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
              }}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>

          {/* Popular Searches */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{color: '#6b7280', marginBottom: '1rem'}}>Popular searches:</p>
            {popularSearches.map((search) => (
              <span
                key={search}
                style={{
                  display: 'inline-block',
                  margin: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                onClick={() => quickSearch(search)}
              >
                {search}
              </span>
            ))}
          </div>

          {/* Search Results */}
          {showResults && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
                Search Results for "{searchQuery}"
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                {searchResults.map((product) => (
                  <div key={product.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.5rem 1rem',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      backgroundColor: product.trustScore >= 80 ? '#dcfce7' : product.trustScore >= 60 ? '#fef3c7' : '#fee2e2',
                      color: product.trustScore >= 80 ? '#166534' : product.trustScore >= 60 ? '#92400e' : '#991b1b'
                    }}>
                      🎯 Trust Score: {product.trustScore}/100
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#111827'
                    }}>
                      {product.title}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#2563eb'
                      }}>
                        {product.price}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        ⭐ {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${product.trustScore}%`,
                        height: '100%',
                        backgroundColor: product.trustScore >= 80 ? '#10b981' : product.trustScore >= 60 ? '#f59e0b' : '#ef4444'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {!showResults && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '4rem'
            }}>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem'}}>🛡️</div>
                <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Trust Score</h3>
                <p style={{color: '#6b7280'}}>AI analyzes thousands of reviews to give you a real trust score</p>
              </div>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📈</div>
                <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Real Reviews</h3>
                <p style={{color: '#6b7280'}}>Filter out fake reviews and see genuine customer experiences</p>
              </div>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⚡</div>
                <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Instant Results</h3>
                <p style={{color: '#6b7280'}}>Get trust scores in seconds for millions of products</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

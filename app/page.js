'use client'

import { useState, useEffect } from 'react'

// Generate mock products
function generateProducts(query) {
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
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check user authentication status
  useEffect(() => {
    const currentUser = localStorage.getItem('current_user')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('current_user')
    setUser(null)
    setShowResults(false)
    setSearchResults([])
  }

  // Check search limits for free users
  const canSearch = () => {
    if (!user) return false // Must be logged in
    if (user.plan === 'premium' || user.plan === 'pro') return true // Premium users unlimited
    
    // Check daily limit for free users
    const today = new Date().toDateString()
    if (user.last_search_date !== today) {
      // Reset daily count
      const updatedUser = { ...user, searches_today: 0, last_search_date: today }
      localStorage.setItem('current_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      return true
    }
    
    return user.searches_today < 5 // Free limit: 5 searches per day
  }

  // Update search count
  const incrementSearchCount = () => {
    if (!user || user.plan === 'premium' || user.plan === 'pro') return
    
    const updatedUser = { 
      ...user, 
      searches_today: user.searches_today + 1,
      last_search_date: new Date().toDateString()
    }
    localStorage.setItem('current_user', JSON.stringify(updatedUser))
    localStorage.setItem(`user_${user.email}`, JSON.stringify({
      ...JSON.parse(localStorage.getItem(`user_${user.email}`)),
      searches_today: updatedUser.searches_today,
      last_search_date: updatedUser.last_search_date
    }))
    setUser(updatedUser)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Check if user is logged in
    if (!user) {
      alert('Please log in to search products')
      window.location.href = '/auth'
      return
    }

    // Check search limits
    if (!canSearch()) {
      setShowUpgradeModal(true)
      return
    }

    setLoading(true)
    setShowResults(false)
    
    // Simulate API call
    setTimeout(() => {
      const products = generateProducts(searchQuery)
      setSearchResults(products)
      setShowResults(true)
      setLoading(false)
      
      // Increment search count for free users
      incrementSearchCount()
    }, 1000)
  }

  const quickSearch = (query) => {
    setSearchQuery(query)
    
    if (!user) {
      alert('Please log in to search products')
      window.location.href = '/auth'
      return
    }

    if (!canSearch()) {
      setShowUpgradeModal(true)
      return
    }

    setLoading(true)
    setShowResults(false)
    setTimeout(() => {
      const products = generateProducts(query)
      setSearchResults(products)
      setShowResults(true)
      setLoading(false)
      incrementSearchCount()
    }, 1000)
  }

  const getRemainingSearches = () => {
    if (!user || user.plan === 'premium' || user.plan === 'pro') return null
    const today = new Date().toDateString()
    if (user.last_search_date !== today) return 5
    return Math.max(0, 5 - user.searches_today)
  }

  return (
    <div style={{ backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#2563eb', fontSize: '2rem', margin: 0 }}>Recensor</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  Welcome, {user.email}
                  {user.plan === 'free' && (
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                      {getRemainingSearches()} searches left today
                    </div>
                  )}
                </div>
                {user.plan === 'free' && (
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    style={{ 
                      backgroundColor: '#f59e0b', 
                      color: 'white', 
                      padding: '0.5rem 1rem', 
                      border: 'none', 
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Upgrade to Premium
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  style={{ 
                    backgroundColor: '#6b7280', 
                    color: 'white', 
                    padding: '0.5rem 1rem', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem'
                  }}
                >
                  Login
                </a>
                <a 
                  href="/auth" 
                  style={{ 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '0.5rem 1rem', 
                    border: 'none', 
                    borderRadius: '4px',
                    textDecoration: 'none'
                  }}
                >
                  Get Started
                </a>
              </>
            )}
          </div>
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
              placeholder={user ? "Search any product..." : "Login to search products..."}
              disabled={!user}
              style={{ 
                flex: 1, 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '1rem',
                opacity: user ? 1 : 0.6
              }}
            />
            <button 
              type="submit"
              disabled={!user || loading}
              style={{ 
                backgroundColor: (!user || loading) ? '#9ca3af' : '#2563eb', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '4px',
                cursor: (!user || loading) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick searches */}
        {user && (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>Try: </p>
            {['iPhone 15', 'Nike Air Max', 'MacBook Pro'].map(term => (
              <button
                key={term}
                onClick={() => quickSearch(term)}
                disabled={loading || !canSearch()}
                style={{
                  margin: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  cursor: (!canSearch() || loading) ? 'not-allowed' : 'pointer',
                  opacity: (!canSearch() || loading) ? 0.6 : 1
                }}
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Search limit warning */}
        {user && user.plan === 'free' && getRemainingSearches() <= 1 && (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontWeight: '600' }}>
              ⚠️ You have {getRemainingSearches()} search{getRemainingSearches() === 1 ? '' : 'es'} left today
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Upgrade to Premium for Unlimited Searches
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            <h3>Results for "{searchQuery}"</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', textAlign: 'left' }}>
              {searchResults.map(product => (
                <div key={product.id} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
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
                  <h4>{product.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>{product.price}</span>
                    <span>⭐ {product.rating} ({product.reviewCount} reviews)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features for non-logged users */}
        {!user && (
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

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '400px',
            margin: '1rem'
          }}>
            <h3 style={{ marginTop: 0, color: '#2563eb' }}>Upgrade to Premium</h3>
            <p>You've reached your daily search limit of 5 searches.</p>
            <p><strong>Premium Benefits:</strong></p>
            <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <li>Unlimited searches</li>
              <li>Detailed trust score breakdown</li>
              <li>Search history</li>
              <li>No ads</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowUpgradeModal(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#e5e7eb',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  alert('Stripe integration coming next!')
                  setShowUpgradeModal(false)
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Upgrade for €9/month
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

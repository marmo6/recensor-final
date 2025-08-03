'use client'

import { useState } from 'react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Simple validation
    if (!email || !password) {
      setMessage('Please fill all fields')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // Simulate API call delay
    setTimeout(() => {
      if (isLogin) {
        // Login logic
        const existingUser = localStorage.getItem(`user_${email}`)
        if (existingUser) {
          const userData = JSON.parse(existingUser)
          if (userData.password === password) {
            // Successful login
            localStorage.setItem('current_user', JSON.stringify({
              email: email,
              plan: userData.plan || 'free',
              searches_today: userData.searches_today || 0,
              last_search_date: userData.last_search_date || new Date().toDateString()
            }))
            setMessage('Login successful! Redirecting...')
            setTimeout(() => {
              window.location.href = '/'
            }, 1000)
          } else {
            setMessage('Invalid email or password')
          }
        } else {
          setMessage('Account not found. Please sign up first.')
        }
      } else {
        // Sign up logic
        const existingUser = localStorage.getItem(`user_${email}`)
        if (existingUser) {
          setMessage('Account already exists. Please login instead.')
        } else {
          // Create new user
          const userData = {
            email: email,
            password: password,
            plan: 'free',
            searches_today: 0,
            last_search_date: new Date().toDateString(),
            created_at: new Date().toISOString()
          }
          
          localStorage.setItem(`user_${email}`, JSON.stringify(userData))
          localStorage.setItem('current_user', JSON.stringify({
            email: email,
            plan: 'free',
            searches_today: 0,
            last_search_date: new Date().toDateString()
          }))
          
          setMessage('Account created successfully! Redirecting...')
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        }
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ 
      backgroundColor: '#f0f9ff', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            color: '#2563eb', 
            fontSize: '2.5rem', 
            margin: '0 0 0.5rem 0',
            fontWeight: 'bold'
          }}>
            Recensor
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div style={{ 
          display: 'flex', 
          marginBottom: '1.5rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px', 
          padding: '4px' 
        }}>
          <button
            onClick={() => {setIsLogin(true); setMessage('')}}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: isLogin ? '#2563eb' : 'transparent',
              color: isLogin ? 'white' : '#6b7280',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Login
          </button>
          <button
            onClick={() => {setIsLogin(false); setMessage('')}}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: !isLogin ? '#2563eb' : 'transparent',
              color: !isLogin ? 'white' : '#6b7280',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#374151',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#374151',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            {!isLogin && (
              <p style={{ 
                fontSize: '0.8rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0' 
              }}>
                Minimum 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: message.includes('successful') || message.includes('Redirecting') ? '#dcfce7' : '#fee2e2',
            color: message.includes('successful') || message.includes('Redirecting') ? '#166534' : '#dc2626',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {message}
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a 
            href="/" 
            style={{ 
              color: '#6b7280', 
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Home
          </a>
        </div>

        {/* Free Tier Info */}
        {!isLogin && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              color: '#1e40af',
              textAlign: 'center'
            }}>
              🎉 Start with 5 free searches per day!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

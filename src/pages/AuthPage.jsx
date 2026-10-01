import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import { AuthContext } from '../context/AuthContext'
import './AuthPage.css'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login, isLoggedIn } = useContext(AuthContext)

  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('') // email OR phone number
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const queryMode = searchParams.get('mode')
    setMode(queryMode === 'signup' ? 'signup' : 'signin')
  }, [searchParams])

  // If the user is already logged in, sending them back here makes no sense
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, navigate])

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const isPhone = (value) => /^\+?[0-9]{7,15}$/.test(value.replace(/[\s-]/g, ''))
  // Signup requires a stronger password: at least 6 characters, with at
  // least one letter and one number. Sign-in only checks it isn't empty,
  // since we don't want to lock existing users out over an old rule change.
  const isStrongPassword = (value) =>
    value.length >= 6 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!identifier.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (!isEmail(identifier.trim()) && !isPhone(identifier.trim())) {
      setError('Please enter a valid email address or phone number.')
      return
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (mode === 'signup' && !isStrongPassword(password)) {
      setError('Password must be at least 6 characters and include both a letter and a number.')
      return
    }

    if (mode === 'signin' && password.trim().length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const cleanIdentifier = identifier.trim()
    const isEmailLogin = isEmail(cleanIdentifier)

    const userData = {
      name: mode === 'signup' ? name.trim() : (isEmailLogin ? cleanIdentifier.split('@')[0] : cleanIdentifier),
      email: isEmailLogin ? cleanIdentifier : '',
      phone: isEmailLogin ? '' : cleanIdentifier,
      authTime: new Date().toISOString()
    }

    login(userData)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page page-background">
      <SEO
        title="Sign In or Sign Up"
        description="Sign in or create a free account to start tracking your expenses and planning your budget with Budget Basic."
        path="/auth"
        noindex
      />
      <Navbar />

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === 'signin' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => { setMode('signin'); setError('') }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => { setMode('signup'); setError('') }}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-body">
            <div className="auth-intro">
              <h2 className="auth-title">
                {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="auth-subtitle">
                {mode === 'signin'
                  ? 'Access your expense workspace and budget logs.'
                  : 'Start monitoring your spending with total financial clarity.'}
              </p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="identifier" className="form-label">Email or Phone Number</label>
                <input
                  id="identifier"
                  type="text"
                  className="form-input"
                  placeholder="name@example.com or 03001234567"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mode === 'signup' && (
                  <span className="form-hint">
                    At least 6 characters, with a letter and a number.
                  </span>
                )}
              </div>

              <button type="submit" className="auth-submit-btn">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>

          <div className="auth-footer">
            <Link to="/" className="auth-back-link">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

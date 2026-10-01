import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'

// Budget Basic is a single scrolling page now, so every content link is an
// anchor on "/" rather than its own route. The Planner keeps its own route
// since it's an interactive tool, not a content section.
const navLinks = [
  { to: '/#budgeting-basics', label: 'Basics' },
  { to: '/#needs-vs-wants', label: 'Needs/Wants' },
  { to: '/#budget-split', label: '50-30-20' },
  { to: '/#savings-goals', label: 'Savings' },
  { to: '/dashboard', label: 'Planner' },
  { to: '/#money-mistakes', label: 'Mistakes' },
  { to: '/#infographics', label: 'Infographics' },
  { to: '/#feedback', label: 'Feedback' },
  { to: '/#contact-us', label: 'Contact Us' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  // On scroll, the VisitorClock bar (date/time/visit-count strip above the
  // navbar) hides itself, and the navbar slides up into the space it left
  // behind instead of leaving a gap. See VisitorClock.jsx for its half of
  // this — both listen to scroll independently and toggle in sync.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
          <div className="brand-icon">
            <img src="/logo.png" alt="Budget Basic logo" />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-title"> Budget Basic</span>
              <span className="brand-dot"></span>
            </div>
            <span className="brand-subtitle">EXPENSE TRACKER</span>
          </div>
        </Link>

        {/* Desktop links - hidden on small screens via CSS */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/search" className="theme-toggle-btn nav-icon-search" aria-label="Search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Link>

          <button type="button" onClick={toggleTheme} className="theme-toggle-btn nav-icon-theme" aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Desktop: show Sign In / Get Started ONLY when logged out.
              Show account pill + Logout when logged in. */}
          {isLoggedIn ? (
            <div className="nav-account-group">
              <Link to="/dashboard" className="nav-account-pill">
                <span className="nav-account-avatar">
                  {(user?.name || 'U').charAt(0).toUpperCase()}
                </span>
                <span className="nav-account-name">{user?.name || 'Account'}</span>
              </Link>
              <button type="button" onClick={handleLogout} className="nav-signin-btn">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button type="button" onClick={() => navigate('/auth?mode=signin')} className="nav-signin-btn">
                Sign In
              </button>
              <button type="button" onClick={() => navigate('/auth?mode=signup')} className="nav-getstarted-btn">
                Get Started
              </button>
            </>
          )}

          {/* Hamburger - only visible on small screens via CSS */}
          <button
            type="button"
            className="hamburger-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown panel - always mounted so the open/close
            transition in Navbar.css can animate both directions. */}
        <div className={`mobile-menu-panel ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/search" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            Search
          </Link>
          <button
            type="button"
            className="mobile-nav-link"
            onClick={() => { setMobileOpen(false); toggleTheme() }}
          >
            Toggle Theme
          </button>

          <div className="mobile-menu-divider"></div>

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                My Dashboard ({user?.name})
              </Link>
              <button type="button" className="mobile-nav-link mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => { setMobileOpen(false); navigate('/auth?mode=signin') }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => { setMobileOpen(false); navigate('/auth?mode=signup') }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

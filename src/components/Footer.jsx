import { Link } from "react-router-dom";
import "./Footer.css";

// Placeholder handles — swap for the real profile links when they exist.
const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/budgetbasic",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/budgetbasic",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M20 4L4 20"></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/budgetbasic",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/budgetbasic",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];

export default function Footer({ hideContact = false }) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-left">
            <Link to="/" className="footer-brand">
              <div className="footer-icon">
                <img src="/logo.png" alt="Budget Basic logo" />
              </div>
              <div className="brand-title-row">
                <span className="brand-title">Budget Basic</span>
                <span className="brand-dot"></span>
              </div>
            </Link>
            <p className="footer-tagline">
              A simple budgeting guide made for students, to help you unders
              tand where your money goes.
            </p>

            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-middle">
            <Link to="/#budgeting-basics" className="footer-link">
              Budgeting Basics
            </Link>
            <Link to="/#infographics" className="footer-link">
              Infographics
            </Link>
            <Link to="/#about" className="footer-link">
              About / Contact
            </Link>
            <Link to="/sitemap" className="footer-link">
              Sitemap
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Budget Basic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

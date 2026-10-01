import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            FINANCIAL CLARITY x MODERN INNOVATION
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-main">MASTER EXPENSES WITH</span>
            <span className="hero-heading-accent">confidence.</span>
          </h1>

          <p className="hero-description">
            Streamline your daily spending, track monthly budgets in real time,
            and take control of your financial freedom with purposeful
            simplicity.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              onClick={() => navigate("/auth?mode=signup")}
              className="hero-btn-primary"
            >
              <span>GET STARTED FREE</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="hero-highlights" aria-label="Budget Basic benefits">
            <span>✓ Student-friendly</span>
            <span>✓ Private by design</span>
            <span>✓ Free to start</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual-wrapper">
            <img
              src="/hero-illustration.png"
              alt="Illustration of a student tracking needs, wants and savings on a laptop and phone"
              className="hero-visual-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

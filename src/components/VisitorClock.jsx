import { useState, useEffect } from "react";
import "./VisitorClock.css";

export default function VisitorClock() {
  const [now, setNow] = useState(new Date());
  const [visitCount, setVisitCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Hide this bar once the page is scrolled, so the navbar (see
  // Navbar.jsx/.css) can slide up and take its place instead of leaving
  // an empty gap.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = Number(localStorage.getItem("budgetbasics_visits")) || 0;
    const alreadyCountedThisSession = sessionStorage.getItem(
      "budgetbasics_session_counted",
    );

    if (!alreadyCountedThisSession) {
      const updated = stored + 1;
      localStorage.setItem("budgetbasics_visits", updated.toString());
      sessionStorage.setItem("budgetbasics_session_counted", "true");
      setVisitCount(updated);
    } else {
      setVisitCount(stored);
    }
  }, []);

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`visitor-clock-bar ${scrolled ? "vc-collapsed" : ""}`}>
      <span className="vc-item">📅 {dateStr}</span>
      <span className="vc-divider">•</span>
      <span className="vc-item">🕒 {timeStr}</span>
      <span className="vc-divider">•</span>
      <span className="vc-item">👁 {visitCount.toLocaleString()} visits</span>
    </div>
  );
}

import { useState } from "react";
import items from "../data/needsVsWantsItems.json";

export default function NeedsVsWants() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const currentItem = items[index];
  const isLastItem = index === items.length - 1;

  const handleAnswer = (choice) => {
    const isCorrect = choice === currentItem.correct;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback({ correct: isCorrect, why: currentItem.why });
  };

  const handleNext = () => {
    setFeedback(null);
    if (!isLastItem) setIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <section id="needs-vs-wants" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">Needs vs Wants</h2>
        <p className="page-hero-subtitle">
          Classify each item — is it a "Need" or a "Want"? Before deciding, ask
          yourself: "Is it essential now?"
        </p>
      </div>

      <section className="content-section">
        <div
          className="info-card"
          style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            Item {index + 1} of {items.length} &nbsp;•&nbsp; Score: {score}
          </p>

          <h2
            style={{
              fontSize: "22px",
              margin: "10px 0 22px 0",
              color: "var(--text-color)",
            }}
          >
            {currentItem.name}
          </h2>

          {!feedback ? (
            <div
              style={{ display: "flex", gap: "14px", justifyContent: "center" }}
            >
              <button
                className="primary-btn"
                style={{ background: "var(--accent-color)" }}
                onClick={() => handleAnswer("need")}
              >
                It's a Need
              </button>
              <button
                className="primary-btn"
                style={{ background: "#f59e0b" }}
                onClick={() => handleAnswer("want")}
              >
                It's a Want
              </button>
            </div>
          ) : (
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: feedback.correct ? "#22c55e" : "#ef4444",
                }}
              >
                {feedback.correct ? "✅ Correct answer!" : "❌ Not quite right"}
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                {feedback.why}
              </p>

              {!isLastItem ? (
                <button
                  className="primary-btn"
                  style={{ marginTop: "18px" }}
                  onClick={handleNext}
                >
                  Next Item →
                </button>
              ) : (
                <div style={{ marginTop: "18px" }}>
                  <p style={{ fontWeight: 700, color: "var(--text-color)" }}>
                    Quiz complete! Your score: {score}/{items.length}
                  </p>
                  <button
                    className="primary-btn"
                    style={{ marginTop: "10px" }}
                    onClick={handleRestart}
                  >
                    Restart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div
        className="edu-note"
        style={{
          maxWidth: "520px",
          margin: "20px auto 0 auto",
          textAlign: "center",
        }}
      >
        💡 Tip: Whenever you're about to spend, ask yourself — "Is it essential
        now?" If not, pause and think it over.
      </div>
    </section>
  );
}

import { useState } from "react";

export default function SavingsGoals() {
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [monthly, setMonthly] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const t = Number(target);
    const c = Number(current);
    const m = Number(monthly);

    if (!goalName.trim()) return setError("Please enter a goal name.");
    if (isNaN(t) || t <= 0)
      return setError("Please enter a valid target amount.");
    if (isNaN(c) || c < 0)
      return setError("Current savings cannot be negative.");
    if (isNaN(m) || m <= 0)
      return setError("Monthly contribution must be greater than 0.");

    setError("");
    const remaining = Math.max(t - c, 0);
    const months = Math.ceil(remaining / m);
    setResult({ remaining, months, percent: Math.min((c / t) * 100, 100) });
  };

  return (
    <section id="savings-goals" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">Savings Goals</h2>
        <p className="page-hero-subtitle">
          Set a savings goal and see how many months it will take to reach it.
        </p>
      </div>

      <section className="content-section">
        <form
          className="info-card"
          style={{ maxWidth: "480px", margin: "0 auto" }}
          onSubmit={handleCalculate}
        >
          <div className="form-field">
            <label>Goal Name</label>
            <input
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g. New Laptop"
            />
          </div>
          <div className="form-field">
            <label>Target Amount</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 50000"
            />
          </div>
          <div className="form-field">
            <label>Current Savings</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g. 5000"
            />
          </div>
          <div className="form-field">
            <label>Expected Monthly Contribution</label>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="e.g. 3000"
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn">
            Calculate
          </button>

          {result && (
            <div style={{ marginTop: "20px" }}>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${result.percent}%` }}
                ></div>
              </div>
              <p style={{ marginTop: "10px", color: "var(--text-color)" }}>
                Remaining amount: {result.remaining.toLocaleString()} — you
                can reach this goal in{" "}
                <strong>
                  {result.months} month{result.months === 1 ? "" : "s"}
                </strong>
                .
              </p>
              <p className="edu-note">
                💡 Even small savings add up to reach a big goal over time!
              </p>
            </div>
          )}
        </form>
      </section>
    </section>
  );
}

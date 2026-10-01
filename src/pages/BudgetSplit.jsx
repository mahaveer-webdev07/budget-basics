import { useState } from "react";

export default function BudgetSplit() {
  const [income, setIncome] = useState("");
  const [error, setError] = useState("");

  const incomeNum = Number(income);
  const isValid = income !== "" && !isNaN(incomeNum) && incomeNum > 0;

  const needs = isValid ? incomeNum * 0.5 : 0;
  const wants = isValid ? incomeNum * 0.3 : 0;
  const savings = isValid ? incomeNum * 0.2 : 0;

  const handleChange = (e) => {
    const val = e.target.value;
    setIncome(val);

    if (val === "") {
      setError("");
    } else if (isNaN(Number(val)) || Number(val) <= 0) {
      setError("Please enter a valid number greater than 0.");
    } else {
      setError("");
    }
  };

  return (
    <section id="budget-split" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">50-30-20 Budget Rule</h2>
        <p className="page-hero-subtitle">
          Enter your monthly income — we'll split it into 50% Needs, 30% Wants,
          and 20% Savings.
        </p>
      </div>

      <section className="content-section">
        <div
          className="info-card"
          style={{ maxWidth: "480px", margin: "0 auto" }}
        >
          <div className="form-field">
            <label htmlFor="incomeInput">Monthly Income</label>
            <input
              id="incomeInput"
              type="number"
              min="0"
              placeholder="e.g. 15000"
              value={income}
              onChange={handleChange}
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          {isValid && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: "var(--text-color)" }}>
                    Needs (50%)
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--text-color)" }}>
                    {needs.toLocaleString()}
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "50%", background: "var(--accent-color)" }}
                  ></div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: "var(--text-color)" }}>
                    Wants (30%)
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--text-color)" }}>
                    {wants.toLocaleString()}
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "30%", background: "#f59e0b" }}
                  ></div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: "var(--text-color)" }}>
                    Savings (20%)
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--text-color)" }}>
                    {savings.toLocaleString()}
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: "20%", background: "var(--accent-color)" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <p className="edu-note" style={{ marginTop: "20px" }}>
            📌 This split is only an educational guideline — you can adjust the
            percentages to fit your own needs. This result is an estimate, not
            professional financial advice.
          </p>
        </div>
      </section>
    </section>
  );
}

import { useState } from "react";

const sampleBudget = [
  { label: "Monthly Allowance / Income", amount: 15000, type: "income" },
  { label: "Hostel / Rent", amount: 5000, type: "expense" },
  { label: "Food", amount: 3500, type: "expense" },
  { label: "Transport", amount: 1500, type: "expense" },
  { label: "Books & Learning", amount: 1000, type: "expense" },
  { label: "Entertainment / Wants", amount: 1500, type: "expense" },
  { label: "Savings", amount: 2500, type: "savings" },
];

const concepts = [
  {
    title: "Income",
    desc: "Money you receive — from an allowance, scholarship, part-time job, or internship.",
  },
  {
    title: "Fixed Expenses",
    desc: "Costs that stay the same every month — like hostel rent or subscriptions.",
  },
  {
    title: "Variable Expenses",
    desc: "Costs that change month to month — like food or transport.",
  },
  {
    title: "Needs",
    desc: "Things you can't do without — food, rent, books, transport.",
  },
  {
    title: "Wants",
    desc: "Things that are nice to have but not essential — games, eating out, shopping.",
  },
  {
    title: "Savings",
    desc: "Money you set aside instead of spending, for future goals.",
  },
];

export default function BudgetingBasics() {
  const [selected, setSelected] = useState(null);
  const correctAnswer = "needs";

  const totalIncome = sampleBudget
    .filter((i) => i.type === "income")
    .reduce((s, i) => s + i.amount, 0);
  const totalExpense = sampleBudget
    .filter((i) => i.type === "expense")
    .reduce((s, i) => s + i.amount, 0);
  const totalSavings = sampleBudget
    .filter((i) => i.type === "savings")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <section id="budgeting-basics" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">Budgeting Basics</h2>
        <p className="page-hero-subtitle">
          Budgeting is simple once you understand where your money comes from
          and where it goes.
        </p>
      </div>

      <section className="content-section">
        <h2 className="content-section-title">Key Terms</h2>
        <div className="info-grid">
          {concepts.map((c) => (
            <div key={c.title} className="info-card">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="content-section-title">Sample Student Monthly Budget</h2>
        <div className="info-card">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {sampleBudget.map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <td
                    style={{ padding: "10px 4px", color: "var(--text-color)" }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "10px 4px",
                      textAlign: "right",
                      fontWeight: 700,
                      color:
                        row.type === "income"
                          ? "var(--accent-color)"
                          : "var(--text-color)",
                    }}
                  >
                    {row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "var(--text-muted)",
            }}
          >
            Total Income: {totalIncome.toLocaleString()} &nbsp;|&nbsp; Total
            Expenses: {totalExpense.toLocaleString()} &nbsp;|&nbsp; Savings:{" "}
            {totalSavings.toLocaleString()}
          </p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="content-section-title">Quick Knowledge Check</h2>
        <div className="info-card">
          <p style={{ marginBottom: "14px", color: "var(--text-color)" }}>
            Which category do rent and food belong to?
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className={`pill-btn ${selected === "needs" ? "active" : ""}`}
              onClick={() => setSelected("needs")}
            >
              Needs
            </button>
            <button
              className={`pill-btn ${selected === "wants" ? "active" : ""}`}
              onClick={() => setSelected("wants")}
            >
              Wants
            </button>
          </div>

          {selected && (
            <p
              style={{
                marginTop: "14px",
                fontWeight: 600,
                color: selected === correctAnswer ? "#22c55e" : "#ef4444",
              }}
            >
              {selected === correctAnswer
                ? "✅ Correct! Rent and food are essential, so they are Needs."
                : '❌ Think again — it\'s hard to get by without these, so they count as "Needs".'}
            </p>
          )}
        </div>
      </section>

      <p className="edu-note">
        Note: These values are for sample/educational purposes only — this is
        not real banking or financial data.
      </p>
    </section>
  );
}

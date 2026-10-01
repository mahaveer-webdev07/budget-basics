import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SummaryCards from "../components/SummaryCards";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { AuthContext } from "../context/AuthContext";
import SEO from "../components/SEO";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  // Every account needs its own storage bucket - otherwise the second
  // person to sign up on this browser sees (and overwrites) the first
  // person's expenses, currency and budget. Guests (not signed in) get
  // NO storage bucket at all -- their data lives only in memory for this
  // session and is never written to localStorage.
  const userKey = user?.email ? user.email.toLowerCase() : null;
  const expensesKey = userKey ? `outlay_expenses_${userKey}` : null;
  const currencyKey = userKey ? `outlay_currency_${userKey}` : null;
  const budgetKey = userKey ? `outlay_target_budget_${userKey}` : null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [currency, setCurrency] = useState(() => {
    if (!currencyKey) return "₨";
    return localStorage.getItem(currencyKey) || "₨";
  });

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    if (!budgetKey) return 0;
    const saved = localStorage.getItem(budgetKey);
    return saved !== null && saved !== "" ? Number(saved) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    if (!expensesKey) return [];
    const saved = localStorage.getItem(expensesKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [analyticsView, setAnalyticsView] = useState("weekly");

  // If the logged-in account changes (e.g. logout then sign up/in as
  // someone else, or a guest who just signed in) without a full page
  // reload, reload that account's own data instead of continuing to show
  // the previous (guest or other account) session's expenses.
  useEffect(() => {
    if (!expensesKey) {
      setExpenses([]);
      setCurrency("₨");
      setMonthlyBudget(0);
      return;
    }
    const savedExpenses = localStorage.getItem(expensesKey);
    setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);

    const savedCurrency = localStorage.getItem(currencyKey);
    setCurrency(savedCurrency || "₨");

    const savedBudget = localStorage.getItem(budgetKey);
    setMonthlyBudget(savedBudget !== null && savedBudget !== "" ? Number(savedBudget) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  // Persist to localStorage ONLY for signed-in users. Guests keep their
  // data purely in React state -- nothing is ever written for them.
  useEffect(() => {
    if (!expensesKey) return;
    localStorage.setItem(expensesKey, JSON.stringify(expenses));
  }, [expenses, expensesKey]);

  useEffect(() => {
    if (!currencyKey) return;
    localStorage.setItem(currencyKey, currency);
  }, [currency, currencyKey]);

  useEffect(() => {
    if (!budgetKey) return;
    localStorage.setItem(budgetKey, monthlyBudget.toString());
  }, [monthlyBudget, budgetKey]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const getDayName = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: "short" });
  };

  const getWeekDayStats = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const dayOfWeek = now.getDay();
    const budgetValue = Number(monthlyBudget) || 0;

    return days.map((day, i) => {
      const targetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - dayOfWeek + i,
      );
      const y = String(targetDate.getFullYear());
      const m = String(targetDate.getMonth() + 1).padStart(2, "0");
      const dt = String(targetDate.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dt}`;

      const dayTotal = expenses
        .filter((item) => item.date === dateStr)
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      const percentage =
        budgetValue > 0
          ? Math.min(100, Math.max(0, (dayTotal / budgetValue) * 100))
          : 0;

      return {
        label: day,
        amount: dayTotal,
        percentage,
      };
    });
  };

  const getMonthStats = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = String(new Date().getFullYear());
    const budgetValue = Number(monthlyBudget) || 0;

    return monthNames.map((m, idx) => {
      const monthPrefix = `${currentYear}-${String(idx + 1).padStart(2, "0")}`;

      const monthTotal = expenses
        .filter((item) => item.date && item.date.startsWith(monthPrefix))
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      const percentage =
        budgetValue > 0
          ? Math.min(100, Math.max(0, (monthTotal / budgetValue) * 100))
          : 0;

      return {
        label: m,
        amount: monthTotal,
        percentage,
      };
    });
  };

  const weekDayStats = getWeekDayStats();
  const monthStats = getMonthStats();

  return (
    <div className="dashboard-container page-background">
      <SEO
        title="Expense Planner Dashboard"
        description="Your personal expense planner — log expenses, track spending by category, and monitor your monthly budget in real time."
        path="/dashboard"
        noindex
      />
      <Navbar />

      <main className="dashboard-content">
        <section className="dashboard-banner">
          <div className="banner-text">
            <h1 className="banner-title">Financial Dashboard</h1>
            <p className="banner-subtitle">
              {isLoggedIn
                ? `Welcome back, ${user?.name}. Here is your live spending analysis and budget allocation.`
                : "You're browsing as a guest — your entries stay only for this session and are not saved. Sign in to keep them across visits."}
            </p>
          </div>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="dashboard-logout-btn"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/auth?mode=signin")}
              className="dashboard-logout-btn"
            >
              Sign In to Save Data
            </button>
          )}

          <div className="banner-budget-ctrl">
            <label htmlFor="targetBudgetInput" className="ctrl-label">
              Monthly Budget ({currency})
            </label>
            <input
              id="targetBudgetInput"
              type="number"
              min="0"
              className="budget-input"
              value={monthlyBudget}
              onChange={(e) => {
                const val = e.target.value;
                setMonthlyBudget(val === "" ? "" : Math.max(0, Number(val)));
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setMonthlyBudget(0);
                }
              }}
            />
          </div>
        </section>

        <SummaryCards
          expenses={expenses}
          currency={currency}
          monthlyBudget={Number(monthlyBudget) || 0}
        />

        <div className="dashboard-grid">
          <div className="grid-column">
            <ExpenseForm
              onAddExpense={handleAddExpense}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>

          <div className="grid-column">
            <div className="analytics-card">
              <div className="analytics-header">
                <div>
                  <h3 className="analytics-title">Spending Analytics</h3>
                  <p className="analytics-subtitle">
                    View your analytics below.
                  </p>
                </div>

                <div className="analytics-toggle">
                  <button
                    type="button"
                    className={
                      analyticsView === "weekly"
                        ? "toggle-btn active"
                        : "toggle-btn"
                    }
                    onClick={() => setAnalyticsView("weekly")}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    className={
                      analyticsView === "monthly"
                        ? "toggle-btn active"
                        : "toggle-btn"
                    }
                    onClick={() => setAnalyticsView("monthly")}
                  >
                    Year
                  </button>
                </div>
              </div>

              <div className="analytics-bars">
                {analyticsView === "weekly" ? (
                  <div className="bars-list">
                    {weekDayStats.map((item) => (
                      <div key={item.label} className="bar-row">
                        <span className="bar-label">{item.label}</span>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="bar-value">
                          {currency}
                          {item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bars-list">
                    {monthStats.map((item) => (
                      <div key={item.label} className="bar-row">
                        <span className="bar-label">{item.label}</span>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="bar-value">
                          {currency}
                          {item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="dashboard-list-section">
          <ExpenseList
            expenses={expenses}
            currency={currency}
            onDeleteExpense={handleDeleteExpense}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

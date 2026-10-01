import { useState, useMemo } from "react";
import PageLayout from "../components/PageLayout";
import SEO from "../components/SEO";
import moneyMistakes from "../data/moneyMistakes.json";
import infographics from "../data/infographicsGallery.json";
import needsVsWants from "../data/needsVsWantsItems.json";

const allContent = [
  ...moneyMistakes.map((m) => ({
    title: m.title,
    desc: m.fix,
    topic: m.topic,
    type: "Money Mistake",
  })),
  ...infographics.map((g) => ({
    title: g.title,
    desc: g.desc,
    topic: g.topic,
    type: "Infographic",
  })),
  ...needsVsWants.map((n) => ({
    title: n.name,
    desc: n.why,
    topic: n.correct,
    type: "Needs vs Wants",
  })),
];

const topics = ["all", ...new Set(allContent.map((c) => c.topic))];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const results = useMemo(() => {
    let filtered = allContent.filter((item) => {
      const matchesQuery =
        query.trim() === "" ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase());
      const matchesTopic = topicFilter === "all" || item.topic === topicFilter;
      return matchesQuery && matchesTopic;
    });

    if (sortBy === "az") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [query, topicFilter, sortBy]);

  return (
    <PageLayout>
      <SEO
        title="Search Learning Content"
        description="Search Budget Basic's budgeting tips, infographics, and money lessons by keyword — like saving, needs, or expenses."
        path="/search"
        noindex
      />
      <div className="page-hero-banner">
        <h1 className="page-hero-title">Search Learning Content</h1>
        <p className="page-hero-subtitle">
          Search tips, examples, and infographics by keyword — like saving,
          needs, or expenses.
        </p>
      </div>

      <section className="content-section">
        <div
          className="info-card"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          <div className="form-field">
            <label>Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. saving, needs, expenses..."
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text-color)",
                }}
              >
                Filter by topic
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {topics.map((t) => (
                  <button
                    key={t}
                    className={`pill-btn ${topicFilter === t ? "active" : ""}`}
                    onClick={() => setTopicFilter(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text-color)",
                }}
              >
                Sort by
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className={`pill-btn ${sortBy === "relevance" ? "active" : ""}`}
                  onClick={() => setSortBy("relevance")}
                >
                  Most Relevant
                </button>
                <button
                  className={`pill-btn ${sortBy === "az" ? "active" : ""}`}
                  onClick={() => setSortBy("az")}
                >
                  A-Z
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        {results.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            No matching content found. Try a different keyword.
          </p>
        ) : (
          <div className="info-grid">
            {results.map((item, i) => (
              <div key={i} className="info-card">
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent-color)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.type}
                </span>
                <h3 style={{ marginTop: "6px" }}>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}

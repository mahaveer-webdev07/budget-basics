import { useState } from "react";
import gallery from "../data/infographicsGallery.json";

const topics = ["all", "basics", "budgeting", "savings"];

export default function Infographics() {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all" ? gallery : gallery.filter((g) => g.topic === filter);

  return (
    <section id="infographics" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">Infographics & Learning Gallery</h2>
        <p className="page-hero-subtitle">
          Understand budgeting concepts visually.
        </p>
      </div>

      <section className="content-section">
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {topics.map((t) => (
            <button
              key={t}
              className={`pill-btn ${filter === t ? "active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>
            No matching content found.
          </p>
        ) : (
          <div className="info-grid">
            {filtered.map((g) => (
              <div key={g.title} className="info-card">
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

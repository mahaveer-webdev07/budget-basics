import { useState } from "react";
import "./StarRating.css";

// A clickable, hoverable 5-star rating control. `value` is the currently
// selected rating (0 = none), `onChange` receives the new rating (1-5).
export default function StarRating({ value = 0, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const active = hovered || value;

  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Rating out of 5 stars"
      onMouseLeave={() => setHovered(0)}
    >
      {stars.map((star) => {
        const filled = star <= active;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            className={`star-btn ${filled ? "filled" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onClick={() => onChange(star)}
          >
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path d="M12 2.5l2.95 6.28 6.85.8-5.1 4.77 1.4 6.75L12 17.9l-6.1 3.2 1.4-6.75-5.1-4.77 6.85-.8L12 2.5z" />
            </svg>
          </button>
        );
      })}
      {value > 0 && (
        <span className="star-rating-value">{value} / {max}</span>
      )}
    </div>
  );
}

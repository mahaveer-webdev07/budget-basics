import quotes from '../data/financialQuotes.json'
import './QuotesTicker.css'

export default function QuotesTicker() {
  const loopedQuotes = [...quotes, ...quotes]

  return (
    <div className="quotes-ticker" role="marquee" aria-label="Financial tips ticker">
      <div className="quotes-ticker-track">
        {loopedQuotes.map((q, i) => (
          <span key={i} className="quotes-ticker-item">💡 {q}</span>
        ))}
      </div>
    </div>
  )
}
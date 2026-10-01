import { useState } from 'react'
import mistakes from '../data/moneyMistakes.json'

export default function MoneyMistakes() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="money-mistakes" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">Common Money Mistakes</h2>
        <p className="page-hero-subtitle">Every student makes these mistakes — learn to recognize them and how to avoid them.</p>
      </div>

      <section className="content-section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        {mistakes.map((m, i) => (
          <div key={m.title} className={`accordion-item ${openIndex === i ? 'open' : ''}`}>
            <button className="accordion-header" onClick={() => toggle(i)}>
              {m.title}
              <span className="chevron">▼</span>
            </button>
            <div className="accordion-body">
              <p><strong>Scenario:</strong> {m.scenario}</p>
              <p><strong>Fix:</strong> {m.fix}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import SEO from '../components/SEO'

const links = [
  { path: '/', label: 'Home' },
  { path: '/#budgeting-basics', label: 'Budgeting Basics' },
  { path: '/#needs-vs-wants', label: 'Needs vs Wants' },
  { path: '/#budget-split', label: '50-30-20 Rule' },
  { path: '/#savings-goals', label: 'Savings Goals' },
  { path: '/dashboard', label: 'Expense Planner' },
  { path: '/#money-mistakes', label: 'Money Mistakes' },
  { path: '/#infographics', label: 'Infographics' },
  { path: '/#about', label: 'About / Contact' },
]

export default function Sitemap() {
  return (
    <PageLayout>
      <SEO
        title="Sitemap"
        description="Browse a full list of every page on Budget Basic, including budgeting guides, calculators, quizzes, and the expense planner."
        path="/sitemap"
      />
      <div className="page-hero-banner">
        <h1 className="page-hero-title">Sitemap</h1>
      </div>
      <section className="content-section" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="info-card">
          {links.map((l) => (
            <div key={l.path} style={{ padding: '8px 0' }}>
              <Link to={l.path} className="nav-link">{l.label}</Link>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
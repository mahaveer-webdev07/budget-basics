import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import '../style/ContentPage.css'

export default function PageLayout({ children, className = '' }) {
  return (
    <div className={`page-background ${className}`}>
      <Navbar />
      <main className="content-page">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
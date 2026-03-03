import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Insights from './components/Insights'
import CrisisCenter from './components/CrisisCenter'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <Services />
        <Insights />
        <CrisisCenter />
      </main>
      <Footer />
    </div>
  )
}

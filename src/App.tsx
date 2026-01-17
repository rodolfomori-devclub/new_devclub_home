import Header from './components/Header'
import Hero from './components/Hero'
import Presentation from './components/Presentation'
import About from './components/About'
import ForWho from './components/ForWho'
import Courses from './components/Courses'
import Salary from './components/Salary'
import Testimonials from './components/Testimonials'
import Journey from './components/Journey'
import CTAHero from './components/CTAHero'
import Festival from './components/Festival'
import Construa from './components/Construa'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Presentation />
        <About />
        <ForWho />
        <Courses />
        <Salary />
        <Testimonials />
        <Journey />
        <CTAHero />
        <Festival />
        <Construa />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App

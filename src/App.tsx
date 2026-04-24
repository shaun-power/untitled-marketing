import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import DitherPath from './components/DitherPath'
import ProblemStats from './components/ProblemStats'
import ProductLayers from './components/ProductLayers'
import AdaptiveModel from './components/AdaptiveModel'
import HowItWorks from './components/HowItWorks'
import AgentAPI from './components/AgentAPI'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  return (
    <>
      {/* Subtle dot grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,162,158,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(168,162,158,0.09) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 18%, black 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 18%, black 10%, transparent 60%)',
        }}
      />

      <Nav />

      <div ref={pageRef} className="relative">
        <DitherPath scrollYProgress={scrollYProgress} />

        <div className="relative z-10">
          <Hero />
          <ProblemStats />
          <ProductLayers />
          <AdaptiveModel />
          <HowItWorks />
          <AgentAPI />
          <CTA />
        </div>
      </div>

      <Footer />
    </>
  )
}
